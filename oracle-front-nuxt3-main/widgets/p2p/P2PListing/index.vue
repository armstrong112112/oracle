<template>
  <div class="p2p-listing h-full">
    <div class="p2p-listing__container h-full">
      <div v-if="!isListEmpty" class="p2p-listing__list">
        <PageHeaderLayout v-if="isMobile" :title="$t('p2p.home')">
          <template #actions>
            <PlusIcon class="cursor-pointer" @click="handleCreateListing" />
          </template>
        </PageHeaderLayout>
        <Tabs
          size="sm"
          :tabs="tabsData"
          :active="activeTab"
          class="mb-20"
          @select="handleTabClick" />
        <div
          class="p2p-listing__offers custom-scrollbar"
          :class="{ 'p2p-listing__offers--loading': isLoading }">
          <Loader v-if="isLoading" type="bars" />
          <template v-else>
            <div
              v-for="offer in offers"
              :key="offer.id"
              class="p2p-listing__offer-container mb-10">
              <CryptoOfferCard
                :offer="offer"
                :is-my-offer="true"
                class="p2p-listing__offer"
                @edit="handleEdit" />
              <div class="divider mb-20" />
            </div>
            <div class="p2p-listing__offer-load-more mb-10">
              <new-oracle-button
                v-if="!isLoadMoreLoading && offers.length > 0"
                text="Load more"
                color="yellow"
                @click="loadMoreOffers" />
              <Loader v-else type="bars" />
            </div>
          </template>
        </div>
      </div>
      <div v-else class="p2p-listing__empty h-full">
        <div class="p2p-listing__empty-title">
          {{ $t("p2p.listing.empty") }}
        </div>
        <div class="p2p-listing__empty-description">
          {{ $t("p2p.listing.emptyDescription") }}
        </div>
        <div class="p2p-listing__empty-subdescription">
          {{ $t("p2p.listing.emptySubdescription") }}
        </div>
        <div class="p2p-listing__empty-button">
          <new-oracle-button
            :text="'+' + $t('p2p.listing.emptyButton')"
            color="yellow"
            @click="handleCreateListing" />
        </div>
      </div>
    </div>
    <BillsModal
      title="Create listing"
      :is-open="isBillsModalOpen"
      @close="handleCloseBillsModal">
      <P2PListingCreate v-if="step === 1" />
      <P2PListingCreateStepTwo v-if="step === 2" />
    </BillsModal>
    <BillsModal
      title="Edit listing"
      :is-open="isEditModalOpen"
      @close="handleCloseEditModal">
      <P2PEdit />
    </BillsModal>
  </div>
</template>

<script setup lang="ts">
import BillsModal from "~/components/bills-modal.vue";
import type { CryptoOffer } from "~/entities/p2p/model/cryptoOffer";
import { getCryptoOffers as getCryptoOffersApi } from "~/entities/p2p/model/cryptoOffer";
import CryptoOfferCard from "~/entities/p2p/ui/CryptoOfferCard.vue";
import type { TabItem } from "~/components/ui/Tabs.vue";
import PageHeaderLayout from "~/widgets/layout/PageHeader.vue";
import P2PListingCreate from "~/widgets/p2p/P2PListingCreate/index.vue";
import P2PListingCreateStepTwo from "~/widgets/p2p/P2PListingCreateStepTwo/index.vue";
import { useP2PCreateStore } from "~~/store/p2p/createStore";

import PlusIcon from "~/assets/svg/plus.svg?component";
import Loader from "~/components/ui/Loader.vue";
import Tabs from "~/components/ui/Tabs.vue";
import P2PEdit from "~/widgets/p2p/P2PEdit/index.vue";

// Use localePath if needed
const localePath = useLocalePath();
const router = useRouter();

// Get Pinia store
const p2pCreateStore = useP2PCreateStore();

// Reactive state
const windowWidth = ref(0);
const isBillsModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isLoading = ref(true);
const isLoadMoreLoading = ref(false);
const activeTab = ref("sell");
const offers = ref<CryptoOffer[]>([]);

// Computed properties
const isMobile = computed(() => windowWidth.value < 1024);

const isListEmpty = computed(
  () => offers.value.length === 0 && !isLoading.value
);

const step = computed(() => p2pCreateStore.getStep);

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
const loadMoreOffers = () => {
  isLoadMoreLoading.value = true;
  loadOffers(activeTab.value as "buy" | "sell", false, true);
};

const loadOffers = (
  type: "buy" | "sell",
  isLoadingParam: boolean = false,
  isLoadMore: boolean = false
) => {
  isLoading.value = isLoadingParam;
  isLoadMoreLoading.value = isLoadMore;
  getCryptoOffersApi(type).then((loadedOffers: CryptoOffer[]) => {
    if (isLoadMore) {
      offers.value = [...offers.value, ...loadedOffers];
    } else {
      // offers.value = loadedOffers
    }
    isLoading.value = isLoadMoreLoading.value = false;
  });
};

const handleCreateListing = () => {
  if (!isMobile.value) {
    isBillsModalOpen.value = true;
  } else {
    router.push("/p2p/listing/create");
  }
};

const handleCloseBillsModal = () => {
  isBillsModalOpen.value = false;
};

const handleEdit = (offer: CryptoOffer) => {
  if (!isMobile.value) {
    isEditModalOpen.value = true;
  } else {
    router.push(`/p2p/listing/edit/${offer.id}`);
  }
};

const handleCloseEditModal = () => {
  isEditModalOpen.value = false;
};

const handleTabClick = (tab: TabItem | (string | object)[]) => {
  if (
    typeof tab === "object" &&
    "value" in tab &&
    typeof tab.value === "string"
  ) {
    activeTab.value = tab.value;
    loadOffers(tab.value as "buy" | "sell", true);
  } else if (typeof tab === "string") {
    activeTab.value = tab;
    loadOffers(tab as "buy" | "sell", true);
  }
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle hooks
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
  handleResize();
  loadOffers(activeTab.value as "buy" | "sell", true);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.p2p-listing {
  height: 100%;
  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
  }
  &__empty {
    width: 100%;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }
    &-description {
      font-size: 16px;
      color: #8780cf;
      margin: 5px 0 15px 0;
    }
    &-subdescription {
      font-size: 14px;
      line-height: 20px;
      color: #8780cf;
    }
    &-button {
      margin-top: 20px;
      max-width: 300px;
      width: 100%;
    }
  }
  &__list {
    @media (min-width: 1024px) {
      max-width: 500px;
    }
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  &__offers {
    &--loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__offer {
    margin-bottom: 20px;
  }
  &__offer-load-more {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.divider {
  width: 100vw;
  position: relative;
  left: -16px;
  height: 1px;
  background-color: #2b2741;
}
</style>
