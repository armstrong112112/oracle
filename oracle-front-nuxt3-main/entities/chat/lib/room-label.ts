import { SystemRoomId } from "~/entities/chat/model";

const SYSTEM_ROOM_NAME_KEY: Record<string, string> = {
  [SystemRoomId.Saved]: "chat.systemRooms.saved",
  [SystemRoomId.Catalogue]: "chat.systemRooms.catalogue",
  [SystemRoomId.Platforms]: "chat.systemRooms.platforms",
  "sys-urgent": "chat.systemRooms.urgent",
};

export const localizedRoomName = (
  roomId: string,
  fallback: string,
  translate: (key: string) => string,
): string => {
  const key = SYSTEM_ROOM_NAME_KEY[roomId];
  return key ? translate(key) : fallback;
};
