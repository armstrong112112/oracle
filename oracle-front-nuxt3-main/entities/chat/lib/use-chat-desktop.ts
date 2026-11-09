import { useMediaQuery } from "@vueuse/core";
import { CHAT_DESKTOP_MIN_WIDTH } from "~/entities/chat/config";

export const useChatDesktop = () => useMediaQuery(`(min-width: ${CHAT_DESKTOP_MIN_WIDTH}px)`);
