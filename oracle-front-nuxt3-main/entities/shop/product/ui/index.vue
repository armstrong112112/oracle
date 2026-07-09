<template>
  <div class="card-container">
    <div class="card-swiper">
      <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper card-swiper-wrapper">
          <div
            v-for="(item, index) in products"
            :key="index"
            class="swiper-slide product-slide">
            <img :src="item.image" alt="" />
          </div>
        </div>
        <div v-if="$route.query.edit === 'true'" class="select-product">
          <input type="checkbox" name="select-product" />
        </div>
        <div class="card-pagination-container">
          <div class="card-count">28 left</div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="card-info-container">
      <div class="card-info">
        <div class="card-text">Name of the service or product</div>
        <button
          v-if="$route.fullPath !== '/shops/shop-settings/products'"
          class="card-favorite">
          <img src="/svg/shop/icons/like.svg" alt="like" />
        </button>
      </div>
      <div
        v-if="$route.fullPath === '/shops/shop-settings/products'"
        class="card-category">
        category
      </div>
      <div class="card-price">$ 2 990</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from "swiper";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { nextTick, onMounted, ref } from "vue";
import { ProductSlidesData } from "../dto/data.dto";

Swiper.use([Pagination]);

const route = useRoute();

const swiper = ref<HTMLElement | null>(null);
const products = ProductSlidesData;

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
          type: "bullets",
          dynamicBullets: false,
        },
      });
    }
  });
});
</script>

<style lang="scss">
.card-container {
  width: 180px;
  height: 217px;
  margin-top: 16px;
  cursor: pointer;
  color: white;

  .card-swiper {
    width: 100%;
    position: relative;

    .swiper-container {
      position: relative;
      width: 100%;
      height: 100%;

      .product-slide {
        border-radius: 8px;
        overflow: hidden;
      }
    }

    .select-product {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 10;
      border: 1px solid #60578e;
      border-radius: 30px;

      input[type="checkbox"] {
        width: 100%;
        height: 100%;
        appearance: none;
        -webkit-appearance: none;
        border: transparent;
        background-color: transparent;
        cursor: pointer;
        clip-path: circle(46% at 50% 50%);

        &:checked {
          background-color: #f64e2a;

          &::after {
            content: url("data:image/svg+xml;utf8,%3Csvg%20width%3D%229%22%20height%3D%2210%22%20viewBox%3D%220%200%209%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%205.83333L3.43229%208.20829C3.52379%208.29764%203.67449%208.27933%203.74194%208.17067L7.88235%201.5%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E");
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }
        }
      }
    }

    .card-pagination-container {
      position: absolute;
      width: 90%;
      display: flex;
      align-items: end;
      justify-content: space-between;
      left: 12px;
      bottom: 8px;
      z-index: 1000;

      .card-count {
        height: 24px;
        padding: 4px 8px;
        border: 1px solid transparent;
        border-radius: 100px;
        background-color: rgba(122, 116, 186, 0.8);
        font-family: Roboto, sans-serif;
        font-size: 12px;
        font-weight: 500;
        display: block;
      }

      .swiper-pagination {
        position: absolute;
        bottom: 5px;
        left: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        padding: 2px;
        border: 1px solid transparent;
        border-radius: 100px;
        background-color: rgba(0, 0, 0, 0.6);
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

  .card-info-container {
    width: 100%;
    padding: 4px 6px;

    .card-info {
      width: 100%;
      display: flex;
      align-self: center;
      gap: 8px;

      .card-text {
        font-family: Roboto, sans-serif;
        font-size: 12px;
        font-weight: 400;
      }

      .card-favorite {
        cursor: pointer;
      }
    }

    .card-category {
      margin-top: 4px;
      color: #7873b4;
      font: 500 16px Roboto, sans-serif;
    }

    .card-price {
      margin-top: 4px;
      font-family: Roboto, sans-serif;
      font-size: 12px;
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 500px) {
  .card-container {
    width: 167px;

    .card-swiper {
      .swiper-container {
        .card-swiper-wrapper {
          .product-slide {
            img {
              height: 160px;
            }
          }
        }

        .card-pagination-container {
          width: 90%;
          left: 5.5px;
        }

        .card-info-container {
        }
      }
    }
  }
}
</style>
