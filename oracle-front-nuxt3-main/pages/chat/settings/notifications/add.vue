<template>
  <div class="notice-add">
    <div class="main-container">
      <div class="notice-add__header">
        <button type="button" @click="close">{{ $t("chat.cancel") }}</button>
        <h1>{{ $t("chat.notifications.addException") }}</h1>
      </div>
      <label class="notice-add__search">
        <img src="/svg/figma-icons/search.svg" width="24" height="24" alt="" />
        <input v-model="query" type="text" :placeholder="$t('chat.folders.search')" />
      </label>
      <ul v-if="rooms.length">
        <li v-for="room in rooms" :key="room.roomId">
          <button type="button" @click="toggle(room.roomId)">
            <img class="is-avatar" :src="room.avatar || DEFAULT_AVATAR" alt="" />
            <span>{{ room.roomName }}</span>
            <i :class="{ 'is-on': selected.includes(room.roomId) }" />
          </button>
        </li>
      </ul>
    </div>
    <div class="notice-add__bar">
      <button type="button" :class="{ 'is-ready': selected.length }" :disabled="!selected.length" @click="save">
        {{ $t("chat.done") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isServiceRoom } from "~/entities/chat/lib/important-rooms";
import { toNotificationException } from "~/entities/chat/lib/notification-exception";
import { DEFAULT_AVATAR, NOTIFICATION_ROOM_KIND, NotificationKind } from "~/entities/chat/model";
import { useChatNav } from "~/features/chat/chat-nav";
import { isNotificationKind, notificationPath } from "~/features/chat/notification-options";
import { useChatUiStore } from "~/store/chat";
import type { VacRoom } from "~/entities/chat/model";

const { go } = useChatNav();
const route = useRoute();
const store = useChatUiStore();
const query = ref("");
const selected = ref<string[]>([]);

const kind = computed((): NotificationKind =>
  isNotificationKind(route.query.kind) ? route.query.kind : NotificationKind.Groups,
);
const roomKind = computed(() => NOTIFICATION_ROOM_KIND[kind.value]);

const rooms = computed(() => {
  const taken = new Set(store.notificationSettings[kind.value].exceptions.map((item) => item.id));
  const needle = query.value.trim().toLowerCase();
  return store.rooms.filter((room) => {
    const extra = store.extras[room.roomId];
    if (extra?.kind !== roomKind.value || taken.has(room.roomId) || isServiceRoom(room.roomId)) return false;
    return !needle || room.roomName.toLowerCase().includes(needle);
  });
});

const toggle = (id: string): void => {
  selected.value = selected.value.includes(id)
    ? selected.value.filter((item) => item !== id)
    : [...selected.value, id];
};

const close = (): void => {
  void go(notificationPath(kind.value));
};

const save = (): void => {
  const items = selected.value
    .flatMap((id): VacRoom[] => store.findRoom(id) ?? [])
    .map((room) => toNotificationException(room, store.extras[room.roomId]));
  store.addNotificationExceptions(kind.value, items);
  close();
};
</script>

<style lang="scss">
.notice-add {
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
    margin-bottom: 16px;
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
      outline: none;
    }
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

  li button {
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

    span {
      flex: 1;
    }
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

    &.is-on {
      border-color: var(--primary-2);
      background: var(--primary-2);
      position: relative;

      &::after {
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
