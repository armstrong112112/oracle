<template>
  <div class="product-details-page">
    <Header />
    <div class="product-page-container">
      <div class="product-page-mobile-header">
        <button @click="goBack">
          <img src="/svg/arrow-back.svg" alt="back" />
        </button>
        <div class="header-actions">
          <button>
            <img src="/svg/shop/icons/Forward.svg" alt="Forward" />
          </button>
          <button @click="showMoreActions">
            <img src="/svg/shop/icons/More.svg" alt="More" />
          </button>

          <transition name="dropdown">
            <div v-if="moreActions" class="drop-down-actions">
              <button @click="goToEdit">
                Edit
                <img src="/svg/shop/icons/edit.svg" alt="edit" />
              </button>
              <button>
                Archive
                <img src="/svg/shop/icons/folder-fill.svg" alt="folder" />
              </button>
              <button>
                Delete Ad
                <img src="/svg/shop/icons/edit-trash.svg" alt="trash" />
              </button>
            </div>
          </transition>
        </div>
      </div>
      <div class="product-page-slider">
        <div ref="swiper" class="swiper-container">
          <div class="swiper-wrapper product-swiper-wrapper">
            <div
              v-for="item in slides"
              :key="item.id"
              class="swiper-slide product-page-slides">
              <img :src="item.image" :alt="`slide-${item.id}`" />
            </div>
          </div>
          <div class="product-swiper-pagination">
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="product-details">
        <div class="product-details_header">
          <div class="header-profile">
            <img src="/svg/shop/icons/profile-logo.svg" alt="profile" />
            <span>{{ currentProduct?.shopName }}</span>
            <span class="header-badge" v-if="currentProduct?.isVerified"
              >Verified</span
            >
          </div>
          <div class="header-listings">
            {{ currentProduct?.listings }} listings
          </div>
        </div>
        <div class="product-details_price">
          {{ currentProduct?.price }} ₽
          <span>{{ currentProduct?.discount }} ₽</span>
        </div>
        <div
          class="product-details_name"
          :class="{ out_stock: currentProduct?.isOutStock }">
          {{ currentProduct?.name }}
        </div>
        <div class="product-details_ratings">
          <div class="store-rating">
            <h5>Store Rating</h5>
            <span>
              {{ currentProduct?.rating }}
              <img src="/svg/shop/icons/star.svg" alt="star" />
            </span>
            <h6>{{ currentProduct?.reviews }} reviews</h6>
          </div>
          <div class="store-navigation">
            <div class="about-product" @click="aboutProductModal">
              <h6>About The Product</h6>
              <div class="about-icon">
                <img src="/svg/arrow-left.svg" alt="arrow-left" />
              </div>
            </div>
            <div class="about-shop" @click="goToShop(currentProduct?.shopName)">
              <div class="shop-profile">
                <img
                  src="/svg/shop/icons/seller-profile.svg"
                  alt="seller-profile" />
                <h6>About Shop</h6>
              </div>
              <div class="about-icon">
                <img src="/svg/arrow-left.svg" alt="arrow-left" />
              </div>
            </div>
          </div>
        </div>
        <div class="product-details_description">
          <h5>Description</h5>
          <h6>Instant Delivery</h6>
          <div class="description" :class="{ expanded: details }">
            <p>
              {{ currentProduct?.description }}
            </p>
            <span @click="showMoreInfo">{{
              details ? " Show less" : "...More"
            }}</span>
          </div>
        </div>
        <div v-if="currentProduct?.hasContact" class="product-contact">
          <div class="product-contact__label">Contact</div>
          <div class="contacts">
            <div
              v-for="item in currentProduct.contact"
              :key="item.id"
              class="contact-item">
              <img :src="item.icon" alt="telegram" />
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="product-details_views">
          <div class="views-listing">
            <h5>Listing #{{ currentProduct?.id }}</h5>
            <h5>Posted: {{ currentProduct?.date }}</h5>
          </div>
          <span>
            <img src="/svg/shop/icons/eye.svg" alt="eye" />
            {{ currentProduct?.views }} views</span
          >
        </div>
        <div v-if="!currentProduct?.hasContact" class="product-details_actions">
          <button
            :disabled="currentProduct?.isOutStock"
            v-if="$route.query.item === 'edit'"
            class="edit"
            @click="editListing">
            <img src="/svg/shop/icons/edit.svg" alt="edit" />
          </button>
          <button
            :disabled="currentProduct?.isOutStock || cartItem"
            @click="addToCart">
            Add to cart
          </button>
          <button :disabled="currentProduct?.isOutStock" @click="choseAddress">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <div class="product-recommendation">
      <h2>Other Shop’s Listings</h2>
      <div class="product-container">
        <nuxt-link
          v-for="product in products"
          :key="product.id"
          :to="`/shops/listing/${product.id}`">
          <ProductCard
            hasLikeBtn
            :images="product.image"
            :title="product.name"
            :price="product.price"
            :item-left="product.itemLeft"
            :id="product.id" />
        </nuxt-link>
      </div>
    </div>
    <OutOfStock v-if="outOfStock" @close="outOfStock = false" />
    <AboutProduct
      v-if="about_product && currentProduct"
      :product="currentProduct"
      @close="about_product = false" />
    <ChooseAddress
      v-if="choose_address && currentProduct"
      :product="currentProduct"
      @close="choose_address = false" />
  </div>
