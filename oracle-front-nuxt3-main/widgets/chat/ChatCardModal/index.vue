<template>
  <div class="chat-card-portal" :class="{ 'is-person': (isPersonCard && view === 'card') || (isStageCard && (view === 'card' || view === 'edit')) }">
  <div v-if="personScreen" class="chat-card-screen">
    <DmCard :room-id="roomId" />
  </div>
  <div v-else-if="groupStage" class="chat-card-screen" :class="{ 'is-locked': groupCovered }">
    <GroupStage :room-id="roomId" @covered="groupCovered = $event" />
  </div>
  <component
    v-else-if="isOpen"
    :is="isMobile ? DraggableModal : SlotModal"
    :is-open="true"
    :close="onClose"
    @close="onClose"
  >
    <div class="chat-card">
      <MediaListModal
        v-if="view === 'media-list' && roomId"
        :room-id="roomId"
        :tab="mediaTab"
        @back="backToCard"
      />

      <MembersPanel
        v-else-if="view === 'members'"
        :room-id="roomId"
        :role="extra?.role || ChatRole.Member"
        @back="backToCard"
        @add="openAdd('members')"
      />

      <BansPanel v-else-if="view === 'bans'" :room-id="roomId" @back="backToCard" />

      <EditPanel
        v-else-if="view === 'edit' && !isStageCard"
        :room-id="roomId"
        :kind="extra?.kind || ChatKind.Group"
        :is-staff="isStaff"
        @cancel="backToCard"
        @save="backToCard"
        @invite="nested = 'invite'"
        @add="openAdd('edit')"
      />

      <InvitePanel v-else-if="view === 'invite'" @back="nested = 'edit'" />

      <AddMembersPanel
        v-else-if="view === 'add-members'"
        :room-id="roomId"
        @cancel="closeNested"
        @continue="closeNested"
      />

      <div v-else-if="view === 'stub'" class="chat-card__stub">
        <button class="chat-card__back" type="button" @click="backToCard">
          {{ t("chat.card.back") }}
        </button>
        <EmptyState
          :title="t('chat.card.comingSoonTitle')"
          :message="t('chat.card.comingSoon')"
          icon="○"
        />
      </div>

      <DmCard v-else-if="isPersonCard" :room-id="roomId" />

      <div
        v-else-if="isStageCard && (view === 'card' || view === 'edit')"
        class="chat-card-stage"
        :class="{ 'is-locked': groupCovered }"
      >
        <GroupStage :room-id="roomId" @covered="groupCovered = $event" />
      </div>

      <template v-else-if="room && extra">
        <div class="chat-card__hero">
          <CustomAvatar :avatar="room.avatar" :name="roomTitle" :size="72" :is-name-visible="false" />
          <div class="chat-card__name-row">
            <h2 class="chat-card__name">{{ roomTitle }}</h2>
            <span v-if="extra.premium" class="chat-card__chip">{{ t("chat.card.premium") }}</span>
            <span v-if="extra.paid" class="chat-card__chip">{{ t("chat.card.paid") }}</span>
            <span v-if="extra.autodelete" class="chat-card__chip">{{ t("chat.card.autodelete") }}</span>
          </div>
          <p class="chat-card__meta">{{ metaLine }}</p>
          <p class="chat-card__role">{{ roleLabel }}</p>
        </div>

        <div class="chat-card__actions">
          <button
            class="chat-card__action"
            type="button"
            :class="{ 'is-on': extra.muted }"
            @click="store.toggleMuted(roomId)"
          >
            <img :src="extra.muted ? '/svg/muted.svg' : '/icons/market/unmuted.svg'" alt="" />
            {{ extra.muted ? t("chat.card.unmute") : t("chat.card.mute") }}
          </button>
          <button class="chat-card__action" type="button" @click="onSearch">
            <img src="/svg/figma-icons/search.svg" alt="" />
            {{ t("chat.card.search") }}
          </button>
          <button
            class="chat-card__action"
            type="button"
            :class="{ 'is-on': moreOpen }"
            @click="moreOpen = !moreOpen"
          >
            <img :src="moreIcon" alt="" />
            {{ t("chat.card.more") }}
          </button>
        </div>

        <div class="chat-card__section">
          <AppFeatureLink
            v-for="row in visibleRows"
            :key="row.id"
            tag="button"
            :src="row.icon"
            :text="row.label"
            :val="row.value"
            :show-line="row.id !== visibleRows[visibleRows.length - 1]?.id"
            @click="onRow(row.id)"
          />
        </div>
      </template>
    </div>
  </component>
  </div>
