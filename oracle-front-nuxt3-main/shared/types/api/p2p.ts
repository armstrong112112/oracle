import { sanitizeArray, sanitizeNumber, sanitizeRecord, sanitizeString } from "./common";
import type { ExchangeListingDto, ExchangeOfferDto, ExchangeTransactionDto, PaymentDetailsDto } from "./exchange";

export interface P2PCoinDto {
  id: number;
  icon: string;
  title: string;
  value: string;
  price: number;
  cardNumber: string;
  amount: string;
}

export interface P2PFiatDto {
  id: number;
  title: string;
  value: string;
}

export interface P2PPaymentTypeDto {
  value: string;
  title: string;
  name?: string;
  surname?: string;
  currency?: string;
  cardNumber?: string;
}

export interface P2PDeadlineDto {
  title: string;
  value: string;
}

export interface P2PCoinsResponseDto {
  coins: P2PCoinDto[];
}

export interface P2PFiatResponseDto {
  fiat: P2PFiatDto[];
}

export interface P2PPaymentTypesResponseDto {
  paymentTypes: P2PPaymentTypeDto[];
}

export interface P2PDeadlinesResponseDto {
  deadlines: P2PDeadlineDto[];
}

export interface P2PListingDto extends ExchangeListingDto {}
export interface P2POfferDto extends ExchangeOfferDto {}
export interface P2PTransactionDto extends ExchangeTransactionDto {}
export type P2PPaymentDetailsDto = PaymentDetailsDto;

export const sanitizeP2PCoin = (payload: unknown): P2PCoinDto => {
  const dto = sanitizeRecord(payload);
  return {
    id: sanitizeNumber(dto.id),
    icon: sanitizeString(dto.icon),
    title: sanitizeString(dto.title),
    value: sanitizeString(dto.value),
    price: sanitizeNumber(dto.price),
    cardNumber: sanitizeString(dto.cardNumber),
    amount: sanitizeString(dto.amount),
  };
};

export const sanitizeP2PFiat = (payload: unknown): P2PFiatDto => {
  const dto = sanitizeRecord(payload);
  return {
    id: sanitizeNumber(dto.id),
    title: sanitizeString(dto.title),
    value: sanitizeString(dto.value),
  };
};

export const sanitizeP2PPaymentType = (payload: unknown): P2PPaymentTypeDto => {
  const dto = sanitizeRecord(payload);
  return {
    value: sanitizeString(dto.value),
    title: sanitizeString(dto.title),
    name: sanitizeString(dto.name),
    surname: sanitizeString(dto.surname),
    currency: sanitizeString(dto.currency),
    cardNumber: sanitizeString(dto.cardNumber),
  };
};

export const sanitizeP2PDeadline = (payload: unknown): P2PDeadlineDto => {
  const dto = sanitizeRecord(payload);
  return {
    title: sanitizeString(dto.title),
    value: sanitizeString(dto.value),
  };
};

export const sanitizeP2PCoinsResponse = (payload: unknown): P2PCoinsResponseDto => {
  const dto = sanitizeRecord(payload);
  return { coins: sanitizeArray(dto.coins, []).map((item) => sanitizeP2PCoin(item)) };
};

export const sanitizeP2PFiatResponse = (payload: unknown): P2PFiatResponseDto => {
  const dto = sanitizeRecord(payload);
  return { fiat: sanitizeArray(dto.fiat, []).map((item) => sanitizeP2PFiat(item)) };
};

export const sanitizeP2PPaymentTypesResponse = (payload: unknown): P2PPaymentTypesResponseDto => {
  const dto = sanitizeRecord(payload);
  return {
    paymentTypes: sanitizeArray(dto.paymentTypes, []).map((item) => sanitizeP2PPaymentType(item)),
  };
};

export const sanitizeP2PDeadlinesResponse = (payload: unknown): P2PDeadlinesResponseDto => {
  const dto = sanitizeRecord(payload);
  return {
    deadlines: sanitizeArray(dto.deadlines, []).map((item) => sanitizeP2PDeadline(item)),
  };
};

