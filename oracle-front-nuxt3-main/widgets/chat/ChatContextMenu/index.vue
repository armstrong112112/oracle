<template>
  <Teleport to="body">
    <div v-if="isOpen" class="chat-ctx" @mousedown.self="onBackdrop" @contextmenu.prevent="onBackdrop">
      <div
        :ref="bindPanel"
        class="chat-ctx__panel"
        :class="{ 'is-ready': ready, 'is-slide': slide }"
        :style="panelStyle"
        @mousedown="onPanelPointer"
      >
        <div
          ref="expandEl"
          class="chat-ctx__reactions"
          :class="{ 'is-open': expanded, 'is-up': openUp }"
          :style="reactionStyle"
          @transitionend="onExpandTransition"
        >
          <div class="chat-ctx__picker-wrap" :inert="!expanded">
            <emoji-picker ref="pickerEl" class="chat-ctx__picker" />
          </div>
          <div ref="quickEl" class="chat-ctx__quick" :class="{ 'is-hidden': expanded }" role="list">
            <button
              v-for="emoji in QUICK_REACTIONS"
              :key="emoji"
              class="chat-ctx__emoji"
              type="button"
              role="listitem"
              @click="react(emoji)"
            >
              {{ emoji }}
            </button>
            <button
              class="chat-ctx__more"
              type="button"
              :title="t('chat.menu.moreReactions')"
              :aria-expanded="expanded"
              @click="toggleExpanded"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3.2 5.2L7 9l3.8-3.8"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div v-show="!expanded" class="chat-ctx__menu" :class="{ 'is-dm': isDm }">
          <div v-if="readLabel" class="chat-ctx__read">
            <img src="/svg/figma-icons/viewed.svg" width="16" height="16" alt="" />
            <span>{{ readLabel }}</span>
          </div>
          <button
            v-for="action in actions"
            :key="action.id"
            class="chat-ctx__item"
            type="button"
            :class="{ 'is-danger': action.id === MessageAction.Delete, 'is-select': action.id === MessageAction.Select }"
            @click="onAction(action.id)"
          >
            <span>{{ action.label }}</span>
            <span
              v-if="action.id === MessageAction.Delete && action.icon"
              class="chat-ctx__glyph is-danger"
              :style="{ '--glyph': `url('${action.icon}')` }"
            />
            <img v-else-if="action.icon" :src="action.icon" width="16" height="16" alt="" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { localizedMessageDate } from "~/entities/chat/lib/message-date";
