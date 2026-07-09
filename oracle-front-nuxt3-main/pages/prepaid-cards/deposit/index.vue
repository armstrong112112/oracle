<template>
  <div
    class="whitelist notification p-0 mt-0 flex flex-col gap-24 justify-between relative h-dvh">
    <div class="flex flex-col gap-24">
      <div class="flex flex-col gap-12">
        <PageHeader :title="$t('cards.deposit')" />
      </div>
      <PrePaidDepositContent :show-footer="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import PrePaidDepositContent from "~/widgets/prepaid-cards/PrePaidDepositContent.vue";

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
  position: sticky;
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
