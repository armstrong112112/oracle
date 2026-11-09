<template>
  <div class="chat-settings__main" :class="{ 'is-editing': editing }">
    <div v-show="!editing" class="main-container">
      <div class="settings-header">
        <button class="qr-code__btn">
          <QrCodeIcon />
        </button>
        <button class="edit-btn" type="button" @click="openEdit">{{ $t("chat.edit") }}</button>
      </div>
      <div class="user-profile-card">
        <div class="profile-img">
          <img
            :src="avatar"
            alt="User avatar"
            class="profile-avatar" />
        </div>
        <div class="profile-name">
          <span>{{ displayName }}</span>
          <span class="logo">
            <span v-if="statusEmoji" class="status-emoji">{{ statusEmoji }}</span>
            <img v-else src="/assets/svg/cat-emoji.svg" alt="" />
          </span>
        </div>
        <div class="profile-meta">
          <p class="profile-id">ID: 90124812</p>
          <p class="circle"></p>
          <p class="profile-nikname">User123User</p>
        </div>
      </div>
      <div class="settings-menu">
        <button class="settings-menu__item" type="button" @click="emojiOpen = true">
          <div class="settings-menu__icon settings-menu__icon--emoji">
            <PencilIcon />
          </div>
          <div class="settings-menu__label">
            {{ $t("chat.changeEmojiStatus") }}
          </div>
          <div class="settings-menu__arrow"></div>
        </button>
        <div class="settings-menu__section">
          <button class="settings-menu__item" type="button" @click="openSaved">
            <div class="settings-menu__icon settings-menu__icon--saved">
              <SavedIcon />
            </div>
            <div class="settings-menu__label">
              {{ $t("chat.savedMessages") }}
            </div>
            <div class="settings-menu__value">3</div>
            <div class="settings-menu__arrow"></div>
          </button>

          <div class="settings-menu__item">
            <div class="settings-menu__icon settings-menu__icon--catalogue">
              <NotebookIcon />
            </div>
            <div class="settings-menu__label">{{ $t("chat.catalogue") }}</div>
            <div class="settings-menu__arrow"></div>
          </div>

          <button class="settings-menu__item" type="button" @click="go(ChatRoute.Folders)">
            <div class="settings-menu__icon settings-menu__icon--folders">
              <FoldersIcon />
            </div>
            <div class="settings-menu__label">
              {{ $t("chat.folders.title") }}
            </div>
            <div class="settings-menu__arrow"></div>
          </button>
        </div>

        <div class="settings-menu__section">
          <button class="settings-menu__item" type="button" @click="go(ChatRoute.Privacy)">
            <div class="settings-menu__icon settings-menu__icon--privacy">
              <img src="/svg/figma-icons/privacy.svg" width="24" height="24" alt="" />
            </div>
            <div class="settings-menu__label">
              {{ $t("chat.privacy.screenTitle") }}
            </div>
            <div class="settings-menu__arrow"></div>
          </button>

          <button class="settings-menu__item" type="button" @click="go(ChatRoute.Notifications)">
            <div class="settings-menu__icon settings-menu__icon--notifications">
              <NotificationsIcon />
            </div>
            <div class="settings-menu__label">
              {{ $t("chat.notifications.title") }}
            </div>
            <div class="settings-menu__arrow"></div>
          </button>

          <button class="settings-menu__item" type="button" @click="go(ChatRoute.Language)">
            <div class="settings-menu__icon settings-menu__icon--language">
              <LangIcon />
            </div>
            <div class="settings-menu__label">
              {{ $t("chat.language.title") }}
            </div>
            <div class="settings-menu__value">
              {{ currentLanguage }}
            </div>
            <div class="settings-menu__arrow"></div>
          </button>
        </div>

        <div class="settings-menu__item settings-menu__item--premium">
          <div class="settings-menu__icon settings-menu__icon--premium">
            <PremiumIcon />
          </div>
          <div class="settings-menu__label">{{ $t("chat.premium.title") }}</div>
          <div class="settings-menu__value">{{ $t("chat.premium.get") }}</div>
          <div class="settings-menu__arrow"></div>
        </div>
      </div>
    </div>

    <div v-if="editing" class="profile-edit">
      <div class="profile-edit__bar">
        <button type="button" @click="cancelEdit">{{ $t("chat.cancel") }}</button>
        <button class="is-done" type="button" @click="saveEdit">{{ $t("chat.done") }}</button>
      </div>
      <div class="profile-edit__photo">
        <img :src="draftAvatar" alt="" />
        <button type="button" @click="photoInput?.click()">{{ $t("chat.setNewPhoto") }}</button>
        <input ref="photoInput" type="file" accept="image/*" hidden @change="onPhoto" />
      </div>
      <div class="profile-edit__fields">
        <label>
          <span>{{ $t("chat.nameAndSurname") }}</span>
          <input v-model="draftName" type="text" />
          <input v-model="draftSurname" type="text" :placeholder="$t('chat.surname')" />
        </label>
        <label>
          <span>{{ $t("chat.card.bio") }}</span>
          <textarea v-model="draftBio" maxlength="100" :placeholder="$t('chat.card.bio')" rows="2" />
          <small>{{ draftBio.length }} / 100</small>
        </label>
        <div class="profile-edit__row">
          <span>{{ $t("chat.dateOfBirth") }}</span>
          <span class="profile-edit__value">{{ $t("chat.birthValue") }}</span>
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </div>
        <div class="profile-edit__row">
          <img src="/svg/figma-icons/premium.svg" width="24" height="24" alt="" />
          <span>{{ $t("chat.oracleAccount") }}</span>
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </div>
      </div>
      <button class="profile-edit__logout" type="button" @click="onLogout">
        {{ $t("chat.logOut") }}
      </button>
    </div>

    <Teleport to="body">
      <div v-if="emojiOpen" class="emoji-status" @click.self="emojiOpen = false">
        <emoji-picker ref="pickerEl" class="emoji-status__picker" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ChatRoute } from "~/entities/chat/config";
