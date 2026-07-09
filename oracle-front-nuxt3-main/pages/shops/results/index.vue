<template>
  <div class="results-page">
    <Header />
    <div class="results">
      <div class="results-filter">
        <div class="filter-header">
          <h2>Filter</h2>
          <button>Reset</button>
        </div>
        <div class="filter-form">
          <CheckBox
            label=""
            variant="primary"
            :option="options"
            :selected="filter_checkbox"
            @checkbox="FilterCheckbox" />
        </div>
        <div class="form-action">
          <button>Save</button>
        </div>
      </div>
      <div class="results-wrapper">
        <div class="results-header-mobile">
          <button v-if="arrow_back" @click="goBack">
            <img src="/svg/arrow-back.svg" alt="back" />
          </button>
          <Searchbar @header="showArrow" />
        </div>
        <div class="results-header">
          <div class="filter-bar">
            <div class="notify">
              <img src="/svg/shop/icons/like.svg" alt="like" />
              Notify about new ones
            </div>
            <button @click="openFilter" class="filter">
              <img src="/svg/shop/icons/filter-icon.svg" alt="filter-icon" />
            </button>
          </div>
          <div class="filter-category">
            <button v-for="item in category" :key="item.id">
              {{ item.name }}
            </button>
          </div>
        </div>
        <div class="results-products-container">
          <nuxt-link
            class="product"
            v-for="(product, index) in products"
            :key="product.id"
            :to="`/shops/${product.name}`">
            <ProductCard
              hasLikeBtn
              :images="product.image"
              :title="product.name"
              :price="product.price"
              :item-left="product.itemLeft" />
          </nuxt-link>
          <nuxt-link
            class="product-mobile"
            v-for="(product, index) in products"
            :key="`products-${product.id}`"
            :to="`/shops/${product.name}`">
            <ProductResult
              :images="product.image"
              :title="product.name"
              :price="product.price"
              :item-left="product.itemLeft"
              :shop-name="product.shopName"
              :is-verified="product.isVerified"
              :rating="product.rating"
              :discount="product.discount" />
          </nuxt-link>
        </div>
      </div>
      <ProductFilter v-if="filter" @close="filter = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Searchbar from "~/components/ui/shops/searchbar/searchbar.vue";
import CheckBox from "~/components/ui/shops/utils/checkbox.vue";
import ProductCard from "~/entities/shop/product-card/index.vue";
import ProductResult from "~/entities/shop/product-card/product-result.vue";
import ProductFilter from "~/features/shop/results/modal/product-filter.vue";
import {
  Filter,
  ProductsData,
  ResultsCategory,
} from "~/shared/constants/shops";
import type {
  CheckBoxType,
  ProductDataType,
  ResultsCategoryType,
} from "~/shared/types/shops";
import Header from "~/widgets/shop/header/index.vue";

definePageMeta({
  layout: "sidebar",
});

const router = useRouter();

const options: CheckBoxType[] = Filter;
const products: ProductDataType[] = ProductsData;
const category: ResultsCategoryType[] = ResultsCategory;
const filter_checkbox = ref<number[]>([]);
const filter = ref<boolean>(false);
const arrow_back = ref<boolean>(true);

const goBack = (): void => {
  router.back();
};

const showArrow = (val: boolean): void => {
  arrow_back.value = val;
};

const openFilter = (): void => {
  filter.value = true;
};

const FilterCheckbox = ({ id, checked }: { id: number; checked: boolean }) => {
  if (checked && !filter_checkbox.value.includes(id)) {
    filter_checkbox.value.push(id);
  } else if (!checked) {
    filter_checkbox.value = filter_checkbox.value.filter((item) => item !== id);
  }
};
</script>

<style lang="scss">
.results {
  width: 100%;
  display: flex;
  align-items: stretch;
  position: relative;
  color: #fff;
  gap: 16px;

  .results-filter {
    width: 260px;
    margin-top: 12px;
    margin-left: 24px;

    .filter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        font: 700 20px Roboto, sans-serif;
      }

      button {
        color: #f64e2a;
        font: 500 14px Roboto, sans-serif;
      }
    }

    .filter-form {
      margin-top: 20px;

      .checkbox-options__container {
        background: transparent;
        padding-left: 0;

        .checkbox-option__item {
          border-bottom: 1px solid #2b2741;

          .option_checkbox {
            border: 1px solid #2b2b2b;
          }
        }
      }
    }

    .form-action {
      margin-top: 20px;
      width: 100%;

      button {
        width: 100%;
        border-radius: 12px;
        background: #f64e2a;
        padding: 10px 0;
        color: white;

        h2 {
          font: 400 14px Roboto, sans-serif;
        }
      }
    }
  }

  .results-wrapper {
    padding: 0 16px;

    .results-header-mobile {
      width: 100%;
      gap: 16px;
      display: none;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0;

      .shop-search-bar {
        flex: 2;
        display: flex;
        align-items: center;
        gap: 10px;

        .search-input {
          width: 100%;
          max-height: 44px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px;
          background-color: #1b1a24;
          border: 1px solid transparent;
          border-radius: 12px;
          position: relative;
          z-index: 1001;

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

          .search-results-container {
            padding: 6px;
          }
        }
      }
    }

    .results-header {
      width: 100%;
      overflow: auto;

      .filter-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .notify {
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          border: 1px solid #2b2741;
          color: white;
          font: 400 14px Roboto, sans-serif;
          cursor: pointer;
        }

        .filter {
          display: none;
        }
      }

      .filter-category {
        width: 100%;
        margin-top: 12px;
        overflow: auto;
        display: flex;
        align-items: center;
        gap: 8px;

        &::-webkit-scrollbar {
          display: none;
        }

        button {
          padding: 8px 12px;
          border-radius: 8px;
          background: #14131b;
          white-space: nowrap;
          color: white;
          font: 400 12px Roboto, sans-serif;
        }
      }
    }

    .results-products-container {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;

      .card-container {
        width: 200px;
        margin-top: 0;

        .card-swiper {
          height: 160px;
        }

        .product-slide {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .product-result__wrapper {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1440px) {
  .results {
    .results-wrapper {
      .results-products-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media screen and (max-width: 1220px) {
  .results {
    .results-wrapper {
      .results-products-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .results {
    .results-filter {
      width: 30%;
    }
  }
}

@media screen and (max-width: 1000px) {
  .results {
    .results-filter {
      display: none;
    }

    .results-wrapper {
      margin: 0 auto;

      .results-header {
        .filter-bar {
          .filter {
            display: block;
          }
        }
      }

      .results-products-container {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .results {
    .results-wrapper {
      .results-products-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .results-page {
    .shop-header-container {
      display: none;
    }
  }
  .results {
    .results-wrapper {
      .results-header-mobile {
        display: flex;
      }

      .results-products-container {
        grid-template-columns: repeat(2, 1fr);

        .product {
          display: none;

          .card-container {
            display: none;
          }
        }

        .product-result__wrapper {
          display: block;
          width: 300px;
        }
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .results {
    .results-wrapper {
      margin: 0 auto;
      padding: 0 16px;

      .results-header {
        width: 450px;
      }

      .results-products-container {
        grid-template-columns: repeat(1, 1fr);

        .product-result__wrapper {
          width: 450px;
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .results {
    .results-wrapper {
      .results-header {
        width: 350px;
      }

      .results-products-container {
        .product-result__wrapper {
          width: 350px;
        }
      }
    }
  }
}
</style>
