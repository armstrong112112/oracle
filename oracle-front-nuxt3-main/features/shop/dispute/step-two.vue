<template>
  <div class="dispute-page">
    <div class="dispute-page__container">
      <div class="page-header">
        <ShopHeaderMobile page-title="Dispute Creation" with-page-title />
      </div>
      <div class="container__content">
        <div v-if="profile?.role !== 'seller'" class="table__header active">
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
        <div v-else class="table__header active">
          <div class="header-item">
            <h4>Total Price</h4>
            <h5 v-if="order?.total_crypto_price">
              {{ order?.total_crypto_price }} {{ order?.crypto }}
            </h5>
            <h5 v-else>{{ order?.total_price }} ₽</h5>
          </div>
          <div class="header-item">
            <h4>Status</h4>
            <h5>In Progress</h5>
          </div>
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
      <div class="dispute-action">
        <button>Open Dispute</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopsStore } from "@/store/shops";
import { useShopListingDetailStore } from "@/store/shops/listing/_id";

const shopsStore = useShopsStore();
const listingStore = useShopListingDetailStore();

const profile = computed(() => shopsStore.profile);
const order = computed(() => listingStore.PRODUCT);
</script>

<style lang="scss">
.dispute-page {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    width: 500px;

    .page-header {
      width: 100%;
      padding: 10px 16px;
      display: none;

      .chat-button {
        visibility: hidden;
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

      .table-header__action {
        padding: 0 16px 12px 16px;

        button {
          color: #31f62a;
          padding: 5.5px 10px;
          border-radius: 8px;

          &.active {
            background: #31f62a;
            color: #000;
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

    .dispute-action {
      width: 100%;
      margin-top: 32px;

      button {
        width: 100%;
        padding: 12px 0;
        border-radius: 14px;
        background: #f64e2a;
        color: #fff;
        font: 400 16px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .dispute-page {
    position: relative;

    &__container {
      width: 100%;
      padding: 0 16px;

      .page-header {
        display: block;
      }

      .container__content {
        margin-top: 10px;
      }
    }
  }
}
</style>
