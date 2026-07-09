<template>
  <div class="hero_parent">
    <div class="hero relative">
      <LandingBackground />

      <Header ref="header" class="relative z-10" />

      <div class="hero_text_box">
        <div ref="heroText" class="hero_text">
          <div class="line">
            <span>ORACLE</span>
          </div>
        </div>
      </div>
      <img ref="star1" src="/images/landing/star.svg" class="absolute hero_first_star" alt="" />
      <div class="hero_bg_container">
        <EyeModel ref="heroBg" class="hero_bg" />
      </div>
      <img ref="star2" src="/images/landing/star.svg" class="absolute hero_second_star" alt="" />
      <img ref="star3" src="/images/landing/star.svg" class="absolute hero_third_star" alt="" />
    </div>
    <div ref="heroBottom" class="hero_bottom">
      <div class="hero_bottom_left">
        <div ref="heroBottomLeftText" class="hero_bottom_left_text">
          <div class="text-wrap">
            <span class="text-line">Simple. Fast. Protected.</span>
          </div>
          <div class="text-wrap">
            <span class="text-line primary-color">WORLDWIDE, INSTANTLY.</span>
          </div>
          <div class="text-wrap">
            <span class="text-line">FOR EVERYTHING</span>
          </div>
        </div>
      </div>
      <div class="hero_bottom_right">
        <div class="hero_bottom_right_text">
          One hub, zero hassle—crypto transfers, verified vendors, a full
          marketplace, P2P swaps, mixing, and chats all under one roof.
        </div>
        <div class="hero_bottom_right_buttons">
          <div class="hero_button hero_button_primary" @click="showGenerateModal">
            Join Whitelist
          </div>
          <div class="hero_button hero_button_secondary">Track Progress</div>
        </div>
      </div>
    </div>
    <LandingFormDialog v-if="isModalVisible" :is-visible="isModalVisible" @close="closeModal"
      @confirm="processConfirmation" />
  </div>
</template>

<script setup lang="ts">
import LandingFormDialog from "@/entities/landing/ui/LandingFormDialog/index.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EyeModel from "~/components/3d/EyeModel.vue";
import LandingBackground from "~/components/LandingBackground.vue";
import Header from "~/entities/landing/ui/Header/index.vue";

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const isModalVisible = ref(false);

function showGenerateModal(): void {
  isModalVisible.value = true;
}

function closeModal(): void {
  isModalVisible.value = false;
}

function processConfirmation(): void {
  closeModal();
}

const heroText = ref<HTMLElement | null>(null);
const heroBg = ref<InstanceType<typeof EyeModel> | null>(null);
const star1 = ref<HTMLElement | null>(null);
const star2 = ref<HTMLElement | null>(null);
const star3 = ref<HTMLElement | null>(null);
const heroBottom = ref<HTMLElement | null>(null);
const heroBottomLeftText = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!import.meta.client) return;

  // Wait for next tick to ensure all components are mounted
  await nextTick();

  const lines = heroText.value?.querySelectorAll(".line") ?? [];
  const lineSpans = heroText.value?.querySelectorAll(".line span") ?? [];

  // Set overflow hidden for animation
  lines.forEach((line) => {
    (line as HTMLElement).style.overflow = "hidden";
  });

  // Set visibility and initial state immediately before animation
  if (heroText.value) {
    gsap.set(heroText.value, { visibility: "visible" });
  }

  if (lineSpans.length) {
    gsap.set(lineSpans, { y: 300, opacity: 0, skewY: 7 });
  }

  // Get the DOM element from EyeModel component
  const heroBgEl = heroBg.value?.$el as HTMLElement | undefined;
  if (heroBgEl) {
    gsap.set(heroBgEl, { visibility: "visible", y: 200, opacity: 0 });
  }

  const tl = gsap.timeline({
    defaults: { ease: "power4.out" },
    onComplete: () => {
      lines.forEach((line) => {
        (line as HTMLElement).style.overflow = "visible";
      });
    },
  });

  tl.to(".line span", {
    duration: 1.1,
    y: 0,
    opacity: 1,
    skewY: 0,
    ease: "power4.out",
    delay: 0.5,
    stagger: { amount: 0.3 },
  });

  if (heroBgEl) {
    tl.to(
      heroBgEl,
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" },
      "-=0.5"
    );
  }

  const stars = [star1.value, star2.value, star3.value].filter(
    Boolean
  ) as HTMLElement[];
  if (stars.length) {
    tl.from(stars, {
      scale: 0,
      duration: 3,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
      rotate: 180,
      onComplete: () => {
        gsap.to(stars, {
          scale: 1.5,
          duration: 3,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(stars, {
              scale: 1,
              duration: 3,
              ease: "power2.out",
              rotate: 0,
            });
          },
        });
      },
    });
  }

  const leftLines =
    heroBottomLeftText.value?.querySelectorAll(".text-line") ?? [];
  gsap.set(leftLines, { yPercent: 100, opacity: 0 });
  if (heroBottom.value) {
    gsap.to(leftLines, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroBottom.value,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });

    const right = heroBottom.value.querySelector(".hero_bottom_right");
    if (right) {
      gsap.from(right, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: heroBottom.value,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });
    }
  }
});

