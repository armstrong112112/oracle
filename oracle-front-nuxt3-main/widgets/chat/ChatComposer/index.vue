<template>
  <div class="chat-composer" :class="{ 'is-picker-open': pickerOpen, 'is-attach-open': attachOpen }">
    <div v-if="scheduleOpen" class="chat-composer__schedule">
      <p>{{ t("chat.vac.composerScheduleHint") }}</p>
      <input v-model="scheduleAt" class="chat-composer__datetime" type="datetime-local" />
      <div class="chat-composer__schedule-actions">
        <button type="button" @click="scheduleOpen = false">
          {{ t("chat.vac.cancelSelectMessage") }}
        </button>
        <button class="is-accent" type="button" @click="confirmSchedule">
          {{ t("chat.vac.composerSchedule") }}
        </button>
      </div>
    </div>

    <div v-if="store.draftContext" class="chat-composer__context">
      <div class="chat-composer__context-text">
        <strong>
          {{ store.draftContext.type === DraftContextType.Edit ? t("chat.menu.edit") : t("chat.menu.reply") }}
        </strong>
        <span>{{ store.draftContext.message.content }}</span>
      </div>
      <button type="button" @click="store.setDraftContext(null)">×</button>
    </div>

    <ChatAttachSheet
      v-if="attachOpen"
      v-model:selected="selectedMedia"
      @close="closeAttach"
      @pick-files="openFilePicker"
      @contact="sendContact"
    />

    <div class="chat-composer__bar" :class="{ 'is-voice': voiceRecording }">
      <button
        class="chat-composer__icon"
        type="button"
        :title="t('chat.vac.attach')"
        :disabled="voiceRecording"
        @click="onAttachClick"
      >
        <span class="chat-composer__glyph">
          <img src="/svg/chat/asset.svg" width="17" height="18" alt="" />
        </span>
      </button>
      <input
        ref="fileInputEl"
        class="chat-composer__file"
        type="file"
        multiple
        @change="onFilesPicked"
      />

      <div class="chat-composer__pill">
        <div v-if="emojiSuggestions.length" class="chat-composer__suggest">
          <button
            v-for="(item, index) in emojiSuggestions"
            :key="item.emoji + item.names[0]"
            class="chat-composer__suggest-item"
            type="button"
            :class="{ 'is-active': index === suggestIndex }"
            :title="item.names[0]"
            @click="applyEmojiSuggestion(item.emoji)"
          >
            {{ item.emoji }}
          </button>
        </div>
        <div class="chat-composer__pill-row">
          <div v-if="recording?.kind === 'circle'" class="chat-composer__recording">
            <span class="chat-composer__rec-dot" />
            <span>{{ recordingLabel }}</span>
          </div>
          <div v-else class="chat-composer__field">
            <textarea
              ref="inputEl"
              v-model="draft"
              class="chat-composer__input"
              rows="1"
              :disabled="voiceRecording"
              :placeholder="t('chat.vac.typeMessage')"
              @keydown="onInputKeydown"
              @input="syncInputHeight"
            />
            <Transition name="voice-fade">
              <div v-if="voiceRecording" class="chat-composer__voice-overlay">
                <span class="chat-composer__rec-dot" />
                <span>{{ voiceClock }}</span>
              </div>
            </Transition>
          </div>

          <Transition name="voice-fade">
            <button
              v-if="voiceRecording"
              class="chat-composer__voice-cancel"
              type="button"
              @click="discardVoice"
            >
              {{ t("chat.cancel") }}
            </button>
          </Transition>

          <button
            class="chat-composer__icon"
            type="button"
            :disabled="voiceRecording"
            :title="pickerOpen ? t('chat.vac.composerKeyboard') : t('chat.vac.composerEmoji')"
            @click="onEmojiButtonClick"
          >
            <span class="chat-composer__glyph">
              <img
                v-if="pickerOpen"
                src="/svg/figma-icons/keyboard.svg"
                width="24"
                height="24"
                alt=""
              />
              <img v-else src="/svg/chat/emoji.svg" width="23" height="20" alt="" />
            </span>
          </button>
          <button
            v-if="pickerOpen"
            class="chat-composer__icon chat-composer__chevron"
            type="button"
            :title="t('chat.vac.composerClosePicker')"
            @click="togglePicker"
          >
            <span class="chat-composer__glyph">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3.2 8.8L7 5l3.8 3.8"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <button
        v-if="hasOutgoing"
        class="chat-composer__send"
        type="button"
        :title="t('chat.vac.send')"
        @pointerdown.prevent="onSendPointerDown"
        @pointerup="onSendPointerUp"
        @pointerleave="onSendPointerCancel"
        @contextmenu.prevent
      >
        <span class="chat-composer__glyph">
          <img src="/svg/chat/send.svg" width="18" height="18" alt="" />
        </span>
      </button>
      <button
        v-else-if="!pickerOpen"
        class="chat-composer__capture"
        type="button"
        :title="voiceRecording ? t('chat.vac.send') : captureMode === 'circle' ? t('chat.vac.composerVideoCircle') : t('chat.vac.voice')"
        :class="{ 'is-circle': captureMode === 'circle', 'is-recording': voiceRecording }"
        @pointerdown="onCapturePointerDown"
        @pointerup="onCapturePointerUp"
        @pointerleave="onCapturePointerCancel"
        @click="onCaptureClick"
        @contextmenu.prevent
      >
        <span class="chat-composer__glyph">
          <img
            v-if="captureMode === 'circle'"
            src="/svg/chat/video-circle.svg"
            width="20"
            height="20"
            alt=""
          />
          <template v-else>
            <img class="chat-composer__capture-mic" src="/svg/chat/microphone.svg" width="13" height="18" alt="" />
            <img class="chat-composer__capture-send" src="/svg/chat/send.svg" width="18" height="18" alt="" />
          </template>
        </span>
      </button>
    </div>

    <div v-if="pickerOpen" class="chat-composer__picker">
      <div v-if="pickerTab === 'gif'" class="chat-composer__tags" role="list">
        <button
          v-for="tag in gifTags"
          :key="tag"
          class="chat-composer__tag"
          type="button"
          role="listitem"
          :class="{ 'is-active': gifTag === tag }"
          @click="gifTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <template v-else>
        <div class="chat-composer__packs" role="list">
          <button
            v-for="pack in packs"
            :key="pack.id"
            class="chat-composer__pack"
            type="button"
            role="listitem"
            :class="{ 'is-active': activePackId === pack.id }"
            @click="activePackId = pack.id"
          >
            {{ pack.icon }}
          </button>
        </div>
        <div class="chat-composer__actions">
          <button
            v-for="action in pickerActions"
            :key="action.id"
            class="chat-composer__action"
            type="button"
            :class="{ 'is-active': pickerAction === action.id }"
            :title="action.label"
            @click="setPickerAction(action.id)"
          >
            <span v-if="action.id === 'favorites'">❤️</span>
            <span v-else-if="action.id === 'recent'">👍</span>
            <svg v-else-if="action.id === 'add'" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3.2v9.6M3.2 8h9.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3.2v7.2M5 8l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3.2 12.8h9.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <p v-if="sectionTitle" class="chat-composer__section">{{ sectionTitle }}</p>
      </template>

      <div v-if="pickerTab === 'gif'" class="chat-composer__grid chat-composer__grid--gifs">
        <button
          v-for="gif in gifs"
          :key="gif.id"
          class="chat-composer__tile"
          type="button"
          :title="gif.name"
          @click="sendGif(gif)"
        >
          <img :src="gif.preview" :alt="gif.name" />
        </button>
      </div>

      <div
        v-else-if="pickerTab === 'stickers'"
        class="chat-composer__grid chat-composer__grid--stickers"
      >
        <button
          v-for="sticker in stickers"
          :key="sticker.id"
          class="chat-composer__tile chat-composer__tile--sticker"
          type="button"
          :title="sticker.name"
          @click="sendSticker(sticker)"
        >
          <img :src="sticker.url" :alt="sticker.name" />
        </button>
      </div>

      <div v-else class="chat-composer__emojis">
        <button
          v-for="emoji in visibleEmojis"
          :key="emoji"
          class="chat-composer__emoji"
          type="button"
          @click="insertEmoji(emoji)"
        >
          {{ emoji }}
        </button>
      </div>

      <div class="chat-composer__tabs" role="tablist">
        <button
          v-for="tab in pickerTabs"
          :key="tab.id"
          class="chat-composer__tab"
          type="button"
          role="tab"
          :aria-selected="pickerTab === tab.id"
          :class="{ 'is-active': pickerTab === tab.id }"
          @click="setPickerTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DraftContextType } from "~/entities/chat/model";
