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
      <div
        v-if="
          $route.query.active !== 'true' &&
          $route.query.active !== 'false' &&
          $route.query.active !== 'progress'
        "
        class="container__label">
        <h4><span>48:32:38</span> time until deadline</h4>
        <img src="/svg/shop/icons/chat.svg" alt="chat" />
      </div>
      <div
        v-if="
          ($route.query.active !== 'progress' &&
            $route.query.active === 'true') ||
          $route.query.active === 'false'
        "
        class="container__label">
        <h4><span>Deal active for</span> 48:32:38</h4>
      </div>
      <div v-if="$route.query.active === 'progress'" class="orders-overdue">
        <h2>Delivery Overdue</h2>
        <h5>
          The overall time limit for this order has expired. Please deliver the
          work now or order will be canceled automatically.
        </h5>
        <h3>23:32:38 min</h3>
      </div>
      <div class="container__content">
        <div
          v-if="
            $route.query.active !== 'true' && $route.query.active !== 'false'
          "
          class="table__header">
          <div class="header-item">
            <h4>Total Price</h4>
            <h5>323 USD</h5>
          </div>
          <div class="header-item">
            <h4>Status</h4>
            <h5 v-if="$route.query.active !== 'progress'">Started</h5>
            <h5 v-if="$route.query.active === 'progress'">In Progress</h5>
          </div>
        </div>
        <div v-if="$route.query.active === 'true'" class="table__header active">
          <div class="header-item-profile">
            <img src="/svg/shop/images/profile-mock.png" alt="profile" />
            Store name
            <div class="rating">
              <span>4.5/5</span>
              <img src="/svg/shop/icons/star.svg" alt="profile" />
            </div>
          </div>
          <button class="header-item-chat">
            <img src="/svg/shop/icons/chat.svg" alt="chat" />
          </button>
        </div>
        <div
          v-if="$route.query.active === 'false'"
          class="table__header active">
          <div class="header-item-profile">
            <img src="/svg/shop/images/profile-mock.png" alt="profile" />
            Store name
            <div class="rating">
              <span>4.5/5</span>
              <img src="/svg/shop/icons/star.svg" alt="profile" />
            </div>
          </div>
          <button class="header-item-chat">
            <img src="/svg/shop/icons/chat.svg" alt="chat" />
          </button>
        </div>
        <div class="table__body">
          <div v-if="$route.query.active === 'true'" class="body-col">
            <div class="body-item">Status</div>
            <div v-if="$route.query.active === 'true'" class="body-item active">
              In Progress
            </div>
          </div>
          <div v-if="$route.query.active === 'false'" class="body-col">
            <div class="body-item">Status</div>
            <div class="body-item active">Completed</div>
          </div>
          <div class="body-col">
            <div class="body-item">Counterparty</div>
            <div class="body-item">
              <img src="/svg/shop/images/profile-mock.png" alt="profile" />
              Username
            </div>
          </div>
          <div class="body-col">
            <div class="body-item">Product</div>
            <div class="body-item">
              <img src="/svg/shop/images/cart-product.png" alt="cart" />
              Product name
            </div>
          </div>
          <div
            v-if="
              $route.query.active === 'true' || $route.query.active === 'false'
            "
            class="body-col">
            <div class="body-item">Total Price</div>
            <div class="body-item">325 USDT</div>
          </div>
          <div class="body-col">
            <div class="body-item">Paid with</div>
            <div class="body-item">USDT, **2343</div>
          </div>
          <div class="body-col">
            <div class="body-item">Crypto Sent</div>
            <div class="body-item">325 USDT</div>
          </div>
        </div>
      </div>
      <div
        v-if="$route.query.active === 'true' || $route.query.active === 'false'"
        class="container__files">
        <h4>Files Update</h4>
        <h6>May 23, 2025 at 12:23 PM</h6>
        <div class="files__items">
          <FilesUpdateProduct
            v-for="item in files_data"
            :key="item.id"
            :date="item.date"
            :filename="item.filename"
            :type="profile?.role !== 'seller' ? 'download' : 'edit'" />
        </div>
      </div>
      <div v-if="$route.query.active === 'progress'" class="container__files">
        <h4>Files Update</h4>
        <div class="files__items">
          <FilesUpdateProduct v-for="(item, index) in 5" :key="index" />
        </div>
      </div>
      <div
        v-if="
          ($route.query.active !== 'progress' &&
            $route.query.active === 'true') ||
          $route.query.active === 'false'
        "
        class="container__instructions">
        <h5>Instruction</h5>
        <h6>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type
        </h6>
      </div>
      <div class="container__actions">
        <button>Cancel</button>
        <button>Deliver Work</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopsStore } from "@/store/shops";
import FilesUpdateProduct from "~/features/shop/shop-settings/__index/files-update-product.vue";
import { FilesData } from "~/shared/constants/shops";
import type { FilesDataType } from "~/shared/types/shops";

definePageMeta({
  layout: "sidebar",
});

const shopsStore = useShopsStore();

const files_data: FilesDataType[] = FilesData;

const profile = computed(() => shopsStore.profile);
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
