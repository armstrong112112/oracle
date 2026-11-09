<template>
  <div
    v-if="active"
    class="media-stage"
    :class="{ 'is-full': fullBleed, 'is-ready': showChrome, 'is-video': active.kind === MediaKind.Video }"
    @click="close"
  >
    <div class="media-stage__scrim" :class="{ 'is-on': expanded && !closing }" />
    <video
      v-if="active.kind === MediaKind.Video"
      class="media-stage__frame"
      :class="{ 'is-live': live, 'is-full': expanded && !closing }"
      :style="frameStyle"
      :src="active.url"
      :controls="expanded && !closing"
      autoplay
      playsinline
      @click.stop
    />
    <img
      v-else
      class="media-stage__frame"
      :class="{ 'is-live': live, 'is-full': expanded && !closing }"
      :style="frameStyle"
      :src="active.url"
      alt=""
      @click.stop
    />
    <div v-if="showChrome" class="media-stage__sheet" :style="sheetStyle" @click.stop>
      <header class="media-stage__bar">
        <button class="media-stage__icon" type="button" :aria-label="t('chat.card.back')" @click="close">
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </button>
        <p class="media-stage__count">
          {{ t("chat.card.counter", { current: index + 1, total: Math.max(slides.length, 1) }) }}
        </p>
        <div class="media-stage__tools">
          <button
            v-if="!narrow"
            class="media-stage__expand"
            type="button"
            :aria-label="fullscreen ? t('chat.card.exitFullscreen') : t('chat.card.fullscreen')"
            @click="toggleFullscreen"
          >
            <svg v-if="!fullscreen" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M8 3H3v5M14 3h5v5M8 19H3v-5M14 19h5v-5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M8 3v5H3M14 3v5h5M8 19v-5H3M14 19v-5h5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="media-stage__icon" type="button" :aria-label="t('chat.card.more')" @click="menuOpen = !menuOpen">
            <img src="/svg/figma-icons/more.svg" width="32" height="32" alt="" />
          </button>
        </div>
      </header>
      <div v-if="menuOpen" class="media-stage__menu" @click.stop>
        <p class="media-stage__read">
          <img src="/svg/figma-icons/viewed.svg" width="16" height="16" alt="" />
          <span>{{ readLabel }}</span>
        </p>
        <button
          v-for="action in actions"
          :key="action.id"
          type="button"
          class="media-stage__item"
          :class="{ 'is-danger': action.id === MessageAction.Delete, 'is-last': action.id === MessageAction.Select }"
          @click="runAction(action.id)"
        >
          <span>{{ action.label }}</span>
          <img :src="action.icon" :width="action.width" :height="action.height" alt="" />
        </button>
      </div>
      <footer ref="footerEl" class="media-stage__foot">
        <p v-if="caption" class="media-stage__caption">{{ caption }}</p>
        <div class="media-stage__meta">
          <button class="media-stage__action" type="button" :aria-label="t('chat.card.forward')" @click="runAction(MessageAction.Forward)">
            <img src="/svg/figma-icons/forward-big.svg" width="16" height="16" alt="" />
          </button>
          <div class="media-stage__who">
            <p>{{ handle }}</p>
            <p>{{ whenLabel }}</p>
          </div>
          <button class="media-stage__action" type="button" :aria-label="t('chat.menu.delete')" @click="runAction(MessageAction.Delete)">
            <img src="/svg/figma-icons/trash-big.svg" width="16" height="16" alt="" />
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { localizedMessageDate } from "~/entities/chat/lib/message-date";
import { downloadFile, fileMediaKind } from "~/entities/chat/lib/media-files";
import { useChatDesktop } from "~/entities/chat/lib/use-chat-desktop";
import { ChatModalName, DraftContextType, MediaKind, MessageAction } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";
import type { MediaBox, VacMessage } from "~/entities/chat/model";
import type { MediaLaunch, MediaSlide, StageAction } from "./types";

const HEADER = 50;
const FOOTER_BASE = 64;
const FOOTER_WITH_CAPTION = 96;
const { t, locale } = useI18n();
const store = useChatUiStore();

const active = ref<MediaLaunch | null>(null);
const box = ref<MediaBox | null>(null);
const live = ref(false);
const expanded = ref(false);
const closing = ref(false);
const fullscreen = ref(false);
const menuOpen = ref(false);
const footerEl = ref<HTMLElement | null>(null);
const desktop = useChatDesktop();
const narrow = computed(() => !desktop.value);
const viewport = ref({ width: 0, height: 0 });
let closeTimer = 0;
let generation = 0;

