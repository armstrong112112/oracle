import {
  sanitizeArray,
  sanitizeBoolean,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";
import {
  sanitizeExchangeTransaction,
  type ExchangeTransactionDto,
} from "./exchange";

export interface PaymentDto extends ExchangeTransactionDto {
  paymentMethod: string;
  referenceCode: string;
  paidAt: string;
  isConfirmed: boolean;
}

export interface PaymentListResponseDto {
  payments: PaymentDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CreatePaymentRequestDto {
  transactionId: string;
  paymentMethod: string;
  referenceCode?: string;
}

export interface UpdatePaymentStatusRequestDto {
  paymentId: string;
  status: string;
  confirmed?: boolean;
}

export const sanitizePayment = (payload: unknown): PaymentDto => {
  const unwrappedPayload = unwrapApiPayload(payload);
  const dto = sanitizeRecord(unwrappedPayload);
  const baseTransaction = sanitizeExchangeTransaction(unwrappedPayload);

  return {
    ...baseTransaction,
    paymentMethod: sanitizeString(dto.paymentMethod),
    referenceCode: sanitizeString(dto.referenceCode),
    paidAt: sanitizeString(dto.paidAt),
    isConfirmed: sanitizeBoolean(dto.isConfirmed),
  };
};

export const sanitizePaymentListResponse = (payload: unknown): PaymentListResponseDto => {
  const unwrappedPayload = unwrapApiPayload(payload);
  const dto = sanitizeRecord(unwrappedPayload);
  return {
    payments: sanitizeArray(dto.payments, []).map((item) => sanitizePayment(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    limit: sanitizeNumber(dto.limit),
  };
};
