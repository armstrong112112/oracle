<template>
  <div class="detail">
    <div v-for="group in notificationGroupsList" :key="group.id">
      <div
        v-for="(notification, index) in group.notifications"
        :key="notification.id || index"
        class="notification_detail">
        <img
          src="/assets/svg/logo.png"
          class="notification-detail-logo"
          alt="Logo" />
        <div class="notification_detail_card">
          <div class="notification_detail_card_title">
            {{ notification.title }}
          </div>
          <div class="notification_detail_card_message">
            {{ notification.message }}
          </div>
          <div class="notification_detail_card_time">
            {{ notification.time }}
          </div>
        </div>
      </div>
      <notification-date v-if="group.date" :date="group.date" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { notificationGroups } from "~/entities/notification/data/notificationGroups";
import type { NotificationGroup } from "~/entities/notification/model/types";
import NotificationDate from "~/widgets/notifications/NotificationDate/index.vue";

interface Props {
  type: string;
}

defineProps<Props>();

const notificationGroupsList = computed((): NotificationGroup[] => {
  return notificationGroups;
});
</script>

<style lang="scss">
$color_1: white;
$font-family_1: Reza Zulmi Alfaizi Sans;

.detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.notification_detail {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
}
.notification_detail_card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 12px;
  padding: 10px 14px;
  gap: 6px;
  background: #121119;
  color: $color_1;
}
.notification_detail_card_title {
  font-family: $font-family_1;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
.notification_detail_card_message {
  font-family: $font-family_1;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  opacity: 80%;
}
.notification_detail_card_time {
  font-family: $font-family_1;
  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  text-align: right;
  opacity: 40%;
}
.notification-detail-logo {
  width: 32px;
  height: 32px;
}
</style>