</template>

<script setup lang="ts">
import { ChatRoute } from "~/entities/chat/config";
import { localizedRoomName } from "~/entities/chat/lib/room-label";
import { groupStatusLine, peerOf } from "~/entities/chat/lib/room-status";
import { useChatDesktop } from "~/entities/chat/lib/use-chat-desktop";
import { CARD_MODAL_NAMES, ChatKind, ChatModalName, ChatRole } from "~/entities/chat/model";
import { useChatNav } from "~/features/chat/chat-nav";
import { handleOf } from "~/features/chat/room-modals/session";
import moreIcon from "@/assets/svg/more-horizontal.svg?url";
import AppFeatureLink from "~/components/app-feature-link.vue";
import CustomAvatar from "~/components/custom-avatar.vue";
import DraggableModal from "~/components/draggable-modal.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import SlotModal from "~/components/ui/SlotModal.vue";
import MediaListModal from "~/features/chat/media-list-modal/index.vue";
import DmCard from "~/widgets/chat/ChatCardModal/DmCard.vue";
import GroupStage from "~/widgets/chat/ChatCardModal/GroupStage.vue";
import AddMembersPanel from "~/features/chat/room-modals/AddMembersPanel.vue";
import BansPanel from "~/features/chat/room-modals/BansPanel.vue";
import EditPanel from "~/features/chat/room-modals/EditPanel.vue";
import InvitePanel from "~/features/chat/room-modals/InvitePanel.vue";
import MembersPanel from "~/features/chat/room-modals/MembersPanel.vue";
import { collectRoomMedia, type RoomMediaTab } from "~/entities/chat/lib/room-media";
import { useChatUiStore } from "~/store/chat";

type NestedView = "edit" | "invite" | "add-members";
type CardView = "card" | "media-list" | "stub" | "members" | "bans" | NestedView;
type RowId =
  | "edit"
  | "media"
  | "files"
  | "voice"
  | "members"
  | "notifications"
  | "autodelete"
  | "language"
  | "bans"
  | "welcome"
  | "recent"
  | "history"
  | "finance"
  | "contact";

const STUB_MODALS: readonly ChatModalName[] = [
  ChatModalName.Welcome,
  ChatModalName.RecentActions,
  ChatModalName.ChatHistory,
];

const ROLE_LABEL_KEY: Record<ChatRole, string> = {
  [ChatRole.Owner]: "chat.card.roleOwner",
  [ChatRole.Admin]: "chat.card.roleAdmin",
  [ChatRole.Member]: "chat.card.roleMember",
  [ChatRole.Subscriber]: "chat.card.roleSubscriber",
};

const { t } = useI18n();
const store = useChatUiStore();
const moreOpen = ref(false);
const desktop = useChatDesktop();
const isMobile = computed(() => !desktop.value);
const { go } = useChatNav();
const nested = ref<NestedView | null>(null);
const groupCovered = ref(false);
const addOrigin = ref<"members" | "edit">("members");

