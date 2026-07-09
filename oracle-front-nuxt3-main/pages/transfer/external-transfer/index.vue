<template>
  <div class="external-transfer">
    <div class="main-container">
      <block-nav-back
        to=""
        :text="$t('transfers.externalTransfer')"
        @prev="goToStep(step - 1)" />
      <div v-if="step === 1" class="external-transfer__step">
        <ExternalTransferStepOne @nextStep="goToStep(step + 1)" />
      </div>
      <div v-if="step === 2" class="external-transfer__step">
        <ExternalTransferStepTwo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExternalTransferStepOne from "~/components/transfer/external-transfer/step-one.vue";
import ExternalTransferStepTwo from "~/components/transfer/external-transfer/step-two.vue";

const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

// Reactive state
const step = ref<number>(1);

// Methods
const updateStepFromRoute = () => {
  const stepParam = route.query.step;
  if (stepParam && [1, 2].includes(Number(stepParam))) {
    step.value = Number(stepParam);
  }
};

const goToStep = (newStep: number) => {
  if (newStep >= 1 && newStep <= 2) {
    step.value = newStep;
    router.push({ query: { step: String(newStep) } });
  }
};

// Lifecycle hooks
onMounted(() => {
  updateStepFromRoute();
});
</script>

<style lang="scss">
.external-transfer {
  background: #000;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 24px;
  .input {
    .input-search {
      path {
        stroke: #7a74ba;
      }
    }
    input {
      height: 44px;
      border-radius: 12px;
      padding: 13px 14px;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-scan-action {
      width: 20px;
      height: 20px;
      right: 16px;
      path {
        fill: #fff;
      }
    }
  }
  .block-nav-back {
    text-align: center;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: #fff;
    text-transform: capitalize;
    .back-button {
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    span {
      display: block;
      width: calc(100% - 26px);
    }
  }
  .external-transfer__step {
  }
  .button_oracle {
    height: 44px;
    border-radius: 14px;
    padding: 11px 16px;
    span {
      text-transform: capitalize;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
    }
  }
}
</style>
