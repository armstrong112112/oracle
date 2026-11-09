<template>
  <div v-if="viewer" class="media-list media-list--viewer">
    <img class="media-viewer__bleed" :src="viewer.preview || viewer.url" :alt="viewer.name" />
    <div class="media-viewer__scrim" />

    <header class="media-viewer__top">
      <button class="media-viewer__icon" type="button" :aria-label="t('chat.card.back')" @click="closeViewer">
        <img src="/icons/story/back.svg" alt="" />
      </button>
      <p class="media-viewer__counter">{{ counterLabel }}</p>
      <button
        class="media-viewer__icon"
        type="button"
        :aria-label="t('chat.card.more')"
        @click.stop="menuOpen = !menuOpen"
      >
        <img :src="moreIcon" alt="" />
      </button>
      <ul v-if="menuOpen" class="media-viewer__menu">
        <li v-for="action in menuActions" :key="action.id">
          <button
            type="button"
            :class="{ 'is-danger': action.danger }"
            @click="onMenuAction(action.id)"
          >
            {{ action.label }}
          </button>
        </li>
      </ul>
    </header>

    <footer class="media-viewer__bottom">
      <div v-if="album.length > 1" class="media-viewer__strip">
        <button
          v-for="thumb in album"
          :key="thumb.id"
          type="button"
          class="media-viewer__thumb"
          :class="{ 'is-selected': thumb.id === viewer.id }"
          @click="openViewer(thumb.id)"
        >
          <img :src="thumb.preview || thumb.url" alt="" />
        </button>
      </div>

      <p
        v-if="viewerContext.caption"
        class="media-viewer__caption"
        :class="{ 'is-clamped': captionLong && !captionExpanded }"
      >
        {{ viewerContext.caption }}
      </p>
      <button v-if="captionLong" class="media-viewer__toggle" type="button" @click="captionExpanded = !captionExpanded">
        {{ captionExpanded ? t("chat.card.less") : t("chat.card.more") }}
      </button>

      <div class="media-viewer__bar">
        <div v-if="viewerIsVideo" class="media-viewer__transport">
          <button class="media-viewer__play" type="button" tabindex="-1">
            <img src="/icons/story/play.svg" alt="" />
          </button>
          <span>0:00</span>
          <span class="media-viewer__track" aria-hidden="true">
            <span class="media-viewer__fill" />
          </span>
          <span>{{ formatClock(viewer.duration) }}</span>
        </div>
        <div v-else class="media-viewer__credit">
          <span v-if="viewerContext.username" class="media-viewer__user">{{ viewerContext.username }}</span>
          <span v-if="viewerContext.date" class="media-viewer__date">{{ viewerContext.date }}</span>
        </div>
        <div class="media-viewer__tools">
          <button class="media-viewer__icon" type="button" @click="onVisualAction">
            <img src="/svg/trash.svg" alt="" />
          </button>
          <button class="media-viewer__icon" type="button" @click="onVisualAction">
            <img src="/svg/shop/icons/forward-white.svg" alt="" />
          </button>
        </div>
      </div>
    </footer>
  </div>

  <div v-else class="media-list">
    <button class="media-list__back" type="button" @click="emit('back')">
      {{ t("chat.card.back") }}
    </button>

    <Tabs :tabs="tabs" :active="activeTab" size="sm" @select="onSelectTab" />

    <div v-if="items.length" class="media-list__body">
      <div v-if="activeTab === 'media'" class="media-list__grid">
        <button
          v-for="item in items"
          :key="item.id"
          class="media-list__tile"
          type="button"
          :title="item.name"
          @click="openViewer(item.id)"
        >
          <img :src="item.preview || item.url" :alt="item.name" />
        </button>
      </div>

      <ul v-else class="media-list__rows">
        <li v-for="item in items" :key="item.id" class="media-list__row">
          <span class="media-list__name">{{ rowTitle(item) }}</span>
          <span v-if="meta(item)" class="media-list__meta">{{ meta(item) }}</span>
        </li>
      </ul>
    </div>

    <EmptyState v-else :title="emptyTitle" icon="○" />
  </div>
</template>

<script setup lang="ts">
import moreIcon from "@/assets/svg/more-horizontal.svg?url";
import Tabs, { type TabItem } from "~/components/ui/Tabs.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import { localizedMessageDate } from "~/entities/chat/lib/message-date";
import { collectRoomMedia, formatFileSize, type RoomMediaItem, type RoomMediaTab } from "~/entities/chat/lib/room-media";
import { MessageAction } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";

