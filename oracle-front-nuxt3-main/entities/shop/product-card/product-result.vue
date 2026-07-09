<template>
  <div class="product-result__wrapper">
    <div class="product-swiper">
      <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper product-swiper-wrapper">
          <div
            v-for="item in images"
            :key="item.id"
            class="swiper-slide product-slide">
            <img :src="item.image" alt="slide" />
          </div>
        </div>
        <div class="product-pagination-container">
          <div class="product-count">{{ itemLeft }} left</div>
          <div class="product-seen">Seen</div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="product-information">
      <div class="product-info">
        <h5>{{ title }}</h5>
        <button>
          <img src="/svg/shop/icons/like.svg" alt="like" />
        </button>
      </div>
      <div class="product-price">
        <h4>
          $ {{ price }} <span>$ {{ discount }}</span>
        </h4>
        <div class="rating">
          <img
            width="16"
            height="16"
            src="/svg/shop/icons/profile-logo.svg"
            alt="profile" />
          <h4 :class="{ verified: isVerified }">{{ shopName }}</h4>
          <h5>{{ rating }}</h5>
          <img src="/svg/shop/icons/star.svg" alt="star" />
        </div>
      </div>
      <div class="product-action">
        <button>
          <img src="/svg/shop/icons/store-fill.svg" alt="shop" />
          Check Profile
        </button>
        <button class="active">
          <img src="/svg/shop/icons/chat.svg" alt="shop" />
          Message
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from "swiper";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { nextTick, onMounted, ref } from "vue";
import type { ProductSlidesType } from "~/shared/types/shops";

Swiper.use([Pagination]);

defineProps<{
  images: ProductSlidesType[];
  category?: string;
  title: string;
  shopName: string;
  rating: number;
  isVerified: boolean;
  itemLeft: number;
  price: number;
  discount: number;
}>();

const swiper = ref<HTMLElement | null>(null);

onMounted(() => {
  nextTick(() => {
    if (swiper.value) {
      new Swiper(swiper.value, {
        loop: true,
        autoplay: false,
        slidesPerView: 1,
        spaceBetween: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction",
          dynamicBullets: false,
          renderFraction: function (currentClass, totalClass) {
            return (
              '<span class="' +
              currentClass +
              '"></span>' +
              " of " +
              '<span class="' +
              totalClass +
              '"></span>'
            );
          },
        },
      });
    }
  });
});
</script>

<style lang="scss">
.product-result__wrapper {
  width: 350px;
  cursor: pointer;
  color: white;

  .product-swiper {
    width: 100%;
    position: relative;

    .swiper-container {
      position: relative;
      width: 100%;
      height: 100%;

      .product-slide {
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
        }
      }
    }

    .product-pagination-container {
      width: 100%;
      height: 100%;
      padding: 8px;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column-reverse;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 10;

      .product-count {
        padding: 4px 8px;
        border: 1px solid transparent;
        border-radius: 100px;
        background-color: rgba(122, 116, 186, 0.8);
        font-family: Roboto, sans-serif;
        font-size: 12px;
        font-weight: 500;
        display: block;
      }

      .product-seen {
        padding: 4px 8px;
        border: 1px solid transparent;
        border-radius: 100px;
        background-color: rgba(0, 0, 0, 0.15);
        font-family: Roboto, sans-serif;
        font-size: 12px;
        font-weight: 500;
        display: block;
      }

      .swiper-pagination {
        position: absolute;
        bottom: 8px;
        left: calc(100% / 2.3);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        padding: 2px;
        border: 1px solid transparent;
        border-radius: 100px;
        background-color: rgba(0, 0, 0, 0.15);
        z-index: 1000;

        .swiper-pagination-bullet {
          width: 4px;
          height: 4px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.8);
          opacity: 1;
          margin: 0 1px;

          &:last-child {
            width: 2px;
            height: 2px;
          }
        }

        .swiper-pagination-bullet-active {
          width: 8px;
          height: 4px;
          background-color: #fff;
          border-radius: 100px;
        }
      }
    }
  }

  .product-information {
    margin-top: 8px;
    padding: 0 8px;

    .product-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h5 {
        font: 400 16px Roboto, sans-serif;
      }
    }

    .product-price {
      margin-top: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h4 {
        display: flex;
        align-items: center;
        gap: 5px;
        font: 600 18px Roboto, sans-serif;

        span {
          font: 500 12px Roboto, sans-serif;
          color: #bfb7ff;
          text-decoration: line-through;
        }
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 4px;

        h4 {
          color: #fff;
          font: 400 14px Roboto, sans-serif;

          &.verified {
            color: #f64e2a;
          }
        }

        h5 {
          margin-left: 6px;
          font: 500 14px Roboto, sans-serif;
        }
      }
    }

    .product-action {
      margin-top: 16px;
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        flex: 1;
        padding: 10px 0;
        background: #1b1a24;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        color: #fff;
        font: 400 14px Roboto, sans-serif;

        img {
          width: 16px;
          height: 16px;
        }

        &.active {
          background: #f64e2a !important;
        }

        &:nth-child(2) {
          background: #2c2a3d;
        }
      }
    }
  }
}

.swiper-pagination-fraction {
  width: auto;
  min-width: 60px;
  height: 24px;
  margin: 0 auto;
  padding: 4px 8px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  text-align: center;
}
</style>
