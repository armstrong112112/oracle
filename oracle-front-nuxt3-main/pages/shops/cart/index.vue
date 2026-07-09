<template>
  <div class="cart-page">
    <Header />
    <HeaderMobile page-title="Cart" with-page-title />
    <div v-if="cartItems.length > 0" class="cart__container">
      <div class="cart-items__container">
        <div class="cart-discount__container">
          <div class="discount-product__count">
            <div class="discount-icon">
              <img src="/svg/shop/icons/discount.svg" alt="discount" />
            </div>
            <h4>Discounted items ({{ discountedItems?.length }})</h4>
          </div>
          <div class="discount-days__count">
            <h4>2 days left</h4>
          </div>
        </div>
        <div class="cart-products">
          <div class="cart-products__header">
            <div class="product__select">
              <div class="option_checkbox">
                <input
                  id="select-all"
                  type="checkbox"
                  name="select-all"
                  :checked="selectAll"
                  @click="selectAllItems" />
              </div>
              <label for="select-all">Select All</label>
            </div>
            <button @click="deleteItem">
              <img src="/svg/shop/icons/trash.svg" alt="trash" />
              Delete
            </button>
          </div>
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="cart-products__items">
            <CartProductItem
              :id="item.product.id"
              :title="item.product.name"
              :price="calcQuantityPrice(item.product.id)"
              :quantity="item.quantity"
              :image="item.product.image[0].image"
              :checked="checkItem[item.product.id]"
              @select="choseItem" />
          </div>
          <div
            v-for="item in cartItems"
            :key="`item-mobile-${item.product.id}`"
            class="cart-products__items-mobile">
            <CartProductMobile
              :title="item.product.name"
              :price="item.product.price"
              :discount="item.discount"
              :image="item.product.image[0].image" />
          </div>
        </div>
      </div>
      <div class="cart-products__container">
        <div class="cart-summary">
          <div class="cart-summary__item">
            <h3>Products, {{ calcTotalCount }} pcs.</h3>
            <h4>${{ calcTotal }}</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Discount</h3>
            <h4>-${{ calcHowMuchDiscount }}</h4>
          </div>
          <div class="cart-summary__item">
            <h3>Total cost</h3>
            <h4>${{ calcTotalDiscount }}</h4>
          </div>
        </div>
        <button class="checkout-button" @click="showCartModal(true)">
          To order - ${{ calcTotalDiscount }}
        </button>
      </div>
    </div>
    <div v-else class="cart__container-no-items">
      <div class="no-items">
        <img src="/svg/shop/images/empty-order.png" alt="empty" />
        <h4>It's empty yet</h4>
        <h6>
          Orders will be displayed here: active orders and orders from the last
          60 days
        </h6>
      </div>
    </div>
    <CartSuccess v-if="cart_success" @cart-success-modal="cartSuccessModal" />
    <CartSummaryModal
      v-if="cart_summary_modal"
      :products-count="calcTotalCount"
      :total-price="calcTotal"
      :total-discount="calcTotalDiscount"
      :discount-price="calcHowMuchDiscount"
      @cart-success-modal="cartSuccessModal"
      @cart-modal="showCartModal" />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import CartProductMobile from "~/entities/shop/cart/cart-product-mobile.vue";
import CartProductItem from "~/entities/shop/cart/cart-product.vue";
import CartSuccess from "~/features/shop/cart/modal/cart-success.vue";
import CartSummaryModal from "~/features/shop/cart/modal/cart-summary.vue";
import type { ProductDataType } from "~/shared/types/shops";
import { useCartStore } from "~/store/shops/cart";
import Header from "~~/widgets/shop/header/index.vue";
import HeaderMobile from "~~/widgets/shop/header/mobile.vue";

definePageMeta({
  layout: "sidebar",
});

interface CART_PRODUCT {
  quantity: number;
  product: ProductDataType;
  price: number;
  discount: number;
}

const cartStore = useCartStore();

const selectAll = ref(false);
const checkItem = ref<Record<number, boolean>>({});
const cart_summary_modal = ref(false);
const cart_success = ref(false);

const cartItems = computed((): CART_PRODUCT[] => {
  return cartStore.cart as CART_PRODUCT[];
});

const discountedItems = computed((): CART_PRODUCT[] | undefined => {
  return cartStore.DISCOUNT_ITEMS as CART_PRODUCT[] | undefined;
});

const choseItem = (itemId: number): void => {
  checkItem.value[itemId] = !checkItem.value[itemId];
};

const selectAllItems = (): void => {
  cartItems.value.forEach((item) => {
    checkItem.value[item.product.id] = !checkItem.value[item?.product.id];
  });
};

const deleteItem = (): void => {
  const keys: number[] = Object.keys(checkItem.value).map(Number);
  cartStore.REMOVE_ITEM_FROM_CART(keys);
};

const showCartModal = (value: boolean): void => {
  cart_summary_modal.value = value;
};

