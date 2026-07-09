<template>
  <div class="step-one__container">
    <DropDown
      v-model="product"
      label="Are you selling a digital product or something else?"
      :options="products"
      :default="'Choose'"
      class="select" />
    <DropDown
      v-model="category"
      style="margin-top: 16px"
      label="Category"
      :options="categories"
      :default="'Choose'"
      class="select" />
    <DropDown
      v-model="subcategory"
      style="margin-top: 16px"
      label="Subcategory"
      :options="subcategories"
      :default="'Choose'"
      class="select" />
    <DropDown
      v-model="platform"
      style="margin-top: 16px"
      label="Platform"
      :options="platforms"
      :default="'Choose'"
      class="select" />
    <button
      class="step-one__action"
      :disabled="!isFormValid"
      @click="SET_VALUES">
      Continue
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  categoryOptions,
  platformOptions,
  productTypeOptions,
  subcategoryOptions,
} from "~/shared/constants/shops";
import type { StepsObjectType } from "~/shared/types/shops";
import DropDown from "~/components/ui/shops/utils/dropdowns.vue";
import { useShopListingManageStore } from "~/store/shops/listing/listing-manage";

type StepOneType = StepsObjectType["step_one"];

const router = useRouter();
const route = useRoute();

// Pinia store
const shopListingManageStore = useShopListingManageStore();

// OPTIONS
const products = ref<string[]>(productTypeOptions);
const categories = ref<string[]>(categoryOptions);
const subcategories = ref<string[]>(subcategoryOptions);
const platforms = ref<string[]>(platformOptions);

// VALUES
const product = ref("Choose");
const category = ref("Choose");
const subcategory = ref("Choose");
const platform = ref("Choose");

// Computed
const isFormValid = computed(
  () =>
    product.value !== "Choose" &&
    category.value !== "Choose" &&
    subcategory.value !== "Choose" &&
    platform.value !== "Choose"
);

const stepOne = computed(() => listing.value?.step_one);
const listing = computed(() => shopListingManageStore.LISTING);

// Methods
const initializeFormData = () => {
  const stepOneData = stepOne.value;
  if (stepOneData) {
    product.value = stepOneData.product || "Choose";
    category.value = stepOneData.category || "Choose";
    subcategory.value = stepOneData.subcategory || "Choose";
    platform.value = stepOneData.platform || "Choose";
  } else {
    product.value = "Choose";
    category.value = "Choose";
    subcategory.value = "Choose";
    platform.value = "Choose";
  }
};

const SET_VALUES = () => {
  const data: StepOneType = {
    step: "one",
    category: category.value,
    platform: platform.value,
    product: product.value,
    subcategory: subcategory.value,
  };

  shopListingManageStore.SET_STEP(data);

  setTimeout(() => {
    router.push("/shops/listing?new-listing=2");
  }, 500);
};

const mode = () => {
  const query = route.query;

  if (Object.keys(query).includes("new-listing")) {
    shopListingManageStore.INIT_LISTING("new");
  } else {
    shopListingManageStore.INIT_LISTING("edit");
  }
};

// Lifecycle
onMounted(() => {
  mode();

  nextTick(() => {
    initializeFormData();
  });
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
