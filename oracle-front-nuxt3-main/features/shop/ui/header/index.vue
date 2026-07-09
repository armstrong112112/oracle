<template>
  <div class="shop-header-container">
    <div v-if="!isChildRoute()" class="shop-logo">
      <img
        src="/svg/shop/icons/oracle-store.svg"
        style="width: 124px; height: 24px"
        alt="shop-logo"
      />
    </div>
    <nuxt-link v-else to="/shops">
      <div class="shop-logo">
        <button>
          <img src="/svg/arrow-back.svg" alt="shop-logo" />
        </button>
        {{ currentSection }}
      </div>
    </nuxt-link>
    <div class="shop-search-bar">
      <div class="search-input">
        <div>
          <img src="/svg/shop/icons/search.svg" alt="search" />
        </div>
        <input type="text" placeholder="Search" />
      </div>
      <button class="category-filter">
        <img src="/svg/shop/icons/category.svg" alt="category" />
      </button>
    </div>
    <div class="shop-header-buttons">
      <nuxt-link
        v-if="currentSection !== 'Shop Settings'"
        to="/shops/shop-settings"
      >
        <button class="shop-settings">
          <img
            width="18px"
            height="18px"
            src="/svg/shop/icons/setting.svg"
            alt="setting"
          />
          <span>Store Settings</span>
        </button>
      </nuxt-link>
      <nuxt-link v-if="currentSection !== 'Cart'" to="/shops/cart">
        <button class="shop-cart">
          <img src="/svg/shop/icons/cart.svg" alt="cart" />
        </button>
      </nuxt-link>
      <nuxt-link
        v-if="currentSection !== 'New Listing'"
        :to="{ path: '/shops/new-listing', query: { step: 1 } }"
      >
        <button class="shop-add">
          <img src="/svg/shop/icons/plus.svg" alt="plus" />
        </button>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: '',
})

const route = useRoute()

const isChildRoute = () => {
  const path = route.path

  if (path === '/shops') return false

  if (path.startsWith('/shops/')) {
    const id = route.params.id as string | undefined
    return id || 'New Listing'
  }

  return false
}

const currentSection = computed(() => {
  const pathSegments = route.path.split('/')
  const rawSection = pathSegments[2]

  if (!rawSection) return ''

  return rawSection
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
})

onMounted(() => {
  isChildRoute()
})
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

  .shop-search-bar {
    width: 420px;
    display: flex;
    align-items: center;
    margin-left: 100px;
    gap: 10px;

    .search-input {
      width: 358px;
      max-height: 44px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 13px;
      background-color: #1b1a24;
      border: 1px solid transparent;
      border-radius: 12px;

      input {
        width: 100%;
        background-color: transparent;
        border: none;

        &::placeholder {
          font-family: Roboto, sans-serif;
          font-size: 14px;
          color: #67639a;
        }
      }
    }

    .category-filter {
      width: 44px;
      height: 44px;
      background-color: #1b1a24;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #2b2741;
      border-radius: 12px;
    }
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
      padding: 10px;
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

@media screen and (max-width: 1150px) {
  .shop-header-container {
    .shop-search-bar {
      width: 40%;

      .search-input {
        width: 80%;
      }
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
