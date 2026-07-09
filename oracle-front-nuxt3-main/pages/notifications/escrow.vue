<template>
  <div>
    <div class="notification notification-container p-0 mt-0">
      <PageHeader :title="$t('notifications.escrowNotifications')" />
      <escrow-notifications />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '~/widgets/notifications/pageHeader.vue'
import EscrowNotifications from '~/entities/notification/ui/Notifications/escrowNotifications.vue'
import HeaderOracle from '~/components/header-oracle.vue'

// Set layout for notifications
definePageMeta({
  layout: 'sidebar'
})
</script>

<style lang="scss">
@media (min-width: 1024px) {
  .notification-container {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