const slides = computed((): MediaSlide[] => {
  const roomId = store.activeRoomId;
  const messages = roomId ? store.messagesByRoom[roomId] ?? [] : [];
  const list: MediaSlide[] = [];
  for (const message of messages) {
    if (message.deleted || message.system) {
      continue;
    }
    for (const file of message.files ?? []) {
      const kind = file.url ? fileMediaKind(file) : null;
      if (kind && file.url) {
        list.push({ url: file.url, kind, messageId: message._id });
      }
    }
  }
  return list;
});

const index = computed(() => {
  const current = active.value;
  if (!current) {
    return 0;
  }
  const match = slides.value.findIndex(
    (slide) => slide.url === current.url && (!current.messageId || slide.messageId === current.messageId),
  );
  return match >= 0 ? match : 0;
});

const message = computed((): VacMessage | null => store.findMessage(store.activeRoomId, active.value?.messageId));

const caption = computed(() => message.value?.content?.trim() || "");

const handle = computed(() => {
  const name = message.value?.username?.trim() || "username";
  return name.startsWith("@") ? name : `@${name}`;
});

const formatParts = (value?: string): { date: string; time: string } | null => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return {
    date: date.toLocaleDateString(locale.value, { month: "long", day: "numeric", year: "numeric" }),
    time: date.toLocaleTimeString(locale.value, { hour: "numeric", minute: "2-digit" }),
  };
};

const whenLabel = computed(() => {
  const stamp = message.value?.timestamp;
  const parts = formatParts(stamp);
  if (parts) {
    return t("chat.card.mediaAt", parts);
  }
  const date = localizedMessageDate(message.value?.date, locale.value, t("chat.dates.today"), t("chat.dates.yesterday"));
  return [date, stamp].filter(Boolean).join(" ");
});

const readLabel = computed(() => {
  if (!message.value?.seen) {
    return t("chat.menu.read");
  }
  const parts = formatParts(message.value.timestamp || message.value.date);
  if (!parts) {
    return t("chat.menu.read");
  }
  return t("chat.menu.readAt", {
    date: parts.date,
    time: parts.time,
  });
});

const actions = computed(() => {
  const items: StageAction[] = [
    { id: MessageAction.Reply, label: t("chat.menu.reply"), icon: "/svg/figma-icons/reply.svg", width: 16, height: 16 },
  ];
  if (active.value?.kind === MediaKind.Video) {
    items.push({ id: MessageAction.Save, label: t("chat.card.saveVideo"), icon: "/svg/figma-icons/save.svg", width: 16, height: 16 });
  } else {
    items.push({ id: MessageAction.Save, label: t("chat.menu.savePhoto"), icon: "/svg/figma-icons/save.svg", width: 16, height: 16 });
    items.push({ id: MessageAction.Copy, label: t("chat.menu.copy"), icon: "/svg/figma-icons/copy.svg", width: 16, height: 16 });
  }
  items.push(
    message.value?.pinned
      ? { id: MessageAction.Unpin, label: t("chat.card.unpin"), icon: "/svg/figma-icons/unpin.svg", width: 16, height: 18 }
      : { id: MessageAction.Pin, label: t("chat.card.pin"), icon: "/svg/figma-icons/pin.svg", width: 15, height: 16 },
    { id: MessageAction.Forward, label: t("chat.card.forward"), icon: "/svg/figma-icons/share-or-forward.svg", width: 16, height: 16 },
    { id: MessageAction.Delete, label: t("chat.menu.delete"), icon: "/svg/figma-icons/trash-solid-16.svg", width: 16, height: 16 },
    { id: MessageAction.Select, label: t("chat.card.select"), icon: "/svg/figma-icons/select.svg", width: 16, height: 16 },
  );
  return items;
});

const fullBleed = computed(() => narrow.value || fullscreen.value);
const showChrome = computed(() => expanded.value && !closing.value);

const videoFooterHeight = (): number => {
  if (active.value?.kind !== MediaKind.Video) {
    return 0;
  }
  return footerEl.value?.offsetHeight || (caption.value ? FOOTER_WITH_CAPTION : FOOTER_BASE);
};

