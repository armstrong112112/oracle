<template>
  <div class="whitelist h-dvh notification relative p-0 mt-0">
    <PageHeader
      :title="$t('bills.billNumber', { number: '919194012' })"
      :is-plus="false" />
    <div class="flex flex-col gap-24">
      <div class="bill_title">{{ $t("bills.headingTextForBill") }}</div>
      <BillsCreatedQr />
      <BillsCreatedInformation />
    </div>
    <div class="mixing-footer mt-20">
      <nuxt-link :to="localePath('/bills/payment')" class="w-full">
        <CustomButton
          :value="$t('bills.voidThisBill')"
          type="secondary"
          class="w-full" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import CustomButton from "~/components/ui/Button.vue";
import BillsCreatedInformation from "~/widgets/bills/BillsCreatedInformation/index.vue";
import BillsCreatedQr from "~/widgets/bills/BillsCreatedQr/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

const localePath = useLocalePath();
const inputAmount = ref(0);
const feePercent = ref(1.11);
const selectedMode = ref("slow");

const netAmount = computed((): number => {
  const fee = (inputAmount.value * feePercent.value) / 100;
  return inputAmount.value - fee;
});

const netAmountInteger = computed((): string => {
  return netAmount.value.toFixed(2).split(".")[0];
});

const netAmountDecimal = computed((): string => {
  return netAmount.value.toFixed(2).split(".")[1];
});

const selectMode = (mode: string) => {
  selectedMode.value = mode;
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
.bill_title {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
  text-align: center;
  margin-top: 24px;
}
</style>
