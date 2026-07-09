<template>
  <div class="oracle-profile">
    <block-nav-back :text="$t('dashboard.btcAccount')" :more="true" />
    <div class="wallet-overview">
      <div class="wallet-balance">
        <div class="left-block">
          <h4 class="balance-title">
            {{ $t("dashboard.yourBitcoinBalance") }}
          </h4>
          <div class="wallet-balance__info">
            <h3 class="wallet-balance__value">0.003213</h3>
            <div class="wallet-select__wrapper">
              <select id="wallet" name="wallet" class="wallet-select">
                <option value="USD">USD</option>
                <option value="BTC" selected>BTC</option>
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
      <div class="coin-to__usd">� $550 000</div>
      <div class="wallet-qr__code">
        <img src="/png/qr-code.png" alt="" />
      </div>
      <div class="wallet-action-buttons">
        <new-oracle-button :text="$t('dashboard.deposit')" :icon="'/svg/arrow-down.svg'" />
        <new-oracle-button :text="$t('dashboard.send')" :icon="'/svg/arrow-up.svg'" />
        <new-oracle-button :text="$t('dashboard.swap')" :icon="'/svg/exchange.svg'" />
      </div>
    </div>
    <div class="address-info">
      <h3 class="address-info__head">{{ $t("dashboard.addressInfo") }}</h3>
      <div class="referral-code-box">
        <span ref="addressRef" class="address-code">92das8d9asdh89dsa8dupaosd2e32e213</span>
        <button class="copy-btn" @click="copyAddress">
          <CopyIcon />
        </button>
        <button class="share-btn" @click="shareAddress">
          <ShareIcon />
        </button>
      </div>
      <div class="update-address">
        <new-oracle-button color="yellow" :text="$t('dashboard.updateAddress')" :icon="'/svg/exchange.svg'"
          @click="updateAddress = true" />
      </div>
    </div>

    <your-transactions to="" />
    <div class="mixing">
      <h3 class="mixing__head">{{ $t("dashboard.mixing") }}</h3>
      <new-oracle-button :icon="'/svg/create-icon.svg'" :text="$t('dashboard.startNewMix')" />
    </div>
    <div class="details">
      <div class="details-head">{{ $t("dashboard.details") }}</div>
      <ul class="details-list">
        <li class="list-item">
          <h5 class="item-head">{{ $t("dashboard.limits") }}</h5>
          <p class="item-description">Feb 20, 2025</p>
        </li>
        <li class="list-item">
          <h5 class="item-head">{{ $t("dashboard.createdDate") }}</h5>
          <p class="item-description">May 20, 2025</p>
        </li>
        <li class="list-item">
          <h5 class="item-head">{{ $t("dashboard.transactions") }}</h5>
          <p class="item-description">120</p>
        </li>
      </ul>
      <div class="fees-history-wrapper">
        <div class="fees-section">
          <nuxt-link to="#" class="fees-link">{{ $t("dashboard.fees") }}
            <span class="icon">
              <ArrowIcon />
            </span>
          </nuxt-link>
        </div>
        <div class="history-section">
          <nuxt-link to="#" class="history-link">{{ $t("dashboard.history") }}
            <span class="icon">
              <ArrowIcon />
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>

    <adresses-modal :is-visible="updateAddress" class="update-address__modal">
      <div class="modal-body">
        <div class="icon">
          <UpdateIcon />
        </div>
        <h3 class="modal-title">
          {{ $t("dashboard.confirmUpdateAddress") }}
        </h3>
      </div>
      <new-oracle-button color="yellow" :text="$t('dashboard.yes')" @click="updateAddress = false" />
      <new-oracle-button :text="$t('dashboard.close')" @click="updateAddress = false" />
    </adresses-modal>
  </div>
</template>
<script setup lang="ts">
import ArrowIcon from "@/assets/svg/arrow-left.svg?component";
import WalletIcon from "@/assets/svg/wallet-status.svg?component";
import CopyIcon from "@/assets/svg/moresettings/copy.svg?component";
import ShareIcon from "@/assets/svg/share-icon.svg?component";
import UpdateIcon from "@/assets/svg/exchange.svg?component";

const localePath = useLocalePath()
const { t } = useI18n()

definePageMeta({
  layout: "sidebar",
});

// Reactive state
const updateAddress = ref<boolean>(false);
const addressRef = ref<HTMLElement | null>(null);

// Methods
const copyAddress = () => {
  const element = addressRef.value;
  if (!element) return;

  const range = document.createRange();
  range.selectNodeContents(element);

  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }

  navigator.clipboard.writeText(element.innerText);
};

const shareAddress = () => {
  if (navigator.share) {
    navigator
      .share({
        title: t("dashboard.myWalletAddress"),
        text: "92das8d9asdh89dsa8dupaosd2e32e213",
        url: window.location.href,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    alert(t("dashboard.shareNotSupported"));
  }
};
</script>

<style lang="scss">
@use "@/assets/styles/pages/_oracle-profile.scss" as *;
</style>