import {
  COMPOSER_EMOJIS,
  COMPOSER_EMOJI_SHORTCODES,
  COMPOSER_GIFS,
  COMPOSER_RECENT_EMOJIS,
  COMPOSER_STICKERS,
  GIF_QUICK_TAGS,
  PICKER_PACKS,
  type ComposerGif,
  type ComposerSticker,
} from "~/entities/chat/data/composer.mock";
import { useChatUiStore } from "~/store/chat";
import type { VacRoomUser } from "~/entities/chat/model";
import ChatAttachSheet from "~/widgets/chat/ChatAttachSheet/index.vue";
import type { AttachPick } from "~/widgets/chat/ChatAttachSheet/types";

const HOLD_MS = 450;
type PickerTab = "gif" | "stickers" | "emoji";
type PickerAction = "favorites" | "recent" | "add" | "download";
type CaptureMode = "voice" | "circle";

const { t } = useI18n();
const store = useChatUiStore();

const draft = ref("");
const pickerOpen = ref(false);
const attachOpen = ref(false);
const selectedMedia = ref<AttachPick[]>([]);
const pickerTab = ref<PickerTab>("gif");
const gifTag = ref(GIF_QUICK_TAGS[0]);
const stickerPackId = ref(PICKER_PACKS[0].id);
const emojiPackId = ref(PICKER_PACKS[0].id);
const stickerAction = ref<PickerAction>("favorites");
const emojiAction = ref<PickerAction>("recent");
const suggestIndex = ref(0);
const captureMode = ref<CaptureMode>("voice");
const recording = ref<{ kind: CaptureMode; startedAt: number } | null>(null);
const recordingTick = ref(0);
const scheduleOpen = ref(false);
const scheduleAt = ref("");
const inputEl = ref<HTMLTextAreaElement | null>(null);
const fileInputEl = ref<HTMLInputElement | null>(null);
const INPUT_MAX_PX = 160;

