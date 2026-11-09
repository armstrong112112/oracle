import type { Ref } from "vue";
import { useChatDesktop } from "~/entities/chat/lib/use-chat-desktop";
import { unwrapVacEvent } from "~/entities/chat/lib/to-vac";
import { VAC_MESSAGE_WRAPPER, closestInPath } from "~/entities/chat/lib/vac-shadow";
import { ChatModalName } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";
import type {
  ChatContextMenuPayload,
  VacDeleteMessagePayload,
  VacEditMessagePayload,
  VacFetchMessagesPayload,
  VacReactionPayload,
  VacSendMessagePayload,
} from "~/entities/chat/model";

type VacHost = HTMLElement & { messages?: string; messagesLoaded?: string };

interface VacEventsOptions {
  roomsListOpen: Ref<boolean>;
  openRoomOnLoad: Ref<boolean>;
  syncSoon: () => void;
  canSelect: (messageId: string) => boolean;
  rememberMedia: (event: Event) => void;
  onOpenFile: (event: Event) => void;
  onBind: (el: HTMLElement) => void;
  onUnbind: (el: HTMLElement) => void;
}

const LISTENER_OPTIONS: AddEventListenerOptions = { capture: true };

export const useVacEvents = (vacEl: Ref<HTMLElement | null>, options: VacEventsOptions) => {
  const store = useChatUiStore();
  const desktop = useChatDesktop();

  const withActiveRoom = <T extends { roomId?: string }>(payload: T): T => ({
    ...payload,
    roomId: payload?.roomId || store.activeRoomId || "",
  });

  const clearThread = (): void => {
    const el = vacEl.value as VacHost | null;
    if (!el) {
      return;
    }
    el.messages = "[]";
    el.messagesLoaded = "false";
    el.setAttribute("messages", "[]");
    el.setAttribute("messages-loaded", "false");
  };

  const wrapperOf = (event: Event): HTMLElement | null => closestInPath(event, VAC_MESSAGE_WRAPPER);

  const listeners: Record<string, (event: Event) => void> = {
    "fetch-messages": (event) => {
      const payload = unwrapVacEvent<VacFetchMessagesPayload>(event);
      const roomId = payload?.room?.roomId;
      if (!roomId) {
        return;
      }
      const reset = payload.options?.reset !== false;
      store.fetchRoomMessages(roomId, { reset });
      options.roomsListOpen.value = false;
      options.openRoomOnLoad.value = false;
      if (reset) {
        clearThread();
      }
      options.syncSoon();
    },
    "toggle-rooms-list": (event) => {
      const opened = Boolean(unwrapVacEvent<{ opened?: boolean }>(event)?.opened);
      options.roomsListOpen.value = opened;
      if (opened) {
        store.hideThread();
        clearThread();
      }
      options.syncSoon();
    },
    "send-message": (event) => store.sendMessage(withActiveRoom(unwrapVacEvent<VacSendMessagePayload>(event))),
    "edit-message": (event) => store.editMessage(withActiveRoom(unwrapVacEvent<VacEditMessagePayload>(event))),
    "delete-message": (event) => store.deleteMessage(withActiveRoom(unwrapVacEvent<VacDeleteMessagePayload>(event))),
    "send-message-reaction": (event) => store.toggleReaction(withActiveRoom(unwrapVacEvent<VacReactionPayload>(event))),
    "room-info": (event) => {
      const roomId = unwrapVacEvent<{ room?: { roomId?: string } }>(event)?.room?.roomId || store.activeRoomId;
      if (roomId) {
        store.openModal(ChatModalName.ChatCard, { roomId });
      }
    },
    click: (event) => {
      if (!store.isSelecting) {
        options.rememberMedia(event);
        return;
      }
      const id = wrapperOf(event)?.id;
      if (id && options.canSelect(id)) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    contextmenu: (event) => {
      const wrapper = wrapperOf(event);
      if (!wrapper) {
        return;
      }
      event.preventDefault();
      if (store.isSelecting) {
        return;
      }
      event.stopPropagation();
      const roomId = store.activeRoomId;
      if (!roomId || !options.canSelect(wrapper.id)) {
        return;
      }
      const mouse = event as MouseEvent;
      const payload: ChatContextMenuPayload = { x: mouse.clientX, y: mouse.clientY, roomId, messageId: wrapper.id };
      store.openModal(ChatModalName.ContextMenu, payload);
    },
    "open-file": options.onOpenFile,
  };

  let bound: HTMLElement | null = null;

  const bind = (el: HTMLElement): void => {
    if (bound === el) {
      return;
    }
    bound = el;
    for (const [name, listener] of Object.entries(listeners)) {
      el.addEventListener(name, listener, LISTENER_OPTIONS);
    }
    options.onBind(el);
  };

  const unbind = (el: HTMLElement): void => {
    if (bound === el) {
      bound = null;
    }
    for (const [name, listener] of Object.entries(listeners)) {
      el.removeEventListener(name, listener, LISTENER_OPTIONS);
    }
    options.onUnbind(el);
  };

  watch(vacEl, (el, previous) => {
    if (previous) {
      unbind(previous);
    }
    if (el) {
      bind(el);
    }
    options.syncSoon();
  });

  onMounted(() => {
    void nextTick(() => {
      if (vacEl.value) {
        bind(vacEl.value);
      }
      const roomId = store.activeRoomId || (desktop.value ? store.visibleRooms[0]?.roomId : null);
      if (roomId) {
        store.fetchRoomMessages(roomId);
        options.openRoomOnLoad.value = false;
        if (!desktop.value) {
          options.roomsListOpen.value = false;
        }
      }
    });
  });

  onBeforeUnmount(() => {
    if (vacEl.value) {
      unbind(vacEl.value);
    }
  });
};
