<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="10"
    :loop="false"
    :autoplay="false"
    :navigation="false"
    :pagination="{ el: '.swiper-pagination', clickable: true }"
    class="swiper-container">
    <swiper-slide v-for="item in slides" :key="item.id" class="swiper-slide">
      <div class="slide-content">
        <div class="slide_card">
          <img class="slide_card_image" :src="item.image" :alt="item.type" />
          <div class="slide_card_col">
            <div class="slide_card_col_title">
              {{ item.title }}
              <span>({{ item.value }})</span>
            </div>
            <div class="slide_card_col_badge">{{ item.account }}</div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination fee_pagination"></div>
  </swiper>
</template>

<script setup lang="ts">
import { slide } from "@/entities/verification/data/slide";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

// State
const slides = slide;

// Modules
const modules = [Navigation, Pagination];
</script>

<style>
.swiper-container {
  width: 100%;
  cursor: grab;
}
.fee_pagination {
  top: 72px;
}
.fee_pagination .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: #211e2e;
}
.fee_pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
  width: 10px;
  height: 10px;
  background: #f64e2a;
}
.slide_card {
  background: #211f2c;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
}
.slide_card_col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.slide_card_image {
  width: 75px;
  height: 68px;
  object-fit: contain;
}
.slide_card_col_title {
  font-family: Hanson, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-transform: uppercase;
  color: white;
}
.slide_card_col_title span {
  font-family: Evolventa, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-transform: uppercase;
  color: white;
  opacity: 0.6;
}
.slide_card_col_badge {
  background: #191823;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  color: white;
  font-family: Reza Zulmi Alfaizi Sans;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: 0;
}
</style>
