import type { Story } from "~/entities/oracle-pay/model/stories.types";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const highlightId = getRouterParam(event, "id");

  if (!highlightId) {
    throw createError({ statusCode: 400, statusMessage: "Highlight ID is required" });
  }

  if (!config.public.useMocks) {
    return proxyToBackend(event, `/stories/highlights/${highlightId}/stories`);
  }

  const body = await readBody<Story>(event);

  const newStory: Story = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    views: 0,
    viewed: false,
    isHighlight: true,
    highlightId,
    duration: body.duration ?? 5000,
  };

  return { story: newStory };
});

