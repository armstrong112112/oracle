<template>
  <transition name="slide-left">
    <div v-if="isOpen" class="rename_dialog">
      <!--    <div class="dialog_overlay" @click="cancelAction"></div>-->
      <div class="rename_dialog_overlay"></div>
      <div class="pay_dialog_card">
        <div></div>
        <div class="flex flex-col gap-38">
          <div class="flex flex-col gap-8 items-center justify-between">
            <div class="escrow_user">
              <img src="/avatars/barbara.png" class="escrow_ava" alt="" />
              <img
                v-if="fail"
                src="/icons/verification/error.svg"
                alt="selected"
                class="success_image" />
              <img
                v-else
                src="/icons/verification/success.svg"
                alt="selected"
                class="success_image" />
            </div>
            <div class="escrow_username">{{ username }}</div>
          </div>
          <div class="escrow_dialog_title" v-html="title"></div>
          <div class="escrow_dialog_description" v-html="description"></div>
          <div class="escrow_reminder_text">{{ reminderText }}</div>
        </div>
        <div class="dialog_buttons flex flex-col gap-10">
          <CustomButton
            :value="buttonText"
            :type="buttonType"
            class="text-14"
            @click="primaryClick" />
          <CustomButton
            v-if="isCancel"
            :value="cancelText"
            type="primary"
            class="text-14"
            @click="close" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
  equality?: string;
  isOpen?: boolean;
  isCancel?: boolean;
  fail?: boolean;
  type?: string | null;
  buttonText?: string;
  buttonType?: string;
  reminderText?: string | null;
  username?: string | null;
  cancelText?: string;
  close?: () => void;
  confirm?: () => void;
}>(), {
  isOpen: false,
  isCancel: true,
  fail: false,
  type: null,
  buttonText: 'Okay',
  buttonType: 'outline',
  reminderText: null,
  username: null,
  cancelText: 'Try again',
});

onMounted(() => {
  document.addEventListener("keydown", handleEsc);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEsc);
});

function handleEsc(event: KeyboardEvent) {
  if (event.key === "Escape" && props.isOpen) {
    props.close?.();
  }
}

function primaryClick() {
  if (props.type === "success" || props.type === "block") {
    props.confirm?.();
  } else {
    props.close?.();
  }
}
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
  z-index: 999;
  flex-direction: column;
}

.pay_dialog_card {
  border-radius: 8px;
  position: relative;
  z-index: 9;
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
  letter-spacing: 0%;
  text-align: center;
  color: white;
}

.escrow_user .escrow_ava {
  width: 67px;
  height: 67px;
}
.escrow_user {
  position: relative;
  width: 70px;
  height: 70px;
}
.success_image {
  width: 28px;
  height: 28px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.escrow_username {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.escrow_reminder_text {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: #f6c32a;
}
.escrow_dialog_description {
  font-family: Roboto;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
.escrow_dialog_title {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;

  color: white;
}
</style>
