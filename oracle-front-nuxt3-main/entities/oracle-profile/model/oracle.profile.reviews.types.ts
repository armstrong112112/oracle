export interface IReply {
  id: number;
  text: string;
  username: string;
  date: string;
}

export interface IReview {
  id: number;
  username: string;
  text: string;
  isPositive: boolean;
  avatar: string;
  date: string;
  replies: IReply[];
}
