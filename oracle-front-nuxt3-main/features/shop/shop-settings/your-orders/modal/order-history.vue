<template>
  <div class="order-history-modal">
    <div class="order-history__container">
      <div class="mobile-header-button">
        <button>
          <img src="/svg/shop/icons/close-line.svg" alt="line" />
        </button>
      </div>
      <div class="modal__header">
        <h2>Order history</h2>
        <button @click="close">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="modal__body">
        <div v-for="item in your_orders" :key="item.id" class="history-items">
          <h2>{{ item.date }}</h2>
          <OrderHistoryItems
            v-for="history in item.products"
            :key="history.id"
            :title="history.name"
            :image="history.image"
            :price="history.price" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderHistoryItems from "~/features/shop/shop-settings/your-orders/order-history/order-history-items.vue";
import { YourOrders } from "~/shared/constants/shops";
import type { YourOrdersType } from "~/shared/types/shops";

const your_orders = ref<YourOrdersType[]>(YourOrders);

const emit = defineEmits<{
  close: [];
}>();

const close = (): void => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.order-history-modal {
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
  user-select: none;

  .order-history__container {
    width: 500px;
    height: 644px;
    padding: 20px 8px 20px 24px;
    border-radius: 30px;
    background-color: #14131b;
    overflow: hidden;

    .mobile-header-button {
      display: none;
      align-items: center;
      justify-content: center;
    }

    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 16px;

      h2 {
        color: #fff;
        font: 500 20px Roboto, sans-serif;
      }
    }

    .modal__body {
      width: 100%;
      height: calc(100% - 20px);
      padding: 20px 11px 20px 0;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #343243;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #343243;
      }

      h2 {
        margin-left: 4px;
        color: #fff;
        font: 500 14px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .order-history-modal {
    align-items: flex-end;

    .order-history__container {
      width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      padding: 12px 5px 12px 12px;

      .mobile-header-button {
        display: flex;
      }

      .modal__header {
        margin-top: 20px;
        padding-right: 5px;
      }

      .modal__body {
        margin-top: 20px;
      }
    }
  }
}
</style>
