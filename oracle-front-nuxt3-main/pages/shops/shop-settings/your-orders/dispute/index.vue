<template>
  <div class="dispute-page">
    <div class="dispute-page__container">
      <div class="container__content">
        <ShopHeaderMobile
          page-title="Order Details"
          with-page-title
          with-chat
          :with-helpers="profile?.role === 'seller'" />
        <div class="table-header__action">
          <button class="active">Resolved</button>
          <button>You Won</button>
        </div>
        <div class="table__body">
          <div class="body-col">
            <div class="body-item">Your Role</div>
            <div class="body-item">Costumer, Initiator</div>
          </div>
          <div class="body-col">
            <div class="body-item">Status</div>
            <div class="body-item active">Started</div>
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
      <div class="dispute-amount">
        <h5>Refund will be deposited shortly</h5>
        <h6>USDT Account ***2343</h6>
        <div class="amount__container">
          <div class="crypto-icon">
            <img src="/svg/shop/images/usdt.svg" alt="usdt" />
          </div>
          <div class="crypto-amount">
            <h3>100.00</h3>
            <h6>≈ $98.98</h6>
          </div>
        </div>
      </div>
      <div class="dispute-information">
        <div class="info-item">
          <h5>Moderator’s Resolution</h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div class="info-item">
          <h5>Desired Resolution</h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div class="info-item">
          <h5>Additional Details</h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopsStore } from "@/store/shops";

definePageMeta({
  layout: "sidebar",
});

const shopsStore = useShopsStore();

const profile = computed(() => shopsStore.profile);
</script>

<style lang="scss" scoped>
.dispute-page {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    width: 500px;

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

    .dispute-amount {
      margin-top: 24px;
      width: 100%;
      border-radius: 16px;
      border: 1px solid #2b2741;
      padding: 12px 0;
      text-align: center;

      h5 {
        color: #fff;
        font: 400 14px Roboto, sans-serif;
      }

      h6 {
        margin-top: 4px;
        color: #8780cf;
        font: 400 12px Roboto, sans-serif;
      }

      .amount__container {
        margin-top: 12px;
        padding: 16.5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        .crypto-icon {
          width: 40px;
          height: 40px;

          img {
            width: 100%;
            object-fit: contain;
          }
        }

        .crypto-amount {
          text-align: start;

          h3 {
            color: #fff;
            font: 400 20px Hector, sans-serif;
          }

          h6 {
            color: rgba(255, 255, 255, 0.3);
            font: 500 12px Hector, sans-serif;
          }
        }
      }
    }

    .dispute-information {
      width: 100%;
      margin-top: 24px;
      padding: 0 12px;

      .info-item {
        margin-top: 24px;

        h5 {
          color: #fff;
          font: 600 18px Roboto, sans-serif;
        }

        p {
          margin-top: 4px;
          color: #fff;
          font: 300 12px Roboto, sans-serif;
        }
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
    }
  }
}
</style>
