<template>
  <div class="verification_dialog">
    <transition name="slide-left">
      <div
        v-if="isOpen"
        class="verification-dialog-overlay"
        @click.self="close">
        <div class="my_dialog">
          <img
            class="my_close"
            src="/icons/verification/dialog-close.svg"
            alt="Close"
            @click="close" />
          <div class="my_dialog_title" v-html="title"></div>
          <div class="my_dialog_description" v-html="description"></div>
          <div class="flex items-center justify-between gap-10">
            <CustomButton value="back" type="outline" @click="close()" />
            <CustomButton value="cancel" type="primary" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { onBeforeUnmount, onMounted } from "vue";

// Props
interface Props {
  title?: string;
  description?: string;
  isOpen?: boolean;
  close?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  isOpen: false,
  close: undefined,
});

// Methods
const handleEsc = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.isOpen) {
    props.close?.();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("keydown", handleEsc);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEsc);
});
</script>

<style lang="scss">
.verification-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: all 0.3s ease-out;
}
.my_dialog {
  max-width: 343px;
  width: 100%;
  background: #19191f;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}
.my_close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.my_dialog_title {
  font-family: Hanson, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  text-transform: uppercase;
  color: white;
}
.my_dialog_description {
  font-family: "Reza Zulmi Alfaizi Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.3s ease;
}
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}
</style>
