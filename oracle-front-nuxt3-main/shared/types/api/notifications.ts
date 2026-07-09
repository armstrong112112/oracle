import { sanitizeArray, sanitizeNumber, sanitizeRecord, sanitizeString, unwrapApiPayload } from "./common";

export interface NotificationDto {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  unreadCount: number;
}

export interface NotificationGroupDto {
  id: number;
  date?: string;
  notifications: {
    title: string;
    time: string;
    message: string;
    id?: number;
  }[];
}

export interface NotificationListDto {
  image: string;
  title: string;
  subtitle: string;
  date: string;
  badgeCount: number;
  route: string;
}

export const sanitizeNotification = (payload: unknown): NotificationDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeNumber(dto.id),
    type: sanitizeString(dto.type),
    title: sanitizeString(dto.title),
    message: sanitizeString(dto.message),
    time: sanitizeString(dto.time),
    icon: sanitizeString(dto.icon),
    unreadCount: sanitizeNumber(dto.unreadCount),
  };
};

export const sanitizeNotificationGroup = (payload: unknown): NotificationGroupDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeNumber(dto.id),
    date: sanitizeString(dto.date),
    notifications: sanitizeArray(dto.notifications, []).map((item) => {
      const n = sanitizeRecord(item);
      return {
        title: sanitizeString(n.title),
        time: sanitizeString(n.time),
        message: sanitizeString(n.message),
        id: sanitizeNumber(n.id),
      };
    }),
  };
};
