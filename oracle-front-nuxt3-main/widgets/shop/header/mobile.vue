<template>
  <div class="shop-header-mobile">
    <div v-if="header_navigation" class="shop-header-navigation">
      <button v-if="withCancel" class="shop-header-cancel" @click="showModal">
        Cancel
      </button>
      <div v-if="withBack" class="nav-back" @click="goBack">
        <img src="/svg/arrow-back.svg" alt="back" />
      </div>
      <h2 v-if="withPageTitle">{{ pageTitle }}</h2>
      <button v-if="withFilter" class="shop-header-filter" @click="showModal">
        <img src="/svg/shop/icons/filter-icon.svg" alt="filter" />
      </button>
      <div v-if="withHelpers" class="shop-edit-action">
        <button
          v-if="withHelpers && withChat"
          class="shop-header-filter"
          @click="showModal">
          <img src="/svg/shop/icons/chat.svg" alt="filter" />
        </button>
        <button
          v-if="withHelpers && withForward"
          class="shop-header-filter"
          @click="showModal">
          <img src="/svg/shop/icons/Forward.svg" alt="filter" />
        </button>
      </div>
      <button
        v-if="withSelect"
        class="shop-header-select"
        @click="$emit('select')">
        Select
      </button>
      <button
        v-if="withSelectAll"
        class="shop-header-select-all"
        @click="$emit('selectAll')">
        Select All
      </button>
    </div>
    <div v-if="withSearchBar" class="shop-header-mobile-input">
      <Searchbar @header="showHeader" />
    </div>
    <FilterModal v-if="modal" :isOpen="modal" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Searchbar from "~/components/ui/shops/searchbar/searchbar.vue";
import FilterModal from "~/features/shop/__index/filters.vue";

interface Props {
  withChat?: boolean;
  withForward?: boolean;
  withHelpers?: boolean;
  withFilter?: boolean;
  withPageTitle?: boolean;
  withSearchBar?: boolean;
  withSelect?: boolean;
  withSelectAll?: boolean;
  withCancel?: boolean;
  withBack?: boolean;
  pageTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  withChat: false,
  withForward: false,
  withHelpers: false,
  withFilter: false,
  withPageTitle: false,
  withSearchBar: false,
  withSelect: false,
  withSelectAll: false,
  withCancel: false,
  withBack: true,
  pageTitle: "",
});

const emit = defineEmits<{
  select: [];
  selectAll: [];
}>();

const router = useRouter();

const header_navigation = ref(true);
const modal = ref(false);

const showHeader = (val: boolean): void => {
  header_navigation.value = val;
};

const goBack = (): void => {
  router.back();
};

const showModal = (): void => {
  modal.value = true;
};

const closeModal = (): void => {
  modal.value = false;
};
</script>
<style lang="scss" scoped>
.shop-header-mobile {
  padding: 0 16px 24px 16px;

  .shop-header-navigation {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;

    h2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      color: white;
      font-size: 18px;
      font-family: Roboto, sans-serif;
      font-weight: 500;
    }

    button {
      color: white;
      font-size: 18px;
      font-family: Roboto, sans-serif;
      font-weight: 500;

      &.shop-header-select-all {
        color: #f64e2a;
      }
    }
  }

  .shop-header-mobile-input {
    width: 100%;
    display: flex;
    align-items: center;

    .search-input {
      margin: 0 auto;
      position: relative;
      z-index: 10002;
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
      background-color: rgba(0, 0, 0, 1);
      z-index: 10001;
      overflow: hidden;
    }

    .search-bar__wrapper {
      position: absolute;
      top: 50px;
      background-color: rgba(0, 0, 0, 1);
      border-radius: 12px;
    }
  }
}

@media screen and (max-width: 750px) {
  .shop-header-mobile {
    .shop-header-mobile-input {
      .search-input {
        width: 573px;
      }
    }

    .shop-header-navigation {
      width: 590px;
      margin: 0 auto;
    }
  }
}

@media screen and (max-width: 600px) {
  .shop-header-mobile {
    .shop-header-mobile-input {
      .search-input {
        width: 375px;
      }
    }

    .shop-header-navigation {
      max-width: 430px;
    }
  }
}

@media screen and (max-width: 500px) {
  .shop-header-mobile {
    .shop-header-mobile-input {
      .search-input {
        width: 343px;
      }
    }

    .shop-header-navigation {
      width: 390px;
    }
  }
}

@media screen and (max-width: 400px) {
  .shop-header-mobile {
    .shop-header-navigation {
      width: 100%;
      padding: 20px 0;
    }
  }
}
</style>
