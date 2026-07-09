<template>
  <div class="verification-stepper pt-0 p-0">
    <div class="stepper-container">
      <!-- Back Button -->
      <div class="stepper-back-button">
        <img
          class="cursor-pointer"
          src="/assets/svg/arrow-back.svg"
          alt=""
          @click="handleBackNav" />
      </div>

      <!-- Header -->
      <div class="stepper-header">
        <div class="stepper-steps">
          <div class="stepper-step active">
            {{ steps[currentStep] }}
          </div>
        </div>

        <!-- Progress -->
        <div class="stepper-progress">
          <div
            v-for="(_, index) in steps"
            :key="`progress-${index}`"
            class="progress-indicator"
            :class="{
              active: currentStep === index,
              completed: index < currentStep,
            }"></div>
        </div>
      </div>

      <!-- Next Button -->
      <div class="stepper-next-button">
        <div
          class="action-button"
          :class="{ 'cursor-not-allowed': !isCurrentStepValid }"
          :style="{ opacity: isCurrentStepValid ? '100%' : '40%' }"
          @click="handleNextStep">
          {{ isLastStep ? $t("verification.submit") : $t("verification.next") }}
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="stepper-content py-16">
      <component
        :is="currentComponent"
        ref="currentStepComponent"
        @next="handleNextStep"
        @back="handleBackNav"
        @validation-change="updateValidation" />
    </div>

    <!-- Dialogs -->
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="(modal.buttonType as ButtonType)"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => processCreation(key)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
import { useBlackListStore } from "@/store/blackList";
import { modals, type Modals } from "~/entities/verification/data/modal";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";

const emit = defineEmits<{
  submitted: [];
}>();

const router = useRouter();
const blackListStore = useBlackListStore();

const currentStep = ref(0);
const isCurrentStepValid = ref(false);
const windowWidth = ref(0);

const localModals = ref<Modals>(modals);

const steps = computed(() => ["Subject", "Details"]);

const stepComponents = ["BlackListSubject", "BlackListDetail"];

const currentComponent = computed(() => {
  return stepComponents[currentStep.value];
});

const isLastStep = computed(() => {
  return currentStep.value === steps.value.length - 1;
});

const checkCurrentStepValidity = () => {
  if (currentStep.value === 0) {
    isCurrentStepValid.value = blackListStore.isSubjectValid;
  } else if (currentStep.value === 1) {
    isCurrentStepValid.value = blackListStore.isDetailValid;
  } else {
    isCurrentStepValid.value = false;
  }
};

const updateValidation = (isValid: boolean) => {
  isCurrentStepValid.value = isValid;
};

const handleNextStep = () => {
  if (!isCurrentStepValid.value) {
    return;
  }
  if (isLastStep.value) {
    submitVerification();
  } else {
    currentStep.value += 1;
    checkCurrentStepValidity();
  }
};

const handleBackNav = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1;
    checkCurrentStepValidity();
  } else {
    router.push("/");
  }
};

const submitVerification = () => {
  emit("submitted");
  openModal("blackListSent");
  blackListStore.resetAll();
  currentStep.value = 0;
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};

const processCreation = (modalName: keyof typeof modals) => {
  closeModal(modalName);
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  checkCurrentStepValidity();
});

// Watch for store changes to update validation
watch(
  [() => blackListStore.isSubjectValid, () => blackListStore.isDetailValid],
  () => {
    checkCurrentStepValidity();
  }
);
</script>

<style lang="scss" scoped>
.stepper-back-button {
  width: 50px;
  height: 25px;
}
.verification-stepper {
  color: white;
  padding: 16px;
}

.stepper-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: #000;
  margin-bottom: 20px;
  padding: 8px;
}

.stepper-header {
  flex: 1;
  text-align: center;
}

.stepper-header h1 {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  margin: 0 0 4px;
}

.stepper-steps {
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: #b2aaf9;
  margin-bottom: 8px;
}

.stepper-progress {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.progress-indicator {
  width: 24px;
  height: 6px;
  border-radius: 4px;
  background-color: #1e1d24;
}

.progress-indicator.active {
  background-color: #ff3b30;
}

.progress-indicator.completed {
  background-color: #ff3b30;
}

.action-button {
  background-color: #ff3b30;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 6px 12px;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  @media (min-width: 1024px) {
    margin-top: 30px;
    text-align: center;
    font-size: 16px;
  }
}
.stepper-progress {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.progress-indicator {
  width: 15px;
  height: 5px;
  border-radius: 10px;
  background-color: #1e1d28;
  transition: all 0.3s ease;
}

.progress-indicator.active {
  background-color: #f64e2a;
  width: 32px;
}

.progress-indicator.completed {
  background-color: #f64e2a;
}
</style>
