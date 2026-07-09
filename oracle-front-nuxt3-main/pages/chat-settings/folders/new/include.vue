<template>
  <div class="include-chats">
    <div class="main-container">
      <!-- Header -->
      <div class="include-chats__header">
        <nuxt-link
          :to="localePath('/chat-settings/folders/new')"
          class="include-chats__header-cancel"
          >{{ $t("chat.cancel") }}</nuxt-link
        >
        <h2 class="include-chats__header-title">
          {{ $t("chat.folders.includeChats") }}
        </h2>
      </div>

      <!-- Filter / Selected Info -->
      <div class="include-chats__filter-info">
        <input-oracle
          :search="true"
          :placeholder="$t('chat.search')"
          @changed="searchUpdate" />
      </div>

      <div class="include-chats__types">
        <!-- title -->
        <h2 class="include-chats__types-title">
          {{ $t("chat.folders.chatTypes") }}
        </h2>

        <!-- Types List -->
        <ul class="include-chats__types-list">
          <!-- Item -->
          <li
            class="include-chats__types-item include-chats__types-item--selected">
            <label for="Contacts" class="include-chats__types-item--label">
              <div class="include-chats__types-icon">
                <Contacts />
              </div>
              <span class="include-chats__types-label">{{
                $t("chat.folders.contacts")
              }}</span>
              <input
                id="Contacts"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                class="form-check" />
              <span class="include-chats__types-check"><CheckIcon /></span>
            </label>
          </li>

          <li class="include-chats__types-item">
            <label for="Non-Contacts" class="include-chats__types-item--label">
              <div class="include-chats__types-icon">
                <NonContacts />
              </div>
              <span class="include-chats__types-label">{{
                $t("chat.folders.nonContacts")
              }}</span>
              <input
                id="Non-Contacts"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                class="form-check" />
              <span class="include-chats__types-check"><CheckIcon /></span>
            </label>
          </li>

          <li class="include-chats__types-item">
            <label for="Groups" class="include-chats__types-item--label">
              <div class="include-chats__types-icon">
                <Groups />
              </div>
              <span class="include-chats__types-label">{{
                $t("chat.folders.groups")
              }}</span>
              <input
                id="Groups"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                class="form-check" />
              <span class="include-chats__types-check"><CheckIcon /></span>
            </label>
          </li>

          <li class="include-chats__types-item">
            <label for="Channels" class="include-chats__types-item--label">
              <div class="include-chats__types-icon">
                <Channels />
              </div>
              <span class="include-chats__types-label">{{
                $t("chat.folders.channels")
              }}</span>
              <input
                id="Channels"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                class="form-check" />
              <span class="include-chats__types-check"><CheckIcon /></span>
            </label>
          </li>

          <li class="include-chats__types-item">
            <label for="Bots" class="include-chats__types-item--label">
              <div class="include-chats__types-icon">
                <Bots />
              </div>
              <span class="include-chats__types-label">{{
                $t("chat.folders.bots")
              }}</span>
              <input
                id="Bots"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                class="form-check" />
              <span class="include-chats__types-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>

      <div class="include-chats__chats">
        <!-- title -->
        <h2 class="include-chats__chats-title">
          {{ $t("chat.folders.chats") }}
        </h2>

        <!-- Types List -->
        <ul v-if="filteredChats.length >= 1" class="include-chats__chats-list">
          <!-- Item -->
          <li
            v-for="chat of filteredChats"
            :key="chat.id"
            class="include-chats__chats-item">
            <label :for="`${chat.id}`" class="include-chats__chats-item--label">
              <div class="include-chats__chats-avatar">
                <img :src="chat.avatar" :alt="chat.avatar" />
              </div>
              <span class="include-chats__chats-label">{{ chat.name }}</span>
              <input
                :id="`${chat.id}`"
                type="checkbox"
                name="chats"
                style="display: none"
                class="form-check" />
              <span class="include-chats__chats-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>

      <!-- Done Button -->
      <div class="new-folder__button">
        <new-oracle-button
          :to="selectedCheck ? localePath('/chat-settings/folders/new') : ''"
          :text="$t('chat.done')"
          :color="selectedCheck ? 'yellow' : 'black'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bots from "@/assets/svg/bots.svg?component";
