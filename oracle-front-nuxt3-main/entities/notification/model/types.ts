export const NOTIFICATION_TYPES = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  TIME: 'time',
  NEUTRAL: 'neutral'
}

export const NOTIFICATION_ICONS = {
  [NOTIFICATION_TYPES.POSITIVE]: 'check-circle',
  [NOTIFICATION_TYPES.NEGATIVE]: 'alert-circle',
  [NOTIFICATION_TYPES.TIME]: 'clock',
  [NOTIFICATION_TYPES.NEUTRAL]: 'info'
}
export interface NotificationType {
  id: number,
  type: string,
  title: string,
  message: string,
  time: string,
  icon: string,
  unreadCount: number,
}
export interface NotificationGroup {
  id: number;
  date?: string;
  notifications: {
    title: string;
    time: string;
    message: string;
    id?: number;
  }[];
}
export interface NotificationListType {
  image: string,
  title: string,
  subtitle: string,
  date: string,
  badgeCount: number,
  route: string
}

