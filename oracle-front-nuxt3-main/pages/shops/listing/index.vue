<template>
  <div class="listing">
    <Header />
    <div class="new-listing__container">
      <HeaderMobile page-title="My Listing" with-page-title />

      <div class="new-listing__status" v-if="step !== 0">
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

      <NotListing v-show="step === 0" />
      <StepOne v-show="step === 1" />
      <StepTwo v-show="step === 2" />
      <StepThree v-show="step === 3" />
      <StepFour v-show="step === 4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NotListing from "~/features/shop/listing/ui/no-listing.vue";
import StepFour from "~/features/shop/listing/ui/step-four.vue";
import StepOne from "~/features/shop/listing/ui/step-one.vue";
import StepThree from "~/features/shop/listing/ui/step-three.vue";
import StepTwo from "~/features/shop/listing/ui/step-two.vue";
import Header from "~~/widgets/shop/header/index.vue";
import HeaderMobile from "~~/widgets/shop/header/mobile.vue";

definePageMeta({
  layout: "sidebar",
});

interface RouteConfig {
  path: string;
  query?: Record<string, number>;
}

const route = useRoute();

const CanContinue = ref<boolean>(false);

const mode = computed((): "new" | "edit" | null => {
  if (route.query["new-listing"]) return "new";
  if (route.query["edit-listing"]) return "edit";
  return null;
});

const step = computed((): number => {
  if (mode.value === "new") {
    return Number(route.query["new-listing"]) || 0;
  }
  if (mode.value === "edit") {
    return Number(route.query["edit-listing"]) || 0;
  }
  return Number(route.query.step) || 0;
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

const nextStepRoute = computed((): RouteConfig => {
  const currentStep = step.value || 1;
  const queryKey =
    mode.value === "edit"
      ? "edit-listing"
      : mode.value === "new"
      ? "new-listing"
      : "step";

  if (currentStep === 4) {
    return { path: "/shops" };
  }

  return {
    path: "/shops/listing",
    query: {
      [queryKey]: currentStep + 1,
    },
  };
});
</script>

<style lang="scss">
.new-listing__container {
  width: 500px;
  margin: 24px auto;

  .shop-header-mobile {
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
  .listing {
    .shop-header-container {
      display: none;
    }
  }

  .new-listing__container {
    width: 90%;
    margin: 0 auto;

    .shop-header-mobile {
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
