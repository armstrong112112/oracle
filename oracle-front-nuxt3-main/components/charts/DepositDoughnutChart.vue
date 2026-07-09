<template>
  <div class="chart-wrapper">
    <button
      v-if="stepDeposit === 1"
      class="chart-back__btn"
      :class="{ active: back }"
      @click="backChart">
      <div class="icon">
        <img :src="'/svg/arrow-back.svg'" alt="" />
      </div>
      Back
    </button>
    <div class="chart-container">
      <apexchart
        ref="chartRef"
        type="donut"
        :options="chartOptions"
        :series="chartSeries"
        :height="chartHeight"
        :width="chartWidth"
        class="chart-doughnut">
      </apexchart>
      <div class="chart-content" :class="{ show: chartText }">
        <h3 v-if="data.title" class="chart-title">{{ data.title }}</h3>
        <h3 v-if="data.price" class="chart-price">{{ data.price }}</h3>
        <h3 v-if="data.percent" class="chart-percent">{{ data.percent }}</h3>
        <h3 v-if="data.date" class="chart-date">{{ data.date }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  getDoughnutConfig,
  type ChartData,
  type Text,
} from "~/composables/apex-chart-utils";

interface Props {
  stepDeposit?: number | null;
  activeDepositType?: string | null;
  activeCashedType?: string | null;
  data?: Text;
  chartData?: ChartData;
}

const props = withDefaults(defineProps<Props>(), {
  stepDeposit: null,
  activeDepositType: null,
  activeCashedType: null,
  data: () => ({}),
  chartData: () => ({ datasets: [{ data: [], backgroundColor: [] }] }),
});

const emit = defineEmits<{
  chartBack: [];
}>();

// Refs
const chartRef = ref();
const chartText = ref(false);
const back = ref(false);
const shadowColors = ref(props.chartData.datasets[0]?.backgroundColor || []);

// Computed
const chartSeries = computed(() => props.chartData.datasets[0]?.data || []);
const chartLabels = computed(() => props.chartData.labels || []);
const chartColors = computed(
  () => props.chartData.datasets[0]?.backgroundColor || []
);

const chartHeight = computed(() => {
  if (import.meta.client && window.innerWidth >= 1440) {
    return 250;
  }
  return 210;
});

const chartWidth = computed(() => {
  if (import.meta.client && window.innerWidth >= 1440) {
    return 250;
  }
  return 210;
});

const chartOptions = computed(() => {
  return getDoughnutConfig({
    chartData: props.chartData,
    textData: props.data,
    onAnimationComplete: () => {
      chartText.value = true;
    },
  });
});

// Methods
const backChart = () => {
  emit("chartBack");
  chartText.value = false;
  back.value = false;
};

// Lifecycle
onMounted(() => {
  // Initialize shadow colors
  shadowColors.value = props.chartData.datasets[0]?.backgroundColor || [];
});
</script>

<style lang="scss">
@use "~/assets/styles/components/doughnut-chart.scss" as *;
</style>
