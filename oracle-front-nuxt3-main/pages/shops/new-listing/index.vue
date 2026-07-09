<template>
  <div class="new-listing__container">
    <div class="new-listening-child">
      <HeaderForChild title="New Listing" />
    </div>
    <div class="new-listing__status">
      <div class="new-listing__prev">
        <button>
          <img src="/svg/arrow-back.svg" alt="arrow-back" />
        </button>
      </div>
      <div class="center-content">
        <h2>{{ title }}</h2>
        <div class="status-bar">
          <div class="status-bar-item" :class="{ active: step === 1 }" />
          <div class="status-bar-item" :class="{ active: step === 2 }" />
          <div class="status-bar-item" :class="{ active: step === 3 }" />
          <div class="status-bar-item" :class="{ active: step === 4 }" />
        </div>
      </div>
      <div class="new-listing__next">
        <nuxt-link :to="nextStepRoute">
          <button :disabled="!CanContinue">Next</button>
        </nuxt-link>
      </div>
    </div>

    <StepOne v-show="step === 1" />
    <StepTwo v-show="step === 2" />
    <StepThree v-show="step === 3" />
    <StepFour v-show="step === 4" />
  </div>
</template>

<script setup lang="ts">
import StepFour from "~/features/shop/listing/ui/step-four.vue";
import StepOne from "~/features/shop/listing/ui/step-one.vue";
import StepThree from "~/features/shop/listing/ui/step-three.vue";
import StepTwo from "~/features/shop/listing/ui/step-two.vue";
import HeaderForChild from "~/features/shop/ui/header/index.vue";
import { readLocalStorageJson } from "~/utils/clientStorage";
definePageMeta({
  layout: "sidebar",
});

const route = useRoute();

const CanContinue = ref<boolean>(false);

const step = computed((): number => {
  return Number(route.query.step || "1");
});

const title = computed((): string => {
  const titleArray: string[] = [
    "What Are You Selling?",
    "Content & Requirements",
    "Contacts, Price, Stock",
    "Review",
  ];
  return titleArray[step.value - 1] || "What Are You Selling?";
});

const loadFromStorage = () => {
  const raw = readLocalStorageJson<unknown>("StepsObject");
  CanContinue.value = Boolean(raw);
};

const nextStepRoute = computed(() => {
  const stepParam = route.query.step;
  const currentStep =
    parseInt(
      Array.isArray(stepParam) ? stepParam[0] || "1" : stepParam || "1"
    ) || 1;
  if (stepParam === "4")
    return {
      path: "/shops",
    };
  return {
    path: "/shops/new-listing",
    query: {
      ...route.query,
      step: currentStep + 1,
    },
  };
});

onMounted(() => {
  loadFromStorage();
});
</script>

<style lang="scss">
.new-listing__container {
  width: 500px;
  margin: 24px auto;
  .new-listening-child {
    display: none;
  }

  .new-listing__status {
    .new-listing__prev,
    .new-listing__next {
      display: none;
    }

    .center-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0 12px;

      h2 {
        color: white;
        font-family: Roboto, sans-serif;
        font-weight: 700;
        font-size: 18px;
      }

      .status-bar {
        display: flex;
        align-items: center;
        gap: 6px;

        .status-bar-item {
          width: 15px;
          height: 5px;
          border-radius: 10px;
          background-color: #2c2a3d;
          &.active {
            width: 32px;
            background-color: #f64e2a;
          }
        }
      }
    }

    .new-listing__next {
      button {
        padding: 7px 10px;
        border-radius: 12px;
        background-color: #f64e2a;
        color: white;
        font-family: Roboto, sans-serif;
        font-weight: 500;
        font-size: 12px;
        &:disabled {
          opacity: 40%;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .new-listing__container {
    width: 90%;
    margin: 0 auto;

    .new-listening-child {
      display: block;
    }

    .new-listing__status {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .new-listing__prev,
      .new-listing__next {
        display: block;
      }
      .center-content {
        flex-direction: column;
        align-items: center;
        margin-left: 55px;
        h2 {
          font-size: 14px;
        }
        .status-bar {
          margin-top: 8px;
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .new-listing__container {
    width: 100%;
    .new-listing__status {
      width: 90%;
      margin: 14px auto 0 auto;
    }
  }
}
</style>
