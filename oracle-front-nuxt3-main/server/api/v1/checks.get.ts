import { createChecksResponse } from "~/shared/mocks/checks.mock";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const pageSize = parseInt(query.pageSize as string) || 20;

  if (!config.public.useMocks) {
    const params = new URLSearchParams();

    if (page > 1) {
      params.set("page", String(page));
    }

    if (pageSize !== 20) {
      params.set("pageSize", String(pageSize));
    }

    const queryString = params.toString();
    return proxyToBackend(event, `/checks${queryString ? `?${queryString}` : ""}`);
  }

  try {
    return createChecksResponse(page, pageSize);
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch checks",
    });
  }
});

