import { createId } from "~/entities/chat/lib/ids";
import { ALL_FOLDER_ID, ChatKind, ChatRole, DEFAULT_AVATAR } from "~/entities/chat/model";
import type { CreateRoomInput, VacRoomUser } from "~/entities/chat/model";
import type { ChatCore } from "../core";

const omitKey = <T>(record: Record<string, T>, key: string): Record<string, T> => {
  const next = { ...record };
  delete next[key];
  return next;
};

export const createRoomActions = (core: ChatCore) => {
  const { extras, patchExtra } = core;

  const leaveIfActive = (roomId: string): void => {
    if (core.activeRoomId.value === roomId) {
      core.setActiveRoom(null);
    }
  };

  const togglePinned = (roomId: string): void => {
    patchExtra(roomId, { pinned: !extras.value[roomId]?.pinned });
  };

  const toggleMuted = (roomId: string): void => {
    patchExtra(roomId, { muted: !extras.value[roomId]?.muted });
  };

  const setAutoDelete = (roomId: string, enabled: boolean): void => {
    patchExtra(roomId, { autodelete: enabled });
  };

  const archiveRoom = (roomId: string): void => {
    patchExtra(roomId, { archived: true });
    leaveIfActive(roomId);
  };

  const deleteRoom = (roomId: string): void => {
    core.rooms.value = core.rooms.value.filter((room) => room.roomId !== roomId);
    extras.value = omitKey(extras.value, roomId);
    core.messagesByRoom.value = omitKey(core.messagesByRoom.value, roomId);
    leaveIfActive(roomId);
  };

  const createRoom = (input: CreateRoomInput): string => {
    const roomId = createId("room");
    const users = [core.currentUserId.value, ...input.memberIds].flatMap((id): VacRoomUser[] => {
      const user = core.findUser(id);
      return user ? [user] : [];
    });

    core.rooms.value = [
      {
        roomId,
        roomName: input.name.trim(),
        avatar: input.avatar || DEFAULT_AVATAR,
        users,
        unreadCount: 0,
        index: Date.now(),
      },
      ...core.rooms.value,
    ];
    core.setRoomMessages(roomId, []);
    extras.value = {
      ...extras.value,
      [roomId]: {
        roomId,
        kind: input.kind,
        role: input.kind === ChatKind.Channel ? ChatRole.Owner : ChatRole.Admin,
        folderIds: [ALL_FOLDER_ID],
        muted: false,
        paid: Boolean(input.paid),
      },
    };
    core.setActiveRoom(roomId);
    return roomId;
  };

  return {
    togglePinned,
    toggleMuted,
    setAutoDelete,
    archiveRoom,
    deleteRoom,
    createRoom,
  };
};
