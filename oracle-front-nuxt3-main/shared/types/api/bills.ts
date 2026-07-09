import type { Bill } from "~/entities/bills/data/BillsData";
import {
  sanitizeArray,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";

export interface BillDto extends Bill {}

export interface BillsListResponseDto {
  bills: BillDto[];
  total: number;
  page: number;
  pageSize: number;
}

export const sanitizeBill = (payload: unknown): BillDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));

  return {
    id: sanitizeNumber(dto.id),
    icon: sanitizeString(dto.icon),
    heading: sanitizeString(dto.heading),
    amountTON: sanitizeNumber(dto.amountTON),
    amountUSD: sanitizeNumber(dto.amountUSD),
    dateLabel: sanitizeString(dto.dateLabel),
    date: sanitizeString(dto.date),
    type: sanitizeString(dto.type),
  };
};

export const sanitizeBillsListResponse = (payload: unknown): BillsListResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));

  return {
    bills: sanitizeArray(dto.bills, []).map((item) => sanitizeBill(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    pageSize: sanitizeNumber(dto.pageSize),
  };
};
