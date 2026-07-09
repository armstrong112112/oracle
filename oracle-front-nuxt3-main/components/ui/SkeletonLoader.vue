<template>
  <div class="skeleton" :style="{ width, height, borderRadius }"></div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    borderRadius?: string;
  }>(),
  {
    width: "100%",
    height: "16px",
    borderRadius: "8px",
  }
);
</script>

<style scoped>
.skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  background: #1b1a24;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  height: 100%;
  width: 150%;
  background: linear-gradient(
    90deg,
    rgba(27, 26, 36, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(27, 26, 36, 0) 100%
  );
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    left: 150%;
  }
}
</style>
