<template>
  <div class="pay_charts">
    <div class="charts_container">
      <div class="chart_item">
        <ReceiptChart />
      </div>
      <div class="chart_item">
        <DepositChart />
      </div>
      <div class="chart_item">
        <ScheduleChart />
      </div>
      <div class="chart_item">
        <IncomeChart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DepositChart from "~/entities/oracle-pay/ui/PayStats/charts/DepositChart.vue";
import IncomeChart from "~/entities/oracle-pay/ui/PayStats/charts/IncomeChart.vue";
import ReceiptChart from "~/entities/oracle-pay/ui/PayStats/charts/ReceiptChart.vue";
import ScheduleChart from "~/entities/oracle-pay/ui/PayStats/charts/ScheduleChart.vue";

withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: "",
  }
);
</script>

<style lang="scss">
.charts_container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Десктопная версия */
@media (min-width: 1024px) {
  .charts_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .chart_item {
    margin-bottom: 0;
  }
}

.stats_charts {
  padding: 10px;
}

.stats_charts_title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
  margin-bottom: 10px;
}

// Custom tooltip styling
.custom-tooltip {
  background: #2a2932;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: Hanson, sans-serif;
}
.custom-tooltip div {
  font-family: Inter, sans-serif;
}
.tooltip-date {
  font-family: Inter, sans-serif;
  color: white;
  font-size: 14px;
  margin-bottom: 8px;
}

.tooltip-value {
  color: white;
  font-size: 13px;
  margin: 4px 0;
}
.apexcharts-text.apexcharts-xaxis-label {
  font-family: Inter, sans-serif;
}
</style>
