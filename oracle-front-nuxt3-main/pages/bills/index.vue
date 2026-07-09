<template>
  <div class="whitelist desktop_bills_page notification relative p-0 mt-0">
    <div class="flex flex-col gap-12">
      <div class="show_mobile">
        <ClientOnly>
          <PageHeader
            :plus-link="localePath('/bills/creating')"
            :title="$t('bills.bills')"
            :is-plus="true" />
        </ClientOnly>
      </div>

      <!-- PC Version Header -->
      <div class="pc-bills-header show_desktop">
        <div class="pc-bills-tabs-section">
          <div class="pc-bills-tabs">
            <div
              class="pc-tab"
              :class="{ active: selectedTab === 'All' }"
              @click="setTab('All')">
              {{ $t("bills.all") }}
            </div>
            <div
              class="pc-tab"
              :class="{ active: selectedTab === 'Active Bills' }"
              @click="setTab('Active Bills')">
              {{ $t("bills.activeBills") }}
            </div>
            <div
              class="pc-tab"
              :class="{ active: selectedTab === 'Paid Bills' }"
              @click="setTab('Paid Bills')">
              {{ $t("bills.paidBills") }}
            </div>
          </div>
          <ClientOnly>
            <div class="pc-bills-actions">
              <div class="pc-filter-button" @click="toggleCategoryDialog">
                <img src="/icons/bills/filter.svg" alt="filter" />
              </div>
              <button class="pc-plus-button" @click="openCreatingModal">
                <img src="/svg/white-plus.svg" alt="" />
              </button>
              <button class="pc-bill-pay-button" @click="openPaymentModal">
                <CustomButton
                  :value="$t('bills.billPay')"
                  type="primary"
                  style="padding: 0 16px" />
              </button>
            </div>
          </ClientOnly>
        </div>
        <BillsFilterModal
          :is-open="isCategoryDialogOpen"
          @close="toggleCategoryDialog"
          @save="handleFilterSave" />
      </div>

      <!-- Mobile Filter -->
      <BillsFilter
        class="show_mobile"
        v-model:isDialogVisible="isCategoryDialogOpen"
        :hide-choose-button="true" />

      <!-- Mobile Version -->
      <div class="show_mobile">
        <BillsHeader />
        <Stories style="margin-top: 0" />
      </div>
 
      <div v-if="pending" class="flex flex-col gap-12">
        <SkeletonLoader height="76px" border-radius="12px" />
        <SkeletonLoader height="76px" border-radius="12px" />
        <SkeletonLoader height="76px" border-radius="12px" />
      </div>

      <ErrorState
        v-else-if="billsError"
        title="Failed to load bills"
        :message="billsError.message || 'Please try again.'"
        @retry="handleRetryBills" />

      <EmptyState
        v-else-if="!hasBills"
        title="No bills yet"
        message="Create your first bill to see it here."
        action-label="Create bill"
        @action="navigateTo(localePath('/bills/creating'))"
      />

      <BillsList
        v-else
        :selected-tab="selectedTab"
        @update:selected-tab="setTab"
        @open-created-modal="openCreatedModal" />

      <div class="mixing-footer mt-20 show_mobile">
        <nuxt-link :to="localePath('/bills/creating')" class="w-full">
          <CustomButton
            :value="$t('bills.billPay')"
            type="primary"
            class="w-full" />
        </nuxt-link>
      </div>
    </div>

    <!-- PC Modals -->
    <BillsModal
      class="show_desktop"
      :is-open="isCreatingModalOpen"
      :title="$t('bills.billCreation')"
      @close="closeCreatingModal">
      <BillCreating @created="onBillCreated" />
    </BillsModal>

    <BillsModal
      class="show_desktop"
      :is-open="isPaymentModalOpen"
      :title="$t('bills.billPayment')"
      @close="closePaymentModal">
      <BillPayment @paid="onBillPaid" />
    </BillsModal>

    <BillsModal
      class="show_desktop"
      :is-open="isCreatedModalOpen"
      :title="$t('bills.created')"
      @close="closeCreatedModal">
      <BillCreated @close="closeCreatedModal" @void="handleVoidBill" />
    </BillsModal>

    <BillsModal
      class="show_desktop"
      :is-open="isPreFinishedModalOpen"
      :title="$t('bills.billPreFinished')"
      @close="closePreFinishedModal">
      <BillPreFinished
        @close="closePreFinishedModal"
        @viewDetails="handleViewDetails" />
    </BillsModal>
  </div>
</template>
<script setup lang="ts">
import BillsModal from "~/components/bills-modal.vue";
import BillCreated from "~/components/bills/bill-created.vue";
import BillCreating from "~/components/bills/bill-creating.vue";
import BillPayment from "~/components/bills/bill-payment.vue";
import BillPreFinished from "~/components/bills/bill-pre-finished.vue";
import BillsFilterModal from "~/components/bills/bills-filter-modal.vue";
import ErrorState from "~/components/ui/ErrorState.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";
import type { Bill } from "~/entities/bills/data/BillsData";
import Stories from "~/entities/oracle-pay/ui/stories/stories.vue";
import CustomButton from "~/components/ui/Button.vue";
import { useBillsStore } from "~/store/bills";
import BillsFilter from "~/widgets/bills/BillsFilter/index.vue";
import BillsHeader from "~/widgets/bills/BillsHeader/index.vue";
import BillsList from "~/widgets/bills/BillsList/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

