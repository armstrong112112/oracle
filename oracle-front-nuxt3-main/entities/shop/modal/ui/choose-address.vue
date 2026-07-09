<template>
  <div v-if="Modal" class="choose-address__container">
    <div class="cart-summary__container">
      <div class="summary-header">
        <h2>Choose Address</h2>
        <button @click="closeAddress">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="address-counter">
        <div class="address-counter-header">
          <h2>1049 ₽</h2>
          <h5>1050 ₽</h5>
        </div>
        <div class="counter">
          <button>
            <img src="/svg/shop/icons/decrement.svg" alt="decrement" />
          </button>
          <div class="counter-value">1</div>
          <button>
            <img src="/svg/shop/icons/increment.svg" alt="increment" />
          </button>
        </div>
        <p>Max available: 234</p>
      </div>
      <div class="summary-price__container">
        <h4>Choose Crypto</h4>
        <CartAddress v-for="(item, index) in 6" :key="index" />
      </div>
      <div class="summary-checkout">
        <div class="cart-summary">
          <div class="cart-summary__item">
            <h3>Products, 6 pcs.</h3>
            <h4>$3 223</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Discount</h3>
            <h4>-$30</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Total cost</h3>
            <h4>$3 193</h4>
          </div>
        </div>
        <button class="checkout-button">To order - $3 193</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CartAddress from "~/features/shop/ui/cart/cart-address.vue";

defineProps<{
  Modal: boolean;
}>();

const emit = defineEmits<{
  modal: [value: boolean];
}>();

const closeAddress = (): void => {
  emit("modal", false);
};
</script>
<style lang="scss" scoped>
.choose-address__container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9999;
  background-color: rgba($color: #000000, $alpha: 0.8);
  padding-top: 32px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  .cart-summary__container {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;
    .summary-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        color: white;
        font-family: Roboto, sans-serif;
        font-size: 20px;
        font-weight: 500;
      }
    }

    .address-counter {
      margin-top: 20px;
      .address-counter-header {
        display: flex;
        align-items: center;
        gap: 6px;
        h2 {
          font-size: 20px;
          font-weight: 500;
          color: white;
          font-family: Roboto, sans-serif;
        }
        h5 {
          font-size: 14px;
          font-weight: 400;
          color: #bfb7ff;
          font-family: Roboto, sans-serif;
        }
      }
      .counter {
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 5px;

        button {
          min-width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #1b1a24;
          border-radius: 8px;
          &:nth-child(1) {
            opacity: 0.4;
          }
        }
        .counter-value {
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #1b1a24;
          border-radius: 10px;
          font-size: 20px;
          font-weight: 500;
          color: white;
          font-family: Roboto, sans-serif;
        }
      }
      p {
        margin-top: 8px;
        font: 400 12px Roboto, sans-serif;
        color: #bfb7ff;
      }
    }

    .summary-price__container {
      margin-top: 20px;
      h4 {
        color: white;
        font: 600 15px Roboto, sans-serif;
      }
    }

    .summary-checkout {
      margin-top: 38px;
      width: 100%;
      border-radius: 20px;
      .cart-summary {
        .cart-summary__item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: Inter, sans-serif;
          color: #bfb7ff;
          h3,
          h4 {
            font-weight: 600;
            font-size: 14px;
          }
          &:nth-child(2) {
            margin-top: 8px;
          }
          &:nth-child(3) {
            margin-top: 8px;
            h3,
            h4 {
              color: white;
              font-weight: 600;
              font-size: 18px;
            }
          }
        }
      }

      .checkout-button {
        margin-top: 30px;
        width: 100%;
        height: 52px;
        padding: 15px 0;
        background-color: #f64e2a;
        border-radius: 14px;
        color: white;
        font-size: 16px;
        font-weight: 500;
        font-family: Inter, sans-serif;
      }
    }
  }
}
</style>
