<template>
  <div>
    <div class="shop">
      <ShopSidebar />
      <div class="content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopSidebar from "~/widgets/shop/sidebar/index.vue";
</script>

<style lang="scss" scoped>
.shop {
  max-width: 1440px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;

  .content {
    width: 1220px;

    .shop-header-mobile {
      display: none;
    }
  }
}

@media screen and (max-width: 1440px) {
  .shop {
    max-width: 100%;
  }
}

@media screen and (max-width: 1220px) {
  .shop {
    .content {
      width: 100%;
    }
  }
}
</style>
