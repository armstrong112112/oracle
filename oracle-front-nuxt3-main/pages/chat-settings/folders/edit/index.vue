<template>
  <div class="edit-folder pt-12">
    <div class="main-container">
      <!-- Header -->
      <div class="edit-folder__header">
        <nuxt-link
          :to="localePath('/chat-settings/folders')"
          class="edit-folder__header-back">
          <BackIcon />
        </nuxt-link>
        <h2 class="edit-folder__header-title">
          {{ $t("chat.folders.title") }}
        </h2>
      </div>

      <!-- Intro -->
      <div class="edit-folder__intro">
        <div class="edit-folder__intro-image">
          <img src="/png/create-file.png" alt="Chat folders illustration" />
        </div>
      </div>

      <!-- Folder Name -->
      <div class="edit-folder__field">
        <div class="form-control">
          <input
            v-model="folderName"
            type="text"
            :placeholder="$t('chat.folders.name')"
            class="edit-folder__input" />
        </div>
      </div>

      <!-- Included Chats -->
      <div class="edit-folder__section">
        <label class="edit-folder__label">{{
          $t("chat.folders.includedChats")
        }}</label>
        <div class="edit-folder__chat-block">
          <div
            v-for="(i, index) in include"
            :key="index"
            class="edit-folder__chat-item">
            <img
              src="/svg/avatar.svg"
              alt="Julia Work"
              class="edit-folder__chat-avatar" />
            <span class="edit-folder__chat-name">{{ i.name }}</span>
            <button
              class="edit-folder__chat-delete--btn"
              @click="deleteInclude(index)">
              <DeleteIcon />
            </button>
          </div>
          <nuxt-link
            :to="localePath('/chat-settings/folders/edit/include')"
            class="edit-folder__link">
            <span><PlusIcon /></span> {{ $t("chat.folders.addChats") }}
          </nuxt-link>
        </div>
        <p class="edit-folder__desc">
          {{ $t("chat.folders.includedChatsDesc") }}
        </p>
      </div>

      <!-- Excluded Chats -->
      <div class="edit-folder__section">
        <label class="edit-folder__label">{{
          $t("chat.folders.excludedChats")
        }}</label>
        <div class="edit-folder__chat-block">
          <div
            v-for="(i, index) in exclude"
            :key="index"
            class="edit-folder__chat-item">
            <img
              src="/assets/svg/avatar.svg"
              alt="Julia Work"
              class="edit-folder__chat-avatar" />
            <span class="edit-folder__chat-name">Julia Work</span>
            <button
              class="edit-folder__chat-delete--btn"
              @click="deleteExclude(index)">
              <DeleteIcon />
            </button>
          </div>
          <nuxt-link
            :to="localePath('/chat-settings/folders/edit/exclude')"
            class="edit-folder__link">
            <span><PlusIcon /> </span>
            {{ $t("chat.folders.addChatsToExclude") }}
          </nuxt-link>
        </div>
        <p class="edit-folder__desc">
          {{ $t("chat.folders.excludedChatsDesc") }}
        </p>
      </div>

      <!-- Folder Color -->
      <div class="edit-folder__field">
        <div class="edit-folder__field-head">
          <label class="edit-folder__label">{{
            $t("chat.folders.folderColor")
          }}</label>
          <span
            v-if="selectedColor !== null"
            class="folder-color__badge"
            :style="badgeStyle"
            >{{ folderName }}</span
          >
        </div>
        <div class="edit-folder__colors">
          <div
            v-for="color in colors"
            :key="color"
            :class="[
              'edit-folder__color-circle',
              { selected: color === selectedColor },
            ]"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)" />
        </div>
        <p class="edit-folder__desc">
          {{ $t("chat.folders.folderColorDesc") }}
        </p>
      </div>

      <!-- Create Button -->
      <div class="edit-folder__button">
        <new-oracle-button
          :to="localePath('/chat-settings/folders')"
          :text="$t('chat.folders.save')"
          color="yellow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "@/assets/svg/arrow-back.svg?component";
