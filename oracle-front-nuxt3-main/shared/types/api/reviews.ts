import { sanitizeArray, sanitizeBoolean, sanitizeNumber, sanitizeRecord, sanitizeString, unwrapApiPayload } from "./common";

export interface ReviewReplyDto {
  id: number;
  text: string;
  username: string;
  date: string;
}

export interface ReviewDto {
  id: number;
  username: string;
  text: string;
  isPositive: boolean;
  avatar: string;
  date: string;
  replies: ReviewReplyDto[];
}

export interface CreateReviewRequestDto {
  username: string;
  text: string;
  isPositive: boolean;
}

export interface GetUserReviewsResponseDto {
  reviews: ReviewDto[];
  total: number;
}

export const sanitizeReviewReply = (payload: unknown): ReviewReplyDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeNumber(dto.id),
    text: sanitizeString(dto.text),
    username: sanitizeString(dto.username),
    date: sanitizeString(dto.date),
  };
};

export const sanitizeReview = (payload: unknown): ReviewDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeNumber(dto.id),
    username: sanitizeString(dto.username),
    text: sanitizeString(dto.text),
    isPositive: sanitizeBoolean(dto.isPositive),
    avatar: sanitizeString(dto.avatar),
    date: sanitizeString(dto.date),
    replies: sanitizeArray(dto.replies, []).map((item) => sanitizeReviewReply(item)),
  };
};
