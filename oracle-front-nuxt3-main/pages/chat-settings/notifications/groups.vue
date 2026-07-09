<template>
  <div class="group-chats">
    <div class="main-container">
      <!-- Header -->
      <div class="group-chats__header">
        <nuxt-link
          :to="localePath('/chat-settings/notifications')"
          class="group-chats__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="group-chats__header-title">
          {{ $t("chat.notifications.groupChats") }}
        </h1>
        <button
          v-if="!isEditMode"
          class="group-chats__header-btn group-chats__header-btn--edit"
          @click="isEditMode = true">
          {{ $t("chat.edit") }}
        </button>
        <button
          v-else
          class="group-chats__header-btn group-chats__header-btn--done"
          @click="isEditMode = false">
          {{ $t("chat.done") }}
        </button>
      </div>
      <!-- Show Notifications -->
      <div class="group-chats__toggle-row show-notifications">
        <span class="group-chats__toggle-label">{{
          $t("chat.notifications.showNotifications")
        }}</span>
        <label for="show-notifications" class="group-chats__toggle">
          <input
            id="show-notifications"
            type="checkbox"
            class="group-chats__toggle-input" />
          <span class="group-chats__toggle-slider"></span>
        </label>
      </div>
      <!-- Options -->
      <div class="group-chats__options">
        <h3 class="group-chats__section-title">
          {{ $t("chat.notifications.options") }}
        </h3>
        <div class="group-chats__toggle-row">
          <span class="group-chats__toggle-label">{{
            $t("chat.notifications.preview")
          }}</span>
          <label for="message-preview" class="group-chats__toggle">
            <input
              id="message-preview"
              type="checkbox"
              class="group-chats__toggle-input" />
            <span class="group-chats__toggle-slider"></span>
          </label>
        </div>
        <div class="group-chats__select-row">
          <nuxt-link to="#" class="group-chats__select-row--link">
            <span class="group-chats__select-label">{{
              $t("chat.notifications.sound")
            }}</span>
            <div class="group-chats__select-value">
              Note
              <span class="group-chats__select-arrow"></span>
            </div>
          </nuxt-link>
        </div>
      </div>

      <!-- exeptions Body -->
      <h3 class="group-chats__section-title">
        {{ $t("chat.notifications.exceptions") }}
      </h3>
      <div class="group-chats__exeptions">
        <!-- Add Exception -->
        <nuxt-link
          v-if="!isEditMode"
          :to="localePath('/chat-settings/folders/new/exclude')"
          class="group-chats__exeptions-add">
          <CreateIcon class="group-chats__exeptions-add-icon" />
          <span class="group-chats__exeptions-add-label">{{
            $t("chat.notifications.addException")
          }}</span>
        </nuxt-link>

        <!-- Exception List -->
        <ul class="group-chats__exeptions-list">
          <li
            v-for="(exception, index) in exeptions"
            :key="index"
            class="group-chats__exeptions-item">
            <!-- Avatar + Name -->
            <div class="group-chats__exeptions-user">
              <img
                :src="'/svg/avatar.svg'"
                :alt="exception.name"
                class="group-chats__exeptions-avatar" />
              <div style="width: 100%">
                <span class="group-chats__exeptions-name">{{
                  exception.name
                }}</span>
                <span v-if="!isEditMode" class="group-chats__exeptions-label">{{
                  exception.label
                }}</span>
              </div>
            </div>
            <button v-if="!isEditMode" class="group-chats__owner-btn">
              {{ $t("chat.notifications.owner") }}
            </button>
            <!-- Remove button -->
            <button
              v-if="isEditMode"
              class="group-chats__exeptions-remove"
              @click="deleteExeption(index)">
              <MinusCircleIcon />
            </button>
          </li>
        </ul>

        <!-- Delete All -->
        <button
          v-if="!isEditMode"
          class="group-chats__exeptions-clear"
          @click="clearAllExceptions">
          <TrashIcon class="group-chats__exeptions-clear-icon" />
          <span class="group-chats__exeptions-clear-label">{{
            $t("chat.notifications.deleteAllExceptions")
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "@/assets/svg/arrow-back.svg?component";
import TrashIcon from "@/assets/svg/delete-icon.svg?component";
import MinusCircleIcon from "@/assets/svg/delete-img.svg?component";
import CreateIcon from "@/assets/svg/plus.svg?component";

// Use localePath if needed
const localePath = useLocalePath();

// Reactive state
const isEditMode = ref(false);

const exeptions = ref([
  { name: "Julia Work", label: "Last seen recently", deletable: true },
  { name: "Julia Work", label: "Last seen recently", deletable: true },
  { name: "Julia Work", label: "Last seen recently", deletable: true },
]);

// Methods
const deleteExeption = (index: number) => {
  if (!exeptions.value[index].deletable) return;
  exeptions.value.splice(index, 1);
};

const clearAllExceptions = () => {
  exeptions.value = [];
};
</script>

<style lang="scss">
.group-chats {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    gap: 4px;
    margin-bottom: 24px;
    position: relative;
    &-back {
      width: 18px;
      height: 18px;
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
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      text-align: center;
      color: #fff;
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
  &__section-title {
    padding: 0 0 8px 4px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #fff;
  }
  .show-notifications {
    margin-bottom: 24px;
  }
  &__options {
    margin-bottom: 24px;
    .group-chats__toggle-row {
      margin-bottom: 4px;
    }
  }
  &__toggle-row,
  &__select-row--link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 44px;
    position: relative;
    cursor: pointer;
    &::after {
      content: "";
      width: calc(100% + 12px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: -12px;
    }
  }
  &__toggle-label,
  &__select-label {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__toggle {
    &-input {
      display: none;
    }
    &-slider {
      display: block;
      width: 51px;
      height: 31px;
      background: rgba(120, 120, 128, 0.16);
      border-radius: 100px;
      cursor: pointer;
      transition: 0.2s;
      &::after {
        content: "";
        display: inline-block;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.06),
          0 3px 8px 0 rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.04);
        background: #fff;
        margin-left: 2px;
        margin-top: 2px;
        line-height: 0;
        transition: 0.2s;
      }
    }
    &-input:checked + .group-chats__toggle-slider {
      background: #f64e2a;
    }
    &-input:checked ~ .group-chats__toggle-slider::after {
      margin-left: 22px;
    }
  }
  &__select-value {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #8780cf;
  }
  &__select-arrow {
    width: 7px;
    height: 13px;
    background: url("/svg/shape-icon.svg") no-repeat center/contain;
  }
  &__exeptions {
    background: #14131b;
    border-radius: 12px;
    overflow: hidden;
  }
  &__exeptions-add {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    position: relative;
    padding: 0 18px;
    cursor: pointer;
    transition: 0.2s;
    &::after {
      content: "";
      width: calc(100% - 12px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    &:hover {
      background: #2b2741;
    }
    &-label {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #f64e2a;
    }
    &-icon {
      rect {
        fill: var(--primary-2);
      }
    }
  }
  &__exeptions-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: relative;
    padding: 3px 16px;
    cursor: pointer;
    transition: 0.2s;
    &::after {
      content: "";
      width: calc(100% - 12px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    &:hover {
      background: #2b2741;
    }
  }
  &__exeptions-user {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__exeptions-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
  }
  &__exeptions-name {
    display: block;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: var(--primary-3);
  }
  &__exeptions-label {
    margin-top: 4px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #8780cf;
  }
  &__exeptions-clear {
    width: 100%;
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 18px;
  }
  &__exeptions-clear-label {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #f64e2a;
  }
  &__owner-btn {
    border: 0;
    background: transparent;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    text-align: right;
    color: #8780cf;
    transition: 0.2s;
    &:hover {
      color: #f64e2a;
    }
  }
  &__exeptions-remove {
    cursor: pointer;
  }
}
</style>
