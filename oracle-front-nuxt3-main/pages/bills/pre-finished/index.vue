<template>
  <div class="whitelist h-dvh notification relative p-0 mt-0">
    <PageHeader
      :title="$t('bills.mixingNumber', { number: '3243243' })"
      :is-plus="false"
      :is-created="true" />
    <div class="flex flex-col gap-24 px-16 py-8">
      <div class="flex flex-col gap-16">
        <MixingPreFinishedDepositCard />
        <PayoutAddress @input-changed="handlePayoutInput" />
        <MixingSavedAddresses v-if="currentStep >= 1" />
        <MixingWithdrawals v-if="currentStep >= 1" />
        <MixingExperience
          v-if="currentStep >= 2"
          @experience-input="handleExperienceInput" />
        <MixingPreFinishedCreatedCard v-if="currentStep >= 3" />
      </div>
    </div>
    <div class="mixing-footer mt-20">
      <div class="pre_finished_fees">
        <div class="pre_finished_fees_title">{{ $t("bills.fees") }}</div>
        <div class="pre_finished_fees_fee">0.05 USDT</div>
      </div>
      <CustomButton
        :value="$t('bills.payout')"
        :type="buttonType"
        class="w-full"
        :disabled="!isButtonEnabled"
        @click="handleButtonClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import MixingExperience from "~/widgets/mixing/MixingExperience/index.vue";
import MixingPreFinishedCreatedCard from "~/widgets/mixing/MixingPreFinishedCreatedCard/index.vue";
import MixingPreFinishedDepositCard from "~/widgets/mixing/MixingPreFinishedDepositCard/index.vue";
import MixingSavedAddresses from "~/widgets/mixing/MixingSavedAddresses/index.vue";
import MixingWithdrawals from "~/widgets/mixing/MixingWithdrawals/index.vue";
import PayoutAddress from "~/widgets/mixing/PayoutAddress/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

const currentStep = ref(0);
const isButtonEnabled = ref(false);
const buttonType = ref("confirm");

const handlePayoutInput = (value: string) => {
  isButtonEnabled.value = !!value;
  buttonType.value = value ? "primary" : "confirm";
};

const handleExperienceInput = (value: string) => {
  isButtonEnabled.value = !!value;
  buttonType.value = value ? "primary" : "confirm";
};

const handleButtonClick = () => {
  if (isButtonEnabled.value && currentStep.value < 3) {
    currentStep.value += 1;
    isButtonEnabled.value = false;
    buttonType.value = "confirm";
  }
};
</script>

<style lang="scss" scoped>
.mixing-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  border-top: 1px solid #2b2741;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #13121b;
  z-index: 999;
  left: 0;
  right: 0;
}
.pre_finished_fees {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  width: 100%;
}
.pre_finished_fees_title {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: #b2aaf9;
}
.pre_finished_fees_fee {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
</style>