const payload = computed(
  () =>
    (store.modal.payload as { roomId?: string; tab?: RoomMediaTab; stub?: string } | null) ?? {},
);
const roomId = computed(() => payload.value.roomId || store.activeRoomId || "");
const room = computed(() => store.findRoom(roomId.value));
const roomTitle = computed(() => (room.value ? localizedRoomName(room.value.roomId, room.value.roomName, (key) => t(key)) : ""));
const extra = computed(() => store.extras[roomId.value] ?? null);
const isPersonCard = computed(
  () =>
    extra.value?.kind === ChatKind.Dm &&
    (room.value?.users ?? []).some((user) => user._id !== store.currentUserId),
);
const isStageCard = computed(() => extra.value?.kind === ChatKind.Group || extra.value?.kind === ChatKind.Channel);

const view = computed((): CardView => {
  if (store.modal.name === ChatModalName.MediaList) {
    return "media-list";
  }
  if (nested.value) {
    return nested.value;
  }
  if (store.modal.name === ChatModalName.Members) {
    return "members";
  }
  if (store.modal.name === ChatModalName.BansMutes) {
    return "bans";
  }
  if (store.modal.name && STUB_MODALS.includes(store.modal.name)) {
    return "stub";
  }
  if (payload.value.stub) {
    return "stub";
  }
  return "card";
});

const isOpen = computed(() => Boolean(store.modal.name && CARD_MODAL_NAMES.includes(store.modal.name)));

const personScreen = computed(
  () => isMobile.value && isPersonCard.value && view.value === "card",
);
const groupStage = computed(
  () => isMobile.value && isStageCard.value && (view.value === "card" || view.value === "edit"),
);

const mediaTab = computed((): RoomMediaTab => payload.value.tab || "media");

const counts = computed(() => collectRoomMedia(store.messagesByRoom[roomId.value] ?? []));

const roleLabel = computed(() => t(ROLE_LABEL_KEY[extra.value?.role ?? ChatRole.Member]));

const metaLine = computed(() => {
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
  const handle = peer ? handleOf(peer.username) : "";
  return handle ? `@${handle}` : "";
});

const isStaff = computed(() => extra.value?.role === ChatRole.Owner || extra.value?.role === ChatRole.Admin);
const isGroupLike = computed(() => extra.value?.kind === ChatKind.Group || extra.value?.kind === ChatKind.Channel);

const allRows = computed(() => [
  {
    id: "edit" as const,
    icon: "/svg/edit-icon.svg",
    label: t("chat.edit"),
    value: "",
    show: isStaff.value && isGroupLike.value,
  },
  {
    id: "media" as const,
    icon: "/svg/shop/icons/image-rectangle.svg",
    label: t("chat.card.media"),
    value: String(counts.value.media.length || ""),
    show: true,
  },
  {
    id: "files" as const,
    icon: "/svg/document-text.svg",
    label: t("chat.card.files"),
    value: String(counts.value.files.length || ""),
    show: true,
  },
  {
    id: "voice" as const,
    icon: "/svg/chat/microphone.svg",
    label: t("chat.card.voice"),
    value: String(counts.value.voice.length || ""),
    show: true,
  },
  {
    id: "members" as const,
    icon: "/svg/profile-2user.svg",
    label: t("chat.card.members"),
    value: String(room.value?.users.length || ""),
    show: isGroupLike.value,
  },
  {
    id: "notifications" as const,
    icon: "/svg/bell.svg",
    label: t("chat.card.notifications"),
    value: extra.value?.muted ? t("chat.card.mute") : "",
    show: true,
  },
  {
    id: "autodelete" as const,
    icon: "/svg/clock-circle.svg",
    label: t("chat.card.autodelete"),
    value: "",
    show: Boolean(extra.value?.autodelete || isStaff.value),
  },
  {
    id: "bans" as const,
    icon: "/svg/muted.svg",
    label: t("chat.card.bans"),
    value: "",
    show: isStaff.value && isGroupLike.value,
  },
  {
    id: "welcome" as const,
    icon: "/svg/chat.svg",
    label: t("chat.card.welcome"),
    value: "",
    show: isStaff.value && extra.value?.kind === ChatKind.Group,
  },
  {
    id: "recent" as const,
    icon: "/svg/clock-circle-dash.svg",
    label: t("chat.card.recent"),
    value: "",
    show: isStaff.value && isGroupLike.value,
  },
  {
    id: "history" as const,
    icon: "/svg/document.svg",
    label: t("chat.card.history"),
    value: "",
    show: isStaff.value,
  },
  {
    id: "language" as const,
    icon: "/svg/translate.svg",
    label: t("chat.card.language"),
    value: "",
    show: moreOpen.value,
  },
  {
    id: "finance" as const,
    icon: "/svg/wallet.svg",
    label: t("chat.card.finance"),
    value: "",
    show: moreOpen.value,
  },
  {
    id: "contact" as const,
    icon: "/svg/profile-circle.svg",
    label: t("chat.card.contact"),
    value: "",
    show: moreOpen.value,
  },
]);

