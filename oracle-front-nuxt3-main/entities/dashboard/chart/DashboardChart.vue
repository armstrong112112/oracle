<template>
  <div class="dashboard_chart">
    <div class="flex items-center justify-between dashboard_chart_header">
      <div class="dashboard_chart_title">Static</div>
      <div class="dates">
        <div
          v-for="date in dates"
          :key="date"
          class="date"
          :class="{ active: activeDate === date }"
          @click="updateChart(date)">
          {{ date }}D
        </div>
      </div>
    </div>
    <ClientOnly>
      <apexchart
        ref="chartRef"
        type="area"
        height="299"
        :options="chartOptions"
        :series="series" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Reactive state
const dates = ref<number[]>([1, 7, 30, 180, 360]);
const activeDate = ref<number>(7);
const fullData = ref<{ [key: number]: number[] }>({
  1: [91000, 95000],
  7: [70000, 75000, 90000, 80000, 85000, 80000, 95000],
  30: Array.from({ length: 30 }, () =>
    Math.floor(Math.random() * 30000 + 70000)
  ),
  180: Array.from({ length: 180 }, () =>
    Math.floor(Math.random() * 30000 + 70000)
  ),
  360: Array.from({ length: 360 }, () =>
    Math.floor(Math.random() * 30000 + 70000)
  ),
});

// Template refs
const chartRef = ref();

// Methods
const getDates = (days: number): string[] => {
  const datesArray: string[] = [];
  const dataLength = fullData.value[days]?.length || 1;
  const now = new Date();
  for (let i = dataLength - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    datesArray.push(
      `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`
    );
  }
  return datesArray;
};

// Computed properties
const series = computed(() => {
  if (!fullData.value[activeDate.value]) {
    return [{ name: "USDT", data: [] }];
  }
  const data = [...fullData.value[activeDate.value]];
  return [
    {
      name: "USDT",
      data,
    },
  ];
});

const chartOptions = computed(() => {
  const categories = getDates(activeDate.value);

  return {
    chart: {
      type: "area",
      height: 299,
      background: "transparent",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 700 },
      dropShadow: { enabled: true, top: 5, left: 0, blur: 3, opacity: 0.4 },
    },
    colors: ["#FF6B4A"],
    tooltip: {
      enabled: true,
      theme: "dark",
      custom: ({
        series: seriesData,
        dataPointIndex,
      }: {
        series: number[][];
        dataPointIndex: number;
      }) => {
        const value =
          seriesData[0][dataPointIndex] !== undefined
            ? seriesData[0][dataPointIndex].toLocaleString()
            : "N/A";

        const now = new Date();
        const activeDays = activeDate.value || 7;
        const totalPoints = fullData.value[activeDays]?.length || 1;
        const datesArray: string[] = [];
        for (let i = totalPoints - 1; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);
          datesArray.push(
            `${date.getDate()} ${date.toLocaleString("en-US", {
              month: "short",
            })}`
          );
        }

        const date = datesArray[dataPointIndex] || "N/A";

        return `
          <div class="custom-tooltip dashboard_chart_tooltip">
            <div class="date">${date}</div>
            <div class="tooltip-value">~${value} USDT</div>
          </div>
        `;
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: { show: false },
    xaxis: {
      categories,
      labels: { style: { colors: "#FFFFFF", fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { show: false } },
    markers: {
      size: 5,
      colors: ["#FF6B4A"],
      strokeColors: "#000",
      strokeWidth: 2,
      hover: { size: 8 },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#ff9a76"],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
  };
});

const updateChart = (days: number) => {
  if (!fullData.value[days]) {
    return;
  }

  activeDate.value = days;

  nextTick(() => {
    if (import.meta.client) {
      window.dispatchEvent(new Event("resize"));
    }
  });
};

// Lifecycle hooks
onMounted(() => {
  updateChart(activeDate.value);
});
</script>
<style lang="scss">
.dashboard_chart {
  border: 1px solid #2b2741;
  border-radius: 16px;
  padding: 20px 1px 1px 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dashboard_chart_title {
  font-family: Hector;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  color: #ffffff;
}
.dashboard_chart_header {
  padding-left: 20px;
  padding-right: 20px;
}
.dates {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.date {
  padding: 7px 10px;
  border-radius: 12px;
  background: #1e1d28;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  vertical-align: middle;
  background: #1e1d28;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s linear;
}
.date.active {
  background: #f64e2a;
}

.dashboard_chart_tooltip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  gap: 8px;
  background: #1e1d28;
  box-shadow: none;
}
.dashboard_chart_tooltip .date {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #8780cf !important;
}
</style>
