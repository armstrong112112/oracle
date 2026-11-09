import type { FolderExcludeType, FolderIncludeType, RoomAction } from "~/entities/chat/model";

export interface RoomSwipeApi {
  label: (action: RoomAction, roomId: string) => string;
  run: (action: RoomAction, roomId: string) => void;
  order: () => string[];
}

export interface ImportantChatsApi {
  label: () => string;
  open: () => boolean;
  toggle: () => void;
  mount: (mounted: boolean) => void;
}

export interface SelectionDragApi {
  ids: () => readonly string[];
  active: () => boolean;
  setIds: (ids: string[]) => void;
  canSelect: (id: string) => boolean;
  togglePhoto: (messageId: string, index: number) => void;
}

export interface FolderTypeOption<T extends FolderIncludeType | FolderExcludeType> {
  id: T;
  label: string;
  icon: string;
}
