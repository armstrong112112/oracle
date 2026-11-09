<template>
  <div class="folder-picker">
    <div class="main-container">
      <div class="folder-picker__header">
        <button type="button" @click="close">{{ $t("chat.cancel") }}</button>
        <h1>{{ title }}</h1>
      </div>

      <label class="folder-picker__search">
        <img src="/svg/figma-icons/search.svg" width="24" height="24" alt="" />
        <input v-model="query" type="text" :placeholder="$t('chat.folders.search')" />
      </label>

      <section v-if="visibleTypes.length" class="folder-picker__block">
        <h2>{{ $t("chat.folders.chatTypes") }}</h2>
        <ul>
          <li v-for="option in visibleTypes" :key="option.id">
            <button type="button" @click="toggleType(option.id)">
              <img :src="option.icon" width="24" height="24" alt="" />
              <span>{{ $t(option.label) }}</span>
              <i :class="{ 'is-on': selectedTypes.includes(option.id) }" />
            </button>
          </li>
        </ul>
      </section>

      <section v-if="visibleRooms.length" class="folder-picker__block">
        <h2>{{ $t("chat.folders.chats") }}</h2>
        <ul>
          <li v-for="room in visibleRooms" :key="room.roomId">
            <button type="button" @click="toggleRoom(room.roomId)">
              <img class="is-avatar" :src="room.avatar || DEFAULT_AVATAR" alt="" />
              <span>{{ room.roomName }}</span>
              <i :class="{ 'is-on': selectedRooms.includes(room.roomId) }" />
            </button>
          </li>
        </ul>
      </section>
    </div>

    <div class="include-chats__button folder-picker__bar">
      <button type="button" :class="{ 'is-ready': canDone }" :disabled="!canDone" @click="done">
        {{ $t("chat.done") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isServiceRoom } from "~/entities/chat/lib/important-rooms";
import { DEFAULT_AVATAR, FolderPickerKind } from "~/entities/chat/model";
import { EXCLUDE_TYPE_OPTIONS, INCLUDE_TYPE_OPTIONS } from "~/features/chat/folder-options";
import { folderFormPath, folderQuery } from "~/features/chat/folder-routes";
import { useChatNav } from "~/features/chat/chat-nav";
import { useChatUiStore } from "~/store/chat";
import type { FolderDraftMode, FolderExcludeType, FolderIncludeType } from "~/entities/chat/model";

type TypeId = FolderIncludeType | FolderExcludeType;

const props = defineProps<{
  kind: FolderPickerKind;
  mode: FolderDraftMode;
}>();

const { t } = useI18n();
const route = useRoute();
const { go } = useChatNav();
const store = useChatUiStore();

const isInclude = computed(() => props.kind === FolderPickerKind.Include);
const query = ref("");
const selectedTypes = ref<TypeId[]>([]);
const selectedRooms = ref<string[]>([]);

const title = computed(() => (isInclude.value ? t("chat.folders.includeChats") : t("chat.folders.excludeChats")));

const typeOptions = computed(() => (isInclude.value ? INCLUDE_TYPE_OPTIONS : EXCLUDE_TYPE_OPTIONS));

const visibleTypes = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return typeOptions.value.filter((option) => !needle || t(option.label).toLowerCase().includes(needle));
});

const visibleRooms = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return store.rooms.filter(
    (room) => !isServiceRoom(room.roomId) && (!needle || room.roomName.toLowerCase().includes(needle)),
  );
});

const canDone = computed(() => selectedTypes.value.length + selectedRooms.value.length > 0);

const toggle = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const toggleType = (id: TypeId): void => {
  selectedTypes.value = toggle(selectedTypes.value, id);
};

const toggleRoom = (id: string): void => {
  selectedRooms.value = toggle(selectedRooms.value, id);
};

const close = (): void => {
  const id = typeof route.query.id === "string" ? route.query.id : null;
  void go(folderFormPath(props.mode), folderQuery(id));
};

const done = (): void => {
  if (!canDone.value) {
    return;
  }
  if (!store.folderDraft) {
    store.beginNewFolder();
  }
  if (isInclude.value) {
    store.patchFolderDraft({
      includeIds: [...selectedRooms.value],
      includeTypeIds: [...selectedTypes.value] as FolderIncludeType[],
    });
  } else {
    store.patchFolderDraft({
      excludeIds: [...selectedRooms.value],
      excludeTypeIds: [...selectedTypes.value] as FolderExcludeType[],
    });
  }
  close();
};

onMounted(() => {
  const draft = store.folderDraft;
  if (!draft) {
    return;
  }
  selectedTypes.value = [...(isInclude.value ? draft.includeTypeIds : draft.excludeTypeIds)];
  selectedRooms.value = [...(isInclude.value ? draft.includeIds : draft.excludeIds)];
});
</script>

<style lang="scss">
.folder-picker {
  min-height: 100dvh;
  padding: 12px 0 96px;
  color: #fff;

  &__header {
    display: flex;
    align-items: center;
    height: 44px;
    margin-bottom: 12px;
    position: relative;

    button {
      border: 0;
      background: transparent;
      padding: 0;
      color: var(--primary-2);
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 1.3;
      cursor: pointer;
    }

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
    }
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 44px;
    margin-bottom: 24px;
    padding: 0 12px;
    background: #14131b;
    border-radius: 12px;

    input {
      width: 100%;
      border: 0;
      background: transparent;
      color: #fff;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 1.3;
      outline: none;

      &::placeholder {
        color: #67639a;
      }
    }
  }

  &__block {
    margin-bottom: 16px;

    h2 {
      margin: 0 0 8px 8px;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.3;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      background: #14131b;
      border-radius: 12px;
      overflow: hidden;
    }

    li:last-child button::after {
      display: none;
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 44px;
      padding: 0 12px 0 16px;
      border: 0;
      background: transparent;
      color: #fff;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 1.3;
      text-align: left;
      position: relative;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: calc(100% - 12px);
        border-bottom: 1px solid #2b2741;
      }
    }

    span {
      flex: 1;
    }

    .is-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
    }

    i {
      width: 20px;
      height: 20px;
      border: 1.5px solid #60578e;
      border-radius: 50%;
      box-sizing: border-box;
      position: relative;

      &.is-on {
        border-color: var(--primary-2);
        background: var(--primary-2);
      }

      &.is-on::after {
        content: "";
        position: absolute;
        left: 6px;
        top: 3px;
        width: 4px;
        height: 8px;
        border: solid #fff;
        border-width: 0 1.5px 1.5px 0;
        transform: rotate(45deg);
      }
    }
  }

  &__bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background: #14131b;
    border-top: 1px solid #2b2741;
    padding: 12px 16px 24px;

    button {
      width: 100%;
      height: 36px;
      border-radius: 12px;
      border: 2px solid #2b2741;
      background: #13121b;
      color: #67639a;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 1.3;
      cursor: default;

      &.is-ready {
        border-color: transparent;
        background: var(--primary-2);
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
