<template>
  <div class="card-container">
    <div class="card-swiper">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="1"
        :loop="true"
        :autoplay="false"
        :pagination="paginationConfig"
        class="swiper-container">
        <swiper-slide
          v-for="item in images"
          :key="item.id"
          class="product-slide">
          <img :src="item.image" alt="images" />
        </swiper-slide>
        <div v-if="hasEditCheckbox" class="select-product">
          <input
            id="select-all"
            type="checkbox"
            name="select-product"
            @click.stop />
        </div>
        <div class="card-pagination-container">
          <div class="card-count">{{ itemLeft }} left</div>
          <div ref="paginationRef" class="swiper-pagination"></div>
        </div>
      </swiper>
    </div>
    <div class="card-info-container">
      <div class="card-info">
        <div class="card-text">{{ title }}</div>
        <button
          v-if="hasLikeBtn"
          class="card-favorite"
          @click.stop.prevent="handleLike">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            :fill="isLiked ? '#f64e2a' : 'none'"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.99984 6.66667H3.33317C2.4127 6.66667 1.6665 7.41286 1.6665 8.33333V15.8333C1.6665 16.7538 2.4127 17.5 3.33317 17.5H4.99984C5.92031 17.5 6.6665 16.7538 6.6665 15.8333V8.33333C6.6665 7.41286 5.92031 6.66667 4.99984 6.66667Z"
              :stroke="isLiked ? '#f64e2a' : 'white'"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M13.2306 17.5H10.1758C9.51767 17.5 8.87431 17.3052 8.32676 16.9402L7.03759 16.0807C6.80575 15.9262 6.6665 15.666 6.6665 15.3873V8.55464C6.6665 8.40961 6.70435 8.2671 6.7763 8.14119L9.99984 2.5H11.1071C12.771 2.5 13.7635 4.35447 12.8405 5.73896L11.6665 7.5H16.1985C17.2828 7.5 18.0784 8.51898 17.8154 9.57089L16.4644 14.9751C16.0934 16.459 14.7601 17.5 13.2306 17.5Z"
              :stroke="isLiked ? '#f64e2a' : 'white'"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div v-if="hasCategory" class="card-category">{{ category }}</div>
      <div class="card-price">$ {{ price }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDataType, ProductSlidesType } from "@/shared/types/shops";
import { useShopListingsStore } from "@/store/shops/listing";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import { computed, onMounted, ref } from "vue";

// Modules
const modules = [Pagination];

const paginationRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  images: ProductSlidesType[];
  hasLikeBtn?: boolean;
  hasEditCheckbox?: boolean;
  hasCategory?: boolean;
  category?: string;
  title: string;
  itemLeft: number;
  price: number;
  id: number;
}>();

const shopListingStore = useShopListingsStore();

const paginationConfig = computed(() => ({
  el: paginationRef.value,
  clickable: true,
  type: "bullets" as const,
  dynamicBullets: false,
}));

const isLiked = computed((): boolean => {
  return shopListingStore.FAVORITES_LIST.some(
    (item: ProductDataType) => item.id === props.id
  );
});

const handleLike = (): void => {
  shopListingStore.ADD_TO_FAVORITES(props.id);
};

onMounted(() => {
  shopListingStore.INIT_FAVORITES();
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
    border-radius: 8px;
    overflow: hidden;
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
        width: 100%;
        font-family: Roboto, sans-serif;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
        height: calc(1.4em * 2);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .card-favorite {
        cursor: pointer;

        &.liked {
          background-color: #f64e2a;
        }
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
      }
    }
  }
}
</style>
