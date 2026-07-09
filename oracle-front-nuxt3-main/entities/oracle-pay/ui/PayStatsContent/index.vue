<template>
  <div class="pay_stats_content">
    <h3>{{ $t("pay.stats") }}</h3>
    <PayStats />
  </div>
</template>

<script setup lang="ts">
import PayStats from "~/entities/oracle-pay/ui/PayStats/index.vue";
</script>

<style lang="scss" scoped>
.pay_stats_content {
  h3 {
    font-family: Hector, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    color: white;
    margin-bottom: 20px;
  }
}

.pay_stats_content {
  width: 100%;
}
</style>
