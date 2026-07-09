<template>
  <div class="payment-dashboard">
    <input-oracle :search="true" :placeholder="$t('dashboard.search')" />
    <dashboard-home />
    <coin-difference :items="coins.map((item) => {
      return { ...item, name: 'BTC/' + item.name };
    })
      " />
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
            <h3 class="wallet-balance__value">1,621.00</h3>
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
      <coin-items :items="coins" />
      <div class="wallet-action-buttons">
        <new-oracle-button :text="$t('dashboard.deposit')" :icon="'/svg/arrow-down.svg'" @click="openDepositModal" />
        <new-oracle-button :text="$t('dashboard.send')" :icon="'/svg/arrow-up.svg'" @click="openWithdrawModal" />
        <new-oracle-button :text="$t('dashboard.swap')" :icon="'/svg/exchange.svg'" />
      </div>
    </div>
    <div class="recent-transactions">
      <div class="block-head">
        <h2 class="block-title">{{ $t("dashboard.recentTransactions") }}</h2>
      </div>
      <ul class="recent-transactions__cards">
        <card-text-icon v-for="(item, index) in recentTransactions" :key="index" :icon="item.icon"
          :title="$t(item.text)" />
      </ul>
    </div>
    <div class="qr-payment">
      <new-oracle-button :text="$t('dashboard.qrPayment')" :icon="'/svg/qr-scan.svg'" />
    </div>
    <div class="send-to">
      <div class="block-head">
        <h2 class="block-title">{{ $t("dashboard.sendTo") }}</h2>
        <label for="send-search" class="send-user__search">
          <input id="send-search" v-model="searchQuery" type="search" class="form-input"
            :placeholder="$t('dashboard.search')" @input="filtersendTo" />
          <div class="search-btn">
            <SearchIcon />
          </div>
        </label>
      </div>
      <ul class="send-users">
        <custom-avatar v-for="user of filteredsendTo" :key="user.id" :avatar="user.avatar || ''" :name="user.name"
          tag="li" />
      </ul>
    </div>
    <div class="dashboard-sections">
      <div class="dashboard-sections__item">
        <div class="block-head">
          <nuxt-link to="#" class="head-link">
            <h2 class="block-title">{{ $t("dashboard.bills") }}</h2>
            <div class="icon">
              <ArrowIcon />
            </div>
          </nuxt-link>
        </div>
        <div class="sections-body">
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="'/svg/white-plus.svg'" alt="" />
            </div>
            {{ $t("dashboard.createBill") }}
          </nuxt-link>
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="'/svg/bill-icon.svg'" alt="" />
            </div>
            {{ $t("dashboard.billPay") }}
          </nuxt-link>
        </div>
      </div>
      <div class="dashboard-sections__item mixing">
        <div class="block-head">
          <nuxt-link to="#" class="head-link">
            <h2 class="block-title">{{ $t("dashboard.mixing") }}</h2>
            <div class="icon">
              <ArrowIcon />
            </div>
          </nuxt-link>
        </div>
        <div class="sections-body">
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="'/svg/white-plus.svg'" alt="" />
            </div>
            <span>{{ $t("dashboard.createMix") }}</span>
          </nuxt-link>
        </div>
      </div>
      <div class="dashboard-sections__item escrow">
        <div class="block-head">
          <nuxt-link to="#" class="head-link">
            <h2 class="block-title">{{ $t("dashboard.escrow") }}</h2>
            <div class="icon">
              <ArrowIcon />
            </div>
          </nuxt-link>
        </div>
        <div class="sections-body">
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="'/svg/white-plus.svg'" alt="" />
            </div>
            <span>{{ $t("dashboard.createDeal") }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <draggable-modal class="select-method__modal" :is-open="depositModal" @close="depositModal = false">
      <h2 class="modal-title">{{ $t("dashboard.selectDepositMethod") }}</h2>
      <custom-list :items="depositOptions" clickable />
    </draggable-modal>
    <draggable-modal class="select-method__modal" :is-open="withdrawModal" @close="withdrawModal = false">
      <h2 class="modal-title">{{ $t("dashboard.selectWithdrawMethod") }}</h2>
      <custom-list :items="withdrawOptions" />
    </draggable-modal>
  </div>
</template>
<script setup lang="ts">
import ArrowIcon from "@/assets/svg/arrow-left.svg?component";
import SearchIcon from "@/assets/svg/search.svg?component";

// Import of plugs for data
import {
  depositOptions as depositOptionsData,
  recentTransactions as recentTransactionsData,
  withdrawOptions as withdrawOptionsData,
} from "@/data/dashboardPayment.options";
import { cards as cardsData } from "@/entities/dashboard-payment/data/cards.seed";
import { coins as defaultCoins } from "@/entities/dashboard-payment/data/coins.seed";
import { users as usersData } from "@/entities/dashboard-payment/data/users.seed";

// composables

const localePath = useLocalePath();

definePageMeta({
  layout: "mobile",
});

// Reactive state
const selectedCoin = ref<string>("USD");
const selectedIcon = ref<string>("");
const searchQuery = ref<string>("");
const depositModal = ref<boolean>(false);
const withdrawModal = ref<boolean>(false);

// Data
const coins = defaultCoins;
const prepaidCards = cardsData;
const recentTransactions = recentTransactionsData;
const depositOptions = depositOptionsData;
const withdrawOptions = withdrawOptionsData;

const sendTo = usersData;
const filteredsendTo = ref([...sendTo]);

// Computed
const filtersendTo = () => {
  filteredsendTo.value = sendTo.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

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

// Lifecycle hooks
onMounted(() => {
  updateIcon();
});
</script>

<style lang="scss">
@use "@/assets/styles/pages/_dashboard-payment.scss" as *;
@use "@/assets/styles/components/_draggable-modal.scss" as *;
</style>
