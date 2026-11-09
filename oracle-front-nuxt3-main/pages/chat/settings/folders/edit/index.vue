<template>
  <ChatFolderForm :mode="FolderDraftMode.Edit" />
</template>

<script setup lang="ts">
import { FolderDraftMode } from "~/entities/chat/model";
import ChatFolderForm from "~/widgets/chat/ChatFolderForm/index.vue";
</script>