const visibleRows = computed(() => allRows.value.filter((row) => row.show));

const closeNested = (): void => {
  if (nested.value === "add-members" && addOrigin.value === "edit") {
    nested.value = "edit";
    return;
  }
  if (nested.value === "invite") {
    nested.value = "edit";
    return;
  }
  nested.value = null;
};

const openAdd = (origin: "members" | "edit"): void => {
  addOrigin.value = origin;
  nested.value = "add-members";
};

const onClose = (): void => {
  if (nested.value) {
    closeNested();
    return;
  }
  if (view.value !== "card") {
    backToCard();
    return;
  }
  store.closeModal();
};

const backToCard = (): void => {
  nested.value = null;
  store.openModal(ChatModalName.ChatCard, { roomId: roomId.value });
};

const openMedia = (tab: RoomMediaTab): void => {
  store.openModal(ChatModalName.MediaList, { roomId: roomId.value, tab });
};

const onSearch = (): void => {
  store.closeModal();
  nextTick(() => {
    const root = document.querySelector("vue-advanced-chat")?.shadowRoot;
    const input = root?.querySelector(".vac-input") as HTMLInputElement | null;
    input?.focus();
  });
};

const onRow = (id: RowId): void => {
  if (id === "media") {
    openMedia("media");
    return;
  }
  if (id === "files") {
    openMedia("files");
    return;
  }
  if (id === "voice") {
    openMedia("voice");
    return;
  }
  if (id === "notifications") {
    store.closeModal();
    void go(ChatRoute.Notifications);
    return;
  }
  if (id === "language") {
    store.closeModal();
    void go(ChatRoute.Language);
    return;
  }
  if (id === "edit") {
    nested.value = "edit";
    return;
  }
  if (id === "members") {
    nested.value = null;
    store.openModal(ChatModalName.Members, { roomId: roomId.value });
    return;
  }
  if (id === "bans") {
    nested.value = null;
    store.openModal(ChatModalName.BansMutes, { roomId: roomId.value });
    return;
  }
  if (id === "welcome") {
    store.openModal(ChatModalName.Welcome, { roomId: roomId.value });
    return;
  }
  if (id === "recent") {
    store.openModal(ChatModalName.RecentActions, { roomId: roomId.value });
    return;
  }
  if (id === "history") {
    store.openModal(ChatModalName.ChatHistory, { roomId: roomId.value });
    return;
  }
  store.openModal(ChatModalName.ChatCard, { roomId: roomId.value, stub: id });
};

watch(view, (next) => {
  if (!import.meta.client || next !== "edit") {
    return;
  }
  nextTick(() => {
    document.querySelector(".chat-card-screen")?.scrollTo({ top: 0 });
  });
});

watch([personScreen, groupStage, isOpen], ([person, group, open]) => {
  if (!import.meta.client) {
    return;
  }
  const lock = (person || group) && open;
  document.body.style.overflow = lock ? "hidden" : "";
  if (!lock) {
    document.body.style.paddingRight = "";
  }
});

onBeforeUnmount(() => {
  if ((personScreen.value || groupStage.value) && isOpen.value) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
});
</script>

<style lang="scss" scoped src="./ChatCardModal.scss"></style>
