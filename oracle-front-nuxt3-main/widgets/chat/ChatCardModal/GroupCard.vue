<template>
  <section class="group-card">
    <div class="group-card__bar">
      <button class="group-card__back" type="button" :aria-label="t('chat.card.back')" @click="store.closeModal()">
        <img src="/svg/figma-icons/arrow.svg" width="22" height="22" alt="" />
      </button>
      <button v-if="isAdmin" class="group-card__edit" type="button" @click="emit('edit')">
        {{ t("chat.edit") }}
      </button>
    </div>

    <img class="group-card__avatar" :src="room?.avatar" alt="" />
    <h2 class="group-card__name">{{ room?.roomName }}</h2>
    <p class="group-card__meta">{{ t("chat.card.membersCount", { count: members.length }) }}</p>

    <div class="group-card__actions" :class="{ 'is-quad': isAdmin }">
      <button class="group-card__action" type="button" @click="onMute">
        <img src="/svg/figma-icons/notification-silent-outline.svg" width="24" height="24" alt="" />
        <span>{{ extra?.muted ? t("chat.card.unmute") : t("chat.card.mute") }}</span>
      </button>
      <button class="group-card__action" type="button" @click="onSearch">
        <img src="/svg/figma-icons/search.svg" width="24" height="24" alt="" />
        <span>{{ t("chat.card.search") }}</span>
      </button>
      <div v-if="isAdmin || isOwner" class="group-card__more">
        <button class="group-card__action" type="button" @click="menu = menu ? null : 'more'">
          <img src="/svg/figma-icons/more.svg" width="24" height="24" alt="" />
          <span>{{ t("chat.card.more") }}</span>
        </button>
        <div v-if="menu" class="group-card__menu" :class="{ 'is-next': menu === 'delete' }" role="menu">
          <div class="group-card__track">
            <div class="group-card__pane">
              <button type="button" @click="menu = 'delete'">
                <span>{{ t("chat.card.enableAutodelete") }}</span>
                <img src="/svg/figma-icons/timer.svg" width="16" height="16" alt="" />
              </button>
              <button class="is-danger" type="button" @click="onClear">
                <span>{{ t("chat.card.clearMessages") }}</span>
                <img src="/svg/figma-icons/clean.svg" width="16" height="16" alt="" />
              </button>
              <button v-if="isOwner" type="button" @click="confirm = 'leave'">
                <span>{{ isChannel ? t("chat.card.leaveChannel") : t("chat.card.leaveGroup") }}</span>
                <img src="/svg/figma-icons/leave-mini.svg" width="16" height="16" alt="" />
              </button>
              <button v-if="isOwner" class="is-danger" type="button" @click="confirm = 'delete'">
                <span>{{ isChannel ? t("chat.card.deleteChannel") : t("chat.card.deleteGroup") }}</span>
                <img src="/svg/figma-icons/trash.svg" width="16" height="16" alt="" />
              </button>
            </div>
            <div class="group-card__pane">
              <button class="is-back" type="button" @click="menu = 'more'">
                <img src="/svg/figma-icons/arrow.svg" width="14" height="14" alt="" />
                <span>{{ t("chat.card.back") }}</span>
              </button>
              <button
                v-for="option in deleteOptions"
                :key="option.id"
                type="button"
                :class="{ 'is-on': autoDelete === option.id }"
                @click="pickDelete(option.id)"
              >
                <span>{{ option.label }}</span>
              </button>
              <button class="is-danger" type="button" @click="pickDelete(null)">
                <span>{{ t("chat.card.turnOff") }}</span>
              </button>
              <p>{{ t("chat.card.autodeleteHint") }}</p>
            </div>
          </div>
        </div>
      </div>
      <button v-if="!isOwner" class="group-card__action is-leave" type="button" @click="confirm = 'leave'">
        <img src="/svg/figma-icons/leave.svg" width="24" height="24" alt="" />
        <span>{{ t("chat.card.leave") }}</span>
      </button>
    </div>

    <button v-if="menu" class="group-card__scrim" type="button" :aria-label="t('chat.cancel')" @click="menu = null" />

    <div class="group-card__tabs">
      <Tabs
        :tabs="libraryTabs"
        :active="library"
        size="sm"
        color="transparent"
        active-color="#F64E2A"
        inner-color="#8780cf"
        active-inner-color="#F64E2A"
        @select="onTab"
      />
    </div>

    <div v-if="library === 'members'" class="group-card__members">
      <article v-for="member in members" :key="member._id">
        <img :src="member.avatar" alt="" />
        <span>
          <strong>{{ member.username }}</strong>
          <small>{{ memberStatus(member) }}</small>
        </span>
        <em>{{ memberRole(member._id) }}</em>
      </article>
    </div>
    <div v-else-if="library === 'media'" class="group-card__grid">
      <button v-for="item in media.media" :key="item.id" type="button" @click="openLibrary('media')">
        <img :src="item.preview || item.url" alt="" />
      </button>
      <p v-if="!media.media.length">{{ t("chat.card.emptyMedia") }}</p>
    </div>
    <div v-else-if="library === 'files'" class="group-card__files">
      <button v-for="item in media.files" :key="item.id" type="button" @click="openLibrary('files')">
        <img src="/svg/figma-icons/files.svg" width="30" height="30" alt="" />
        <span>
          <strong>{{ item.name }}</strong>
          <small>{{ formatFileSize(item.size) }}<template v-if="item.date"> · {{ item.date }}</template></small>
        </span>
      </button>
      <p v-if="!media.files.length">{{ t("chat.card.emptyFiles") }}</p>
    </div>
    <div v-else-if="library === 'voice'" class="group-card__files">
      <button v-for="item in media.voice" :key="item.id" type="button" @click="openLibrary('voice')">
        <img src="/svg/figma-icons/play.svg" width="30" height="30" alt="" />
        <span>
          <strong>{{ item.name || t("chat.card.voice") }}</strong>
          <small v-if="item.duration">{{ item.duration }}s</small>
        </span>
      </button>
      <p v-if="!media.voice.length">{{ t("chat.card.emptyVoice") }}</p>
    </div>
    <p v-else class="group-card__empty">{{ t("chat.card.emptyLinks") }}</p>

    <div v-if="confirm" class="group-card__confirm">
      <div class="group-card__dialog" role="dialog">
        <h3>{{ confirm === "delete" ? t("chat.card.deleteEveryone") : leaveTitle }}</h3>
        <p>
          {{
            confirm === "delete"
              ? t(isChannel ? "chat.card.deleteChannelConfirm" : "chat.card.deleteGroupConfirm", { name: room?.roomName || "" })
              : t(isChannel ? "chat.card.leaveChannelConfirm" : "chat.card.leaveGroupConfirm", { name: room?.roomName || "" })
          }}
        </p>
        <button class="is-primary" type="button" @click="confirm = null">{{ t("chat.cancel") }}</button>
        <button type="button" @click="confirmAction">
          {{ confirm === "delete" ? (isChannel ? t("chat.card.deleteChannel") : t("chat.card.deleteGroup")) : t("chat.card.leave") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChatKind, ChatModalName, ChatRole } from "~/entities/chat/model";
import Tabs from "~/components/ui/Tabs.vue";
import type { TabItem } from "~/components/ui/Tabs.vue";
import { collectRoomMedia, formatFileSize, type RoomMediaTab } from "~/entities/chat/lib/room-media";
import { useChatUiStore } from "~/store/chat";
import type { VacRoomUser } from "~/entities/chat/model";

type MenuName = "more" | "delete";
type DeleteSpan = "day" | "week" | "month";
type LibraryTab = "members" | "media" | "files" | "voice" | "links";
type ConfirmName = "leave" | "delete";

const props = defineProps<{ roomId: string }>();
const emit = defineEmits<{ edit: [] }>();

const { t } = useI18n();
const store = useChatUiStore();

const menu = ref<MenuName | null>(null);
const confirm = ref<ConfirmName | null>(null);
const library = ref<LibraryTab>("members");
const autoDelete = ref<DeleteSpan | null>(null);

const room = computed(() => store.rooms.find((item) => item.roomId === props.roomId) ?? null);
const extra = computed(() => (room.value ? store.extras[room.value.roomId] : null));
const members = computed(() => room.value?.users ?? []);
const isOwner = computed(() => extra.value?.role === ChatRole.Owner);
const isAdmin = computed(() => extra.value?.role === ChatRole.Admin);
const isChannel = computed(() => extra.value?.kind === ChatKind.Channel);
const leaveTitle = computed(() => (isChannel.value ? t("chat.card.leaveChannel") : t("chat.card.leaveGroup")));

const media = computed(() => collectRoomMedia(store.messagesByRoom[room.value?.roomId || ""] ?? []));

const deleteOptions = computed(() => [
  { id: "day" as const, label: t("chat.card.day") },
  { id: "week" as const, label: t("chat.card.week") },
  { id: "month" as const, label: t("chat.card.month") },
]);

const libraryTabs = computed(() => [
  { value: "members", title: t("chat.card.members") },
  { value: "media", title: t("chat.card.media") },
  { value: "files", title: t("chat.card.files") },
  { value: "voice", title: t("chat.card.voice") },
  { value: "links", title: t("chat.card.links") },
]);

const memberStatus = (member: VacRoomUser): string => {
  if (member.status?.state === "online") {
    return t("chat.card.online");
  }
  return member.status?.lastChanged ? `${t("chat.vac.lastSeen")}${member.status.lastChanged}` : "";
};

const memberRole = (userId: string): string => {
  if (userId !== store.currentUserId) {
    return t("chat.card.roleMember");
  }
  if (extra.value?.role === ChatRole.Owner) {
    return t("chat.card.roleOwner");
  }
  if (extra.value?.role === ChatRole.Admin) {
    return t("chat.card.roleAdmin");
  }
  return t("chat.card.roleMember");
};

const onMute = (): void => {
  if (room.value) {
    store.toggleMuted(room.value.roomId);
  }
};

const onClear = (): void => {
  if (room.value) {
    store.clearHistory(room.value.roomId);
  }
  menu.value = null;
};

const pickDelete = (span: DeleteSpan | null): void => {
  autoDelete.value = span;
  if (room.value) {
    store.setAutoDelete(room.value.roomId, Boolean(span));
  }
  menu.value = null;
};

const onSearch = (): void => {
  menu.value = null;
  store.closeModal();
  nextTick(() => {
    const root = document.querySelector("vue-advanced-chat")?.shadowRoot;
    const input = root?.querySelector(".vac-input") as HTMLInputElement | null;
    input?.focus();
  });
};

const onTab = (tab: TabItem | Array<string | TabItem>): void => {
  if (!Array.isArray(tab)) {
    library.value = tab.value as LibraryTab;
  }
};

const openLibrary = (tab: RoomMediaTab): void => {
  if (!room.value) {
    return;
  }
  store.openModal(ChatModalName.MediaList, { roomId: room.value.roomId, tab });
};

const confirmAction = (): void => {
  if (confirm.value === "delete" && room.value) {
    store.clearHistory(room.value.roomId);
  }
  confirm.value = null;
  menu.value = null;
  store.closeModal();
};
</script>

<style lang="scss" scoped src="./GroupCard.scss"></style>
