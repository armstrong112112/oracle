import { ref } from "vue";
import { isServiceRoom } from "~/entities/chat/lib/important-rooms";
import { toNotificationException } from "~/entities/chat/lib/notification-exception";
import {
  ChatKind,
  NOTIFICATION_ROOM_KIND,
  NotificationKind,
  NotificationSound,
} from "~/entities/chat/model";
import type {
  InAppNotificationKey,
  NotificationCategory,
  NotificationException,
  NotificationSettings,
} from "~/entities/chat/model";
import type { ChatCore } from "../core";

const SEED_EXCEPTIONS: Record<ChatKind, number> = {
  [ChatKind.Dm]: 2,
  [ChatKind.Group]: 3,
  [ChatKind.Channel]: 3,
};

const emptyCategory = (enabled: boolean): NotificationCategory => ({
  enabled,
  preview: true,
  sound: NotificationSound.Note,
  exceptions: [],
});

export const createNotifications = (core: ChatCore) => {
  const notificationSettings = ref<NotificationSettings>({
    inAppSounds: false,
    inAppVibrate: false,
    inAppPreview: true,
    [NotificationKind.Private]: emptyCategory(false),
    [NotificationKind.Groups]: emptyCategory(true),
    [NotificationKind.Channels]: emptyCategory(true),
  });

  const seedNotificationExceptions = (): void => {
    const next = { ...notificationSettings.value };
    for (const kind of Object.values(NotificationKind)) {
      const roomKind = NOTIFICATION_ROOM_KIND[kind];
      const exceptions = core.rooms.value
        .filter((room) => core.extras.value[room.roomId]?.kind === roomKind && !isServiceRoom(room.roomId))
        .slice(0, SEED_EXCEPTIONS[roomKind])
        .map((room) => toNotificationException(room, core.extras.value[room.roomId]));
      next[kind] = { ...next[kind], exceptions };
    }
    notificationSettings.value = next;
  };

  const setInAppNotification = (key: InAppNotificationKey, value: boolean): void => {
    notificationSettings.value = { ...notificationSettings.value, [key]: value };
  };

  const updateNotificationCategory = (kind: NotificationKind, patch: Partial<NotificationCategory>): void => {
    notificationSettings.value = {
      ...notificationSettings.value,
      [kind]: { ...notificationSettings.value[kind], ...patch },
    };
  };

  const exceptionsOf = (kind: NotificationKind): NotificationException[] =>
    notificationSettings.value[kind].exceptions;

  const removeNotificationException = (kind: NotificationKind, id: string): void => {
    updateNotificationCategory(kind, { exceptions: exceptionsOf(kind).filter((item) => item.id !== id) });
  };

  const clearNotificationExceptions = (kind: NotificationKind): void => {
    updateNotificationCategory(kind, { exceptions: [] });
  };

  const addNotificationExceptions = (kind: NotificationKind, items: NotificationException[]): void => {
    const current = exceptionsOf(kind);
    const known = new Set(current.map((item) => item.id));
    updateNotificationCategory(kind, { exceptions: [...current, ...items.filter((item) => !known.has(item.id))] });
  };

  return {
    notificationSettings,
    seedNotificationExceptions,
    setInAppNotification,
    updateNotificationCategory,
    removeNotificationException,
    clearNotificationExceptions,
    addNotificationExceptions,
  };
};
