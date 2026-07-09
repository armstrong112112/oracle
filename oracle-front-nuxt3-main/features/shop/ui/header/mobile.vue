<template>
  <div class="shop-header-mobile">
    <div class="shop-header-navigation">
      <div class="nav-back">
        <img src="/svg/arrow-back.svg" alt="back" />
      </div>
      <h2>Store</h2>
      <button class="shop-header-filter" @click="ModalToggle">
        <img src="/svg/shop/icons/filter-icon.svg" alt="filter" />
      </button>
    </div>
    <div class="shop-header-mobile-input">
      <div class="search-input">
        <div>
          <img src="/svg/shop/icons/search.svg" alt="search" />
        </div>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
function ModalToggle() {
  if (typeof window !== "undefined") {
    const nuxtApp = useNuxtApp();
    nuxtApp.$emit?.("show-modal", true);
  }
}
</script>
<style lang="scss" scoped>
.shop-header-mobile {
  padding: 0 16px 24px 16px;

  .shop-header-navigation {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    h2 {
      color: white;
      font-size: 18px;
      font-family: Roboto, sans-serif;
      font-weight: 500;
    }
  }

  .shop-header-mobile-input {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .search-input {
      width: 80%;
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
