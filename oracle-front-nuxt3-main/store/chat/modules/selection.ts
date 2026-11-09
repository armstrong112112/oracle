import { chatImages } from "~/entities/chat/lib/media-files";
import {
  normalizeSelectionIds,
  photoSelectionIndex,
  photoSelectionKey,
  selectionMessageId,
} from "~/entities/chat/lib/photo-selection";
import type { ChatCore } from "../core";

export const createSelection = (core: ChatCore) => {
  const { messageSelection } = core;

  const startMessageSelection = (roomId: string, messageId: string): void => {
    messageSelection.value = { roomId, ids: [messageId] };
  };

  const clearMessageSelection = (): void => {
    messageSelection.value = null;
  };

  const setSelectedMessages = (ids: string[]): void => {
    const next = normalizeSelectionIds(ids);
    const roomId = core.activeRoomId.value;
    if (!next.length) {
      clearMessageSelection();
    } else if (roomId) {
      messageSelection.value = { roomId, ids: next };
    }
  };

  const toggleSelectedPhoto = (messageId: string, index: number): void => {
    const current = messageSelection.value;
    if (!current) {
      return;
    }
    const message = core.roomMessages(current.roomId).find((item) => item._id === messageId);
    const total = chatImages(message?.files).length;
    if (total < 2 || index < 0 || index >= total) {
      return;
    }

    const selected = new Set<number>();
    if (current.ids.includes(messageId)) {
      for (let cursor = 0; cursor < total; cursor += 1) {
        selected.add(cursor);
      }
    } else {
      for (const id of current.ids) {
        const value = selectionMessageId(id) === messageId ? photoSelectionIndex(id) : null;
        if (value !== null) {
          selected.add(value);
        }
      }
    }
    if (!selected.delete(index)) {
      selected.add(index);
    }

    const ids = current.ids.filter((id) => selectionMessageId(id) !== messageId);
    if (selected.size === total) {
      ids.push(messageId);
    } else {
      ids.push(...[...selected].sort((left, right) => left - right).map((value) => photoSelectionKey(messageId, value)));
    }
    messageSelection.value = ids.length ? { roomId: current.roomId, ids } : null;
  };

  return {
    startMessageSelection,
    clearMessageSelection,
    setSelectedMessages,
    toggleSelectedPhoto,
  };
};
