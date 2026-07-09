<template>
  <div class="shop-setting__layout">
    <div class="shop-setting__sidebar">
      <SettiongsSidebar />
    </div>
    <div class="shop-setting__content">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import SettiongsSidebar from '~/widgets/shop/sidebar/ui/settings-sidebar.vue'
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
  }
}
</style>
