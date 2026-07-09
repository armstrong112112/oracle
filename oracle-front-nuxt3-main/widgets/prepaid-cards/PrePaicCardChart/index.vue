<template>
  <div class="prepaid-card-tutorial">
    <div class="prepaid-card-tutorial_header">
      <h3>{{ title }}</h3>
      <div class="prepaid-card-tutorial_tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="['tab-button', { active: activeTab === tab.value }]"
          @click="changeTab(tab.value)">
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div class="prepaid-card-tutorial_chart">
      <PrePaidCardChartComponent
        :key="activeTab"
        :period="activeTab"
        :chart-data="currentChartData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { chartDataByPeriod } from "~/entities/pre-paid/data/chartData";
import PrePaidCardChartComponent from "~/entities/pre-paid/ui/PrePaidCardChartComponent.vue";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Props
interface Props {
  title: string;
}

const props = defineProps<Props>();

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const activeTab = ref("7D");

const tabs = [
  { label: "1D", value: "1D" },
  { label: "7D", value: "7D" },
  { label: "30D", value: "30D" },
  { label: "180D", value: "180D" },
  { label: "360D", value: "360D" },
];

// Computed
const currentChartData = computed(() => {
  return chartDataByPeriod[activeTab.value] || chartDataByPeriod["7D"];
});

// Methods
const changeTab = (tabValue: string) => {
  activeTab.value = tabValue;
};
</script>

<style lang="scss">
.prepaid-card-tutorial {
  height: 100%;
}

.prepaid-card-tutorial_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 24px 24px 0 24px;

  h3 {
    font-family: Hector;
    font-weight: 400;
    font-style: Regular;
    font-size: 20px;
    line-height: 120%;
    letter-spacing: 0%;
    color: white;
    margin: 0;
  }
}

.prepaid-card-tutorial_tabs {
  display: flex;
  gap: 8px;

  .tab-button {
    background: #282833;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #3a3a4a;
    }

    &.active {
      background: #f55030;
    }
  }
}
.prepaid-card-tutorial_chart {
  height: 100%;
  @media (min-width: 1440px) {
    height: 85%;
  }
}
</style>
