<template>
  <div class="verification-stepper pt-0 p-0">
    <div class="stepper-container">
      <div class="stepper-back-button">
        <img
          class="cursor-pointer"
          src="/assets/svg/arrow-back.svg"
          alt=""
          @click="handleBackNav" />
      </div>
      <div class="stepper-header">
        <h1>{{ $t("verification.title") }}</h1>
        <div class="stepper-steps">
          <div class="stepper-step active">
            {{
              showingPreview
                ? $t("verification.applicationPreview")
                : steps[currentStep]
            }}
          </div>
        </div>

        <div class="stepper-progress">
          <div
            v-for="(_, index) in steps"
            :key="`progress-${index}`"
            class="progress-indicator"
            :class="{
              active: currentStep === index,
              completed: index < currentStep || showingPreview,
            }"></div>
        </div>
      </div>
      <div class="stepper-next-button" v-if="windowWidth < 1024">
        <div
          class="action-button"
          :style="{ opacity: isCurrentStepValid ? '100%' : '40%' }"
          @click="handleNextStep">
          {{ $t("verification.next") }}
        </div>
      </div>
    </div>

    <div class="stepper-content py-16">
      <component
        :is="currentComponent"
        v-if="!showingPreview"
        ref="currentStepComponent"
        @next="handleNextStep"
        @back="handleBackNav"
        @validation-change="updateValidation" />
      <VerificationPreview v-else />

      <CustomButton
        v-if="windowWidth > 1024"
        :style="{ opacity: isCurrentStepValid ? '100%' : '40%' }"
        type="primary"
        size="lg"
        class="w-full mt-30"
        :value="$t('verification.next')"
        :disabled="!isCurrentStepValid"
        @click="handleNextStep" />
    </div>
  </div>
</template>

<script setup lang="ts">
import VerificationPreview from "@/entities/verification/ui/VerificationPreview/index.vue";
import BasicDetails from "@/entities/verification/ui/VerificationSteps/BasicDetails.vue";
import CategoriesAndDuration from "@/entities/verification/ui/VerificationSteps/CategoriesAndDuration.vue";
import ContactDetails from "@/entities/verification/ui/VerificationSteps/ContactDetails.vue";
import ScreenshotsAndProofs from "@/entities/verification/ui/VerificationSteps/ScreenshotsAndProofs.vue";
import { useVerificationStore } from "@/store/verification";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import CustomButton from "~/components/ui/Button.vue";

// Composables
const verificationStore = useVerificationStore();
const router = useRouter();

// Reactive state
const currentStep = ref(0);
const showingPreview = ref(false);
const isCurrentStepValid = ref(false);
const windowWidth = ref<number>(0);
const currentStepComponent = ref();

// Computed properties
const steps = computed(() => [
  $t("verification.steps.step1"),
  $t("verification.steps.step2"),
  $t("verification.steps.step3"),
  $t("verification.steps.step4"),
]);

const stepComponents = [
  CategoriesAndDuration,
  BasicDetails,
  ContactDetails,
  ScreenshotsAndProofs,
];

const currentComponent = computed(() => stepComponents[currentStep.value]);

const isLastStep = computed(() => currentStep.value === steps.value.length - 1);

// Methods
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const checkCurrentStepValidity = () => {
  nextTick(() => {
    if (
      currentStepComponent.value &&
      typeof currentStepComponent.value.isValid === "function"
    ) {
      isCurrentStepValid.value = currentStepComponent.value.isValid();
    } else {
      isCurrentStepValid.value = true;
    }
  });
};

const updateValidation = (isValid: boolean) => {
  isCurrentStepValid.value = isValid;
};

const handleNextStep = () => {
  if (!isCurrentStepValid.value && !showingPreview.value) {
    return;
  }

  if (showingPreview.value) {
    submitVerification();
    return;
  }

  if (isLastStep.value) {
    processVerification();
  } else {
    currentStep.value += 1;
    nextTick(() => {
      checkCurrentStepValidity();
    });
  }
};

const handleBackNav = () => {
  if (showingPreview.value) {
    showingPreview.value = false;
    return;
  }

  if (currentStep.value > 0) {
    currentStep.value -= 1;
    nextTick(() => {
      checkCurrentStepValidity();
    });
  } else {
    router.push("/");
  }
};

const processVerification = () => {
  verificationStore.setVerificationData({
    ...verificationStore.verificationData,
    isProcessed: true,
  });
  showingPreview.value = true;
};

const submitVerification = () => {
  emit("submitted");
};

// Emits
const emit = defineEmits<{
  submitted: [];
}>();

// Watchers
watch(currentStep, () => {
  checkCurrentStepValidity();
});

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", updateWindowWidth);
  }
  nextTick(() => {
    checkCurrentStepValidity();
  });
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", updateWindowWidth);
  }
});
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
