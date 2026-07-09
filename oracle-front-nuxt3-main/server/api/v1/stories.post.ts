import type { Story } from "~/entities/oracle-pay/model/stories.types";
import { proxyToBackend } from "~/server/utils/proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (!config.public.useMocks) return proxyToBackend(event, "/stories");

  const body = await readBody<Omit<Story, "id">>(event);

  // ID генерируется только на сервере (mock или реальный бэкенд)
  const newStory: Story = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    views: 0,
    viewed: false,
  };

  return { story: newStory };
});