</template>

<script setup lang="ts">
import Header from "@/features/shop/ui/header/index.vue";
import { useCartStore } from "@/store/shops/cart";
import Swiper from "swiper";
import "swiper/css";
import { Pagination } from "swiper/modules";
import ProductCard from "~/entities/shop/product-card/index.vue";
import AboutProduct from "~/features/shop/_id/modal/about-product.vue";
import ChooseAddress from "~/features/shop/_id/modal/choose-address.vue";
import OutOfStock from "~/features/shop/_id/modal/out-of-stock.vue";
import { ProductPageSlidesData, ProductsData } from "~/shared/constants/shops";
import type { ProductDataType, ProductSlidesType } from "~/shared/types/shops";
Swiper.use([Pagination]);

definePageMeta({
  layout: "sidebar",
});

const route = useRoute();
const router = useRouter();
const swiper = ref<HTMLElement | null>(null);

const cartStore = useCartStore();

const slides: ProductSlidesType[] = ProductPageSlidesData;
const about_product = ref<boolean>(false);
const choose_address = ref<boolean>(false);
const details = ref<boolean>(false);
const moreActions = ref<boolean>(false);
const products: ProductDataType[] = ProductsData;
const outOfStock = ref<boolean>(false);

const currentProduct = computed((): ProductDataType | undefined => {
  const pathSegments = route.path.split("/");
  const rawSection = pathSegments[3];
  const id = Number(rawSection);

  return ProductsData.find((item) => item.id === id);
});

const cartItem = computed((): boolean => {
  return cartStore.CART_LIST.some(
    (item) => item.product.id === currentProduct.value?.id
  );
});

watch(
  currentProduct,
  (newProduct) => {
    outOfStock.value = !!newProduct?.isOutStock;
  },
  { immediate: true }
);

const goBack = (): void => {
  router.back();
};

const goToEdit = (): void => {
  router.push("/shops/listing?edit-listing&step=1");
};

const goToShop = (val: string | undefined): void => {
  router.push("/shops/" + val);
};

const showMoreActions = (): void => {
  moreActions.value = !moreActions.value;
};

const showMoreInfo = (): void => {
  details.value = !details.value;
};

const choseAddress = (): void => {
  choose_address.value = true;
};

const editListing = (): void => {
  router.push("/shops/listing");
};

const aboutProductModal = (): void => {
  about_product.value = true;
};

const addToCart = (): void => {
  cartStore.ADD_TO_CART(currentProduct.value?.id);
};

