<template>
  <div class="rooms-chrome" :class="{ 'is-compose': composing, 'is-creating': composing && Boolean(creating) }">
    <div class="rooms-chrome__nav">
      <button class="rooms-chrome__side" type="button" @click="onLeadingClick">
        {{ composing ? t("chat.cancel") : t("chat.edit") }}
      </button>
      <h1 class="rooms-chrome__title">
        {{ composing ? t("chat.list.newMessage") : t("chat.list.chats") }}
      </h1>
      <button
        v-if="!composing"
        class="rooms-chrome__side is-end"
        type="button"
        :title="t('chat.list.newMessage')"
        @click="openCompose"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 2.2v13.6M2.2 9h13.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
      <span v-else class="rooms-chrome__side" />
    </div>

    <label class="rooms-chrome__search">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.4" />
        <path d="M12.1 12.1L15.2 15.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      </svg>
      <input
        v-model="query"
        type="search"
        :placeholder="t('chat.search')"
      />
    </label>

    <div v-if="!composing" class="rooms-chrome__folders" @wheel="onFoldersWheel">
      <Tabs :tabs="tabs" :active="store.activeFolderId" size="sm" @select="onSelectFolder" />
    </div>

    <ChatComposeSheet
      v-else
      v-model:query="query"
      v-model:creating="creating"
      @contact="openContact"
      @done="onCreated"
    />
  </div>

  <Teleport to="body">
    <div v-if="composeModal" class="rooms-compose-popup">
      <SlotModal :is-open="composeModal" :close="closeComposeModal">
        <div class="rooms-chrome is-compose is-modal" :class="{ 'is-creating': Boolean(modalCreating) }">
          <div class="rooms-chrome__nav">
            <button class="rooms-chrome__side" type="button" @click="closeComposeModal">
              {{ t("chat.cancel") }}
            </button>
            <h1 class="rooms-chrome__title">{{ t("chat.list.newMessage") }}</h1>
            <span class="rooms-chrome__side" />
          </div>
          <label class="rooms-chrome__search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.4" />
              <path d="M12.1 12.1L15.2 15.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
            <input v-model="modalQuery" type="search" :placeholder="t('chat.search')" />
          </label>
          <ChatComposeSheet
            v-model:query="modalQuery"
            v-model:creating="modalCreating"
            @contact="openContact"
            @done="onCreated"
          />
        </div>
      </SlotModal>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import SlotModal from "~/components/ui/SlotModal.vue";
import Tabs, { type TabItem } from "~/components/ui/Tabs.vue";
import { ChatRoute } from "~/entities/chat/config";
import { useChatDesktop } from "~/entities/chat/lib/use-chat-desktop";
import { folderTitle } from "~/entities/chat/lib/folder-title";
import { ChatKind } from "~/entities/chat/model";
import { useChatNav } from "~/features/chat/chat-nav";
import { useChatUiStore } from "~/store/chat";
import ChatComposeSheet from "~/widgets/chat/ChatComposeSheet/index.vue";
import type { CreatableKind } from "~/entities/chat/model";

const query = defineModel<string>("query", { default: "" });
const composing = defineModel<boolean>("composing", { default: false });
const creating = ref<CreatableKind | null>(null);
const composeModal = ref(false);
const modalQuery = ref("");
const modalCreating = ref<CreatableKind | null>(null);
const wide = useChatDesktop();

const { t } = useI18n();
const store = useChatUiStore();
const { go } = useChatNav();

const tabs = computed((): TabItem[] =>
  store.folders.map((folder) => ({
    value: folder.id,
    title: folderTitle(folder.id, folder.name, (key) => t(key)),
  })),
);

const onFoldersWheel = (event: WheelEvent): void => {
  const el = event.currentTarget as HTMLElement;
  if (el.scrollWidth <= el.clientWidth || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
    return;
  }
  el.scrollLeft += event.deltaY;
  event.preventDefault();
};

const onSelectFolder = (value: TabItem | (string | TabItem)[]): void => {
  if (Array.isArray(value)) {
    return;
  }
  store.setActiveFolder(value.value);
};

const closeComposeModal = (): void => {
  composeModal.value = false;
  modalQuery.value = "";
  modalCreating.value = null;
};

const openCompose = (): void => {
  if (wide.value) {
    modalQuery.value = "";
    modalCreating.value = null;
    composeModal.value = true;
    return;
  }
  query.value = "";
  composing.value = true;
};

const onLeadingClick = (): void => {
  if (composing.value) {
    query.value = "";
    composing.value = false;
    return;
  }
  void go(ChatRoute.Settings);
};

const onCreated = (): void => {
  creating.value = null;
  query.value = "";
  composing.value = false;
  closeComposeModal();
};

watch(composing, (value) => {
  if (!value) {
    creating.value = null;
  }
});

const openContact = (userId: string): void => {
  const room = store.rooms.find(
    (item) =>
      store.extras[item.roomId]?.kind === ChatKind.Dm &&
      item.users.some((user) => user._id === userId),
  );
  if (!room) {
    return;
  }
  store.selectRoom(room.roomId);
  query.value = "";
  composing.value = false;
  closeComposeModal();
};

