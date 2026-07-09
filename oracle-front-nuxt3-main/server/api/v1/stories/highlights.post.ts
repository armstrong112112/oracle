import type { Story, StoryHighlight } from "~/entities/oracle-pay/model/stories.types";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (!config.public.useMocks) return proxyToBackend(event, "/stories/highlights");

  const body = await readBody<{ name: string; story: Story }>(event);

  const highlightId = crypto.randomUUID();
  const newHighlight: StoryHighlight = {
    id: highlightId,
    name: body.name,
    stories: [
      {
        ...body.story,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        views: 0,
        viewed: false,
        isHighlight: true,
        highlightId,
        duration: body.story.duration ?? 5000,
      },
    ],
    coverImage: body.story.image,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  return { highlight: newHighlight };
});

