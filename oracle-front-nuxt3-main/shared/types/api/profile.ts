import { sanitizeArray, sanitizeRecord, sanitizeString, unwrapApiPayload } from "./common";

export interface ProfileDto {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  selectedCategories?: string[];
  [key: string]: unknown;
}

export interface ProfileListQuery {
  selectedCategories?: string[];
  name?: string;
}

export function sanitizeProfile(payload: unknown): ProfileDto {
  const unwrappedPayload = unwrapApiPayload(payload);

  if (!unwrappedPayload || typeof unwrappedPayload !== "object") {
    return {
      id: "",
      selectedCategories: [],
    };
  }

  const dto = sanitizeRecord(unwrappedPayload);

  return {
    ...dto,
    id: sanitizeString(dto.id),
    email: sanitizeString(dto.email),
    name: sanitizeString(dto.name),
    firstName: sanitizeString(dto.firstName),
    lastName: sanitizeString(dto.lastName),
    avatar: sanitizeString(dto.avatar),
    selectedCategories: sanitizeArray<string>(dto.selectedCategories, []),
  };
}

export function sanitizeProfiles(payload: unknown): ProfileDto[] {
  const unwrappedPayload = unwrapApiPayload(payload);

  if (!Array.isArray(unwrappedPayload)) {
    return [];
  }

  return unwrappedPayload.map((item) => sanitizeProfile(item));
}
