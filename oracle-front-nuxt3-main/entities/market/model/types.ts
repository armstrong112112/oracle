export interface Reaction {
  emoji: string;
  count: number;
}

export interface Post {
  id: string;
  type: "text" | "image" | "video";
  content?: string;
  author: string;
  timestamp: string;
  image?: string;
  video?: string;
  reactions?: Reaction[];
  views: string;
  username: string;
  blackListContent?: string;
}

export interface UpdateReactionsPayload {
  postId: string;
  reactions: Reaction[];
}
