<template>
  <div class="order-page">
    <Header />
    <div>
      <OrderStepOne
        v-if="$route.query.order === 'start'"
        @deliver="deliver_work_modal" />
      <OrderStepTwo v-if="$route.query.order === 'deal'" />
      <OrderStepThree v-if="$route.query.order === 'order'" />
      <OrderStepFour v-if="$route.query.order === 'overdue'" />
      <OrderStepFive v-if="$route.query.order === 'await'" />
      <OrderStepSix v-if="$route.query.order === 'complete'" />
      <OrderStatusCompleted v-if="$route.query.order === 'completed2'" />
      <DeliverModal v-if="deliver_work" @close="close_deliver_work_modal" />
    </div>
  </div>
</template>
<script setup lang="ts">
import DeliverModal from "~/features/shop/order/modal/deliver.vue";
import OrderStatusCompleted from "~/features/shop/order/status-completed.vue";
import OrderStepFive from "~/features/shop/order/step-five.vue";
import OrderStepFour from "~/features/shop/order/step-four.vue";
import OrderStepOne from "~/features/shop/order/step-one.vue";
import OrderStepSix from "~/features/shop/order/step-six.vue";
import OrderStepThree from "~/features/shop/order/step-three.vue";
import OrderStepTwo from "~/features/shop/order/step-two.vue";
import Header from "~/widgets/shop/header/index.vue";

definePageMeta({
  layout: "sidebar",
});

const route = useRoute();
const router = useRouter();

// Handle redirect if no order query param
if (!route.query.order) {
  router.replace({
    path: route.path,
    query: { ...route.query, order: "start" },
  });
}

const deliver_work = ref<boolean>(false);

const deliver_work_modal = (): void => {
  deliver_work.value = true;
};

const close_deliver_work_modal = (): void => {
  deliver_work.value = false;
};
</script>

<style lang="scss" scoped>
.orders-product-page {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;

  &__container {
    width: 500px;

    .orders-header {
      display: none;
    }

    .order-completed {
      width: 100%;
      text-align: center;
      margin: 12px 0;

      h2 {
        color: white;
        font: 400 32px Hector, sans-serif;
      }

      .order-status {
        width: 100%;
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;

        h4 {
          color: #31f62a;
          font: 500 14px Hector, sans-serif;
        }
      }
    }

    .container__label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h4 {
        color: white;
        font: 400 24px Hector, sans-serif;

        span {
          color: #bfb7ff;
        }
      }
    }

    .orders-overdue {
      padding: 0 12px;

      h2 {
        color: white;
        font: 400 24px Hector, sans-serif;
      }

      h5 {
        margin-top: 4px;
        color: #bfb7ff;
        font: 400 14px Hector, sans-serif;
      }

      h3 {
        margin-top: 12px;
        color: #bfb7ff;
        font: 400 24px Hector, sans-serif;
      }
    }

    .container__content {
      width: 100%;
      border-radius: 12px;
      border: 1px solid #2b2741;
      margin-top: 24px;
      overflow: hidden;

      .table__header {
        display: flex;
        align-items: center;
        padding: 12px;
        border-bottom: 1px solid #2b2741;

        &.active {
          justify-content: space-between;
        }

        .header-item {
          flex: 1;

          h4 {
            color: #bfb7ff;
            font: 400 14px Roboto, sans-serif;
          }

          h5 {
            margin-top: 4px;
            color: #fff;
            font: 400 14px Roboto, sans-serif;
          }

          &:nth-child(2) {
            h5 {
              color: #31f62a;
            }
          }
        }

        .header-item-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font: 500 14px Roboto, sans-serif;

          .rating {
            display: flex;
            align-items: center;
            gap: 4px;

            span {
              color: white;
              font: 500 14px Roboto, sans-serif;
            }
          }
        }
      }

      .table__body {
        width: 100%;

        .body-col {
          display: flex;
          align-items: center;

          .body-item {
            flex: 1;
            height: 32px;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 1px solid #2b2741;
            color: #fff;
            font: 400 12px Roboto, sans-serif;

            &.active {
              color: #31f62a;
            }

            img {
              width: 20px;
              height: 20px;
              object-fit: contain;
            }

            &:nth-child(1) {
              border-right: 1px solid #2b2741;
              background: #14131b;
            }
          }
        }
      }
    }

    .container__files {
      margin-top: 24px;

      h4 {
        color: white;
        font: 500 16px Roboto, sans-serif;
      }

      h6 {
        color: #bfb7ff;
        font: 400 12px Roboto, sans-serif;
      }

      .files__items {
        margin-top: 8px;
      }
    }

    .container__instructions {
      margin-top: 12px;

      h5 {
        color: white;
        font: 600 16px Roboto, sans-serif;
      }

      h6 {
        color: white;
        font: 400 14px Roboto, sans-serif;
      }
    }

    .container__actions {
      width: 100%;
      margin-top: 24px;
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        flex: 2;
        padding: 10px 0;
        border-radius: 12px;
        background: #1b1a24;
        color: white;
        font: 400 14px Roboto, sans-serif;

        &:nth-child(2) {
          background: #f64e2a;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .order-page {
    .shop-header-container {
      display: none;
    }
  }
  .orders-product-page {
    position: relative;
    margin-top: 0;

    .orders-product-page__container {
      width: 100%;
      padding: 0 16px;

      .orders-header {
        display: block;
      }

      .container__label {
        img {
          display: none;
        }
      }

      .container__instructions {
        display: none;
      }

      .container__files {
        h6 {
          display: none;
        }
      }

      .container__actions {
        border-top: 1px solid #2b2741;
        width: 100%;
        padding: 12px 16px 24px 16px;
        position: fixed;
        left: 0;
        bottom: 0;
        flex-direction: column;
        background: #0a090f;

        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
