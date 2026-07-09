<template>
  <div class="transaction-notifications">
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
      <template v-for="(group, date) in groupedNotifications">
        <div class="date-header">{{ date }}</div>

        <div
          v-for="notification in group"
          :key="notification.id"
          class="notification-item">
          <div class="notification-content">
            <div class="notification-main-row">
              <div class="notification-main-title">
                {{ $t("notifications." + notification.title) }}
              </div>
              <div class="notification-time">{{ notification.timestamp }}</div>
            </div>
            <div v-if="notification.subtitle" class="notification-subtitle">
              {{ $t("notifications." + notification.subtitle) }}
            </div>
            <div v-if="notification.alert" class="notification-alert">
              {{ $t("notifications." + notification.alert) }}
            </div>
            <div class="notification-alert"></div>
            <div v-if="notification.action" class="action-button-row">
              <div class="action-button">
                {{ $t("notifications." + notification.action) }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  accountData,
  type AccountNotificationItem,
} from "~/entities/notification/data/account";

const { t } = useI18n();

const activeTab = ref("all");
const tabs = [
  { id: "all", name: "All" },
  { id: "buy", name: "Buy" },
  { id: "sell", name: "Sell" },
  { id: "disputes", name: "Disputes" },
  { id: "emergency", name: "Emergency" },
];

const notificationData = accountData;

const filteredNotifications = computed((): AccountNotificationItem[] => {
  if (activeTab.value === "all") {
    return notificationData;
  }

  return notificationData.filter(
    (notification) => notification.category === activeTab.value.toLowerCase()
  );
});

const groupedNotifications = computed(
  (): {
    [key: string]: AccountNotificationItem[];
  } => {
    const grouped: { [key: string]: AccountNotificationItem[] } = {};

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
.transaction-notifications {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #ffffff;
}

.notification-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  padding: 0 12px;
}

.tab {
  padding: 12px 16px;
  cursor: pointer;
  position: relative;
  color: #ffffff;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  white-space: nowrap;
}

.tab.active {
  color: #ff3b30;
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
  padding: 12px 16px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;
}

.notification-item {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.notification-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notification-main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-main-title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;
}

.notification-amount {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;
  text-align: right;
}

.notification-subtitle {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: rgba(255, 255, 255, 0.7);
}

.notification-time {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  color: #7a74ba;
}

.notification-chips {
  border: 1px solid #2b2741;
  background: #181720;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  color: #7a74ba;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0;
  border-radius: 12px;
  width: fit-content;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: #ffffff;
}

.action-button-row {
  display: flex;
  justify-content: space-between;
}

.action-button {
  background-color: #ff3b30;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 6px 12px;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.notification-alert {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #ff3b30;
}
</style>
