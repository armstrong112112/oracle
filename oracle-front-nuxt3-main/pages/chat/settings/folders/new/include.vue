<template>
  <ChatFolderPicker :kind="FolderPickerKind.Include" :mode="FolderDraftMode.New" />
</template>

<script setup lang="ts">
import { FolderDraftMode, FolderPickerKind } from "~/entities/chat/model";
import ChatFolderPicker from "~/widgets/chat/ChatFolderPicker/index.vue";
</script>