const localePath = useLocalePath();
const billsStore = useBillsStore();

const {
  data: billsResponse,
  pending,
  error: billsError,
  refresh: refreshBills,
} = await useApiFetch<{ bills: Bill[] }>("/bills", {
  method: "GET",
  query: { page: 1, pageSize: 20 },
});

watch(
  () => (billsResponse.value as { bills?: Bill[] } | undefined)?.bills,
  (items) => {
    if (Array.isArray(items)) {
      billsStore.setBills(items);
    }
  },
  { immediate: true }
);

const hasBills = computed(() => billsStore.bills.length > 0);

const handleRetryBills = () => {
  refreshBills();
};

const selectedTab = computed({
  get: () => billsStore.selectedTab,
  set: (value: string) => billsStore.setSelectedTab(value),
});

const isCategoryDialogOpen = computed({
  get: () => billsStore.isCategoryDialogOpen,
  set: (value: boolean) => {
    if (value) billsStore.toggleCategoryDialog();
  },
});

const isCreatingModalOpen = computed({
  get: () => billsStore.isCreatingModalOpen,
  set: (value: boolean) => {
    if (value) billsStore.openCreatingModal();
    else billsStore.closeCreatingModal();
  },
});

const isPaymentModalOpen = computed({
  get: () => billsStore.isPaymentModalOpen,
  set: (value: boolean) => {
    if (value) billsStore.openPaymentModal();
    else billsStore.closePaymentModal();
  },
});

const isCreatedModalOpen = computed({
  get: () => billsStore.isCreatedModalOpen,
  set: (value: boolean) => {
    if (value) billsStore.openCreatedModal();
    else billsStore.closeCreatedModal();
  },
});

const isPreFinishedModalOpen = computed({
  get: () => billsStore.isPreFinishedModalOpen,
  set: (value: boolean) => {
    if (value) billsStore.openPreFinishedModal();
    else billsStore.closePreFinishedModal();
  },
});

const setTab = (tab: string) => {
  billsStore.setSelectedTab(tab);
};

const toggleCategoryDialog = () => {
  billsStore.toggleCategoryDialog();
};

const openCreatingModal = () => {
  billsStore.openCreatingModal();
};

const openPaymentModal = () => {
  billsStore.openPaymentModal();
};

const closeCreatingModal = () => {
  billsStore.closeCreatingModal();
};

const closePaymentModal = () => {
  billsStore.closePaymentModal();
};

const onBillCreated = () => {
  billsStore.closeCreatingModal();
  billsStore.openCreatedModal();
};

const onBillPaid = () => {
  billsStore.closePaymentModal();
  billsStore.openPreFinishedModal();
};

const closeCreatedModal = () => {
  billsStore.closeCreatedModal();
};

const closePreFinishedModal = () => {
  billsStore.closePreFinishedModal();
};

const handleShare = () => {
  // Handle share functionality
  console.log("Share bill");
};

const handleViewDetails = () => {
  // Handle view details functionality
  console.log("View details");
};

const handleFilterSave = (filterData: any) => {
  billsStore.setFilterOptions(filterData);
  console.log("Filter saved:", filterData);
};

const openCreatedModal = (item: Bill) => {
  billsStore.openCreatedModal(item);
};

const handleVoidBill = () => {
  // Обработка кнопки "Void this bill"
  console.log("Void bill clicked");
  closeCreatedModal();
};
definePageMeta({
  layout: "sidebar",
});
</script>
<style lang="scss">
.desktop_bills_page {
  max-width: 800px !important;
}

.mixing-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  border-top: 1px solid #2b2741;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #13121b;
  z-index: 999;
  left: 0;
  right: 0;
}

// Responsive visibility classes
.show_mobile {
  display: block;
}

.show_desktop {
  display: none;
}

@media (min-width: 1024px) {
  .show_mobile {
    display: none;
  }

  .show_desktop {
    display: block;
  }
}

// PC Version Styles
.pc-bills-header {
  display: none;
}
@media (min-width: 1024px) {
  .pc-bills-header {
    display: flex;
    width: 100%;
  }
  .pc-bills-tabs-section {
    width: 100%;
  }
}

.pc-bills-tabs-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.pc-bills-tabs {
  border-bottom: 1px solid #2b2741;
  display: flex;
  gap: 32px;
  align-items: center;
  flex: 1;
}

.pc-tab {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: white;
  border-bottom: 2px solid transparent;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #f64e2a;
  }

  &.active {
    border-bottom: 2px solid #f64e2a;
    color: #f64e2a;
    font-weight: 500;
  }
}

.pc-bills-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pc-filter-button {
  min-width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #181720;
  border: 1px solid #2b2741;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2b2741;
  }
}

.pc-plus-button {
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f64e2a;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background: #e3300a;
  }
}

.pc-bill-pay-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
