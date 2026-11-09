import type { LocationQueryRaw } from "vue-router";
import type { ChatRoute } from "~/entities/chat/config";

export const useChatNav = () => {
  const localePath = useLocalePath();

  const go = (path: ChatRoute | string, query?: LocationQueryRaw) =>
    navigateTo(localePath(query ? { path, query } : path));

  return { go };
};
