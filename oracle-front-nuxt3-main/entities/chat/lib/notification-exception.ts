import { ChatRole, DEFAULT_AVATAR } from "~/entities/chat/model";
import type { ChatRoomExtra, NotificationException, VacRoom } from "~/entities/chat/model";

export const toNotificationException = (room: VacRoom, extra?: ChatRoomExtra): NotificationException => ({
  id: room.roomId,
  name: room.roomName,
  avatar: room.avatar || DEFAULT_AVATAR,
  status: "",
  owner: extra?.role === ChatRole.Owner,
});
