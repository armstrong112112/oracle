// types.ts
export interface NotificationItem {
  id: string;
  title: string;
  timestamp: string;
  read: boolean;
  icon?: string;
  category: "updates" | "news" | "all";
  date: string; // For grouping by date
}

// announcementData.ts
export const announcementData: NotificationItem[] = [
  {
    id: "1",
    title: "oracleSecurityUpdate",
    timestamp: "12:03",
    read: false,
    icon: "/icons/notifications/announcements.svg",
    category: "updates",
    date: "March 20, 2025",
  },
  {
    id: "2",
    title: "specialPromo",
    timestamp: "12:03",
    read: false,
    icon: "/icons/notifications/announcements.svg",
    category: "news",
    date: "March 20, 2025",
  },
  {
    id: "3",
    title: "loremIpsum",
    timestamp: "12:03",
    read: false,
    icon: "/icons/notifications/announcements.svg",
    category: "news",
    date: "March 20, 2025",
  },
  {
    id: "4",
    title: "oracleSecurityUpdate",
    timestamp: "12:03",
    read: true,
    icon: "/icons/notifications/announcements.svg",
    category: "updates",
    date: "March 20, 2025",
  },
  {
    id: "5",
    title: "oracleSecurityUpdate",
    timestamp: "12:03",
    read: true,
    icon: "/icons/notifications/announcements.svg",
    category: "updates",
    date: "March 20, 2025",
  },
  {
    id: "6",
    title: "specialPromo",
    timestamp: "12:03",
    read: true,
    icon: "/icons/notifications/announcements.svg",
    category: "news",
    date: "March 20, 2025",
  },
  {
    id: "7",
    title: "loremIpsum",
    timestamp: "12:03",
    read: true,
    icon: "/icons/notifications/announcements.svg",
    category: "updates",
    date: "March 20, 2025",
  },
];
