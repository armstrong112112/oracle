import { createId } from "~/entities/chat/lib/ids";
import type { VacIncomingFile, VacMessage, VacMessageFile } from "~/entities/chat/model";

export const CURRENT_USER_ID = "u1";

export function unwrapVacEvent<T>(payload: unknown): T {
  if (payload instanceof CustomEvent) {
    const detail = payload.detail as unknown;
    if (Array.isArray(detail)) {
      return (detail[0] ?? detail) as T;
    }
    return detail as T;
  }

  if (Array.isArray(payload)) {
    return (payload[0] ?? payload) as T;
  }

  return payload as T;
}

export function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function toStoredFiles(
  files?: Array<Partial<VacIncomingFile>>,
): VacMessageFile[] | undefined {
  if (!files || !Array.isArray(files) || !files.length) {
    return undefined;
  }

  return files.map((file) => {
    const url = file.url || file.localUrl || "";

    return {
      name: file.name ?? "file",
      type: file.type ?? "",
      extension: file.extension ?? "",
      url,
      localUrl: file.localUrl,
      preview: file.preview,
      size: file.size,
      audio: file.audio,
      duration: file.duration,
    };
  });
}

export function reactionEmoji(
  reaction: string | { unicode?: string; name?: string } | undefined,
): string {
  if (!reaction) {
    return "";
  }

  if (typeof reaction === "string") {
    return reaction;
  }

  return reaction.unicode || reaction.name || "";
}

export function createOutgoingMessage(params: {
  roomId: string;
  senderId: string;
  content?: string;
  files?: VacMessage["files"];
  replyMessage?: VacMessage;
}): VacMessage {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return {
    _id: createId("m"),
    senderId: params.senderId,
    content: params.content ?? "",
    timestamp: `${hours}:${minutes}`,
    date: "Today",
    saved: true,
    distributed: true,
    seen: false,
    files: params.files,
    replyMessage: params.replyMessage,
  };
}
