<template>
  <div>
    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          {{ $t("verification.screenshots.title") }}
        </div>

        <div class="info" @click="openModal('attachedFiles')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
    </div>

    <UploadImages class="mt-20" @upload:screenshots="updateScreenshots" />

    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :button-text="'verification.screenshots.understood'"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :is-cancel="false"
      :close="() => closeModal(key)" />
  </div>
</template>

<script setup lang="ts">
import { modals, type Modals } from "@/entities/verification/data/modal";
import UploadImages from "@/entities/verification/ui/VerificationForm/UploadImages.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationDialog from "@/widgets/verification/VerificationDialog/index.vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";

// Composables
const verificationStore = useVerificationStore();

// Reactive state
const localModals = ref<Modals>(modals);

// Computed properties
const localScreenshots = computed(
  () => verificationStore.verificationData.screenshots || []
);

// Methods
const updateScreenshots = () => {
  validateForm();
};

const validateForm = () => {
  const isValid = checkIsValid();
  emit("validation-change", isValid);
};

const checkIsValid = () => {
  return localScreenshots.value.length > 0;
};

const processVerification = () => {
  if (!checkIsValid()) {
    return;
  }

  verificationStore.setVerificationData({
    ...verificationStore.verificationData,
    isProcessed: true,
  });
  emit("next");
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
  next: [];
}>();

// Watchers
watch(
  () => verificationStore.verificationData.screenshots,
  () => {
    validateForm();
  },
  { deep: true }
);

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    validateForm();
  });
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