import { SystemRoomId } from "~/entities/chat/model";
import { ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import FoldersIcon from "@/assets/svg/chat-folder-icon.svg?component";
import LangIcon from "@/assets/svg/lang-icon.svg?component";
import NotebookIcon from "@/assets/svg/notebook.svg?component";
import NotificationsIcon from "@/assets/svg/notifications-icon.svg?component";
import PencilIcon from "@/assets/svg/pencil-icon.svg?component";
import PremiumIcon from "@/assets/svg/premium-icon.svg?component";
import QrCodeIcon from "@/assets/svg/qr-code-icon.svg?component";
import SavedIcon from "@/assets/svg/save-icon.svg?component";
import { useEventListener } from "@vueuse/core";
import { useChatNav } from "~/features/chat/chat-nav";

const { go } = useChatNav();
const { locale, t } = useI18n();

const LANGUAGE_NAME: Record<string, string> = {
  en: "chat.language.english",
  ru: "chat.language.russian",
};

const currentLanguage = computed(() => t(LANGUAGE_NAME[locale.value] ?? "chat.language.english"));

const openSaved = (): void => {
  void go(ChatRoute.Chat, { room: SystemRoomId.Saved });
};
const photoInput = ref<HTMLInputElement | null>(null);

const firstName = ref("Julia");
const surname = ref("");
const bio = ref("");
const avatar = ref("/svg/avatar.svg");
const statusEmoji = ref("");

const editing = ref(false);
const emojiOpen = ref(false);
const pickerEl = ref<HTMLElement | null>(null);
const draftName = ref(firstName.value);
const draftSurname = ref(surname.value);
const draftBio = ref(bio.value);
const draftAvatar = ref(avatar.value);

const displayName = computed(() => {
  const full = [firstName.value, surname.value].filter(Boolean).join(" ");
  return full || "Julia";
});

const openEdit = (): void => {
  draftName.value = firstName.value;
  draftSurname.value = surname.value;
  draftBio.value = bio.value;
  draftAvatar.value = avatar.value;
  editing.value = true;
};

const cancelEdit = (): void => {
  editing.value = false;
};

const saveEdit = (): void => {
  firstName.value = draftName.value.trim() || firstName.value;
  surname.value = draftSurname.value.trim();
  bio.value = draftBio.value;
  avatar.value = draftAvatar.value;
  editing.value = false;
};

const onPhoto = (event: Event): void => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }
  draftAvatar.value = URL.createObjectURL(file);
};

const PICKER_CSS = [
  ".picker { border: none; background: var(--secondary-7); }",
  ".nav { overflow-x: auto; }",
  ".search-wrapper { padding-right: 2px; padding-left: 2px; }",
  "input.search {",
  "height: 32px;",
  "font-size: 14px;",
  "border-radius: 10rem;",
  "border: 1px solid var(--secondary-13);",
  "padding: 5px 10px;",
  "outline: none;",
  "background: var(--primary-4);",
  "color: var(--primary-3);",
  "}",
].join("");

const onPickerEmoji = (event: Event): void => {
  const detail = (event as CustomEvent<{ unicode?: string; emoji?: { unicode?: string } }>).detail;
  const emoji = detail?.unicode || detail?.emoji?.unicode;
  if (!emoji) {
    return;
  }
  statusEmoji.value = emoji;
  emojiOpen.value = false;
};

const bindPicker = (picker: HTMLElement | null): void => {
  if (!picker) {
    return;
  }
  if (picker.shadowRoot) {
    ensureShadowStyle(picker.shadowRoot, "oracle-emoji-picker", PICKER_CSS);
  }
  picker.addEventListener("emoji-click", onPickerEmoji);
};

watch(pickerEl, (picker, previous) => {
  previous?.removeEventListener("emoji-click", onPickerEmoji);
  bindPicker(picker);
});

const onLogout = (): void => {
  editing.value = false;
  go(ChatRoute.Chat);
};

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key !== "Escape") {
    return;
  }
  if (emojiOpen.value) {
    emojiOpen.value = false;
    event.stopImmediatePropagation();
    return;
  }
  if (editing.value) {
    editing.value = false;
    event.stopImmediatePropagation();
  }
};

useEventListener(window, "keydown", onKeydown, true);
</script>

<style lang="scss" src="./ChatSettingsHome.scss"></style>
