<template>
  <div class="notification-settings pt-12">
    <div class="main-container">
      <div class="notification-settings__header">
        <nuxt-link :to="localePath(ChatRoute.Settings)" class="notification-settings__back">
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </nuxt-link>
        <h1>{{ $t("chat.notifications.screenTitle") }}</h1>
      </div>

      <section>
        <h2>{{ $t("chat.notifications.messages") }}</h2>
        <button
          v-for="item in categories"
          :key="item.kind"
          type="button"
          class="notification-settings__chat"
          @click="openCategory(item.kind)"
        >
          <img :src="item.icon" width="24" height="24" alt="" />
          <span class="notification-settings__copy">
            <small>{{ item.title }}</small>
            <strong>{{
              $t("chat.notifications.exceptionsCount", { count: item.count })
            }}</strong>
          </span>
          <em>{{ item.enabled ? $t("chat.notifications.on") : $t("chat.notifications.off") }}</em>
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </button>
      </section>

      <section>
        <h2>{{ $t("chat.notifications.inApp") }}</h2>
        <label v-for="toggle in toggles" :key="toggle.key">
          <span>{{ toggle.label }}</span>
          <input
            type="checkbox"
            :checked="store.notificationSettings[toggle.key]"
            @change="onToggle(toggle.key, $event)"
          />
          <i />
        </label>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatRoute } from "~/entities/chat/config";
import { useChatNav } from "~/features/chat/chat-nav";
import {
  IN_APP_TOGGLE_KEYS,
  NOTIFICATION_ICON,
  NOTIFICATION_KINDS,
  NOTIFICATION_TITLE_KEY,
  notificationPath,
} from "~/features/chat/notification-options";
import { useChatUiStore } from "~/store/chat";
import type { InAppNotificationKey, NotificationKind } from "~/entities/chat/model";

const localePath = useLocalePath();
const { go } = useChatNav();
const { t } = useI18n();
const store = useChatUiStore();

const categories = computed(() =>
  NOTIFICATION_KINDS.map((kind) => ({
    kind,
    icon: NOTIFICATION_ICON[kind],
    title: t(NOTIFICATION_TITLE_KEY[kind]),
    count: store.notificationSettings[kind].exceptions.length,
    enabled: store.notificationSettings[kind].enabled,
  })),
);

const toggles = computed(() =>
  (Object.keys(IN_APP_TOGGLE_KEYS) as InAppNotificationKey[]).map((key) => ({
    key,
    label: t(IN_APP_TOGGLE_KEYS[key]),
  })),
);

const openCategory = (kind: NotificationKind): void => {
  void go(notificationPath(kind));
};

const onToggle = (key: InAppNotificationKey, event: Event): void => {
  store.setInAppNotification(key, (event.target as HTMLInputElement).checked);
};
</script>

<style lang="scss">
.notification-settings {
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
      width: calc(100% - 80px);
      transform: translate(-50%, -50%);
      margin: 0;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.4;
      text-align: center;
    }
  }

  &__back {
    display: flex;
    transform: rotate(180deg);
  }

  section {
    margin-bottom: 24px;
  }

  h2 {
    margin: 0 0 8px;
    padding: 0 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.4;
  }

  &__chat,
  label {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 44px;
    border: 0;
    background: transparent;
    color: #fff;
    text-align: left;
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: calc(100% - 52px);
      border-bottom: 1px solid #2b2741;
    }
  }

  section label:last-child::after,
  section button:last-child::after {
    display: none;
  }

  &__chat {
    gap: 12px;
    min-height: 50px;
    padding: 0 4px 0 16px;
  }

  &__copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;

    small {
      font-family: "Roboto", sans-serif;
      font-size: 12px;
      line-height: 1.35;
      color: #bfb7ff;
    }

    strong {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.3;
    }
  }

  em {
    font-style: normal;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    line-height: 1.35;
    color: #8780cf;
  }

  label {
    justify-content: space-between;
    padding: 0 8px 0 16px;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;

    input {
      position: absolute;
      opacity: 0;
    }

    i {
      width: 51px;
      height: 31px;
      border-radius: 100px;
      background: rgba(120, 120, 128, 0.16);
      position: relative;
      flex: 0 0 auto;

      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
        transition: transform 0.2s ease;
      }
    }

    input:checked + i {
      background: var(--primary-2);

      &::after {
        transform: translateX(20px);
      }
    }
  }
}
</style>
