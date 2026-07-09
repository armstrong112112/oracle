import type { Post } from "~/entities/market/model/types";

export const Posts: Post[] = [
  {
    id: "1",
    type: "text",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam he",
    author: "Alexey",
    timestamp: "9:36 PM",
    reactions: [
      { emoji: "smile", count: 23 },
      { emoji: "heart", count: 23 },
      { emoji: "angry", count: 23 },
      { emoji: "heart-eyes", count: 23 },
    ],
    views: "1.6K",
    username: "Alexey_User",
  },

  {
    id: "2",
    type: "text",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Maria",
    timestamp: "10:15 AM",
    reactions: [
      { emoji: "smile", count: 23 },
      { emoji: "heart", count: 23 },
      { emoji: "angry", count: 23 },
      { emoji: "heart-eyes", count: 23 },
    ],
    views: "2.3K",
    username: "Maria_Dev",
  },

  {
    id: "3",
    type: "image",
    content: "Lorem ipsum dolor sit amet!",
    image: "/icons/market/chatPlaceholder.svg",
    author: "John",
    timestamp: "3:45 PM",
    reactions: [
      { emoji: "smile", count: 23 },
      { emoji: "heart", count: 23 },
      { emoji: "angry", count: 23 },
      { emoji: "heart-eyes", count: 23 },
    ],
    views: "5.1K",
    username: "John_Doe",
  },

  {
    id: "4",
    type: "video",
    content: "Lorem ipsum dolor sit amet!",
    video: "/videos/moon.mp4",
    author: "Sophie",
    timestamp: "8:20 PM",
    reactions: [
      { emoji: "smile", count: 23 },
      { emoji: "heart", count: 23 },
      { emoji: "angry", count: 23 },
      { emoji: "heart-eyes", count: 23 },
    ],
    views: "3.8K",
    username: "Sophie_Video",
  },
];
