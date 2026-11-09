<template>
  <div class="thread-header-swap">
    <Transition name="thread-mode">
      <header v-if="selection" key="select" class="thread-header is-select">
        <button class="thread-header__cancel" type="button" @click="store.clearMessageSelection()">
          {{ t("chat.cancel") }}
        </button>
        <span class="thread-header__count">{{ t("chat.menu.selectedCount", { count: selectionCount }) }}</span>
        <button
          class="thread-header__delete"
          type="button"
          :disabled="!selection.ids.length"
          :aria-label="t('chat.menu.delete')"
          @click="openDelete"
        >
          <img src="/svg/figma-icons/trash-solid-16.svg" width="16" height="16" alt="" />
        </button>
      </header>
      <header v-else key="room" class="thread-header">
    <div class="thread-header__side">
      <button
        class="thread-header__back"
        type="button"
        :aria-label="t('chat.card.back')"
        @click="emit('back')"
      >
        <img src="/svg/figma-icons/arrow.svg" width="22" height="22" alt="" />
      </button>
      <span v-if="unread > 0" class="thread-header__badge">{{ unread }}</span>
    </div>

    <button class="thread-header__center" type="button" @click="openCard">
      <span class="thread-header__name">{{ roomTitle }}</span>
      <span v-if="status" class="thread-header__status">{{ status }}</span>
    </button>

    <div class="thread-header__side is-end">
      <button
        class="thread-header__avatar"
        type="button"
        :style="avatarStyle"
        :aria-label="roomTitle"
        @click="openCard"
      />
    </div>
      </header>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { localizedRoomName } from "~/entities/chat/lib/room-label";
import { ChatKind, ChatModalName } from "~/entities/chat/model";
import { selectedUnitCount } from "~/entities/chat/lib/photo-selection";
import { groupStatusLine, peerOf } from "~/entities/chat/lib/room-status";
import { useChatUiStore } from "~/store/chat";

const emit = defineEmits<{ back: [] }>();

const { t } = useI18n();
const store = useChatUiStore();

const room = computed(() => store.findRoom(store.activeRoomId));
const roomTitle = computed(() => (room.value ? localizedRoomName(room.value.roomId, room.value.roomName, (key) => t(key)) : ""));

const extra = computed(() => (room.value ? store.extras[room.value.roomId] : null));

const unread = computed(() =>
  store.rooms.reduce((sum, item) => {
    if (item.roomId === store.activeRoomId) {
      return sum;
    }
    return sum + (item.unreadCount ?? 0);
  }, 0),
);

const status = computed(() => {
  const current = room.value;
  const meta = extra.value;
  if (!current || !meta) {
    return "";
  }
  const line = groupStatusLine(t, current, meta);
  if (line !== null) {
    return line;
  }
  const peer = peerOf(current, store.currentUserId);
  if (peer?.status?.state === "online") {
    return t("chat.card.online");
  }
  return peer?.status?.lastChanged ? `${t("chat.vac.lastSeen")}${peer.status.lastChanged}` : "";
});

const avatarStyle = computed(() =>
  room.value?.avatar ? { backgroundImage: `url("${room.value.avatar}")` } : {},
);

const openCard = (): void => {
  if (!room.value) {
    return;
  }
  store.openModal(ChatModalName.ChatCard, { roomId: room.value.roomId });
};

const selection = computed(() => {
  const current = store.messageSelection;
  if (!current || current.roomId !== store.activeRoomId) {
    return null;
  }
  return current;
});

const selectionCount = computed(() =>
  selection.value ? selectedUnitCount(selection.value.ids, store.activeMessages) : 0,
);

const openDelete = (): void => {
  if (!selection.value?.ids.length) {
    return;
  }
  store.openModal(ChatModalName.DeleteMessages, {
    roomId: selection.value.roomId,
    messageIds: [...selection.value.ids],
  });
};
</script>

<style lang="scss" scoped>
.thread-header-swap {
  position: relative;
  height: 54px;
  overflow: hidden;
}

.thread-header {
  display: flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  width: 100%;
  height: 54px;
  padding: 8px;
  background: var(--primary-1);
  border-bottom: 0.4px solid #2b2741;
  color: var(--primary-3);
  font-family: Roboto, Inter, sans-serif;
}

.thread-mode-enter-active,
.thread-mode-leave-active {
  transition:
    opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.thread-mode-enter-from,
.thread-mode-leave-to {
  opacity: 0;
}

.thread-mode-enter-from {
  transform: translateY(8px);
}

.thread-mode-leave-to {
  transform: translateY(-8px);
}

.thread-mode-leave-active {
  position: absolute;
  inset: 0;
}

.thread-header__side {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.thread-header__side.is-end {
  justify-content: flex-end;
}

.thread-header__back,
.thread-header__avatar,
.thread-header__center {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}

.thread-header__back {
  display: flex;
  flex: 0 0 22px;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;

  img {
    display: block;
    transform: rotate(180deg);
  }
}

.thread-header__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 3px 4px;
  border-radius: 22px;
  background: var(--primary-2);
  color: var(--primary-3);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
}

.thread-header__center {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.thread-header__name,
.thread-header__status {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.3;
}

.thread-header__name {
  font-weight: 600;
}

.thread-header__status {
  color: var(--primary-2);
  font-weight: 400;
}

.thread-header__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--secondary-7);
  background-position: center;
  background-size: cover;
}

.thread-header.is-select {
  justify-content: space-between;
}

.thread-header__cancel,
.thread-header__delete {
  padding: 0;
  border: 0;
  background: none;
  color: var(--primary-3);
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
  cursor: pointer;
}

.thread-header__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.thread-header__delete:disabled {
  opacity: 0.4;
  cursor: default;
}

.thread-header__count {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
}
</style>
