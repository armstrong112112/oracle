<template>
  <div
    class="flex flex-col gap-24 justify-between h-dvh notification mt-0 pb-0 pt-0"
  >
    <div class="flex flex-col gap-24">
      <PageHeader :title="$t('escrow.overview')" />
      <div class="py-16 flex flex-col gap-24">
        <EscrowOverviewContent :show-footer="true" :is-modal="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '~/widgets/notifications/pageHeader.vue'
import EscrowOverviewContent from '~/components/escrow-overview-content.vue'

definePageMeta({ layout: 'sidebar' })
</script>

<style scoped>
.escrow-overview-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #14131b;
  z-index: 222;
  border-top: 1px solid #2b2741;
}
.escrow-overview-footer-fee {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #bfb7ff;
}
.escrow-overview-footer-price {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #ffffff;
}
</style>
