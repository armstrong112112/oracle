<template>
  <div class="mixing_progress_card">
    <div class="mixing_progress_card_title">
      {{ t("mixing.progressInProgress") }}
    </div>
    <div class="mixing_progress_card_description">
      {{ t("mixing.estimatedCompletion") }} <br />
      Jan 5, 2025 at 1:00 PM EST
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
const { t } = useI18n();
</script>

<style lang="scss" scoped>
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
