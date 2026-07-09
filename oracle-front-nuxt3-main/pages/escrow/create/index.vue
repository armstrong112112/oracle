<template>
  <div
    class="flex flex-col gap-24 justify-between h-dvh notification mt-0 pb-0 pt-0"
  >
    <div class="flex flex-col gap-24">
      <PageHeader :title="$t('escrow.newEscrowRoom')" />
      <div class="py-16 flex flex-col gap-24">
        <EscrowCreateContent :show-footer="true" :is-modal="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '~/widgets/notifications/pageHeader.vue'
import EscrowCreateContent from '~/components/escrow-create-content.vue'

definePageMeta({ layout: 'sidebar' })
</script>
