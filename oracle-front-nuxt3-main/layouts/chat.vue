<template>
  <div class="chat-layout" :class="{ 'is-chat': showChat }">
    <ChatApp v-if="showChat" />
    <div v-if="modal" class="chat-settings-popup">
      <SlotModal :is-open="true" :close="closeSettings">
        <NuxtPage :page-key="pageKey" />
      </SlotModal>
    </div>
    <NuxtPage v-else-if="!isSettings || ready" :page-key="pageKey" />
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import SlotModal from "~/components/ui/SlotModal.vue";
import { ChatRoute } from "~/entities/chat/config";
import { useChatDesktop } from "~/entities/chat/lib/use-chat-desktop";
import { useChatNav } from "~/features/chat/chat-nav";
import ChatApp from "~/widgets/chat/ChatApp/index.vue";

const route = useRoute();
const { go } = useChatNav();
const wide = useChatDesktop();
const ready = ref(false);

const isSettings = computed(() => /(?:^|\/)chat\/settings(?:\/|$)/.test(route.path));
const modal = computed(() => isSettings.value && ready.value && wide.value);
const showChat = computed(() => !isSettings.value || modal.value);

const closeSettings = (): void => {
  void go(ChatRoute.Chat);
};

const pageKey = (route: { path: string }): string =>
  route.path.includes("/chat/settings") ? "/chat/settings" : route.path;

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape" && modal.value && !event.defaultPrevented) {
    closeSettings();
  }
};

useEventListener("keydown", onKeydown);
onMounted(() => {
  ready.value = true;
});
</script>

<style lang="scss" scoped src="~/assets/styles/layouts/chat.scss"></style>
