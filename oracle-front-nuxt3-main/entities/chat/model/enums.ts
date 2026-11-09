export enum ChatKind {
  Dm = "dm",
  Group = "group",
  Channel = "channel",
}

export enum ChatRole {
  Owner = "owner",
  Admin = "admin",
  Member = "member",
  Subscriber = "subscriber",
}

export enum ChatModalName {
  ChatCard = "chat-card",
  MediaList = "media-list",
  Members = "members",
  BansMutes = "bans-mutes",
  Welcome = "welcome",
  RecentActions = "recent-actions",
  ChatHistory = "chat-history",
  Poll = "poll",
  GifPicker = "gif-picker",
  Schedule = "schedule",
  VideoCircle = "video-circle",
  ContextMenu = "context-menu",
  DeleteMessages = "delete-messages",
}

export const CARD_MODAL_NAMES: readonly ChatModalName[] = [
  ChatModalName.ChatCard,
  ChatModalName.MediaList,
  ChatModalName.Members,
  ChatModalName.BansMutes,
  ChatModalName.Welcome,
  ChatModalName.RecentActions,
  ChatModalName.ChatHistory,
];

export enum NotificationKind {
  Private = "private",
  Groups = "groups",
  Channels = "channels",
}

export const NOTIFICATION_ROOM_KIND: Record<NotificationKind, ChatKind> = {
  [NotificationKind.Private]: ChatKind.Dm,
  [NotificationKind.Groups]: ChatKind.Group,
  [NotificationKind.Channels]: ChatKind.Channel,
};

export enum NotificationSound {
  Note = "note",
  Default = "default",
  None = "none",
}

export const NOTIFICATION_SOUND_ORDER: readonly NotificationSound[] = [
  NotificationSound.Note,
  NotificationSound.Default,
  NotificationSound.None,
];

export enum FolderIncludeType {
  Contacts = "contacts",
  NonContacts = "nonContacts",
  Groups = "groups",
  Channels = "channels",
  Bots = "bots",
}

export enum FolderExcludeType {
  Saved = "saved",
  Catalogue = "catalogue",
  Archived = "archived",
}

export const FOLDER_INCLUDE_KIND: Partial<Record<FolderIncludeType, ChatKind>> = {
  [FolderIncludeType.Contacts]: ChatKind.Dm,
  [FolderIncludeType.NonContacts]: ChatKind.Dm,
  [FolderIncludeType.Groups]: ChatKind.Group,
  [FolderIncludeType.Channels]: ChatKind.Channel,
};

export enum FolderDraftMode {
  New = "new",
  Edit = "edit",
}

export enum FolderPickerKind {
  Include = "include",
  Exclude = "exclude",
}

export enum DeleteScope {
  Me = "me",
  Both = "both",
}

export enum DraftContextType {
  Reply = "reply",
  Edit = "edit",
}

export enum MessageAction {
  Reply = "reply",
  Copy = "copy",
  Edit = "edit",
  Delete = "delete",
  Save = "save",
  Forward = "forward",
  Select = "select",
  Pin = "pin",
  Unpin = "unpin",
}

export enum RoomAction {
  Pin = "pin",
  Mute = "mute",
  Delete = "delete",
  Archive = "archive",
}

export enum MediaKind {
  Image = "image",
  Video = "video",
}

export const ALL_FOLDER_ID = "all";

export enum SystemRoomId {
  Saved = "saved",
  Catalogue = "sys-catalogue",
  Platforms = "sys-platforms",
}

export const CATALOGUE_ROOM_IDS: readonly string[] = [SystemRoomId.Catalogue, SystemRoomId.Platforms];

export const DEFAULT_AVATAR = "/png/zaglushka.png";
