<template>
  <div>
    <div
      v-if="variant === 'compilations'"
      :class="variant"
      class="favorites-items">
      <div class="items__info" :class="variant">
        <div class="items-icon" :class="variant">
          <img src="/svg/shop/icons/collection.svg" alt="collection" />
        </div>
        <div>
          <h5>Name of the Compilation</h5>
          <h6>0 listings</h6>
        </div>
      </div>
      <div class="items__action">
        <button>
          <img src="/svg/shop/icons/More.svg" alt="More" />
        </button>
      </div>
    </div>
    <div v-if="variant === 'searches'" :class="variant" class="favorites-items">
      <div class="items-icon-search" :class="variant">
        <img src="/svg/shop/icons/History.svg" alt="History" />
      </div>
      <div class="search-content">
        <div class="items__info" :class="variant">
          <div>
            <h5>Service - Websites</h5>
            <h6>Web-development</h6>
          </div>
        </div>
        <div class="items__action">
          <button>
            <img src="/svg/shop/icons/bookmark.svg" alt="bookmark" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant: string;
}>();
</script>

<style lang="scss" scoped>
.favorites-items {
  width: 100%;
  display: flex;
  align-items: center;

  &.compilations {
    padding: 12px 16px;
    border-bottom: 1px solid #2b2741;
    justify-content: space-between;
  }

  &.searches {
    gap: 12px;

    .search-content {
      padding: 12px 16px 12px 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #2b2741;
    }
  }

  .items__info {
    display: flex;
    align-items: center;
    gap: 12px;

    .items-icon {
      padding: 8px;
      border-radius: 12px;

      &.compilations {
        background-color: #14131b;
      }
    }

    &.compilations {
      h5 {
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }

      h6 {
        margin-top: 4px;
        color: #fff;
        font: 400 12px Roboto, sans-serif;
      }
    }

    &.searches {
      h5 {
        color: #bfb7ff;
        font: 400 12px Roboto, sans-serif;
      }

      h6 {
        margin-top: 4px;
        color: #fff;
        font: 400 14px Roboto, sans-serif;
      }
    }
  }
}
</style>
