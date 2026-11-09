import { ChatRoute } from "~/entities/chat/config";
import { useChatUiStore } from "~/store/chat";

export const useRoomQuery = () => {
  const route = useRoute();
  const router = useRouter();
  const store = useChatUiStore();

  const queryRoomId = computed(() => {
    const room = route.query.room;
    return typeof room === "string" && room ? room : null;
  });

  const isChatHome = (): boolean => route.path.replace(/\/$/, "").endsWith(ChatRoute.Chat);

  const openFromQuery = (roomId: string | null): void => {
    if (roomId && store.activeRoomId !== roomId && store.findRoom(roomId)) {
      store.selectRoom(roomId);
    }
  };

  openFromQuery(queryRoomId.value);
  watch(queryRoomId, openFromQuery);

  watch(
    () => store.activeRoomId,
    (roomId) => {
      if (!isChatHome() || queryRoomId.value === roomId) {
        return;
      }
      const query = { ...route.query };
      if (roomId) {
        query.room = roomId;
      } else {
        delete query.room;
      }
      void router.replace({ query });
    },
  );
};
