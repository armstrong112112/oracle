<template>
  <div class="flex flex-col gap-12 py-16">
    <div class="oracle_profile_title">
      {{ $t("whitelist.profile.oracle.achievements.title") }}
    </div>
    <div ref="swiper" class="swiper-container overflow-hidden">
      <div class="swiper-wrapper flex">
        <div
          v-for="(item, index) in 8"
          :key="index"
          class="swiper-slide achievement_slide">
          <img src="/icons/oracle-profile/achievement.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper } from "swiper";
import { onMounted, onUnmounted, ref } from "vue";

const swiper = ref<HTMLElement | null>(null);
let swiperInstance: Swiper | null = null;

onMounted(() => {
  if (swiper.value) {
    swiperInstance = new Swiper(swiper.value, {
      slidesPerView: "auto",
      spaceBetween: 12,
      loop: false,
      centeredSlides: false,
      navigation: false,
      pagination: false,
      autoplay: false,
    });
  }
});

onUnmounted(() => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
});
</script>

<style scoped>
.oracle_profile_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: white;
}

.achievement_slide {
  max-width: 76px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.achievement_slide img {
  max-width: 76px !important;
  height: auto;
}
</style>
