<template>
  <div class="orders-product__container">
    <div class="order-product__image">
      <img
        src="/svg/shop/images/cart-product.png"
        alt="order-product" />
    </div>
    <div class="order-product__content">
      <h4>1 420₽</h4>
      <h5>Apple card 1000 руб, РУ регион, x2</h5>
      <div class="order-product-shop__info">
        <img src="/svg/shop/images/shop-logo.svg" alt="shop-logo" />
        <h4>Store Name 1</h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.orders-product__container {
  padding: 12px 16px;
  border-bottom: 1px solid #292929;
  display: flex;
  align-items: center;
  gap: 12px;

  .order-product__image {
    width: 50px;
    height: 50px;
    object-fit: contain;

    img {
      width: 100%;
    }
  }

  .order-product__content {
    h4 {
      color: #fff;
      font: 500 14px Roboto, sans-serif;
    }

    h5 {
      margin-top: 4px;
      color: #bfb7ff;
      font: 400 12px Roboto, sans-serif;
    }

    .order-product-shop__info {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;

      h4 {
        color: #fff;
        font: 500 12px Roboto, sans-serif;
      }
    }
  }
}
</style>
