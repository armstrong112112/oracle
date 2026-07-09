import type { Bill } from "~/entities/bills/data/BillsData";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Bill ID is required" });
  }

  if (!config.public.useMocks) {
    return proxyToBackend(event, `/bills/${id}`);
  }

  const body = await readBody<Partial<Bill>>(event);

  try {
    const updatedBill: Bill = {
      id: parseInt(id),
      icon: body.icon || "/icons/oracle-pay/crypto/btc.svg",
      heading: body.heading || "Updated Bill",
      amountTON: body.amountTON ?? 0,
      amountUSD: body.amountUSD ?? 0,
      dateLabel: body.dateLabel || "Due Date",
      date: body.date || new Date().toISOString().split("T")[0],
      type: body.type || "active",
    };

    return { success: true, bill: updatedBill };
  } catch {
    throw createError({ statusCode: 500, statusMessage: "Failed to update bill" });
  }
});
