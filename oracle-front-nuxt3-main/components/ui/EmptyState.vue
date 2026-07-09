<template>
  <div class="state-card empty-state">
    <div class="state-icon" aria-hidden="true">{{ icon }}</div>
    <p class="title">{{ title }}</p>
    <p class="message">{{ message }}</p>
    <Button
      v-if="actionLabel"
      :value="actionLabel"
      type="secondary"
      size="sm"
      class="state-action"
      @click="emit('action')"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";

const emit = defineEmits<{ action: [] }>();

withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    icon?: string;
    actionLabel?: string;
  }>(),
  {
    title: "No data",
    message: "Nothing to display yet.",
    icon: "•",
    actionLabel: "",
  }
);
</script>

<style scoped>
.state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px;
  border: 1px dashed #2b2741;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  text-align: center;
}

.state-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #f64e2a;
  font-size: 20px;
  font-weight: 700;
}

.title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.message {
  color: #b2aaf9;
  font-size: 14px;
  line-height: 1.45;
  margin: 0;
}

.state-action {
  margin-top: 4px;
  min-width: 140px;
}
</style>
