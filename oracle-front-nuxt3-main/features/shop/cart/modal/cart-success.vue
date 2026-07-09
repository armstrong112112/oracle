<template>
  <div class="cart-success__modal">
    <div class="success__container">
      <div class="success__content">
        <img src="/svg/shop/images/sucess-image.png" alt="success" />
        Purchase Successful
      </div>
      <button @click="$emit('cart-success-modal', false)">Close</button>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "cart-success-modal", value: boolean): void;
}>();
</script>
<style lang="scss" scoped>
.cart-success__modal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  padding-top: 32px;
  user-select: none;

  .success__container {
    width: 500px;
    height: 460px;
    padding: 20px 24px;
    border-radius: 20px;
    overflow: hidden;
    background-size: contain;
    background-image: url("/svg/shop/images/bg-success.png");

    .success__content {
      width: 100%;
      height: 374px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
      color: white;
      font-family: Hector, sans-serif;
      font-weight: 500;
      font-size: 24px;
    }

    button {
      width: 100%;
      padding: 12px 0;
      border-radius: 14px;
      background-color: #f64e2a;
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 16px;
    }
  }
}

@media screen and (max-width: 750px) {
  .cart-success__modal {
    padding-top: 0;

    .success__container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 0;
      background-image: url("/svg/shop/images/bg-success-black.png");
    }
  }
}
</style>
