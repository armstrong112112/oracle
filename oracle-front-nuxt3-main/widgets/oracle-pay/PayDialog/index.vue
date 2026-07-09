<template>
  <transition name="slide-left">
    <div v-if="isVisible" class="rename_dialog">
      <!--    <div class="dialog_overlay" @click="cancelAction"></div>-->
      <div class="rename_dialog_overlay"></div>
      <div class="pay_dialog_card">
        <div></div>
        <div class="flex flex-col gap-20">
          <div class="pay_dialog_title">{{ title }}</div>
          <div class="dialog_description">
            {{ $t("pay.removeAccessWarning") }}
          </div>
        </div>
        <div class="dialog_buttons flex flex-col gap-10">
          <CustomButton
            :value="buttonText"
            type="primary"
            class="text-14"
            @click="confirmAction" />
          <CustomButton
            :value="$t('pay.cancel')"
            type="outline"
            class="text-14"
            @click="cancelAction" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

interface Props {
  title: string;
  buttonText: string;
  isVisible?: boolean;
}

withDefaults(defineProps<Props>(), {
  isVisible: false,
});

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();

const cancelAction = (): void => {
  emit("close");
};

const confirmAction = (): void => {
  emit("confirm");
};
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
</style>
