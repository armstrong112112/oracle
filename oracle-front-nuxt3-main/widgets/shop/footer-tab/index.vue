<template>
  <div class="shop-tab-container">
    <button class="home-button" @click="GoToHome">
      <HomeIcon color="#fff" />
    </button>
    <button class="home-button" @click="GoToCategory">
      <CategoryIcon color="#BFB7FF" />
    </button>
    <button class="Add-button" @click="GoToListing">
      <AddIcon />
    </button>
    <button class="home-button" @click="GoToCart">
      <CartIcon color="#BFB7FF" />
    </button>
    <button class="home-button" @click="GoToSettings">
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

const router = useRouter();

const GoToHome = (): void => {
  router.push("/shops");
};

const GoToCategory = (): void => {
  router.push("/shops/results");
};

const GoToListing = (): void => {
  router.push("/shops/listing");
};

const GoToCart = (): void => {
  router.push("/shops/cart");
};

const GoToSettings = (): void => {
  router.push("/shops/shop-settings");
};
</script>
<style lang="scss" scoped>
.shop-tab-container {
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
  .shop-tab-container {
    width: 100%;
  }
}
</style>
