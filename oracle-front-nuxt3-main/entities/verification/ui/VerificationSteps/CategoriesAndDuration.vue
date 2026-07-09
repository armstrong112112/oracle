<template>
  <div class="flex flex-col gap-20">
    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          {{ $t("verification.categoriesAndDuration.selectCategory") }}
        </div>
        <div class="info" @click="openModal('categoryInfo')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <ChooseCategory
        placeholder="Select verification category"
        :multi-select="true"
        :values="categories"
        @update:categories="validateForm" />

      <div class="form-description">
        {{ $t("verification.categoriesAndDuration.description") }}
      </div>
    </div>

    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          {{ $t("verification.categoriesAndDuration.choosePeriod") }}
        </div>
        <div class="info" @click="openModal('verificationPeriod')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <ChooseVerificationPeriod @update:period="validateForm" />
    </div>

    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :button-text="'verification.categoriesAndDuration.understood'"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :is-cancel="false"
      :close="() => closeModal(key)" />
  </div>
</template>

<script setup lang="ts">
import {
  categories,
  type Category,
} from "@/entities/verification/data/categories";
import { modals, type Modals } from "@/entities/verification/data/modal";
import ChooseCategory from "@/entities/verification/ui/VerificationForm/ChooseCategory.vue";
import ChooseVerificationPeriod from "@/entities/verification/ui/VerificationForm/ChooseVerificationPeriod.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationDialog from "@/widgets/verification/VerificationDialog/index.vue";
import { onMounted, ref, watch } from "vue";

// Composables
const verificationStore = useVerificationStore();

// Reactive state
const categoriesList: Category[] = categories;
const localModals = ref<Modals>(modals);

// Methods
const validateForm = () => {
  const isValid = checkIsValid();
  emit("validation-change", isValid as boolean);
};

const checkIsValid = (): boolean => {
  const { category, verificationPeriod } = verificationStore.verificationData;

  const hasValidCategory =
    category &&
    category.length > 0 &&
    category.some(
      (cat) =>
        cat.title && cat.title.trim() !== "" && cat.id !== 0 && cat.id !== 141
    );

  const hasValidPeriod = verificationPeriod && verificationPeriod.trim() !== "";
  return Boolean(hasValidCategory && hasValidPeriod);
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};

// Expose methods for parent component
const isValid = () => checkIsValid();

// Emits
const emit = defineEmits<{
  "validation-change": [isValid: boolean];
}>();

// Watchers
watch(
  () => verificationStore.verificationData,
  () => {
    validateForm();
  },
  { deep: true }
);

// Lifecycle hooks
onMounted(() => {
  validateForm();
});

// Expose methods for parent component
defineExpose({
  isValid,
});
</script>

<style scoped>
.form-row-parent {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
}
.info {
  cursor: pointer;
}
.form-description {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: #b2aaf9;
}
</style>
