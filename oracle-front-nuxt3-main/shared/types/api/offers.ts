import {
  sanitizeArray,
  sanitizeBoolean,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";
import {
  sanitizeExchangeOffer,
  type ExchangeOfferDto,
} from "./exchange";

export interface OfferDto extends ExchangeOfferDto {
  currency: string;
  expiresAt: string;
  terms: string;
  isAccepted: boolean;
}

export interface OfferListResponseDto {
  offers: OfferDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateOfferRequestDto {
  listingId: string;
  amount: number;
  currency: string;
  terms?: string;
}

export interface UpdateOfferStatusRequestDto {
  offerId: string;
  status: string;
}

export const sanitizeOffer = (payload: unknown): OfferDto => {
  const unwrappedPayload = unwrapApiPayload(payload);
  const dto = sanitizeRecord(unwrappedPayload);
  const baseOffer = sanitizeExchangeOffer(unwrappedPayload);

  return {
    ...baseOffer,
    currency: sanitizeString(dto.currency),
    expiresAt: sanitizeString(dto.expiresAt),
    terms: sanitizeString(dto.terms),
    isAccepted: sanitizeBoolean(dto.isAccepted),
  };
};

export const sanitizeOfferListResponse = (payload: unknown): OfferListResponseDto => {
  const unwrappedPayload = unwrapApiPayload(payload);
  const dto = sanitizeRecord(unwrappedPayload);
  return {
    offers: sanitizeArray(dto.offers, []).map((item) => sanitizeOffer(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    limit: sanitizeNumber(dto.limit),
  };
};
