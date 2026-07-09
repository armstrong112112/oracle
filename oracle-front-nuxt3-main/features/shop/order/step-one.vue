<template>
  <div class="orders-product-page">
    <div class="orders-product-page__container">
      <div class="orders-header">
        <ShopHeaderMobile
          page-title="Order Details"
          with-page-title
          with-chat
          :with-helpers="profile?.role === 'seller'" />
      </div>
      <div v-if="profile?.role === 'seller'" class="container__label">
        <h4>
          <span>48:32:38</span>
          time until deadline
        </h4>
        <img src="/svg/shop/icons/chat.svg" alt="chat" />
      </div>
      <div v-else class="container__label">
        <h4>
          <span>Deal active for</span>
          48:32:38
        </h4>
        <img src="/svg/shop/icons/chat.svg" alt="chat" />
      </div>
      <div class="container__content">
        <div v-if="profile?.role === 'seller'" class="table__header">
          <div class="header-item">
            <h4>Total Price</h4>
            <h5 v-if="order?.total_crypto_price">
              {{ order?.total_crypto_price }} {{ order?.crypto }}
            </h5>
            <h5 v-else>{{ order?.total_price }} ₽</h5>
          </div>
          <div class="header-item">
            <h4>Status</h4>
            <h5>Started</h5>
          </div>
        </div>
        <div v-else class="table__header active">
          <div class="header-item-profile">
            <img
              width="28"
              height="28"
              :src="order?.product?.image[0].image"
              alt="profile" />
            {{ order?.product?.shopName }}
            <div class="rating">
              <span> {{ order?.product?.rating }} /5</span>
              <img src="/svg/shop/icons/star.svg" alt="profile" />
            </div>
          </div>
          <button class="header-item-chat">
            <img src="/svg/shop/icons/chat.svg" alt="chat" />
          </button>
        </div>
        <div class="table__body">
          <div v-if="profile?.role !== 'seller'" class="body-col">
            <div class="body-item">Status</div>
            <div class="body-item active">Started</div>
          </div>
          <div class="body-col">
            <div class="body-item">Counterparty</div>
            <div class="body-item">
              <img :src="profile?.image" alt="profile" />
              {{ profile?.name }}
            </div>
          </div>
          <div class="body-col">
            <div class="body-item">Product</div>
            <div class="body-item">
              <img :src="order?.product?.image[0].image" alt="cart" />
              {{ order?.product?.name }}
            </div>
          </div>
          <div v-if="profile?.role !== 'seller'" class="body-col">
            <div class="body-item">Total Price</div>
            <div class="body-item" v-if="order?.total_crypto_price">
              {{ order?.total_crypto_price.toFixed(3) }}
              {{ order?.crypto }}
            </div>
            <div class="body-item" v-else>{{ order?.total_price }} ₽</div>
          </div>
          <div class="body-col">
            <div class="body-item">Paid with</div>
            <div class="body-item">₽, **2343</div>
          </div>
          <div class="body-col">
            <div class="body-item">Crypto Sent</div>
            <div class="body-item" v-if="order?.total_crypto_price">
              {{ order?.total_crypto_price.toFixed(3) }}
              {{ order?.crypto }}
            </div>
            <div class="body-item" v-else>{{ order?.total_price }} ₽</div>
          </div>
        </div>
      </div>
      <div class="container__actions">
        <button @click="cancel">Cancel</button>
        <button @click="deliver_work" v-if="profile?.role === 'seller'">
          Deliver Work
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopHeaderMobile from "~~/widgets/shop/header/mobile.vue";

const emit = defineEmits<{
  (e: "deliver"): void;
}>();

const router = useRouter();

// Pinia stores
const shopsStore = useShopsStore();
const listingDetailStore = useShopListingDetailStore();

// Computed
const profile = computed(() => shopsStore.profile);
const order = computed(() => listingDetailStore.PRODUCT);

// Methods
const deliver_work = () => {
  emit("deliver");
};

const cancel = () => {
  router.push("/shops");
};

// Lifecycle
onMounted(() => {
  nextTick(() => {
    const actions = document.querySelector(
      ".container__actions"
    ) as HTMLElement;
    if (actions) {
      const height = actions.offsetHeight;
      const container = document.querySelector(
        ".orders-product-page__container"
      ) as HTMLElement;
      if (container) {
        container.style.paddingBottom = `${height + 20}px`;
      }
    }
  });
  shopsStore.SettingMockUser();
});
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

        &:nth-child(3) {
          background: #1b1a24;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
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
