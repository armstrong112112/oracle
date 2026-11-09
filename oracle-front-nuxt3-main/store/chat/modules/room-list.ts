import { computed, ref } from "vue";
import { importantRoomRank } from "~/entities/chat/lib/important-rooms";
import {
  ALL_FOLDER_ID,
  CATALOGUE_ROOM_IDS,
  FOLDER_INCLUDE_KIND,
  FolderExcludeType,
  SystemRoomId,
} from "~/entities/chat/model";
import type { ChatFolder, VacRoom } from "~/entities/chat/model";
import type { ChatCore } from "../core";

export const createRoomList = (core: ChatCore) => {
  const folders = ref<ChatFolder[]>([]);
  const activeFolderId = ref(ALL_FOLDER_ID);
  const importantOpen = ref(true);
  const importantMounted = ref(true);

  const isExcluded = (room: VacRoom, folder: ChatFolder): boolean => {
    if (folder.excludeIds.includes(room.roomId)) {
      return true;
    }
    const types = folder.excludeTypeIds ?? [];
    return (
      (types.includes(FolderExcludeType.Archived) && Boolean(core.extras.value[room.roomId]?.archived)) ||
      (types.includes(FolderExcludeType.Saved) && room.roomId === SystemRoomId.Saved) ||
      (types.includes(FolderExcludeType.Catalogue) && CATALOGUE_ROOM_IDS.includes(room.roomId))
    );
  };

  const roomInFolder = (room: VacRoom, folder: ChatFolder): boolean => {
    if (isExcluded(room, folder)) {
      return false;
    }
    const extra = core.extras.value[room.roomId];
    const typeIds = folder.includeTypeIds ?? [];
    if (!folder.includeIds.length && !folder.includeTypes.length && !typeIds.length) {
      return Boolean(extra?.folderIds.includes(folder.id));
    }
    const isEditorFolder = Boolean(folder.includeTypeIds || folder.excludeTypeIds);
    if (folder.includeIds.includes(room.roomId)) {
      return true;
    }
    if (!extra || (!isEditorFolder && folder.includeIds.length)) {
      return false;
    }
    return folder.includeTypes.includes(extra.kind) || typeIds.some((id) => FOLDER_INCLUDE_KIND[id] === extra.kind);
  };

  const byPriority = (left: VacRoom, right: VacRoom): number => {
    const leftRank = importantRoomRank(left.roomId);
    const rightRank = importantRoomRank(right.roomId);
    if (leftRank >= 0 || rightRank >= 0) {
      if (leftRank >= 0 && rightRank >= 0) {
        return leftRank - rightRank;
      }
      return leftRank >= 0 ? -1 : 1;
    }
    const pinned = (room: VacRoom): number => (core.extras.value[room.roomId]?.pinned ? 1 : 0);
    return pinned(right) - pinned(left);
  };

  const presentRooms = (list: VacRoom[]): VacRoom[] =>
    list
      .filter((room) => {
        const extra = core.extras.value[room.roomId];
        return !extra?.archived && !(extra?.important && !extra.importantSticky && !importantMounted.value);
      })
      .sort(byPriority);

  const visibleRooms = computed((): VacRoom[] => {
    const folder = folders.value.find((item) => item.id === activeFolderId.value);
    if (activeFolderId.value === ALL_FOLDER_ID || !folder) {
      return presentRooms(core.rooms.value);
    }
    return presentRooms(core.rooms.value.filter((room) => roomInFolder(room, folder)));
  });

  const setActiveFolder = (folderId: string): void => {
    activeFolderId.value = folderId;
  };

  const setFolderOrder = (next: ChatFolder[]): void => {
    folders.value = next;
  };

  const removeFolder = (folderId: string): void => {
    if (folderId === ALL_FOLDER_ID) {
      return;
    }
    folders.value = folders.value.filter((item) => item.id !== folderId);
    if (activeFolderId.value === folderId) {
      activeFolderId.value = ALL_FOLDER_ID;
    }
  };

  const toggleImportant = (): void => {
    importantOpen.value = !importantOpen.value;
  };

  const setImportantMounted = (mounted: boolean): void => {
    importantMounted.value = mounted;
  };

  return {
    folders,
    activeFolderId,
    importantOpen,
    visibleRooms,
    setActiveFolder,
    setFolderOrder,
    removeFolder,
    toggleImportant,
    setImportantMounted,
  };
};

export type RoomList = ReturnType<typeof createRoomList>;
