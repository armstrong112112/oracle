<template>
  <div>
    {{ timestamp }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  timestamp: string;
}>();
</script>

<style scoped></style>
