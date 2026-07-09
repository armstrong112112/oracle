<template>
  <div class="step-one__container">
    <DropDown
      v-model="productVal"
      lable="Are you selling a digital product or something else?"
      :options="products"
      :default="'Choose'"
      class="select" />

    <DropDown
      v-model="categoryVal"
      style="margin-top: 16px"
      lable="Category"
      :options="category"
      :default="'Choose'"
      class="select" />
    <DropDown
      v-model="subcategoryVal"
      style="margin-top: 16px"
      lable="Subcategory"
      :options="subcategory"
      :default="'Choose'"
      class="select" />
    <DropDown
      v-model="platformVal"
      style="margin-top: 16px"
      lable="Platform"
      :options="platform"
      :default="'Choose'"
      class="select" />
    <NuxtLink :to="{ path: '/shops/new-listing', query: { step: 2 } }">
      <button class="step-one__action" :disabled="!canContinue">
        Continue
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import DropDown from "~/components/ui/shops/dropdowns.vue";
import {
  categoryOptions,
  platformOptions,
  productTypeOptions,
  subcategoryOptions,
} from "../constants";
import type { StepsObjectType } from "../types";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

const canContinue = ref<boolean>(false);
const products = productTypeOptions;
const category = categoryOptions;
const subcategory = subcategoryOptions;
const platform = platformOptions;

const productVal = ref<string>("Choose");
const categoryVal = ref<string>("Choose");
const subcategoryVal = ref<string>("Choose");
const platformVal = ref<string>("Choose");

const normalizeChoose = (value: string) => {
  return value === "Choose" ? "" : value;
};

const checkCanContinue = () => {
  const values = [
    normalizeChoose(productVal.value),
    normalizeChoose(categoryVal.value),
    normalizeChoose(subcategoryVal.value),
    normalizeChoose(platformVal.value),
  ];

  canContinue.value = values.every((val) => val !== "");
};

const setStorage = () => {
  const value = {
    product: normalizeChoose(productVal.value),
    category: normalizeChoose(categoryVal.value),
    subcategory: normalizeChoose(subcategoryVal.value),
    platform: normalizeChoose(platformVal.value),
  };

  const allSelected = Object.values(value).every((val) => val !== "");

  if (allSelected) {
    const Steps = {
      step_one: value,
      step_two: {},
      step_three: {},
    };
    writeLocalStorageJson("StepsObject", Steps);
  }
};

const loadFromStorage = () => {
  const stored = readLocalStorageJson<StepsObjectType | null>("StepsObject");
  if (stored?.step_one) {
    const stepOne = stored.step_one;

    if (stepOne.product) productVal.value = stepOne.product;
    if (stepOne.category) categoryVal.value = stepOne.category;
    if (stepOne.subcategory) subcategoryVal.value = stepOne.subcategory;
    if (stepOne.platform) platformVal.value = stepOne.platform;

    checkCanContinue();
  }
};

watch(productVal, () => {
  checkCanContinue();
  setStorage();
});

watch(categoryVal, () => {
  checkCanContinue();
  setStorage();
});

watch(subcategoryVal, () => {
  checkCanContinue();
  setStorage();
});

watch(platformVal, () => {
  checkCanContinue();
  setStorage();
});

onMounted(() => {
  loadFromStorage();
});
</script>
<style lang="scss" scoped>
.step-one__container {
  width: 100%;
  margin-top: 32px;
  user-select: none;
  .step-one__action {
    margin-top: 32px;
    width: 100%;
    padding: 12px 0;
    border-radius: 14px;
    background-color: #f64e2a;
    color: white;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 16px;
    &:disabled {
      opacity: 40%;
    }
  }
}

@media screen and (max-width: 750px) {
  .step-one__container {
    .step-one__action {
      display: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .step-one__container {
    width: 90%;
    margin: 32px auto;
  }
}
</style>
