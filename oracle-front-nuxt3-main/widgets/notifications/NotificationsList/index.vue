<template>
  <div class="notifications-list">
    <div class="notifications-content">
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.route"
        :notification="notification" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { notificationList } from "@/entities/notification/data/notificationList";
import type { NotificationListType } from "@/entities/notification/model/types";
import NotificationCard from "@/entities/notification/ui/NotificationCard/index.vue";

const notifications: NotificationListType[] = notificationList;
</script>
<style lang="scss">
.notifications-list {
  margin-top: 20px;
  padding: 0 12px;
}
.notifications-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
