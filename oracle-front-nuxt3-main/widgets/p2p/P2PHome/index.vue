<template>
  <div class="p2p-home">
    <PageHeaderLayout v-if="isMobile" :title="$t('p2p.home')">
      <template #actions>
        <AppSelectModal is-close-button :model-value="activeFiat" :modal-type="modalType" style="max-width: 150px"
          variant="outline" color="#443D69" text-color="#BFB7FF">
          <template #modalContent>
            <P2pCoinsModal :crypto-list="fiatDataRef" :initial-selected="activeFiat" @select="handleFiatClick">
              <template #item="{ item }">
                <div class="body-head">
                  <p class="crypto-name">{{ item.title }}</p>
                </div>
              </template>
            </P2pCoinsModal>
          </template>
        </AppSelectModal>
      </template>
    </PageHeaderLayout>

    <div class="w-full">
      <div class="p2p-home__header">
        <Tabs size="sm" :tabs="tabsData" :active="activeTab" @select="handleTabClick" />
        <P2PFiltersSimple :crypto-list="cryptoList" :payment-types="paymentTypesList" :sort-items="sortItems"
          :selected-coin="selectedSingle" :selected-payment-types="paymentTypesSelected"
          :selected-amount="ammountSelected" :selected-sort="sortItem" :window-width="windowWidth"
          :active-fiat="activeFiat" :fiat-data="fiatDataRef" :is-fiat="!isMobile" @select-coin="handleSelect"
          @select-payment="handleSelectPayment" @select-amount="handleSelectAmmount" @select-sort="handleSelectSort"
          @close-payment="handleClosePayment" @select-fiat="handleFiatClick" />
      </div>
      <div class="divider" />
    </div>
    <div class="p2p-home__offers custom-scrollbar" :class="{ 'p2p-home__offers--loading': isLoading }">
      <Loader v-if="isLoading" type="bars" />
      <template v-else>
        <div v-for="offer in offers" :key="offer.id" class="p2p-home__offer-container">
          <CryptoOfferCard :offer="offer" :isMyOffer="false" />
          <div class="divider" />
        </div>
        <div class="p2p-home__offer-load-more">
          <new-oracle-button v-if="!isLoadMoreLoading && offers.length > 0" text="Load more" color="yellow"
            @click="loadMore" />
          <Loader v-else type="bars" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSelectModal from "~/components/ui/AppSelectModal.vue";
import type { TabItem } from "~/components/ui/Tabs.vue";
import Tabs from "~/components/ui/Tabs.vue";
import { Coins } from "~/entities/p2p/data/coins";
import type { Coin } from "~/entities/p2p/model/coins";
import type { CryptoOffer } from "~/entities/p2p/model/cryptoOffer";
import { getCryptoOffers } from "~/entities/p2p/model/cryptoOffer";
import type { PaymentType } from "~/entities/p2p/model/paymentType";
import CryptoOfferCard from "~/entities/p2p/ui/CryptoOfferCard.vue";
import P2PFiltersSimple from "~/entities/p2p/ui/filters/P2PFiltersSimple.vue";
import type { SortItem } from "~/shared/types/sortItems";
import PageHeaderLayout from "~/widgets/layout/PageHeader.vue";

import Loader from "~/components/ui/Loader.vue";
import {
  defaultFiat,
  fiatData as fiatDataList,
} from "~/entities/p2p/data/fiatData";
import { paymentTypes } from "~/entities/p2p/data/paymentTypes";
import type { Fiat } from "~/entities/p2p/model/fiat";
import P2pCoinsModal from "~/entities/p2p/ui/modals/P2pCoinsModal.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Data constants
const fiatDataRef = ref<Fiat[]>(fiatDataList);

// Reactive state
const isLoading = ref(true);
const isLoadMoreLoading = ref(false);
const windowWidth = ref(0);
const activeTab = ref("buy");
const cryptoList = ref(Coins);
const selectedSingle = ref<Coin | null>(cryptoList.value[0]);
const paymentTypesSelected = ref<object[] | null>(null);
const paymentTypesList = ref<PaymentType[]>(paymentTypes);
const ammountSelected = ref<string | null>(null);
const sortItem = ref<string | null>(null);
const activeFiat = ref<Fiat>(defaultFiat);
const sortItems = ref<SortItem[]>([
  {
    title: "Price",
    value: "price",
  },
  {
    title: "Time",
    value: "time",
  },
]);
const offers = ref<CryptoOffer[]>([]);

// Computed properties
const isMobile = computed(() => windowWidth.value < 1024);

const modalType = computed(() => (!isMobile.value ? "default" : "draggable"));

const tabsData = computed(() => [
  {
    title: $t("p2p.buyCrypto"),
    value: "buy",
  },
  {
    title: $t("p2p.sellCrypto"),
    value: "sell",
  },
]);

// Methods
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const handleTabClick = (tab: TabItem | (string | object)[]) => {
  if (Array.isArray(tab)) {
    // Handle multiple selection case (shouldn't happen for this component)
    return;
  }

  if (
    typeof tab === "object" &&
    "value" in tab &&
    typeof tab.value === "string"
  ) {
    if (activeTab.value !== tab.value) {
      loadOffers(tab.value as "buy" | "sell", true);
    }
    activeTab.value = tab.value;
  } else if (typeof tab === "string") {
    if (activeTab.value !== tab) {
      loadOffers(tab as "buy" | "sell", true);
    }
    activeTab.value = tab;
  }
};

const loadOffers = (
  type: "buy" | "sell",
  isLoadingParam: boolean = false,
  isLoadMore: boolean = false
) => {
  isLoading.value = isLoadingParam;
  isLoadMoreLoading.value = isLoadMore;
  getCryptoOffers(type).then((loadedOffers) => {
    isLoading.value = isLoadMoreLoading.value = false;
    if (isLoadMore) {
      offers.value = [...offers.value, ...loadedOffers];
    } else {
      offers.value = loadedOffers;
    }
  });
};

const handleSelect = (coin: Coin) => {
  selectedSingle.value = coin;
};

const handleSelectPayment = (payment: object[]) => {
  paymentTypesSelected.value = payment;
};

const handleSelectAmmount = (ammount: string) => {
  ammountSelected.value = ammount;
};

const handleSelectSort = (sort: string) => {
  sortItem.value = sort;
};

const handleClosePayment = () => {
  paymentTypesSelected.value = null;
};

const handleFiatClick = (fiat: Fiat) => {
  activeFiat.value = fiat;
};

const loadMore = () => {
  loadOffers(activeTab.value as "buy" | "sell", false, true);
};

// Lifecycle hooks
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
  handleResize();
  loadOffers("buy", true);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.p2p-home {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  font-family: Inter, sans-serif;

  @media (min-width: 1024px) {
    max-width: 532px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0 16px;
  }

  .divider {
    width: 100vw;
    position: relative;
    left: -16px;
    height: 1px;
    background-color: #2b2741;
  }

  .p2p-home__offer-container {
    margin-bottom: 16px;
    margin-top: 16px;
  }
}

.p2p-home__offers {
  flex: 1;

  &--loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .crypto-offer-card {
    margin: 10px 0 16px 0;
    padding: 0 8px;
  }

  .p2p-home__offer-container:last-child {
    margin-bottom: 0;
  }

  margin: 0 -16px 0 -12px;
}

.p2p-home__offer-load-more {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
}
</style>
