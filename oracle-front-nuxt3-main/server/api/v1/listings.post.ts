import type { ListingDto } from "~/shared/types/api/listings";
import { withMockOrProxy } from "~/server/utils/mockOrProxy";

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ListingDto>>(event);

  return withMockOrProxy(event, "/listings", () => {
    const newListing: ListingDto = {
      id: `listing-${Math.random().toString(36).slice(2, 8)}`,
      type: body.type ?? "cryptoToFiat",
      cryptocurrency: body.cryptocurrency ?? "BTC",
      fiatCurrency: body.fiatCurrency ?? "USD",
      rate: Number(body.rate ?? 0),
      minAmount: Number(body.minAmount ?? 0),
      maxAmount: Number(body.maxAmount ?? 0),
      availableAmount: Number(body.availableAmount ?? 0),
      paymentMethods: body.paymentMethods ?? [],
      terms: body.terms ?? "",
      userId: body.userId ?? "current-user",
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: body.title ?? "",
      description: body.description ?? "",
    };

    return {
      success: true,
      listing: newListing,
    };
  });
});
