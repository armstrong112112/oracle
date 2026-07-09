<template>
  <div class="market">
    <MarketFeed />
  </div>
</template>

<script setup lang="ts">
import MarketFeed from "~/widgets/market/MarketFeed/index.vue";

definePageMeta({
  layout: "sidebar",
});
</script>

<style lang="scss">
.market {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 1024px) {
  .market {
    width: 100%;
    max-width: 100%;
  }
}
</style>
