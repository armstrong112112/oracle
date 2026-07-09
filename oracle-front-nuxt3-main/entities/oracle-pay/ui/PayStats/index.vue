<template>
  <div class="pay_stats">
    <div class="pay_stats_container">
      <div class="filters_section">
        <div class="filters_container">
          <ChooseApiKeys />
          <ChooseCryptoScale />
          <div class="choose_stats w-full">
            <div class="choose_stats_header placeholder-color">
              <span>Period</span>
              <img src="/icons/oracle-pay/calendar.svg" alt="down" />
            </div>
          </div>
        </div>
      </div>
      <StatsCharts />
    </div>
  </div>
</template>
<script setup lang="ts">
import ChooseApiKeys from "~/entities/oracle-pay/ui/PayStats/ChooseApiKeys.vue";
import ChooseCryptoScale from "~/entities/oracle-pay/ui/PayStats/ChooseCryptoScale.vue";
import StatsCharts from "~/entities/oracle-pay/ui/PayStats/StatsCharts.vue";

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
.pay_stats {
  margin-top: 20px;
}

.pay_stats_container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filters_section {
  width: 100%;
}

.filters_container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.choose_stats {
  width: 100%;
}

/* Десктопная версия */
@media (min-width: 1024px) {
  .pay_stats_container {
    gap: 30px;
  }

  .filters_container {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
