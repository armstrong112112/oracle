import type { EscrowDto } from "~/shared/types/api/escrow";
import { withMockOrProxy } from "~/server/utils/mockOrProxy";

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<EscrowDto>>(event);

  return withMockOrProxy(event, "/escrow", () => {
    const newEscrow: EscrowDto = {
      id: `escrow-${Math.random().toString(36).slice(2, 8)}`,
      transactionId: body.transactionId ?? "",
      buyerId: body.buyerId ?? "",
      sellerId: body.sellerId ?? "",
      amount: Number(body.amount ?? 0),
      currency: body.currency ?? "BTC",
      status: body.status ?? "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      releaseAt: body.releaseAt ?? "",
      isReleased: body.isReleased ?? false,
      metadata: {},
    };

    return {
      success: true,
      escrow: newEscrow,
    };
  });
});
