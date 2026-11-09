<template>
  <ChatNotificationCategory :kind="NotificationKind.Groups" />
</template>

<script setup lang="ts">
import { NotificationKind } from "~/entities/chat/model";
import ChatNotificationCategory from "~/widgets/chat/ChatNotificationCategory/index.vue";
</script>
