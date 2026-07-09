import { MOCK_DEADLINES } from "~/shared/mocks/p2p.mock";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (!config.public.useMocks) return proxyToBackend(event, "/p2p/deadlines");
  return MOCK_DEADLINES;
});

