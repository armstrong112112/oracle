<template>
  <div class="period">
    <div
      v-for="option in options"
      :key="option.month"
      class="period_month"
      :class="{ selected_month: selectedMonth === option.month }"
      @click="selectMonth(option.month)">
      <div class="month">
        {{
          $t("verification.chooseVerificationPeriod.monthLabel", {
            month: option.month,
          })
        }}
      </div>
      <div
        class="description"
        :class="
          option.label ===
          $t('verification.chooseVerificationPeriod.labels.cheaper50')
            ? 'primary-color'
            : null
        ">
        {{ translateLabel(option.label) }}
      </div>

      <div v-if="option.month === 24" class="good-deal">
        {{ $t("verification.chooseVerificationPeriod.goodDeal") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useVerificationStore } from "~~/store/verification";

const { t } = useI18n();

// Pinia store
const verificationStore = useVerificationStore();

// State
const options = [
  { month: 6, label: "140% of price" },
  { month: 12, label: "Regular price" },
  { month: 18, label: "40% cheaper" },
  { month: 24, label: "50% cheaper" },
];

const selectedMonth = ref<number | null>(null);

// Methods
const translateLabel = (label: string) => {
  switch (label) {
    case "140% of price":
      return t("verification.chooseVerificationPeriod.labels.price140");
    case "Regular price":
      return t("verification.chooseVerificationPeriod.labels.regular");
    case "40% cheaper":
      return t("verification.chooseVerificationPeriod.labels.cheaper40");
    case "50% cheaper":
      return t("verification.chooseVerificationPeriod.labels.cheaper50");
    default:
      return label;
  }
};

const selectMonth = (month: number) => {
  selectedMonth.value = month;
  verificationStore.setVerificationData({
    verificationPeriod: month.toString(),
    isProcessed: false,
  });
};

// Initialize
onMounted(() => {
  const storedPeriod = verificationStore.verificationData.verificationPeriod;
  if (storedPeriod) {
    selectedMonth.value = parseInt(storedPeriod, 10);
  }
});
</script>

<style lang="scss" scoped>
.period {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.period_month {
  background-color: #13131e;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  color: white;
  font-family: Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .month {
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    letter-spacing: 0%;
  }

  .description {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    letter-spacing: 0;
    margin-top: 20px;
  }
}

/* When selected */
.selected_month {
  background-color: #f64e2a;
  color: white;

  .description {
    color: white;
  }
}

/* Good deal tag */
.good-deal {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #f64e2a;
  color: white;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 500;
}
.selected_month .primary-color {
  color: white !important;
}
</style>
