<template>
  <div class="notice-category pt-12">
    <div class="main-container">
      <div class="notice-category__header">
        <nuxt-link :to="localePath(ChatRoute.Notifications)" class="notice-category__back">
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </nuxt-link>
        <h1>{{ title }}</h1>
        <button type="button" @click="editing = !editing">
          {{ editing ? $t("chat.done") : $t("chat.edit") }}
        </button>
      </div>

      <label class="notice-category__switch">
        <span>{{ $t("chat.notifications.showNotifications") }}</span>
        <input v-model="enabled" type="checkbox" />
        <i />
      </label>

      <section>
        <h2>{{ $t("chat.notifications.options") }}</h2>
        <label class="notice-category__switch">
          <span>{{ $t("chat.notifications.preview") }}</span>
          <input v-model="preview" type="checkbox" />
          <i />
        </label>
        <div ref="soundRoot" class="notice-category__picker">
          <button
            class="notice-category__sound"
            type="button"
            :aria-expanded="soundOpen"
            aria-haspopup="menu"
            @click="soundOpen = !soundOpen"
          >
            <span>{{ $t("chat.notifications.sound") }}</span>
            <em>{{ soundLabel }}</em>
            <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
          </button>
          <div v-if="soundOpen" class="notice-category__menu" role="menu">
            <button
              v-for="sound in NOTIFICATION_SOUND_ORDER"
              :key="sound"
              type="button"
              role="menuitemradio"
              :aria-checked="category.sound === sound"
              :class="{ 'is-active': category.sound === sound }"
              @click="chooseSound(sound)"
            >
              <span>{{ t(NOTIFICATION_SOUND_KEY[sound]) }}</span>
              <i><CheckIcon /></i>
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2>{{ $t("chat.notifications.exceptions") }}</h2>
        <div class="notice-category__card">
          <button v-if="!editing" class="notice-category__add" type="button" @click="openAdd">
            <span class="notice-category__plus" />
            {{ $t("chat.notifications.addException") }}
          </button>
          <div v-for="item in category.exceptions" :key="item.id" class="notice-category__row">
            <img class="is-avatar" :src="item.avatar" alt="" />
            <span>
              <strong>{{ item.name }}</strong>
              <small v-if="!editing">{{ $t("chat.notifications.lastSeen") }}</small>
            </span>
            <em v-if="!editing && item.owner">{{ $t("chat.notifications.owner") }}</em>
            <button v-if="editing" type="button" class="notice-category__minus" @click="store.removeNotificationException(kind, item.id)">
              <span />
            </button>
          </div>
          <button
            v-if="!editing && category.exceptions.length"
            class="notice-category__clear"
            type="button"
            @click="store.clearNotificationExceptions(kind)"
          >
            <img src="/svg/figma-icons/trash.svg" width="24" height="24" alt="" />
            {{ $t("chat.notifications.deleteAllExceptions") }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useEventListener } from "@vueuse/core";
import CheckIcon from "@/assets/svg/check-icon.svg?component";
import { ChatRoute } from "~/entities/chat/config";
import { NOTIFICATION_SOUND_ORDER, NotificationSound } from "~/entities/chat/model";
import { useChatNav } from "~/features/chat/chat-nav";
import { NOTIFICATION_SOUND_KEY, NOTIFICATION_TITLE_KEY } from "~/features/chat/notification-options";
import { useChatUiStore } from "~/store/chat";
import type { NotificationKind } from "~/entities/chat/model";

const props = defineProps<{ kind: NotificationKind }>();

const localePath = useLocalePath();
const { go } = useChatNav();
const { t } = useI18n();
const store = useChatUiStore();
const editing = ref(false);
const soundOpen = ref(false);
const soundRoot = ref<HTMLElement | null>(null);

const category = computed(() => store.notificationSettings[props.kind]);
const title = computed(() => t(NOTIFICATION_TITLE_KEY[props.kind]));
const soundLabel = computed(() => t(NOTIFICATION_SOUND_KEY[category.value.sound]));

const enabled = computed({
  get: () => category.value.enabled,
  set: (value: boolean) => store.updateNotificationCategory(props.kind, { enabled: value }),
});
const preview = computed({
  get: () => category.value.preview,
  set: (value: boolean) => store.updateNotificationCategory(props.kind, { preview: value }),
});

const openAdd = (): void => {
  void go(ChatRoute.NotificationsAdd, { kind: props.kind });
};

const chooseSound = (sound: NotificationSound): void => {
  store.updateNotificationCategory(props.kind, { sound });
  soundOpen.value = false;
};

onClickOutside(soundRoot, () => {
  soundOpen.value = false;
});

useEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Escape" && soundOpen.value) {
    soundOpen.value = false;
    event.preventDefault();
  }
});
</script>

<style lang="scss">
.notice-category {
  color: #fff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    margin-bottom: 16px;
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

  h2 {
    margin: 16px 0 8px;
    padding: 0 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.4;
  }

  &__switch,
  &__sound,
  &__add,
  &__clear,
  &__row {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 44px;
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

  &__switch {
    justify-content: space-between;
    padding: 0 8px 0 16px;
    cursor: pointer;

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

  &__picker {
    position: relative;
  }

  &__sound {
    gap: 8px;
    padding: 0 4px 0 16px;
    cursor: pointer;
    outline: none;

    span {
      flex: 1;
    }

    em {
      font-style: normal;
      color: #8780cf;
      font-size: 12px;
    }
  }

  &__menu {
    position: absolute;
    top: calc(100% + 4px);
    right: 8px;
    z-index: 2;
    width: min(240px, calc(100% - 16px));
    padding: 4px 0;
    border-radius: 12px;
    background: #1b1a24;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      cursor: pointer;
      outline: none;
    }

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: 1px solid #60578e;
      border-radius: 50%;

      svg {
        opacity: 0;
      }
    }

    .is-active i {
      background: var(--primary-2);
      border-color: var(--primary-2);

      svg {
        opacity: 1;
      }
    }
  }

  &__card {
    background: #14131b;
    border-radius: 12px;
    overflow: hidden;
  }

  &__add,
  &__clear {
    gap: 8px;
    padding: 0 16px;
    color: var(--primary-2);
    cursor: pointer;
  }

  &__clear img {
    filter: brightness(0) saturate(100%) invert(40%) sepia(79%) saturate(2476%) hue-rotate(349deg);
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

  &__row {
    gap: 8px;
    padding: 6px 12px 6px 16px;

    span {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
    }

    strong {
      font-weight: 400;
    }

    small,
    em {
      font-style: normal;
      font-size: 12px;
      line-height: 1.35;
      color: #8780cf;
    }
  }

  .is-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__minus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 0;
    background: transparent;
    cursor: pointer;

    span {
      width: 12px;
      height: 2px;
      border-radius: 2px;
      background: var(--primary-2);
    }
  }

  &__card > :last-child::after {
    display: none;
  }
}
</style>
