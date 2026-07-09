<template>
  <div class="flex flex-col gap-16 pb-40 notification">
    <div
      class=""
      style="
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 12px;
        grid-template-rows: auto;
      ">
      <CustomButton
        value="cancellation"
        type="secondary"
        size="sm"
        @click="openModal('cancellation')" />
      <CustomButton
        value="accept"
        type="secondary"
        size="sm"
        @click="openModal('accept')" />
      <CustomButton
        value="dealAccept"
        type="secondary"
        size="sm"
        @click="openModal('dealAccept')" />
      <CustomButton
        value="  Deal Cancellation"
        type="secondary"
        size="sm"
        @click="openModal('cancel_and_refund')" />
      <CustomButton
        value=" Offer Cancellation`"
        type="secondary"
        size="sm"
        @click="openModal('escrow_offer_cancellation')" />
      <CustomButton
        value=" Process Error"
        type="secondary"
        size="sm"
        @click="openModal('error')" />
      <CustomButton
        value=" Offer Canceled"
        type="secondary"
        size="sm"
        @click="openModal('offer_canceled')" />
      <CustomButton
        value="  Offer Acceptance"
        type="secondary"
        size="sm"
        @click="openModal('accept_and_pay')" />
      <CustomButton
        value=" Deal Cancellation"
        type="secondary"
        size="sm"
        @click="openModal('cancellation_refund')" />
      <CustomButton
        value=" Escrow offer #1010194"
        type="secondary"
        size="sm"
        @click="openModal('escrow_offer_canceled')" />
      <CustomButton
        value=" Deal Confirmation"
        type="secondary"
        size="sm"
        @click="openModal('deal_confirmation_payment_release')" />
      <CustomButton
        value=" offer rejection"
        type="secondary"
        size="sm"
        @click="openModal('escrow_offer_rejection')" />
      <CustomButton
        value=" Escrow Offer Accepted"
        type="secondary"
        size="sm"
        @click="openModal('escrow_offer_accepted_payment_processed')" />
      <CustomButton
        value="Escrow Deal Canceled"
        type="secondary"
        size="sm"
        @click="openModal('escrow_deal_canceled_refund_processed')" />
      <CustomButton
        value="Escrow Deal Completed"
        type="secondary"
        size="sm"
        @click="openModal('escrow_deal_completed_payment_released')" />
      <CustomButton
        value=" Offer Rejected"
        type="secondary"
        size="sm"
        @click="openModal('escrow_offer_rejected_by_you')" />
      <CustomButton
        value=" Offer Rejected"
        type="secondary"
        size="sm"
        @click="openModal('escrow_offer_rejected_by_you_order')" />
      <CustomButton
        value=" Payment failed!"
        type="secondary"
        size="sm"
        @click="openModal('escrow_payment_failed')" />
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
      :success-text="modal.successText"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => processCreation(key)"
      :is-cancel="modal.isCancel"
      :is-escrow-decline="modal.isEscrowDecline"
      :escrow-button-text="modal.escrowButtonText" />
  </div>
</template>

<script setup lang="ts">
import { escrowModalData } from "~/entities/escrow/data/escrowModalData";
import type { Modals } from "~/entities/verification/data/modal";
import CustomButton from "~/components/ui/Button.vue";
import VerificationDialog, { type ButtonType } from "~/widgets/verification/VerificationDialog/index.vue";
import { storeToRefs } from "pinia";
import { useEscrowStore } from "~/store/escrow";

definePageMeta({ layout: 'sidebar' })

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

const localModals = reactive<Modals>({ ...escrowModalData });

const netAmount = computed(() => {
  const feePercent = 1.11;
  const amount = parseFloat(profile.value?.inputAmount || "0") || 0;
  const fee = amount * (feePercent / 100);
  return (amount - fee).toFixed(2);
});

function processCreation(key: string | number) {
  closeModal(key);
}

function openModal(modalName: keyof typeof escrowModalData) {
  localModals[modalName].isOpen = true;
}

function closeModal(modalName: string | number) {
  localModals[modalName].isOpen = false;
}
</script>

<style lang="scss" scoped></style>
