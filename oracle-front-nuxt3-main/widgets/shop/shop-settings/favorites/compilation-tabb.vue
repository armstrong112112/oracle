<template>
  <div class="favorites-compilation">
    <div v-if="compilations.length > 0" class="compilation__items">
      <FavoriteItems
        v-for="item in compilations"
        :key="item.id"
        :compilation="item.compilation"
        :compilation-listings="item.listing"
        @delete="deleteCompilation"
        variant="compilations" />
    </div>
    <div v-else class="compilation__no-items">
      <div class="no-items-image">
        <img src="/svg/shop/images/ItemsEmpty.png" alt="ItemsEmpty" />
      </div>
      <h3>Compilations is Empty</h3>
      <h5>Create thematic сompilations and add ads to them</h5>
      <div class="no-items__action">
        <button>Create a Compilation</button>
      </div>
    </div>
    <DeleteItemModal
      v-if="delete_compilation"
      target="compilation"
      @close="delete_compilation = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FavoriteItems from "~/features/shop/shop-settings/favorites/items.vue";
import DeleteItemModal from "~/features/shop/shop-settings/products/delete-item.vue";
import { CompilationData } from "~/shared/constants/shops";
import type { CompilationDataType } from "~/shared/types/shops";

const delete_compilation = ref(false);
const compilations = ref<CompilationDataType[]>(CompilationData);

const deleteCompilation = (val: boolean): void => {
  delete_compilation.value = val;
};
</script>

<style lang="scss" scoped>
.favorites-compilation {
  margin-top: 20px;

  .compilation__no-items {
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
}
</style>
