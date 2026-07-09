<template>
  <div class="shop-page">
    <Header />
    <ShopHeaderMobile
      page-title="Store"
      with-page-title
      with-search-bar
      with-filter />
    <div class="shop-container">
      <div class="filter-buttons">
        <button
          :class="{ active: active_listings === 'rec' }"
          @click="active_listings = 'rec'">
          Recommendations
        </button>
        <button
          :class="{ active: active_listings === 'new' }"
          @click="active_listings = 'new'">
          New Listings
        </button>
        <button @click="showModal">
          <img src="/svg/shop/icons/filter-icon.svg" alt="" />
        </button>
      </div>
      <div class="product-container">
        <nuxt-link
          v-for="product in products"
          :key="product.id"
          :to="`/shops/listing/${product.id}`">
          <ProductCard
            hasLikeBtn
            :id="product.id"
            :images="product.image"
            :title="product.name"
            :price="product.price"
            :item-left="product.itemLeft" />
        </nuxt-link>
      </div>
    </div>

    <FilterModal
      v-if="filter_modal"
      :isOpen="filter_modal"
      @close="closeModal" />

    <CreateShopNotification v-if="storeQuery === 'create'" />
    <CreateShop v-if="storeQuery === 'form'" />
    <WheelOfFortune v-if="storeQuery === 'fortune'" @close="closeWheel" />
    <WheelResult v-if="storeQuery === 'result'" @close="closeWheelResult" />

    <div class="shop-tab">
      <FooterTab />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ProductCard from "~/entities/shop/product-card/index.vue";
import CreateShopNotification from "~/features/shop/__index/create-shop-notification.vue";
import CreateShop from "~/features/shop/__index/create-shop.vue";
import FilterModal from "~/features/shop/__index/filters.vue";
import {
  getStoreQuery,
  type StoreQueryType,
} from "~/features/shop/__index/model/query-store";
import WheelResult from "~/features/shop/__index/result-modal.vue";
import WheelOfFortune from "~/features/shop/__index/wheel-of-fortune.vue";
import { ProductsData } from "~/shared/constants/shops";
import type { ProductDataType } from "~/shared/types/shops";
import FooterTab from "~~/widgets/shop/footer-tab/index.vue";
import Header from "~~/widgets/shop/header/index.vue";
import ShopHeaderMobile from "~~/widgets/shop/header/mobile.vue";

definePageMeta({
  layout: "sidebar",
});

const router = useRouter();
const route = useRoute();

const products = ref<ProductDataType[]>(ProductsData);
const active_listings = ref<"rec" | "new">("rec");
const filter_modal = ref(false);

const storeQuery = computed((): StoreQueryType => {
  return getStoreQuery(route);
});

const showModal = (): void => {
  filter_modal.value = true;
};

const closeModal = (): void => {
  filter_modal.value = false;
};

const closeWheel = (): void => {
  router.replace({ query: {} });
};

const closeWheelResult = (): void => {
  router.replace({ query: {} });
};

onMounted(() => {
  active_listings.value = "rec";
});
</script>

<style lang="scss">
.shop-page {
  width: 100%;

  .shop-header-mobile {
    display: none;
  }

  .shop-container {
    width: 800px;
    margin: 24px auto;

    .filter-buttons {
      display: flex;
      gap: 10px;

      button {
        padding: 10px 16px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        background-color: #1b1a24;
        box-sizing: border-box;

        &.active {
          background-color: #f64e2a;
        }

        &:nth-child(1) {
          width: 351px;
        }

        &:nth-child(2) {
          width: 351px;
        }

        &:nth-child(3) {
          margin-left: 18px;
          padding: 4px;
          background-color: transparent;
        }
      }
    }

    .product-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;

      a {
        text-decoration: none;
        color: white;

        .card-container {
          width: 180px;

          .swiper-slide {
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .shop-tab {
    width: 100%;
    display: none;
    position: fixed;
    border-top: 1px solid #2b2741;
    background-color: #1b1a24;
    bottom: 0;
    z-index: 9999;
  }
}

@media screen and (max-width: 1100px) {
  .shop-page {
    .shop-container {
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;

      .filter-buttons {
        margin: 0 auto;

        button {
          &:nth-child(1) {
            width: 250px;
          }

          &:nth-child(2) {
            width: 250px;
          }
        }
      }

      .product-container {
        width: fit-content;
        margin: 0 auto;
        gap: 16px;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .shop-page {
    .shop-container {
      width: 80%;
    }
  }
}

@media screen and (max-width: 750px) {
  .shop-page {
    .shop-header-container {
      display: none;
    }

    .shop-header-mobile {
      display: block;
    }

    .shop-container {
      width: 100%;

      .filter-buttons {
        button {
          &:nth-child(1) {
            width: 280px;
          }

          &:nth-child(2) {
            width: 280px;
          }

          &:nth-child(3) {
            display: none;
          }
        }
      }
    }

    .shop-tab {
      display: block;
    }
  }
}

@media screen and (max-width: 600px) {
  .shop-page {
    .shop-container {
      .filter-buttons {
        button {
          &:nth-child(1) {
            width: 166.5px;
          }

          &:nth-child(2) {
            width: 166.5px;
          }
        }
      }

      .product-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        a {
          .card-container {
            width: 167.5px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .shop-page {
    .shop-container {
      .product-container {
        gap: 8px;
      }
    }
  }
}
</style>