const syncInputHeight = (): void => {
  const el = inputEl.value;
  if (!el) {
    return;
  }

  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, INPUT_MAX_PX)}px`;
};

const gifs = COMPOSER_GIFS;
const stickers = COMPOSER_STICKERS;
const gifTags = GIF_QUICK_TAGS;
const packs = PICKER_PACKS;

const pickerTabs = computed(() => [
  { id: "gif" as const, label: t("chat.vac.composerGif") },
  { id: "stickers" as const, label: t("chat.vac.stickers") },
  { id: "emoji" as const, label: t("chat.vac.composerEmoji") },
]);

const pickerActions = computed(() => [
  { id: "favorites" as const, label: t("chat.vac.favoriteStickers") },
  { id: "recent" as const, label: t("chat.vac.recentlyUsed") },
  { id: "add" as const, label: t("chat.vac.composerMore") },
  { id: "download" as const, label: t("chat.vac.attach") },
]);

const activePackId = computed({
  get: () => (pickerTab.value === "emoji" ? emojiPackId.value : stickerPackId.value),
  set: (id: string) => {
    if (pickerTab.value === "emoji") {
      emojiPackId.value = id;
      return;
    }
    stickerPackId.value = id;
  },
});

const pickerAction = computed({
  get: () => (pickerTab.value === "emoji" ? emojiAction.value : stickerAction.value),
  set: (action: PickerAction) => {
    if (pickerTab.value === "emoji") {
      emojiAction.value = action;
      return;
    }
    stickerAction.value = action;
  },
});

const sectionTitle = computed(() => {
  if (pickerTab.value === "gif") {
    return "";
  }
  if (pickerAction.value === "recent") {
    return t("chat.vac.recentlyUsed");
  }
  if (pickerAction.value === "favorites") {
    return t("chat.vac.favoriteStickers");
  }
  return "";
});

const emojiQuery = computed(() => {
  const match = draft.value.match(/(?:^|\s):([^\s:]{1,32})$/);
  return match?.[1]?.toLowerCase() ?? "";
});

const emojiSuggestions = computed(() => {
  const query = emojiQuery.value;
  if (!query) {
    return [];
  }
  return COMPOSER_EMOJI_SHORTCODES.filter((item) =>
    item.names.some((name) => name.toLowerCase().includes(query)),
  ).slice(0, 8);
});

const visibleEmojis = computed(() => {
  if (pickerAction.value === "recent" || pickerTab.value === "emoji") {
    const recent = COMPOSER_RECENT_EMOJIS;
    const rest = COMPOSER_EMOJIS.filter((emoji) => !recent.includes(emoji));
    return pickerAction.value === "favorites" ? COMPOSER_EMOJIS : [...recent, ...rest];
  }
  return COMPOSER_EMOJIS;
});

const hasDraft = computed(() => draft.value.trim().length > 0);
const hasOutgoing = computed(() => hasDraft.value || selectedMedia.value.length > 0);
const voiceRecording = computed(() => recording.value?.kind === "voice");
const recordingLabel = computed(() => {
  if (!recording.value) {
    return "";
  }

  const seconds = Math.max(0, Math.floor((recordingTick.value - recording.value.startedAt) / 1000));
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const kind =
    recording.value.kind === "circle"
      ? t("chat.vac.composerVideoCircle")
      : t("chat.vac.voice");
  return `${kind} ${mm}:${ss}`;
});

const voiceClock = computed(() => {
  if (!recording.value) {
    return "0 : 00,00";
  }

  const elapsed = Math.max(0, recordingTick.value - recording.value.startedAt);
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const hundredths = Math.floor((elapsed % 1000) / 10);
  return `${minutes} : ${String(seconds).padStart(2, "0")},${String(hundredths).padStart(2, "0")}`;
});

let captureHoldTimer: ReturnType<typeof setTimeout> | null = null;
let sendHoldTimer: ReturnType<typeof setTimeout> | null = null;
let captureHolding = false;
let sendHolding = false;
let suppressVoiceSend = false;
let recordingClock: ReturnType<typeof setInterval> | null = null;

const clearTimer = (timer: ReturnType<typeof setTimeout> | null) => {
  if (timer) {
    clearTimeout(timer);
  }
};

const roomId = () => store.activeRoomId || "";

const sendPayload = (content: string, files?: Parameters<typeof store.sendMessage>[0]["files"]) => {
  if (!roomId()) {
    return;
  }

  store.sendMessage({
    roomId: roomId(),
    content,
    files,
    replyMessage: store.draftContext?.type === DraftContextType.Reply ? store.draftContext.message : undefined,
  });
  store.setDraftContext(null);
};

const sendDraft = () => {
  const content = draft.value.trim();
  const files = selectedMedia.value.map((item) => ({
    name: item.name,
    type: item.kind === "image" ? "image/png" : "file",
    extension: item.name.split(".").pop() || "",
    url: item.url || "",
    preview: item.url || undefined,
  }));
  if (!content && !files.length) {
    return;
  }

  const editing = store.draftContext?.type === DraftContextType.Edit ? store.draftContext.message : null;
  if (editing) {
    store.editMessage({
      roomId: roomId(),
      messageId: editing._id,
      newContent: content,
    });
    store.setDraftContext(null);
    draft.value = "";
    scheduleOpen.value = false;
    nextTick(() => syncInputHeight());
    return;
  }

  sendPayload(content, files.length ? files : undefined);
  draft.value = "";
  selectedMedia.value = [];
  attachOpen.value = false;
  scheduleOpen.value = false;
};

const closeAttach = (): void => {
  attachOpen.value = false;
  selectedMedia.value = [];
};

watch(
  () => store.activeRoomId,
  () => {
    closeAttach();
  },
);

const togglePicker = () => {
  pickerOpen.value = !pickerOpen.value;
  if (pickerOpen.value) {
    scheduleOpen.value = false;
    attachOpen.value = false;
  }
};

const setPickerTab = (tab: PickerTab) => {
  pickerTab.value = tab;
};

const setPickerAction = (action: PickerAction) => {
  pickerAction.value = action;
};

const onEmojiButtonClick = () => {
  if (pickerOpen.value) {
    pickerOpen.value = false;
    inputEl.value?.focus();
    return;
  }
  togglePicker();
};

const applyEmojiSuggestion = (emoji: string) => {
  draft.value = draft.value.replace(/:([^\s:]*)$/, emoji);
  suggestIndex.value = 0;
  nextTick(() => {
    inputEl.value?.focus();
    syncInputHeight();
  });
};

const onInputKeydown = (event: KeyboardEvent) => {
  const suggestions = emojiSuggestions.value;
  if (suggestions.length) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      suggestIndex.value = (suggestIndex.value + 1) % suggestions.length;
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      suggestIndex.value = (suggestIndex.value - 1 + suggestions.length) % suggestions.length;
      return;
    }
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      const item = suggestions[suggestIndex.value] ?? suggestions[0];
      if (item) {
        applyEmojiSuggestion(item.emoji);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      draft.value = draft.value.replace(/:([^\s:]*)$/, "");
      return;
    }
  }

  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendDraft();
  }
};

const insertEmoji = (emoji: string) => {
  if (emojiQuery.value) {
    applyEmojiSuggestion(emoji);
    return;
  }
  draft.value = `${draft.value}${emoji}`;
  nextTick(() => {
    inputEl.value?.focus();
    syncInputHeight();
  });
};

const sendGif = (gif: ComposerGif) => {
  sendPayload("", [
    {
      name: gif.name,
      type: "gif",
      extension: "gif",
      url: gif.url,
      preview: gif.preview,
    },
  ]);
};

const sendSticker = (sticker: ComposerSticker) => {
  sendPayload("", [
    {
      name: sticker.name,
      type: "webp",
      extension: "webp",
      url: sticker.url,
      preview: sticker.url,
    },
  ]);
};

const onAttachClick = () => {
  attachOpen.value = !attachOpen.value;
  if (attachOpen.value) {
    pickerOpen.value = false;
    scheduleOpen.value = false;
  }
};

const openFilePicker = (accept: string) => {
  if (!fileInputEl.value) {
    return;
  }
  fileInputEl.value.accept = accept;
  fileInputEl.value.click();
};

const sendContact = (person: VacRoomUser) => {
  sendPayload(person.username);
  closeAttach();
};

const onFilesPicked = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  input.value = "";
  if (!files.length) {
    return;
  }

  sendPayload(
    "",
    files.map((file) => ({
      name: file.name,
      type: file.type || "file",
      extension: file.name.split(".").pop() || "",
      url: URL.createObjectURL(file),
      localUrl: URL.createObjectURL(file),
      size: file.size,
      blob: file,
    })),
  );
  closeAttach();
};

const startRecordingClock = () => {
  recordingTick.value = Date.now();
  recordingClock = setInterval(() => {
    recordingTick.value = Date.now();
  }, 50);
};

const stopRecordingClock = () => {
  if (recordingClock) {
    clearInterval(recordingClock);
    recordingClock = null;
  }
};

const beginRecording = (kind: CaptureMode) => {
  captureHolding = true;
  if (kind === "voice") {
    suppressVoiceSend = true;
  }
  pickerOpen.value = false;
  attachOpen.value = false;
  scheduleOpen.value = false;
  recording.value = { kind, startedAt: Date.now() };
  startRecordingClock();
};

const discardVoice = () => {
  if (recording.value?.kind !== "voice") {
    return;
  }
  recording.value = null;
  captureHolding = false;
  suppressVoiceSend = false;
  stopRecordingClock();
};

const finishRecording = () => {
  const current = recording.value;
  recording.value = null;
  captureHolding = false;
  stopRecordingClock();
  if (!current) {
    return;
  }

  if (current.kind === "circle") {
    sendPayload("", [
      {
        name: "video-circle.mp4",
        type: "mp4",
        extension: "mp4",
        url: "/videos/moon.mp4",
        preview: "/png/home-2.png",
      },
    ]);
    return;
  }

  sendPayload("", [
    {
      name: "voice-sample.wav",
      type: "wav",
      extension: "wav",
      url: "/chat/voice-sample.wav",
      audio: true,
      duration: 1,
    },
  ]);
};

const capturePointer = (event: PointerEvent) => {
  try {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  } catch {
    /* synthetic events may not support capture */
  }
};

const onCapturePointerDown = (event: PointerEvent) => {
  if (recording.value?.kind === "voice") {
    return;
  }
  event.preventDefault();
  capturePointer(event);
  captureHolding = false;
  clearTimer(captureHoldTimer);
  captureHoldTimer = setTimeout(() => {
    beginRecording(captureMode.value);
  }, HOLD_MS);
};

const onCaptureClick = () => {
  if (recording.value?.kind !== "voice") {
    return;
  }
  if (suppressVoiceSend) {
    suppressVoiceSend = false;
    return;
  }
  finishRecording();
};

const onCapturePointerUp = () => {
  clearTimer(captureHoldTimer);
  captureHoldTimer = null;
  if (recording.value?.kind === "voice") {
    captureHolding = false;
    return;
  }
  if (recording.value) {
    finishRecording();
    return;
  }

  if (!captureHolding) {
    captureMode.value = captureMode.value === "voice" ? "circle" : "voice";
  }
};

const onCapturePointerCancel = () => {
  clearTimer(captureHoldTimer);
  captureHoldTimer = null;
  if (recording.value?.kind === "voice") {
    captureHolding = false;
    return;
  }
  if (recording.value) {
    recording.value = null;
    captureHolding = false;
    stopRecordingClock();
  }
};

const openSchedule = () => {
  sendHolding = true;
  const at = new Date(Date.now() + 60 * 60 * 1000);
  const iso = new Date(at.getTime() - at.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  scheduleAt.value = iso;
  scheduleOpen.value = true;
  pickerOpen.value = false;
};

const confirmSchedule = () => {
  const content = draft.value.trim();
  if (!content || !scheduleAt.value || !roomId()) {
    return;
  }

  store.scheduleMessage({
    roomId: roomId(),
    content,
    at: new Date(scheduleAt.value).toISOString(),
  });
  draft.value = "";
  scheduleOpen.value = false;
};

const onSendPointerDown = (event: PointerEvent) => {
  capturePointer(event);
  sendHolding = false;
  clearTimer(sendHoldTimer);
  sendHoldTimer = setTimeout(openSchedule, HOLD_MS);
};

const onSendPointerUp = () => {
  clearTimer(sendHoldTimer);
  sendHoldTimer = null;
  if (!sendHolding) {
    sendDraft();
  }
};

const onSendPointerCancel = () => {
  clearTimer(sendHoldTimer);
  sendHoldTimer = null;
};

watch(draft, () => {
  nextTick(syncInputHeight);
});

watch(emojiQuery, () => {
  suggestIndex.value = 0;
});

watch(
  () => store.draftContext,
  (ctx) => {
    if (ctx?.type === DraftContextType.Edit) {
      draft.value = ctx.message.content ?? "";
      nextTick(() => {
        inputEl.value?.focus();
        syncInputHeight();
      });
      return;
    }
    if (ctx?.type === DraftContextType.Reply) {
      nextTick(() => inputEl.value?.focus());
    }
  },
);

onMounted(() => {
  nextTick(syncInputHeight);
});

onBeforeUnmount(() => {
  clearTimer(captureHoldTimer);
  clearTimer(sendHoldTimer);
  stopRecordingClock();
});
</script>

<style lang="scss" scoped src="./ChatComposer.scss"></style>
