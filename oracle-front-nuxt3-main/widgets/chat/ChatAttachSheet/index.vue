<template>
  <section class="attach" @keydown.esc="emit('close')">
    <header class="attach__head">
      <button class="attach__cancel" type="button" @click="emit('close')">
        {{ t("chat.cancel") }}
      </button>
      <button
        v-if="tab === 'gallery' || tab === 'finance'"
        class="attach__title"
        type="button"
      >
        <span>{{ t("chat.attachMenu.recents") }}</span>
        <img src="/svg/figma-icons/arrow-down.svg" width="16" height="16" alt="" />
      </button>
      <h2 v-else class="attach__title is-static">
        {{ tab === "files" ? t("chat.attachMenu.filesTitle") : t("chat.attachMenu.contact") }}
      </h2>
      <button
        v-if="tab === 'files' || tab === 'contact'"
        class="attach__search"
        type="button"
        :title="t('chat.search')"
        @click="searching = !searching"
      >
        <span class="attach__search-icon" />
      </button>
      <span v-else class="attach__search" />
    </header>

    <label v-if="searching && (tab === 'files' || tab === 'contact')" class="attach__query">
      <input v-model="query" type="search" :placeholder="t('chat.search')" />
    </label>

    <div class="attach__body">
      <div v-if="tab === 'gallery' && mediaBlocked" class="attach__blocked">
        <span class="attach__blocked-mark" aria-hidden="true">
          <img src="/svg/figma-icons/close.svg" width="16" height="16" alt="" />
        </span>
        <p>{{ t("chat.attachMenu.mediaBlocked") }}</p>
      </div>

      <div v-else-if="tab === 'gallery'" class="attach__grid">
        <button class="attach__camera" type="button" @click="emit('pick-files', 'image/*')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 8.5h2.2l1.3-2h8.9l1.3 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" stroke="currentColor" stroke-width="1.6" />
            <circle cx="12" cy="13.5" r="3" stroke="currentColor" stroke-width="1.6" />
          </svg>
          <span>{{ t("chat.attachMenu.camera") }}</span>
        </button>
        <button
          v-for="item in gallery"
          :key="item.id"
          class="attach__photo"
          type="button"
          @click="togglePhoto(item)"
        >
          <img :src="item.url" alt="" />
          <span class="attach__check" :class="{ 'is-on': orderOf(item.id) }">
            {{ orderOf(item.id) || "" }}
          </span>
        </button>
      </div>

      <div v-else-if="tab === 'finance'" class="attach__finance">
        <button
          v-for="card in financeCards"
          :key="card.id"
          class="attach__card"
          type="button"
        >
          <span class="attach__card-icon" :class="`is-${card.id}`">
            <img :src="card.icon" :width="card.width" :height="card.height" alt="" />
          </span>
          <span>{{ card.label }}</span>
        </button>
      </div>

      <div v-else-if="tab === 'files'" class="attach__files">
        <div class="attach__card-list">
          <button class="attach__row" type="button" @click="tab = 'gallery'">
            <img src="/svg/figma-icons/photo.svg" width="24" height="24" alt="" />
            <span>{{ t("chat.attachMenu.selectGallery") }}</span>
          </button>
          <button class="attach__row" type="button" @click="emit('pick-files', '')">
            <img src="/svg/figma-icons/files.svg" width="24" height="24" alt="" />
            <span>{{ t("chat.attachMenu.selectFiles") }}</span>
          </button>
        </div>
        <p class="attach__label">{{ t("chat.attachMenu.recentFiles") }}</p>
        <div class="attach__card-list">
          <button
            v-for="file in visibleFiles"
            :key="file.id"
            class="attach__row is-file"
            type="button"
            @click="toggleFile(file)"
          >
            <img :src="file.icon" width="24" height="24" alt="" />
            <span class="attach__file-copy">
              <strong>{{ file.name }}</strong>
              <small>{{ file.size }}</small>
            </span>
            <span v-if="orderOf(file.id)" class="attach__check is-on is-inline">{{ orderOf(file.id) }}</span>
          </button>
        </div>
      </div>

      <div v-else class="attach__people">
        <section v-for="group in contactGroups" :key="group.letter">
          <p class="attach__label">{{ group.letter }}</p>
          <div class="attach__card-list">
            <button
              v-for="person in group.people"
              :key="person._id"
              class="attach__row"
              type="button"
              @click="emit('contact', person)"
            >
              <img class="attach__avatar" :src="person.avatar" alt="" />
              <span>{{ person.username }}</span>
            </button>
          </div>
        </section>
      </div>
    </div>

    <nav class="attach__tabs">
      <button
        v-for="item in tabs"
        :key="item.id"
        class="attach__tab"
        :class="{ 'is-active': tab === item.id }"
        type="button"
        @click="onTab(item.id)"
      >
        <span class="attach__tab-icon" :style="{ '--icon': `url(${item.icon})` }" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { filterByName, groupByLetter } from "~/entities/chat/lib/contacts";
