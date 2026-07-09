<template>
  <div class="shop-setting__layout">
    <div class="shop-setting__sidebar">
      <SettingsSidebar />
    </div>
    <div class="shop-setting__content">
      <div class="shop-setting__mobile-header" v-if="isYourOrdersPage()">
        <ShopHeaderMobile
          page-title="Orders"
          with-page-title
          with-search-bar
          with-filter />
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import ShopHeaderMobile from "~/widgets/shop/header/mobile.vue";
import SettingsSidebar from "~/widgets/shop/sidebar/settings-sidebar.vue";

const route = useRoute();

const isYourOrdersPage = (): boolean => {
  const path = route.path;
  return path === "/shops/shop-settings/your-orders";
};
</script>
<style lang="scss">
.shop-setting__layout {
  padding: 24px 24px 0 24px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 16px;

  .shop-setting__content {
    width: 100%;

    .shop-setting__mobile-header {
      display: none;
    }
  }
}

@media screen and (max-width: 1000px) {
  .shop-setting__layout {
    gap: 0;
  }
}

@media screen and (max-width: 750px) {
  .shop-setting__layout {
    padding: 0;

    .shop-setting__content {
      .shop-setting__mobile-header {
        display: block;
      }
    }
  }
}
</style>
