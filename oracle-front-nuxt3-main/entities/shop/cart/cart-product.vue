<template>
  <div class="cart-product__container" @click="selectItem">
    <div class="cart-product__info">
      <div class="cart-product__checkbox">
        <input type="checkbox" name="cart-product" :checked="checked" />
      </div>
      <img width="55" height="60" :src="image" alt="cart" />
      <h4>{{ title }}</h4>
    </div>
    <div class="cart-product-counter__container">
      <button class="counter-decrement" @click.stop.prevent="decrement">
        <img src="/svg/shop/icons/decrement.svg" alt="decrement" />
      </button>
      <div class="counter-value">{{ quantity }}</div>
      <button class="counter-increment" @click.stop.prevent="increment">
        <img src="/svg/shop/icons/increment.svg" alt="increment" />
      </button>
    </div>
    <div class="cart-product-price__summary">{{ price }}₽</div>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from "~~/store/shops/cart";

const props = defineProps<{
  id: number;
  title: string;
  image: string;
  price: number;
  checked: boolean;
  quantity: number;
}>();

const emit = defineEmits<{
  select: [id: number];
}>();

const cartStore = useCartStore();

const increment = (): void => {
  cartStore.INCREMENT({
    productId: props.id,
    quantity: props.quantity,
  });
};

const decrement = (): void => {
  cartStore.DECREMENT({
    productId: props.id,
    quantity: props.quantity - 1,
  });
};

const selectItem = (): void => {
  emit("select", props.id);
};
</script>
<style lang="scss" scoped>
.cart-product__container {
  width: 100%;
  padding: 14px 10px;
  border-bottom: 1px solid #2c2a3d;
  display: flex;
  align-items: center;
  cursor: pointer;

  .cart-product__info {
    flex: 2;
    display: flex;
    align-items: center;
    gap: 10px;

    .cart-product__checkbox {
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

    h4 {
      font-size: 14px;
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 400;
      margin-left: 2px;
    }
  }

  .cart-product-counter__container {
    flex: 1;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 5px;

    .counter-value {
      height: 30px;
      padding: 5px 20px;
      border-radius: 8px;
      background-color: #2c2a3d;
      font-size: 14px;
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 600;
    }

    button {
      height: 30px;
      padding: 8px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #2c2a3d;
    }
  }

  .cart-product-price__summary {
    font-size: 18px;
    color: white;
    font-family: Roboto, sans-serif;
    font-weight: 700;
  }
}

@media screen and (max-width: 750px) {
  .cart-product__container {
    background: #14131b;
  }
}
</style>
