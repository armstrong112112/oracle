<template>
  <div class="notifications-page">
    <div>
      <div class="notification">
        <div class="go-back" @click="goBack">
          <img :src="`/svg/arrow-back.svg`" alt="" />
          <nuxt-link
            class="notification-title"
            :to="localePath('/notifications')"
            >notifications</nuxt-link
          >
        </div>
        <NotificationsList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotificationsList from "@/widgets/notifications/NotificationsList/index.vue";

const localePath = useLocalePath();

const goBack = () => {
  const router = useRouter();
  router.go(-1);
};

definePageMeta({
  layout: "sidebar",
});
</script>
