<template>
  <div class="verification_dialog">
    <transition name="slide-left">
      <div
        v-if="isOpen"
        class="verification-dialog-overlay"
        @click.self="close">
        <div class="preview_dialog">
          <div class="preview_dialog_title">{{ title }}</div>
          <img class="preview_image" :src="image" alt="" />
          <div class="preview_dialog_description" v-html="description"></div>
          <div class="flex flex-col mt-20 gap-10 w-full">
            <CustomButton
              v-for="(button, index) in buttons"
              :key="index"
              :value="button.text"
              :type="button.type"
              @click="button.action ? button.action() : close" />
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
type ButtonType =
  | "primary"
  | "outline"
  | "secondary"
  | "confirm"
  | "grey"
  | "transparent"
  | "blur";

interface Button {
  text: string;
  type: ButtonType;
  action?: () => void;
}

interface Props {
  isOpen?: boolean;
  close?: () => void;
  title: string;
  description: string;
  image: string;
  buttons: Button[];
}

const props = withDefaults(defineProps<Props>(), {
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
.preview_dialog {
  max-width: 350px;
  width: 100%;
  background: #1e1d26;
  border-radius: 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
}
.preview_dialog_title {
  font-family: Hanson, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  text-transform: uppercase;
  color: white;
}
.preview_image {
  width: 97px;
  height: 97px;
}
.preview_dialog_description {
  font-family: Reza Zulmi Alfaizi Sans, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: 0;
  text-align: center;
  color: white;
  opacity: 0.4;
}
</style>
