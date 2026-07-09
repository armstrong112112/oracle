<template>
  <div class="prepaid-card-history">
    <div>
      <ExpensisDoughnutChart v-if="isExpenses" :data="expensesText" :chart-data="chartData" />
      <DepositDoughnutChart v-else :data="depositText" :chart-data="chartData" />
    </div>
    <div class="prepaid-card-history_header">
      <div class="prepaid-card-history_header_title">
        <h3>All Transactions ></h3>
        <div class="prepaid-card-history_tabs">
          <button v-for="tab in tabs" :key="tab.value" :class="['tab-button', { active: activeTab === tab.value }]"
            @click="changeTab(tab.value)">
            {{ tab.label }}
          </button>
        </div>
      </div>
      <div class="prepaid-card-history_body">
        <transfer-history-item :data="historyData as unknown as Transfer[]" :is-tilda="false"
          :color="activeTab === 'EXPENSE' ? 'color-brown' : 'color-green'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DepositDoughnutChart from "@/components/charts/DepositDoughnutChart.vue";
import ExpensisDoughnutChart from "@/components/charts/ExpensisDoughnutChart.vue";
import type { Transfer } from "~/components/transfer-history-item.vue";
import {
  getPrepaidCardHistoryData,
  getPrepaidCardHistoryText,
  historyData,
  type PrepaidCardHistoryData,
} from "~/entities/pre-paid/data/prepaidCardHistoryData";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const activeTab = ref("DEPOSIT");
const historyDataRef = ref(historyData);

const tabs = [
  { label: "Deposit", value: "DEPOSIT" },
  { label: "Expense", value: "EXPENSE" },
];

// Computed
const isExpenses = computed((): boolean => {
  return activeTab.value === "EXPENSE";
});

const activeDepositType = computed((): string => {
  return "DEPOSIT";
});

const activeExpensesType = computed((): string => {
  return "EXPENSE";
});

const chartData = computed((): PrepaidCardHistoryData => {
  return isExpenses.value
    ? getPrepaidCardHistoryData("expense")
    : getPrepaidCardHistoryData("deposit");
});

const expensesText = computed(() => {
  return getPrepaidCardHistoryText("expense");
});

const depositText = computed(() => {
  return getPrepaidCardHistoryText("deposit");
});

// Methods
const changeTab = (tabValue: string) => {
  activeTab.value = tabValue;
};
</script>

<style lang="scss">
$chart-height: 210px;
$chart-width: 210px;
$chart-height-desktop: 250px;
$chart-width-desktop: 250px;

.prepaid-card-history {
  height: 100%;
  display: flex;
}

.prepaid-card-history_header {
  margin-left: 20px;
  width: 100%;

  h3 {
    color: #fff;
    font-family: Roboto;
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    margin: 0;
  }
}

.prepaid-card-history_header_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.prepaid-card-history_tabs {
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

.chart-container {
  margin: 0;
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 210px;
  width: 210px;
  background: #1b1a24;
  border-radius: 8px;
  color: #7a74ba;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
}

@media (min-width: 1024px) and (max-width: 1440px) {

  canvas,
  .chart-container {
    max-height: $chart-height;
    max-width: $chart-width;
    min-height: $chart-height;
    min-width: $chart-width;
  }

  .chart-placeholder {
    height: $chart-height;
    width: $chart-width;
  }

  .prepaid-card-history_body {
    max-height: calc($chart-height - 35px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 5px;
    scrollbar-width: thin;
    scrollbar-color: #7a74ba #1b1a24;

    &::-webkit-scrollbar {
      width: 8px;
      background: #1b1a24;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #7a74ba;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #a29be7;
    }
  }
}

@media (min-width: 1440px) {

  canvas,
  .chart-container {
    max-height: $chart-height-desktop;
    max-width: $chart-width-desktop;
    min-height: $chart-height-desktop;
    min-width: $chart-width-desktop;
  }

  .chart-placeholder {
    height: $chart-height-desktop;
    width: $chart-width-desktop;
  }

  .prepaid-card-history_body {
    max-height: calc($chart-height-desktop - 35px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 5px;
    scrollbar-width: thin;
    scrollbar-color: #7a74ba #1b1a24;

    &::-webkit-scrollbar {
      width: 8px;
      background: #1b1a24;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #7a74ba;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #a29be7;
    }
  }
}
</style>
