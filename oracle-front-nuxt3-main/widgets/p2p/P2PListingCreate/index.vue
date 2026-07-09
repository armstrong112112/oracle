<template>
  <div class="p2p-listing-create">
    <div class="p2p-listing-create__container">
      <div class="p2p-listing-create__body">
        <Tabs :tabs="tabs" :active="activeTab" @select="handleTabChange" />
        <div class="p2p-listing-create__body-content">
          <div class="p2p-listing-create__choose">
            <div class="p2p-listing-create__choose-item">
              <div class="p2p-listing-create__choose-title">
                Receive Your Crypto
              </div>
              <div class="p2p-listing-create__choose-subtitle">
                Where should we deposit the customer's coins?
              </div>
              <div class="p2p-listing-create__choose-select">
                <AppSelectModal
                  modalTitle="Select crypto"
                  :modelValue="receiveCryptoSelected"
                  :modalType="!isMobile ? 'default' : 'draggable'">
                  <template #item="{ item }">
                    <div class="p2p-listing-create__choose-select-item">
                      <img
                        :src="item.icon"
                        alt="icon"
                        class="p2p-listing-create__choose-select-item-icon" />
                      <div class="p2p-listing-create__choose-select-item-body">
                        <div
                          class="p2p-listing-create__choose-select-item-body-title">
                          {{ item.title }}
                        </div>
                        <div
                          class="p2p-listing-create__choose-select-item-body-subtitle">
                          {{ item.price }} {{ item.value }}
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #modalContent>
                    <P2pCoinsModal
                      :cryptoList="receiveCrypto"
                      :initialSelected="receiveCryptoSelected"
                      @select="handleReceiveCryptoSelect" />
                  </template>
                </AppSelectModal>
              </div>
            </div>
            <div class="p2p-listing-create__choose-item">
              <div class="p2p-listing-create__choose-title">
                Choose Your Fiat
              </div>
              <div class="p2p-listing-create__choose-subtitle">
                Which fiat currency will you use to pay?
              </div>
              <div class="p2p-listing-create__choose-select">
                <AppSelectModal
                  modalTitle="Select crypto"
                  :modelValue="fiatSelected"
                  :modalType="!isMobile ? 'default' : 'draggable'">
                  <template #item="{ item }">
                    <div class="p2p-listing-create__choose-select-item">
                      <div class="p2p-listing-create__choose-select-item-body">
                        <div
                          class="p2p-listing-create__choose-select-item-body-title">
                          {{ item?.title }}
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #modalContent>
                    <P2pCoinsModal
                      :cryptoList="fiatData"
                      :initialSelected="fiatSelected"
                      @select="handleFiatSelect">
                      <template #item="{ item }">
                        <div class="body-head">
                          <p class="crypto-name">{{ item.title }}</p>
                        </div>
                      </template>
                    </P2pCoinsModal>
                  </template>
                </AppSelectModal>
              </div>
            </div>
            <div class="p2p-listing-create__choose-item">
              <div class="p2p-listing-create__choose-title">
                Payment Methods
              </div>
              <div class="p2p-listing-create__choose-subtitle">
                Which payment methods will you use to transfer fiat?
              </div>
              <div class="p2p-listing-create__choose-select">
                <AppSelectModal
                  defaultTitle="Choose"
                  modalTitle="Payment method"
                  multiple
                  :modelValue="paymentTypesSelected"
                  :modalType="!isMobile ? 'default' : 'draggable'">
                  <template #modalContent>
                    <P2pTabsModal
                      :tabsList="paymentTypes"
                      :initialSelected="paymentTypesSelected"
                      @select="handlePaymentTypesSelect">
                      <template #tabs="{ data }">
                        <Tabs
                          :tabs="data.tabs"
                          :active="data.active"
                          multiple
                          @select="data.select">
                          <template #item="{ item, isActive }">
                            <div
                              class="p2p-listing-create__choose-tab-item"
                              :class="
                                isActive
                                  ? 'p2p-listing-create__choose-tab-item--active'
                                  : ''
                              ">
                              <div
                                class="p2p-listing-create__choose-tab-item-body">
                                <div
                                  class="p2p-listing-create__choose-tab-item-title">
                                  {{ item.title }}
                                </div>
                                <div
                                  class="p2p-listing-create__choose-tab-item-subtitle">
                                  {{ item.name }} {{ item.surname }}
                                </div>
                              </div>
                              <div
                                class="p2p-listing-create__choose-tab-item-info">
                                <div
                                  class="p2p-listing-create__choose-tab-item-info-item-title">
                                  {{ item.currency }}
                                </div>
                                <div
                                  class="p2p-listing-create__choose-tab-item-info-item-subtitle">
                                  {{ item.cardNumber }}
                                </div>
                              </div>
                            </div>
                          </template>
                        </Tabs>
                      </template>
                    </P2pTabsModal>
                    <new-oracle-button
                      text="Add payment method"
                      class="mt-10" />
                  </template>
                </AppSelectModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p2p-listing-create__footer" v-if="!noButtons">
      <new-oracle-button
        text="Continue"
        class="mt-10"
        :disabled="!isAllElementsSelected"
        @click="handleStepChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Coin } from "~/entities/p2p/model/coins";
