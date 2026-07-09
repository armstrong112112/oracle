<template>
  <div class="shop-tabbar-container">
    <button class="home-button">
      <HomeIcon color="#fff" />
    </button>
    <button class="home-button">
      <CategoryIcon color="#BFB7FF" />
    </button>
    <button class="Add-button">
      <AddIcon />
    </button>
    <button class="home-button">
      <CartIcon color="#BFB7FF" />
    </button>
    <button class="home-button">
      <UserIcon color="#BFB7FF" />
    </button>
  </div>
</template>
<script setup lang="ts">
import CartIcon from "@/assets/svg/shop/icons/dynamic/cart.vue";
import CategoryIcon from "@/assets/svg/shop/icons/dynamic/category.vue";
import HomeIcon from "@/assets/svg/shop/icons/dynamic/home.vue";
import AddIcon from "@/assets/svg/shop/icons/dynamic/plus.vue";
import UserIcon from "@/assets/svg/shop/icons/dynamic/user.vue";
</script>
<style lang="scss" scoped>
.shop-tabbar-container {
  width: 77%;
  height: 62px;
  margin: 0 auto;
  padding: 12px 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  .home-button {
    padding: 0 23.37px;
    margin-bottom: 15px;
  }

  .Add-button {
    position: relative;
    bottom: 15px;
    background-color: #f64e2a;
    padding: 12px;
    border-radius: 22px;
    border: 2px solid #000;
  }
}

@media screen and (max-width: 500px) {
  .shop-tabbar-container {
    width: 100%;
  }
}
</style>
