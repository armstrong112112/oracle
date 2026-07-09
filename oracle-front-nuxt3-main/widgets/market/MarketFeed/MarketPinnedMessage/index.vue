<template>
  <div class="market-pinned-message" @click="emit('click')">
    <div class="market-line"></div>
    <img src="/icons/market/placeholder.svg" alt="" />
    <div class="pinned-message-col">
      <div class="pinned-message-col-title">Pinned message</div>
      <div class="pinned-message-col-description">
        Lorem ipsum dolor sit amet consectetur adipiscing
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  click: [];
}>();
</script>

<style lang="scss">
$primary-color: #f64e2a;
.market-pinned-message {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  gap: 8px;
  cursor: pointer;
}
.market-line {
  width: 1px;
  height: 32px;
  background: $primary-color;
}
.pinned-message-col {
  display: flex;
  flex-direction: column;
}
.pinned-message-col-title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: $primary-color;
}
.pinned-message-col-description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
}
</style>
