<template>
  <div :class="['history-page', pageClass]">
    <div v-if="!search">
      <block-nav-bar
        class="is_mobile"
        :to="backTo"
        :text="t('history.title')"
        :search="true"
        @openSearch="search = true" />
      <div class="history-content">
        <coin-filter-button
          class="is_mobile"
          :crypto-list="cryptoList"
          :initial-selected="selectedItems"
          @selection-change="onSelectionChange" />
        <div class="desktop-layout">
          <div class="expensis-chart">
            <div class="is_mobile">
              <slot name="description"></slot>
              <h2 class="history-title">
                {{ isExpenses ? expensesTitle : depositTitle }}
              </h2>
            </div>
            <HistorySwiper
              ref="historySwiper"
              :chart-data="chartData"
              :deposit-text="depositText"
              :expenses-text="expensesText"
              :active-expenses-type="activeExpensesType"
              :active-deposit-type="activeDepositType"
              :is-expenses="isExpenses"
              :step="step"
              @swiper="onSwiper"
              @slideChange="onSlideChange" />

            <div class="history-chart__filter">
              <div class="chart-pagination">
                <div
                  v-for="(month, i) in months"
                  :key="month"
                  class="pagination-double"
                  :class="paginationClass(i)"
                  @click="selectMonth(i + 1)"></div>
              </div>
              <div class="is_mobile">
                <h3 v-for="(month, i) in months" :key="i" class="month-name">
                  <span v-if="selectedMonth === i + 1">{{ month }}</span>
                </h3>
                <CalendarOracle ref="calendar" />
              </div>
            </div>
          </div>

          <div class="is_mobile history-tab">
            <div class="tab-head">
              <div class="tab-button">
                <button
                  class="deposits-btn tab-btn"
                  :class="{ active: !isExpenses }"
                  @click="setTab(false)">
                  {{ t("history.deposits") }}
                </button>
                <button
                  class="expenses-btn tab-btn"
                  :class="{ active: isExpenses }"
                  @click="setTab(true)">
                  {{ t("history.expenses") }}
                </button>
              </div>
            </div>
          </div>
          <div class="chart-labels" style="flex: 1">
            <div class="is_desktop history-title__wrapper">
              <h2 class="history-title">
                {{ isExpenses ? expensesTitle : depositTitle }}
                <b v-for="(month, i) in months" :key="i" class="month-name">
                  <template v-if="selectedMonth === i + 1"
                    >in {{ month }}</template
                  >
                </b>
              </h2>
              <CalendarOracle ref="calendar" />
            </div>
            <ChartLabel
              v-if="chartLabelData"
              :step="chartLabelStep"
              :data="chartLabelData"
              title="deposits" />
            <template v-else>
              <div
                class="is_desktop no-data-block"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 48px 0;
                  color: #8780cf;
                ">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  style="margin-bottom: 16px">
                  <circle cx="32" cy="32" r="32" fill="#23213A" />
                  <path
                    d="M20 40C20 36.6863 25.3726 34 32 34C38.6274 34 44 36.6863 44 40"
                    stroke="#8780CF"
                    stroke-width="2"
                    stroke-linecap="round" />
                  <ellipse
                    cx="25.5"
                    cy="27.5"
                    rx="2.5"
                    ry="3.5"
                    fill="#8780CF" />
                  <ellipse
                    cx="38.5"
                    cy="27.5"
                    rx="2.5"
                    ry="3.5"
                    fill="#8780CF" />
                  <circle
                    cx="32"
                    cy="32"
                    r="31"
                    stroke="#3B3947"
                    stroke-width="2" />
                </svg>
                <div
                  style="
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-weight: 500;
                    margin-bottom: 4px;
                  ">
                  {{ t("history.noDataTitle") || "Нет данных" }}
                </div>
                <div
                  style="
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    color: #a09fc5;
                  ">
                  {{
                    t("history.noDataDescription") ||
                    "За выбранный период нет данных для отображения."
                  }}
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="is_desktop">
          <div class="separator-line"></div>
          <slot name="description"></slot>
        </div>
        <div class="is_desktop desktop-layout__buttons">
          <div class="history-tab">
            <div class="tab-head">
              <div class="tab-button">
                <button
                  class="deposits-btn tab-btn"
                  :class="{ active: !isExpenses }"
                  @click="setTab(false)">
                  {{ t("history.deposits") }}
                </button>
                <button
                  class="expenses-btn tab-btn"
                  :class="{ active: isExpenses }"
                  @click="setTab(true)">
                  {{ t("history.expenses") }}
                </button>
              </div>
            </div>
          </div>
          <div class="spacer"></div>
          <coin-filter-button
            :crypto-list="cryptoList"
            :initial-selected="selectedItems"
            @selection-change="onSelectionChange" />
        </div>
        <h2 class="transaction-title">{{ t("history.transaction") }}</h2>
        <transfer-history-item
          v-if="!isExpenses"
          :data="historyData"
          :color="depositColor"
          @openModal="onOpenModal('deposit', $event)" />
        <transfer-history-item
          v-else
          :data="historyData"
          :color="expensesColor"
          @openModal="onOpenModal('expense', $event)" />
      </div>
    </div>

    <div v-else class="history-search">
      <div class="search-head">
        <input-oracle :search="true" :placeholder="t('history.search')" />
        <button class="close-search" @click="search = false">
          {{ t("history.cancel") }}
        </button>
      </div>
      <transfer-history-item
        :data="historyData"
        color="color-white"
        @openModal="onSearchOpenModal" />
    </div>

    <slot name="modal" />
  </div>
