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
      <template v-for="(group, date) in groupedNotifications" :key="date">
        <div  class="date-header">{{ date }}</div>

        <div
          v-for="notification in group"
          :key="notification.id"
          class="notification-item">
          <div class="notification-content">
            <div class="notification-main-row">
              <div class="notification-main-title">
                {{ $t("notifications." + notification.title) }}
              </div>
              <div v-if="notification.amount" class="notification-amount">
                {{ notification.amount }}
              </div>
            </div>

            <div v-if="notification.user" class="notification-user-info">
              <span class="transaction-direction">
                {{
                  $t(
                    "notifications." +
                      (notification.transactionType === "sent"
                        ? "sentTo"
                        : "receivedFrom")
                  )
                }}
              </span>
              <div class="user-avatar">
                <img
                  :src="notification.user.avatar"
                  :alt="notification.user.name" />
              </div>
              <span class="user-name">{{ notification.user.name }}</span>
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
  transactionsData,
  type TransactionNotificationItem,
} from "~/entities/notification/data/transactionsData";

const { t } = useI18n();

const activeTab = ref("all");
const notificationData: TransactionNotificationItem[] = transactionsData;

const tabs = computed(() => [
  { id: "all", name: t("notifications.all") },
  { id: "swap", name: t("swap.title") },
  { id: "internal_transfer", name: t("transfers.internalTransfer") },
]);

const filteredNotifications = computed((): TransactionNotificationItem[] => {
  if (activeTab.value === "all") {
    return notificationData;
  }

  return notificationData.filter(
    (notification) => notification.category === activeTab.value
  );
});

const groupedNotifications = computed(
  (): {
    [key: string]: TransactionNotificationItem[];
  } => {
    const grouped: { [key: string]: TransactionNotificationItem[] } = {};

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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
}

.notification-main-title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}

.notification-amount {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}

.notification-user-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.transaction-direction {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: rgba(255, 255, 255, 0.7);
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
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
