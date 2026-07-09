<template>
  <ClientOnly>
    <swiper
      ref="swiperInstance"
      :modules="modules"
      :slides-per-view="1"
      :space-between="20"
      :loop="false"
      :pagination="{ clickable: true }"
      :autoplay="false"
      :navigation="false"
      :allow-touch-move="true"
      class="historySwiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide v-for="item in 5" :key="item" class="historySwiper__slide">
        <component
          :is="isExpenses ? ExpensisDoughnutChart : DepositDoughnutChart"
          :data="isExpenses ? expensesText : depositText"
          :active-expensis-type="
            isExpenses ? activeExpensesType : activeDepositType
          "
          :step="step"
          :chart-data="chartData" />
      </swiper-slide>
      <template #container-end>
        <div class="swiper-pagination" style="display: none"></div>
      </template>
    </swiper>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import DepositDoughnutChart from "~/components/charts/DepositDoughnutChart.vue";
import ExpensisDoughnutChart from "~/components/charts/ExpensisDoughnutChart.vue";

const Swiper = SwiperComponent;

const modules = [Pagination];

interface Props {
  chartData: any;
  depositText: any;
  expensesText: any;
  activeExpensesType?: string;
  activeDepositType?: string;
  isExpenses?: boolean;
  step?: number;
}

const props = withDefaults(defineProps<Props>(), {
  activeExpensesType: "",
  activeDepositType: "",
  isExpenses: false,
  step: 0,
});

const emit = defineEmits<{
  swiper: [swiper: SwiperType];
  slideChange: [swiper: SwiperType];
}>();

const swiperInstance = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
  emit("swiper", swiper);
};

const onSlideChange = (swiper: SwiperType) => {
  emit("slideChange", swiper);
};

defineExpose({
  swiperInstance,
});
</script>

<style lang="scss">
@use "@/assets/styles/pages/_history-all.scss" as *;

.historySwiper__slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
