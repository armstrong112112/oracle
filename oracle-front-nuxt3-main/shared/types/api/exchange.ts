import {
  sanitizeArray,
  sanitizeBoolean,
  sanitizeExchangeType,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  sanitizeTransactionStatus,
  type ExchangeTypeDto,
  type RespondActionDto,
  type TransactionStatusDto,
} from "./common";

export interface PaymentDetailsDto {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  swiftCode: string;
  iban: string;
  routingNumber: string;
  additionalNotes: string;
}

export interface ExchangeListingDto {
  id: string;
  type: ExchangeTypeDto;
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods: string[];
  terms: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeOfferDto {
  id: string;
  amount: number;
  status: TransactionStatusDto;
  userId: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeTransactionDto {
  id: string;
  type: ExchangeTypeDto;
  status: TransactionStatusDto;
  cryptocurrency: string;
  fiatCurrency: string;
  cryptoAmount: number;
  fiatAmount: number;
  paymentProof: string;
  disputeId: string;
  confirmationDeadline: string;
  canCustomerDispute: boolean;
  canExchangerDispute: boolean;
  isActive: boolean;
  customerId: string;
  exchangerId: string;
  listingId: string;
  offerId: string;
  createdAt: string;
  updatedAt: string;
  finishedAt: string;
}

export interface ExchangerStatusDto {
  exchangerId: string;
  isOnline: boolean;
  isFrozen: boolean;
  missedOffers: number;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeListingResponseDto {
  listings: ExchangeListingDto[];
}

export interface ExchangeTransactionResponseDto {
  transactions: ExchangeTransactionDto[];
}

export interface ExchangeOfferResponseDto {
  offerId: string;
  status: TransactionStatusDto;
  message: string;
}

export interface ExchangeStatusResponseDto {
  exchangerId: string;
  online: boolean;
  isFrozen?: boolean;
  message: string;
}

export interface ExchangeListQueryDto {
  type?: ExchangeTypeDto;
  cryptocurrency?: string;
  fiatCurrency?: string;
  minRate?: number;
  maxRate?: number;
  paymentMethods?: string[];
  isActive?: boolean;
}

export interface CreateExchangeOfferRequestDto {
  userId: string;
  listingId: string;
  amount: number;
  paymentDetails: PaymentDetailsDto;
}

export interface RespondOfferRequestDto {
  offerId: string;
  exchangerId: string;
  action: RespondActionDto;
}

export interface UpdateTransactionStatusRequestDto {
  transactionId: string;
  userId: string;
  status: TransactionStatusDto;
  paymentProof?: string;
}

export const sanitizePaymentDetails = (payload: unknown): PaymentDetailsDto => {
  const dto = sanitizeRecord(payload);
  return {
    bankName: sanitizeString(dto.bankName),
    accountNumber: sanitizeString(dto.accountNumber),
    accountHolderName: sanitizeString(dto.accountHolderName),
    swiftCode: sanitizeString(dto.swiftCode),
    iban: sanitizeString(dto.iban),
    routingNumber: sanitizeString(dto.routingNumber),
    additionalNotes: sanitizeString(dto.additionalNotes),
  };
};

export const sanitizeExchangeListing = (payload: unknown): ExchangeListingDto => {
  const dto = sanitizeRecord(payload);
  return {
    id: sanitizeString(dto.id),
    type: sanitizeExchangeType(dto.type),
    cryptocurrency: sanitizeString(dto.cryptocurrency),
    fiatCurrency: sanitizeString(dto.fiatCurrency),
    rate: sanitizeNumber(dto.rate),
    minAmount: sanitizeNumber(dto.minAmount),
    maxAmount: sanitizeNumber(dto.maxAmount),
    availableAmount: sanitizeNumber(dto.availableAmount),
    paymentMethods: sanitizeArray<string>(dto.paymentMethods),
    terms: sanitizeString(dto.terms),
    userId: sanitizeString(dto.userId),
    isActive: sanitizeBoolean(dto.isActive),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
  };
};

export const sanitizeExchangeOffer = (payload: unknown): ExchangeOfferDto => {
  const dto = sanitizeRecord(payload);
  return {
    id: sanitizeString(dto.id),
    amount: sanitizeNumber(dto.amount),
    status: sanitizeTransactionStatus(dto.status),
    userId: sanitizeString(dto.userId),
    listingId: sanitizeString(dto.listingId),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
  };
};

export const sanitizeExchangeTransaction = (
  payload: unknown,
): ExchangeTransactionDto => {
  const dto = sanitizeRecord(payload);
  return {
    id: sanitizeString(dto.id),
    type: sanitizeExchangeType(dto.type),
    status: sanitizeTransactionStatus(dto.status),
    cryptocurrency: sanitizeString(dto.cryptocurrency),
    fiatCurrency: sanitizeString(dto.fiatCurrency),
    cryptoAmount: sanitizeNumber(dto.cryptoAmount),
    fiatAmount: sanitizeNumber(dto.fiatAmount),
    paymentProof: sanitizeString(dto.paymentProof),
    disputeId: sanitizeString(dto.disputeId),
    confirmationDeadline: sanitizeString(dto.confirmationDeadline),
    canCustomerDispute: sanitizeBoolean(dto.canCustomerDispute),
    canExchangerDispute: sanitizeBoolean(dto.canExchangerDispute),
    isActive: sanitizeBoolean(dto.isActive),
    customerId: sanitizeString(dto.customerId),
    exchangerId: sanitizeString(dto.exchangerId),
    listingId: sanitizeString(dto.listingId),
    offerId: sanitizeString(dto.offerId),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
    finishedAt: sanitizeString(dto.finishedAt),
  };
};

export const sanitizeExchangerStatus = (payload: unknown): ExchangerStatusDto => {
  const dto = sanitizeRecord(payload);
  return {
    exchangerId: sanitizeString(dto.exchangerId),
    isOnline: sanitizeBoolean(dto.isOnline),
    isFrozen: sanitizeBoolean(dto.isFrozen),
    missedOffers: sanitizeNumber(dto.missedOffers),
    lastActive: sanitizeString(dto.lastActive),
    createdAt: sanitizeString(dto.createdAt),
    updatedAt: sanitizeString(dto.updatedAt),
  };
};