</template>

<script setup lang="ts">
import type { Swiper as SwiperType } from "swiper";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import CalendarOracle from "~/components/calendar-oracle.vue";
import ChartLabel from "~/components/charts/chart-labels.vue";
import CoinFilterButton from "~/components/coins/coinFilterButton.vue";
import HistorySwiper from "~/widgets/history/Swiper/index.vue";

interface Props {
  pageClass: string;
  pageTitle?: string;
  historyData?: any[];
  months?: string[];
  chartData: any;
  chartLabelStep?: any;
  chartLabelData?: any;
  depositText: any;
  expensesText: any;
  activeExpensesType?: string;
  activeDepositType?: string;
  onOpenModal?: (type: string, event: any) => void;
  onSearchOpenModal?: (item: any) => void;
  selectedItems?: string[];
  onSelectionChange?: (items: string | string[]) => void;
  backTo?: string;
  depositColor?: string;
  expensesColor?: string;
  depositTitle?: string;
  expensesTitle?: string;
  depositTabTitle?: string;
  expensesTabTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  pageTitle: "History",
  historyData: () => [],
  months: () => [],
  activeExpensesType: "",
  activeDepositType: "",
  onOpenModal: () => {},
  onSearchOpenModal: () => {},
  selectedItems: () => [],
  onSelectionChange: (_items: string | string[]) => {},
  backTo: "/",
  depositColor: "color-green",
  expensesColor: "color-brown",
  depositTitle: "Deposit",
  expensesTitle: "Expenses",
  depositTabTitle: "Deposits",
  expensesTabTitle: "Expenses",
});

const emit = defineEmits<{
  changedTab: [value: number];
}>();

// Composables
const { t } = useI18n();

// Reactive state
const search = ref(false);
const isExpenses = ref(false);
const step = ref(0);
const selectedMonth = ref(1);
const historySwiper = ref<InstanceType<typeof HistorySwiper> | null>(null);

// Methods
const selectMonth = (i: number) => {
  selectedMonth.value = i;
  if (historySwiper.value?.swiperInstance) {
    historySwiper.value.swiperInstance.slideTo(i - 1);
  }
};

const setTab = (isExpensesValue: boolean) => {
  isExpenses.value = isExpensesValue;
  selectedMonth.value = 1;
  if (historySwiper.value?.swiperInstance) {
    historySwiper.value.swiperInstance.slideTo(0);
  }
  // для понимания, какой таб активный
  emit("changedTab", isExpensesValue ? 1 : 0);
};

const onSwiper = (swiper: SwiperType) => {
  // Swiper instance already handled in HistorySwiper component
};

const onSlideChange = (swiper: SwiperType) => {
  selectedMonth.value = swiper.activeIndex + 1;
};

const onOpenModal = (type: string, item: any) => {
  props.onOpenModal(type, item);
};

const onSelectionChange = (items: string | string[]) => {
  props.onSelectionChange(items);
};

const onSearchOpenModal = (item: any) => {
  props.onSearchOpenModal(item);
};

const paginationClass = (i: number) => {
  return {
    active: selectedMonth.value === i + 1,
    active_center:
      selectedMonth.value === i ||
      selectedMonth.value === i - 1 ||
      selectedMonth.value === i + 2 ||
      selectedMonth.value === i + 3,
    active_small:
      selectedMonth.value === i + 4 || selectedMonth.value === i - 2,
  };
};

// Computed
const cryptoList = computed(() => [
  {
    id: 1,
    img: "/svg/litecoin-ltc.svg",
    name: t("history.crypto.litecoin"),
    selected: false,
  },
  {
    id: 2,
    img: "/svg/bitcoin.svg",
    name: t("history.crypto.xrp"),
    selected: false,
  },
  {
    id: 3,
    img: "/svg/bitcoin.svg",
    name: t("history.crypto.bitcoin"),
    selected: false,
  },
  {
    id: 4,
    img: "/svg/bitcoin.svg",
    name: t("history.crypto.etherium"),
    selected: false,
  },
  {
    id: 5,
    img: "/svg/tether-usdt.svg",
    name: t("history.crypto.usdt"),
    selected: false,
  },
  {
    id: 6,
    img: "/svg/tether-usdt.svg",
    name: t("history.crypto.bnb"),
    selected: false,
  },
]);
</script>

<style lang="scss">
@use "@/assets/styles/pages/_history-all.scss" as *;
</style>
