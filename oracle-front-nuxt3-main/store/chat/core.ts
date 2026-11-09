import { computed, ref } from "vue";
import { uniqueUsers } from "~/entities/chat/lib/contacts";
import { CURRENT_USER_ID } from "~/entities/chat/lib/to-vac";
import type { ChatMessageSelection, ChatRoomExtra, VacMessage, VacRoom, VacRoomUser } from "~/entities/chat/model";

export const createChatCore = () => {
  const currentUserId = ref(CURRENT_USER_ID);
  const rooms = ref<VacRoom[]>([]);
  const messagesByRoom = ref<Record<string, VacMessage[]>>({});
  const extras = ref<Record<string, ChatRoomExtra>>({});
  const activeRoomId = ref<string | null>(null);
  const roomsLoaded = ref(false);
  const messagesLoaded = ref(false);
  const messageSelection = ref<ChatMessageSelection | null>(null);

  const knownUsers = computed(() => uniqueUsers(rooms.value));
  const contacts = computed(() =>
    knownUsers.value
      .filter((user) => user._id !== currentUserId.value)
      .sort((left, right) => left.username.localeCompare(right.username)),
  );

  const findUser = (userId: string): VacRoomUser | null =>
    knownUsers.value.find((user) => user._id === userId) ?? null;

  const findRoom = (roomId: string | null | undefined): VacRoom | null =>
    (roomId && rooms.value.find((room) => room.roomId === roomId)) || null;

  const roomMessages = (roomId: string): VacMessage[] => messagesByRoom.value[roomId] ?? [];

  const findMessage = (roomId: string | null | undefined, messageId: string | null | undefined): VacMessage | null =>
    (roomId && messageId && roomMessages(roomId).find((message) => message._id === messageId)) || null;

  const isSelecting = computed(
    () => Boolean(messageSelection.value) && messageSelection.value?.roomId === activeRoomId.value,
  );

  const setRoomMessages = (roomId: string, next: VacMessage[]): void => {
    messagesByRoom.value = { ...messagesByRoom.value, [roomId]: next };
  };

  const patchExtra = (roomId: string, patch: Partial<ChatRoomExtra>): void => {
    const extra = extras.value[roomId];
    if (extra) {
      extras.value = { ...extras.value, [roomId]: { ...extra, ...patch } };
    }
  };

  const patchRoom = (roomId: string, patch: (room: VacRoom) => VacRoom): void => {
    rooms.value = rooms.value.map((room) => (room.roomId === roomId ? patch(room) : room));
  };

  const setActiveRoom = (roomId: string | null): void => {
    if (activeRoomId.value !== roomId) {
      messageSelection.value = null;
    }
    activeRoomId.value = roomId;
  };

  return {
    currentUserId,
    rooms,
    messagesByRoom,
    extras,
    activeRoomId,
    roomsLoaded,
    messagesLoaded,
    messageSelection,
    knownUsers,
    contacts,
    findUser,
    findRoom,
    findMessage,
    isSelecting,
    roomMessages,
    setRoomMessages,
    patchExtra,
    patchRoom,
    setActiveRoom,
  };
};

export type ChatCore = ReturnType<typeof createChatCore>;
