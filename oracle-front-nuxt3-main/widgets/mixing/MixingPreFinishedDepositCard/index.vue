<template>
  <div class="mixing_deposit_card flex flex-col gap-12 py-16">
    <div class="mixing_deposit_card_title">{{ t("mixing.deposited") }}</div>
    <div class="mixing_deposit_card_row flex items-center justify-between">
      <div class="flex items-center gap-8">
        <img src="/icons/mixing/usdt.svg" style="width: 24px" alt="" />
        <div class="mixing_price">100.00</div>
        <div class="mixing_equality">
          {{ t("mixing.approx", { amount: "98.98", currency: "$" }) }}
        </div>
      </div>
      <div class="mixing_from flex items-center justify-center">
        <div class="mixing_from_title">{{ t("mixing.from") }}</div>
        <div class="mixing_from_card">****3232</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.mixing_deposit_card_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.mixing_price {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
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
  font-size: 12px;
  line-height: 135%;
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
</style>