onBeforeUnmount(() => {
  if (!import.meta.client) return;
  ScrollTrigger.getAll().forEach((st) => st.kill());
  const lines = heroText.value?.querySelectorAll(".line");
  if (lines) {
    lines.forEach((line) => {
      (line as HTMLElement).style.overflow = "";
      gsap.set(line, { clearProps: "all" });
    });
  }
});
</script>

<style lang="scss" scoped>
.text-wrap {
  height: 31px;
  overflow: hidden;
}

.z-10 {
  z-index: 10;
}

.hero_text_box {
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 4;
}

.hero_bg_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}

.hero_text {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 64px;
  line-height: 125%;
  letter-spacing: 3%;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff26;
}

.line {
  overflow: hidden;
}

.line span {
  display: block;
  font-family: Hector, Roboto;
  opacity: 0.5 !important;
}

.hero_second_star {
  bottom: 72px;
  left: 28%;
  width: 25px;
  z-index: 5;
}

.hero_third_star {
  bottom: 72px;
  right: 12%;
  width: 25px;
  z-index: 5;
}

.hero_bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  max-width: 790px;
  max-height: 600px;
  z-index: 5;
}

.hero_bottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 48px 16px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  z-index: 5;
}

.hero_bottom_left_text {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.hero_bottom_left_text .text-line {
  display: block;
  overflow: hidden;
}

.hero_bottom_right {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 418px;
}

.hero_bottom_right_text {
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
}

.hero_bottom_right_buttons {
  display: flex;
  gap: 12px;
}

.hero_button {
  padding: 11px 16px;
  border-radius: 14px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: white;
  cursor: pointer;
}

.hero_button_primary {
  background: #f64e2a;
}

.hero_button_secondary {
  background: #1b1a24;
}

.hero_first_star {
  top: 12%;
  left: 12%;
  z-index: 5;
}

@media (min-width: 768px) {
  .text-wrap {
    height: 60px;
    overflow: hidden;
  }

  .hero_text_box {
    height: 175px;
  }

  .hero_text {
    font-size: 140px;
  }

  .hero_bottom_left_text {
    font-size: 48px;
    line-height: 125%;
    text-transform: uppercase;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hero_bottom_right_text {
    text-align: center;
  }

  .hero_bottom_right {
    gap: 48px;
    justify-content: center;
    align-items: center;
  }

  .hero_bottom {
    justify-content: center;
    align-items: center;
  }
}

@media (min-width: 1200px) {
  .text-wrap {
    height: 60px;
    overflow: hidden;
  }

  .hero_text_box {
    height: 400px;
  }

  .hero_first_star {
    top: 220px;
    left: 22%;
  }

  .hero_text {
    font-family: Hector, Roboto;
    font-size: 200px;
  }

  .hero_bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 84px;
  }

  .hero_bottom_left_text {
    font-size: 48px;
    line-height: 125%;
    text-transform: uppercase;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .hero_bottom_right_text {
    text-align: start;
  }

  .hero_bottom_right {
    gap: 48px;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
