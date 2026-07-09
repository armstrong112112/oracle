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

  return {
    success: true,
    message: `Bill ${id} deleted successfully`,
    billId: parseInt(id),
  };
});
