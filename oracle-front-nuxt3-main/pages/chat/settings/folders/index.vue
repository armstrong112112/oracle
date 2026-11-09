<template>
  <div class="chat-folders pt-12">
    <div class="main-container">
      <div class="chat-folders__header">
        <nuxt-link :to="localePath(ChatRoute.Settings)" class="chat-folders__back">
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </nuxt-link>
        <h1>{{ $t("chat.folders.title") }}</h1>
        <button v-if="!editing" type="button" @click="editing = true">
          {{ $t("chat.edit") }}
        </button>
        <button v-else type="button" @click="editing = false">
          {{ $t("chat.done") }}
        </button>
      </div>

      <div class="chat-folders__intro">
        <img src="/png/file-img.png" alt="" />
        <p>{{ $t("chat.folders.description") }}</p>
      </div>

      <div class="chat-folders__card">
        <div
          v-for="folder in ordered"
          :key="folder.id"
          class="chat-folders__row"
          :data-folder-id="folder.id"
        >
          <button
            v-if="editing && folder.id !== ALL_FOLDER_ID"
            class="chat-folders__minus"
            type="button"
            @click="store.removeFolder(folder.id)"
          >
            <span />
          </button>
          <button
            class="chat-folders__link"
            type="button"
            :disabled="editing"
            @click="openFolder(folder.id)"
          >
            <span>{{ titleOf(folder) }}</span>
            <img
              v-if="!editing"
              src="/svg/figma-icons/arrow.svg"
              width="24"
              height="24"
              alt=""
            />
          </button>
          <button
            v-if="editing && folder.id !== ALL_FOLDER_ID"
            class="chat-folders__handle"
            type="button"
            @pointerdown="onDragStart(folder.id, $event)"
          >
            <img src="/svg/figma-icons/lines.svg" width="24" height="24" alt="" draggable="false" />
          </button>
        </div>
        <button v-if="!editing" class="chat-folders__create" type="button" @click="createFolder">
          <span class="chat-folders__plus" />
          {{ $t("chat.folders.createRow") }}
        </button>
      </div>

      <p v-if="!editing" class="chat-folders__hint">
        {{ $t("chat.folders.hint") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatRoute } from "~/entities/chat/config";
import { folderTitle } from "~/entities/chat/lib/folder-title";
import { ALL_FOLDER_ID } from "~/entities/chat/model";
import type { ChatFolder } from "~/entities/chat/model";
import { useChatNav } from "~/features/chat/chat-nav";
import { useChatUiStore } from "~/store/chat";

const localePath = useLocalePath();
const { t } = useI18n();
const { go } = useChatNav();
const store = useChatUiStore();
const editing = ref(false);

const titleOf = (folder: ChatFolder): string => folderTitle(folder.id, folder.name, (key) => t(key));

const ordered = computed(() => {
  const pinned = store.folders.filter((folder) => folder.id === ALL_FOLDER_ID);
  const rest = store.folders.filter((folder) => folder.id !== ALL_FOLDER_ID);
  return [...pinned, ...rest];
});

const openFolder = (id: string): void => {
  if (editing.value) {
    return;
  }
  store.beginEditFolder(id);
  void go(ChatRoute.FolderEdit, { id });
};

const createFolder = (): void => {
  store.beginNewFolder();
  void go(ChatRoute.FolderNew);
};

const onDragStart = (id: string, event: PointerEvent): void => {
  if (id === ALL_FOLDER_ID || event.button !== 0) {
    return;
  }
  const handle = event.currentTarget as HTMLElement;
  const row = handle.closest<HTMLElement>(".chat-folders__row");
  const card = row?.parentElement;
  if (!row || !card) {
    return;
  }
  event.preventDefault();
  try {
    handle.setPointerCapture(event.pointerId);
  } catch {
    // The pointer can already be gone. Listeners below still finish the gesture.
  }

  const movable = (): HTMLElement[] =>
    [...card.querySelectorAll<HTMLElement>(".chat-folders__row")].filter(
      (item) => item.dataset.folderId && item.dataset.folderId !== ALL_FOLDER_ID,
    );
  const rows = movable();
  const from = rows.findIndex((item) => item.dataset.folderId === id);
  if (from < 0) {
    return;
  }
  const height = row.getBoundingClientRect().height || 44;
  const startY = event.clientY;
  const startIndex = new Map(rows.map((item, index) => [item.dataset.folderId ?? "", index]));
  let order = rows.map((item) => item.dataset.folderId ?? "");
  let target = from;
  row.classList.add("is-lifted");

  const place = (clientY: number): void => {
    const nextTarget = Math.min(order.length - 1, Math.max(0, Math.round(from + (clientY - startY) / height)));
    target = nextTarget;
    for (const item of movable()) {
      const folderId = item.dataset.folderId ?? "";
      const start = startIndex.get(folderId) ?? 0;
      if (folderId === id) {
        item.style.transition = "none";
        item.style.transform = `translateY(${clientY - startY}px)`;
        continue;
      }
      let shift = 0;
      if (nextTarget > from && start > from && start <= nextTarget) {
        shift = -1;
      } else if (nextTarget < from && start < from && start >= nextTarget) {
        shift = 1;
      }
      item.style.transition = "transform .16s ease";
      item.style.transform = shift ? `translateY(${shift * height}px)` : "";
    }
  };

  const stop = (): void => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", finish);
    window.removeEventListener("pointercancel", finish);
  };

  const finish = (ev: PointerEvent): void => {
    if (ev.pointerId !== event.pointerId) {
      return;
    }
    stop();
    for (const item of movable()) {
      item.style.transition = "";
      item.style.transform = "";
    }
    row.classList.remove("is-lifted");
    if (target === from) {
      return;
    }
    const next = order.filter((folderId) => folderId !== id);
    next.splice(target, 0, id);
    const byId = new Map(store.folders.map((folder) => [folder.id, folder]));
    const pinned = store.folders.filter((folder) => folder.id === ALL_FOLDER_ID);
    store.setFolderOrder([...pinned, ...next.flatMap((folderId) => byId.get(folderId) ?? [])]);
  };

  const move = (ev: PointerEvent): void => {
    if (ev.pointerId !== event.pointerId) {
      return;
    }
    ev.preventDefault();
    place(ev.clientY);
  };

  window.addEventListener("pointermove", move, { passive: false });
  window.addEventListener("pointerup", finish);
  window.addEventListener("pointercancel", finish);
};
</script>