import DeleteIcon from "@/assets/svg/delete-img.svg?component";
import PlusIcon from "@/assets/svg/plus.svg?component";

// Use localePath if needed
const localePath = useLocalePath();

// Reactive state
const folderName = ref("News");
const selectedColor = ref<string | null>("#955ddc");

const colors = [
  "#fff",
  "#3faa20",
  "#d57624",
  "#cc5048",
  "#955ddc",
  "#309dba",
  "#c7508a",
  "#74899a",
];

const include = ref([
  { name: "Bill" },
  { name: "Julia Work" },
  { name: "Bill" },
]);

const exclude = ref([{ name: "Bill" }]);

// Computed properties
const isCreateActive = computed((): boolean => {
  return folderName.value.trim().length > 0 || selectedColor.value !== null;
});

const badgeStyle = computed(() => {
  if (!selectedColor.value) return {};
  return {
    backgroundColor: hexToRgba(selectedColor.value, 0.2),
    color: selectedColor.value,
  };
});

// Methods
const selectColor = (color: string) => {
  selectedColor.value = color;
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const deleteInclude = (index: number) => {
  include.value.splice(index, 1);
};

const deleteExclude = (index: number) => {
  exclude.value.splice(index, 1);
};
</script>

<style lang="scss">
.edit-folder {
  padding-bottom: 72px;
  &__label {
    display: block;
    margin-bottom: 8px;
    margin-left: 8px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    margin-bottom: 24px;
    position: relative;
    &-back {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      color: #fff;
    }
  }
  &__intro {
    margin-bottom: 24px;
    &-image {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      img {
        width: 125px;
        height: 125px;
      }
    }
  }
  &__field {
    margin-bottom: 24px;
    .form-control {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #13121b;
      border-radius: 12px;
      padding: 0 9px 0 0;
      border: 1px solid #13121b;
      &:focus-within {
        border-color: #f64e2a;
      }
    }
  }
  &__input {
    width: 100%;
    height: 44px;
    background: transparent;
    border: 0;
    padding: 0 12px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 1);
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      color: rgba(255, 255, 255, 0.65);
    }
  }
  &__section {
    margin-bottom: 32px;
  }
  &__chat-block {
    margin-bottom: 4px;
    background: #14131b;
    border-radius: 12px;
    .edit-folder__link {
      height: 44px;
      padding: 0 16px;
      margin: 0;
    }
  }
  &__chat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    position: relative;
    &::after {
      content: "";
      width: calc(100% - 16px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &__chat-avatar {
    width: 28px;
    min-width: 28px;
    height: 28px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__chat-name {
    width: 100%;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__divider {
    position: relative;
    left: 20px;
    border-color: rgba(255, 255, 255, 0.3);
  }
  &__chat-delete--btn {
    cursor: pointer;
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 0 16px;
    background: #14131b;
    border-radius: 12px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: var(--primary-2);
    svg {
      rect {
        fill: var(--primary-2);
      }
    }
  }
  &__desc {
    padding: 0 8px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7873b4;
  }
  &__field-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .edit-folder__label {
      margin-bottom: 0;
    }
    .folder-color__badge {
      border-radius: 8px;
      padding: 6px 8px;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 10px;
      transition: 0.2s;
    }
  }
  &__colors {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 0 8px;
    margin-bottom: 8px;
    .edit-folder__color-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      &.selected {
        &::after {
          opacity: 1;
        }
      }

      &::after {
        content: "";
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid var(--secondary-1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: 0.2s;
      }
    }
  }
  &__button {
    width: 100%;
    background: #14131b;
    border-top: 1px solid #2b2741;
    padding: 12px 16px 24px 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    .new-oracle-button {
      max-width: 345px;
      margin: 0 auto;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
      &.yellow {
        color: #fff;
      }
    }
  }
}
</style>
