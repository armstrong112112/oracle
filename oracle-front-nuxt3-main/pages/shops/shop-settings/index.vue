<template>
  <div class="shop-settings-page">
    <Header />
    <ShopSettingsLayout>
      <NuxtPage />
    </ShopSettingsLayout>
  </div>
</template>
<script setup lang="ts">
import Header from "~/widgets/shop/header/index.vue";
import ShopSettingsLayout from "~/widgets/shop/layouts/settings/index.vue";

definePageMeta({
  layout: "sidebar",
});
</script>
<style lang="scss">
@media screen and (max-width: 750px) {
  .shop-settings-page {
    .shop-header-container {
      display: none;
    }
  }
}
</style>
