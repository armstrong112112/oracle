import type { PaymentDto } from "~/shared/types/api/payment";
import { withMockOrProxy } from "~/server/utils/mockOrProxy";

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<PaymentDto>>(event);

  return withMockOrProxy(event, "/payment", () => {
    const newPayment: PaymentDto = {
      id: `payment-${Math.random().toString(36).slice(2, 8)}`,
      type: body.type ?? "cryptoToFiat",
      status: body.status ?? "pending",
      cryptocurrency: body.cryptocurrency ?? "BTC",
      fiatCurrency: body.fiatCurrency ?? "USD",
      cryptoAmount: Number(body.cryptoAmount ?? 0),
      fiatAmount: Number(body.fiatAmount ?? 0),
      paymentProof: body.paymentProof ?? "",
      disputeId: body.disputeId ?? "",
      confirmationDeadline: body.confirmationDeadline ?? "",
      canCustomerDispute: body.canCustomerDispute ?? true,
      canExchangerDispute: body.canExchangerDispute ?? false,
      isActive: body.isActive ?? true,
      customerId: body.customerId ?? "current-user",
      exchangerId: body.exchangerId ?? "",
      listingId: body.listingId ?? "",
      offerId: body.offerId ?? "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      finishedAt: body.finishedAt ?? "",
      paymentMethod: body.paymentMethod ?? "bank",
      referenceCode: body.referenceCode ?? "",
      paidAt: body.paidAt ?? "",
      isConfirmed: body.isConfirmed ?? false,
    };

    return {
      success: true,
      payment: newPayment,
    };
  });
});
