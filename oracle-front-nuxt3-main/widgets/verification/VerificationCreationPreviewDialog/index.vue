<template>
  <div class="verification_dialog">
    <transition name="slide-left">
      <div
        v-if="isOpen"
        class="verification-dialog-overlay"
        @click.self="onClose">
        <div class="dialog_container">
          <img
            class="dialog_close"
            src="/icons/verification/white_close.svg"
            alt="Close"
            @click="onClose" />
          <div class="dialog_scroll">
            <VerificationCreationPreview
              :verification-data-prop="verificationData"
              :verification-creation-list-data-prop="
                verificationCreationListData
              " />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import VerificationCreationPreview from "@/entities/verification/ui/VerificationCreationPreview/index.vue";
import { onBeforeUnmount, onMounted } from "vue";

// Props
interface Props {
  isOpen?: boolean;
  close: () => void;
  verificationData: any;
  verificationCreationListData: any;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

// Methods
const handleEsc = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.isOpen) {
    props.close();
  }
};

const onClose = () => {
  props.close();
};

// Lifecycle
onMounted(() => {
  document.addEventListener("keydown", handleEsc);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEsc);
});
</script>

<style lang="scss" scoped>
.verification_dialog {
  --scrollbar-width: 8px;
}
.verification-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2000;
  overflow-y: auto;
  padding: 24px;
}
.dialog_container {
  background: #0a090f;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 70vh;
  padding: 16px;
  /* reserve space near scrollbar */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}
.dialog_scroll {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1 1 auto;
  /* Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.06);
  scrollbar-width: thin;
}
.dialog_scroll::-webkit-scrollbar {
  width: var(--scrollbar-width);
}
.dialog_scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}
.dialog_scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
}
.dialog_scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.35);
}
.dialog_close {
  position: absolute;
  top: 12px;
  right: calc(var(--scrollbar-width) + 16px); /* keep icon left of scrollbar */
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  /* Remove footer background and border inside popup on desktop */
  ::v-deep .form-footer {
    background: transparent !important;
    border-top: none !important;
    position: static !important;
    bottom: auto !important;
  }
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
