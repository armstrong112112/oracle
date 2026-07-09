import type { CheckItem } from "~/entities/checks/model/checks.types";
import { sanitizeArray, sanitizeNumber, sanitizeRecord, sanitizeString, unwrapApiPayload } from "./common";

export type CheckStatus = CheckItem["status"];

export interface ChecksListResponseDto {
  checks: CheckItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateCheckRequestDto {
  amount?: string;
  usdValue?: string;
  remaining?: string;
  perActivation?: string;
  rate?: string;
  status?: CheckStatus;
  createdOn?: string;
}

export interface CreateCheckResponseDto {
  success: boolean;
  check: CheckItem;
}

export const sanitizeCheckItem = (payload: unknown): CheckItem => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));

  return {
    amount: sanitizeString(dto.amount),
    usdValue: sanitizeString(dto.usdValue),
    remaining: sanitizeString(dto.remaining),
    perActivation: sanitizeString(dto.perActivation),
    rate: sanitizeString(dto.rate),
    status: sanitizeString(dto.status) as CheckStatus,
    createdOn: sanitizeString(dto.createdOn),
  };
};

export const sanitizeChecksListResponse = (payload: unknown): ChecksListResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));

  return {
    checks: sanitizeArray(dto.checks, []).map((item) => sanitizeCheckItem(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    pageSize: sanitizeNumber(dto.pageSize),
  };
};

export const sanitizeCreateCheckResponse = (payload: unknown): CreateCheckResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));

  return {
    success: Boolean(dto.success),
    check: sanitizeCheckItem(dto.check),
  };
};
