<template>
  <div ref="secondFinance" class="finance second_finance">
    <div ref="secondFinanceLeft" class="finance_left second_finance_left">
      <div class="flex flex-col gap-24">
        <div class="flex flex-col gap-12">
          <div
            ref="secondFinanceTitle"
            class="finance_title second_finance_title">
            <span>ORACLEGRAM</span> <span class="text-violet">50%</span>
          </div>
          <div ref="secondFinanceText" class="finance_text second_finance_text">
            We know you're sick of watching yet another Telegram wipe overnight
            and of the "private" platform that spill your data the moment
            someone knocks on the door. Zero bulletproofing, zero real
            privacy—just a ticking clock on when the next ban lands.
            <br />
            <br />
            But swapping to dusty forums? That's a step backwards. So we did the
            smarter thing. We are building our own Telegram—without the baggage.
            Same muscle-memory layout you already love. Chats, channels,
            groups—only this time wrapped in an ironclad, no-logs pledge. No
            corporate back-channels. No hidden trackers. No compliance switch
            that flips your life upside down.
            <br />
            <br />
            Plus, built-in crypto transfers, ratings, reviews, and escrow, all
            under one roof. Talk, trade, and chill without the drama.
          </div>
        </div>
        <div
          ref="secondFinanceStatuses"
          class="finance_statuses second_finance_statuses">
          <div class="finance_status">
            <img src="/images/landing/clock.svg" alt="" />
            <div class="finance_status_text">Technical Architecture</div>
          </div>
          <img ref="secondBorder1" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/checked.svg" alt="" />
            <div class="finance_status_text">Complete UI/UX Design</div>
          </div>
          <img ref="secondBorder2" src="/images/landing/border.svg" alt="" />
          <div class="finance_status">
            <img src="/images/landing/checked.svg" alt="" />
            <div class="finance_status_text">Product Concept & Validation</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-12">
        <div ref="secondNextSteps" class="next_steps second_next_steps">
          Next Steps
        </div>
        <div ref="secondNextStepsChildren" class="flex flex-col gap-8">
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
        </div>
      </div>
    </div>
    <div ref="secondFinanceRight" class="finance_right second_finance_right">
      <img
        ref="secondFinanceRightImg"
        src="/images/landing/oraclegram.png"
        alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFinanceAnimation } from "~/composables/useFinanceAnimation";

const secondFinance = ref<HTMLElement | null>(null);
const secondFinanceLeft = ref<HTMLElement | null>(null);
const secondFinanceRight = ref<HTMLElement | null>(null);
const secondFinanceTitle = ref<HTMLElement | null>(null);
const secondFinanceText = ref<HTMLElement | null>(null);
const secondFinanceStatuses = ref<HTMLElement | null>(null);
const secondNextSteps = ref<HTMLElement | null>(null);
const secondNextStepsChildren = ref<HTMLElement | null>(null);
const secondFinanceRightImg = ref<HTMLElement | null>(null);

const secondBorder1 = ref<HTMLElement | null>(null);
const secondBorder2 = ref<HTMLElement | null>(null);

let animationComposable: { setupAnimations: (root: HTMLElement) => void; cleanup?: () => void } | null = null;

onMounted(() => {
  if (import.meta.client) {
    animationComposable = useFinanceAnimation({
      finance: secondFinance.value,
      financeLeft: secondFinanceLeft.value,
      financeRight: secondFinanceRight.value,
      financeTitle: secondFinanceTitle.value,
      financeText: secondFinanceText.value,
      financeStatuses: secondFinanceStatuses.value,
      nextSteps: secondNextSteps.value,
      nextStepsChildren: secondNextStepsChildren.value,
      financeRightImg: secondFinanceRightImg.value,
      borderElements: [secondBorder1.value, secondBorder2.value].filter(Boolean) as HTMLElement[],
    });

    const root = secondFinance.value?.closest('.finance') as HTMLElement | null;
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
