<template>
  <div class="step-three__container">
    <Input
      v-model="phoneNumber"
      label="Your Phone Number"
      title="Your Phone Number"
      type="number"
      placeholder="Enter"
      for-who="phone-number" />

    <Input
      v-model="communicationMethod"
      label="Communication Method"
      title="Communication Method"
      type="text"
      placeholder="Enter"
      for-who="communication-method" />

    <Input
      v-model="quantityProduct"
      label="Quantity of the Product"
      title="Quantity of the Product"
      type="number"
      placeholder="Enter"
      for-who="quantity-product"
      with-help />

    <Input
      v-model="costProduct"
      label="Cost of the Product"
      title="Cost of the Product"
      type="number"
      placeholder="Enter price"
      for-who="cost-product"
      with-icon>
      <template #icon>
        <img src="/svg/shop/icons/dollar.svg" alt="" />
      </template>
    </Input>

    <div class="step-three-duration" @click="showCalendar">
      <Input
        v-model="duration.start"
        label="Duration"
        title="Duration"
        type="string"
        placeholder="Start"
        for-who="duration-start" />
      <Input
        v-model="duration.end"
        type="string"
        placeholder="Ending"
        for-who="duration-end" />
    </div>

    <CheckBox
      label="Plan"
      variant="primary"
      :help="true"
      :option="options"
      :selected="planOption"
      :single-select="true"
      @checkbox="PlanCheckbox" />

    <CheckBox
      label="Terms"
      variant="secondary"
      :option="terms"
      :selected="termOption"
      :single-select="true"
      @checkbox="TermCheckbox" />

    <CheckBox
      label="Region"
      variant="secondary"
      :option="regions"
      :selected="regionOption"
      :single-select="true"
      @checkbox="RegionCheckbox" />

    <button
      class="step-three__action"
      :disabled="!isFormValid"
      @click="SET_VALUES">
      Continue
    </button>

    <ShopCalendar
      v-if="calendar"
      v-model="selectedDateRange"
      @input="updateDate"
      @close="calendar = false" />
  </div>
</template>

<script setup lang="ts">
import ShopCalendar from "~/components/ui/shops/utils/calendar.vue";
import CheckBox from "~/components/ui/shops/utils/checkbox.vue";
import Input from "~/components/ui/shops/utils/input.vue";
import {
  PlanCheckbox as PlanCheckboxOptions,
  Regions,
  Terms,
} from "~/shared/constants/shops";
import type { CheckBoxType, StepsObjectType } from "~/shared/types/shops";
import { useShopListingManageStore } from "~~/store/shops/listing/listing-manage";

type DurationType = {
  start: string;
  end: string;
};

type checkbox = {
  item: OptionType;
  id: number;
  checked: boolean;
};

interface OptionType {
  id: number;
  headingA: string;
  headingB: string;
}

type StepThreeType = StepsObjectType["step_three"];

const router = useRouter();
const route = useRoute();
const shopListingManageStore = useShopListingManageStore();

// Options
const options = ref<CheckBoxType[]>(PlanCheckboxOptions);
const terms = ref<CheckBoxType[]>(Terms);
const regions = ref<CheckBoxType[]>(Regions);

// Values
const calendar = ref(false);
const selectedDateRange = ref("");
const phoneNumber = ref("");
const communicationMethod = ref("");
const quantityProduct = ref("");
const costProduct = ref("");
const duration = ref<DurationType>({
  start: "",
  end: "",
});
const planOption = ref("");
const termOption = ref("");
const regionOption = ref("");

// Computed
const isFormValid = computed(
  () =>
    phoneNumber.value !== "" &&
    communicationMethod.value !== "" &&
    quantityProduct.value !== "" &&
    costProduct.value !== "" &&
    duration.value.start !== "" &&
    duration.value.end !== "" &&
    planOption.value !== "" &&
    termOption.value !== "" &&
    regionOption.value !== ""
);

const stepThree = computed(() => listing.value?.step_three);
const listing = computed(() => shopListingManageStore.LISTING);

// Methods
const updateDate = (data: string) => {
  const [start, end] = String(data)
    .split("—")
    .map((s) => s.trim());

  selectedDateRange.value = data;
  duration.value.start = start || "";
  duration.value.end = end || "";
};

const showCalendar = () => {
  calendar.value = true;
};

const initializeFormData = () => {
  const stepThreeData = stepThree.value;
  if (stepThreeData) {
    phoneNumber.value = stepThreeData.phoneNumber || "";
    communicationMethod.value = stepThreeData.communication || "";
    quantityProduct.value = stepThreeData.quantity || "";
    costProduct.value = stepThreeData.cost || "";
    duration.value = {
      start: stepThreeData.duration.start || "",
      end: stepThreeData.duration.end || "",
    };
    planOption.value = stepThreeData.plan || "";
    termOption.value = stepThreeData.terms || "";
    regionOption.value = stepThreeData.regions || "";
  } else {
    phoneNumber.value = "";
    communicationMethod.value = "";
    quantityProduct.value = "";
    costProduct.value = "";
    duration.value = {
      start: "",
      end: "",
    };
    planOption.value = "";
    termOption.value = "";
    regionOption.value = "";
  }
};

const PlanCheckbox = ({ item, id, checked }: checkbox) => {
  if (checked) {
    planOption.value = `${item.headingA} + ${item.headingB}`;
  } else {
    planOption.value = "";
  }
};

const TermCheckbox = ({ item, id, checked }: checkbox) => {
  if (checked) {
    termOption.value = `${item.headingA} + ${item.headingB}`;
  } else {
    termOption.value = "";
  }
};

const RegionCheckbox = ({ item, id, checked }: checkbox) => {
  if (checked) {
    regionOption.value = `${item.headingA} + ${item.headingB}`;
  } else {
    regionOption.value = "";
  }
};

const SET_VALUES = () => {
  const data: StepThreeType = {
    step: "three",
    phoneNumber: phoneNumber.value,
    communication: communicationMethod.value,
    quantity: quantityProduct.value,
    cost: costProduct.value,
    plan: planOption.value,
    terms: termOption.value,
    regions: regionOption.value,
    duration: {
      start: duration.value.start,
      end: duration.value.end,
    },
  };

  shopListingManageStore.SET_STEP(data);

  setTimeout(() => {
    router.push("/shops/listing?new-listing=4");
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
.step-three__container {
  width: 100%;
  margin-top: 32px;
  user-select: none;

  .step-three-duration {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }

  .step-three__action {
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
  .step-three__container {
    .step-three__action {
      display: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .step-three__container {
    width: 90%;
    margin: 32px auto;
  }
}
</style>
