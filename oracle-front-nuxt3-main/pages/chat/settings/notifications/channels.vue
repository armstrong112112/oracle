<template>
  <ChatNotificationCategory :kind="NotificationKind.Channels" />
</template>

<script setup lang="ts">
import { NotificationKind } from "~/entities/chat/model";
import ChatNotificationCategory from "~/widgets/chat/ChatNotificationCategory/index.vue";
</script>
