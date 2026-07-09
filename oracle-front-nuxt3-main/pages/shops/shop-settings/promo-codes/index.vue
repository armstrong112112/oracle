<template>
  <div class="promo-codes__wrapper">
    <Header />
    <ShopSettingsLayout>
      <div class="promo-codes-page">
        <div class="page-header">
          <HeaderMobile page-title="Promo Codes and Bonuses" with-page-title />
        </div>
        <div class="promo__header">
          <h2>Promo Codes and Bonuses</h2>
          <div>
            <button @click="showModal">Add +</button>
            <button @click="showDiscount">Add Discount +</button>
          </div>
        </div>
        <div v-if="promo.length > 0" class="promo__content">
          <PromoCodeItem
            v-for="item in promo"
            :key="item.id"
            :promo="item.promo"
            :date="item.date"
            :activation-left="item.activationLeft"
            variant="left" />
        </div>
        <div v-else class="promo__no-content">
          <img src="/svg/shop/images/percent.png" alt="percent" />
          <div>
            <h3>Promo Codes are Empty</h3>
            <h5>You can add promo codes and bonuses</h5>
          </div>
          <button @click="showModal">Add</button>
        </div>
      </div>
      <SettingPromo v-if="modal" :modal="modal" @close="modal = false" />
      <SettingDiscount v-if="discount" @close="discount = false" />
    </ShopSettingsLayout>
  </div>
</template>
<script setup lang="ts">
import PromoCodeItem from "~/features/shop/shop-settings/promo-code/item/item.vue";
import SettingDiscount from "~/features/shop/shop-settings/promo-code/modal/setting-discount.vue";
import SettingPromo from "~/features/shop/shop-settings/promo-code/modal/setting-promo.vue";
import { PromoCodesData } from "~/shared/constants/shops";
import type { PromoCodesType } from "~/shared/types/shops";
import Header from "~/widgets/shop/header/index.vue";
import HeaderMobile from "~/widgets/shop/header/mobile.vue";
import ShopSettingsLayout from "~/widgets/shop/layouts/settings/index.vue";

definePageMeta({
  layout: "sidebar",
});

const discount = ref<boolean>(false);
const modal = ref<boolean>(false);
const promo: PromoCodesType[] = PromoCodesData;

const showDiscount = (): void => {
  discount.value = true;
};

const showModal = (): void => {
  modal.value = true;
};
</script>
<style lang="scss">
.promo-codes-page {
  .page-header {
    display: none;
    width: 100%;
    padding: 10px 16px;

    .chat-button {
      visibility: hidden;
    }
  }

  .promo__header {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: white;
      font: 600 20px Roboto, sans-serif;
    }

    button {
      padding: 7px 10px;
      background: #1e1d28;
      border-radius: 12px;
      color: white;
      font: 500 12px Roboto, sans-serif;
    }
  }

  .promo__no-content {
    margin-top: 68.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    text-align: center;

    h3 {
      color: white;
      font: 400 20px Hector, sans-serif;
    }

    h5 {
      margin-top: 8px;
      color: white;
      font: 400 16px Roboto, sans-serif;
    }

    button {
      padding: 16.5px 140px;
      background: #f64e2a;
      border-radius: 14px;
      color: white;
      font: 500 16px Roboto, sans-serif;
    }
  }
}

@media screen and (max-width: 750px) {
  .promo-codes__wrapper {
    .shop-header-container {
      display: none;
    }
  }
  .promo-codes-page {
    .page-header {
      display: block;
    }

    .promo__header {
      justify-content: flex-end;

      h2 {
        display: none;
      }
    }
  }
}
</style>
