import {
  sanitizeArray,
  sanitizeBoolean,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";

export interface EscrowDto {
  id: string;
  transactionId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  releaseAt: string;
  isReleased: boolean;
  metadata: Record<string, unknown>;
}

export interface EscrowListResponseDto {
  escrows: EscrowDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateEscrowRequestDto {
  transactionId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: string;
  releaseAt?: string;
}

export interface UpdateEscrowStatusRequestDto {
  escrowId: string;
  status: string;
  releaseAt?: string;
}

export const sanitizeEscrow = (payload: unknown): EscrowDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    transactionId: sanitizeString(dto.transactionId),
    buyerId: sanitizeString(dto.buyerId),
    sellerId: sanitizeString(dto.sellerId),
    amount: sanitizeNumber(dto.amount),
    currency: sanitizeString(dto.currency),
    status: sanitizeString(dto.status),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
    releaseAt: sanitizeString(dto.releaseAt),
    isReleased: sanitizeBoolean(dto.isReleased),
    metadata: sanitizeRecord(dto.metadata),
  };
};

export const sanitizeEscrowListResponse = (payload: unknown): EscrowListResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    escrows: sanitizeArray(dto.escrows, []).map((item) => sanitizeEscrow(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    limit: sanitizeNumber(dto.limit),
  };
};
