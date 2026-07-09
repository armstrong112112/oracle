<template>
  <div class="cart-product-mobile">
    <div class="product-mobile-info">
      <div class="product-image">
        <img width="55" height="60" :src="image" alt="cart" />
      </div>
      <div class="product-info">
        <h2>{{ title }}</h2>
        <div>
          <h4>{{ price }} ₽</h4>
          <h5>{{ discount }} ₽</h5>
        </div>
      </div>
      <button class="delete-product">
        <img src="/svg/shop/icons/trash-red.svg" alt="cart-product" />
      </button>
    </div>
    <div class="product-mobile-actions">
      <div class="product-checkbox">
        <input type="checkbox" name="cart-product" />
      </div>
      <div class="counter__container">
        <button @click="decrement">
          <img src="/svg/shop/icons/decrement.svg" alt="decrement" />
        </button>
        <div class="counter-value">{{ counter }}</div>
        <button @click="increment">
          <img src="/svg/shop/icons/increment.svg" alt="increment" />
        </button>
      </div>
      <div class="product-buy">
        <button>Buy</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string;
  image: string;
  price: number;
  discount: number;
}>();

const counter = ref(1);

const increment = (): void => {
  counter.value += 1;
};

const decrement = (): void => {
  if (counter.value === 0) {
    counter.value = 0;
  } else {
    counter.value -= 1;
  }
};
</script>
<style lang="scss" scoped>
.cart-product-mobile {
  margin-top: 4px;
  width: 100%;
  padding: 12px 16px;
  background-color: #14131b;

  .product-mobile-info {
    width: 100%;
    display: flex;
    align-items: stretch;
    gap: 12px;

    .product-image {
      width: 55px;
      height: 60px;
      object-fit: fill;

      img {
        width: 100%;
      }
    }

    .product-info {
      flex: 1;

      h2 {
        color: white;
        font: 400 14px Roboto, sans-serif;
      }

      div {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;

        h4 {
          color: white;
          font: 600 16px Roboto, sans-serif;
        }

        h5 {
          text-decoration: line-through;
          color: #bfb7ff;
          font: 400 12px Roboto, sans-serif;
        }
      }
    }

    .delete-product {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .product-mobile-actions {
    margin-top: 18px;
    display: flex;
    align-items: center;

    .product-checkbox {
      width: 24px;
      height: 24px;
      border: 1px solid #707070;
      position: relative;
      border-radius: 30px;

      input[type="checkbox"] {
        width: 24px;
        height: 24px;
        clip-path: circle(46% at 50% 50%);
        appearance: none;
        -webkit-appearance: none;
        border: transparent;
        background-color: transparent;
        cursor: pointer;

        &:checked {
          background-color: #f64e2a;

          &::after {
            content: url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1.76465%207.54243L5.06712%2010.7671C5.15862%2010.8564%205.30932%2010.8381%205.37677%2010.7294L10.9411%201.76465%22%20stroke%3D%22black%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E");

            display: block;
            position: absolute;
            top: 5px;
            left: 5px;
            pointer-events: none;
          }
        }
      }
    }

    .counter__container {
      margin-left: 50px;
      flex: 1;
      display: flex;
      align-items: center;
      gap: 5px;

      button {
        width: 38px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #1b1a24;
      }

      .counter-value {
        width: 45px;
        height: 36px;
        padding: 8px 13.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #1b1a24;
        color: white;
        font: 600 14px Inter, sans-serif;
      }
    }

    .product-buy {
      button {
        border-radius: 12px;
        background-color: #f64e2a;
        padding: 8px 14px;
        color: white;
        font: 600 14px Inter, sans-serif;
      }
    }
  }
}
</style>
