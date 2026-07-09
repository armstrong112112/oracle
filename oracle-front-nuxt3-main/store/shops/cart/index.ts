import { defineStore } from "pinia";
import { useApiClient } from "~/composables/useApiClient";
import type { ProductDataType } from "~/shared/types/shops";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

export interface CartProduct {
  quantity: number;
  product: ProductDataType;
  price: number;
  discount: number;
}

export const useCartStore = defineStore("shops-cart", () => {
  const cart = ref<CartProduct[]>([]);
  const isAdding = ref(false);
  const isValidating = ref(false);
  const error = ref<string | null>(null);
  const api = useApiClient();

  // Getters
  const CART_LIST = computed(() => cart.value);
  const DISCOUNT_ITEMS = computed(() => cart.value.filter((item) => item.discount > 0));

  // Actions
  const SET_CART = (newCart: CartProduct[]): void => {
    cart.value = newCart;
  };

  const ADD_ITEM_TO_CART = (product: CartProduct): void => {
    const exists = cart.value.find((item) => item.product.id === product.product.id);
    if (!exists) cart.value.push(product);
  };

  const SAVE_CART = (): void => {
    try {
      writeLocalStorageJson("cart", cart.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to save cart";
    }
  };

  const INIT_CART = (): void => {
    try {
      const saved = readLocalStorageJson<CartProduct[]>("cart", []);
      SET_CART(saved ?? []);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to load cart";
    }
  };

  const UPDATE_ITEM_QUANTITY = (payload: { productId: number; quantity: number }): void => {
    const item = cart.value.find((item) => item.product.id === payload.productId);
    if (item) item.quantity = payload.quantity;
  };

  /**
   * ADD_TO_CART: получает актуальный товар через API (цена/наличие с сервера).
   * isAdding блокирует повторные клики пока идёт запрос.
   */
  const ADD_TO_CART = async (id: number | undefined): Promise<void> => {
    if (id === undefined) {
      console.warn("ID товара не определен");
      return;
    }
    if (isAdding.value) return;

    isAdding.value = true;
    error.value = null;
    try {
      const product = await api<ProductDataType>(`/shop/products/${id}`);

      if (!product || product.isOutStock || product.itemLeft <= 0) {
        error.value = "Product is out of stock or unavailable";
        return;
      }

      const exists = cart.value.find((item) => item.product.id === id);

      if (!exists) {
        ADD_ITEM_TO_CART({
          quantity: 1,
          product,
          price: product.price ?? 0,
          discount: product.discount ?? 0,
        });
      } else {
        UPDATE_ITEM_QUANTITY({ productId: id, quantity: exists.quantity + 1 });
      }

      SAVE_CART();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to add product to cart";
      console.error("Ошибка при добавлении товара в корзину:", err);
    } finally {
      isAdding.value = false;
    }
  };

  const VALIDATE_CART_PRICES = async (): Promise<boolean> => {
    if (!cart.value.length) return true;
    if (isValidating.value) return false;

    isValidating.value = true;
    error.value = null;

    try {
      cart.value = await Promise.all(
        cart.value.map(async (item) => {
          const product = await api<ProductDataType>(`/shop/products/${item.product.id}`);

          if (!product || product.isOutStock || product.itemLeft <= 0) {
            throw new Error(`Product "${item.product.name}" is out of stock or unavailable`);
          }

          return {
            ...item,
            product,
            price: product.price ?? 0,
            discount: product.discount ?? 0,
          } satisfies CartProduct;
        })
      );

      SAVE_CART();
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to validate cart prices";
      console.error("Ошибка при валидации корзины:", err);
      return false;
    } finally {
      isValidating.value = false;
    }
  };

  const REMOVE_ITEM_FROM_CART = (ids: number[]): void => {
    SET_CART(cart.value.filter((item) => !ids.includes(item.product.id)));
    SAVE_CART();
  };

  const INCREMENT = (payload: { productId: number; quantity: number }): void => {
    UPDATE_ITEM_QUANTITY({ productId: payload.productId, quantity: payload.quantity + 1 });
    SAVE_CART();
  };

  const DECREMENT = (payload: { productId: number; quantity: number }): void => {
    const item = cart.value.find((item) => item.product.id === payload.productId);
    if (!item) return;

    if (payload.quantity < 1) {
      REMOVE_ITEM_FROM_CART([item.product.id]);
      return;
    }

    UPDATE_ITEM_QUANTITY({ productId: payload.productId, quantity: item.quantity - 1 });
    SAVE_CART();
  };

  return {
    // State
    cart,
    isAdding,
    isValidating,
    error,
    // Getters
    CART_LIST,
    DISCOUNT_ITEMS,
    // Actions
    SET_CART,
    ADD_ITEM_TO_CART,
    SAVE_CART,
    INIT_CART,
    UPDATE_ITEM_QUANTITY,
    ADD_TO_CART,
    VALIDATE_CART_PRICES,
    REMOVE_ITEM_FROM_CART,
    INCREMENT,
    DECREMENT,
  };
});
