<template>
  <div class="auth-layout">
    <OralceSvg class="image" />
    <h2 class="title">ORACLE</h2>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import OralceSvg from '~/assets/svg/oracle.svg?component'
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #0a090f;
}

.auth-layout {
  display: flex;
  flex-direction: column;
  align-items: center;

  .image {
    width: 80px;
    height: 80px;
    background: #f64e2a;
    box-shadow: inset -4px -4px 12px rgba(255, 255, 255, 0.825);
    border-radius: 200px;
    margin-top: 40px;
  }

  .title {
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 17px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
    margin-top: 24px;
    margin-bottom: 58px;
  }
}
</style>
