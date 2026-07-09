<template>
  <div class="notification-date">{{ date }}</div>
</template>

<script setup lang="ts">
interface Props {
  date: string;
}

defineProps<Props>();
</script>

<style>
.notification-date {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 10px 0;
  gap: 10px;
  border-radius: 100px;
  font-family: Reza Zulmi Alfaizi Sans;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: white;
}
</style>
