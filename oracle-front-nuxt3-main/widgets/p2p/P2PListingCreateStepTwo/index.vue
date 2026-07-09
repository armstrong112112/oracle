<template>
  <div class="p2p-listing-create create-step-two">
    <div class="p2p-listing-create__container">
      <div class="p2p-listing-create__exchenge-rate">
        <div class="p2p-listing-create__exchenge-rate-title">
          {{ $t("p2p.listing.create.stepTwo.exchengeRate.title") }}
        </div>
        <div class="p2p-listing-create__exchenge-rate-content">
          <input-oracle
            placeholder="0.00"
            :v="exchangeRateCrypto"
            type="number"
            :append-text="receiveCryptoSelected.value"
            @changed="handleExchangeRateCryptoChange" />
          <div class="p2p-listing-create__exchenge-rate-content-arrow">
            <arrow-down />
          </div>
          <input-oracle
            placeholder="0.00"
            :v="exchangeRateFiat"
            type="number"
            :append-text="fiatSelected.value"
            @changed="handleExchangeRateFiatChange" />
        </div>
      </div>
      <div class="p2p-listing-create__trade">
        <div class="p2p-listing-create__trade-title">
          {{ $t("p2p.listing.create.stepTwo.trade.title") }} ({{
            fiatSelected.value
          }})
        </div>
        <div class="p2p-listing-create__trade-content">
          <input-oracle
            placeholder="0.00"
            :v="minTrade"
            type="number"
            prepaid-text="Min"
            @changed="handleMinTradeChange" />
          <div class="p2p-listing-create__trade-content-number">
            <!-- ЗАМЕНИТЬ НА РАСЧЕТ -->
            {{ minTrade }} {{ receiveCryptoSelected.value }}
          </div>
          <input-oracle
            placeholder="0.00"
            :v="maxTrade"
            type="number"
            prepaid-text="Max"
            @changed="handleMaxTradeChange" />
          <div class="p2p-listing-create__trade-content-number">
            <!-- ЗАМЕНИТЬ НА РАСЧЕТ -->
            {{ maxTrade }} {{ receiveCryptoSelected.value }}
          </div>
        </div>
      </div>
      <div class="p2p-listing-create__choose-deadline">
        <div class="p2p-listing-create__choose-deadline-title">
          {{ $t("p2p.listing.create.stepTwo.chooseDeadline.title") }}
        </div>
        <div class="p2p-listing-create__choose-deadline-content">
          <AppSelectModal
            modalTitle="Select deadline"
            :modelValue="deadlineSelected"
            :modalType="!isMobile ? 'default' : 'draggable'">
            <template #item="{ item }">
              <div class="p2p-listing-create__choose-deadline-item">
                {{ item.title }}
              </div>
            </template>
            <template #modalContent>
              <P2pTabsModal
                :isMultiple="false"
                :tabsList="deadline"
                :initialSelected="deadlineSelected"
                @select="handleDeadlineSelect" />
            </template>
          </AppSelectModal>
        </div>
      </div>
    </div>
    <div class="p2p-listing-create__footer" v-if="!noButtons">
      <new-oracle-button text="Back" class="mt-10" @click="handleStepChange" />
      <new-oracle-button text="Create" class="mt-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import arrowDown from "~/assets/svg/arrow-down.svg?component";
import type { Deadline } from "~/entities/p2p/model/deadline";
import P2pTabsModal from "~/entities/p2p/ui/modals/P2pTabsModal.vue";
import AppSelectModal from "~/components/ui/AppSelectModal.vue";
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
const receiveCryptoSelected = computed(() => p2pCreateStore.getReceiveCryptoSelected);
const fiatSelected = computed(() => p2pCreateStore.getFiatSelected);
const paymentTypesSelected = computed(() => p2pCreateStore.getPaymentTypesSelected);
const activeTab = computed(() => p2pCreateStore.getActiveTab);
const isMobile = computed(() => windowWidth.value < 1024);
const exchangeRateCrypto = computed(() => p2pCreateStore.getExchangeRateCrypto);
const exchangeRateFiat = computed(() => p2pCreateStore.getExchangeRateFiat);
const minTrade = computed(() => p2pCreateStore.getMinTrade);
const maxTrade = computed(() => p2pCreateStore.getMaxTrade);
const deadlineSelected = computed(() => p2pCreateStore.getDeadlineSelected);
const deadline = computed(() => p2pCreateStore.getDeadline);

// Methods
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const handleStepChange = () => {
  p2pCreateStore.handleStepChange(1);
};

const handleExchangeRateCryptoChange = (value: number) => {
  p2pCreateStore.handleExchangeRateCryptoChange(value);
};

const handleExchangeRateFiatChange = (value: number) => {
  p2pCreateStore.handleExchangeRateFiatChange(value);
};

const handleMinTradeChange = (value: number) => {
  p2pCreateStore.handleMinTradeChange(value);
};

const handleMaxTradeChange = (value: number) => {
  p2pCreateStore.handleMaxTradeChange(value);
};

const handleDeadlineSelect = (value: Deadline) => {
  p2pCreateStore.handleDeadlineSelect(value);
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
  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 16px 100px 16px;
    @media (min-width: 1024px) {
      padding-bottom: 0;
    }
  }
  &__exchenge-rate {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__exchenge-rate-title {
    font-size: 16px;
    line-height: 120%;
  }
  &__exchenge-rate-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__exchenge-rate-content-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    svg {
      width: 32px;
      height: 32px;
    }
  }
  &__trade {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__trade-title {
    font-size: 16px;
    line-height: 120%;
  }
  &__trade-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__trade-content-number {
    font-size: 14px;
    line-height: 120%;
    color: #7a74ba;
    padding-left: 12px;
  }
  &__choose-deadline {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__choose-deadline-title {
    font-size: 16px;
    line-height: 120%;
  }
  &__choose-deadline-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__choose-deadline-item {
    font-size: 14px;
    line-height: 120%;
  }
  &__footer {
    position: absolute;
    @media (min-width: 1024px) {
      position: relative;
      width: 100%;
      background-color: transparent;
    }
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: 10px;
    background-color: #000;
  }
}
</style>

<style lang="scss">
.p2p-listing-create.create-step-two {
  .p2p-listing-create__choose-deadline-item {
    white-space: nowrap;
  }
}
</style>
