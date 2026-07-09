<template>
  <div>
    <div v-if="pending" class="dashboard-loading">
      <SkeletonLoader width="100%" height="160px" border-radius="16px" />
      <SkeletonLoader width="100%" height="120px" border-radius="16px" />
      <SkeletonLoader width="100%" height="100px" border-radius="16px" />
    </div>

    <ErrorState
      v-else-if="error"
      title="Unable to load dashboard"
      :message="errorMessage"
      @retry="refresh"
    />

    <EmptyState
      v-else-if="!hasDashboardData"
      title="Dashboard is empty"
      message="No dashboard data is available yet."
    />

    <template v-else>
      <div class="hide_on_desktop main-dashboard">
        <input-oracle :search="true" :placeholder="$t('dashboard.search')" />
        <dashboard-home />
        <new-oracle-button :text="$t('dashboard.getOracleVerified')" color="yellow" />
        <div class="wallet-overview">
          <div class="wallet-balance">
            <div class="left-block">
              <h4 class="balance-title">
                {{ $t("dashboard.yourOverallBalance") }}
              </h4>
              <div class="wallet-balance__info">
                <div class="coin-icon">
                  <span v-if="selectedCoin === 'USD'" class="coin-symbol">$</span>
                  <img v-else :src="selectedIcon" alt="coin icon" class="coin-icon" />
                </div>
                <h3 class="wallet-balance__value">1,2621. 00</h3>
                <div class="wallet-select__wrapper">
                  <select id="wallet" v-model="selectedCoin" name="wallet" class="wallet-select" @change="updateIcon">
                    <option value="USD">USD</option>
                    <option value="BTC">BTC</option>
                    <option value="LTC">LTC</option>
                    <option value="TON">TON</option>
                    <option value="ETC">ETC</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="wallet-history">
              <nuxt-link to="#" class="history-link">
                {{ $t("dashboard.history") }}
                <ArrowIcon />
              </nuxt-link>
            </div>
          </div>
          <!-- LIST COINS -->
          <coins-list :items="coins" />
          <div class="wallet-action-buttons">
            <new-oracle-button :text="$t('dashboard.deposit')" :icon="'/svg/arrow-down.svg'" @click="openDepositModal" />
            <new-oracle-button :text="$t('dashboard.send')" :icon="'/svg/arrow-up.svg'" @click="openWithdrawModal" />
            <new-oracle-button :text="$t('dashboard.swap')" :icon="'/svg/exchange.svg'" />
          </div>
        </div>
        <div class="qr-payment">
          <new-oracle-button :text="$t('dashboard.qrPayment')" :icon="'/svg/qr-scan.svg'" />
        </div>
        <your-transactions />

        <div class="flex flex-col gap-10">
          <div class="your-transactions__head prepaid-card-dashboard-head">
            <nuxt-link to="#" class="your-transactions__link">
              Score
              <div class="icon">
                <ArrowIcon />
              </div>
            </nuxt-link>
          </div>

          <div class="score_body">

            <div class="">
              <img src="/svg/CrestInitiate.svg" alt="crest initiate" class="score_body_image" />
            </div>

            <div class="score_body_title">

              <div class="score_body_title_text">
                <div class="score_body_title_text_title">Crest Initiate</div>
                <div class="score_body_title_text_title">0PX</div>
              </div>

              <div class="flex flex-col gap-8 w-full items-start">
                <div class="score_counter flex items-start justify-center gap-4">
                  <div class="score_number">1,000</div>
                  <div class="score_text">more XP to Next LVL</div>
                </div>
                <div class="score_range w-full">
                  <div class="score_range_indicator"></div>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="prepaid-cards">
          <div class="prepaid-cards__head">
            <nuxt-link to="#" class="prepaid-cards__link">
              {{ $t("dashboard.prepaidCards") }}
              <div class="icon">
                <ArrowIcon />
              </div>
            </nuxt-link>
          </div>
          <card-list :items="prepaidCards" />
        </div>
        <div class="oracle-services">
          <h3 class="oracle-services__head">
            {{ $t("dashboard.oraclesServices") }}
          </h3>
          <!-- LIST SERVICE -->
          <service-list :items="services" />
        </div>
        <new-oracle-button class="create-account__btn" :text="$t('dashboard.createNewAccount')"
          :icon="'/svg/oracle-icon.svg'" color="yellow" />
        <draggable-modal class="select-method__modal" :is-open="depositModal" @close="depositModal = false">
          <h2 class="modal-title">{{ $t("dashboard.selectDepositMethod") }}</h2>
          <ul class="select-method__list">
            <custom-list :items="depositOptions" clickable />
          </ul>
        </draggable-modal>
        <draggable-modal class="select-method__modal" :is-open="withdrawModal" @close="withdrawModal = false">
          <h2 class="modal-title">{{ $t("dashboard.selectWithdrawMethod") }}</h2>
          <ul class="select-method__list">
            <custom-list :items="withdrawOptions" clickable />
          </ul>
        </draggable-modal>
      </div>
      <div class="main-dashboard main-dashboard-desktop">
        <div class="dashboard-first-line">
          <div class="wallet-overview rounded-16">
            <div class="wallet-balance">
              <div class="left-block">
                <h4 class="balance-title">
                  {{ $t("dashboard.yourOverallBalance") }}
                </h4>
                <div class="wallet-balance__info">
                  <div class="coin-icon">
                    <span v-if="selectedCoin === 'USD'" class="coin-symbol">$</span>
                    <img v-else :src="selectedIcon" alt="coin icon" class="coin-icon" />
                  </div>
                  <h3 class="wallet-balance__value">1,2621. 00</h3>
                  <div class="wallet-select__wrapper">
                    <select id="wallet" v-model="selectedCoin" name="wallet" class="wallet-select" @change="updateIcon">
                      <option value="USD">USD</option>
                      <option value="BTC">BTC</option>
                      <option value="LTC">LTC</option>
                      <option value="TON">TON</option>
                      <option value="ETC">ETC</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="wallet-history">
                <nuxt-link to="#" class="history-link">
                  {{ $t("dashboard.history") }}
                  <ArrowIcon />
                </nuxt-link>
              </div>
            </div>
            <!-- LIST COINS -->
            <div class="wallet-action-buttons">
              <new-oracle-button :text="$t('dashboard.deposit')" :icon="'/svg/arrow-down.svg'"
                @click="openDepositModal" />
              <new-oracle-button :text="$t('dashboard.send')" :icon="'/svg/arrow-up.svg'" @click="openWithdrawModal" />
              <new-oracle-button :text="$t('dashboard.swap')" :icon="'/svg/exchange.svg'" />
            </div>
            <coins-list :items="coins" />
          </div>
          <DashboardChart />
          <!-- <div class="desktop_model">
            <div class="desktop_model_title">Tutorials</div>
            <dashboard-home />
          </div> -->
        </div>
        <div class="dashboard-second-line">
          <div class="desktop_model-services">
            <!-- <your-transactions /> -->

            <DashboardServices :items="services.slice(1, 5)" />
          </div>
          <div class="desktop_model">
            <DashboardScore />
          </div>
          <div class="desktop_model pr-0 pb-0 pt-0">
            <DashboardPrePaidCards />
          </div>
        </div>
      </div>
    </template>
  </div>

  <P2PFooterNavBar />
