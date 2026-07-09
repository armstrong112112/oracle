<template>
  <div>
    <P2PHome />
  </div>
</template>

<script setup lang="ts">
import P2PHome from "~/widgets/p2p/P2PHome/index.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Define layout
definePageMeta({
  layout: "sidebar",
});
</script>

<style scoped></style>
