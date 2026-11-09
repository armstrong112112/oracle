import { useEventListener } from "@vueuse/core";
import type { Ref } from "vue";
import { useChatDesktop } from "~/entities/chat/lib/use-chat-desktop";
import { ensureShadowStyle, isDisplayed } from "~/entities/chat/lib/vac-shadow";
import { useChatUiStore } from "~/store/chat";

const THREAD_HEADER_HEIGHT = 54;
const MIN_SCROLL_LIFT = 80;
const SCROLL_LIFT_ID = "oracle-scroll-lift";
const SCROLL_LIFT_CSS = `.vac-col-messages .vac-icon-scroll{bottom:var(--oracle-scroll-lift,${MIN_SCROLL_LIFT}px)!important}`;

const px = (value: number): string => `${value}px`;

export const useVacChrome = (vacEl: Ref<HTMLElement | null>, composing: Ref<boolean>, threadInset: Ref<number>) => {
  const store = useChatUiStore();
  const desktop = useChatDesktop();

  const composerWrap = ref<HTMLElement | null>(null);
  const foldersWrap = ref<HTMLElement | null>(null);
  const roomsListOpen = ref(!desktop.value && !store.activeRoomId);
  const roomsListOpened = computed(() => String(desktop.value || roomsListOpen.value));
  const roomsListVisible = ref(true);
  const composerLeft = ref(0);
  const composerHeight = ref(64);
  const foldersLeft = ref(0);
  const foldersWidth = ref(0);
  const foldersHeight = ref(120);
  const roomsHeight = ref(0);

  const showComposer = computed(
    () => Boolean(store.activeRoomId) && (desktop.value || !roomsListOpen.value),
  );
  const showFoldersBar = computed(() => roomsListVisible.value);

  const composerStyle = computed(() => ({ left: px(composerLeft.value) }));
  const foldersStyle = computed(() => ({
    left: px(foldersLeft.value),
    width: px(foldersWidth.value),
    height: composing.value ? px(roomsHeight.value) : "auto",
  }));

  const query = <T extends HTMLElement>(selector: string): T | null =>
    vacEl.value?.shadowRoot?.querySelector<T>(selector) ?? null;

  const styleShadow = (): void => {
    const el = vacEl.value;
    const root = el?.shadowRoot;
    if (!el || !root) {
      return;
    }
    for (const selector of ["#room-footer", ".vac-box-search"]) {
      const node = query(selector);
      if (node) {
        node.style.display = "none";
      }
    }

    const withHeader = showComposer.value;
    const scroll = query(".vac-container-scroll");
    if (scroll) {
      scroll.style.paddingBottom = "0px";
      scroll.style.marginBottom = withHeader ? px(composerHeight.value) : "0px";
      scroll.style.marginTop = withHeader ? px(THREAD_HEADER_HEIGHT + threadInset.value) : "";
    }
    const header = query(".vac-room-header");
    if (header) {
      header.style.visibility = withHeader ? "hidden" : "";
      header.style.height = withHeader ? px(THREAD_HEADER_HEIGHT) : "";
    }

    ensureShadowStyle(root, SCROLL_LIFT_ID, SCROLL_LIFT_CSS);
    const lift = withHeader ? Math.max(composerHeight.value + 16, MIN_SCROLL_LIFT) : MIN_SCROLL_LIFT;
    el.style.setProperty("--oracle-scroll-lift", px(lift));
  };

  const sync = (): void => {
    const rooms = query(".vac-rooms-container");
    const roomsVisible = isDisplayed(rooms);
    const threadVisible = isDisplayed(query(".vac-col-messages"));
    roomsListVisible.value = roomsVisible;
    composerLeft.value = rooms && roomsVisible && threadVisible ? rooms.getBoundingClientRect().width : 0;

    if (composerWrap.value) {
      composerHeight.value = composerWrap.value.getBoundingClientRect().height;
    }
    if (foldersWrap.value) {
      foldersHeight.value = foldersWrap.value.getBoundingClientRect().height;
    }

    const app = vacEl.value?.closest<HTMLElement>(".chat-app");
    if (rooms && app) {
      const roomsRect = rooms.getBoundingClientRect();
      foldersLeft.value = roomsRect.left - app.getBoundingClientRect().left;
      foldersWidth.value = roomsRect.width;
      roomsHeight.value = roomsRect.height;
      rooms.style.paddingTop = roomsVisible && !composing.value ? px(foldersHeight.value) : "0px";
    }

    styleShadow();
  };

  const syncSoon = (): void => {
    void nextTick(sync);
  };

  let observer: ResizeObserver | null = null;
  const observe = (): void => {
    observer?.disconnect();
    observer = new ResizeObserver(sync);
    const targets = [composerWrap.value, foldersWrap.value, query(".vac-rooms-container"), query(".vac-col-messages")];
    for (const target of targets) {
      if (target) {
        observer.observe(target);
      }
    }
  };

  const openRoomsList = (): void => {
    const rooms = query(".vac-rooms-container");
    if (rooms && !isDisplayed(rooms)) {
      query(".vac-toggle-button")?.click();
    }
  };

  watch([showComposer, showFoldersBar, composing, threadInset], syncSoon);
  watch([composerWrap, foldersWrap], observe);
  useEventListener("resize", sync);
  onMounted(() => {
    void nextTick(() => {
      sync();
      observe();
    });
  });
  onBeforeUnmount(() => observer?.disconnect());

  return {
    composerWrap,
    foldersWrap,
    roomsListOpen,
    roomsListOpened,
    showComposer,
    showFoldersBar,
    composerStyle,
    foldersStyle,
    sync,
    syncSoon,
    openRoomsList,
  };
};