useEventListener("keydown", (event: KeyboardEvent) => {
  if (composeModal.value && event.key === "Escape") {
    closeComposeModal();
  }
});

watch(wide, (isWide) => {
  if (isWide && composing.value) {
    modalQuery.value = query.value;
    modalCreating.value = creating.value;
    query.value = "";
    creating.value = null;
    composing.value = false;
    composeModal.value = true;
    return;
  }
  if (!isWide && composeModal.value) {
    query.value = modalQuery.value;
    creating.value = modalCreating.value;
    composing.value = true;
    closeComposeModal();
  }
});
</script>

<style lang="scss" scoped>
.rooms-chrome {
  display: flex;
  flex-direction: column;
  background: var(--primary-1);
  font-family: Roboto, Inter, sans-serif;
}

.rooms-chrome.is-compose {
  position: relative;
  height: 100%;
  overflow: auto;
}

.rooms-chrome.is-creating {
  overflow: hidden;
}

.rooms-chrome__wizard {
  position: absolute;
  inset: 0;
  z-index: 3;
}

.rooms-chrome__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 38px;
  padding: 0 16px;
}

.rooms-chrome__side {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  min-width: 36px;
  height: 36px;
  padding: 0 5px;
  border: 0;
  background: transparent;
  color: var(--primary-2);
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
  cursor: pointer;
}

.rooms-chrome__side.is-end {
  justify-content: flex-end;
}

.rooms-chrome__title {
  margin: 0;
  color: var(--primary-3);
  font: 500 18px/1.4 Roboto, Inter, sans-serif;
  white-space: nowrap;
}

.rooms-chrome__search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 16px 12px;
  padding: 13px 14px;
  border-radius: 12px;
  background: #13121b;
  color: #67639a;
}

.rooms-chrome__search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--primary-3);
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
}

.rooms-chrome__search input::placeholder {
  color: #67639a;
}

.rooms-chrome__folders {
  height: 28px;
  overflow-x: auto;
  overflow-y: hidden;
  border-bottom: 1px solid #2b2741;
  box-sizing: content-box;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  :deep(.tabs-container) {
    width: max-content;
    min-width: 100%;
    height: 100%;
    gap: 16px;
    align-items: flex-start;
    padding: 0 16px;
  }

  :deep(.tab-item.tab-item--sm) {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 8px;
    width: auto;
    min-width: max-content;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    color: #8780cf;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3;
    white-space: nowrap;
    overflow: visible;
  }

  :deep(.tab-item.tab-item--sm:hover),
  :deep(.tab-item.tab-item--sm.tab-item--active),
  :deep(.tab-item.tab-item--sm.tab-item--active:hover) {
    background: transparent;
  }

  :deep(.tab-item.tab-item--sm .tab-title) {
    overflow: visible;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3;
    text-align: center;
    color: #8780cf;
  }

  :deep(.tab-item.tab-item--sm.tab-item--active),
  :deep(.tab-item.tab-item--sm.tab-item--active .tab-title) {
    color: var(--primary-2);
    font-weight: 400;
  }

  :deep(.tab-item.tab-item--sm::after) {
    content: "";
    display: block;
    flex: 0 0 2px;
    width: 100%;
    height: 2px;
    border-radius: 10px;
    background: var(--primary-2);
    opacity: 0;
  }

  :deep(.tab-item.tab-item--sm.tab-item--active::after) {
    opacity: 1;
  }
}

.rooms-chrome__create {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px 24px;
}

.rooms-chrome__label,
.rooms-chrome__letter {
  margin: 0;
  padding: 0 8px;
  color: var(--primary-3);
  font: 500 14px/1.3 Roboto, Inter, sans-serif;
}

.rooms-chrome__letter {
  margin-top: 12px;
  color: #8780cf;
}

.rooms-chrome__types,
.rooms-chrome__people {
  overflow: hidden;
  border-radius: 12px;
  background: #14131b;
}

.rooms-chrome__type,
.rooms-chrome__person {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 0;
  border-bottom: 1px solid #2b2741;
  background: transparent;
  color: var(--primary-3);
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
  text-align: left;
  cursor: pointer;
}

.rooms-chrome__type:last-child,
.rooms-chrome__person:last-child {
  border-bottom: 0;
}

.rooms-chrome__type span:nth-child(2),
.rooms-chrome__person span {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rooms-chrome__type svg:last-child {
  color: #8780cf;
}

.rooms-chrome__type-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  color: #fff;
}

.rooms-chrome__type-icon.is-group {
  background: #3b82f6;
}

.rooms-chrome__type-icon.is-contact {
  background: #22c55e;
}

.rooms-chrome__type-icon.is-channel {
  background: var(--primary-2);
}

.rooms-chrome__person img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.rooms-chrome.is-modal {
  flex: 1;
  min-height: 0;
  height: auto;
}

.rooms-compose-popup {
  :deep(.slot-modal__container) {
    width: min(420px, calc(100vw - 32px));
    height: min(720px, calc(100vh - 64px));
    max-height: min(720px, calc(100vh - 64px));
    padding: 8px 0 12px;
    overflow: hidden;
    background: var(--primary-1);
  }

  :deep(.slot-modal__scroll) {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  :deep(.slot-modal__close) {
    display: none;
  }
}
</style>
