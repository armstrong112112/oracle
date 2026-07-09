<template>
  <div class="pre_paid_spend items-center justify-between flex py-16">
    <div class="flex flex-col gap-4">
      <div class="pre_paid_spend_title">{{ $t("cards.spentInMonth") }}</div>
      <div class="pre_paid_spend_price_row flex items-end justify-start gap-8">
        <span>$</span>
        <span>621. 00</span>
        <div class="currency">USD</div>
      </div>
    </div>
    <div class="pre_paid_history_link">
      <span> {{ $t("cards.history") }}</span>
      <img src="/icons/prepaid-cards/chevron-right.svg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Composables
const prepaidCardsStore = usePrepaidCardsStore();
</script>
<style lang="scss" scoped>
.pre_paid_spend_title {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.pre_paid_spend_price_row span {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: 0;
  color: white;
}
.pre_paid_spend_price_row .currency {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
  padding-bottom: 8px;
}
.pre_paid_history_link {
  padding: 7px 10px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.pre_paid_history_link span {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #b2aaf9;
}
.pre_paid_history_link svg path {
  fill: #b2aaf9;
}
</style>
