import {
  sanitizeArray,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";

export interface BalanceDto {
  id: string;
  userId: string;
  cryptoBalance: Record<string, number>;
  totalHoldAmount: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface BalanceHoldDto {
  id: string;
  userId: string;
  cryptocurrency: string;
  amount: number;
  type: string;
  relatedTransactionId?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionHistoryEntryDto {
  id: string;
  userId: string;
  type: string;
  cryptocurrency: string;
  amount: number;
  relatedTransactionId?: string;
  status: string;
  createdAt: string;
}

export interface TransactionHistoryResponseDto {
  transactions: TransactionHistoryEntryDto[];
  total: number;
  page: number;
  limit: number;
}

export interface GetBalanceRequestDto {
  userId: string;
}

export interface CreateHoldRequestDto {
  userId: string;
  cryptocurrency: string;
  amount: number;
  type: string;
  relatedTransactionId?: string;
}

export interface ReleaseHoldRequestDto {
  holdId: string;
}

export interface TransferRequestDto {
  fromUserId: string;
  toUserId: string;
  cryptocurrency: string;
  amount: number;
  transactionId: string;
}

export interface DepositRequestDto {
  userId: string;
  cryptocurrency: string;
  amount: number;
}

export interface WithdrawRequestDto {
  userId: string;
  cryptocurrency: string;
  amount: number;
}

export interface GetTransactionHistoryRequestDto {
  userId: string;
  cryptocurrency?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const sanitizeBalance = (payload: unknown): BalanceDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    userId: sanitizeString(dto.userId),
    cryptoBalance: sanitizeRecord(dto.cryptoBalance) as Record<string, number>,
    totalHoldAmount: sanitizeRecord(dto.totalHoldAmount) as Record<string, number>,
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
  };
};

export const sanitizeBalanceHold = (payload: unknown): BalanceHoldDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    userId: sanitizeString(dto.userId),
    cryptocurrency: sanitizeString(dto.cryptocurrency),
    amount: sanitizeNumber(dto.amount),
    type: sanitizeString(dto.type),
    relatedTransactionId: sanitizeString(dto.relatedTransactionId),
    expiresAt: sanitizeString(dto.expiresAt),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
  };
};

export const sanitizeTransactionHistoryEntry = (
  payload: unknown,
): TransactionHistoryEntryDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    userId: sanitizeString(dto.userId),
    type: sanitizeString(dto.type),
    cryptocurrency: sanitizeString(dto.cryptocurrency),
    amount: sanitizeNumber(dto.amount),
    relatedTransactionId: sanitizeString(dto.relatedTransactionId),
    status: sanitizeString(dto.status),
    createdAt: sanitizeString(dto.createdAt),
  };
};

export const sanitizeTransactionHistoryResponse = (
  payload: unknown,
): TransactionHistoryResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    transactions: sanitizeArray(
      dto.transactions,
      [],
    ).map((item) => sanitizeTransactionHistoryEntry(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    limit: sanitizeNumber(dto.limit),
  };
};
