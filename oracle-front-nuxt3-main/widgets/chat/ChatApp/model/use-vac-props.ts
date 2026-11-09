import type { Ref } from "vue";
import { localizedMessageDate } from "~/entities/chat/lib/message-date";
import { localizedRoomName } from "~/entities/chat/lib/room-label";
import { oracleVacStyles } from "~/entities/chat/lib/vac-theme";
import { useChatUiStore } from "~/store/chat";

const TEXT_MESSAGE_KEYS = {
  ROOMS_EMPTY: "chat.vac.roomsEmpty",
  ROOM_EMPTY: "chat.vac.roomEmpty",
  NEW_MESSAGES: "chat.vac.newMessages",
  MESSAGE_DELETED: "chat.vac.messageDeleted",
  MESSAGES_EMPTY: "chat.vac.messagesEmpty",
  CONVERSATION_STARTED: "chat.vac.conversationStarted",
  TYPE_MESSAGE: "chat.vac.typeMessage",
  SEARCH: "chat.vac.search",
  IS_ONLINE: "chat.vac.isOnline",
  LAST_SEEN: "chat.vac.lastSeen",
  IS_TYPING: "chat.vac.isTyping",
  CANCEL_SELECT_MESSAGE: "chat.vac.cancelSelectMessage",
} as const;

const flag = (value: boolean): string => String(value);

export const VAC_STATIC_PROPS = {
  trueFlag: flag(true),
  falseFlag: flag(false),
  emptyActions: "[]",
  styles: JSON.stringify(oracleVacStyles),
};

export const useVacProps = (
  roomQuery: Ref<string>,
  composing: Ref<boolean>,
  pinnedOnly: Ref<boolean>,
  openRoomOnLoad: Ref<boolean>,
) => {
  const { t, locale } = useI18n();
  const store = useChatUiStore();

  const roomName = (roomId: string, fallback: string): string => localizedRoomName(roomId, fallback, (key) => t(key));

  const messageDate = (value: string | undefined): string =>
    localizedMessageDate(value, locale.value, t("chat.dates.today"), t("chat.dates.yesterday"));

  const roomsJson = computed(() => {
    const needle = roomQuery.value.trim().toLowerCase();
    const rooms = store.visibleRooms.map((room) => {
      const name = roomName(room.roomId, room.roomName);
      return name === room.roomName ? room : { ...room, roomName: name };
    });
    const filtered = needle && !composing.value
      ? rooms.filter((room) => room.roomName.toLowerCase().includes(needle))
      : rooms;
    return JSON.stringify(filtered);
  });

  const messagesJson = computed(() => {
    const messages = pinnedOnly.value
      ? store.activeMessages.filter((message) => message.pinned && !message.deleted)
      : store.activeMessages;
    return JSON.stringify(messages.map((message) => {
      if (!message.date) {
        return message;
      }
      const date = messageDate(message.date);
      return date === message.date ? message : { ...message, date };
    }));
  });
  const messagesLoadedFlag = computed(() => flag(store.messagesLoaded));
  const loadFirstRoomFlag = computed(() => flag(openRoomOnLoad.value));
  const textMessagesJson = computed(() =>
    JSON.stringify(Object.fromEntries(Object.entries(TEXT_MESSAGE_KEYS).map(([key, path]) => [key, t(path)]))),
  );

  return { roomsJson, messagesJson, messagesLoadedFlag, loadFirstRoomFlag, textMessagesJson };
};
