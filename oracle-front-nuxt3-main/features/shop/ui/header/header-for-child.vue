<template>
  <div class="shop-header-mobile">
    <div class="shop-header-navigation">
      <nuxt-link to="/shops">
        <div class="nav-back">
          <img
            width="24px"
            height="24px"
            src="/svg/shop/icons/cancel.svg"
            alt="back" />
        </div>
      </nuxt-link>
      <div class="shop-header-filter">
        {{ title }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>
<style lang="scss" scoped>
.shop-header-mobile {
  margin-top: 10px;

  .shop-header-navigation {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 0;
    font-size: 18px;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    a {
      flex: 1;
    }

    .shop-header-filter {
      flex: 1.5;
      color: white;
      font-size: 16px;
      font-family: Roboto, sans-serif;
      font-weight: 500;
    }
  }
}

@media screen and (max-width: 500px) {
  .shop-header-mobile {
    .shop-header-navigation {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
