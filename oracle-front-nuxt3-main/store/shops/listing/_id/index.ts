import { defineStore } from "pinia";
import type { BuyProductType } from "~/shared/types/shops";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

export const useShopListingDetailStore = defineStore(
  "shops-listing-detail",
  () => {
    // State
    const defaultDiscount = ref(0);
    const totalDiscount = ref(0);
    const defaultPrice = ref(0);
    const totalPrice = ref(0);
    const imDiscount = ref(0);

    // Getters
    const PRODUCT = computed((): BuyProductType | null => {
      return readLocalStorageJson<BuyProductType | null>("buy_product");
    });

    // Actions
    const SET_DEFAULT_PRICE = (payload: {
      price: number;
      discount: number;
    }) => {
      defaultPrice.value = payload.price;
      totalPrice.value = payload.price;
      defaultDiscount.value = payload.discount;
      totalDiscount.value = payload.discount;
      imDiscount.value = totalPrice.value - totalDiscount.value;
    };

    const SET_TOTAL = (payload: { price: number; discount: number }) => {
      totalPrice.value = payload.price;
      totalDiscount.value = payload.discount;
      imDiscount.value = totalPrice.value - totalDiscount.value;
    };

    const INCREMENT = (count: number) => {
      const result_price = defaultPrice.value * count;
      const result_discount = defaultDiscount.value * count;
      SET_TOTAL({ price: result_price, discount: result_discount });
    };

    const DECREMENT = (count: number) => {
      const result_price = defaultPrice.value * count;
      const result_discount = defaultDiscount.value * count;
      SET_TOTAL({ price: result_price, discount: result_discount });
    };

    const BUY_PRODUCT = (payload: BuyProductType) => {
      writeLocalStorageJson("buy_product", payload);
    };

    return {
      // State
      defaultDiscount,
      totalDiscount,
      defaultPrice,
      totalPrice,
      imDiscount,
      // Getters
      PRODUCT,
      // Actions
      SET_DEFAULT_PRICE,
      SET_TOTAL,
      INCREMENT,
      DECREMENT,
      BUY_PRODUCT,
    };
  }
);
