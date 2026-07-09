<template>
  <div class="step-three__container">
    <Input
      v-model="phone_number"
      label="Your Phone Number"
      title="Your Phone Number"
      type="number"
      placeholder="Enter"
      for-who="phone-number" />

    <Input
      v-model="comunication_method"
      label="Communication Method"
      title="Communication Method"
      type="text"
      placeholder="Enter"
      for-who="communication-method" />

    <Input
      v-model="quantity_product"
      label="Quantity of the Product"
      title="Quantity of the Product"
      type="number"
      placeholder="Enter"
      for-who="quantity-product"
      with-help />

    <Input
      v-model="cost_product"
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

    <div class="step-three-duration">
      <Input
        v-model="duration.start"
        label="Duration"
        title="Duration"
        type="number"
        placeholder="Start"
        for-who="duration-start" />
      <Input
        v-model="duration.end"
        type="number"
        placeholder="Ending"
        for-who="duration-end" />
    </div>

    <CheckBox
      :option="options"
      :help="true"
      label="Plan"
      variant="primory"
      :selected="plan_option"
      @checkbox="PlanCheckbox" />

    <CheckBox
      :option="terms"
      label="Terms"
      variant="secondary"
      :selected="term_option"
      @checkbox="TermCheckbox" />

    <CheckBox
      :option="regions"
      label="Region"
      variant="secondary"
      :selected="region_option"
      @checkbox="RegionCheckbox" />

    <NuxtLink :to="{ path: '/shops/new-listing', query: { step: 4 } }">
      <button class="step-three__action" :disabled="!canContinue">
        Continue
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import CheckBox from "~/components/ui/shops/checkbox.vue";
import Input from "~/components/ui/shops/input.vue";
import {
  PlanCheckbox as PlanCheckboxOptions,
  Regions,
  Terms,
} from "../constants";
import type { CheckBoxType } from "../types";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

type duration = {
  start: string;
  end: string;
};

// OPTIONS
const options: CheckBoxType[] = PlanCheckboxOptions;
const terms: CheckBoxType[] = Terms;
const regions: CheckBoxType[] = Regions;

// VALUES
const canContinue = ref<boolean>(false);
const phone_number = ref<string>("");
const comunication_method = ref<string>("");
const quantity_product = ref<string>("");
const cost_product = ref<string>("");
const plan_option = ref<number[]>([]);
const term_option = ref<number[]>([]);
const region_option = ref<number[]>([]);
const duration = reactive<duration>({
  start: "",
  end: "",
});

const PlanCheckbox = ({ id, checked }: { id: number; checked: boolean }) => {
  if (checked && !plan_option.value.includes(id)) {
    // Обычная логика для множественного выбора
    plan_option.value.push(id);
  } else if (!checked) {
    plan_option.value = plan_option.value.filter((item) => item !== id);
  }
};

const TermCheckbox = ({ id, checked }: { id: number; checked: boolean }) => {
  if (checked && !term_option.value.includes(id)) {
    // Обычная логика для множественного выбора
    term_option.value.push(id);
  } else if (!checked) {
    term_option.value = term_option.value.filter((item) => item !== id);
  }
};

const RegionCheckbox = ({ id, checked }: { id: number; checked: boolean }) => {
  if (checked && !region_option.value.includes(id)) {
    // Обычная логика для множественного выбора
    region_option.value.push(id);
  } else if (!checked) {
    region_option.value = region_option.value.filter((item) => item !== id);
  }
};

const checkValidation = () => {
  canContinue.value = Boolean(
    phone_number.value &&
      comunication_method.value &&
      quantity_product.value &&
      cost_product.value &&
      plan_option.value.length > 0 &&
      region_option.value.length > 0 &&
      term_option.value.length > 0
  );
};

const checkValidationAndSave = () => {
  checkValidation();
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  if (!import.meta.client) {
    return;
  }

  let datas = {
    step_one: {},
    step_two: {},
    step_three: {},
  };

  try {
    const storedData = readLocalStorageJson<{
      step_one?: Record<string, unknown>;
      step_two?: Record<string, unknown>;
      step_three?: Record<string, unknown>;
    }>("StepsObject");
    if (storedData) {
      datas = {
        step_one: storedData.step_one || {},
        step_two: storedData.step_two || {},
        step_three: storedData.step_three || {},
      };
    }
  } catch (parseError) {
    console.error("Error parsing localStorage data:", parseError);
  }

  const value = {
    phone_number: phone_number.value,
    comunication_method: comunication_method.value,
    quantity_product: quantity_product.value,
    cost_product: cost_product.value,
    plan_option: plan_option.value,
    term_option: term_option.value,
    region_option: region_option.value,
    duration: duration,
  };

  const Steps = {
    ...datas,
    step_three: value,
  };

  writeLocalStorageJson("StepsObject", Steps);
};

const loadFromLocalStorage = () => {
  if (!import.meta.client) {
    return;
  }

  try {
    const savedData = readLocalStorageJson<{
      step_three?: {
        phone_number?: string;
        comunication_method?: string;
        quantity_product?: string;
        cost_product?: string;
        plan_option?: number[];
        term_option?: number[];
        region_option?: number[];
        duration?: { start?: string; end?: string };
      };
    }>("StepsObject");

    if (savedData?.step_three) {
      const formData = savedData.step_three;

      phone_number.value = formData.phone_number || "";
      comunication_method.value = formData.comunication_method || "";
      quantity_product.value = formData.quantity_product || "";
      cost_product.value = formData.cost_product || "";
      plan_option.value = formData.plan_option || [];
      term_option.value = formData.term_option || [];
      region_option.value = formData.region_option || [];
      duration.start = formData.duration?.start || "";
      duration.end = formData.duration?.end || "";
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
};

watch(phone_number, () => {
  checkValidationAndSave();
});

watch(comunication_method, () => {
  checkValidationAndSave();
});

watch(quantity_product, () => {
  checkValidationAndSave();
});

watch(cost_product, () => {
  checkValidationAndSave();
});

watch(plan_option, () => {
  checkValidationAndSave();
});

watch(term_option, () => {
  checkValidationAndSave();
});

watch(region_option, () => {
  checkValidationAndSave();
});

watch(duration, () => {
  checkValidationAndSave();
});

onMounted(() => {
  loadFromLocalStorage();
  checkValidation();
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
