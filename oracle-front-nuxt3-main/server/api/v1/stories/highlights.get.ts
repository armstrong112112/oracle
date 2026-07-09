import { MOCK_HIGHLIGHTS } from "~/shared/mocks/stories.mock";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (!config.public.useMocks) return proxyToBackend(event, "/stories/highlights");
  return { highlights: MOCK_HIGHLIGHTS };
});

