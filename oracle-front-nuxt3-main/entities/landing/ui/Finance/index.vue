<template>
  <div ref="firstFinance" class="finance first_finance">
    <div ref="firstFinanceLeft" class="finance_left first_finance_left">
      <div class="flex flex-col gap-24">
        <div class="flex flex-col gap-12">
          <div
            ref="firstFinanceTitle"
            class="finance_title first_finance_title">
            <span>ORACLE FINANCE</span> <span class="text-violet">65%</span>
          </div>
          <div ref="firstFinanceText" class="finance_text first_finance_text">
            Buy or sell coins with fiat (no KYC, no logs), lock in secure deals
            through Oracle Escrow, swap tokens on the fly, and fire funds
            off-chain instantly with zero fees. Issue prepaid crypto cards, mix
            your coins for total untraceability, and tap our verified-vendor
            marketplace and whitelist. Flexible billing, instant settlements,
            and full privacy control—all in one place.
          </div>
        </div>
        <div
          ref="firstFinanceStatuses"
          class="finance_statuses first_finance_statuses">
          <div class="finance_status">
            <img src="/images/landing/clock.svg" alt="" />
            <div class="finance_status_text">Testing</div>
          </div>
          <img ref="firstBorder1" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/clock.svg" alt="" />
            <div class="finance_status_text">Development</div>
          </div>
          <img ref="firstBorder2" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/checked.svg" alt="" />
            <div class="finance_status_text">Technical Architecture</div>
          </div>
          <img ref="firstBorder3" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/checked.svg" alt="" />
            <div class="finance_status_text">Complete UI/UX Design</div>
          </div>
          <img ref="firstBorder4" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/checked.svg" alt="" />
            <div class="finance_status_text">Product Concept & Validation</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-12">
        <div ref="firstNextSteps" class="next_steps first_next_steps">
          Next Steps
        </div>
        <div ref="firstNextStepsChildren" class="flex flex-col gap-8">
          <div class="next_steps_text_wrap">
            <div class="next_steps_text">Public Release</div>
          </div>
          <div class="next_steps_text_wrap">
            <div class="next_steps_text">Pre-Release — Beta/Early Access</div>
          </div>
        </div>
      </div>
    </div>
    <div ref="firstFinanceRight" class="finance_right first_finance_right">
      <img
        ref="firstFinanceRightImg"
        src="/images/landing/finance.png"
        alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFinanceAnimation } from "~/composables/useFinanceAnimation";

const firstFinance = ref<HTMLElement | null>(null);
const firstFinanceLeft = ref<HTMLElement | null>(null);
const firstFinanceRight = ref<HTMLElement | null>(null);
const firstFinanceTitle = ref<HTMLElement | null>(null);
const firstFinanceText = ref<HTMLElement | null>(null);
const firstFinanceStatuses = ref<HTMLElement | null>(null);
const firstNextSteps = ref<HTMLElement | null>(null);
const firstNextStepsChildren = ref<HTMLElement | null>(null);
const firstFinanceRightImg = ref<HTMLElement | null>(null);

const firstBorder1 = ref<HTMLElement | null>(null);
const firstBorder2 = ref<HTMLElement | null>(null);
const firstBorder3 = ref<HTMLElement | null>(null);
const firstBorder4 = ref<HTMLElement | null>(null);

let animationComposable: { setupAnimations: (root: HTMLElement) => void; cleanup?: () => void } | null = null;

onMounted(() => {
  if (import.meta.client) {
    animationComposable = useFinanceAnimation({
      finance: firstFinance.value,
      financeLeft: firstFinanceLeft.value,
      financeRight: firstFinanceRight.value,
      financeTitle: firstFinanceTitle.value,
      financeText: firstFinanceText.value,
      financeStatuses: firstFinanceStatuses.value,
      nextSteps: firstNextSteps.value,
      nextStepsChildren: firstNextStepsChildren.value,
      financeRightImg: firstFinanceRightImg.value,
      borderElements: [firstBorder1.value, firstBorder2.value, firstBorder3.value, firstBorder4.value].filter(Boolean) as HTMLElement[],
    });

    const root = firstFinance.value?.closest('.finance') as HTMLElement | null;
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
}
.next_steps_text_wrap {
  height: 22px;
  overflow: hidden;
}
</style>
