<template>
  <div class="folder-form pt-12">
    <div class="main-container">
      <div class="folder-form__header">
        <nuxt-link :to="localePath(ChatRoute.Folders)" class="folder-form__back">
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </nuxt-link>
        <h1>{{ $t("chat.folders.title") }}</h1>
      </div>

      <div class="folder-form__hero">
        <img src="/png/create-file.png" alt="" />
      </div>

      <label class="folder-form__name" :class="{ 'is-filled': name.length }">
        <input v-model="name" type="text" :placeholder="$t('chat.folders.name')" />
      </label>

      <section class="folder-form__section">
        <h2>{{ $t("chat.folders.includedChats") }}</h2>
        <div class="folder-form__card">
          <div v-for="option in includedTypes" :key="option.id" class="folder-form__row">
            <img :src="option.icon" width="24" height="24" alt="" />
            <span>{{ $t(option.label) }}</span>
            <button type="button" @click="removeIncludeType(option.id)">
              <img src="/svg/figma-icons/close.svg" width="16" height="16" alt="" />
            </button>
          </div>
          <div v-for="room in includedRooms" :key="room.roomId" class="folder-form__row">
            <img class="is-avatar" :src="room.avatar || DEFAULT_AVATAR" alt="" />
            <span>{{ room.roomName }}</span>
            <button type="button" @click="removeInclude(room.roomId)">
              <img src="/svg/figma-icons/close.svg" width="16" height="16" alt="" />
            </button>
          </div>
          <button class="folder-form__add" type="button" @click="openPicker(FolderPickerKind.Include)">
            <span class="folder-form__plus" />
            {{ $t("chat.folders.addChats") }}
          </button>
        </div>
        <p>{{ $t("chat.folders.includedChatsDesc") }}</p>
      </section>

      <section class="folder-form__section">
        <h2>{{ $t("chat.folders.excludedChats") }}</h2>
        <div class="folder-form__card">
          <div v-for="option in excludedTypes" :key="option.id" class="folder-form__row">
            <img :src="option.icon" width="24" height="24" alt="" />
            <span>{{ $t(option.label) }}</span>
            <button type="button" @click="removeExcludeType(option.id)">
              <img src="/svg/figma-icons/close.svg" width="16" height="16" alt="" />
            </button>
          </div>
          <div v-for="room in excludedRooms" :key="room.roomId" class="folder-form__row">
            <img class="is-avatar" :src="room.avatar || DEFAULT_AVATAR" alt="" />
            <span>{{ room.roomName }}</span>
            <button type="button" @click="removeExclude(room.roomId)">
              <img src="/svg/figma-icons/close.svg" width="16" height="16" alt="" />
            </button>
          </div>
          <button class="folder-form__add" type="button" @click="openPicker(FolderPickerKind.Exclude)">
            <span class="folder-form__plus" />
            {{ $t("chat.folders.addChatsToExclude") }}
          </button>
        </div>
        <p>{{ $t("chat.folders.excludedChatsDesc") }}</p>
      </section>

      <section class="folder-form__section">
        <div class="folder-form__color-head">
          <h2>{{ $t("chat.folders.color") }}</h2>
          <span v-if="color" class="folder-form__badge" :style="badgeStyle">{{
            name || $t("chat.folders.name")
          }}</span>
        </div>
        <div class="folder-form__colors">
          <button
            v-for="swatch in FOLDER_COLORS"
            :key="swatch"
            type="button"
            :class="{ 'is-on': swatch === color }"
            :style="{ background: swatch }"
            @click="color = color === swatch ? null : swatch"
          />
        </div>
        <p>{{ $t("chat.folders.folderColorDesc") }}</p>
      </section>
    </div>

    <div class="new-folder__button folder-form__bar">
      <button type="button" :class="{ 'is-ready': canSubmit }" :disabled="!canSubmit" @click="submit">
        {{ isEdit ? $t("chat.done") : $t("chat.folders.createAction") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatRoute } from "~/entities/chat/config";
import { DEFAULT_AVATAR, FolderDraftMode, FolderPickerKind } from "~/entities/chat/model";
import { EXCLUDE_TYPE_OPTIONS, FOLDER_COLORS, INCLUDE_TYPE_OPTIONS } from "~/features/chat/folder-options";
import { folderPickerPath, folderQuery } from "~/features/chat/folder-routes";
import { useChatNav } from "~/features/chat/chat-nav";
import { useChatUiStore } from "~/store/chat";
import type { ChatFolderSnapshot, FolderExcludeType, FolderIncludeType, VacRoom } from "~/entities/chat/model";

const props = defineProps<{ mode: FolderDraftMode }>();

const localePath = useLocalePath();
const { go } = useChatNav();
const route = useRoute();
const store = useChatUiStore();

const draft = computed(() => store.folderDraft);

const name = computed({
  get: () => draft.value?.name ?? "",
  set: (value: string) => store.patchFolderDraft({ name: value }),
});

const color = computed({
  get: () => draft.value?.color ?? null,
  set: (value: string | null) => store.patchFolderDraft({ color: value }),
});

const includedTypes = computed(() =>
  INCLUDE_TYPE_OPTIONS.filter((option) => draft.value?.includeTypeIds.includes(option.id)),
);
const excludedTypes = computed(() =>
  EXCLUDE_TYPE_OPTIONS.filter((option) => draft.value?.excludeTypeIds.includes(option.id)),
);
const roomsByIds = (ids: string[]): VacRoom[] => ids.flatMap((id) => store.findRoom(id) ?? []);

const includedRooms = computed(() => roomsByIds(draft.value?.includeIds ?? []));
const excludedRooms = computed(() => roomsByIds(draft.value?.excludeIds ?? []));

const isEdit = computed(() => props.mode === FolderDraftMode.Edit);

const sameIds = (left: string[], right: string[]): boolean => {
  if (left.length !== right.length) {
    return false;
  }
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((id, index) => id === sortedRight[index]);
};

const isDirty = (current: ChatFolderSnapshot, baseline: ChatFolderSnapshot): boolean =>
  current.name.trim() !== baseline.name.trim() ||
  (current.color ?? null) !== (baseline.color ?? null) ||
  !sameIds(current.includeIds, baseline.includeIds) ||
  !sameIds(current.excludeIds, baseline.excludeIds) ||
  !sameIds(current.includeTypeIds, baseline.includeTypeIds) ||
  !sameIds(current.excludeTypeIds, baseline.excludeTypeIds);

const canSubmit = computed(() => {
  if (!name.value.trim() || !draft.value) {
    return false;
  }
  if (!isEdit.value) {
    return draft.value.includeIds.length + draft.value.includeTypeIds.length > 0;
  }
  return Boolean(draft.value.baseline && isDirty(draft.value, draft.value.baseline));
});

const badgeStyle = computed(() => {
  if (!color.value) {
    return {};
  }
  return {
    backgroundColor: hexToRgba(color.value, 0.2),
    color: color.value,
  };
});

const hexToRgba = (hex: string, alpha: number): string => {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ensureDraft = (): void => {
  const current = store.folderDraft;
  if (props.mode === FolderDraftMode.New) {
    if (current?.mode !== FolderDraftMode.New) {
      store.beginNewFolder();
    }
    return;
  }
  const id = typeof route.query.id === "string" ? route.query.id : current?.id ?? "";
  if (current?.mode !== FolderDraftMode.Edit || current.id !== id) {
    store.beginEditFolder(id);
  }
};

const removeInclude = (roomId: string): void => {
  store.patchFolderDraft({
    includeIds: (draft.value?.includeIds ?? []).filter((id) => id !== roomId),
  });
};

const removeExclude = (roomId: string): void => {
  store.patchFolderDraft({
    excludeIds: (draft.value?.excludeIds ?? []).filter((id) => id !== roomId),
  });
};

const removeIncludeType = (typeId: FolderIncludeType): void => {
  store.patchFolderDraft({
    includeTypeIds: (draft.value?.includeTypeIds ?? []).filter((id) => id !== typeId),
  });
};

const removeExcludeType = (typeId: FolderExcludeType): void => {
  store.patchFolderDraft({
    excludeTypeIds: (draft.value?.excludeTypeIds ?? []).filter((id) => id !== typeId),
  });
};

const openPicker = (kind: FolderPickerKind): void => {
  void go(folderPickerPath(props.mode, kind), folderQuery(store.folderDraft?.id));
};

const submit = (): void => {
  if (!store.commitFolderDraft()) {
    return;
  }
  void go(ChatRoute.Folders);
};

onMounted(ensureDraft);
watch(() => route.query.id, ensureDraft);
</script>

<style lang="scss">
.folder-form {
  padding-bottom: 96px;
  color: #fff;

  &__header {
    display: flex;
    align-items: center;
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
      color: #fff;
    }
  }

  &__back {
    display: flex;
    transform: rotate(180deg);
  }

  &__hero {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

    img {
      width: 125px;
      height: 125px;
      object-fit: contain;
    }
  }

  &__name {
    display: block;
    margin-bottom: 16px;
    background: #14131b;
    border: 1px solid transparent;
    border-radius: 12px;

    &:focus-within {
      border-color: var(--primary-2);
    }

    input {
      width: 100%;
      height: 44px;
      border: 0;
      background: transparent;
      padding: 0 14px;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 1.3;
      color: #fff;
      outline: none;

      &::placeholder {
        color: #67639a;
      }
    }
  }

  &__section {
    margin-bottom: 16px;

    h2 {
      margin: 0 0 8px 8px;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.3;
      color: #fff;
    }

    p {
      margin: 4px 0 0;
      padding: 0 8px;
      font-family: "Roboto", sans-serif;
      font-size: 12px;
      line-height: 1.35;
      color: #8780cf;
    }
  }

  &__card {
    background: #14131b;
    border-radius: 12px;
    overflow: hidden;
  }

  &__row,
  &__add {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    background: transparent;
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;
    text-align: left;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: calc(100% - 16px);
      border-bottom: 1px solid #2b2741;
    }
  }

  &__row span {
    flex: 1;
  }

  &__row button {
    display: flex;
    border: 0;
    background: transparent;
    padding: 0;
  }

  &__row .is-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__add {
    color: var(--primary-2);
    cursor: pointer;

    &::after {
      display: none;
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

  &__color-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    h2 {
      margin-bottom: 0;
    }
  }

  &__badge {
    border-radius: 8px;
    padding: 6px 8px;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;
  }

  &__colors {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 8px;

    button {
      width: 32px;
      height: 32px;
      border: 0;
      border-radius: 50%;
      padding: 0;
      position: relative;
      cursor: pointer;

      &.is-on::after {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: #000;
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
      font-weight: 400;
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
