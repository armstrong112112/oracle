<template>
  <div class="favorites-page__wrapper">
    <Header />
    <ShopSettingsLayout>
      <div class="favorites-page">
        <div class="page-header">
          <HeaderMobile
            page-title="Favorites"
            with-page-title
            :with-back="$route.query.edit !== 'true'"
            :with-cancel="$route.query.edit === 'true'"
            :with-select-all="$route.query.edit === 'true'"
            :with-select="
              favorite_products.length > 0 && $route.query.edit !== 'true'
            "
            @select="selectFavorite" />
        </div>
        <div class="favorites__header">
          <h3>Favorites</h3>
          <div class="header__action">
            <nuxt-link
              :to="{
                path: '/shops/shop-settings/favorites',
                query: { tab: 'listings' },
              }">
              <button v-if="$route.query.edit === 'true'" class="cancel">
                cancel
              </button>
            </nuxt-link>

            <nuxt-link
              :to="{
                path: '/shops/shop-settings/favorites',
                query: { tab: 'listings', edit: 'true' },
              }">
              <button v-if="$route.query.tab === 'listings'">Select</button>
            </nuxt-link>
          </div>
        </div>
        <div class="favorites-header__actions">
          <div class="favorites__category">
            <div class="main-category">
              <nuxt-link
                v-for="tab in ['listings', 'compilations', 'searches']"
                :key="tab"
                :to="{
                  path: '/shops/shop-settings/favorites',
                  query: { tab },
                }">
                <button :class="{ active: $route.query.tab === tab }">
                  {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
                </button>
              </nuxt-link>
            </div>
            <div
              v-if="
                favorite_products.length > 0 && $route.query.tab === 'listings'
              "
              class="sub-category">
              <button
                v-for="item in category"
                :key="item.id"
                :class="{ active: active_category === item.id }"
                @click="choseCategory(item.id)">
                {{ item.name }}
              </button>
            </div>
          </div>
          <div v-if="$route.query.edit === 'true'" class="favorites__edit">
            <button @click="deleteListing(true)">
              <img src="/svg/shop/icons/edit-trash.svg" alt="trash" />
              Delete
            </button>
            <button>
              <img src="/svg/shop/icons/Share.svg" alt="trash" />
              Share
            </button>
            <button>
              <img src="/svg/shop/icons/Forward.svg" alt="trash" />
              Forward
            </button>
          </div>
        </div>
        <ListingTab v-if="$route.query.tab === 'listings'" />
        <CompilationTab v-if="$route.query.tab === 'compilations'" />
        <SearchesTab v-if="$route.query.tab === 'searches'" />
      </div>
      <DeleteItemModal
        v-if="delete_listing"
        target="listing"
        @close="delete_listing = false" />
    </ShopSettingsLayout>
  </div>
</template>
<script setup lang="ts">
import { ProductDataCategory } from "~/shared/constants/shops";
import type {
  ProductDataCategoryType,
  ProductDataType,
} from "~/shared/types/shops";
import { useShopListingsStore } from "~/store/shops/listing";
import Header from "~/widgets/shop/header/index.vue";
import HeaderMobile from "~/widgets/shop/header/mobile.vue";
import ShopSettingsLayout from "~/widgets/shop/layouts/settings/index.vue";
import CompilationTab from "~/widgets/shop/settings/favorites/compilation-tabb.vue";
import ListingTab from "~/widgets/shop/settings/favorites/listing-tab.vue";
import SearchesTab from "~/widgets/shop/settings/favorites/searches-tabb.vue";

definePageMeta({
  layout: "sidebar",
});

const route = useRoute();
const router = useRouter();

// Handle redirect if no tab query param
if (!route.query.tab) {
  router.replace({
    path: route.path,
    query: { ...route.query, tab: "listings" },
  });
}

const listingStore = useShopListingsStore();

const category: ProductDataCategoryType[] = ProductDataCategory;
const active_category = ref<number | null>(null);
const delete_listing = ref<boolean>(false);

const favorite_products = computed((): ProductDataType[] => {
  return listingStore.FAVORITES_LIST;
});

const selectFavorite = (): void => {
  router.push("/shops/shop-settings/favorites?tab=listings&edit=true");
};

const choseCategory = (itemId: number): void => {
  active_category.value = itemId;
};

const deleteListing = (val: boolean): void => {
  delete_listing.value = val;
};

onMounted(() => {
  active_category.value = 1;
  listingStore.INIT_FAVORITES();
});
</script>
<style lang="scss">
.favorites-page {
  padding-right: 24px;

  .page-header {
    width: 100%;
    padding: 10px 16px;
    display: none;

    .shop-setting-child-header {
      button {
        &.select-button {
          display: block;
        }
      }
    }

    .chat-button {
      display: none;
    }
  }

  .favorites__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 16px;

    h3 {
      color: white;
      font: 600 20px Roboto, sans-serif;
    }

    .header__action {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        padding: 10px 14px;
        border-radius: 12px;
        font: 500 14px Roboto, sans-serif;
        color: white;
        background: #1e1d28;

        &.cancel {
          color: #f64e2a;
          background: transparent;
        }
      }
    }
  }

  .favorites-header__actions {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .favorites__category {
      .main-category {
        display: flex;
        align-items: center;
        gap: 2px;

        button {
          color: white;
          font: 400 14px Roboto, sans-serif;
          padding: 13px 16px;
          border-radius: 12px;

          &.active {
            background: #f64e2a;
          }
        }
      }

      .sub-category {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        overflow-x: auto;
        white-space: nowrap;

        button {
          flex-shrink: 0; // Не дает кнопкам сжиматься
          padding: 8px 12px;
          border-radius: 12px;
          color: white;
          font: 400 12px Roboto, sans-serif;
          background: #2c2a3d;
          white-space: nowrap;

          &.active {
            background: #fff;
            color: #2c2a3d;
          }
        }

        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    .favorites__edit {
      display: flex;
      align-items: center;
      gap: 10px;

      button {
        padding: 4px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        color: #fff;
        font: 400 12px Roboto, sans-serif;

        &:nth-child(1) {
          color: #f64e2a;
        }

        img {
          width: 24px;
          height: 24px;
          object-fit: fill;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .favorites-page {
    padding: 0 12px;

    .favorites-header__actions {
      .favorites__category {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .favorites-page__wrapper {
    .shop-header-container {
      display: none;
    }

    .shop-header-mobile {
      padding: 0;
    }
  }
  .favorites-page {
    .page-header {
      display: block;
    }

    .favorites__header {
      display: none;
    }

    .favorites-header__actions {
      margin-top: 0;

      .favorites__edit {
        width: 100%;
        padding: 8px 12px;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #14131b;
        z-index: 1000;

        button {
          width: 125px;
        }
      }
    }
  }
}
</style>
