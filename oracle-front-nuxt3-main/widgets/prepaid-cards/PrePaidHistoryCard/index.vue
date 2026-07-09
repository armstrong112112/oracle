<template>
  <div class="prepaid-history-card">
    <div
      class="prepaid-history-card_body flex gap-8 justify-between items-start">
      <div class="flex flex-col gap-8">
        <div class="prepaid-history-card_body_title">History</div>
        <div class="flex flex-col gap-4">
          <div class="prepaid-history-card_body_month">December</div>
          <div class="prepaid-history-card_body_price">$3,129</div>
        </div>
      </div>
      <div class="history_left_title">
        <span>History</span>
        <img src="/assets/svg/arrow-right.svg" alt="" />
      </div>
    </div>
    <div class="prepaid-history-card_footer">
      <img
        src="/icons/prepaid-cards/history-chart.svg"
        style="width: 100%"
        alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Composables
const prepaidCardsStore = usePrepaidCardsStore();
</script>
<style scoped>
.prepaid-history-card {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 12px;
  border-radius: 12px;
  background: #13121b;
}
.prepaid-history-card_body_title {
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.prepaid-history-card_body_month {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.prepaid-history-card_body_price {
  font-family: Inter;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.history_left_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
