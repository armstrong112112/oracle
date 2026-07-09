<template>
  <div v-if="CartModal" class="cart-summary__modal">
    <div class="cart-summary__container">
      <div class="cart-summary-drag">
        <button @click="SuccessModal">
          <img src="/svg/shop/icons/drag.svg" alt="drag" />
        </button>
      </div>
      <div class="summary-header">
        <h2>Choose Address</h2>
        <button @click="ModalToggle">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="summary-price__container">
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
        <button class="checkout-button" @click="SuccessModal">
          To order - $3 193
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CartAddress from "~/features/shop/ui/cart/cart-address.vue";

defineProps<{
  CartModal: boolean;
}>();

const emit = defineEmits<{
  close: [];
  success: [];
}>();

const ModalToggle = (): void => {
  emit("close");
};

const SuccessModal = (): void => {
  emit("success");
  emit("close");
};
</script>
<style lang="scss" scoped>
.cart-summary__modal {
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

  .cart-summary__container {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;
    .cart-summary-drag {
      width: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 12px 0 24px 0;
    }

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

    .summary-price__container {
      margin-top: 20px;
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

@media screen and (max-width: 750px) {
  .cart-summary__modal {
    align-items: flex-end;
    .cart-summary__container {
      padding: 0;
      border-radius: 0;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      .cart-summary-drag {
        display: flex;
      }
      .summary-header {
        padding: 0 16px;
        button {
          display: none;
        }
      }

      .summary-checkout {
        border-radius: 0;
        padding: 12px 20px 24px 20px;
        background-color: #111016;
      }
    }
  }
}
</style>
