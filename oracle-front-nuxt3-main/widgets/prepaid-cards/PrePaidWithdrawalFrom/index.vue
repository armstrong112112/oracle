<template>
  <div class="pre_paid_card_list_card flex flex-col justify-start items-center">
    <div class="flex items-center justify-start gap-10 border-b-1 w-full pb-8">
      <img src="/icons/prepaid-cards/visa.svg" alt="" />
      <div class="flex flex-col gap-4">
        <div class="pre_paid_card_list_card_money">$1,323.32</div>
        <div class="pre_paid_card_list_card_number">4083 **** **** 8921</div>
      </div>
    </div>
    <div class="new_creating_card_body">
      <div
        class="new_creating_card_body_header flex items-center justify-between">
        <input
          v-model.number="inputAmount"
          class="new_creating_card_body_header_title"
          placeholder="0.00"
          type="number"
          inputmode="numeric"
          min="0" />
        <div class="new_creating_card_body_header_description">USD</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const inputAmount = ref<number>(0);
const feePercent = ref<number>(1.11);
const selectedMode = ref<string>("slow");

// Computed
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
</script>

<style lang="scss" scoped>
.pre_paid_card_list_card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 12px;
  background: #13121b;
  cursor: pointer;
  gap: 8px;
  @media (min-width: 1024px) {
    background: #1b1a24;
  }
}
.pre_paid_card_list_card_money {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.pre_paid_card_list_card_number {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #b2aaf9;
}
.new_creating_card_body_header_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: 0;
  color: white;
  border: 0;
  width: 100%;
  outline: none;
  background: none;
}
.new_creating_card_body_header_title::placeholder {
  color: #7a74ba;
}
.new_creating_card_body_header_description {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #67639a;
  text-transform: uppercase;
  width: 49px;
  height: 18px;
}
.new_creating_card_body_body_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: #8383afcc;
}
.border-b-1 {
  border-bottom: 1px solid #2d2b3b;
}
</style>