import type { Fiat } from "~/entities/p2p/model/fiat";
import type { PaymentType } from "~/entities/p2p/model/paymentType";
import P2pCoinsModal from "~/entities/p2p/ui/modals/P2pCoinsModal.vue";
import P2pTabsModal from "~/entities/p2p/ui/modals/P2pTabsModal.vue";
import AppSelectModal from "~/components/ui/AppSelectModal.vue";
import Tabs from "~/components/ui/Tabs.vue";
import { useP2PCreateStore } from "~~/store/p2p/createStore";

// Props
defineProps<{
  noButtons?: boolean;
}>();

// Use localePath if needed
const localePath = useLocalePath();

// Get Pinia store
const p2pCreateStore = useP2PCreateStore();

// Reactive state
const windowWidth = ref(0);

// Computed properties
const tabs = computed(() => p2pCreateStore.getTabs);
const receiveCrypto = computed(() => p2pCreateStore.getReceiveCrypto);
const receiveCryptoSelected = computed(() => p2pCreateStore.getReceiveCryptoSelected);
const fiatData = computed(() => p2pCreateStore.getFiatData);
const fiatSelected = computed(() => p2pCreateStore.getFiatSelected);
const paymentTypes = computed(() => p2pCreateStore.getPaymentTypes);
const paymentTypesSelected = computed(() => p2pCreateStore.getPaymentTypesSelected);
const activeTab = computed(() => p2pCreateStore.getActiveTab);
const isAllElementsSelected = computed(() => p2pCreateStore.isAllElementsSelected);
const isMobile = computed(() => windowWidth.value < 1024);

// Methods
const handleTabChange = (tab: string) => {
  p2pCreateStore.handleTabChange(tab);
};

const handleFiatSelect = (fiat: Fiat) => {
  p2pCreateStore.handleFiatSelect(fiat);
};

const handleReceiveCryptoSelect = (crypto: Coin) => {
  p2pCreateStore.handleReceiveCryptoSelect(crypto);
};

const handlePaymentTypesSelect = (paymentType: PaymentType[]) => {
  p2pCreateStore.handlePaymentTypesSelect(paymentType);
};

const handleStepChange = () => {
  p2pCreateStore.handleStepChange(2);
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle hooks
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.p2p-listing-create {
  height: 100%;
  @media (min-width: 1024px) {
    max-width: 800px;
    margin: 0 auto;
  }
  &__footer {
    position: absolute;
    @media (min-width: 1024px) {
      position: relative;
      background-color: transparent;
    }
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background-color: #000;
  }
  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
    padding: 0 16px;
  }
  &__body {
    width: 100%;
  }
  &__choose {
    margin-top: 20px;
    &-item {
      margin-bottom: 15px;
    }
    &-title {
      font-size: 16px;
    }
    &-subtitle {
      font-size: 14px;
      color: #8780cf;
      margin: 3px 0 8px 0;
    }
    &-select-item {
      display: flex;
      gap: 10px;
      &-icon {
        width: 32px;
      }
      &-body {
        &-title {
          font-size: 14px;
          font-weight: 600;
        }
        &-subtitle {
          font-size: 12px;
          color: #8780cf;
          text-wrap: nowrap;
        }
      }
    }
    &-tab-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      &-info-item-title {
        font-size: 12px;
        color: #8780cf;
      }
      &-info-item-subtitle {
        font-size: 12px;
        color: #8780cf;
      }
      &--active {
        .p2p-listing-create__choose-tab-item-info-item-title {
          color: #fff;
        }
        .p2p-listing-create__choose-tab-item-info-item-subtitle {
          color: #fff;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.p2p-listing-create {
  .selects-container__body-item-title {
    display: block;
  }
  .selects-container__body-item-icon {
    transform: rotate(-90deg);
    width: 18px !important;
    height: 18px !important;
    svg {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .selects-container__body-item-titles {
    overflow: inherit;
    text-overflow: inherit;
    text-wrap: inherit;
    white-space: inherit;
    flex: 1;
    justify-content: start;
  }
  .selects-container__body-item-title {
    display: inline;
    flex-grow: 0;
    min-width: inherit;
  }
  .selects-container__body-item-text {
    overflow: inherit;
    text-overflow: inherit;
    text-wrap: inherit;
    white-space: inherit;
  }
  .p2p-tabs-modal .tabs-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .tab-item {
      flex: 1;
      width: 100%;
    }
  }
}
</style>
