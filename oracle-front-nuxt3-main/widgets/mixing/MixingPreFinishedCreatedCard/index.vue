<template>
  <div class="mixing_card">
    <div class="mixing_card_header flex items-center justify-between">
      <div class="flex flex-col gap-4">
        <div class="remaining-balance">{{ t("mixing.remainingBalance") }}</div>
        <div class="flex items-center gap-8">
          <img src="/icons/mixing/usdt.svg" style="width: 24px" alt="" />
          <div class="mixing_price">100.00</div>
          <div class="mixing_equality">≈ $98.98</div>
        </div>
      </div>
    </div>
    <div class="mixing_card_body flex flex-col">
      <div class="mixing_card_body_row">
        <div class="mixing_card_body_row_left">{{ t("mixing.created") }}</div>
        <div class="mixing_card_body_row_right">01 Jan, 2025 03:10 PM EST</div>
      </div>
      <div class="mixing_card_body_row">
        <div class="mixing_card_body_row_left">{{ t("mixing.finished") }}</div>
        <div class="mixing_card_body_row_right">01 Jan, 2025 03:10 PM EST</div>
      </div>
      <div class="mixing_card_body_row">
        <div class="mixing_card_body_row_left">
          {{ t("mixing.mixingMode") }}
        </div>
        <div class="mixing_card_body_row_right">{{ t("mixing.rapid") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.mixing_card {
  border: 1px solid #2b2741;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  overflow: hidden;
}
.mixing_card_header {
  padding: 12px 16px;
}
.mixing_price {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.mixing_equality {
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0%;
  color: #7a74ba;
}
.mixing_from_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.mixing_from_card {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #7a74ba;
}
.mixing_card_body_row {
  border-top: 1px solid #2b2741;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.mixing_card_body_row_left {
  background: #13121b;
  border-right: 1px solid #2b2741;
}
.mixing_card_body_row_left,
.mixing_card_body_row_right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #ffffff;
}
.remaining-balance {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: white;
}
</style>
