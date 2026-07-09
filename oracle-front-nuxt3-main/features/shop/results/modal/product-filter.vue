<template>
  <div class="product-filter__wrapper">
    <div class="product-filter-content">
      <div class="results-filter">
        <div class="filter-line-button">
          <img src="/svg/shop/icons/close-line.svg" alt="line" />
        </div>
        <div class="filter-header">
          <h2>Filter</h2>
          <button @click="close">
            <img src="/svg/shop/icons/close.svg" alt="close" />
          </button>
          <button class="reset" @click="close">Reset</button>
        </div>
        <div class="filter-form">
          <CheckBox
            label=""
            variant="primary"
            :option="options"
            :selected="plan_option"
            @checkbox="PlanCheckbox" />
        </div>
        <div class="form-action">
          <button @click="close">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckBox from "~/components/ui/shops/utils/checkbox.vue";
import { Filter } from "~/shared/constants/shops";
import type { CheckBoxType } from "~/shared/types/shops";

const emit = defineEmits<{
  close: [];
}>();

const options = ref<CheckBoxType[]>(Filter);
const plan_option = ref<number[]>([]);

const close = (): void => {
  emit("close");
};

const PlanCheckbox = ({ id, checked }: { id: number; checked: boolean }) => {
  if (checked && !plan_option.value.includes(id)) {
    plan_option.value.push(id);
  } else if (!checked) {
    plan_option.value = plan_option.value.filter((item) => item !== id);
  }
};
</script>

<style lang="scss">
.product-filter__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;

  .product-filter-content {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #1b1a24;

    .results-filter {
      width: 100%;
      display: block !important;
      margin: 0 !important;

      .filter-line-button {
        width: 100%;
        align-items: center;
        justify-content: center;
        display: none;
      }

      .filter-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h2 {
          font: 700 20px Roboto, sans-serif;
        }

        button {
          color: #f64e2a;
          font: 500 14px Roboto, sans-serif;

          &.reset {
            display: none;
          }
        }
      }

      .filter-form {
        margin-top: 20px;

        .checkbox-options__container {
          background: transparent;
          padding-left: 0;

          .checkbox-option__item {
            border-bottom: 1px solid #2b2741;

            .option_checkbox {
              border: 1px solid #2b2b2b;
            }
          }
        }
      }

      .form-action {
        margin-top: 20px;
        width: 100%;

        button {
          width: 100%;
          border-radius: 12px;
          background: #f64e2a;
          padding: 10px 0;
          color: white;

          h2 {
            font: 400 14px Roboto, sans-serif;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .product-filter__wrapper {
    height: 100%;

    .product-filter-content {
      width: 100%;
      position: fixed;
      padding: 12px 0 24px 0;
      left: 0;
      bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .results-filter {
        .filter-header {
          margin-top: 10px;
          padding: 0 16px;

          button {
            &:nth-child(2) {
              display: none;
            }

            &.reset {
              display: block;
            }
          }
        }

        .filter-line-button {
          display: flex;
        }

        .filter-form {
          .checkbox__container {
            .checkbox-options__container {
              padding-left: 12px;
            }
          }
        }

        .form-action {
          padding: 12px 16px 0 16px;
        }
      }
    }
  }
}
</style>
