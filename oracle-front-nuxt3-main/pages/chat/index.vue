<template>
  <span class="chat-route" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "chat",
});

const { t } = useI18n();

useHead({
  title: computed(() => t("chat.pageTitle")),
});
</script>

<style lang="scss" scoped>
.chat-route {
  display: none;
}
</style>