import { useChatUiStore } from "~/store/chat";
import type { VacRoomUser } from "~/entities/chat/model";
import type { AttachPick } from "./types";

const emit = defineEmits<{
  close: [];
  "pick-files": [accept: string];
  contact: [person: VacRoomUser];
}>();

const selected = defineModel<AttachPick[]>("selected", { default: () => [] });

const { t } = useI18n();
const store = useChatUiStore();
const tab = ref<"gallery" | "finance" | "files" | "contact">("gallery");
const searching = ref(false);
const query = ref("");

const gallery = [
  { id: "g1", url: "/png/home-1.png", name: "home-1.png" },
  { id: "g2", url: "/png/home-2.png", name: "home-2.png" },
  { id: "g3", url: "/png/home-3.png", name: "home-3.png" },
  { id: "g4", url: "/png/recent-oracle.png", name: "recent.png" },
  { id: "g5", url: "/avatars/barbara.png", name: "barbara.png" },
  { id: "g6", url: "/png/user.png", name: "user.png" },
  { id: "g7", url: "/png/file-img.png", name: "file.png" },
  { id: "g8", url: "/png/bitcoin.png", name: "bitcoin.png" },
  { id: "g9", url: "/png/zaglushka.png", name: "photo.png" },
  { id: "g10", url: "/png/new-features.png", name: "features.png" },
];

const recentFiles = [
  { id: "f1", name: "File name(Photo)", size: "54.3 KB", icon: "/svg/figma-icons/file-jpg.svg", url: "/png/file-img.png" },
  { id: "f2", name: "File name(Video)", size: "54.3 KB", icon: "/svg/figma-icons/file-video.svg", url: "/png/file-img.png" },
  { id: "f3", name: "File name", size: "54.3 KB", icon: "/svg/figma-icons/folder.svg", url: "" },
  { id: "f4", name: "File name.docx", size: "54.3 KB", icon: "/svg/figma-icons/file-doc.svg", url: "" },
  { id: "f5", name: "File name.mp3", size: "54.3 KB", icon: "/svg/figma-icons/file-music.svg", url: "" },
];

const mediaBlocked = computed(() => Boolean(store.activeRoomId && store.extras[store.activeRoomId]?.mediaBlocked));

const financeCards = computed(() => [
  { id: "transfer", label: t("chat.attachMenu.transfer"), icon: "/svg/arrow-up.svg", width: 20, height: 16 },
  { id: "p2p", label: t("chat.attachMenu.p2p"), icon: "/svg/p2p-icon.svg", width: 36, height: 36 },
  { id: "escrow", label: t("chat.attachMenu.escrow"), icon: "/svg/figma-icons/link.svg", width: 16, height: 21 },
]);

const tabs = computed(() => [
  { id: "gallery" as const, label: t("chat.attachMenu.gallery"), icon: "/svg/figma-icons/photo.svg" },
  { id: "finance" as const, label: t("chat.attachMenu.finance"), icon: "/svg/figma-icons/finance.svg" },
  { id: "files" as const, label: t("chat.attachMenu.file"), icon: "/svg/figma-icons/files.svg" },
  { id: "contact" as const, label: t("chat.attachMenu.contact"), icon: "/svg/figma-icons/account-contact.svg" },
]);

const visibleFiles = computed(() => {
  const needle = query.value.trim().toLowerCase();
  if (!needle) {
    return recentFiles;
  }
  return recentFiles.filter((file) => file.name.toLowerCase().includes(needle));
});

const contactGroups = computed(() => groupByLetter(filterByName(store.contacts, query.value)));

const orderOf = (id: string): number => {
  const index = selected.value.findIndex((item) => item.id === id);
  return index === -1 ? 0 : index + 1;
};

const togglePhoto = (item: (typeof gallery)[number]): void => {
  const next = selected.value.filter((entry) => entry.id !== item.id);
  if (next.length === selected.value.length) {
    next.push({ id: item.id, url: item.url, name: item.name, kind: "image" });
  }
  selected.value = next;
};

const toggleFile = (file: (typeof recentFiles)[number]): void => {
  const next = selected.value.filter((entry) => entry.id !== file.id);
  if (next.length === selected.value.length) {
    next.push({ id: file.id, url: file.url, name: file.name, kind: "file" });
  }
  selected.value = next;
};

const onTab = (next: "gallery" | "finance" | "files" | "contact"): void => {
  tab.value = next;
  searching.value = false;
  query.value = "";
};

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape") {
    emit("close");
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style lang="scss" scoped src="./ChatAttachSheet.scss"></style>
