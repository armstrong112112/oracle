import { ChatRoute } from "~/entities/chat/config";
import { NotificationKind, NotificationSound } from "~/entities/chat/model";
import type { InAppNotificationKey } from "~/entities/chat/model";

export const NOTIFICATION_TITLE_KEY: Record<NotificationKind, string> = {
  [NotificationKind.Private]: "chat.notifications.privateChats",
  [NotificationKind.Groups]: "chat.notifications.groupChats",
  [NotificationKind.Channels]: "chat.notifications.channels",
};

export const NOTIFICATION_ICON: Record<NotificationKind, string> = {
  [NotificationKind.Private]: "/svg/figma-icons/privacy.svg",
  [NotificationKind.Groups]: "/svg/figma-icons/groups.svg",
  [NotificationKind.Channels]: "/svg/figma-icons/channels.svg",
};

export const NOTIFICATION_SOUND_KEY: Record<NotificationSound, string> = {
  [NotificationSound.Note]: "chat.notifications.soundNote",
  [NotificationSound.Default]: "chat.notifications.soundDefault",
  [NotificationSound.None]: "chat.notifications.soundNone",
};

export const IN_APP_TOGGLE_KEYS: Record<InAppNotificationKey, string> = {
  inAppSounds: "chat.notifications.inAppSounds",
  inAppVibrate: "chat.notifications.inAppVibrate",
  inAppPreview: "chat.notifications.inAppPreview",
};

export const NOTIFICATION_KINDS = Object.values(NotificationKind);

export const isNotificationKind = (value: unknown): value is NotificationKind =>
  NOTIFICATION_KINDS.includes(value as NotificationKind);

export const notificationPath = (kind: NotificationKind): string => `${ChatRoute.Notifications}/${kind}`;
