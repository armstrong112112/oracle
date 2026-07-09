<template>
  <div>
    <P2PEdit />
  </div>
</template>

<script setup lang="ts">
import P2PEdit from "~/widgets/p2p/P2PEdit/index.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Define layout
definePageMeta({
  layout: "",
});
</script>

<style scoped></style>