onMounted(() => {
  cartStore.INIT_CART();
  nextTick(() => {
    if (import.meta.client && swiper.value) {
      // eslint-disable-next-line no-new
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
.product-details-page {
  position: relative;
}

.product-page-container {
  width: 100%;
  padding: 24px 36px;
  display: flex;
  position: relative;

  .product-page-mobile-header {
    padding: 10px 16px;
    display: none;
    align-items: center;
    justify-content: space-between;

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;

      .drop-down-actions {
        width: 160px;
        border-radius: 12px;
        background: #191823;
        overflow: hidden;
        position: absolute;
        top: 30px;
        right: 0;
        z-index: 1000;

        button {
          width: 100%;
          padding: 12px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #2b2741;
          color: #fff;
          font: 400 14px Roboto, sans-serif;

          &:nth-child(3) {
            color: #f64e2a;
            border-bottom: 0;
          }
        }
      }
    }
  }

  .product-page-slider {
    flex: 1;
    max-width: 556px;
    min-width: 300px;
    max-height: 556px;
    min-height: 300px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 1;

    .swiper-container {
      width: 100%;

      .product-swiper-wrapper {
        .product-page-slides {
          img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            object-fit: cover;
          }
        }
      }

      .product-swiper-pagination {
        width: 100%;
        position: absolute;
        bottom: 16px;
        left: 45%;
      }
    }
  }

  .product-details {
    flex: 1;
    min-width: 320px;
    padding: 12px 38px 12px 32px;

    .product-details_header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;

      .header-profile {
        display: flex;
        align-items: center;
        gap: 8px;

        span {
          font-size: 14px;
          font-weight: 500;
          font-family: Roboto, sans-serif;
          color: white;
        }

        .header-badge {
          color: #f64e2a;
        }
      }

      .header-listings {
        color: #bfb7ff;
        font-size: 12px;
        font-weight: 400;
        font-family: Roboto, sans-serif;
      }
    }

    .product-details_price {
      margin-top: 24px;
      color: white;
      font-size: clamp(20px, 4vw, 28px);
      font-weight: 600;
      font-family: Roboto, sans-serif;
      display: flex;
      align-items: center;
      gap: 5.7px;
      flex-wrap: wrap;

      span {
        text-decoration: line-through;
        color: #bfb7ff;
        font-family: Roboto, sans-serif;
        font-size: clamp(14px, 3vw, 16px);
        font-weight: 500;
      }
    }

    .product-details_name {
      margin-top: 8px;
      font-size: clamp(16px, 3.5vw, 18px);
      font-weight: 400;
      font-family: Roboto, sans-serif;
      color: #fff;
      line-height: 1.4;

      &.out_stock {
        color: #bfb7ff;
      }
    }

    .product-details_ratings {
      width: 100%;
      margin-top: 24px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .store-rating {
        padding: 12px 24px;
        border-radius: 12px;
        background-color: #1b1a24;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 140px;
        flex: 0 0 auto;

        h5 {
          font-size: 12px;
          font-weight: 500;
          font-family: Roboto, sans-serif;
          color: white;
          text-align: center;
        }

        span {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          color: white;
          font-size: 18px;
          font-weight: 700;
          font-family: Roboto, sans-serif;
        }

        h6 {
          margin-top: 4px;
          color: #bfb7ff;
          font-size: 12px;
          font-weight: 500;
          font-family: Roboto, sans-serif;
          text-align: center;
        }
      }

      .store-navigation {
        flex: 1;
        min-width: 200px;

        .about-product {
          cursor: pointer;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #1b1a24;
          border-radius: 12px;

          h6 {
            font-size: 14px;
            font-weight: 500;
            font-family: Roboto, sans-serif;
            color: white;
          }
        }

        .about-shop {
          cursor: pointer;
          margin-top: 8px;
          padding: 9.5px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #1b1a24;
          border-radius: 12px;

          .shop-profile {
            display: flex;
            align-items: center;
            gap: 8px;

            h6 {
              font-size: 14px;
              font-weight: 500;
              font-family: Roboto, sans-serif;
              color: white;
            }
          }
        }
      }
    }

    .product-details_description {
      margin-top: 24px;

      h5 {
        color: #bfb7ff;
        font-size: 16px;
        font-weight: 600;
        font-family: Roboto, sans-serif;
      }

      h6 {
        margin-top: 8px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        font-family: Roboto, sans-serif;
      }

      .description {
        p {
          margin-top: 4px;
          color: #fff;
          font: 400 14px Roboto, sans-serif;
          line-height: 1.5;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        span {
          font: 400 14px Roboto, sans-serif;
          color: #f64e2a;
          cursor: pointer;
          white-space: nowrap;
        }

        &.expanded {
          p {
            -webkit-line-clamp: unset;
          }
        }
      }
    }

    .product-details_views {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      color: #bfb7ff;
      font-family: Roboto, sans-serif;
      flex-wrap: wrap;
      gap: 8px;

      .views-listing {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      h5 {
        font-size: 14px;
        font-weight: 400;
      }

      span {
        font-size: 14px;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .product-contact {
      margin-top: 24px;

      .product-contact__label {
        color: white;
        font-size: 16px;
        font-weight: 600;
        font-family: Roboto, sans-serif;
      }

      .contacts {
        .contact-item {
          cursor: pointer;
          margin-top: 8px;
          padding: 13px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          background-color: #13121b;
          color: white;
          font-size: 14px;
          font-weight: 400;
          font-family: Roboto, sans-serif;
        }
      }
    }

    .product-details_actions {
      margin-top: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;

      button {
        flex: 1;
        min-width: 120px;
        color: #fff;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        font-weight: 400;
        padding: 11px 16px;
        border-radius: 14px;
        background-color: #1b1a24;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:disabled {
          opacity: 0.5;
        }

        &.edit {
          max-width: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          border-radius: 20px;
        }

        &.opacity {
          opacity: 0.3;
        }

        &:nth-child(2) {
          background-color: #f64e2a;
        }

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}

.product-recommendation {
  width: 100%;
  padding: 24px 36px;

  h2 {
    color: white;
    font: 600 24px Roboto, sans-serif;
  }

  .product-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

    .card-container {
      width: 200px;

      .card-swiper {
        img {
          width: 100%;
        }
      }
    }
  }
}

.swiper-pagination-fraction {
  width: auto;
  min-width: 60px;
  margin: 0 auto;
  padding: 4px 8px;
  border-radius: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  text-align: center;
}

@media screen and (max-width: 1440px) {
  .product-page-container {
    padding: 20px 24px;
    gap: 24px;

    .product-details {
      padding: 12px 24px 12px 16px;
    }
  }

  .product-recommendation {
    .product-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media screen and (max-width: 1220px) {
  .product-recommendation {
    .product-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 1024px) {
  .product-page-container {
    padding: 16px 20px;
    gap: 20px;

    .product-page-slider {
      max-width: 450px;
    }

    .product-details {
      padding: 12px 16px;

      .product-details_ratings {
        .store-rating {
          padding: 10px 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .product-details-page {
    .shop-header-container {
      display: none;
    }
  }
  .product-page-container {
    flex-direction: column;
    padding: 0;
    gap: 12px;

    .product-page-mobile-header {
      display: flex;
    }

    .product-page-slider {
      max-width: 100%;
      max-height: unset;
      width: 100%;
      border-radius: 0;

      .swiper-container {
        .product-swiper-wrapper {
          .product-page-slides {
            img {
              border-radius: 0;
            }
          }
        }
      }
    }

    .product-details {
      width: 100%;
      padding: 0 16px 24px 16px;

      .product-details_ratings {
        .store-rating {
          height: 94px;
          align-self: flex-start;
          width: fit-content;
          padding: 12px 26.5px;
        }

        .store-navigation {
          width: 100%;

          .about-product {
            padding: 12px 16px;
          }

          .about-shop {
            padding: 9px 16px;
          }
        }
      }

      .product-details_actions {
        width: 100%;
        border-top: 1px solid #2b2741;
        padding: 12px 16px 24px 16px;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1000;
        background-color: #000;

        button {
          min-width: 100px;
          font-size: 14px;
        }
      }
    }
  }

  .product-recommendation {
    padding: 0 16px;

    .product-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (max-width: 480px) {
  .product-page-container {
    .product-details {
      .product-details_actions {
        button {
          width: 100%;
          min-width: auto;
        }
      }

      .product-details_header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .product-details_views {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  }

  .product-recommendation {
    .product-container {
      .card-container {
        width: 165px;
      }
    }
  }
}
</style>
