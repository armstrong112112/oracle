<template>
  <div class="pre-paid-card-detail_actions">
    <div
      class="pre-paid-card-detail_action cursor-pointer"
      @click="openModal('blockCardPermission')">
      <img src="/icons/prepaid-cards/block.svg" alt="" />
      <div class="pre-paid-card-detail_action_title">{{ blockedText }}</div>
    </div>
    <div class="pre-paid-line"></div>
    <nuxt-link
      :to="localePath('/prepaid-cards/new-card')"
      class="pre-paid-card-detail_action">
      <img src="/icons/prepaid-cards/re-new.svg" alt="" />
      <div class="pre-paid-card-detail_action_title">
        {{ $t("cards.renew") }}
      </div>
    </nuxt-link>
    <div class="pre-paid-line"></div>
    <nuxt-link
      :to="localePath('/prepaid-cards/withdrawal')"
      class="pre-paid-card-detail_action">
      <img src="/icons/prepaid-cards/withdraw.svg" alt="" />
      <div class="pre-paid-card-detail_action_title">
        {{ $t("cards.withdraw") }}
      </div>
    </nuxt-link>
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="(modal.buttonType as ButtonType)"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :success-text="modal.successText"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => processCreation(key)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
import { modals, type Modals } from "~/entities/verification/data/modal";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";

// Composables

const localePath = useLocalePath();
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const localModals = ref<Modals>(modals);
const blockedText = ref<string>("Block");

// Methods
const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const processCreation = (modalName: keyof typeof modals) => {
  blockedText.value = "Blocked";
  closeModal(modalName);
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};
</script>
<style scoped>
.pre-paid-card-detail_actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-top: 1px solid #2b2741;
  border-bottom: 1px solid #2b2741;
}
.pre-paid-card-detail_action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px;
}
.pre-paid-card-detail_action_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: white;
}
.pre-paid-line {
  width: 1px;
  height: 34px;
  background: #2b2741;
}
.pre-paid-card-detail_action img {
  width: 20px;
  height: 20px;
}
</style>
