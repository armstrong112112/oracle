<template>
  <div class="h-full">
    <P2PListing />
  </div>
</template>

<script setup lang="ts">
import P2PListing from "~/widgets/p2p/P2PListing/index.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Define layout
definePageMeta({
  layout: "sidebar",
});
</script>

<style>
.main-content {
  height: 100%;
}
</style>
