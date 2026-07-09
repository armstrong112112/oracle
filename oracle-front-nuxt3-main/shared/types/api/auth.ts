import { sanitizeBoolean, sanitizeRecord, sanitizeString, unwrapApiPayload } from "./common";

export interface AuthSessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSessionResponse {
  success?: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: AuthSessionUser;
}

export interface LoginRequestDto {
  login: string;
  password: string;
}

export interface RegisterRequestDto {
  login: string;
  password: string;
}

export interface TelegramAuthRequestDto {
  telegramID: string;
  code: string;
}

export function sanitizeAuthSessionResponse(
  payload: unknown,
): AuthSessionResponse {
  const unwrappedPayload = unwrapApiPayload(payload);

  if (!unwrappedPayload || typeof unwrappedPayload !== "object") {
    return {};
  }

  const dto = sanitizeRecord(unwrappedPayload);
  const userPayload =
    dto.user && typeof dto.user === "object" && !Array.isArray(dto.user)
      ? sanitizeRecord(dto.user)
      : undefined;

  return {
    success: sanitizeBoolean(dto.success),
    accessToken: sanitizeString(dto.accessToken),
    refreshToken: sanitizeString(dto.refreshToken),
    user: userPayload
      ? {
          id: sanitizeString(userPayload.id),
          email: sanitizeString(userPayload.email),
          firstName: sanitizeString(userPayload.firstName),
          lastName: sanitizeString(userPayload.lastName),
          role: sanitizeString(userPayload.role),
          createdAt: sanitizeString(userPayload.createdAt),
          updatedAt: sanitizeString(userPayload.updatedAt),
        }
      : undefined,
  };
}
