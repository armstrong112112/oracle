import {
  sanitizeArray,
  sanitizeMap,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  role: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export interface UserListResponseDto {
  users: UserDto[];
  total: number;
  page: number;
  limit: number;
}

export const sanitizeUser = (payload: unknown): UserDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    email: sanitizeString(dto.email),
    firstName: sanitizeString(dto.firstName),
    lastName: sanitizeString(dto.lastName),
    fullName: sanitizeString(dto.fullName),
    avatar: sanitizeString(dto.avatar),
    role: sanitizeString(dto.role),
    phone: sanitizeString(dto.phone),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
    metadata: sanitizeMap(dto.metadata),
  };
};

export const sanitizeUsers = (payload: unknown): UserDto[] => {
  return sanitizeArray(unwrapApiPayload(payload), []).map((item) => sanitizeUser(item));
};

export const sanitizeUserListResponse = (payload: unknown): UserListResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    users: sanitizeUsers(dto.users),
    total: Number(dto.total ?? 0),
    page: Number(dto.page ?? 0),
    limit: Number(dto.limit ?? 0),
  };
};
