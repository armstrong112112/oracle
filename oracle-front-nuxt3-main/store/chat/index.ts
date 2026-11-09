import { defineStore } from "pinia";
import { MOCK_FOLDERS } from "~/entities/chat/data/folders.mock";
import { MOCK_MESSAGES_BY_ROOM } from "~/entities/chat/data/messages.mock";
import { MOCK_ROOM_EXTRAS, MOCK_ROOMS } from "~/entities/chat/data/rooms.mock";
import { cloneJson } from "~/entities/chat/lib/to-vac";
import { createChatCore } from "./core";
import { createFolderDraft } from "./modules/folder-draft";
import { createMessages } from "./modules/messages";
import { createNotifications } from "./modules/notifications";
import { createRoomList } from "./modules/room-list";
import { createRoomActions } from "./modules/rooms";
import { createSelection } from "./modules/selection";
import { createChatUi } from "./modules/ui";

export const useChatUiStore = defineStore("chat-ui", () => {
  const core = createChatCore();
  const roomList = createRoomList(core);
  const folderDraft = createFolderDraft(roomList);
  const notifications = createNotifications(core);
  const selection = createSelection(core);
  const messages = createMessages(core);
  const roomActions = createRoomActions(core);
  const ui = createChatUi();

  const hydrateMocks = (): void => {
    core.rooms.value = cloneJson(MOCK_ROOMS);
    core.messagesByRoom.value = cloneJson(MOCK_MESSAGES_BY_ROOM);
    core.extras.value = cloneJson(MOCK_ROOM_EXTRAS);
    roomList.folders.value = cloneJson(MOCK_FOLDERS);
    core.roomsLoaded.value = true;
    core.messagesLoaded.value = false;
    notifications.seedNotificationExceptions();
  };

  hydrateMocks();

  return {
    currentUserId: core.currentUserId,
    rooms: core.rooms,
    messagesByRoom: core.messagesByRoom,
    extras: core.extras,
    activeRoomId: core.activeRoomId,
    roomsLoaded: core.roomsLoaded,
    messagesLoaded: core.messagesLoaded,
    messageSelection: core.messageSelection,
    knownUsers: core.knownUsers,
    contacts: core.contacts,
    findUser: core.findUser,
    findRoom: core.findRoom,
    findMessage: core.findMessage,
    isSelecting: core.isSelecting,
    setRoomMessages: core.setRoomMessages,
    selectRoom: core.setActiveRoom,
    ...roomList,
    ...folderDraft,
    ...notifications,
    ...selection,
    ...messages,
    ...roomActions,
    ...ui,
  };
});
