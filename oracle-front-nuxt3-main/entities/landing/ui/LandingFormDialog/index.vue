<template>
  <transition name="slide-left">
    <div v-if="isVisible" class="rename_dialog">
      <div class="dialog_overlay" @click="cancelAction"></div>
      <div class="rename_dialog_overlay"></div>
      <div class="pay_dialog_card landing_modal_card">
        <div class="flex flex-col gap-24">
          <div class="flex flex-col gap-12">
            <div
              class="landing_dialog_header flex items-center justify-between">
              <div class="landing_dialog_header_title">Join Whitelist</div>
              <img
                class="cursor-pointer"
                src="/icons/landing/close.svg"
                alt=""
                @click="cancelAction" />
            </div>
            <img src="/icons/landing/whitelist.png" alt="" />
            <div class="landing_dialog_center_text">
              Be the First <br />
              Join Beta Whitelist
            </div>
          </div>
          <TheInput
            class="dialog_input"
            :is-remove="false"
            placeholder="Your Email"
            :value="email"
            @update:value="email = $event" />
        </div>

        <div class="dialog_buttons flex flex-col gap-10">
          <CustomButton
            value="Send"
            type="confirm"
            class="text-14 w-full"
            @click="cancelAction" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";

const props = defineProps<{ isVisible: boolean }>();
const emit = defineEmits<{ (e: "close"): void; (e: "confirm"): void }>();

const email = ref("");

function cancelAction(): void {
  emit("close");
}

function confirmAction(): void {
  emit("confirm");
}

const isVisible = computed(() => props.isVisible);
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
  justify-content: center;
}

.pay_dialog_card {
  border-radius: 8px;
  position: relative;
  z-index: 9;
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.landing_modal_card {
  height: max-content;
  max-width: 500px;
  width: 100%;
  background: #14131b;
  padding-top: 20px;
  padding-right: 24px;
  padding-bottom: 20px;
  padding-left: 24px;
  gap: 38px;
  border-radius: 30px;
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

.landing_dialog_header_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}

.landing_dialog_center_text {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.dialog_input .the-input {
  background-color: #1b1a24;
}

@media screen and (max-width: 768px) {
  .rename_dialog {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
  }
  .landing_modal_card {
    width: 92vw;
    max-width: max-content;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    gap: 24px;
    padding: 16px;
  }
  .landing_dialog_center_text {
    display: none;
  }
  .landing_dialog_header_title {
    font-size: 20px;
  }
}
</style>
