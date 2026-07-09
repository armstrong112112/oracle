<template>
  <div>
    <div v-if="!loading && notification.route !== undefined">
      <NuxtLink
        :to="localePath(`/notifications/${notification.route}`)"
        class="notification-card">
        <div class="notification-main">
          <img
            :src="notification.image"
            :alt="notification.title"
            class="notification-main-image" />
          <div class="flex flex-col notification-main-col">
            <div class="notification-main-title">
              {{
                $t("notifications." + notification.title) || notification.title
              }}
            </div>
            <div class="notification-main-subtitle">
              {{ notification.subtitle }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-8">
          <div v-if="notification.badgeCount" class="notification-badgeCount">
            {{ notification.badgeCount }}
          </div>
          <div class="notification-date">
            {{ notification.date }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="notification-card">
      <div class="notification-main">
        <SkeletonLoader width="40px" height="40px" border-radius="8px" />
        <div class="flex flex-col notification-main-col gap-8">
          <SkeletonLoader width="120px" height="14px" border-radius="4px" />
          <SkeletonLoader width="90px" height="12px" border-radius="4px" />
        </div>
      </div>
      <div class="flex flex-col items-end gap-8">
        <SkeletonLoader width="12px" height="12px" border-radius="4px" />
        <SkeletonLoader width="60px" height="12px" border-radius="4px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NotificationListType } from "@/entities/notification/model/types";
import { onMounted, ref } from "vue";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";

const localePath = useLocalePath();

defineProps<{
  notification: NotificationListType;
}>();

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<style lang="scss">
.notification-card {
  display: flex;
  gap: 8px;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
  font-family: Roboto, sans-serif;
  text-decoration: none;
}
.notification-main {
  display: flex;
  align-items: center;
  gap: 12px;
}
.notification-main-image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}
.notification-main-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
}
.notification-main-subtitle {
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: #7a74ba;
}
.notification-date {
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: #b2aaf9;
}
.notification-badgeCount {
  background: #f64e2a;
  padding: 2px 6px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  color: white;
  width: fit-content;
}
</style>
