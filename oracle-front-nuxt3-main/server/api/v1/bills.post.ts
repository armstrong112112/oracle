import type { Bill } from "~/entities/bills/data/BillsData";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.public.useMocks) {
    return proxyToBackend(event, "/bills");
  }

  const body = await readBody<Partial<Bill>>(event);

  try {
    if (!body.heading || typeof body.amountTON !== "number") {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid bill data",
      });
    }

    // TODO: В реальном API id придёт с сервера — не использовать Date.now()
    const newBill: Bill = {
      id: 0, // placeholder: backend assigns real id
      icon: body.icon || "/icons/oracle-pay/crypto/btc.svg",
      heading: body.heading,
      amountTON: body.amountTON,
      amountUSD: body.amountUSD ?? 0,
      dateLabel: body.dateLabel || "Due Date",
      date: body.date || new Date().toISOString().split("T")[0],
      type: body.type || "active",
    };

    return {
      success: true,
      bill: newBill,
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create bill",
    });
  }
});
