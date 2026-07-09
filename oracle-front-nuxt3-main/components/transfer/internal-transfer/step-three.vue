<template>
  <div class="internal-transfer__step-three">
    <div class="internal-transfer__content">
      <div class="internal-transfer__head">
        <ul class="head-list">
          <li class="list-item">
            <div class="icon">!</div>
            <div class="list-description">
              {{ $t("transfers.beAwareOfScammers") }}
            </div>
          </li>
          <li class="list-item">
            <div class="icon">!</div>
            <div class="list-description">
              {{ $t("transfers.howToRecognizeScammer") }}
            </div>
          </li>
          <li class="list-item">
            <div class="icon">!</div>
            <div class="list-description">
              {{ $t("transfers.howToRecognizeScammer") }}
            </div>
          </li>
        </ul>
      </div>
      <div class="internal-transfer__from">
        <div class="from-card">
          <h5 class="card-title">{{ $t("transfers.from") }}</h5>
          <p class="user-account">USDT Account ***2343</p>
          <div class="coin-img">
            <CoinImg />
          </div>
          <h3 class="coin-convert__amount">100.00</h3>
          <h5 class="coin-to__usd">≈ $98.98</h5>
        </div>
        <input-oracle :placeholder="$t('transfers.for')" />
      </div>
      <div class="selected-user">
        <div class="user-img">
          <img :src="'/png/zaglushka.png'" alt="" />
        </div>
        <h4 class="user-name">Barbara Martinez</h4>
      </div>
      <div class="selected-user__info">
        <ul class="info-list">
          <li v-for="profile of profilInfo" :key="profile.id" class="list-item">
            <div class="profile-img">
              <img :src="profile.img" alt="" />
            </div>
            <h4 class="profile-title">
              {{ $t(profile.title) }}
            </h4>
          </li>
        </ul>
      </div>
      <div class="transaction-summary">
        <div class="transaction-summary__fees">
          <h5 class="transaction-summary__label">{{ $t("transfers.fees") }}</h5>
          <h5 class="transaction-summary__amount">0.01%</h5>
        </div>
        <div class="transaction-summary__price">
          <h5 class="transaction-summary__label">
            {{ $t("transfers.pricePer") }}
          </h5>
          <h5 class="transaction-summary__amount">0.001 BTC (≈ $1.06)</h5>
        </div>
        <div class="transaction-summary__confirm">
          <button-oracle
            :to="localePath('/transfer/internal-transfer?step=3')"
            :text="$t('transfers.transfer')"
            color="orange"
            @click="isConfirm = true" />
        </div>
      </div>
    </div>
    <adresses-modal
      class="transaction-confirmed__modal"
      :is-visible="isConfirm"
      @close="isConfirm = false">
      <div class="modal-head">
        <div class="check-icon">
          <CheckIcon />
        </div>
        <h3 class="modal-title">{{ $t("transfers.transactionConfirmed") }}</h3>
        <div class="border-bottom">
          <svg
            width="290"
            height="2"
            viewBox="0 0 290 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H290" stroke="#443D69" stroke-dasharray="8 8" />
          </svg>
        </div>
      </div>
      <div class="user-info">
        <ul class="user-info__list">
          <li class="list-item">
            <div class="info-head">
              <h5 class="date">{{ $t("transfers.date") }}</h5>
              <h5 class="time">{{ $t("transfers.time") }}</h5>
            </div>
            <div class="info-bottom">
              <h5 class="date">Feb 20, 2025</h5>
              <h5 class="time">11:23 AM</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="left-block">
              <div class="info-head">
                <h5 class="to">{{ $t("transfers.to") }}</h5>
              </div>
              <div class="info-bottom">
                <h5 class="user-name">Barbara Martinez</h5>
              </div>
            </div>
            <div class="user-img">
              <img :src="'/png/zaglushka.png'" alt="" />
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="amount">{{ $t("transfers.amountReceived") }}</h5>
            </div>
            <div class="info-bottom">
              <h2 class="amount-coin">100 USDT</h2>
              <h5 class="transfer-to__usd">≈ $98.98</h5>
            </div>
          </li>
        </ul>
      </div>
      <div class="transaction-summary">
        <div class="transaction-summary__fees">
          <h5 class="transaction-summary__label">{{ $t("transfers.fees") }}</h5>
          <h5 class="transaction-summary__amount">0.01%</h5>
        </div>
        <div class="transaction-summary__price">
          <h5 class="transaction-summary__label">
            {{ $t("transfers.pricePer") }}
          </h5>
          <h5 class="transaction-summary__amount">0.001 BTC (≈ $1.06)</h5>
        </div>
      </div>
    </adresses-modal>
    <adresses-modal class="payment-error-modal">
      <div class="payment-error__head">
        <ErrorIcon />
        <h2 class="modal-title">
          {{ $t("transfers.weCouldntProcessPayment") }}
        </h2>
        <p class="modal-description">
          {{ $t("transfers.transactionCouldntBeProcessed") }}
        </p>
        <p class="modal-description">{{ $t("transfers.pleaseTryAgain") }}</p>
      </div>
      <div class="modal-buttons">
        <button-oracle
          :text="$t('transfers.tryAgain')"
          color="gray"
          @click="isConfirm = false" />
        <button-oracle
          :text="$t('transfers.okay')"
          color="orange"
          @click="isConfirm = false" />
      </div>
    </adresses-modal>
  </div>
</template>

<script setup lang="ts">
import CoinImg from "@/assets/svg/usdt.svg?component";
import CheckIcon from "@/assets/svg/transaction-check.svg?component";
import ErrorIcon from "@/assets/svg/payment-error.svg?component";

const localePath = useLocalePath()

// Reactive state
const isConfirm = ref(false);
const windowWidth = ref(0);

const profilInfo = [
  {
    id: 1,
    img: '/svg/selected-profile.svg',
    title: "transfers.profile",
  },
  {
    id: 2,
    img: '/svg/ensrow-profile.svg',
    title: "transfers.escrowReviews",
  },
  {
    id: 3,
    img: '/svg/p2p-profile.svg',
    title: "transfers.p2pReviews",
  },
];

// Methods
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle hooks
onMounted(() => {
  windowWidth.value = window.innerWidth;
  if (import.meta.client) {
    window.addEventListener("resize", updateWidth);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", updateWidth);
  }
});
</script>

<style lang="scss">
@use "@/assets/styles/components/transfer/internal/step-three.scss" as *;
</style>
