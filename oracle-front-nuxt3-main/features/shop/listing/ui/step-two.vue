<template>
  <div class="step-two__container">
    <div class="input-toggle__container">
      <div class="input-toggle__label">Instant Delivery</div>
      <div class="input-toggle__toggle">
        <div
          :class="{
            'np-outer-switch': true,
            'np-outer-switch-on': delivery,
            'np-outer-switch-off': !delivery,
          }"
          @click="deliveryMode">
          <div
            :class="{
              'np-inner-switch': true,
              'np-inner-switch-left': !delivery,
              'np-inner-switch-right': delivery,
            }"></div>
        </div>
      </div>
    </div>

    <div @click="showCalendar">
      <DropDown
        v-model="dealDuration"
        :options="[]"
        :default="'Choose'"
        label="Deal Duration"
        class="select"
        style="margin-top: 16px" />
    </div>

    <Input
      v-model="header"
      label="Header"
      title="Header"
      type="text"
      placeholder="Enter"
      for-who="header" />

    <Input
      v-model="description"
      label="Description"
      title="Description"
      type="text"
      placeholder="Enter"
      for-who="description"
      with-help />

    <CheckBox
      label="Self-Registered"
      variant="primary"
      :option="self_registered"
      :selected="selfRegistered"
      :single-select="true"
      @checkbox="updateSelfRegisteredValue" />

    <CheckBox
      label="Controlled"
      variant="secondary"
      :option="controlled"
      :selected="controlledValue"
      :single-select="true"
      @checkbox="updateControlledValue" />

    <div class="step-two-duration">
      <Input
        v-model="accountAge.min"
        label="Account Age"
        title="Account Age"
        type="number"
        placeholder="Min"
        for-who="account-age"
        hint />
      <Input
        v-model="accountAge.max"
        type="number"
        placeholder="Max"
        for-who="quantity-product"
        with-help />
    </div>

    <div class="step-two-file__uploader" @click="triggerFileSelect">
      <label for="two-file" class="file-uploader__label">
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

    <button
      class="step-two__action"
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
import DropDown from "~/components/ui/shops/utils/dropdowns.vue";
import Input from "~/components/ui/shops/utils/input.vue";
import {
  Controlled,
  durationOptions,
  SelfRegisterCheckbox,
} from "~/shared/constants/shops";
import type { CheckBoxType, StepsObjectType } from "~/shared/types/shops";
import { useShopListingManageStore } from "~~/store/shops/listing/listing-manage";

type accountAgeType = {
  min: string;
  max: string;
};

type checkbox = {
  item: CheckBoxType;
  id: number;
  checked: boolean;
};

type StepTwoType = StepsObjectType["step_two"];

const router = useRouter();
const route = useRoute();
const shopListingManageStore = useShopListingManageStore();

// OPTIONS
const duration = ref<string[]>(durationOptions);
const self_registered = ref<CheckBoxType[]>(SelfRegisterCheckbox);
const controlled = ref<CheckBoxType[]>(Controlled);

// VALUES
const calendar = ref(false);
const selectedDateRange = ref("");
const accountAge = ref<accountAgeType>({
  min: "",
  max: "",
});
const selfRegistered = ref("");
const controlledValue = ref("");
const checkbox_val = ref(false);
const delivery = ref(false);
const dealDuration = ref("");
const header = ref("");
const description = ref("");
const uploadedImage = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

// Computed
const isFormValid = computed(
  () =>
    dealDuration.value !== "" &&
    header.value !== "" &&
    description.value !== "" &&
    accountAge.value.min !== "" &&
    accountAge.value.max !== "" &&
    selfRegistered.value.length > 0 &&
    controlledValue.value.length > 0 &&
    uploadedImage.value !== ""
);

const stepTwo = computed(() => listing.value?.step_two);
const listing = computed(() => shopListingManageStore.LISTING);

// Methods
const showCalendar = () => {
  calendar.value = true;
};

const initializeFormData = () => {
  const stepTwoData = stepTwo.value;
  if (stepTwoData) {
    dealDuration.value = stepTwoData.deal_duration || "";
    header.value = stepTwoData.header || "";
    description.value = stepTwoData.description || "";
    selfRegistered.value = stepTwoData.selfRegistered || "";
    controlledValue.value = stepTwoData.controlled || "";
    accountAge.value.min = stepTwoData.accountAge?.min || "";
    accountAge.value.max = stepTwoData.accountAge?.max || "";
    uploadedImage.value = stepTwoData.uploadedImage || "";
  } else {
    dealDuration.value = "";
    header.value = "";
    description.value = "";
    selfRegistered.value = "";
    controlledValue.value = "";
    accountAge.value.min = "";
    accountAge.value.max = "";
    uploadedImage.value = "";
  }
};

const deliveryMode = () => {
  delivery.value = !delivery.value;
};

const updateDate = (data: string) => {
  selectedDateRange.value = data;
  dealDuration.value = data;
};

const updateSelfRegisteredValue = ({ item, id, checked }: checkbox) => {
  if (checked) {
    selfRegistered.value = `${item.headingA} + ${item.headingB}`;
  } else {
    selfRegistered.value = "";
  }
};

const updateControlledValue = ({ item, id, checked }: checkbox) => {
  if (checked) {
    controlledValue.value = `${item.headingA} + ${item.headingB}`;
  } else {
    controlledValue.value = "";
  }
};

const triggerFileSelect = () => {
  fileInput.value?.click();
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};

const SET_VALUES = () => {
  const data: StepTwoType = {
    step: "two",
    delivery: delivery.value,
    deal_duration: dealDuration.value,
    header: header.value,
    description: description.value,
    selfRegistered: selfRegistered.value,
    controlled: controlledValue.value,
    accountAge: {
      min: accountAge.value.min,
      max: accountAge.value.max,
    },
    uploadedImage: uploadedImage.value,
  };

  shopListingManageStore.SET_STEP(data);

  setTimeout(() => {
    router.push("/shops/listing?new-listing=3");
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

// Watchers
watch(
  () => accountAge.value.max,
  (newVal) => {
    const max = Number(newVal);
    const min = Number(accountAge.value.min);

    if (!isNaN(max) && !isNaN(min) && max < min) {
      accountAge.value.max = accountAge.value.min;
    }
  }
);

watch(
  () => accountAge.value.min,
  (newVal) => {
    const min = Number(newVal);
    const max = Number(accountAge.value.max);

    if (!isNaN(min) && !isNaN(max) && min > max) {
      accountAge.value.min = accountAge.value.max;
    }
  }
);

// Lifecycle
onMounted(() => {
  mode();

  nextTick(() => {
    initializeFormData();
  });
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

    .input-toggle__label {
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
        background: #f64e2a;
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

    .file-uploader__label {
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
