import type { Ref } from "vue";
import { isPhotoSelection } from "~/entities/chat/lib/photo-selection";
import { RoomAction } from "~/entities/chat/model";
import { applyEmojiMessageStyles } from "~/features/chat/emoji-messages";
import { bindImportantChats } from "~/features/chat/important-chats";
import { applyMessageReactions, detachMessageReactions } from "~/features/chat/message-reactions";
import { applySelectedMessageStyles, bindSelectionDrag } from "~/features/chat/message-selection";
import { applyPhotoMosaics } from "~/features/chat/photo-mosaic";
import { bindRoomSwipe } from "~/features/chat/room-swipe";
import { useChatUiStore } from "~/store/chat";

type Unbind = () => void;

export const useVacDecorations = (vacEl: Ref<HTMLElement | null>) => {
  const { t } = useI18n();
  const store = useChatUiStore();
  let unbinds: Unbind[] = [];

  const selectedIds = (): string[] => (store.isSelecting ? store.messageSelection?.ids ?? [] : []);

  const canSelect = (id: string): boolean => {
    const message = store.findMessage(store.activeRoomId, id);
    return Boolean(message && !message.system && !message.deleted);
  };

  const swipeLabel = (action: RoomAction, roomId: string): string => {
    const extra = store.extras[roomId];
    const labels: Record<RoomAction, string> = {
      [RoomAction.Mute]: extra?.muted ? t("chat.card.unmute") : t("chat.card.mute"),
      [RoomAction.Pin]: extra?.pinned ? t("chat.card.unpin") : t("chat.card.pin"),
      [RoomAction.Delete]: t("chat.menu.delete"),
      [RoomAction.Archive]: t("chat.card.archive"),
    };
    return labels[action];
  };

  const swipeActions: Record<RoomAction, (roomId: string) => void> = {
    [RoomAction.Mute]: (roomId) => store.toggleMuted(roomId),
    [RoomAction.Pin]: (roomId) => store.togglePinned(roomId),
    [RoomAction.Delete]: (roomId) => store.deleteRoom(roomId),
    [RoomAction.Archive]: (roomId) => store.archiveRoom(roomId),
  };

  const paintSelection = (el: HTMLElement): void => {
    applySelectedMessageStyles(el, store.isSelecting, selectedIds().filter((id) => !isPhotoSelection(id)));
    applyPhotoMosaics(el, store.activeMessages, selectedIds());
  };

  const paintMessages = (el: HTMLElement): void => {
    const room = store.findRoom(store.activeRoomId);
    const avatars = new Map((room?.users ?? []).map((user) => [String(user._id), user.avatar]));
    applyEmojiMessageStyles(el, store.activeMessages);
    applyMessageReactions(el, store.activeMessages, avatars);
    applyPhotoMosaics(el, store.activeMessages, selectedIds());
  };

  const detach = (el: HTMLElement | null): void => {
    unbinds.forEach((unbind) => unbind());
    unbinds = [];
    if (el) {
      detachMessageReactions(el);
    }
  };

  const attach = (el: HTMLElement): void => {
    detach(null);
    unbinds = [
      bindRoomSwipe(el, {
        label: swipeLabel,
        run: (action, roomId) => swipeActions[action](roomId),
        order: () => store.visibleRooms.map((room) => room.roomId),
      }),
      bindImportantChats(el, {
        label: () => (store.importantOpen ? t("chat.hideImportantChats") : t("chat.showImportantChats")),
        open: () => store.importantOpen,
        toggle: () => store.toggleImportant(),
        mount: (mounted) => store.setImportantMounted(mounted),
      }),
      bindSelectionDrag(el, {
        ids: selectedIds,
        active: () => store.isSelecting,
        setIds: (ids) => store.setSelectedMessages(ids),
        canSelect,
        togglePhoto: (messageId, index) => store.toggleSelectedPhoto(messageId, index),
      }),
    ];
    paintMessages(el);
    paintSelection(el);
  };

  watch(
    () => store.messageSelection,
    () => vacEl.value && paintSelection(vacEl.value),
  );
  watch(
    () => store.activeMessages,
    () => vacEl.value && paintMessages(vacEl.value),
  );

  return { attach, detach, canSelect };
};
