<template>
  <swiper
    :modules="modules"
    :slides-per-view="2.3"
    :space-between="8"
    :loop="false"
    :autoplay="false"
    :navigation="false"
    :pagination="false"
    class="swiper-container">
    <swiper-slide v-for="item in 5" :key="item" class="swiper-slide">
      <div class="slide-content">
        <div class="listing_card">
          <img src="/icons/profile/btc.svg" alt="star" class="star_icon" />
          <div class="flex flex-col">
            <div class="listing_card_col_title">BTC/USDT</div>
            <div class="listing_card_col_price">1.000.000$</div>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

// Modules
const modules = [Navigation, Pagination, Autoplay];
</script>

<style>
.swiper-container {
  width: 100%;
  cursor: grab;
}
.listing_card {
  gap: 10px;
  padding: 6px 16px 6px 6px;
  border-radius: 12px;
  border: 1px solid #2b2741;
  background: #13121b;
  display: flex;
  align-items: center;
}
.listing_card_col_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.listing_card_col_price {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: #7a74ba;
}
.listing_swiper_card {
  margin-left: 16px;
}
</style>
