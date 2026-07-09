<template>
  <div
    class="whitelist notification p-0 mt-0 flex flex-col gap-24 h-dvh relative">
    <div class="flex flex-col gap-12">
      <PageHeader :title="$t('cards.newCards')" />
    </div>
    <PrePaidNewCardContent :show-footer="true" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import PrePaidNewCardContent from "~/widgets/prepaid-cards/PrePaidNewCardContent.vue";

// Layout
definePageMeta({
  layout: "sidebar",
});

// Composables
</script>
<style lang="scss" scoped>
// Стили перенесены в PrePaidNewCardContent компонент
</style>
