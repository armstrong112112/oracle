<template>
  <ClientOnly>
    <div class="chat-app">
      <div v-show="showChatCard" class="chat-card-slot">
        <ChatCardModal />
      </div>
      <div class="chat-app__thread">
        <vue-advanced-chat
          v-if="store.roomsLoaded"
          ref="vacEl"
          height="100%"
          theme="dark"
          :current-user-id="store.currentUserId"
          :rooms="roomsJson"
          :messages="messagesJson"
          :rooms-loaded="VAC_STATIC_PROPS.trueFlag"
          :messages-loaded="messagesLoadedFlag"
          :room-id="store.activeRoomId || undefined"
          :load-first-room="loadFirstRoomFlag"
          :rooms-list-opened="roomsListOpened"
          :styles="VAC_STATIC_PROPS.styles"
          :text-messages="textMessagesJson"
          :room-info-enabled="VAC_STATIC_PROPS.trueFlag"
          :textarea-action-enabled="VAC_STATIC_PROPS.falseFlag"
          :show-add-room="VAC_STATIC_PROPS.falseFlag"
          :show-audio="VAC_STATIC_PROPS.falseFlag"
          :show-emojis="VAC_STATIC_PROPS.falseFlag"
          :show-files="VAC_STATIC_PROPS.falseFlag"
          :show-send-icon="VAC_STATIC_PROPS.falseFlag"
          :show-reaction-emojis="VAC_STATIC_PROPS.falseFlag"
          :message-actions="VAC_STATIC_PROPS.emptyActions"
          :media-preview-enabled="VAC_STATIC_PROPS.falseFlag"
          :responsive-breakpoint="CHAT_DESKTOP_MIN_WIDTH"
        />
      </div>
      <div v-if="showFoldersBar" ref="foldersWrap" class="chat-app__folders" :style="foldersStyle">
        <ChatFoldersBar v-model:query="roomQuery" v-model:composing="composingRoom" />
      </div>
      <div v-if="showComposer" ref="composerWrap" class="chat-app__composer" :style="composerStyle">
        <ChatComposer />
      </div>
      <div v-if="showComposer" class="chat-app__thread-header" :style="composerStyle">
        <ChatThreadHeader @back="openRoomsList" />
      </div>
      <div v-if="pinnedListOpen" class="chat-app__pinned" :style="composerStyle">
        <ChatPinnedList @close="pinnedListOpen = false" />
      </div>
      <div v-else-if="showComposer && pinnedMessages.length" class="chat-app__pinned" :style="composerStyle">
        <ChatPinnedBar
          :messages="pinnedMessages"
          :active-index="pinnedIndex"
          :listed="pinnedMessages.length > 1"
          @pick="scrollToMessage"
          @list="pinnedListOpen = true"
        />
      </div>
      <ChatContextMenu />
      <ChatDeleteModal />
      <ChatMediaStage ref="mediaStage" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { CHAT_DESKTOP_MIN_WIDTH } from "~/entities/chat/config";
import { CARD_MODAL_NAMES } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";
import ChatCardModal from "~/widgets/chat/ChatCardModal/index.vue";
import ChatComposer from "~/widgets/chat/ChatComposer/index.vue";
import ChatContextMenu from "~/widgets/chat/ChatContextMenu/index.vue";
import ChatDeleteModal from "~/widgets/chat/ChatDeleteModal/index.vue";
import ChatFoldersBar from "~/widgets/chat/ChatFoldersBar/index.vue";
import ChatMediaStage from "~/widgets/chat/ChatMediaStage/index.vue";
import ChatPinnedBar from "~/widgets/chat/ChatPinnedBar/index.vue";
import ChatPinnedList from "~/widgets/chat/ChatPinnedList/index.vue";
import ChatThreadHeader from "~/widgets/chat/ChatThreadHeader/index.vue";
import { useMediaOpen } from "./model/use-media-open";
import { useRoomQuery } from "./model/use-room-query";
import { useVacChrome } from "./model/use-vac-chrome";
import { useVacDecorations } from "./model/use-vac-decorations";
import { useVacEvents } from "./model/use-vac-events";
import { VAC_STATIC_PROPS, useVacProps } from "./model/use-vac-props";
import type { MediaStageApi } from "~/widgets/chat/ChatMediaStage/types";

const store = useChatUiStore();
const vacEl = ref<HTMLElement | null>(null);
const mediaStage = ref<MediaStageApi | null>(null);
const roomQuery = ref("");
const composingRoom = ref(false);
const threadInset = ref(0);
const pinnedListOpen = ref(false);
const openRoomOnLoad = ref(true);

