import { ref } from "vue";
import type { ChatDraftContext, ChatModalName, ChatUiModal } from "~/entities/chat/model";

export const createChatUi = () => {
  const modal = ref<ChatUiModal>({ name: null, payload: null });
  const draftContext = ref<ChatDraftContext | null>(null);

  const openModal = (name: ChatModalName, payload: unknown = null): void => {
    modal.value = { name, payload };
  };

  const closeModal = (): void => {
    modal.value = { name: null, payload: null };
  };

  const setDraftContext = (next: ChatDraftContext | null): void => {
    draftContext.value = next;
  };

  return {
    modal,
    draftContext,
    openModal,
    closeModal,
    setDraftContext,
  };
};
