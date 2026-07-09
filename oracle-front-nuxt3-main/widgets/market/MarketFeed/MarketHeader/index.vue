<template>
  <header class="market-header">
    <img
      src="/svg/arrow-back.svg"
      alt=""
      style="cursor: pointer"
      @click="router.push('/')" />
    <div class="market-header-title">Oracle's market</div>
    <img
      src="/svg/logo.png"
      class="notification-detail-logo"
      alt="Logo" />
  </header>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style lang="scss">
.market-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #1e1d2a;
}
.market-header-title {
  font-family: Hanson, sans-serif;
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  text-transform: uppercase;
}
</style>
