<template>
  <div class="landing_slides">
    <div ref="swiper" class="swiper-container flex flex-col gap-48">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in slides"
          :key="index"
          class="swiper-slide landing_slide">
          <div class="landing_slide_content">
            <div class="flex flex-col justify-between gap-8 text_slide_content">
              <div class="landing_slide_title">{{ item.title }}</div>
              <div class="landing_slide_description">
                {{ item.description }}
              </div>
            </div>
            <img :src="item.image" alt="image" class="slide_image" />
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center gap-12">
        <div class="left_bullet cursor-pointer">
          <img src="/images/slides/left.svg" alt="" />
        </div>
        <div class="swiper-pagination landing_swiper_pagination"></div>
        <div class="right_bullet cursor-pointer">
          <img src="/images/slides/right.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from "swiper";

import "swiper/css";
import { Pagination } from "swiper/modules";
import { LandingSlides } from "~/entities/landing/data/slides";
Swiper.use([Pagination]);
const slides = LandingSlides;
const swiper = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!swiper.value) return;
  // eslint-disable-next-line no-new
  new Swiper(swiper.value, {
    slidesPerView: 1.2,
    spaceBetween: 24,
    loop: true,
    autoplay: false,
    navigation: {
      nextEl: ".right_bullet",
      prevEl: ".left_bullet",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
</script>

<style lang="scss">
.landing_slides {
  padding: 48px 16px;
}

.landing_slide {
  background-color: #0e0e11;
  border-radius: 24px;
  height: 505px;
  overflow: hidden;
}

.landing_slide_content {
  display: flex;
  flex-direction: column;
  padding: 24px 0 0 16px;
  overflow: hidden;
  justify-content: space-between;
  height: 100%;
}

.landing_slide_title {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
}

.landing_slide_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
}

.slide_image {
  margin-top: 24px;
  margin-left: auto;
  width: 100%;
}
@media (min-width: 768px) {
  .slide_image {
    width: 750px;
  }
}

.landing_swiper_pagination {
  background: #14131b;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  padding: 0 20px;
  height: 36px;
  overflow: visible;
  position: relative;
}

.landing_swiper_pagination .swiper-pagination-bullet {
  width: 20px;
  height: 5px;
  border-radius: 30px;
  background: #2c2a3d;
}

.landing_swiper_pagination .swiper-pagination-bullet-active {
  background-color: #f64e2a;
}

@media (min-width: 768px) {
  .landing_slides {
    padding: 48px 38px;
  }

  .landing_slide_content {
    padding: 30px 0 0 38px;
  }
  .text_slide_content {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    gap: 50px;
    padding-right: 38px;
  }
  .landing_slide {
    height: auto;
  }
}

@media (min-width: 1200px) {
  .landing_slides {
    padding: 48px 84px;
  }

  .landing_slide_content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 30px 0 0 40px;
  }

  .slide_image {
    margin-top: 0;
  }

  .landing_slide_description {
    max-width: 350px;
  }
  .landing_slide {
    height: 100%;
  }
  .text_slide_content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 50px;
    padding-bottom: 30px;
  }
}
</style>
