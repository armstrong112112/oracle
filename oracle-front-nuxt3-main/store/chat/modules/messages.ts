import { computed, ref } from "vue";
import { createId } from "~/entities/chat/lib/ids";
import { isChatImage } from "~/entities/chat/lib/media-files";
import { isPhotoSelection, photoSelectionIndex, selectionMessageId } from "~/entities/chat/lib/photo-selection";
import { createOutgoingMessage, reactionEmoji, toStoredFiles } from "~/entities/chat/lib/to-vac";
import { DeleteScope } from "~/entities/chat/model";
import type {
  ReactionMap,
  ScheduledMessage,
  VacDeleteMessagePayload,
  VacEditMessagePayload,
  VacLastMessage,
  VacMessage,
  VacReactionPayload,
  VacSendMessagePayload,
} from "~/entities/chat/model";
import type { ChatCore } from "../core";

const MAX_OWN_REACTIONS = 3;

const previewOf = (message: VacMessage): VacLastMessage => ({
  content: message.deleted ? "" : (message.content ?? ""),
  senderId: message.senderId,
  timestamp: message.timestamp,
  saved: message.saved,
  distributed: message.distributed,
  seen: message.seen,
  files: message.deleted ? undefined : message.files,
  deleted: Boolean(message.deleted),
});

const partialPhotoDrops = (messageIds: string[], whole: Set<string>): Map<string, Set<number>> => {
  const partial = new Map<string, Set<number>>();
  for (const id of messageIds) {
    const messageId = selectionMessageId(id);
    const index = photoSelectionIndex(id);
    if (index === null || whole.has(messageId)) {
      continue;
    }
    partial.set(messageId, (partial.get(messageId) ?? new Set<number>()).add(index));
  }
  return partial;
};

const withoutPhotos = (message: VacMessage, indexes: Set<number>): VacMessage => {
  let imageIndex = -1;
  const files = (message.files ?? []).filter((file) => {
    if (!isChatImage(file)) {
      return true;
    }
    imageIndex += 1;
    return !indexes.has(imageIndex);
  });
  return { ...message, files };
};

export const createMessages = (core: ChatCore) => {
  const scheduled = ref<ScheduledMessage[]>([]);
  let fetchToken = 0;

  const activeMessages = computed((): VacMessage[] => {
    const roomId = core.activeRoomId.value;
    return roomId && core.messagesLoaded.value ? core.roomMessages(roomId) : [];
  });

  const bumpRoomPreview = (roomId: string, message: VacMessage): void => {
    core.patchRoom(roomId, (room) => ({
      ...room,
      unreadCount: 0,
      index: Date.now(),
      lastMessage: previewOf(message),
    }));
  };

  const syncRoomPreview = (roomId: string, messages: VacMessage[]): void => {
    const last = messages[messages.length - 1];
    core.patchRoom(roomId, (room) => ({ ...room, lastMessage: last ? previewOf(last) : undefined }));
  };

  const fetchRoomMessages = (roomId: string, options: { reset?: boolean } = {}): void => {
    const token = ++fetchToken;
    if (options.reset !== false) {
      core.messagesLoaded.value = false;
    }
    core.setActiveRoom(roomId);
    setTimeout(() => {
      if (token !== fetchToken || core.activeRoomId.value !== roomId) {
        return;
      }
      core.setRoomMessages(roomId, [...core.roomMessages(roomId)]);
      core.messagesLoaded.value = true;
    });
  };

  const hideThread = (): void => {
    fetchToken += 1;
    core.messagesLoaded.value = false;
    core.messageSelection.value = null;
  };

  const sendMessage = (payload: VacSendMessagePayload): void => {
    const message = createOutgoingMessage({
      roomId: payload.roomId,
      senderId: core.currentUserId.value,
      content: payload.content,
      files: toStoredFiles(payload.files),
      replyMessage: payload.replyMessage,
    });
    core.setRoomMessages(payload.roomId, [...core.roomMessages(payload.roomId), message]);
    bumpRoomPreview(payload.roomId, message);
  };

  const editMessage = (payload: VacEditMessagePayload): void => {
    const next = core.roomMessages(payload.roomId).map((message) =>
      message._id === payload.messageId
        ? { ...message, content: payload.newContent, files: toStoredFiles(payload.files) ?? message.files, edited: true }
        : message,
    );
    core.setRoomMessages(payload.roomId, next);
    const edited = next.find((message) => message._id === payload.messageId);
    if (edited) {
      bumpRoomPreview(payload.roomId, edited);
    }
  };

  const scheduleMessage = (payload: Omit<ScheduledMessage, "id">): void => {
    scheduled.value = [...scheduled.value, { id: createId("sch"), ...payload }];
  };

  const deleteMessages = (roomId: string, messageIds: string[], scope: DeleteScope): void => {
    const whole = new Set(messageIds.filter((id) => !isPhotoSelection(id)));
    const partial = partialPhotoDrops(messageIds, whole);
    const trimmed = core.roomMessages(roomId).map((message) => {
      const indexes = partial.get(message._id);
      return indexes ? withoutPhotos(message, indexes) : message;
    });
    const next =
      scope === DeleteScope.Me
        ? trimmed.filter((message) => !whole.has(message._id))
        : trimmed.map((message) => (whole.has(message._id) ? { ...message, deleted: true } : message));

    core.setRoomMessages(roomId, next);
    syncRoomPreview(roomId, next);
    if (core.messageSelection.value?.roomId === roomId) {
      core.messageSelection.value = null;
    }
  };

  const deleteMessage = (payload: VacDeleteMessagePayload): void => {
    deleteMessages(payload.roomId, [payload.message._id], DeleteScope.Both);
  };

  const clearHistory = (roomId: string): void => {
    core.setRoomMessages(roomId, []);
    syncRoomPreview(roomId, []);
  };

  const applyReaction = (reactions: ReactionMap, emoji: string, remove: boolean): ReactionMap => {
    const me = core.currentUserId.value;
    const next = { ...reactions };
    const hasMe = (ids: Array<string | number> = []): boolean => ids.some((id) => String(id) === me);
    const dropMe = (key: string): void => {
      const rest = (next[key] ?? []).filter((id) => String(id) !== me);
      if (rest.length) {
        next[key] = rest;
      } else {
        delete next[key];
      }
    };

    if (remove || hasMe(next[emoji])) {
      dropMe(emoji);
      return next;
    }
    const owned = Object.keys(next).filter((key) => hasMe(next[key]));
    if (owned.length >= MAX_OWN_REACTIONS && owned[0]) {
      dropMe(owned[0]);
    }
    next[emoji] = [...(next[emoji] ?? []), me];
    return next;
  };

  const toggleMessagePin = (roomId: string, messageId: string): void => {
    core.setRoomMessages(
      roomId,
      core.roomMessages(roomId).map((message) =>
        message._id === messageId ? { ...message, pinned: !message.pinned } : message,
      ),
    );
  };

  const toggleReaction = (payload: VacReactionPayload): void => {
    const emoji = reactionEmoji(payload.reaction);
    if (!emoji) {
      return;
    }
    core.setRoomMessages(
      payload.roomId,
      core.roomMessages(payload.roomId).map((message) =>
        message._id === payload.messageId
          ? { ...message, reactions: applyReaction(message.reactions ?? {}, emoji, Boolean(payload.remove)) }
          : message,
      ),
    );
  };

  return {
    scheduled,
    activeMessages,
    fetchRoomMessages,
    hideThread,
    sendMessage,
    editMessage,
    scheduleMessage,
    deleteMessage,
    deleteMessages,
    clearHistory,
    toggleMessagePin,
    toggleReaction,
  };
};
