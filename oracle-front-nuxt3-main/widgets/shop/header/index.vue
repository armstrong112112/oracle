<template>
  <div class="shop-header-container">
    <div v-if="!isChildRoute" class="shop-logo">
      <img
        src="/svg/shop/icons/oracle-store.svg"
        style="width: 124px; height: 24px"
        alt="shop-logo" />
    </div>
    <div class="shop-logo" v-else>
      <button @click="goBack">
        <img src="/svg/arrow-back.svg" alt="shop-logo" />
      </button>
      {{ currentSection }}
    </div>
    <Searchbar with-category-btn />
    <div class="shop-header-buttons">
      <nuxt-link
        v-if="currentSection !== 'Shop Settings'"
        to="/shops/shop-settings">
        <button class="shop-settings">
          <img
            width="18px"
            height="18px"
            src="/svg/shop/icons/setting.svg"
            alt="setting" />
          <span>Store Settings</span>
        </button>
      </nuxt-link>
      <nuxt-link v-if="currentSection !== 'Cart'" to="/shops/cart">
        <button class="shop-cart">
          <img src="/svg/shop/icons/cart.svg" alt="cart" />
        </button>
      </nuxt-link>
      <nuxt-link v-if="!isListingPage" to="/shops/listing">
        <button class="shop-add">
          <img src="/svg/shop/icons/plus.svg" alt="plus" />
        </button>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ProductsData } from "~/shared/constants/shops";
import Searchbar from "~/components/ui/shops/searchbar/searchbar.vue";
import { useShopsStore } from "~~/store/shops";

const staticSections: Record<string, string> = {
  "shop-settings": "Shop Settings",
  cart: "Cart",
  listing: "Listing",
  results: "Results",
};

const router = useRouter();
const route = useRoute();
const shopsStore = useShopsStore();

const currentSection = computed((): string => {
  const pathSegments = route.path.split("/");
  const rawSection = pathSegments[2];

  if (!rawSection) return "";

  const id = Number(rawSection);
  if (!isNaN(id)) {
    const shop = ProductsData.find((item) => item.id === id);
    return shop ? shop.name : `Shop #${id}`;
  }

  // если статическая секция
  if (rawSection === "listing") {
    const { query } = route;

    if (query["new-listing"]) {
      return "New Listing";
    }
    if (query["edit-listing"]) {
      return "Edit Listing";
    }

    return staticSections[rawSection] || "";
  }

  return staticSections[rawSection] || "";
});

const isListingPage = computed((): boolean => {
  return (
    !!currentSection.value &&
    ["Listing", "New Listing", "Edit Listing"].includes(currentSection.value)
  );
});

const isChildRoute = computed((): boolean => {
  return route.path.startsWith("/shops/") && route.path !== "/shops";
});

const goBack = (): void => {
  router.back();
};

onMounted(() => {
  shopsStore.SettingMockUser();
});
</script>

<style lang="scss" scoped>
.shop-header-container {
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .shop-logo {
    display: flex;
    align-items: center;
    gap: 4px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    white-space: nowrap;
  }

  .shop-header-buttons {
    display: flex;
    align-items: center;
    gap: 16px;

    .shop-cart {
      width: 44px;
      height: 44px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #2b2741;
      border-radius: 32px;
      background-color: #1b1a24;
    }

    .shop-settings {
      padding: 11.5px 16.5px;
      display: flex;
      align-items: center;
      gap: 7px;
      border: 1px solid transparent;
      border-radius: 11px;

      span {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
      }
    }

    .shop-add {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 20px;
      padding: 12px;
      background-color: #f64e2a;
    }
  }
}

@media screen and (max-width: 1000px) {
  .shop-header-container {
    .shop-header-buttons {
      gap: 10px;
    }
  }
}
</style>
