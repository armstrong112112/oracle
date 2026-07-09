<template>
  <div class="choose-address__container">
    <div class="cart-summary__container">
      <div class="modal-header-button">
        <img src="/svg/shop/icons/close-line.svg" alt="line" />
      </div>
      <div class="summary-header">
        <h2>Choose Address</h2>
        <button @click="closeAddress">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="address-counter">
        <div class="address-counter-header" v-if="product.discount > 0">
          <h2>{{ product.discount }} ₽</h2>
          <h5>{{ product.price }} ₽</h5>
        </div>
        <div class="address-counter-header" v-else>
          <h2>{{ product.price }} ₽</h2>
        </div>
        <div class="counter">
          <button @click="decrement" :disabled="counter <= 1">
            <img src="/svg/shop/icons/decrement.svg" alt="decrement" />
          </button>
          <div class="counter-value">{{ counter }}</div>
          <button @click="increment">
            <img src="/svg/shop/icons/increment.svg" alt="increment" />
          </button>
        </div>
        <p>Max available: 234</p>
      </div>
      <div class="summary-price__container">
        <h4>Choose Crypto</h4>
        <CartAddress
          v-for="item in address"
          :key="item.id"
          :id="item.id"
          :icon="item.icon"
          :title="item.name"
          :price="calculatedConvertPrice(item.convertPrice)"
          :convert-price="item.convertPrice"
          :address="item.address"
          :checked="chosen_address === item.id"
          @select="choseAddress" />
      </div>
      <div class="summary-checkout">
        <div class="cart-summary">
          <div class="cart-summary__item">
            <h3>Products, {{ counter }} pcs.</h3>
            <h4>{{ totalPrice }} ₽</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Discount</h3>
            <h4>-{{ imDiscount }} ₽</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Total cost</h3>
            <h4>{{ totalDiscount }} ₽</h4>
          </div>
        </div>
        <button
          :disabled="chosen_address === null"
          class="checkout-button"
          @click="buyProduct">
          To order - {{ totalDiscount }} ₽
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useShopListingDetailStore } from "@/store/shops/listing/_id";
import CartAddress from "~/entities/shop/cart/cart-address.vue";
import type { AddressDataType } from "~/features/shop/_id/data/constants";
import { AddressData } from "~/features/shop/_id/data/constants";
import type { BuyProductType, ProductDataType } from "~/shared/types/shops";

// Props
interface Props {
  product: ProductDataType;
  Modal?: boolean;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  close: [];
}>();

// Composables
const router = useRouter();
const listingStore = useShopListingDetailStore();

// Reactive state
const address = AddressData;
const counter = ref<number>(1);
const discount = ref<number>(0);
const chosen_address = ref<number | null>(null);

// Computed
const totalPrice = computed(() => listingStore.totalPrice);
const totalDiscount = computed(() => listingStore.totalDiscount);
const imDiscount = computed(() => listingStore.imDiscount);

// Methods
const calculatedConvertPrice = (val: number) => {
  return listingStore.totalPrice / val;
};

const choseAddress = (id: number): void => {
  chosen_address.value = id;
};

const increment = (): void => {
  counter.value += 1;

  listingStore.INCREMENT(counter.value);
};

const decrement = (): void => {
  if (counter.value > 1) {
    counter.value -= 1;
    listingStore.DECREMENT(counter.value);
  }
};

const closeAddress = (): void => {
  emit("close");
};

const buyProduct = (): void => {
  const crypto: AddressDataType | undefined = AddressData.find(
    (item) => item.id === chosen_address.value
  );
  if (!crypto) return;
  const data: BuyProductType = {
    product: props.product,
    quantity: counter.value,
    method: "crypto",
    crypto: crypto.name,
    total_crypto_price: totalPrice.value / crypto.convertPrice,
    total_price: totalDiscount.value,
  };
  listingStore.BUY_PRODUCT(data);
  router.push("/shops/order");
};

// Lifecycle
onMounted(() => {
  listingStore.SET_DEFAULT_PRICE({
    price: props.product.price,
    discount: props.product.discount,
  });
});
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

    .modal-header-button {
      width: 100%;
      display: none;
      align-items: center;
      justify-content: center;
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
          text-decoration: line-through;
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

          &:disabled {
            opacity: 0.5;
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

        &:disabled {
          opacity: 0.5;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .choose-address__container {
    align-items: flex-end;

    .cart-summary__container {
      width: 100%;
      border-radius: 30px 30px 0 0;

      .modal-header-button {
        display: flex;
        margin-bottom: 24px;
      }

      .summary-checkout {
        .cart-summary {
          display: none;
        }
      }
    }
  }
}
</style>
