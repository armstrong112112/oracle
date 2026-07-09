<template>
  <div class="slot-modal" v-if="props.isOpen">
    <div class="slot-modal__overlay" @click.self="props.close"></div>
    <div class="slot-modal__container">
      <img
        class="slot-modal__close"
        src="/icons/verification/white_close.svg"
        alt="Close"
        @click="props.close" />
      <div class="slot-modal__scroll">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from "vue";

interface Props {
  isOpen?: boolean;
  close: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

function lockScroll() {
  if (import.meta.client) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
  }
}

function unlockScroll() {
  if (import.meta.client) {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  }
}

onMounted(() => {
  if (props.isOpen) lockScroll();
});

onBeforeUnmount(() => {
  unlockScroll();
});

watch(
  () => props.isOpen,
  (next) => {
    next ? lockScroll() : unlockScroll();
  }
);
</script>

<style lang="scss" scoped>
.slot-modal__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
}
.slot-modal__container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  background: #0a090f;
  border-radius: 12px;
  padding: 16px;
  z-index: 2000;
}
.slot-modal__scroll {
  flex: 1 1 auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /* Scrollbar styling */
  scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.06);
  scrollbar-width: thin;
}
.slot-modal__scroll::-webkit-scrollbar {
  width: 8px;
}
.slot-modal__scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}
.slot-modal__scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
}
.slot-modal__scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.35);
}
.slot-modal__close {
  position: absolute;
  top: 12px;
  right: calc(8px + 16px);
  width: 30px;
  height: 30px;
  cursor: pointer;
}

@media (min-width: 1024px) {
  ::v-deep .form-footer {
    background: transparent !important;
    border-top: none !important;
    position: static !important;
    bottom: auto !important;
  }
}
</style>
