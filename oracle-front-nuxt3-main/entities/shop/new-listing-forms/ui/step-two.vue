<template>
  <div class="step-two__container">
    <div class="input-toggle__container">
      <div class="input-toggle__lable">Instant Delivery</div>
      <div class="input-toggle__toggle">
        <div
          :class="{
            'np-outer-switch': true,
            'np-outer-switch-on': instant_delivery_1,
            'np-outer-switch-off': !instant_delivery_1,
          }"
          @click="instant_delivery_function">
          <div
            :class="{
              'np-inner-switch': true,
              'np-inner-switch-left': !instant_delivery_1,
              'np-inner-switch-right': instant_delivery_1,
            }"></div>
        </div>
      </div>
    </div>
    <div class="input-toggle__container">
      <div class="input-toggle__lable">Instant Delivery</div>
      <div class="input-toggle__toggle">
        <div
          :class="{
            'np-outer-switch': true,
            'np-outer-switch-on': instant_delivery_2,
            'np-outer-switch-off': !instant_delivery_2,
          }"
          @click="instant_delivery_function_2">
          <div
            :class="{
              'np-inner-switch': true,
              'np-inner-switch-left': !instant_delivery_2,
              'np-inner-switch-right': instant_delivery_2,
            }"></div>
        </div>
      </div>
    </div>

    <DropDown
      v-model="deal_duration"
      :options="duration"
      :default="'Choose'"
      lable="Deal Duration"
      class="select"
      style="margin-top: 16px" />

    <Input
      v-model="header"
      label="Header"
      title="Header"
      type="text"
      placeholder="Enter"
      for-who="header" />

    <Input
      v-model="desctiption"
      label="Description"
      title="Description"
      type="text"
      placeholder="Enter"
      for-who="description"
      with-help />

    <CheckBox
      label="Self-Registred"
      variant="primory"
      :option="self_registred"
      :selected="self_registred_value"
      :single-select="true"
      @checkbox="handleSelfRegisteredCheckbox" />

    <CheckBox
      label="Controlled"
      variant="secondary"
      :option="controlled"
      :selected="controlled_value"
      :single-select="true"
      @checkbox="handleControlledCheckbox" />

    <div class="step-two-duration">
      <Input
        v-model="account_age.min"
        label="Account Age"
        title="Account Age"
        type="number"
        placeholder="Min"
        for-who="account-age"
        hint />
      <Input
        v-model="account_age.max"
        type="number"
        placeholder="Max"
        for-who="quantity-product"
        with-help />
    </div>

    <div class="step-two-file__uploader" @click="triggerFileSelect">
      <label for="two-file" class="file-uloader__label">
        Photos and videos
      </label>
      <div class="file-uploader__container">
        <div class="file-uploader__content">
          <img
            src="/svg/shop/icons/image-rectangle.svg"
            alt="image-rectangle" />
          <h5>Select from Gallery</h5>
        </div>
        <input
          id="two-file"
          ref="fileInput"
          type="file"
          name="two-file"
          style="display: none"
          accept="image/*"
          @change="onFileChange" />
      </div>
    </div>

    <NuxtLink :to="{ path: '/shops/new-listing', query: { step: 3 } }">
      <button class="step-two__action" :disabled="!canContinue">
        Continue
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import CheckBox from "~/components/ui/shops/checkbox.vue";
import DropDown from "~/components/ui/shops/dropdowns.vue";
import Input from "~/components/ui/shops/input.vue";
import {
  Controlled,
  durationOptions,
  SelfRegisterCheckbox,
} from "../constants";
import type { CheckBoxType } from "../types";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

type account_age = {
  min: string;
  max: string;
};

const canContinue = ref<boolean>(false);
const instant_delivery_1 = ref<boolean>(false);
const instant_delivery_2 = ref<boolean>(false);
const deal_duration = ref<string>("");
const header = ref<string>("");
const desctiption = ref<string>("");
const uploaded_image = ref<string>("");
const self_registred_value = ref<number[]>([]);
const controlled_value = ref<number[]>([]);
const account_age = reactive<account_age>({
  min: "",
  max: "",
});

const duration = durationOptions;
const self_registred: CheckBoxType[] = SelfRegisterCheckbox;
const controlled: CheckBoxType[] = Controlled;
const phoneNumber = ref<string>("0");
const checkbox = ref<boolean>(false);
const isEnabled = ref<boolean>(false);
const selectedOptions = ref<number[]>([]);

const fileInput = ref<HTMLInputElement | null>(null);

