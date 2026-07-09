import { createListingsResponse } from "~/shared/mocks/listings.mock";
import { withMockOrProxy } from "~/server/utils/mockOrProxy";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 20;

  return withMockOrProxy(event, "/listings", () => createListingsResponse(page, limit));
});