const pinnedMessages = computed(() => {
  const roomId = store.activeRoomId;
  if (!roomId) {
    return [];
  }
  return (store.messagesByRoom[roomId] ?? []).filter((message) => message.pinned && !message.deleted);
});
const PIN_REACHED_GAP = 12;
const pinnedIndex = ref(0);
let pinScroller: HTMLElement | null = null;

const syncPinnedIndex = (): void => {
  const pins = pinnedMessages.value;
  if (!pins.length || pinnedListOpen.value) {
    return;
  }
  if (pins.length === 1) {
    pinnedIndex.value = 0;
    return;
  }
  const root = vacEl.value?.shadowRoot;
  const scroller = root?.querySelector<HTMLElement>(".vac-container-scroll");
  if (!root || !scroller) {
    pinnedIndex.value = pins.length - 1;
    return;
  }
  const edge = scroller.getBoundingClientRect().top - PIN_REACHED_GAP;
  let closest = -1;
  let closestTop = Number.NEGATIVE_INFINITY;
  for (let index = 0; index < pins.length; index += 1) {
    const top = root.getElementById(pins[index]._id)?.getBoundingClientRect().top;
    if (top == null || top >= edge) {
      continue;
    }
    if (top > closestTop) {
      closest = index;
      closestTop = top;
    }
  }
  pinnedIndex.value = closest === -1 ? pins.length - 1 : closest;
};

const onPinScroll = (): void => {
  syncPinnedIndex();
};

const bindPinScroll = (): void => {
  const next = vacEl.value?.shadowRoot?.querySelector<HTMLElement>(".vac-container-scroll") ?? null;
  if (next !== pinScroller) {
    pinScroller?.removeEventListener("scroll", onPinScroll);
    pinScroller = next;
    pinScroller?.addEventListener("scroll", onPinScroll, { passive: true });
  }
  syncPinnedIndex();
};

const scrollToMessage = (messageId: string): void => {
  const root = vacEl.value?.shadowRoot;
  const scroller = root?.querySelector<HTMLElement>(".vac-container-scroll");
  const node = root?.getElementById(messageId);
  if (!scroller || !node) {
    return;
  }
  const delta = node.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
  scroller.scrollTo({ top: Math.max(0, scroller.scrollTop + delta), behavior: "smooth" });
};

const showChatCard = computed(() => Boolean(store.modal.name && CARD_MODAL_NAMES.includes(store.modal.name)));

useRoomQuery();
const { roomsJson, messagesJson, messagesLoadedFlag, loadFirstRoomFlag, textMessagesJson } = useVacProps(
  roomQuery,
  composingRoom,
  pinnedListOpen,
  openRoomOnLoad,
);
const {
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
} = useVacChrome(vacEl, composingRoom, threadInset);

watch([showComposer, pinnedMessages, pinnedListOpen], () => {
  threadInset.value = showComposer.value && pinnedMessages.value.length ? 46 : 0;
});
watch(pinnedMessages, () => {
  void nextTick(bindPinScroll);
});
watch(pinnedListOpen, (open) => {
  if (!open) {
    void nextTick(syncPinnedIndex);
  }
});
watch(
  () => store.activeRoomId,
  () => {
    pinnedListOpen.value = false;
  },
);
onBeforeUnmount(() => pinScroller?.removeEventListener("scroll", onPinScroll));
const decorations = useVacDecorations(vacEl);
const media = useMediaOpen(mediaStage);

useVacEvents(vacEl, {
  roomsListOpen,
  openRoomOnLoad,
  syncSoon,
  canSelect: decorations.canSelect,
  rememberMedia: media.remember,
  onOpenFile: media.onOpenFile,
  onBind: (el) => {
    decorations.attach(el);
    sync();
    bindPinScroll();
  },
  onUnbind: decorations.detach,
});
</script>

<style lang="scss" scoped>
.chat-app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100dvh;
  width: 100%;
  font-family: Inter, Roboto, sans-serif;
}

.chat-app__thread {
  flex: 1;
  min-height: 0;
  position: relative;
  z-index: 0;
}

.chat-app__folders {
  position: absolute;
  top: 0;
  z-index: 6;
  isolation: isolate;
}

.chat-app__composer {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 6;
  isolation: isolate;
}

.chat-card-slot {
  position: absolute;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}

.chat-app__thread-header {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 7;
}

.chat-app__pinned {
  position: absolute;
  top: 54px;
  right: 0;
  z-index: 7;
}

.chat-app :deep(.vac-container-wrapper),
.chat-app vue-advanced-chat {
  font-family: Inter, Roboto, sans-serif;
}

.chat-app vue-advanced-chat {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
