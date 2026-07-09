import { defineStore } from "pinia";
import { ProductsData } from "~/shared/constants/shops";
import type { ProductDataType } from "~/shared/types/shops";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

export const useShopListingsStore = defineStore("shops-listing", {
  state: () => ({
    favorites: [] as ProductDataType[],
  }),

  getters: {
    FAVORITES_LIST: (state) => state.favorites,
  },

  actions: {
    SET_FAVORITES(favorites: ProductDataType[]): void {
      this.favorites = favorites;
    },

    TOGGLE_FAVORITE(product: ProductDataType): void {
      const index = this.favorites.findIndex((item) => item.id === product.id);

      if (index === -1) {
        this.favorites.push(product);
      } else {
        this.favorites.splice(index, 1);
      }
    },

    INIT_FAVORITES(): void {
      const favorites = readLocalStorageJson<ProductDataType[]>("favorites", []);
      this.SET_FAVORITES(favorites ?? []);
    },

    ADD_TO_FAVORITES(id: number): void {
      const product: ProductDataType | undefined = ProductsData.find(
        (item) => item.id === id
      );

      if (!product) return;

      this.TOGGLE_FAVORITE(product);
      writeLocalStorageJson("favorites", this.favorites);
    },
  },
});
