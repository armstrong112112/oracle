import { ChatKind } from "~/entities/chat/model";
import type { ChatRoomExtra, VacRoom } from "~/entities/chat/model";

type Translate = (key: string, params?: Record<string, unknown>) => string;

const onlineCount = (room: VacRoom, extra: ChatRoomExtra): number | null => {
  if (extra.online != null) {
    return extra.online;
  }
  const users = room.users;
  const known = users.length > 0 && users.every((user) => Boolean(user.status?.state));
  return known ? users.filter((user) => user.status.state === "online").length : null;
};

export const groupStatusLine = (t: Translate, room: VacRoom, extra: ChatRoomExtra): string | null => {
  const online = onlineCount(room, extra);

  if (extra.kind === ChatKind.Group) {
    const count = extra.members ?? room.users.length;
    return online == null
      ? t("chat.card.membersCount", { count })
      : t("chat.card.membersOnline", { count, online });
  }

  if (extra.kind === ChatKind.Channel) {
    const count = extra.subscribers ?? extra.members;
    if (count == null) {
      return t("chat.card.channelStatus");
    }
    return online == null
      ? t("chat.card.subscribersCount", { count })
      : t("chat.card.subscribersOnline", { count, online });
  }

  return null;
};

export const peerOf = (room: VacRoom, currentUserId: string) =>
  room.users.find((user) => user._id !== currentUserId) ?? null;
