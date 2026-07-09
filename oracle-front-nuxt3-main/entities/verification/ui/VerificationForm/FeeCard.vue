<template>
  <div class="fee-card">
    <div class="fee-card-title">
      Oracle verification Application Fee Estimation: <br />
      $200
    </div>
    <div class="fee-card-description">
      The amount will be deducted from your account now but will be refunded if
      your application is denied.
    </div>
    <FeeSlider />
  </div>
</template>

<script setup lang="ts">
import FeeSlider from '@/entities/verification/ui/VerificationForm/FeeSlider.vue'
</script>

<style scoped>
.fee-card {
  background: #15151f;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;
  gap: 12px;
  position: relative;

}
.fee-card-title {
  font-family: Kenyan Coffee;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  text-transform: uppercase;
  color: white;
}
.fee-card-description {
  font-family: Reza Zulmi Alfaizi Sans;
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
</style>
