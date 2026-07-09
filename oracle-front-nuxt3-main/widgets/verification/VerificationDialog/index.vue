<template>
  <transition name="slide-left">
    <div v-if="isOpen" class="rename_dialog">
      <!--    <div class="dialog_overlay" @click="cancelAction"></div>-->
      <div class="rename_dialog_overlay"></div>
      <div class="pay_dialog_card">
        <div></div>
        <div class="flex flex-col gap-20 justify-center">
          <img
            v-if="type === 'question'"
            src="/icons/verification/info.svg"
            class="dialog_center_icon"
            alt="" />
          <img
            v-if="type === 'accept'"
            src="/icons/verification/accept.svg"
            class="dialog_center_icon"
            alt="" />
          <img
            v-if="type === 'error'"
            src="/icons/verification/error.svg"
            class="dialog_center_icon"
            alt="" />
          <img
            v-if="type === 'success'"
            src="/icons/verification/success.svg"
            class="dialog_center_icon"
            alt="" />
          <img
            v-if="type === 'trial'"
            src="/icons/verification/trial.svg"
            class="dialog_center_icon"
            alt="" />
          <img
            v-if="type === 'deposit'"
            src="/icons/verification/deposit.svg"
            class="dialog_center_icon"
            alt="" />
          <img
            v-if="type === 'block'"
            src="/icons/verification/blocked.svg"
            class="dialog_center_icon"
            alt="" />
          <img
            v-if="type === 'remove'"
            src="/icons/verification/remove.svg"
            class="dialog_center_icon"
            alt="" />
          <div v-if="title" class="pay_dialog_title" v-html="$t(title)"></div>
          <div
            v-if="description"
            class="dialog_description"
            v-html="$t(description)"></div>
          <div v-if="successText" class="success_text">{{ successText }}</div>
          <div v-if="equality" class="equality">{{ equality }}</div>
        </div>
        <div class="dialog_buttons flex flex-col gap-10">
          <CustomButton
            v-if="isEscrowDecline"
            :value="escrowButtonText"
            :type="escrowButtonType"
            class="text-14"
            @click="primaryClick" />
          <CustomButton
            :value="translatedButtonText"
            :type="primaryButtonType"
            class="text-14"
            @click="primaryClick" />
          <CustomButton
            v-if="isCancel"
            :value="translatedCancelText"
            :type="buttonType"
            class="text-14"
            @click="close" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useI18n } from "vue-i18n";

// Props
export type ButtonType =
  | "primary"
  | "outline"
  | "secondary"
  | "confirm"
  | "grey"
  | "transparent"
  | "blur";

interface Props {
  title?: string;
  description?: string;
  equality?: string;
  isOpen?: boolean;
  isCancel?: boolean;
  type?: string;
  buttonText?: string;
  buttonType?: ButtonType;
  primaryButtonType?: ButtonType;
  escrowButtonType?: ButtonType;
  escrowButtonText?: string;
  isEscrowDecline?: boolean;
  successText?: string;
  cancelText?: string;
  close?: () => void;
  confirm?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  equality: undefined,
  isOpen: false,
  isCancel: true,
  type: undefined,
  buttonText: "Okay",
  buttonType: "outline",
  primaryButtonType: "primary",
  escrowButtonType: "grey",
  escrowButtonText: "Back",
  isEscrowDecline: false,
  successText: undefined,
  cancelText: "Try again",
  close: undefined,
  confirm: undefined,
});

const { t } = useI18n();

// Computed
const translatedButtonText = computed(() => {
  if (!props.buttonText) return "Okay";
  // If buttonText looks like a translation key (contains dots), translate it
  if (props.buttonText.includes(".")) {
    try {
      return t(props.buttonText) || props.buttonText;
    } catch {
      return props.buttonText;
    }
  }
  return props.buttonText;
});

const translatedCancelText = computed(() => {
  if (!props.cancelText || props.cancelText === "") return "";
  // If cancelText looks like a translation key (contains dots), translate it
  if (props.cancelText.includes(".")) {
    try {
      return t(props.cancelText) || props.cancelText;
    } catch {
      return props.cancelText;
    }
  }
  return props.cancelText;
});

// Methods
const handleEsc = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.isOpen) {
    props.close?.();
  }
};

const primaryClick = () => {
  if (props.type === "success" || props.type === "block") {
    props.confirm?.();
  } else {
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
.rename_dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 12px;
  z-index: 1999;
  flex-direction: column;
}

.pay_dialog_card {
  border-radius: 8px;
  position: relative;
  z-index: 1998;
  max-width: 400px;
  width: 90%;
  padding: 30px 16px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.pay_dialog {
  padding: 12px;
}
.pay_dialog_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  text-transform: initial;
  color: white;
}
.dialog_description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
.rename_dialog_overlay {
  background: #00000099;
  backdrop-filter: blur(35.4px);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
.dialog_center_icon {
  width: 64px;
  height: 64px;
  margin: 0 auto;
}
.success_text {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #31f62a;
}
.equality {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: white;
}
</style>
