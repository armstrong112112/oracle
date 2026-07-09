import {
  sanitizeArray,
  sanitizeHistoryTransactionStatus,
  sanitizeHistoryTransactionType,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
  type HistoryTransactionStatusDto,
  type HistoryTransactionTypeDto,
} from "./common";

export interface TransactionHistoryTransactionDto {
  id: string;
  type: HistoryTransactionTypeDto;
  status: HistoryTransactionStatusDto;
  cryptocurrency: string;
  fiatCurrency: string;
  cryptoAmount: string;
  fiatAmount: string;
  customerId: string;
  exchangerId: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
  finishedAt: string;
}

export interface GetAllTransactionsHistoryRequestDto {
  page: number;
  limit: number;
}

export interface GetAllTransactionsHistoryResponseDto {
  transactions: TransactionHistoryTransactionDto[];
  total: number;
}

export interface GetTransactionHistoryByUserIdRequestDto {
  userId: string;
  page: number;
  limit: number;
}

export interface GetTransactionHistoryByUserIdResponseDto {
  transactions: TransactionHistoryTransactionDto[];
  total: number;
}

export interface GetTransactionHistoryByStatusRequestDto {
  status: HistoryTransactionStatusDto;
  page: number;
  limit: number;
}

export interface GetTransactionHistoryByStatusResponseDto {
  transactions: TransactionHistoryTransactionDto[];
  total: number;
}

export interface AdminGetAllTransactionsAmountResponseDto {
  totalCryptoAmount: string;
  totalFiatAmount: string;
}

export const sanitizeTransactionHistoryTransaction = (
  payload: unknown,
): TransactionHistoryTransactionDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    id: sanitizeString(dto.id),
    type: sanitizeHistoryTransactionType(dto.type),
    status: sanitizeHistoryTransactionStatus(dto.status),
    cryptocurrency: sanitizeString(dto.cryptocurrency),
    fiatCurrency: sanitizeString(dto.fiatCurrency),
    cryptoAmount: sanitizeString(dto.cryptoAmount),
    fiatAmount: sanitizeString(dto.fiatAmount),
    customerId: sanitizeString(dto.customerId),
    exchangerId: sanitizeString(dto.exchangerId),
    listingId: sanitizeString(dto.listingId),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
    finishedAt: sanitizeString(dto.finishedAt),
  };
};

export const sanitizeGetAllTransactionsHistoryResponse = (
  payload: unknown,
): GetAllTransactionsHistoryResponseDto => {
  const dto = sanitizeRecord(unwrapApiPayload(payload));
  return {
    transactions: sanitizeArray(dto.transactions, []).map((item) =>
      sanitizeTransactionHistoryTransaction(item),
    ),
    total: sanitizeNumber(dto.total),
  };
};

export const sanitizeGetTransactionHistoryByUserIdResponse = (
  payload: unknown,
): GetTransactionHistoryByUserIdResponseDto => sanitizeGetAllTransactionsHistoryResponse(payload);

export const sanitizeGetTransactionHistoryByStatusResponse = (
  payload: unknown,
): GetTransactionHistoryByStatusResponseDto => sanitizeGetAllTransactionsHistoryResponse(payload);