const IMAGE_EXT = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg"]);
const VIDEO_EXT = new Set(["mp4", "webm", "mov"]);
const CAPTION_LIMIT = 90;

const props = defineProps<{
  roomId: string;
  tab?: RoomMediaTab;
}>();

const emit = defineEmits<{
  back: [];
}>();

const { t, locale } = useI18n();
const store = useChatUiStore();
const activeTab = ref<RoomMediaTab>(props.tab || "media");
const viewerId = ref<string | null>(null);
const menuOpen = ref(false);
const captionExpanded = ref(false);

const tabs = computed((): TabItem[] => [
  { value: "media", title: t("chat.card.media") },
  { value: "files", title: t("chat.card.files") },
  { value: "voice", title: t("chat.card.voice") },
]);

const grouped = computed(() => collectRoomMedia(store.messagesByRoom[props.roomId] ?? []));
const items = computed(() => grouped.value[activeTab.value]);

const emptyTitle = computed(() => {
  if (activeTab.value === "files") {
    return t("chat.card.emptyFiles");
  }
  if (activeTab.value === "voice") {
    return t("chat.card.emptyVoice");
  }
  return t("chat.card.emptyMedia");
});

const viewer = computed(() => items.value.find((item) => item.id === viewerId.value) ?? null);

const viewerIndex = computed(() => items.value.findIndex((item) => item.id === viewerId.value));

const counterLabel = computed(() =>
  t("chat.card.counter", {
    current: Math.max(viewerIndex.value, 0) + 1,
    total: items.value.length,
  }),
);

const messageIdOf = (id: string): string => id.slice(0, id.lastIndexOf("-"));

const isImage = (item: RoomMediaItem): boolean => IMAGE_EXT.has(item.extension);
const isVideo = (item: RoomMediaItem): boolean => VIDEO_EXT.has(item.extension);

const viewerIsVideo = computed(() => (viewer.value ? isVideo(viewer.value) : false));

const album = computed(() => {
  if (!viewer.value || !isImage(viewer.value)) {
    return [];
  }
  const messageId = messageIdOf(viewer.value.id);
  return items.value.filter((item) => messageIdOf(item.id) === messageId && isImage(item));
});

const contextById = computed(() => {
  const map = new Map<string, { username: string; date: string; caption: string }>();
  const messages = store.messagesByRoom[props.roomId] ?? [];
  const room = store.rooms.find((item) => item.roomId === props.roomId);
  messages.forEach((message) => {
    const sender = room?.users.find((user) => user._id === message.senderId);
    const name = message.username || sender?.username || "";
    const handle = name.replace(/\s+/g, "").toLowerCase();
    (message.files ?? []).forEach((_, index) => {
      map.set(`${message._id}-${index}`, {
        username: handle ? `@${handle}` : "",
        date: [localizedMessageDate(message.date, locale.value, t("chat.dates.today"), t("chat.dates.yesterday")), message.timestamp].filter(Boolean).join(", "),
        caption: message.content || "",
      });
    });
  });
  return map;
});

const viewerContext = computed(
  () => contextById.value.get(viewer.value?.id || "") ?? { username: "", date: "", caption: "" },
);

const captionLong = computed(() => viewerContext.value.caption.length > CAPTION_LIMIT);

const menuActions = computed(() => {
  const actions: Array<{ id: string; label: string; danger?: boolean }> = [
    { id: "reply", label: t("chat.menu.reply") },
    {
      id: "save",
      label: viewerIsVideo.value ? t("chat.card.saveVideo") : t("chat.card.save"),
    },
  ];
  if (!viewerIsVideo.value) {
    actions.push({ id: "copy", label: t("chat.menu.copy") });
  }
  actions.push(
    viewerPinned.value
      ? { id: MessageAction.Unpin, label: t("chat.card.unpin") }
      : { id: MessageAction.Pin, label: t("chat.card.pin") },
    { id: "forward", label: t("chat.card.forward") },
    { id: "delete", label: t("chat.menu.delete"), danger: true },
    { id: "select", label: t("chat.card.select") },
  );
  return actions;
});

