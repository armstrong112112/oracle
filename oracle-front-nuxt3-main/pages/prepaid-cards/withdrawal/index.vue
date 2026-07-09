<template>
  <div
    class="whitelist notification p-0 mt-0 flex flex-col gap-24 relative h-dvh">
    <div class="flex flex-col gap-12">
      <PageHeader :title="$t('cards.withdrawal')" />
    </div>
    <PrePaidWithdrawalContent :show-footer="true" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import PrePaidWithdrawalContent from "~/widgets/prepaid-cards/PrePaidWithdrawalContent.vue";

// Layout
definePageMeta({
  layout: "sidebar",
});

// Composables
</script>
<style lang="scss" scoped>
.prepaid_cards_swiper {
  margin-top: 0;
}
.card-detail-footer-btn {
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0;
  right: 0;
}
.m-auto {
  margin: 0 auto;
  cursor: pointer;
}
</style>
