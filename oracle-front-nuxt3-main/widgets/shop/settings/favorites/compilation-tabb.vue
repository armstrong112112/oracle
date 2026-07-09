<template>
  <div class="favorites-compilation">
    <div v-if="$route.query.noitems !== 'true'" class="compilation__items">
      <FavoriteItems v-for="(item, index) in 4" variant="compilations" />
    </div>
    <div v-if="$route.query.noitems === 'true'" class="compilation__no-items">
      <div class="no-items-image">
        <img src="/svg/shop/images/ItemsEmpty.png" alt="ItemsEmpty" />
      </div>
      <h3>Compilations is Empty</h3>
      <h5>Create thematic сompilations and add ads to them</h5>
      <div class="no-items__action">
        <button>Create a Compilation</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FavoriteItems from "~/entities/shop/settings/favorites/items.vue";

const route = useRoute();
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
