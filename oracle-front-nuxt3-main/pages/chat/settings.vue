<template>
  <div class="chat-settings-shell" :class="{ 'is-modal': wide }">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useChatDesktop } from "~/entities/chat/lib/use-chat-desktop";

definePageMeta({
  layout: "chat",
});

const wide = useChatDesktop();
</script>

<style lang="scss">
.chat-settings-shell {
  min-height: 100dvh;
  background: var(--primary-1);
  color: var(--primary-3);
}

.chat-settings-shell.is-modal {
  min-height: 100%;
  background: transparent;
}

.chat-settings-shell .main-container {
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
}

@media (max-width: 1023px) {
  .chat-settings-shell .main-container {
    max-width: none;
  }
}
</style>
