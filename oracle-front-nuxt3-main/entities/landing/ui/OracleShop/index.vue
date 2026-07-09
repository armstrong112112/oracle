<template>
  <div ref="thirdFinance" class="finance finance_reverse third_finance">
    <div ref="thirdFinanceRight" class="finance_right third_finance_right">
      <img
        ref="thirdFinanceRightImg"
        src="/images/landing/oracleshop.png"
        alt="" />
    </div>
    <div ref="thirdFinanceLeft" class="finance_left third_finance_left">
      <div class="flex flex-col gap-24">
        <div class="flex flex-col gap-12">
          <div
            ref="thirdFinanceTitle"
            class="finance_title third_finance_title">
            <span>ORACLE SHOP</span> <span class="text-violet">50%</span>
          </div>
          <div ref="thirdFinanceText" class="finance_text third_finance_text">
            Buy and sell accounts, digital goods, and services in one secure
            hub. List offers in seconds, browse sellers, and lock in deals on
            everything—from game accounts to software keys and anything you'd
            see on a top marketplace. Need talent? Swap CVs and hire right
            there. All wrapped in Oracle's rock-solid protection and crypto
            flexibility.
          </div>
        </div>
        <div
          ref="thirdFinanceStatuses"
          class="finance_statuses third_finance_statuses">
          <div class="finance_status">
            <img src="/images/landing/clock.svg" alt="" />
            <div class="finance_status_text">Technical Architecture</div>
          </div>
          <img ref="thirdBorder1" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/clock.svg" alt="" />
            <div class="finance_status_text">Complete UI/UX Design</div>
          </div>
          <img ref="thirdBorder2" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/checked.svg" alt="" />
            <div class="finance_status_text">Product Concept & Validation</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-12">
        <div ref="thirdNextSteps" class="next_steps third_next_steps">
          Next Steps
        </div>
        <div ref="thirdNextStepsChildren" class="flex flex-col gap-8">
          <div class="next_steps_text_wrap">
            <div class="next_steps_text">Public Release</div>
          </div>
          <div class="next_steps_text_wrap">
            <div class="next_steps_text">Pre-Release — Beta/Early Access</div>
          </div>
          <div class="next_steps_text_wrap">
            <div class="next_steps_text">Testing</div>
          </div>
          <div class="next_steps_text_wrap">
            <div class="next_steps_text">Development</div>
          </div>
          <div class="next_steps_text_wrap">
            <div class="next_steps_text">Technical Architecture</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFinanceAnimation } from "~/composables/useFinanceAnimation";

const thirdFinance = ref<HTMLElement | null>(null);
const thirdFinanceLeft = ref<HTMLElement | null>(null);
const thirdFinanceRight = ref<HTMLElement | null>(null);
const thirdFinanceTitle = ref<HTMLElement | null>(null);
const thirdFinanceText = ref<HTMLElement | null>(null);
const thirdFinanceStatuses = ref<HTMLElement | null>(null);
const thirdNextSteps = ref<HTMLElement | null>(null);
const thirdNextStepsChildren = ref<HTMLElement | null>(null);
const thirdFinanceRightImg = ref<HTMLElement | null>(null);

const thirdBorder1 = ref<HTMLElement | null>(null);
const thirdBorder2 = ref<HTMLElement | null>(null);

let animationComposable: {
  setupAnimations: (root: HTMLElement) => void;
  cleanup?: () => void;
} | null = null;

onMounted(() => {
  if (import.meta.client) {
    animationComposable = useFinanceAnimation({
      finance: thirdFinance.value,
      financeLeft: thirdFinanceLeft.value,
      financeRight: thirdFinanceRight.value,
      financeTitle: thirdFinanceTitle.value,
      financeText: thirdFinanceText.value,
      financeStatuses: thirdFinanceStatuses.value,
      nextSteps: thirdNextSteps.value,
      nextStepsChildren: thirdNextStepsChildren.value,
      financeRightImg: thirdFinanceRightImg.value,
      borderElements: [thirdBorder1.value, thirdBorder2.value].filter(
        Boolean
      ) as HTMLElement[],
    });

    const root = thirdFinance.value?.closest(".finance") as HTMLElement | null;
    if (root && animationComposable) {
      animationComposable.setupAnimations(root);
    }
  }
});

onBeforeUnmount(() => {
  if (animationComposable && animationComposable.cleanup) {
    animationComposable.cleanup();
  }
});
</script>

<style lang="scss" scoped>
.finance_statuses img[src*="border.svg"] {
  transition: height 0.6s;
  display: block;
  overflow: hidden;
  width: 0;
  height: 0;
}
.next_steps_text_wrap {
  height: 22px;
  overflow: hidden;
}
</style>
