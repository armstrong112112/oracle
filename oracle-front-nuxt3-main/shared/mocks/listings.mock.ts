import type { ListingDto, ListingListResponseDto } from "~/shared/types/api/listings";

export const MOCK_LISTINGS: ListingDto[] = [
  {
    id: "listing-001",
    type: "cryptoToFiat",
    cryptocurrency: "BTC",
    fiatCurrency: "USD",
    rate: 65000,
    minAmount: 100,
    maxAmount: 5000,
    availableAmount: 2500,
    paymentMethods: ["bank", "card"],
    terms: "Instant settlement",
    userId: "user-001",
    isActive: true,
    createdAt: "2026-06-20T10:00:00.000Z",
    updatedAt: "2026-07-01T10:00:00.000Z",
    title: "BTC sell offer",
    description: "Selling BTC at a competitive rate.",
  },
  {
    id: "listing-002",
    type: "fiatToCrypto",
    cryptocurrency: "ETH",
    fiatCurrency: "EUR",
    rate: 3200,
    minAmount: 50,
    maxAmount: 3000,
    availableAmount: 1800,
    paymentMethods: ["bank"],
    terms: "Flexible payment window",
    userId: "user-002",
    isActive: true,
    createdAt: "2026-06-22T09:00:00.000Z",
    updatedAt: "2026-07-02T09:15:00.000Z",
    title: "ETH purchase offer",
    description: "Buying ETH for EUR.",
  },
];

export const createListingsResponse = (
  page = 1,
  limit = 20,
): ListingListResponseDto => ({
  listings: MOCK_LISTINGS.slice((page - 1) * limit, page * limit),
  total: MOCK_LISTINGS.length,
  page,
  limit,
});

