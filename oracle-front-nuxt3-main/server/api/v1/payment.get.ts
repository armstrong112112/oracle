import { createPaymentsResponse } from "~/shared/mocks/payment.mock";
import { withMockOrProxy } from "~/server/utils/mockOrProxy";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 20;

  return withMockOrProxy(event, "/payment", () => createPaymentsResponse(page, limit));
});
