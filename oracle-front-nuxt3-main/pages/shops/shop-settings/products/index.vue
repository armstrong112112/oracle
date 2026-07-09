<template>
  <div class="products-page">
    <Header />
    <ShopSettingsLayout>
      <div class="settings-product-page">
        <div class="page-header">
          <HeaderMobile page-title="Products" with-page-title with-search-bar />
        </div>
        <div class="product__header">
          <h2>Products</h2>
          <div class="header__actions">
            <button>Bulk upload from CSV +</button>
            <nuxt-link to="/shops/listing?new-listing=1">
              <button>Add +</button>
            </nuxt-link>
          </div>
        </div>
        <div class="product__container">
          <nuxt-link
            v-for="product in products"
            :key="product.id"
            class="product"
            :to="`/shops/listing/${product.id}`">
            <ProductCard
              has-category
              :images="product.image"
              :title="product.name"
              :price="product.price"
              :item-left="product.itemLeft"
              :id="product.id" />
          </nuxt-link>
          <nuxt-link
            v-for="product in products"
            :key="`product-mobile-${product.id}`"
            class="product-mobile"
            :to="`/shops/listing/${product.id}`">
            <ProductMobile
              has-category
              :images="product.image"
              :title="product.name"
              :price="product.price"
              :item-left="product.itemLeft" />
          </nuxt-link>
        </div>
      </div>
    </ShopSettingsLayout>
  </div>
</template>
<script setup lang="ts">
import ProductCard from "~/entities/shop/product-card/index.vue";
import ProductMobile from "~/entities/shop/product-card/product-mobile.vue";
import { ProductsData } from "~/shared/constants/shops";
import type { ProductDataType } from "~/shared/types/shops";
import Header from "~/widgets/shop/header/index.vue";
import HeaderMobile from "~/widgets/shop/header/mobile.vue";
import ShopSettingsLayout from "~/widgets/shop/layouts/settings/index.vue";

definePageMeta({
  layout: "sidebar",
});

const products: ProductDataType[] = ProductsData;
const header_navigation = ref<boolean>(true);

const showHeader = (val: boolean): void => {
  header_navigation.value = val;
};
</script>
<style lang="scss">
.settings-product-page {
  .page-header {
    display: none;
    width: 100%;
    padding: 10px 16px;

    .chat-button {
      visibility: hidden;
    }

    .shop-search-bar {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;

      .search-input {
        width: 100%;
        position: relative;
        z-index: 1001;
        max-height: 44px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 13px;
        background-color: #1b1a24;
        border: 1px solid transparent;
        border-radius: 12px;

        &:focus-within {
          border: 1px solid #f64e2a;
        }

        input {
          padding: 10px 0;
          width: 100%;
          background-color: transparent;
          border: none;
          color: white;
          font: 400 14px Roboto, sans-serif;

          &:focus {
            outline: transparent;
          }

          &::placeholder {
            font-family: Roboto, sans-serif;
            font-size: 14px;
            color: #67639a;
          }
        }

        button {
          width: 18px;
          height: 18px;

          img {
            width: 100%;
            object-fit: contain;
          }
        }
      }

      .search-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 1);
        z-index: 1000;
      }

      .search-bar__wrapper {
        position: absolute;
        top: 70px;
        background-color: #1b1a24;
        border-radius: 12px;
      }

      .category-filter {
        width: 44px;
        height: 44px;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        color: white;
      }
    }
  }

  .product__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: #fff;
      font: 600 20px Roboto, sans-serif;
    }

    .header__actions {
      display: flex;
      align-items: center;
      gap: 12px;

      button {
        padding: 10px 14px;
        background: #1e1d28;
        border-radius: 12px;
        color: #fff;
        font: 500 14px Roboto, sans-serif;
      }
    }
  }

  .product__container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;

    .card-container {
      width: 169px;

      img {
        width: 169px;
      }
    }

    .product-mobile {
      display: none;
    }
  }
}

@media screen and (max-width: 1440px) {
  .settings-product-page {
    .product__container {
      width: fit-content;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media screen and (max-width: 1250px) {
  .settings-product-page {
    .product__container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 1100px) {
  .settings-product-page {
    .product__container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (max-width: 1000px) {
  .settings-product-page {
    .product__container {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}

@media screen and (max-width: 950px) {
  .settings-product-page {
    .product__container {
      margin: 0 auto;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media screen and (max-width: 750px) {
  .products-page {
    .shop-header-container {
      display: none;
    }
  }
  .settings-product-page {
    .page-header {
      display: block;
    }

    .product__header {
      padding: 0 10px;

      h2 {
        display: none;
      }

      .header__actions {
        width: 100%;
        justify-content: space-between;
      }
    }

    .product__container {
      width: 100%;
      padding: 0 10px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 500px) {
  .settings-product-page {
    .product__container {
      margin: 16px 0 0 0;
      grid-template-columns: repeat(1, 1fr);

      .product {
        display: none;
      }

      .product-mobile {
        display: block;

        .card-container-mobile {
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }
      }
    }
  }
}
</style>
