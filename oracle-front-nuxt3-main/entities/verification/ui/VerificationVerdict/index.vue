<template>
  <div class=" ">
    <p class="sub-title">
      {{ $t("verdict.detailsFor") }}
      <span class="primary-color">@Username</span>
    </p>

    <div class="section">
      <p class="section-title">{{ $t("verdict.section1") }}</p>
      <p class="text">{{ $t("verdict.text1") }}</p>
    </div>

    <div class="section">
      <p class="section-title">{{ $t("verdict.section1") }}</p>
      <p class="text">{{ $t("verdict.text2") }}</p>
    </div>

    <div class="section">
      <p class="section-title">{{ $t("verdict.section1") }}</p>
      <p class="text">{{ $t("verdict.text3") }}</p>
    </div>

    <div class="section">
      <p class="section-title">{{ $t("verdict.section1") }}</p>
      <p class="text">{{ $t("verdict.text4") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component is already using composition API structure
</script>

<style lang="scss" scoped>
.sub-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}

.section {
  margin-top: 20px;
}

.section-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: left;
  color: white;
}

.text {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #b2aaf9;
}
</style>
