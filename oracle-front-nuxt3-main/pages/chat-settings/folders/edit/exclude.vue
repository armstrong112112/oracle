<template>
  <div class="exclude-chats">
    <div class="main-container">
      <!-- Header -->
      <div class="exclude-chats__header">
        <nuxt-link
          :to="localePath('/chat-settings/folders/edit')"
          class="exclude-chats__header-cancel"
          >{{ $t("chat.cancel") }}</nuxt-link
        >
        <h2 class="exclude-chats__header-title">
          {{ $t("chat.folders.excludeChats") }}
        </h2>
      </div>

      <!-- Filter / Selected Info -->
      <div class="exclude-chats__filter-info">
        <input-oracle
          :search="true"
          :placeholder="$t('chat.search')"
          @changed="searchUpdate" />
      </div>

      <CheckboxList
        title="Chat Types"
        :items="chatTypes"
        name="chatTypes"
        @change="handleTypeChange" />
      <CheckboxList
        title="Chats"
        :items="chats"
        name="chats"
        @change="handleChatChange" />

      <!-- Done Button -->
      <div class="exclude-chats__button">
        <new-oracle-button
          :to="selectedCheck ? localePath('/chat-settings/folders/edit') : ''"
          :text="$t('chat.done')"
          :color="selectedCheck ? 'yellow' : 'black'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/svg/new-search.svg?component";
import Muted from "@/assets/svg/muted.svg?component";
import Read from "@/assets/svg/read.svg?component";
import Archived from "@/assets/svg/archived.svg?component";
import CheckIcon from "@/assets/svg/check-icon.svg?component";
import CheckboxList from "@/widgets/settings/checkbox-list/index.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Use i18n for translations
const { t } = useI18n();

// Reactive state
const search = ref<string | null>("");
const selectedCheck = ref<boolean>(true);

const chatTypes = ref([
  {
    id: "muted",
    name: t("chat.savedMessages"),
    icon: Muted,
    checked: true,
  },
  {
    id: "read",
    name: t("chat.savedMessages"),
    icon: Read,
    checked: false,
  },
  {
    id: "archived",
    name: t("chat.folders.archived"),
    icon: Archived,
    checked: false,
  },
]);

const chats = ref([
  {
    id: 1,
    avatar: "/svg/avatar.svg",
    name: "Julia Work",
    checked: false,
  },
  {
    id: 2,
    avatar: "/svg/avatar.svg",
    name: "Bill",
    checked: false,
  },
  {
    id: 3,
    avatar: "/svg/avatar.svg",
    name: "Megan",
    checked: false,
  },
  {
    id: 4,
    avatar: "/svg/avatar.svg",
    name: "Fred",
    checked: false,
  },
  {
    id: 5,
    avatar: "/svg/avatar.svg",
    name: "Oliver",
    checked: false,
  },
  {
    id: 6,
    avatar: "/svg/avatar.svg",
    name: "Amelia",
    checked: false,
  },
  {
    id: 7,
    avatar: "/svg/avatar.svg",
    name: "Harry",
    checked: false,
  },
]);

// Computed properties
const filteredChats = computed(() => {
  if (!search.value) return chats.value;
  return chats.value.filter((chat) =>
    chat.name.toLowerCase().includes(search.value!.toLowerCase())
  );
});

// Methods
const searchUpdate = (val: string) => {
  search.value = val;
};

const handleTypeChange = (item: string) => {
  console.log("Chat type changed:", item);
};

const handleChatChange = (item: string) => {
  console.log("Chat changed:", item);
};
</script>

<style lang="scss">
@use "~/assets/styles/pages/_chat-folder-edit-exclude.scss" as *;
</style>
