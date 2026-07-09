<template>
  <div class="mixing_card">
    <div class="mixing_card_header flex items-center justify-between">
      <div class="flex gap-12">
        <img src="/icons/mixing/usdt.svg" alt="" />
        <div class="flex flex-col">
          <div class="mixing_price">100.00</div>
          <div class="mixing_equality">
            {{ $t("mixing.approx", { amount: "98.98", currency: "$" }) }}
          </div>
        </div>
      </div>
      <div class="mixing_from flex items-center justify-center">
        <div class="mixing_from_title">{{ $t("mixing.from") }}</div>
        <div class="mixing_from_card">****3232</div>
      </div>
    </div>
    <div class="mixing_card_body flex flex-col">
      <div class="mixing_card_body_row">
        <div class="mixing_card_body_row_left">{{ $t("mixing.created") }}</div>
        <div class="mixing_card_body_row_right">01 Jan, 2025 03:10 PM EST</div>
      </div>
      <div class="mixing_card_body_row">
        <div class="mixing_card_body_row_left">
          {{ $t("mixing.mixingMode") }}
        </div>
        <div class="mixing_card_body_row_right">{{ $t("mixing.rapid") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
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
.mixing_progress_card {
  border: 1px solid #f64e2a;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 16px;
  padding: 12px;
}
.mixing_progress_card_title {
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.mixing_progress_card_description {
  font-family: Inter;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
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
</style>
