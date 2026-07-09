<template>
  <div
    class="flex flex-col gap-24 justify-between h-dvh notification mt-0 pb-0 pt-0"
  >
    <div class="flex flex-col gap-24">
      <PageHeader :title="$t('escrow.escrowCreating')" />
      <div class="py-16 flex flex-col gap-24">
        <EscrowCreatingContent :show-footer="true" :is-modal="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '~/widgets/notifications/pageHeader.vue'
import EscrowCreatingContent from '~/components/escrow-creating-content.vue'

definePageMeta({ layout: 'sidebar' })
</script>

<style scoped>
.escrow-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #000;
  z-index: 999;
}
</style>
