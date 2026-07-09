<template>
  <div>
    <div v-if="favorite_products.length > 0" class="favorites__items">
      <nuxt-link
        v-for="product in favorite_products"
        :key="product.id"
        :to="`/shops/listing/${product.id}`">
        <ProductCard
          hasLikeBtn
          :hasEditCheckbox="$route.query.edit === 'true'"
          :images="product.image"
          :title="product.name"
          :price="product.price"
          :item-left="product.itemLeft" />
      </nuxt-link>
    </div>
    <div v-else class="favorites__no-items">
      <div class="no-items-image">
        <img src="/svg/shop/images/Like.png" alt="ItemsEmpty" />
      </div>
      <h3>Favourites is Empty</h3>
      <h5>Add products that you like here</h5>
      <div class="no-items__action">
        <nuxt-link to="/shops">
          <button>Search</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import ProductCard from "~/entities/shop/product-card/index.vue";
import type { ProductDataType } from "~/shared/types/shops";
import { useShopListingsStore } from "~~/store/shops/listing";

const route = useRoute();
const listingStore = useShopListingsStore();

const favorite_products = computed((): ProductDataType[] => {
  return listingStore.FAVORITES_LIST;
});

onMounted(() => {
  listingStore.INIT_FAVORITES();
});
</script>

<style lang="scss">
.favorites__items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  color: white;

  .card-container {
    width: 168px;

    img {
      width: 100%;
    }
  }
}

.favorites__no-items {
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  h3 {
    color: #fff;
    font: 400 20px Hector, sans-serif;
  }

  h5 {
    color: #8780cf;
    font: 400 14px Roboto, sans-serif;
  }

  .no-items__action {
    button {
      padding: 11px 80px;
      background: #f64e2a;
      border-radius: 14px;
      color: #fff;
      font: 500 16px Roboto, sans-serif;
    }
  }
}

@media screen and (max-width: 1440px) {
  .favorites__items {
    width: fit-content;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1250px) {
  .favorites__items {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1100px) {
  .favorites__items {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1000px) {
  .favorites__items {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 950px) {
  .favorites__items {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 750px) {
  .favorites__items {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 550px) {
  .favorites__items {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