const place = (): { sheet: MediaBox; media: MediaBox } => {
  const width = viewport.value.width || (import.meta.client ? window.innerWidth : 390);
  const height = viewport.value.height || (import.meta.client ? window.innerHeight : 800);
  const foot = videoFooterHeight();
  if (fullBleed.value) {
    return {
      sheet: { top: 0, left: 0, width, height },
      media: { top: HEADER, left: 0, width, height: Math.max(height - HEADER - foot, 120) },
    };
  }
  const sheetWidth = Math.min(420, Math.max(width - 48, 280));
  const sheetHeight = Math.min(780, Math.max(height - 48, 360));
  const top = (height - sheetHeight) / 2;
  const left = (width - sheetWidth) / 2;
  return {
    sheet: { top, left, width: sheetWidth, height: sheetHeight },
    media: { top: top + HEADER, left, width: sheetWidth, height: Math.max(sheetHeight - HEADER - foot, 120) },
  };
};

const sheetStyle = computed(() => {
  const sheet = place().sheet;
  return {
    top: `${sheet.top}px`,
    left: `${sheet.left}px`,
    width: `${sheet.width}px`,
    height: `${sheet.height}px`,
  };
});

const frameStyle = computed(() => {
  if (!box.value) {
    return {};
  }
  return {
    top: `${box.value.top}px`,
    left: `${box.value.left}px`,
    width: `${box.value.width}px`,
    height: `${box.value.height}px`,
  };
});

const syncViewport = (): void => {
  viewport.value = { width: window.innerWidth, height: window.innerHeight };
  if (expanded.value && !closing.value) {
    box.value = place().media;
  }
};

const restoreSource = (): void => {
  const source = active.value?.source;
  if (source) {
    source.style.visibility = "";
  }
};

const finishClose = (): void => {
  restoreSource();
  active.value = null;
  box.value = null;
  live.value = false;
  expanded.value = false;
  closing.value = false;
  fullscreen.value = false;
  menuOpen.value = false;
};

const open = async (launch: MediaLaunch): Promise<void> => {
  const token = ++generation;
  window.clearTimeout(closeTimer);
  restoreSource();
  syncViewport();
  active.value = launch;
  box.value = { ...launch.origin };
  live.value = false;
  expanded.value = false;
  closing.value = false;
  fullscreen.value = false;
  menuOpen.value = false;
  if (launch.source) {
    launch.source.style.visibility = "hidden";
  }
  await nextTick();
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  if (token !== generation) {
    return;
  }
  live.value = true;
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  if (token !== generation) {
    return;
  }
  box.value = place().media;
  expanded.value = true;
};

const close = (): void => {
  if (!active.value || closing.value || !expanded.value) {
    return;
  }
  if (menuOpen.value) {
    menuOpen.value = false;
    return;
  }
  closing.value = true;
  expanded.value = false;
  const source = active.value.source;
  const current = source?.isConnected ? source.getBoundingClientRect() : null;
  box.value = current
    ? { top: current.top, left: current.left, width: current.width, height: current.height }
    : { ...active.value.origin };
  closeTimer = window.setTimeout(finishClose, 460);
};

const toggleFullscreen = (): void => {
  fullscreen.value = !fullscreen.value;
  menuOpen.value = false;
  nextTick(() => {
    if (expanded.value && !closing.value) {
      box.value = place().media;
    }
  });
};

const runAction = (id: MessageAction): void => {
  const current = message.value;
  const roomId = store.activeRoomId;
  menuOpen.value = false;
  if (!current || !roomId) {
    return;
  }
  if (id === MessageAction.Save) {
    downloadFile(active.value?.url ?? "", active.value?.kind === MediaKind.Video ? "video" : "photo");
    return;
  }
  if (id === MessageAction.Copy) {
    const text = current.content?.trim() || active.value?.url || "";
    if (text && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
    return;
  }
  if (id === MessageAction.Pin || id === MessageAction.Unpin) {
    store.toggleMessagePin(roomId, current._id);
    return;
  }
  if (id === MessageAction.Forward) {
    return;
  }
  if (id === MessageAction.Delete) {
    store.openModal(ChatModalName.DeleteMessages, { roomId, messageIds: [current._id] });
    close();
    return;
  }
  if (id === MessageAction.Select) {
    store.startMessageSelection(roomId, current._id);
    close();
    return;
  }
  store.setDraftContext({ type: DraftContextType.Reply, message: current });
  close();
};

const onKey = (event: KeyboardEvent): void => {
  if (event.key === "Escape") {
    close();
  }
};

watch(footerEl, () => {
  if (expanded.value && !closing.value && active.value?.kind === MediaKind.Video) {
    box.value = place().media;
  }
});

watch(active, (value) => {
  if (value) {
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", syncViewport);
    return;
  }
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("resize", syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("resize", syncViewport);
  window.clearTimeout(closeTimer);
  restoreSource();
});

defineExpose({ open });
</script>

<style lang="scss" scoped src="./ChatMediaStage.scss"></style>
