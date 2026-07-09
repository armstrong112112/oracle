<template>
  <div class="announcement-notifications">
    <div class="notification-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="setActiveTab(tab.id)">
        {{ $t("notifications." + tab.id) }}
      </div>
    </div>

    <div class="notifications-list">
      <template v-for="(group, date) in groupedNotifications" :key="date">
        <div  class="date-header">{{ date }}</div>

        <div
          v-for="notification in group"
          :key="notification.id"
          :class="['notification-item', { unread: !notification.read }]">
          <div class="notification-icon">
            <img :src="notification.icon" alt="Notification icon" />
          </div>
          <div class="notification-content">
            <div class="notification-main-title">
              {{ $t("notifications." + notification.title) }}
            </div>
            <div class="notification-time">{{ notification.timestamp }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  announcementData,
  type NotificationItem,
} from "~/entities/notification/data/announcementData";

const { t } = useI18n();

const activeTab = ref("all");
const notificationData: NotificationItem[] = announcementData;

const tabs = [
  { id: "all", name: "All" },
  { id: "updates", name: "Updates" },
  { id: "news", name: "News" },
];

const filteredNotifications = computed((): NotificationItem[] => {
  if (activeTab.value === "all") {
    return notificationData;
  }

  return notificationData.filter(
    (notification) => notification.category === activeTab.value
  );
});

const groupedNotifications = computed(
  (): {
    [key: string]: NotificationItem[];
  } => {
    const grouped: { [key: string]: NotificationItem[] } = {};

    filteredNotifications.value.forEach((notification) => {
      if (!grouped[notification.date]) {
        grouped[notification.date] = [];
      }

      grouped[notification.date].push(notification);
    });

    return grouped;
  }
);

const setActiveTab = (tabId: string): void => {
  activeTab.value = tabId;
};
</script>

<style scoped>
.announcement-notifications {
  display: flex;
  flex-direction: column;
  height: 100%;

  color: #ffffff;
}

.notification-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 12px;
}

.tab {
  padding: 12px 16px;
  cursor: pointer;
  position: relative;
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
}

.tab.active {
  color: #f64e2a;
}

.tab.active:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff3b30;
}

.notifications-list {
  flex: 1;
  overflow-y: auto;
}

.date-header {
  padding: 8px 16px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}

.notification-item {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.notification-item.unread {
}

.notification-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border-radius: 50%;
}

.notification-icon {
  width: 32px;
  height: 32px;
}

.notification-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notification-main-title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}

.notification-time {
  font-family: Roboto, sans-serif;
  color: #7a74ba;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
}
</style>