const cartSuccessModal = (value: boolean): void => {
  cart_success.value = value;
};

const calcQuantityPrice = (itemId: number): number => {
  const item: CART_PRODUCT | undefined = cartItems.value.find(
    (item) => item.product.id === itemId
  );
  if (!item) return 0;
  return item.quantity * item.price;
};

const calcQuantityDiscount = (itemId: number): number => {
  const item: CART_PRODUCT | undefined = cartItems.value.find(
    (item) => item.product.id === itemId
  );
  if (!item) return 0;
  return item.quantity * item.discount;
};

const calcTotal = computed((): number => {
  return cartItems.value.reduce(
    (total, item) => total + calcQuantityPrice(item.product.id),
    0
  );
});

const calcTotalCount = computed((): number => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const calcTotalDiscount = computed((): number => {
  return cartItems.value.reduce(
    (total, item) => total + calcQuantityDiscount(item.product.id),
    0
  );
});

const calcHowMuchDiscount = computed((): number => {
  return calcTotal.value - calcTotalDiscount.value;
});

watch(
  checkItem,
  () => {
    selectAll.value =
      cartItems.value.length > 0 &&
      cartItems.value.every((item) => checkItem.value[item.product.id]);
  },
  { deep: true }
);

onMounted(() => {
  cartStore.INIT_CART();
});
</script>
<style lang="scss" scoped>
.cart-page {
  width: 100%;

  .shop-header-mobile {
    width: 100%;
    padding: 10px 16px;
    display: none;
    align-items: center;

    button {
      flex: 1;
      display: flex;
      align-items: center;
    }

    h2 {
      flex: 1;
      color: white;
      font: 500 16px Roboto, san-serif;
    }
  }

  .cart__container {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 0 24px;

    .cart-items__container {
      flex: 1;

      .cart-discount__container {
        width: 100%;
        padding: 10px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #1b1a24;
        border-radius: 20px;

        .discount-product__count {
          display: flex;
          align-items: center;
          gap: 12px;

          .discount-icon {
            padding: 8px;
            border-radius: 12px;
            background-color: #292929;
          }

          h4 {
            color: white;
            font-family: Roboto, sans-serif;
            font-weight: 600;
            font-size: 14px;
          }
        }

        .discount-days__count {
          h4 {
            font-family: Roboto, sans-serif;
            font-weight: 600;
            font-size: 14px;
            color: #f64e2a;
          }
        }
      }

      .cart-products {
        width: 100%;
        margin-top: 10px;
        padding: 20px;
        border-radius: 20px;
        background-color: #1b1a24;
        user-select: none;

        .cart-products__header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 4px 0;

          .product__select {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;

            label {
              color: white;
              font-size: 14px;
              font-family: Inter, sans-serif;
              font-weight: 600;
            }

            .option_checkbox {
              width: 24px;
              height: 24px;
              border: 1px solid #707070;
              position: relative;
              border-radius: 30px;

              input[type="checkbox"] {
                width: 100%;
                height: 100%;
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
          }

          button {
            padding: 9px 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-radius: 12px;
            background-color: #2c2a3d;
            color: white;
            font-size: 14px;
            font-family: Roboto, sans-serif;
            font-weight: 600;
          }
        }

        .cart-products__items {
          margin-top: 12px;
        }

        .cart-products__items-mobile {
          margin-top: 8px;
          display: none;
        }
      }
    }

    .cart-products__container {
      flex: 1;
      max-width: 350px;
      padding: 20px;
      background-color: #1b1a24;
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

  .cart__container-no-items {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .no-items {
      margin-top: 150px;
      text-align: center;

      h4 {
        margin-top: 24px;
        color: white;
        font: 400 20px Hector, sans-serif;
      }

      h6 {
        width: 70%;
        margin: 8px auto;
        color: white;
        font: 400 14px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 1220px) {
  .cart-page {
    .cart__container {
      flex-direction: column;

      .cart-items__container {
        width: 100%;
      }

      .cart-products__container {
        width: 100%;
        max-width: 100%;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .cart-page {
    .shop-header-container {
      display: none;
    }

    .shop-header-mobile {
      display: flex;
    }

    .cart__container {
      padding: 0;

      .cart-items__container {
        .cart-discount__container {
          display: none;
        }

        .cart-products {
          padding: 0 0 150px 0;
          background-color: #000;

          .cart-products__header {
            padding: 0 16px;

            button {
              display: none;
            }
          }

          .cart-products__items {
            display: none;
          }

          .cart-products__items-mobile {
            display: block;
          }
        }
      }

      .cart-products__container {
        position: fixed;
        bottom: 0;
        border-radius: 0;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #111016;
        padding: 8px 20px 40px 20px;

        .checkout-button {
          margin: 0;
        }

        .cart-summary {
          display: none;
        }
      }
    }
  }
}
</style>
