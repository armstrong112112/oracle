import type { VacMessage, VacMessageFile } from "~/entities/chat/model";

export type RoomMediaTab = "media" | "files" | "voice";

export interface RoomMediaItem {
  id: string;
  name: string;
  url: string;
  preview?: string;
  size?: number;
  duration?: number;
  extension: string;
  date?: string;
}

const IMAGE_EXT = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg"]);
const VIDEO_EXT = new Set(["mp4", "webm", "mov"]);

const extensionOf = (file: VacMessageFile): string =>
  (file.extension || file.type || "").replace(/^\./, "").toLowerCase();

export const collectRoomMedia = (
  messages: VacMessage[],
): Record<RoomMediaTab, RoomMediaItem[]> => {
  const media: RoomMediaItem[] = [];
  const files: RoomMediaItem[] = [];
  const voice: RoomMediaItem[] = [];

  messages.forEach((message) => {
    (message.files ?? []).forEach((file, index) => {
      const item: RoomMediaItem = {
        id: `${message._id}-${index}`,
        name: file.name,
        url: file.url,
        preview: file.preview,
        size: file.size,
        duration: file.duration,
        extension: extensionOf(file),
        date: message.date || message.timestamp,
      };

      if (file.audio) {
        voice.push(item);
        return;
      }

      if (IMAGE_EXT.has(item.extension) || VIDEO_EXT.has(item.extension)) {
        media.push(item);
        return;
      }

      files.push(item);
    });
  });

  return { media, files, voice };
};

export const formatFileSize = (size?: number): string => {
  if (!size) {
    return "";
  }
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
