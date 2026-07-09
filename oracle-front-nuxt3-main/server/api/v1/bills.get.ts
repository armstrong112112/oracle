import { createBillsResponse } from "~/shared/mocks/bills.mock";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const pageSize = parseInt(query.pageSize as string) || 20;

  if (!config.public.useMocks) {
    return proxyToBackend(event, "/bills");
  }

  try {
    return createBillsResponse(page, pageSize);
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch bills",
    });
  }
});
