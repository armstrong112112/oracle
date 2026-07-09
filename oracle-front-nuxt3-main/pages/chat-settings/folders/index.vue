<template>
  <div class="chat-folders pt-12">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-folders__header">
        <nuxt-link
          :to="localePath('/chat-settings')"
          class="chat-folders__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="chat-folders__header-title">
          {{ $t("chat.folders.title") }}
        </h1>
        <button
          v-if="!isEditMode"
          class="chat-folders__header-btn chat-folders__header-btn--edit"
          @click="isEditMode = true">
          {{ $t("chat.edit") }}
        </button>
        <button
          v-else
          class="chat-folders__header-btn chat-folders__header-btn--done"
          @click="isEditMode = false">
          {{ $t("chat.done") }}
        </button>
      </div>

      <!-- Intro -->
      <div class="chat-folders__intro">
        <div class="chat-folders__intro-image">
          <img src="/png/file-img.png" alt="Chat folders illustration" />
        </div>
        <p class="chat-folders__intro-description">
          {{ $t("chat.folders.description") }}
        </p>
      </div>

      <!-- Body (Create + List) -->
      <div class="chat-folders__body">
        <!-- Folder list -->
        <ul class="chat-folders__list">
          <li
            v-for="(folder, index) in folders"
            :key="index"
            class="chat-folders__list-item">
            <button
              v-if="isEditMode && folder.deletable"
              class="chat-folders__list-item-delete"
              @click="deleteFolder(index)">
              <span></span>
            </button>
            <nuxt-link
              :to="isEditMode ? '' : localePath('/chat-settings/folders/edit')"
              class="chat-folders__list-item-link">
              <span class="chat-folders__list-item-label">{{
                folder.name
              }}</span>
              <button v-if="!isEditMode" class="chat-folders__list-item-arrow">
                <ShapeIcon />
              </button>
            </nuxt-link>
          </li>
        </ul>
        <!-- Create button -->
        <nuxt-link
          :to="localePath('/chat-settings/folders/new')"
          class="chat-folders__create">
          <span class="chat-folders__create-btn">
            <CreateIcon />
          </span>
          <span class="chat-folders__create-label">{{
            $t("chat.folders.create")
          }}</span>
        </nuxt-link>
      </div>

      <!-- Hint -->
      <div v-if="!isEditMode" class="chat-folders__hint">
        {{ $t("chat.folders.hint") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "@/assets/svg/arrow-back.svg?component";
import CreateIcon from "@/assets/svg/plus.svg?component";
import ShapeIcon from "@/assets/svg/shape-icon.svg?component";

// Use localePath if needed
const localePath = useLocalePath();

// Use i18n for translations
const { t } = useI18n();

// Reactive state
const isEditMode = ref(false);

const folders = ref([
  { name: t("chat.folders.allChats"), deletable: true },
  { name: t("chat.folders.french"), deletable: true },
  { name: t("chat.folders.china"), deletable: true },
]);

// Methods
const deleteFolder = (index: number) => {
  const folder = folders.value[index];

  if (!folder.deletable) return;

  if (folder.name === t("chat.folders.allChats")) {
    folders.value = [];
    return;
  }

  folders.value.splice(index, 1);
};
</script>

<style lang="scss">
.chat-folders {
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
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      font-family: "Inter", sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-3);
    }
    &-btn {
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: #f64e2a;
      transition: 0.2s;
      &:hover {
        color: var(--oranzhevyy750);
      }
    }
  }
  &__intro {
    margin-bottom: 24px;
    &-image {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    &-description {
      max-width: 290px;
      margin: 0 auto;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
      color: #8780cf;
    }
  }
  &__body {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  &__create {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    background: #14131b;
    transition: 0.2s;
    &:hover {
      background: var(--secondary-7);
    }
    &-label {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #f64e2a;
    }
    &-btn {
      svg {
        rect {
          fill: var(--primary-2);
        }
      }
    }
  }
  &__list {
    &-item {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 16px;
      background: #14131b;
      position: relative;
      transition: 0.2s;
      &::after {
        content: "";
        width: calc(100% - 12px);
        height: 0;
        border-bottom: 1px solid #2b2741;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      &:hover {
        background: var(--secondary-7);
      }
      &-link {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      &-label {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
      &-delete {
        width: 16px;
        height: 16px;
        span {
          display: block;
          width: 16px;
          height: 3px;
          background: #f64e2a;
          border-radius: 3px;
        }
      }
    }
  }
  &__hint {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #8780cf;
  }
}
</style>
