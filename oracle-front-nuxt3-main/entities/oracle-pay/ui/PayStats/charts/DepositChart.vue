<template>
  <div class="stats_charts">
    <div class="stats_charts_title">{{ $t("pay.scheduleDeposits") }}</div>
    <client-only>
      <apexchart
        type="line"
        height="250"
        :options="chartOptions"
        :series="series" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted } from "vue";

const getDates = () => {
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(
      `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`
    );
  }
  return dates;
};

const dates = computed(() => getDates());

const series = computed(() => [
  {
    name: "BTC",
    data: [75000, 85000, 95000, 90000, 95000, 88000, 100000],
    color: "#FFFFFF",
  },
]);

const chartOptions = computed(() => ({
  chart: {
    type: "line",
    height: 250,
    fontFamily: "Inter, sans-serif",
    background: "transparent",
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
    dropShadow: {
      enabled: true,
    },
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    custom: ({ series: tooltipSeries, dataPointIndex }: any) => {
      const date = dates.value[dataPointIndex];
      const btcValue = tooltipSeries[0][dataPointIndex];

      return `
        <div class="custom-tooltip">
          <div class="tooltip-date">${date}</div>
          <div class="tooltip-value">1 BTC (~${btcValue.toLocaleString()})</div>
          <div class="tooltip-value">0 LTC</div>
        </div>
      `;
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "monotoneCubic",
    width: 2,
  },
  grid: {
    show: false,
  },
  xaxis: {
    categories: dates.value,
    labels: {
      style: {
        colors: "#FFFFFF",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  markers: {
    size: 6,
    colors: ["#FF6B4A"],
    strokeColors: "#000000",
    strokeWidth: 2,
    hover: {
      size: 8,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.8,
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
}));

onMounted(() => {
  if (import.meta.client) {
    nextTick(() => {
      window.dispatchEvent(new Event("resize"));
    });
  }
});
</script>

<style lang="scss"></style>
