import type { EscrowDto, EscrowListResponseDto } from "~/shared/types/api/escrow";

export const MOCK_ESCROWS: EscrowDto[] = [
  {
    id: "escrow-001",
    transactionId: "transaction-001",
    buyerId: "user-001",
    sellerId: "user-002",
    amount: 0.25,
    currency: "BTC",
    status: "active",
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-01T10:30:00.000Z",
    releaseAt: "2026-07-04T10:00:00.000Z",
    isReleased: false,
    metadata: { source: "mock" },
  },
  {
    id: "escrow-002",
    transactionId: "transaction-002",
    buyerId: "user-003",
    sellerId: "user-004",
    amount: 1.5,
    currency: "ETH",
    status: "released",
    createdAt: "2026-06-28T14:00:00.000Z",
    updatedAt: "2026-06-29T09:00:00.000Z",
    releaseAt: "2026-06-29T09:00:00.000Z",
    isReleased: true,
    metadata: { source: "mock" },
  },
];

export const createEscrowsResponse = (
  page = 1,
  limit = 20,
): EscrowListResponseDto => ({
  escrows: MOCK_ESCROWS.slice((page - 1) * limit, page * limit),
  total: MOCK_ESCROWS.length,
  page,
  limit,
});

