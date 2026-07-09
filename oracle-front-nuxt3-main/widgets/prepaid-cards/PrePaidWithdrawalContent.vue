<template>
  <div class="prepaid-withdrawal-content">
    <div class="flex flex-col gap-16 py-16">
      <PrePaidWithdrawalFrom />
      <img
        src="/icons/prepaid-cards/arrow-down.svg"
        class="text-center flex items-center m-auto cursor-pointer"
        style="width: 24px"
        alt="" />
      <PrePaidWithdrawalTo />
    </div>

    <div class="card-detail-footer">
      <CustomButton
        :value="$t('cards.withdraw')"
        type="primary"
        :class="showFooter ? 'card-detail-footer-btn' : 'modal-footer-btn'"
        @click="handleWithdraw" />
    </div>

    <WidgetDialog
      :title="modalTitle"
      :button-text="modalButtonText"
      :is-visible="isModalVisible"
      :modal-type="modalType"
      @close="closeModal"
      @confirm="processConfirmation" />
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import PrePaidWithdrawalFrom from "~/widgets/prepaid-cards/PrePaidWithdrawalFrom/index.vue";
import PrePaidWithdrawalTo from "~/widgets/prepaid-cards/PrePaidWithdrawalTo/index.vue";
import WidgetDialog from "~/widgets/prepaid-cards/WidgetDialog/index.vue";

// Props
interface Props {
  showFooter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showFooter: true,
});

// Composables

const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const isModalVisible = ref(false);
const modalTitle = ref("");
const modalButtonText = ref("");
const modalType = ref("");

// Methods
const closeModal = (): void => {
  isModalVisible.value = false;
};

const processConfirmation = (): void => {
  if (modalType.value === "delete") {
    console.log("Deleting API keys pair");
  } else if (modalType.value === "generate") {
    console.log("Generating additional API keys pair");
  }

  closeModal();
};

const handleWithdraw = (): void => {
  showGenerateModal();
};

const showGenerateModal = (): void => {
  modalTitle.value = $t("cards.createApiKeysPair");
  modalType.value = "generate";
  modalButtonText.value = $t("cards.createConnection");
  isModalVisible.value = true;
};
</script>

<style lang="scss" scoped>
.prepaid-withdrawal-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card-detail-footer-btn {
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0;
  right: 0;
  @media (min-width: 1024px) {
    position: static;
    bottom: 0;
    gap: 0;
  }
}

.modal-footer-btn {
  width: 100%;
}

.m-auto {
  margin: 0 auto;
  cursor: pointer;
}
</style>
