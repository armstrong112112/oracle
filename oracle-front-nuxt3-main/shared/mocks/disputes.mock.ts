import type {
  DisputeDto,
  DisputeListResponseDto,
} from "~/shared/types/api/disputes";

export const MOCK_DISPUTES: DisputeDto[] = [
  {
    id: "dispute-001",
    orderId: "order-1001",
    reason: "Payment delayed",
    status: "open",
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-02T11:00:00.000Z",
    initiatedBy: "user-001",
    assignedTo: "moderator-001",
    description: "Buyer reported delayed payment for the escrow transaction.",
    messages: [
      {
        id: "msg-001",
        senderId: "user-001",
        text: "The payment is still pending.",
        createdAt: "2026-07-01T10:15:00.000Z",
        type: "customer",
        isSystem: false,
      },
    ],
    evidence: [],
    metadata: { priority: "high" },
  },
  {
    id: "dispute-002",
    orderId: "order-1002",
    reason: "Items not received",
    status: "investigating",
    createdAt: "2026-06-29T09:00:00.000Z",
    updatedAt: "2026-07-01T08:30:00.000Z",
    initiatedBy: "user-002",
    assignedTo: "moderator-002",
    description: "The buyer did not receive the goods after confirmation.",
    messages: [],
    evidence: [
      {
        id: "evidence-001",
        name: "screenshot.png",
        url: "/uploads/screenshot.png",
        type: "image",
        uploadedAt: "2026-06-29T09:15:00.000Z",
      },
    ],
    metadata: { priority: "medium" },
  },
];

export const createDisputesResponse = (
  page = 1,
  limit = 20,
): DisputeListResponseDto => ({
  disputes: MOCK_DISPUTES.slice((page - 1) * limit, page * limit),
  total: MOCK_DISPUTES.length,
  page,
  limit,
});

