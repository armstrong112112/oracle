import type {
  ChatKind,
  ChatModalName,
  ChatRole,
  DraftContextType,
  FolderDraftMode,
  FolderExcludeType,
  FolderIncludeType,
  NotificationSound,
} from "./enums";

export interface ChatFolder {
  id: string;
  name: string;
  includeIds: string[];
  excludeIds: string[];
  includeTypes: ChatKind[];
  color?: string | null;
  includeTypeIds?: FolderIncludeType[];
  excludeTypeIds?: FolderExcludeType[];
}

export interface ChatFolderSnapshot {
  name: string;
  color: string | null;
  includeIds: string[];
  excludeIds: string[];
  includeTypeIds: FolderIncludeType[];
  excludeTypeIds: FolderExcludeType[];
}

export interface ChatFolderDraft extends ChatFolderSnapshot {
  mode: FolderDraftMode;
  id: string | null;
  baseline: ChatFolderSnapshot | null;
}

export interface NotificationException {
  id: string;
  name: string;
  avatar: string;
  status: string;
  owner: boolean;
}

export interface NotificationCategory {
  enabled: boolean;
  preview: boolean;
  sound: NotificationSound;
  exceptions: NotificationException[];
}

export interface InAppNotifications {
  inAppSounds: boolean;
  inAppVibrate: boolean;
  inAppPreview: boolean;
}

export type InAppNotificationKey = keyof InAppNotifications;

export interface NotificationSettings extends InAppNotifications {
  private: NotificationCategory;
  groups: NotificationCategory;
  channels: NotificationCategory;
}

export interface ChatRoomExtra {
  roomId: string;
  kind: ChatKind;
  role: ChatRole;
  folderIds: string[];
  muted: boolean;
  important?: boolean;
  importantSticky?: boolean;
  mediaBlocked?: boolean;
  pinned?: boolean;
  archived?: boolean;
  premium?: boolean;
  autodelete?: boolean;
  paid?: boolean;
  banned?: boolean;
  bio?: string;
  members?: number;
  online?: number;
  subscribers?: number;
}

export interface ChatUiModal {
  name: ChatModalName | null;
  payload: unknown;
}

export interface ChatDraftContext {
  type: DraftContextType;
  message: VacMessage;
}

export interface ChatContextMenuPayload {
  x: number;
  y: number;
  roomId: string;
  messageId: string;
}

export interface ChatDeleteMessagesPayload {
  roomId: string;
  messageIds: string[];
}

export interface ChatMessageSelection {
  roomId: string;
  ids: string[];
}

export interface ScheduledMessage {
  id: string;
  roomId: string;
  content: string;
  at: string;
}

export type CreatableKind = ChatKind.Group | ChatKind.Channel;

export interface CreateRoomInput {
  kind: CreatableKind;
  name: string;
  avatar?: string;
  paid?: boolean;
  memberIds: string[];
}

export interface VacUserStatus {
  state: "online" | "offline";
  lastChanged: string;
}

export interface VacRoomUser {
  _id: string;
  username: string;
  avatar: string;
  status: VacUserStatus;
}

export interface VacMessageFile {
  name: string;
  type: string;
  extension: string;
  url: string;
  localUrl?: string;
  preview?: string;
  size?: number;
  audio?: boolean;
  duration?: number;
  progress?: number;
}

export interface VacLastMessage {
  content: string;
  senderId: string;
  username?: string;
  timestamp?: string;
  saved?: boolean;
  distributed?: boolean;
  seen?: boolean;
  new?: boolean;
  files?: VacMessageFile[];
  deleted?: boolean;
}

export interface VacRoom {
  roomId: string;
  roomName: string;
  avatar: string;
  users: VacRoomUser[];
  unreadCount?: number;
  index?: string | number | Date;
  lastMessage?: VacLastMessage;
  typingUsers?: string[];
}

export type ReactionMap = Record<string, Array<string | number>>;

export interface VacMessage {
  _id: string;
  senderId: string;
  indexId?: string | number;
  content?: string;
  username?: string;
  avatar?: string;
  date?: string;
  timestamp?: string;
  system?: boolean;
  saved?: boolean;
  distributed?: boolean;
  seen?: boolean;
  deleted?: boolean;
  edited?: boolean;
  pinned?: boolean;
  failure?: boolean;
  disableActions?: boolean;
  disableReactions?: boolean;
  files?: VacMessageFile[];
  reactions?: ReactionMap;
  replyMessage?: VacMessage;
}

export interface VacFetchMessagesPayload {
  room: VacRoom;
  options?: { reset?: boolean };
}

export interface VacSendMessagePayload {
  roomId: string;
  content: string;
  files?: VacIncomingFile[];
  replyMessage?: VacMessage;
  usersTag?: VacRoomUser[];
}

export interface VacEditMessagePayload {
  roomId: string;
  messageId: string;
  newContent: string;
  files?: VacIncomingFile[];
  replyMessage?: VacMessage;
  usersTag?: VacRoomUser[];
}

export interface VacDeleteMessagePayload {
  roomId: string;
  message: VacMessage;
}

export interface VacReactionPayload {
  roomId: string;
  messageId: string;
  reaction: string | { unicode?: string; name?: string };
  remove?: boolean;
}

export interface VacIncomingFile extends VacMessageFile {
  blob?: Blob;
}

export interface MediaBox {
  top: number;
  left: number;
  width: number;
  height: number;
}
