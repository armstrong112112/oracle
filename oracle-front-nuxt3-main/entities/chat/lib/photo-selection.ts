import { chatImages } from "~/entities/chat/lib/media-files";
import type { VacMessageFile } from "~/entities/chat/model";

const MARK = "#";

export const isPhotoSelection = (id: string): boolean => id.includes(MARK);

export const selectionMessageId = (id: string): string => {
  const mark = id.indexOf(MARK);
  return mark === -1 ? id : id.slice(0, mark);
};

export const photoSelectionKey = (messageId: string, index: number): string => `${messageId}${MARK}${index}`;

export const photoSelectionIndex = (id: string): number | null => {
  const mark = id.indexOf(MARK);
  if (mark === -1) {
    return null;
  }
  const value = Number(id.slice(mark + 1));
  return Number.isInteger(value) ? value : null;
};

export const normalizeSelectionIds = (ids: readonly string[]): string[] => {
  const full = new Set(ids.filter((id) => !isPhotoSelection(id)));
  const seen = new Set<string>();
  return ids.filter((id) => {
    if ((isPhotoSelection(id) && full.has(selectionMessageId(id))) || seen.has(id)) {
      return false;
    }
    seen.add(id);
    return true;
  });
};

export const selectedUnitCount = (
  ids: readonly string[],
  messages: readonly { _id: string; files?: VacMessageFile[] }[],
): number => {
  const full = new Set(ids.filter((id) => !isPhotoSelection(id)));
  let count = 0;

  for (const id of full) {
    const message = messages.find((item) => item._id === id);
    const images = chatImages(message?.files);
    count += images.length > 1 ? images.length : 1;
  }

  for (const id of ids) {
    if (isPhotoSelection(id) && !full.has(selectionMessageId(id))) {
      count += 1;
    }
  }

  return count;
};
