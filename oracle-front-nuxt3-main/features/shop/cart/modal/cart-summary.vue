<template>
  <div class="cart-summary__modal">
    <div class="cart-summary__container">
      <div class="cart-summary-drag">
        <button @click="$emit('cart-modal', false)">
          <img src="/svg/shop/icons/drag.svg" alt="drag" />
        </button>
      </div>
      <div class="summary-header">
        <h2>Choose Address</h2>
        <button @click="$emit('cart-modal', false)">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="summary-price__container">
        <CartAddress
          v-for="item in address"
          :key="item.id"
          :id="item.id"
          :icon="item.icon"
          :title="item.name"
          :price="calculatedConvertPrice(item.convertPrice)"
          :address="item.address"
          :convert-price="item.convertPrice"
          :checked="chosen_address === item.id"
          @select="choseAddress" />
      </div>
      <div class="summary-checkout">
        <div class="cart-summary">
          <div class="cart-summary__item">
            <h3>Products, {{ productsCount }} pcs.</h3>
            <h4>${{ totalPrice }}</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Discount</h3>
            <h4>-${{ discountPrice }}</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Total cost</h3>
            <h4>${{ totalDiscount }}</h4>
          </div>
        </div>
        <p v-if="cartStore.error" class="checkout-error">{{ cartStore.error }}</p>
        <button
          :disabled="chosen_address === null || cartStore.isAdding || cartStore.isValidating"
          class="checkout-button"
          @click="toOrder">
          To order - ${{ totalDiscount }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CartAddress from "~/entities/shop/cart/cart-address.vue";
import {
  AddressData,
  type AddressDataType,
} from "~/features/shop/_id/data/constants";
import { useCartStore } from "~~/store/shops/cart";

const props = defineProps<{
  productsCount: number;
  totalPrice: number;
  totalDiscount: number;
  discountPrice: number;
}>();

const emit = defineEmits<{
  "cart-modal": [value: boolean];
  "cart-success-modal": [value: boolean];
}>();

const cartStore = useCartStore();
const address = ref<AddressDataType[]>(AddressData);
const chosen_address = ref<number | null>(null);

const choseAddress = (id: number): void => {
  chosen_address.value = id;
};

const calculatedConvertPrice = (val: number): number => {
  return props.totalDiscount / val;
};

const deleteItem = (): void => {
  const keys: number[] = cartStore.cart.map((item) => item.product.id);
  cartStore.REMOVE_ITEM_FROM_CART(keys);
};

const toOrder = async (): Promise<void> => {
  if (chosen_address.value === null) return;

  const isValid = await cartStore.VALIDATE_CART_PRICES();
  if (!isValid) return;

  emit("cart-modal", false);
  setTimeout(() => {
    deleteItem();
    emit("cart-success-modal", true);
  }, 500);
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

      .checkout-error {
        margin-top: 12px;
        color: #ff7b7b;
        font-size: 14px;
      }

      .checkout-button {
        margin-top: 12px;
        width: 100%;
        height: 52px;
        padding: 15px 0;
        background-color: #f64e2a;
        border-radius: 14px;
        color: white;
        font-size: 16px;
        font-weight: 500;
        font-family: Inter, sans-serif;

        &:disabled {
          opacity: 0.5;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .cart-summary__modal {
    align-items: flex-end;

    .cart-summary__container {
      width: 100%;
      padding: 0;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

      .cart-summary-drag {
        display: flex;
      }

      .summary-header {
        padding: 0 16px;

        button {
          display: none;

          img {
            display: none;
          }
        }
      }

      .summary-price__container {
        padding: 0 16px;
      }

      .summary-checkout {
        padding: 0 16px 20px 16px;
      }
    }
  }
}
</style>