</template>
<script setup lang="ts">
import ArrowIcon from "@/assets/svg/arrow-left.svg?component";
import CardList from "~/components/list-types/cardList.vue";
import CoinsList from "~/components/list-types/coinsList.vue";
import ServiceList from "~/components/list-types/serviceList.vue";
import DashboardChart from "~/entities/dashboard/chart/DashboardChart.vue";
import DashboardPrePaidCards from "~/entities/dashboard/pre-paid/DashboardPrePaidCards.vue";
import DashboardScore from "~/entities/dashboard/score/DashboardScore.vue";
import DashboardServices from "~/entities/dashboard/services/DashboardServices.vue";
import P2PFooterNavBar from '~/widgets/p2p/P2PFooterNavBar/index.vue';
// composables

// data
import {
  depositOptions as depositOptionsData,
  services as servicesData,
  withdrawOptions as withdrawOptionsData,
} from "~/data/dashboardPayment.options";
import { cards as cardsData } from "~/entities/dashboard-payment/data/cards.seed";
import { coins as coinsData } from "~/entities/dashboard-payment/data/coins.seed";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";
import ErrorState from "~/components/ui/ErrorState.vue";
import EmptyState from "~/components/ui/EmptyState.vue";

const localePath = useLocalePath();

definePageMeta({
  layout: "sidebar",
});

// Reactive state
const selectedCoin = ref<string>("USD");
const selectedIcon = ref<string>("");
const windowWidth = ref<number>(0);
const depositModal = ref<boolean>(false);
const withdrawModal = ref<boolean>(false);

// Data (static data, no ref needed)
const coins = coinsData;
const services = servicesData;
const prepaidCards = cardsData;
const depositOptions = depositOptionsData;
const withdrawOptions = withdrawOptionsData;

interface DashboardSummaryResponse {
  balance?: string | number;
  coins?: unknown[];
  services?: unknown[];
  prepaidCards?: unknown[];
}

const { data, pending, error, refresh } = useApiFetch<DashboardSummaryResponse>("/dashboard/summary", {
  server: false,
  lazy: true,
  immediate: true,
});

const hasDashboardData = computed(() => Boolean(
  data.value?.balance ||
    data.value?.coins?.length ||
    data.value?.services?.length ||
    data.value?.prepaidCards?.length,
));
const errorMessage = computed(() => error.value?.message || "Unable to load dashboard data.");

// Methods
const updateIcon = () => {
  const iconMap: Record<string, string> = {
    BTC: "/svg/btc-icon.svg",
    LTC: "/svg/ltc-icon.svg",
    TON: "/svg/ton-icon.svg",
    ETC: "/svg/etc-icon.svg",
  };

  selectedIcon.value = iconMap[selectedCoin.value] || "";
};

const openDepositModal = () => {
  depositModal.value = true;
  // Note: $nuxt.$emit not needed in Nuxt 3
};

const openWithdrawModal = () => {
  withdrawModal.value = true;
  // Note: $nuxt.$emit not needed in Nuxt 3
};

const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    updateLayout();
  }
};

const updateLayout = () => {
  if (windowWidth.value < 1024) {
    return;
  }
};

// Lifecycle hooks
onMounted(() => {
  updateIcon();
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    updateLayout();
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>


<style lang="scss">
@use "@/assets/styles/pages/_dashboard.scss" as *;
@use "@/assets/styles/components/_draggable-modal.scss" as *;
@use "@/assets/styles/components/coins.scss" as *;

.dashboard-loading {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.score_body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  min-height: 109px;
  gap: 20px;

  border-radius: 16px;
  background-color: #14131B;

  .score_body_title {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 24px;

    .score_body_title_text {
      display: flex;
      justify-content: space-between;
      gap: 4px;


      .score_body_title_text_title {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 145%;
        color: #FFFFFF;

      }
    }
  }
}


.score_number {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: white;
}

.score_text {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #8780cf;
}

.score_range {
  height: 4px;
  border-radius: 10px;
  background: #2C2A3D;
  position: relative;
}

.score_range_indicator {
  position: absolute;
  background: #FFFFFF;
  border-radius: 10px;
  width: 10%;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>
