<template>
  <div v-if="ShowModal" class="shop-modal-container">
    <div ref="modalContent" class="modal-content">
      <div class="modal__header">
        <button class="reset-button">Reset</button>
        <h3>Filters</h3>
        <button @click="modalClose">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="modal__form">
        <div class="form-category">
          <div class="form-category__label">Categories</div>
          <div class="form-category__buttons">
            <button
              v-for="(item, index) in buttons"
              :key="index"
              class="category-button">
              {{ item }}
            </button>
            <button class="category-button__more" @click="showMoreCategory">
              more...
            </button>
          </div>
        </div>
        <div class="form-price">
          <Input
            v-model="price_min"
            label="Price, $"
            title="min"
            type="number"
            placeholder="Min"
            for-who="price-min" />
          <Input
            v-model="price_max"
            type="number"
            title="max"
            placeholder="Max"
            for-who="price-max" />
        </div>
        <div class="form-delivery">
          <div class="option_checkbox">
            <input
              id="instant-delivery"
              type="checkbox"
              name="instant-delivery" />
          </div>
          <label for="instant-delivery"> Instant Delivery </label>
        </div>
        <div class="form-sellers">
          <div class="form-sellers__label">Sellers</div>
          <div class="form-sellers__buttons">
            <button class="form-sellers-button active">All</button>
            <button class="form-sellers-button">Verified</button>
            <button class="form-sellers-button">Not-Verified</button>
          </div>
        </div>
        <div class="form-sellers__rating">
          <Input
            v-model="seller_minimal_rating"
            label="Seller's Minimal Rating"
            title="Seller's Minimal Rating"
            type="number"
            placeholder="Enter"
            for-who="seller-minimal-rating" />
        </div>
        <div class="form-description">
          <Input
            v-model="desription"
            label="Description"
            title="Description"
            type="text"
            placeholder="Enter"
            for-who="description" />
        </div>
        <div class="form-sort-checkbox__container">
          <CheckBox
            :option="options"
            label="Sorting"
            variant="primory"
            :selected="sorting_value"
            @checkbox="SortingCheckbox" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { nextTick, ref, watch } from "vue";
import CheckBox from "~/components/ui/shops/utils/checkbox.vue";
import Input from "~/components/ui/shops/utils/input.vue";
import { categoryButtons, Sorting } from "../constants";
import type { CheckBoxType } from "../types";

const props = defineProps<{
  ShowModal: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const modalContent = ref<HTMLElement | null>(null);
const buttons = ref<string[]>(categoryButtons.slice(0, 6) as string[]);
const options = ref<CheckBoxType[]>(Sorting);
const price_min = ref("");
const price_max = ref("");
const seller_minimal_rating = ref("");
const desription = ref("");
const sorting_value = ref<number[]>([]);

watch(
  () => props.ShowModal,
  (val) => {
    if (val) {
      nextTick(() => {
        const el = modalContent.value;
        if (el) {
          gsap.fromTo(
            el,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.4, ease: "power3.out" }
          );
        }
      });
    }
  }
);

const modalClose = (): void => {
  const el = modalContent.value;
  if (el) {
    gsap.to(el, {
      y: "100%",
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => {
        emit("close");
      },
    });
  } else {
    emit("close");
  }
};

const showMoreCategory = (): void => {
  buttons.value = categoryButtons;
};

const SortingCheckbox = ({
  id,
  checked,
}: {
  id: number;
  checked: boolean;
}): void => {
  if (checked && !sorting_value.value.includes(id)) {
    sorting_value.value.push(id);
  } else if (!checked) {
    sorting_value.value = sorting_value.value.filter((item) => item !== id);
  }
};
</script>
<style lang="scss">
.shop-modal-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9999;
  background-color: rgba($color: #000000, $alpha: 0.8);
  padding-top: 32px;
  user-select: none;

  .modal-content {
    width: 450px;
    margin: 0 auto;
    height: 100vh;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background-color: #14131b;
    padding: 20px 24px 0 24px;

    .modal__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        font-family: Roboto, sans-serif;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
      }
      button {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .reset-button {
        display: none;
        color: #f64e2a;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .modal__form {
      margin-top: 24px;
      .form-category {
        .form-category__label {
          color: white;
          font-size: 20px;
          font-family: Hector, sans-serif;
          font-weight: 400;
        }
        .form-category__buttons {
          margin-top: 12px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          .category-button {
            background-color: #2c2a3d;
            border-radius: 8px;
            padding: 8px 12px;
            color: white;
            font-size: 12px;
            font-family: Roboto, sans-serif;
            font-weight: 400;
          }
          .category-button__more {
            padding: 8px 12px;
            color: white;
            font-size: 12px;
            font-family: Roboto, sans-serif;
            font-weight: 400;
          }
        }
      }
      .form-price,
      .form-delivery,
      .form-sellers,
      .form-sellers__rating,
      .form-description,
      .form-sort-checkbox__container {
        margin-top: 24px;
      }

      .form-price {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        input {
          background-color: #1b1a24;
        }
      }

      .form-delivery {
        display: flex;
        align-items: center;
        gap: 12px;
        border-radius: 12px;
        background-color: #1b1a24;
        padding: 12px;
        label {
          color: white;
          font-size: 12px;
          font-family: Roboto, sans-serif;
          font-weight: 400;
        }

        .option_checkbox {
          width: 20px;
          height: 20px;
          position: relative;
          border-radius: 3px;
          background-color: #343242;
          overflow: hidden;

          input[type="checkbox"] {
            width: 100%;
            height: 100%;
            appearance: none;
            -webkit-appearance: none;
            border: transparent;
            background-color: transparent;
            cursor: pointer;

            &:checked {
              background-color: #f64e2a;

              &::after {
                content: url("data:image/svg+xml;utf8,%3Csvg%20width%3D%229%22%20height%3D%2210%22%20viewBox%3D%220%200%209%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%205.83333L3.43229%208.20829C3.52379%208.29764%203.67449%208.27933%203.74194%208.17067L7.88235%201.5%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E");
                display: block;
                position: absolute;
                top: 2.5px;
                left: 5px;
                pointer-events: none;
              }
            }
          }
        }
      }

      .form-sellers {
        .form-sellers__label {
          color: white;
          font-size: 14px;
          font-family: Roboto, sans-serif;
          font-weight: 400;
        }
        .form-sellers__buttons {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          .form-sellers-button {
            padding: 13px 14px;
            border-radius: 12px;
            background: #1b1a24;
            color: rgba($color: #fff, $alpha: 0.6);
            font-size: 14px;
            font-family: Roboto, sans-serif;
            font-weight: 400;
            &.active {
              color: #1b1a24;
              background: #fff;
            }
          }
        }
      }
      .form-sellers__rating,
      .form-description {
        input {
          background-color: #1b1a24;
        }
      }

      .form-sort-checkbox__container {
        .checkbox-options__container {
          padding: 0 0 0 12px;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .shop-modal-container {
    padding-top: 0;
    .modal-content {
      border-radius: 0;
      width: 100%;
      background-color: #000000;
      .modal__header {
        flex-direction: row-reverse;
        .reset-button {
          display: block;
        }
      }
    }
  }
}
</style>