const checkValidation = () => {
  canContinue.value = !!(
    deal_duration.value &&
    header.value.trim() &&
    desctiption.value.trim() &&
    account_age.min &&
    account_age.max &&
    uploaded_image.value &&
    (self_registred_value.value.length > 0 || controlled_value.value.length > 0)
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

  const formData = {
    instant_delivery_1: instant_delivery_1.value,
    instant_delivery_2: instant_delivery_2.value,
    deal_duration: deal_duration.value,
    header: header.value,
    desctiption: desctiption.value,
    self_registred_value: self_registred_value.value,
    controlled_value: controlled_value.value,
    account_age: {
      min: account_age.min,
      max: account_age.max,
    },
    uploaded_image: uploaded_image.value,
  };

  const Steps = {
    ...datas,
    step_two: formData,
  };

  writeLocalStorageJson("StepsObject", Steps);
};

const loadFromLocalStorage = () => {
  if (!import.meta.client) {
    return;
  }

  try {
    const savedData = readLocalStorageJson<{
      step_two?: {
        instant_delivery_1?: boolean;
        instant_delivery_2?: boolean;
        deal_duration?: string;
        header?: string;
        desctiption?: string;
        self_registred_value?: number[];
        controlled_value?: number[];
        account_age?: { min?: string; max?: string };
        uploaded_image?: string;
      };
    }>("StepsObject");

    if (savedData?.step_two) {
      const formData = savedData.step_two;

      instant_delivery_1.value = formData.instant_delivery_1 || false;
      instant_delivery_2.value = formData.instant_delivery_2 || false;
      deal_duration.value = formData.deal_duration || "";
      header.value = formData.header || "";
      desctiption.value = formData.desctiption || "";
      self_registred_value.value = formData.self_registred_value || [];
      controlled_value.value = formData.controlled_value || [];
      account_age.min = formData.account_age?.min || "";
      account_age.max = formData.account_age?.max || "";
      uploaded_image.value = formData.uploaded_image || "";
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
};

const instant_delivery_function = () => {
  instant_delivery_1.value = !instant_delivery_1.value;
};

const instant_delivery_function_2 = () => {
  instant_delivery_2.value = !instant_delivery_2.value;
};

const handleCheckbox = ({
  id,
  checked,
  singleSelect,
}: {
  id: number;
  checked: boolean;
  singleSelect?: boolean;
}) => {
  if (singleSelect && checked) {
    const isSelfRegistered = self_registred.some((item) => item.id === id);

    if (isSelfRegistered) {
      self_registred_value.value = [id];
    } else {
      controlled_value.value = [id];
    }
    return;
  }

  if (checked && !selectedOptions.value.includes(id)) {
    selectedOptions.value.push(id);
  }

  if (!checked) {
    selectedOptions.value = selectedOptions.value.filter((item) => item !== id);
  }
};

const handleSelfRegisteredCheckbox = ({
  id,
  checked,
}: {
  id: number;
  checked: boolean;
}) => {
  if (checked) {
    self_registred_value.value = [id];
  } else {
    self_registred_value.value = [];
  }
};

const handleControlledCheckbox = ({
  id,
  checked,
}: {
  id: number;
  checked: boolean;
}) => {
  if (checked) {
    controlled_value.value = [id];
  } else {
    controlled_value.value = [];
  }
};

const triggerFileSelect = () => {
  fileInput.value?.click();

  if (fileInput.value) {
    fileInput.value.accept = "image/*";
  }
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      uploaded_image.value = reader.result as string;
      checkValidationAndSave();
    };
    reader.readAsDataURL(file);
  }
};

watch(deal_duration, () => {
  checkValidationAndSave();
});

watch(header, () => {
  checkValidationAndSave();
});

watch(desctiption, () => {
  checkValidationAndSave();
});

watch(self_registred_value, () => {
  checkValidationAndSave();
});

watch(controlled_value, () => {
  checkValidationAndSave();
});

watch(account_age, () => {
  checkValidationAndSave();
}, { deep: true });

onMounted(() => {
  loadFromLocalStorage();
  checkValidation();
});
</script>

<style lang="scss" scoped>
.step-two__container {
  width: 100%;
  margin-top: 32px;
  user-select: none;
  .input-toggle__container {
    margin-top: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 8px 8px 12px;
    border-radius: 12px;
    background-color: #14131b;

    .input-toggle__lable {
      color: white;
      font-size: 14px;
      font-weight: 400;
      font-family: Roboto, sans-serif;
    }

    .input-toggle__toggle {
      width: 51px;
      height: 31px;
      position: relative;

      .np-outer-switch {
        width: 100%;
        height: 100%;
        border-radius: 30px;
        background: #2c2a3d;
        cursor: pointer;
      }

      .np-outer-switch-off {
        background: #2c2a3d;
        transition: background 0.4s;
      }

      .np-outer-switch-on {
        background: #2c2a3d;
        transition: background 0.4s;
      }

      .np-inner-switch {
        height: 27px;
        width: 27px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
      }

      .np-inner-switch-left {
        top: 2px;
        left: 2px;
        transition: left 0.4s;
      }

      .np-inner-switch-right {
        top: 2px;
        left: 45%;
        transition: left 0.4s;
      }
    }
  }

  .step-two-duration {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }

  .step-two-file__uploader {
    margin-top: 16px;
    width: 100%;
    cursor: pointer;

    input {
      display: none;
    }

    .file-uloader__label {
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 14px;
    }

    .file-uploader__container {
      width: 100%;
      height: 135px;
      margin-top: 6px;
      border-radius: 12px;
      background-color: #14131b;
      display: flex;
      align-items: center;
      justify-content: center;

      .file-uploader__content {
        width: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        h5 {
          color: #bfb7ff;
          font-family: Roboto, sans-serif;
          font-weight: 600;
          font-size: 14px;
        }
      }
    }
  }

  .step-two__action {
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
  .step-two__container {
    .step-two__action {
      display: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .step-two__container {
    width: 90%;
    margin: 32px auto;
  }
}
</style>