<style lang="scss">
.chat-folders {
  color: #fff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    margin-bottom: 24px;
    position: relative;

    h1 {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.4;
      pointer-events: none;
    }

    button {
      border: 0;
      background: transparent;
      padding: 0;
      color: var(--primary-2);
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 1.4;
      cursor: pointer;
    }
  }

  &__back {
    display: flex;
    transform: rotate(180deg);
  }

  &__intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;

    img {
      width: 150px;
      height: 130px;
      object-fit: contain;
    }

    p {
      max-width: 289px;
      margin: 0;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 1.3;
      text-align: center;
      color: #8780cf;
    }
  }

  &__card {
    background: #14131b;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  &__row,
  &__create {
    display: flex;
    align-items: center;
    min-height: 44px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: calc(100% - 12px);
      border-bottom: 1px solid #2b2741;
    }
  }

  &__card > :last-child::after {
    display: none;
  }

  &__link,
  &__create {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    border: 0;
    background: transparent;
    padding: 0 8px 0 16px;
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;
    text-align: left;
    cursor: pointer;

    &:disabled {
      opacity: 1;
      color: #fff;
      cursor: default;
    }
  }

  &__link span {
    flex: 1;
  }

  &__create {
    width: 100%;
    color: var(--primary-2);
  }

  &__minus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin-left: 4px;
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;

    span {
      width: 12px;
      height: 2px;
      border-radius: 2px;
      background: var(--primary-2);
    }
  }

  &__row.is-lifted {
    z-index: 2;
    background: #1b1a24;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }

  &__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 44px;
    margin-right: 4px;
    border: 0;
    background: transparent;
    padding: 0;
    cursor: grab;
    touch-action: none;
    user-select: none;

    img {
      pointer-events: none;
    }
  }

  &__plus {
    width: 20px;
    height: 20px;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      background: var(--primary-2);
      border-radius: 2px;
    }

    &::before {
      width: 13px;
      height: 1.5px;
      transform: translate(-50%, -50%);
    }

    &::after {
      width: 1.5px;
      height: 13px;
      transform: translate(-50%, -50%);
    }
  }

  &__hint {
    margin: 0;
    padding: 0 2px;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;
    color: #8780cf;
  }
}
</style>
