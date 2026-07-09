<template>
  <div class="internal-transfer">
    <div :class="isMobile ? 'main-container' : 'main-container-desktop'">
      <block-nav-back
        to=""
        :text="$t('transfers.internalTransfer')"
        @prev="goToStep(step - 1)"
        v-if="isMobile" />

      <!-- Мобильная версия - оставляем как есть -->
      <div v-if="isMobile" class="internal-transfer__mobile">
        <div v-if="step === 1" class="internal-transfer__step">
          <InternalTransferStepOne @nextStep="goToStep(step + 1)" />
        </div>
        <div v-if="step === 2" class="internal-transfer__step">
          <InternalTransferStepTwo @nextStep="goToStep(step + 1)" />
        </div>
        <div v-if="step === 3" class="internal-transfer__step">
          <InternalTransferStepThree />
        </div>
      </div>

      <!-- Десктопная версия - первый шаг постоянный, остальные модальные -->
      <div v-else class="internal-transfer__desktop">
        <div class="internal-transfer__step">
          <InternalTransferStepOne @nextStep="openStepModal(2)" />
          <!-- Модальные окна для десктопа -->
          <bills-modal
            v-if="!isMobile"
            :is-open="stepModal === 2"
            :title="$t('transfers.transferDetails')"
            @close="closeStepModal">
            <InternalTransferStepTwo @nextStep="openStepModal(3)" />
          </bills-modal>

          <bills-modal
            v-if="!isMobile"
            :is-open="stepModal === 3"
            :title="$t('transfers.confirmTransfer')"
            @close="closeStepModal">
            <InternalTransferStepThree />
          </bills-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BillsModal from "~/components/bills-modal.vue";
import InternalTransferStepOne from "~/components/transfer/internal-transfer/step-one.vue";
import InternalTransferStepThree from "~/components/transfer/internal-transfer/step-three.vue";
import InternalTransferStepTwo from "~/components/transfer/internal-transfer/step-two.vue";

const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

definePageMeta({
  layout: "sidebar",
});

// Reactive state
const step = ref<number>(1);
const stepModal = ref<number | null>(null);
const windowWidth = ref<number>(0);

// Computed properties
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024;
});

// Methods
const updateWidth = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    updateLayout();
  }
};

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? "" : "sidebar";
  // Layout is handled by definePageMeta
};

const updateStepFromRoute = () => {
  const stepParam = route.query.step;
  if (stepParam && [1, 2, 3].includes(Number(stepParam))) {
    step.value = Number(stepParam);
  }
};

const goToStep = (newStep: number) => {
  if (newStep >= 1 && newStep <= 3) {
    step.value = newStep;
    router.push({ query: { step: String(newStep) } });
  }
};

const openStepModal = (stepNumber: number) => {
  stepModal.value = stepNumber;
  router.push({ query: { step: String(stepNumber) } });
};

const closeStepModal = () => {
  stepModal.value = null;
  router.push({ query: { step: "1" } });
};

// Lifecycle hooks
onMounted(() => {
  updateStepFromRoute();
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    updateLayout();
    window.addEventListener("resize", updateWidth);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", updateWidth);
  }
});
</script>

<style lang="scss">
.main-content {
  @media (min-width: 1024px) {
    max-width: 500px;
  }
}
.internal-transfer {
  background: #000;
  @media (min-width: 1024px) {
    max-width: 500px;
    margin: 0 auto;
  }
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
  .internal-transfer__step {
    display: flex;
    @media (min-width: 1024px) {
      display: block;
    }
    flex-direction: column;
    min-height: calc(100vh - 86px);
    .selected-user {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      padding-left: 6px;
      .user-img {
        width: 32px;
        height: 32px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .user-name {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        text-align: center;
        color: #fff;
      }
    }
    .selected-user__info {
      width: calc(100% + 20px);
      margin-left: -10px;
      margin-bottom: 24px;
      .info-list {
        display: flex;
        gap: 5px;
        padding-left: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-right: 10px;
        &::-webkit-scrollbar {
          height: 0;
        }
        .list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #181720;
          border-radius: 12px;
          padding: 6px 12px 6px 8px;

          .profile-title {
            white-space: nowrap;
            font-family: "Roboto", sans-serif;
            font-weight: 500;
            font-size: 12px;
            line-height: 135%;
            color: #fff;
          }
        }
      }
    }
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
