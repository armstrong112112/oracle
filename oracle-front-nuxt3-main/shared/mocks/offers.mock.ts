import type { OfferDto, OfferListResponseDto } from "~/shared/types/api/offers";

export const MOCK_OFFERS: OfferDto[] = [
  {
    id: "offer-001",
    amount: 0.45,
    status: "pending",
    userId: "user-001",
    listingId: "listing-001",
    createdAt: "2026-07-01T12:00:00.000Z",
    updatedAt: "2026-07-01T12:00:00.000Z",
    currency: "USD",
    expiresAt: "2026-07-02T12:00:00.000Z",
    terms: "Pay within 24h",
    isAccepted: false,
  },
  {
    id: "offer-002",
    amount: 1.25,
    status: "active",
    userId: "user-002",
    listingId: "listing-002",
    createdAt: "2026-06-30T09:00:00.000Z",
    updatedAt: "2026-07-01T09:30:00.000Z",
    currency: "EUR",
    expiresAt: "2026-07-03T09:00:00.000Z",
    terms: "Bank transfer only",
    isAccepted: true,
  },
];

export const createOffersResponse = (
  page = 1,
  limit = 20,
): OfferListResponseDto => ({
  offers: MOCK_OFFERS.slice((page - 1) * limit, page * limit),
  total: MOCK_OFFERS.length,
  page,
  limit,
});

