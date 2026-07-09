<template>
  <div class="prepaid-card-chart">
    <client-only>
      <apexchart
        ref="chart"
        type="area"
        height="100%"
        :options="chartOptions"
        :series="series" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

interface ChartData {
  data: number[];
  labels: string[];
}

interface Props {
  period?: string;
  chartData: ChartData;
}

const props = withDefaults(defineProps<Props>(), {
  period: "7D",
});

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Template refs
const chart = ref();

// Reactive state
const series = ref([
  {
    name: "Price",
    data: props.chartData?.data || [2100, 2500, 2400, 2300, 2200, 2332, 2600],
    dataLabels: {
      enabled: false,
    },
  },
]);

const chartOptions = ref({
  chart: {
    type: "area",
    height: "100%",
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
  },
  tooltip: {
    theme: "dark",
    custom: ({ series, seriesIndex, dataPointIndex }: any) => {
      const labels = props.chartData?.labels || [
        "5 mar",
        "6 mar",
        "7 mar",
        "8 mar",
        "9 mar",
        "10 mar",
        "11 mar",
      ];
      const date = labels[dataPointIndex];
      const value = series[seriesIndex][dataPointIndex];
      return `
        <div style="padding:6px 10px; border-radius:8px; background:#1c1c28; color:#fff; font-family:Inter; font-size:13px;">
          <div style="color:#7d8aff; font-size:12px;">${date}</div>
          <div style="font-weight:600; font-size:14px;">$${value.toLocaleString()} USD</div>
        </div>
      `;
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: { show: false },
  xaxis: {
    categories: props.chartData?.labels || [
      "5 mar",
      "6 mar",
      "7 mar",
      "8 mar",
      "9 mar",
      "10 mar",
      "11 mar",
    ],
    labels: {
      style: {
        colors: "#ccc",
        fontSize: "12px",
      },
      offsetX: 0,
      offsetY: 0,
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tickPlacement: "on",
  },
  yaxis: {
    show: false,
    labels: {
      offsetX: 0,
      offsetY: 0,
    },
  },
  markers: {
    size: 6,
    shape: "circle",
    colors: ["#fff"],
    strokeColors: "#FF6B4A",
    strokeWidth: 2,
    hover: { size: 8 },
    showNullDataPoints: false,
    dataLabels: {
      enabled: false,
    },
    fillColors: ["#fff"],
    radius: 3,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      opacityFrom: 0.6,
      opacityTo: 0.05,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          opacity: 0.4,
          color: "#FF6B4A",
        },
        {
          offset: 100,
          opacity: 0,
          color: "#0A090F",
        },
      ],
    },
  },
  colors: ["#FF6B4A"],
  legend: { show: false },
  dataLabels: {
    enabled: false,
  },
});

// Methods
const updateChartData = (newData: ChartData) => {
  series.value[0].data = newData.data;
  chartOptions.value.xaxis.categories = newData.labels;

  // Принудительно обновляем график
  if (chart.value) {
    chart.value.updateOptions(chartOptions.value);
    chart.value.updateSeries(series.value);
  }
};

const getDates = (): string[] => {
  return ["5 mar", "6 mar", "7 mar", "8 mar", "9 mar", "10 mar", "11 mar"];
};

// Watchers
watch(
  () => props.chartData,
  (newData) => {
    if (newData) {
      updateChartData(newData);
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss">
.prepaid-card-chart {
  height: 100%;

  // Градиент для линии графика
  .apexcharts-series {
    .apexcharts-line {
      stroke: url(#lineGradient);
      stroke-linecap: round;
    }
  }

  // Создаем SVG градиент
  svg {
    defs {
      linearGradient {
        &#lineGradient {
          x1: "0%";
          y1: "0%";
          x2: "100%";
          y2: "0%";

          stop {
            &[offset="0%"] {
              stop-color: #ff6b4a;
              stop-opacity: 1;
            }
            &[offset="100%"] {
              stop-color: #ffffff;
              stop-opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
