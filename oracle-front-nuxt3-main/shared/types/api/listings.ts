import {
  sanitizeArray,
  sanitizeNumber,
  sanitizeRecord,
  sanitizeString,
  unwrapApiPayload,
} from "./common";

import {
  sanitizeExchangeListing,
  type ExchangeListingDto,
} from "./exchange";

export interface ListingDto extends ExchangeListingDto {
  title: string;
  description: string;
}

export interface ListingListResponseDto {
  listings: ListingDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateListingRequestDto {
  title: string;
  description?: string;
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods?: string[];
  terms?: string;
  isActive?: boolean;
}

export interface UpdateListingRequestDto {
  listingId: string;
  title?: string;
  description?: string;
  isActive?: boolean;
}

export const sanitizeListing = (payload: unknown): ListingDto => {
  const unwrappedPayload = unwrapApiPayload(payload);
  const dto = sanitizeRecord(unwrappedPayload);
  const baseListing = sanitizeExchangeListing(unwrappedPayload);

  return {
    ...baseListing,
    title: sanitizeString(dto.title),
    description: sanitizeString(dto.description),
  };
};

export const sanitizeListingListResponse = (payload: unknown): ListingListResponseDto => {
  const unwrappedPayload = unwrapApiPayload(payload);
  const dto = sanitizeRecord(unwrappedPayload);
  return {
    listings: sanitizeArray(dto.listings, []).map((item) => sanitizeListing(item)),
    total: sanitizeNumber(dto.total),
    page: sanitizeNumber(dto.page),
    limit: sanitizeNumber(dto.limit),
  };
};
