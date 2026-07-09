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
          <h5>{{ compilation }}</h5>
          <h6>{{ compilationListings }} listings</h6>
        </div>
      </div>
      <div class="items__action" ref="itemActionContainer">
        <button @click="ShowMoreActions">
          <img src="/svg/shop/icons/More.svg" alt="More" />
        </button>

        <transition name="dropdown">
          <div v-if="moreActions" class="drop-down-actions">
            <button>
              Share
              <img src="/svg/shop/icons/Share.svg" alt="Share" />
            </button>
            <button @click="deleteItem">
              Delete
              <img src="/svg/shop/icons/edit-trash.svg" alt="trash" />
            </button>
          </div>
        </transition>
      </div>
    </div>
    <div v-if="variant === 'searches'" :class="variant" class="favorites-items">
      <div class="items-icon-search" :class="variant">
        <img src="/svg/shop/icons/History.svg" alt="History" />
      </div>
      <div class="search-content">
        <div class="items__info" :class="variant">
          <div v-if="searchbar">
            <h6>{{ searches }}</h6>
          </div>
          <div v-else>
            <h5>{{ searchesCategory }}</h5>
            <h6>{{ searches }}</h6>
          </div>
        </div>
        <div class="items__action">
          <button v-if="searchbar">
            <img
              width="5"
              height="10"
              src="/svg/arrow-right.svg"
              alt="bookmark" />
          </button>
          <button v-else @click="deleteItem">
            <img src="/svg/shop/icons/bookmark.svg" alt="close" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant: string;
  searchbar: boolean;
  searches: string;
  compilation?: string;
  compilationListings?: number;
  searchesCategory?: string;
}>();
const moreActions = ref(false);
const itemActionContainer = ref<HTMLElement>();

const emit = defineEmits<{
  (e: "delete", value: boolean): void;
}>();

const deleteItem = (): void => {
  emit("delete", true);
};

const ShowMoreActions = (): void => {
  moreActions.value = !moreActions.value;
  if (moreActions.value) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }
};

const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as Node;
  const container = itemActionContainer.value;

  if (container && !container.contains(target)) {
    moreActions.value = false;
  }
};

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
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

  .items__action {
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

        img {
          width: 16px;
          height: 16px;
        }

        &:nth-child(3) {
          color: #f64e2a;
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
