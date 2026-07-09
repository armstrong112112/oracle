import type { OfferDto } from "~/shared/types/api/offers";
import { withMockOrProxy } from "~/server/utils/mockOrProxy";

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<OfferDto>>(event);

  return withMockOrProxy(event, "/offers", () => {
    const newOffer: OfferDto = {
      id: `offer-${Math.random().toString(36).slice(2, 8)}`,
      amount: Number(body.amount ?? 0),
      status: "pending",
      userId: body.userId ?? "current-user",
      listingId: body.listingId ?? "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currency: body.currency ?? "USD",
      expiresAt: body.expiresAt ?? "",
      terms: body.terms ?? "",
      isAccepted: false,
    };

    return {
      success: true,
      offer: newOffer,
    };
  });
});
