import { MediaKind } from "~/entities/chat/model";
import type { VacMessageFile } from "~/entities/chat/model";

type FileLike = Pick<Partial<VacMessageFile>, "type" | "extension" | "name" | "audio">;

const NOT_MEDIA = /wav|audio|pdf/;
const VIDEO = /mp4|webm|mov|video/;
const IMAGE = /png|jpe?g|gif|webp|image/;

export const fileMediaKind = (file: FileLike): MediaKind | null => {
  if (file.audio) {
    return null;
  }
  const blob = `${file.type || ""} ${file.extension || ""} ${file.name || ""}`.toLowerCase();
  if (NOT_MEDIA.test(blob)) {
    return null;
  }
  if (VIDEO.test(blob)) {
    return MediaKind.Video;
  }
  return IMAGE.test(blob) ? MediaKind.Image : null;
};

export const isChatImage = (file: FileLike): boolean => fileMediaKind(file) === MediaKind.Image;

export const chatImages = (files?: VacMessageFile[] | null): VacMessageFile[] =>
  (files ?? []).filter(isChatImage);

export const downloadFile = (url: string, name: string): void => {
  if (!url) {
    return;
  }
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
};