const formatClock = (seconds?: number): string => {
  const total = Math.max(0, Math.round(seconds ?? 0));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const onSelectTab = (value: TabItem | (string | TabItem)[]): void => {
  if (Array.isArray(value)) {
    return;
  }
  activeTab.value = value.value as RoomMediaTab;
};

const rowTitle = (item: RoomMediaItem): string => {
  if (activeTab.value === "voice") {
    return t("chat.card.voiceMessage");
  }
  if (isVideo(item)) {
    return t("chat.card.video");
  }
  if (isImage(item)) {
    return t("chat.card.photo");
  }
  return item.name;
};

const meta = (item: RoomMediaItem): string => {
  if (activeTab.value === "voice" || item.duration) {
    return formatClock(item.duration);
  }
  return formatFileSize(item.size);
};

const openViewer = (id: string): void => {
  viewerId.value = id;
  menuOpen.value = false;
  captionExpanded.value = false;
};

const closeViewer = (): void => {
  viewerId.value = null;
  menuOpen.value = false;
  captionExpanded.value = false;
};

const viewerMessageId = computed(() => {
  const id = viewer.value?.id;
  if (!id) {
    return null;
  }
  const cut = id.lastIndexOf("-");
  return cut > 0 ? id.slice(0, cut) : id;
});

const viewerPinned = computed(() => Boolean(store.findMessage(props.roomId, viewerMessageId.value)?.pinned));

const onMenuAction = (id: string): void => {
  menuOpen.value = false;
  if ((id === MessageAction.Pin || id === MessageAction.Unpin) && viewerMessageId.value) {
    store.toggleMessagePin(props.roomId, viewerMessageId.value);
  }
};

const onVisualAction = (): void => {
  menuOpen.value = false;
};

watch(
  () => props.tab,
  (tab) => {
    if (tab) {
      activeTab.value = tab;
      closeViewer();
    }
  },
);
</script>

<style lang="scss" scoped>
.media-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 240px;
  font-family: Inter, Roboto, sans-serif;

  :deep(.tabs-container) {
    min-width: 0;
  }

  :deep(.tab-item) {
    width: auto;
    flex: 1;
    min-width: 0;
  }
}

.media-list--viewer {
  position: relative;
  gap: 0;
  min-height: 460px;
  margin: 0 -4px -8px;
  overflow: hidden;
  border-radius: 12px;
  background: #0a090f;
  color: #fff;
}

.media-viewer__bleed {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #0a090f;
}

.media-viewer__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10, 9, 15, 0.78) 0%, rgba(10, 9, 15, 0) 28%),
    linear-gradient(0deg, rgba(10, 9, 15, 0.9) 0%, rgba(10, 9, 15, 0) 46%);
  pointer-events: none;
}

.media-viewer__top,
.media-viewer__bottom {
  position: relative;
  z-index: 1;
}

.media-viewer__top {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  min-height: 48px;
  padding: 8px 8px 0;
}

.media-viewer__counter {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.media-viewer__icon,
.media-viewer__play {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.media-viewer__icon img,
.media-viewer__play img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.media-viewer__menu {
  position: absolute;
  top: 48px;
  right: 12px;
  z-index: 2;
  min-width: 168px;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: 12px;
  background: rgba(20, 19, 27, 0.8);
}

.media-viewer__menu button {
  width: 100%;
  padding: 8px 12px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
}

.media-viewer__menu button.is-danger {
  color: #f64e2a;
}

.media-viewer__bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding: 12px 16px 16px;
}

.media-viewer__strip {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.media-viewer__thumb {
  flex: 0 0 auto;
  width: 26px;
  height: 33px;
  padding: 0;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.media-viewer__thumb.is-selected {
  border-color: rgba(255, 255, 255, 0.5);
}

.media-viewer__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-viewer__caption {
  margin: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.35;
}

.media-viewer__caption.is-clamped {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.media-viewer__toggle {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.media-viewer__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.media-viewer__credit,
.media-viewer__transport {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.media-viewer__user,
.media-viewer__date,
.media-viewer__transport {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
}

.media-viewer__date {
  color: rgba(255, 255, 255, 0.72);
}

.media-viewer__transport {
  flex: 1;
}

.media-viewer__track {
  flex: 1;
  height: 3px;
  overflow: hidden;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.28);
}

.media-viewer__fill {
  display: block;
  width: 0;
  height: 100%;
  background: #fff;
}

.media-viewer__tools {
  display: flex;
  align-items: center;
  gap: 4px;
}

.media-list__back {
  align-self: flex-start;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--primary-2);
  font-size: 14px;
  cursor: pointer;
}

.media-list__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.media-list__tile {
  aspect-ratio: 1;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 10px;
  background: var(--secondary-7);
  cursor: pointer;
}

.media-list__tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-list__rows {
  margin: 0;
  padding: 0;
  list-style: none;
}

.media-list__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 8px 0;
  border-bottom: 1px solid #2b2741;
}

.media-list__name {
  color: var(--primary-3);
  font-size: 14px;
}

.media-list__meta {
  color: #8780cf;
  font-size: 12px;
}
</style>
