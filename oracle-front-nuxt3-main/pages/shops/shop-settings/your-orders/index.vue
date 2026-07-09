<template>
  <div class="your-orders-page__wrapper">
    <Header />
    <ShopSettingsLayout>
      <div class="your-orders-page">
        <div class="your-orders__header">
          <h2>Your Orders</h2>
          <button @click="showHistory">Select</button>
        </div>
        <div v-if="your_orders.length > 0" class="your-orders__tab">
          <button
            :class="{ active: active_orders === 'active' }"
            @click="active_orders = 'active'">
            Active
          </button>
          <button
            :class="{ active: active_orders === 'finish' }"
            @click="active_orders = 'finish'">
            Finished
          </button>
        </div>
        <div v-if="your_orders.length > 0">
          <div
            v-for="item in your_orders"
            :key="item.id"
            class="your-orders__content">
            <h4>{{ item.date }}</h4>
            <div class="accordion">
              <div class="accordion__header" @click="toggle(item.id)">
                <span>Order №{{ item.id }}</span>
                <img
                  width="32px"
                  height="32px"
                  class="accordion__icon"
                  :class="{ 'accordion__icon--open': isOpen === item.id }"
                  src="/svg/shop/icons/arrow-down.svg"
                  alt="arrow" />
              </div>

              <transition name="accordion">
                <div v-show="isOpen === item.id" class="accordion__content">
                  <OrderProduct
                    v-for="product in item.products"
                    :key="product.id"
                    :title="product.name"
                    :image="product.image"
                    :price="product.price"
                    :shop-name="product.shopName" />
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div v-else class="your-orders__no-content">
          <div class="no-order">
            <img src="/svg/shop/images/empty-order.png" alt="empty" />
            <h4>It's empty yet</h4>
            <h6>
              Orders will be displayed here: active orders and orders from the
              last 60 days
            </h6>
          </div>
        </div>
      </div>
      <OrderHistory v-if="history" @close="closeHistory" />
    </ShopSettingsLayout>
  </div>
</template>
<script setup lang="ts">
import OrderProduct from "~/features/shop/shop-settings/__index/index.vue";
import OrderHistory from "~/features/shop/shop-settings/your-orders/modal/order-history.vue";
import { YourOrders } from "~/shared/constants/shops";
import type { YourOrdersType } from "~/shared/types/shops";
import Header from "~/widgets/shop/header/index.vue";
import ShopSettingsLayout from "~/widgets/shop/layouts/settings/index.vue";

definePageMeta({
  layout: "sidebar",
});

const your_orders: YourOrdersType[] = YourOrders;
const isOpen = ref<number | null>(null);
const active_orders = ref<"active" | "finish">("active");
const history = ref<boolean>(false);

const showHistory = (): void => {
  history.value = true;
};

const closeHistory = (): void => {
  history.value = false;
};

const toggle = (id: number): void => {
  isOpen.value = isOpen.value === id ? null : id;
};
</script>
<style lang="scss" scoped>
.your-orders-page {
  width: 100%;
  padding: 0 24px 0 0;

  .your-orders__header {
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: white;
      font: 600 20px Roboto, sans-serif;
    }

    button {
      padding: 10px 14px;
      background: #1e1d28;
      border-radius: 12px;
      color: white;
      font: 500 14px Roboto, sans-serif;
    }
  }

  .your-orders__tab {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      flex: 2;
      padding: 10px;
      border-radius: 8px;
      background: #14131b;
      color: white;
      font: 400 14px Roboto, sans-serif;

      &.active {
        background: #f64e2a;
      }
    }
  }

  .your-orders__content {
    margin-top: 20px;

    h4 {
      padding: 0 16px;
      color: white;
      font: 700 20px Roboto, sans-serif;
    }

    .accordion {
      margin-top: 8px;
      overflow: hidden;

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 16px;
        cursor: pointer;
        background-color: #000;
        user-select: none;

        span {
          color: #bfb7ff;
          font: 500 16px Roboto, sans-serif;
        }
      }

      &__icon {
        transition: transform 0.3s ease;

        &--open {
          transform: rotate(180deg);
        }
      }

      &__content {
        margin-top: 4px;
      }
    }

    .accordion-enter-active,
    .accordion-leave-active {
      transition: max-height 0.01s ease, opacity 0.01s ease;
    }

    .accordion-enter,
    .accordion-leave-to {
      max-height: 0;
      opacity: 0;
    }

    .accordion-enter-to,
    .accordion-leave {
      max-height: 500px;
      opacity: 1;
    }
  }

  .your-orders__no-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .no-order {
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

@media screen and (max-width: 750px) {
  .your-orders-page__wrapper {
    .shop-header-container {
      display: none;
    }
  }
  .your-orders-page {
    padding: 0;

    .your-orders__header {
      display: none;
    }

    .your-orders__tab {
      margin-top: 0;
      padding: 0 16px;
    }

    .your-orders__content {
      margin-top: 30px;
    }
  }
}
</style>
