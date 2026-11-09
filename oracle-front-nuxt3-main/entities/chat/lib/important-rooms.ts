export const IMPORTANT_ROOM_IDS = [
  "saved",
  "sys-catalogue",
  "sys-platforms",
  "sys-urgent",
] as const;

export const IMPORTANT_VIDEO_ID = "sys-urgent";

export const importantRoomRank = (roomId: string): number =>
  IMPORTANT_ROOM_IDS.indexOf(roomId as (typeof IMPORTANT_ROOM_IDS)[number]);

export const isServiceRoom = (roomId: string): boolean => importantRoomRank(roomId) >= 0;