import Channels from "@/assets/svg/channels.svg?component";
import CheckIcon from "@/assets/svg/check-icon.svg?component";
import Contacts from "@/assets/svg/contacts.svg?component";
import Groups from "@/assets/svg/groups.svg?component";
import NonContacts from "@/assets/svg/non-contacts.svg?component";

// Use localePath if needed
const localePath = useLocalePath();

interface WindowWithIncludeChatsInterval extends Window {
  __includeChatsInterval?: ReturnType<typeof setInterval>;
}

// Reactive state
const search = ref<string | null>("");
const selectedCheck = ref<boolean>(false);

const chats = ref([
  {
    id: 1,
    avatar: "/svg/avatar.svg",
    name: "Julia Work",
  },
  {
    id: 2,
    avatar: "/svg/avatar.svg",
    name: "Bill",
  },
  {
    id: 3,
    avatar: "/svg/avatar.svg",
    name: "Megan",
  },
  {
    id: 4,
    avatar: "/svg/avatar.svg",
    name: "Fred",
  },
  {
    id: 5,
    avatar: "/svg/avatar.svg",
    name: "Oliver",
  },
  {
    id: 6,
    avatar: "/svg/avatar.svg",
    name: "Amelia",
  },
  {
    id: 7,
    avatar: "/svg/avatar.svg",
    name: "Harry",
  },
]);

const initialCheckedTypes = ref<string[]>([]);
const initialCheckedChats = ref<number[]>([]);

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

const getCheckedTypes = (): string[] => {
  if (import.meta.client) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="chatTypes"]:checked'
    );
    return Array.from(checkboxes).map((el) => el.id);
  }
  return [];
};

const getCheckedChats = (): number[] => {
  if (import.meta.client) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="chats"]:checked'
    );
    return Array.from(checkboxes).map((el) => Number(el.id));
  }
  return [];
};

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    initialCheckedTypes.value = getCheckedTypes();
    initialCheckedChats.value = getCheckedChats();

    const intervalId = setInterval(() => {
      const nowTypes = getCheckedTypes();
      const nowChats = getCheckedChats();

      const typesChanged =
        JSON.stringify(nowTypes.sort()) !==
        JSON.stringify(initialCheckedTypes.value.sort());

      const chatsChanged =
        JSON.stringify(nowChats.sort()) !==
        JSON.stringify(initialCheckedChats.value.sort());

      selectedCheck.value = typesChanged || chatsChanged;
    }, 200);

    // Store interval ID for cleanup
    (window as any).__includeChatsInterval = intervalId;
  }
});

onBeforeUnmount(() => {
  if (import.meta.client && (window as any).__includeChatsInterval) {
    clearInterval((window as any).__includeChatsInterval);
  }
});
</script>

<style lang="scss">

.include-chats {
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 24px;
  border-radius: 8px 8px 0 0;
  padding-bottom: 96px;
  &__header {
    display: flex;
    align-items: center;
    padding: 16px 0;
    position: relative;
    margin-bottom: 12px;

    &-cancel {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #f64e2a;
    }
    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      color: #fff;
    }
  }
  &__filter-info {
    margin-bottom: 24px;
  }
  &__types {
    margin-bottom: 16px;
  }
  &__types,
  &__chats {
    &-title {
      padding: 0 8px 8px;
      user-select: none;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-list {
      background: #14131b;
      border-radius: 12px;
    }

    &-avatar {
      width: 28px;
      min-width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-item {
      &:last-child {
        .include-chats__chats-item--label,
        .include-chats__types-item--label {
          &::after {
            display: none;
          }
        }
      }
    }
    &-item--label {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 12px 0 16px;
      position: relative;
      cursor: pointer;
      &::after {
        content: "";
        width: calc(100% - 12px);
        height: 0;
        border-bottom: 1px solid #2b2741;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    &-label {
      width: 100%;
      text-align: left;
      user-select: none;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-check {
      width: 20px;
      min-width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #60578e;
      border-radius: 100%;
      line-height: 0;
      transition: 0.2s;
      svg {
        opacity: 0;
        path {
          stroke: var(--primary-1);
        }
      }
    }
    .form-check {
      &:checked + .include-chats__types-check,
      &:checked + .include-chats__chats-check {
        background: var(--primary-2);
        border-color: var(--primary-2);
        svg {
          opacity: 1;
        }
      }
    }
  }
}
</style>