import { downloadFile, isChatImage } from "~/entities/chat/lib/media-files";
import { ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import { ChatKind, ChatModalName, DraftContextType, MessageAction } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";
import type { ChatContextMenuPayload } from "~/entities/chat/model";
import type { MenuAction } from "./types";

const QUICK_REACTIONS = ["🥰", "🔥", "❤️", "👍", "💋", "👌", "💘"];
const PICKER_WIDTH = 300;
const PICKER_HEIGHT = 320;
const EDGE = 8;

const { t, locale } = useI18n();
const store = useChatUiStore();
const panelEl = ref<HTMLElement | null>(null);
const expandEl = ref<HTMLElement | null>(null);
const quickEl = ref<HTMLElement | null>(null);
const pickerEl = ref<HTMLElement | null>(null);
const pillWidth = ref(0);
const pillHeight = ref(0);
const ready = ref(false);
const expanded = ref(false);
const openUp = ref(false);
const slide = ref(false);
const left = ref(0);
const top = ref(0);
let placeTimer = 0;

const payload = computed(
  () => (store.modal.payload as ChatContextMenuPayload | null) ?? null,
);
const isOpen = computed(() => store.modal.name === ChatModalName.ContextMenu && Boolean(payload.value));

const message = computed(() => store.findMessage(payload.value?.roomId, payload.value?.messageId));

const isMine = computed(() => message.value?.senderId === store.currentUserId);

const isDm = computed(() => {
  const roomId = payload.value?.roomId;
  if (!roomId) {
    return false;
  }
  return store.extras[roomId]?.kind === ChatKind.Dm;
});

const hasImage = computed(() => (message.value?.files ?? []).some(isChatImage));

const readLabel = computed(() => {
  const current = message.value;
  if (!isDm.value || !isMine.value || !current || current.deleted) {
    return "";
  }
  if (!current.seen) {
    return t("chat.menu.unread");
  }
  const rawDate = current.date?.trim().toLowerCase() ?? "";
  const date = rawDate === "today"
    ? t("chat.menu.today")
    : rawDate === "yesterday"
      ? t("chat.menu.yesterday")
      : localizedMessageDate(current.date, locale.value, "", "");
  const time = current.timestamp?.trim() ?? "";
  if (date && time) {
    return t("chat.menu.readAt", { date, time });
  }
  return t("chat.menu.read");
});

const pinAction = (withIcon: boolean): MenuAction =>
  message.value?.pinned
    ? { id: MessageAction.Unpin, label: t("chat.card.unpin"), icon: withIcon ? "/svg/figma-icons/unpin.svg" : undefined }
    : { id: MessageAction.Pin, label: t("chat.card.pin"), icon: withIcon ? "/svg/figma-icons/pin.svg" : undefined };

const actions = computed((): MenuAction[] => {
  if (!isDm.value) {
    const items: MenuAction[] = [
      { id: MessageAction.Reply, label: t("chat.menu.reply") },
      { id: MessageAction.Copy, label: t("chat.menu.copy") },
    ];
    if (isMine.value) {
      items.push({ id: MessageAction.Edit, label: t("chat.menu.edit") });
    }
    items.push(
      pinAction(false),
      { id: MessageAction.Delete, label: t("chat.menu.delete") },
      { id: MessageAction.Select, label: t("chat.menu.select") },
    );
    return items;
  }

  const items: MenuAction[] = [
    { id: MessageAction.Reply, label: t("chat.menu.reply"), icon: "/svg/figma-icons/reply.svg" },
  ];
  if (hasImage.value) {
    items.push({ id: MessageAction.Save, label: t("chat.menu.savePhoto"), icon: "/svg/figma-icons/save.svg" });
  }
  items.push(
    { id: MessageAction.Copy, label: t("chat.menu.copy"), icon: "/svg/figma-icons/copy.svg" },
    pinAction(true),
    { id: MessageAction.Forward, label: t("chat.menu.forward"), icon: "/svg/figma-icons/share-or-forward.svg" },
  );
  items.push(
    { id: MessageAction.Delete, label: t("chat.menu.delete"), icon: "/svg/figma-icons/trash-solid-16.svg" },
    { id: MessageAction.Select, label: t("chat.menu.select"), icon: "/svg/figma-icons/select.svg" },
  );
  return items;
});

const panelStyle = computed(() => ({
  left: `${left.value}px`,
  top: `${top.value}px`,
}));

const reactionStyle = computed(() => {
  if (!pillWidth.value || !pillHeight.value) {
    return undefined;
  }
  return {
    width: `${pillWidth.value}px`,
    height: `${expanded.value ? PICKER_HEIGHT : pillHeight.value}px`,
  };
});

const placePanel = (): void => {
  const data = payload.value;
  const el = panelEl.value;
  if (!data || !el || expanded.value || slide.value) {
    return;
  }

  const width = expanded.value ? PICKER_WIDTH : el.offsetWidth || el.getBoundingClientRect().width || 360;
  const menuHeight = expanded.value ? 0 : el.querySelector(".chat-ctx__menu")?.getBoundingClientRect().height ?? 0;
  const height = expanded.value
    ? PICKER_HEIGHT
    : (pillHeight.value || el.offsetHeight || 52) + (menuHeight ? menuHeight + 8 : 0);
  if (!width || !height) {
    return;
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cursorX = Math.min(Math.max(data.x, EDGE), vw - EDGE);
  const cursorY = Math.min(Math.max(data.y, EDGE), vh - EDGE);

  const spaceRight = vw - EDGE - cursorX;
  const spaceLeft = cursorX - EDGE;
  const spaceBelow = vh - EDGE - cursorY;
  const spaceAbove = cursorY - EDGE;

  let nextX = cursorX;
  if (spaceRight >= width) {
    nextX = cursorX;
  } else if (spaceLeft >= width) {
    nextX = cursorX - width;
  } else {
    nextX = spaceRight >= spaceLeft ? Math.max(EDGE, vw - EDGE - width) : EDGE;
  }

  let nextY = cursorY;
  if (spaceBelow >= height) {
    nextY = cursorY;
  } else if (spaceAbove >= height) {
    nextY = cursorY - height;
  } else {
    nextY = spaceBelow >= spaceAbove ? Math.max(EDGE, vh - EDGE - height) : EDGE;
  }

  left.value = Math.min(Math.max(EDGE, nextX), Math.max(EDGE, vw - EDGE - width));
  top.value = Math.min(Math.max(EDGE, nextY), Math.max(EDGE, vh - EDGE - height));
  ready.value = true;
};

const measurePill = (): void => {
  const quick = quickEl.value;
  if (!quick) {
    return;
  }
  pillWidth.value = quick.offsetWidth;
  pillHeight.value = quick.offsetHeight;
};

const schedulePlace = (): void => {
  window.clearTimeout(placeTimer);
  nextTick(() => {
    if (!expanded.value) {
      measurePill();
    }
    placePanel();
    if (!ready.value) {
      placeTimer = window.setTimeout(() => placePanel(), 16);
    }
  });
};

const bindPanel = (el: Element | null): void => {
  if (!(el instanceof HTMLElement)) {
    panelEl.value = null;
    return;
  }
  if (panelEl.value === el) {
    return;
  }
  panelEl.value = el;
  if (isOpen.value && !ready.value) {
    placePanel();
    schedulePlace();
  }
};

const close = (): void => {
  if (store.modal.name === ChatModalName.ContextMenu) {
    store.closeModal();
  }
};

const anchorExpanded = (next: boolean): void => {
  const rect = expandEl.value?.getBoundingClientRect();
  if (!rect) {
    return;
  }

  if (next) {
    const grow = PICKER_HEIGHT - rect.height;
    const spaceBelow = window.innerHeight - EDGE - rect.bottom;
    const spaceAbove = rect.top - EDGE;
    if (spaceBelow >= grow || spaceBelow >= spaceAbove) {
      openUp.value = false;
      const overflow = rect.top + PICKER_HEIGHT - (window.innerHeight - EDGE);
      if (overflow > 0) {
        top.value = Math.max(EDGE, rect.top - overflow);
      }
      return;
    }
    openUp.value = true;
    top.value = Math.max(EDGE, rect.top - grow);
    return;
  }

  if (openUp.value && pillHeight.value) {
    top.value = Math.max(EDGE, rect.bottom - pillHeight.value);
  }
};

let expandLock = false;

const setExpanded = (next: boolean): void => {
  if (next === expanded.value || expandLock) {
    return;
  }
  if (next) {
    measurePill();
    bindPicker(pickerEl.value);
  }
  expandLock = true;
  slide.value = true;
  nextTick(() => {
    requestAnimationFrame(() => {
      anchorExpanded(next);
      expanded.value = next;
      expandLock = false;
    });
  });
};

const collapse = (): void => {
  setExpanded(false);
};

const onBackdrop = (): void => {
  if (expanded.value) {
    collapse();
    return;
  }
  close();
};

const onPanelPointer = (event: MouseEvent): void => {
  const target = event.target;
  if (!(target instanceof Element)) {
    close();
    return;
  }
  if (target.closest("button, input, textarea, emoji-picker, .chat-ctx__read")) {
    event.stopPropagation();
    return;
  }
  if (!expanded.value && target.closest(".chat-ctx__reactions")) {
    event.stopPropagation();
    return;
  }
  close();
};

const react = (emoji: string): void => {
  const data = payload.value;
  if (!data) {
    return;
  }
  store.toggleReaction({ roomId: data.roomId, messageId: data.messageId, reaction: emoji });
  close();
};

const onPickerEmoji = (event: Event): void => {
  const detail = (event as CustomEvent<{ unicode?: string; emoji?: { unicode?: string } }>).detail;
  const emoji = detail?.unicode || detail?.emoji?.unicode;
  if (!emoji) {
    return;
  }
  react(emoji);
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

const stylePicker = (picker: HTMLElement): void => {
  if (picker.shadowRoot) {
    ensureShadowStyle(picker.shadowRoot, "oracle-emoji-picker", PICKER_CSS);
  }
};

const boundPickers = new WeakSet<HTMLElement>();

const bindPicker = (picker: HTMLElement | null): void => {
  if (!picker) {
    return;
  }
  stylePicker(picker);
  if (boundPickers.has(picker)) {
    return;
  }
  picker.addEventListener("emoji-click", onPickerEmoji);
  boundPickers.add(picker);
};

watch(pickerEl, (picker, previous) => {
  previous?.removeEventListener("emoji-click", onPickerEmoji);
  bindPicker(picker);
});

const toggleExpanded = (): void => {
  setExpanded(!expanded.value);
};

const onExpandTransition = (event: TransitionEvent): void => {
  if (event.propertyName !== "height" || event.target !== expandEl.value) {
    return;
  }
  slide.value = false;
  if (!expanded.value) {
    openUp.value = false;
  }
};

const onAction = async (id: MessageAction): Promise<void> => {
  const data = payload.value;
  const current = message.value;
  if (!data || !current) {
    return;
  }

  if (id === MessageAction.Copy) {
    const text = current.content?.trim() || current.files?.[0]?.name || "";
    if (text) {
      await navigator.clipboard.writeText(text).catch(() => undefined);
    }
    close();
    return;
  }

  if (id === MessageAction.Save) {
    const file = (current.files ?? []).find(isChatImage);
    downloadFile(file?.url ?? "", file?.name || "photo");
    close();
    return;
  }

  if (id === MessageAction.Delete) {
    store.openModal(ChatModalName.DeleteMessages, {
      roomId: data.roomId,
      messageIds: [current._id],
    });
    close();
    return;
  }

  if (id === MessageAction.Select) {
    store.startMessageSelection(data.roomId, current._id);
    close();
    return;
  }

  if (id === MessageAction.Pin || id === MessageAction.Unpin) {
    store.toggleMessagePin(data.roomId, current._id);
    close();
    return;
  }

  if (id === MessageAction.Forward) {
    close();
    return;
  }

  store.setDraftContext({
    type: id === MessageAction.Edit ? DraftContextType.Edit : DraftContextType.Reply,
    message: current,
  });
  close();
};

watch(isOpen, (open) => {
  if (!open) {
    expanded.value = false;
    ready.value = false;
    window.clearTimeout(placeTimer);
    return;
  }
  if (payload.value) {
    left.value = payload.value.x;
    top.value = payload.value.y;
    schedulePlace();
  }
  nextTick(() => bindPicker(pickerEl.value));
});

watch(
  () => [payload.value?.messageId, payload.value?.x, payload.value?.y] as const,
  () => {
    if (!isOpen.value || !payload.value) {
      return;
    }
    left.value = payload.value.x;
    top.value = payload.value.y;
    schedulePlace();
  },
);

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key !== "Escape") {
    return;
  }
  if (expanded.value) {
    collapse();
    return;
  }
  close();
};

const onScroll = (event: Event): void => {
  const target = event.target;
  if (target instanceof Element && target.closest(".chat-ctx, emoji-picker")) {
    return;
  }
  if (ready.value) {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("resize", close);
  window.addEventListener("scroll", onScroll, true);
});

onBeforeUnmount(() => {
  window.clearTimeout(placeTimer);
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("resize", close);
  window.removeEventListener("scroll", onScroll, true);
});
</script>

<style lang="scss" scoped src="./ChatContextMenu.scss"></style>
