<template>
  <section class="dm-card">
    <button class="dm-card__back" type="button" :aria-label="t('chat.card.back')" @click="store.closeModal()">
      <img src="/svg/figma-icons/arrow.svg" width="22" height="22" alt="" />
    </button>

    <img class="dm-card__avatar" :src="room?.avatar" alt="" />
    <h2 class="dm-card__name">{{ roomTitle }}</h2>
    <p v-if="status" class="dm-card__status">{{ status }}</p>

    <div class="dm-card__actions">
      <button class="dm-card__action" type="button" @click="store.closeModal()">
        <img src="/svg/figma-icons/share-or-forward.svg" width="24" height="24" alt="" />
        <span>{{ t("chat.card.oracle") }}</span>
      </button>
      <button class="dm-card__action" type="button">
        <img src="/svg/figma-icons/share.svg" width="24" height="24" alt="" />
        <span>{{ t("chat.card.offerDeal") }}</span>
      </button>
      <button class="dm-card__action" type="button">
        <img src="/svg/figma-icons/finance.svg" width="24" height="24" alt="" />
        <span>{{ t("chat.card.sendBill") }}</span>
      </button>
      <div class="dm-card__more">
        <button class="dm-card__action" type="button" @click="menu = menu ? null : 'more'">
          <img src="/svg/figma-icons/more.svg" width="24" height="24" alt="" />
          <span>{{ t("chat.card.more") }}</span>
        </button>
        <div v-if="menu" class="dm-card__menu" role="menu">
          <template v-if="menu === 'more'">
            <button type="button" @click="onSearch">
              <span>{{ t("chat.card.search") }}</span>
              <img src="/svg/figma-icons/search.svg" width="16" height="16" alt="" />
            </button>
            <button type="button" @click="onMute">
              <span>{{ extra?.muted ? t("chat.card.unmute") : t("chat.card.mute") }}</span>
              <img src="/svg/figma-icons/notification-silent-outline.svg" width="16" height="16" alt="" />
            </button>
            <button type="button" @click="menu = 'delete'">
              <span>{{ t("chat.card.enableAutodelete") }}</span>
              <img src="/svg/figma-icons/timer.svg" width="16" height="16" alt="" />
            </button>
            <button class="is-danger" type="button" @click="onClear">
              <span>{{ t("chat.card.clearMessages") }}</span>
              <img src="/svg/figma-icons/clean.svg" width="16" height="16" alt="" />
            </button>
          </template>
          <template v-else>
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
          </template>
        </div>
      </div>
    </div>

    <button v-if="menu" class="dm-card__scrim" type="button" :aria-label="t('chat.cancel')" @click="menu = null" />

    <div class="dm-card__details-head">
      <span>{{ t("chat.card.details") }}</span>
      <button
        class="dm-card__switch"
        type="button"
        role="switch"
        :aria-checked="detailsOpen"
        @click="detailsOpen = !detailsOpen"
      />
    </div>

    <div class="dm-card__sheet">
      <div class="dm-card__field">
        <span>{{ t("chat.card.username") }}</span>
        <strong>{{ username }}</strong>
      </div>
      <div class="dm-card__field">
        <span>{{ t("chat.card.bio") }}</span>
        <strong>{{ t("chat.card.bioText") }}</strong>
      </div>
      <button class="dm-card__row" type="button">
        <i class="dm-card__plus" />
        {{ t("chat.card.addContact") }}
      </button>
      <button class="dm-card__row is-danger" type="button">
        <i class="dm-card__ban" />
        {{ t("chat.card.blockUser") }}
      </button>
    </div>

    <section v-if="detailsOpen" class="dm-card__block">
      <header>
        <h3>{{ t("chat.card.recentReviews") }} <em>32</em></h3>
        <img src="/svg/figma-icons/arrow.svg" width="18" height="18" alt="" />
      </header>
      <article v-for="review in reviews" :key="review.body">
        <img src="/png/user.png" alt="" />
        <div>
          <p>
            <strong>{{ t("chat.card.reviewHandle") }}</strong>
            <span>{{ t("chat.card.reviewDate") }}</span>
            <i class="dm-card__like" />
          </p>
          <small>{{ review.body }}</small>
        </div>
      </article>
    </section>

    <section v-if="detailsOpen" class="dm-card__block">
      <header>
        <h3>{{ t("chat.card.historyTitle") }} <em>10</em></h3>
        <img src="/svg/figma-icons/arrow.svg" width="18" height="18" alt="" />
      </header>
      <p class="dm-card__date">{{ t("chat.card.historyDate") }}</p>
      <article v-for="deal in deals" :key="deal.title" class="dm-card__deal">
        <img src="/png/bitcoin.png" alt="" />
        <div>
          <strong>{{ deal.title }}</strong>
          <small>{{ t("chat.card.counterparty") }}</small>
        </div>
        <p>
          <b>{{ t("chat.card.amount") }}</b>
          <small>{{ t("chat.card.fiat") }}</small>
        </p>
      </article>
    </section>

    <div class="dm-card__tabs">
      <button
        v-for="tab in libraryTabs"
        :key="tab.id"
        type="button"
        :class="{ 'is-on': library === tab.id }"
        @click="library = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="library === 'media'" class="dm-card__grid">
      <button v-for="item in media.media" :key="item.id" type="button" @click="openLibrary('media')">
        <img :src="item.preview || item.url" alt="" />
      </button>
      <p v-if="!media.media.length">{{ t("chat.card.emptyMedia") }}</p>
    </div>
    <div v-else-if="library === 'files'" class="dm-card__files">
      <button v-for="item in media.files" :key="item.id" type="button" @click="openLibrary('files')">
        <img src="/svg/figma-icons/files.svg" width="30" height="30" alt="" />
        <span>
          <strong>{{ item.name }}</strong>
          <small>
            {{ formatFileSize(item.size) }}
            <template v-if="item.date"> · {{ item.date }}</template>
          </small>
        </span>
      </button>
      <p v-if="!media.files.length">{{ t("chat.card.emptyFiles") }}</p>
    </div>
    <p v-else-if="library === 'links'" class="dm-card__empty">{{ t("chat.card.emptyLinks") }}</p>
    <div v-else class="dm-card__groups">
      <button v-for="group in groups" :key="group.roomId" type="button" @click="openGroup(group.roomId)">
        <img :src="group.avatar" alt="" />
        <span>{{ group.roomName }}</span>
      </button>
      <p v-if="!groups.length">{{ t("chat.card.emptyGroups") }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { localizedRoomName } from "~/entities/chat/lib/room-label";
import { ChatKind, ChatModalName } from "~/entities/chat/model";
import { collectRoomMedia, formatFileSize, type RoomMediaTab } from "~/entities/chat/lib/room-media";
import { useChatUiStore } from "~/store/chat";

type MenuName = "more" | "delete";
type DeleteSpan = "day" | "week" | "month";
type LibraryTab = "media" | "files" | "links" | "groups";

const props = defineProps<{ roomId: string }>();

const { t } = useI18n();
const store = useChatUiStore();

const menu = ref<MenuName | null>(null);
const detailsOpen = ref(true);
const library = ref<LibraryTab>("media");
const autoDelete = ref<DeleteSpan | null>(null);

const room = computed(() => store.rooms.find((item) => item.roomId === props.roomId) ?? null);
const extra = computed(() => (room.value ? store.extras[room.value.roomId] : null));
const roomTitle = computed(() => (room.value ? localizedRoomName(room.value.roomId, room.value.roomName, (key) => t(key)) : ""));

const peer = computed(() => room.value?.users.find((user) => user._id !== store.currentUserId) ?? null);

const username = computed(() => peer.value?.username.split(" ")[0] || roomTitle.value);

const status = computed(() => {
  const person = peer.value;
  if (!person?.status) {
    return "";
  }
  if (person.status.state === "online") {
    return t("chat.card.online");
  }
  return person.status.lastChanged ? `${t("chat.vac.lastSeen")}${person.status.lastChanged}` : "";
});

const media = computed(() => collectRoomMedia(store.messagesByRoom[room.value?.roomId || ""] ?? []));

const groups = computed(() =>
  store.rooms.filter((item) => store.extras[item.roomId]?.kind === ChatKind.Group),
);

const reviews = computed(() => [
  { body: t("chat.card.reviewLong") },
  { body: t("chat.card.reviewShort") },
]);

const deals = computed(() => [
  { title: t("chat.card.payout") },
  { title: t("chat.card.refund") },
]);

const deleteOptions = computed(() => [
  { id: "day" as const, label: t("chat.card.day") },
  { id: "week" as const, label: t("chat.card.week") },
  { id: "month" as const, label: t("chat.card.month") },
]);

const libraryTabs = computed(() => [
  { id: "media" as const, label: t("chat.card.media") },
  { id: "files" as const, label: t("chat.card.files") },
  { id: "links" as const, label: t("chat.card.links") },
  { id: "groups" as const, label: t("chat.card.groups") },
]);

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

const openLibrary = (tab: RoomMediaTab): void => {
  if (!room.value) {
    return;
  }
  store.openModal(ChatModalName.MediaList, { roomId: room.value.roomId, tab });
};

const openGroup = (roomId: string): void => {
  store.selectRoom(roomId);
  store.closeModal();
};
</script>

<style lang="scss" scoped src="./DmCard.scss"></style>
