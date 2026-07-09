<template>
  <div class="favorites-searches">
    <div v-if="searches.length > 0" class="searches__items">
      <FavoriteItems
        v-for="item in searches"
        :key="item.id"
        :searches="item.searches"
        :searches-category="item.category"
        @delete="deleteSearch"
        variant="searches" />
    </div>
    <div v-else class="searches__no-items">
      <div class="no-items-image">
        <img src="/svg/shop/images/search-empty.png" alt="search" />
      </div>
      <h3>Save the search parameters and keep up to date with new listings.</h3>
      <nuxt-link to="/shops">
        <button>Search</button>
      </nuxt-link>
    </div>
    <DeleteItemModal
      v-if="delete_search"
      target="search"
      @close="delete_search = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FavoriteItems from "~/features/shop/shop-settings/favorites/items.vue";
import DeleteItemModal from "~/features/shop/shop-settings/products/delete-item.vue";
import { SearchData } from "~/shared/constants/shops";
import type { SearchDataType } from "~/shared/types/shops";

const delete_search = ref(false);
const searches = ref<SearchDataType[]>(SearchData);

const deleteSearch = (val: boolean): void => {
  delete_search.value = val;
};
</script>

<style lang="scss" scoped>
.favorites-searches {
  margin-top: 20px;

  .searches__no-items {
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    text-align: center;

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
}
</style>
