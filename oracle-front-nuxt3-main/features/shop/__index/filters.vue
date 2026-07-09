<template>
  <div class="shop-modal-container">
    <div ref="modalContent" class="modal-content">
      <div class="modal__header">
        <button class="reset-button">Reset</button>
        <h3>Filters</h3>
        <button @click="closeModal">
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
            <button
              v-if="buttons.length < allCategories.length"
              class="category-button__more"
              @click="showMoreCategories">
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
            v-model="description"
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
            variant="primary"
            :selected="sorting_value"
            @checkbox="SortingCheckbox" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { categoryButtons, Sorting } from "@/shared/constants/shops";
import type { CheckBoxType } from "@/shared/types/shops";
import { gsap } from "gsap";
import { computed, nextTick, onMounted, ref } from "vue";
import CheckBox from "~/components/ui/shops/utils/checkbox.vue";
import Input from "~/components/ui/shops/utils/input.vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const modalContent = ref<HTMLElement | null>(null);
const buttons = ref<string[]>(categoryButtons.slice(0, 6));
const options = ref<CheckBoxType[]>(Sorting);
const sorting_value = ref<number[]>([]);
const price_min = ref<number | null>(null);
const price_max = ref<number | null>(null);
const seller_minimal_rating = ref<number | null>(null);
const description = ref<string>("");

const allCategories = computed((): string[] => {
  return categoryButtons;
});

const closeModal = (): void => {
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

const showMoreCategories = (): void => {
  buttons.value = categoryButtons;
};

const SortingCheckbox = ({ id, checked }: { id: number; checked: boolean }) => {
  if (checked && !sorting_value.value.includes(id)) {
    sorting_value.value.push(id);
  } else if (!checked) {
    sorting_value.value = sorting_value.value.filter((item) => item !== id);
  }
};

onMounted(() => {
  if (props.isOpen) {
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
});
</script>
<style lang="scss">
.shop-modal-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 11000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;

  .modal-content {
    width: 450px;
    height: calc(100% - 32px);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background-color: #14131b;
    padding: 20px 8px 20px 24px;
    overflow: hidden;

    .modal__header {
      width: 100%;
      padding-right: 16px;
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
      overflow: auto;
      height: calc(100% - 20px);
      padding: 20px 11px 20px 0;
      margin-top: 24px;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #343243;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #343243;
      }

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
    .modal-content {
      padding: 12px 5px 40px 12px;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 0;
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
