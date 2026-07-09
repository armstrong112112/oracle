<template>

  <div class="form-card">
    <div class="form-card-title">
      Oracle Certification Application Fee Estimation: <br> $150
    </div>
  </div>
</template>

<script setup lang="ts">
// This component is already using composition API structure
</script>

<style lang="scss">
.form-card {
  margin-top: 20px;
  background: linear-gradient(
      105.62deg,
      rgba(246, 78, 42, 0.2) 0%,
      #232130 35.65%
  );
  position: relative;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 94px;
  color: white;
  -webkit-text-decoration: none;
  text-decoration: none;
  overflow: hidden;
}
.form-card::before {
  background: linear-gradient(
      105.62deg,
      rgba(246, 78, 42, 0.2) 0%,
      #232130 35.65%
  );
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 12px;
  z-index: -1;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0, #fff 0) content-box, linear-gradient(#fff 0, #fff 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.form-card-title {
  font-family: 'Kenyan Coffee', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  text-transform: uppercase;
  background: linear-gradient(125.57deg, #ffffff 26.72%, #eb6323 83.64%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
