<template>
  <div class="shop-search-bar" :class="{ mobileMt: searchbar }">
    <div class="search-input" ref="searchContainer">
      <button>
        <img src="/svg/shop/icons/search.svg" alt="search" />
      </button>
      <input
        type="text"
        name="search"
        placeholder="Search"
        aria-label="Search"
        autocomplete="off"
        @click="showSearchBar" />
      <button v-if="searchbar" class="close-btn" @click="hideSearchBar">
        <img src="/svg/shop/icons/close.svg" alt="close" />
      </button>
    </div>

    <button v-if="withCategoryBtn" class="category-filter">
      <img src="/svg/shop/icons/category.svg" alt="category" />
    </button>

    <transition name="fade">
      <div class="search-overlay" v-if="searchbar" @click.self="hideSearchBar">
        <div
          class="search-bar__wrapper"
          :style="{ width: inputWidth + 'px', left: inputLeft + 'px' }">
          <div class="search-results-container">
            <nuxt-link
              v-for="item in searches"
              :key="item.id"
              to="/shops/results">
              <FavoriteItems
                :searches="item.searches"
                searchbar
                variant="searches" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { SearchData } from "#shared/constants/shops";
import type { SearchDataType } from "#shared/types/shops";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import FavoriteItems from "~/features/shop/shop-settings/favorites/items.vue";

interface Props {
  withCategoryBtn?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  withCategoryBtn: false,
});

const emit = defineEmits<{
  header: [value: boolean];
}>();

const searches = ref<SearchDataType[]>(SearchData);
const searchbar = ref(false);
const inputWidth = ref(0);
const inputLeft = ref(0);
const searchContainer = ref<HTMLElement>();

function updateSearchBarPosition(): void {
  const input = searchContainer.value;
  if (input) {
    const rect: DOMRect = input.getBoundingClientRect();
    inputWidth.value = rect.width;
    inputLeft.value = rect.left;
  }
}

function showSearchBar(): void {
  emit("header", false);
  searchbar.value = true;
  document.body.style.overflow = "hidden";
  nextTick(() => {
    updateSearchBarPosition();
    window.addEventListener("resize", updateSearchBarPosition);
  });
}

function hideSearchBar(): void {
  searchbar.value = false;
  emit("header", true);
  document.body.style.overflow = "";
  window.removeEventListener("resize", updateSearchBarPosition);
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") hideSearchBar();
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", updateSearchBarPosition);
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
.shop-search-bar {
  width: 420px;
  display: flex;
  align-items: center;
  margin-left: 100px;
  gap: 10px;

  &.mobileMt {
    margin-top: 0;
  }

  .search-input {
    position: relative;
    z-index: 1001;
    width: 358px;
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100010;
  }

  .search-bar__wrapper {
    position: absolute;
    top: 70px;
    background-color: #1b1a24;
    border-radius: 12px;
    z-index: 100010;

    .search-results-container {
      padding: 6px;
    }
  }

  .category-filter {
    width: 44px;
    height: 44px;
    background-color: #1b1a24;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #2b2741;
    border-radius: 12px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media screen and (max-width: 1150px) {
  .shop-search-bar {
    width: 40%;

    .search-input {
      width: 80%;
    }
  }
}

@media screen and (max-width: 750px) {
  .shop-search-bar {
    width: 100%;
    justify-content: center;
    margin: 0 auto;

    &.mobileMt {
      margin-top: 10px;
    }

    .search-input {
      width: 573px;
      z-index: 10002;
    }

    .search-overlay {
      background-color: #000;
      z-index: 10001;
      overflow: hidden;
    }

    .search-bar__wrapper {
      top: 50px;
      background-color: #000;
    }
  }
}

@media screen and (max-width: 600px) {
  .shop-search-bar {
    .search-input {
      width: 375px;
    }
  }
}

@media screen and (max-width: 500px) {
  .shop-search-bar {
    .search-input {
      width: 343px;
    }
  }
}
</style>
