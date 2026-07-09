<template>
  <div class="flex flex-col gap-16 pb-40">
    <MixingCard
      :header="(cardHeader as HeaderData)"
      :body-rows="cardBodyRows" />
    <CustomButton
      :value="$t('escrow.openDispute')"
      type="secondary"
      size="sm"
      is-image="right"
      :right-position="true"
      @click="openModal('accept')" />
    <div class="flex flex-col gap-24">
      <div class="overview_description_card flex flex-col gap-12">
        <div class="escrow_overview_title">{{ $t("escrow.description") }}</div>
        <div class="escrow_overview_description">
          {{
            profile?.description ||
            `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
`
          }}
        </div>
      </div>
      <MixingExperience class="pl-0 pr-0" />
      <EscrowDealHistoryList />
    </div>
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="(modal.buttonType as ButtonType)"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => processCreation(key as number)"
      :is-cancel="modal.isCancel"
      :is-escrow-decline="modal.isEscrowDecline"
      :escrow-button-text="modal.escrowButtonText" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { escrowModalData } from "~/entities/escrow/data/escrowModalData";
import EscrowDealHistoryList from "~/entities/escrow/ui/deal/EscrowDealHistoryList.vue";
import MixingCard, {
  type HeaderData,
} from "~/entities/escrow/ui/dispute/overview/mixing-card.vue";
import type { Modals } from "~/entities/verification/data/modal";
import CustomButton from "~/components/ui/Button.vue";
import { useEscrowStore } from "~/store/escrow";
import MixingExperience from "~/widgets/mixing/MixingExperience/index.vue";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

const isOpen = ref(false);
const localModals = reactive<Modals>({ ...escrowModalData });

const netAmount = computed(() => {
  const feePercent = 1.11;
  const amount = parseFloat(profile.value?.inputAmount || "0") || 0;
  const fee = amount * (feePercent / 100);
  return (amount - fee).toFixed(2);
});

const cardHeader = computed(() => ({
  title: $t("escrow.dealAmount"),
  icon:
    profile.value?.selectedCrypto?.icon || "/icons/oracle-pay/crypto/usdt.svg",
  amount: profile.value?.inputAmount || "100.00",
  netAmount: netAmount.value || "98.98",
  buttons: [
    {
      text: $t("escrow.paid"),
      type: "resolved",
    },
  ],
}));

const cardBodyRows = computed(() => [
  {
    label: $t("escrow.category"),
    value: profile.value?.role || "Design",
    type: "text" as const,
  },
  {
    label: $t("escrow.seller"),
    value: {
      avatar: profile.value?.selectedUser?.avatar || "/avatars/barbara.png",
      name: profile.value?.selectedUser?.name || "Username",
    },
    type: "avatar" as const,
  },
]);

function processCreation(key: number) {
  closeModal(key as keyof typeof escrowModalData);
}

function openModal(modalName: keyof typeof escrowModalData) {
  localModals[modalName].isOpen = true;
}

function closeModal(modalName: keyof typeof escrowModalData) {
  localModals[modalName].isOpen = false;
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/escrow/deal-card.scss" as *;
</style>
