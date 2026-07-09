<template>
  <div class="checks-main">
    <block-home v-if="!isMobile" />
    <div class="checks-main__content">
      <!-- ????????? ??? ????????? ????????? -->
      <block-nav-back
        to="#"
        :addto="
          isMobile ? localePath('/checks/check-creation?step=1') : undefined
        "
        :text="$t('checks.title')"
        :add="true"
        @add="isMobile ? undefined : openCheckCreationModal()"
        v-if="isMobile" />

      <block-home v-if="isMobile" />
      <coin-filter-button
        v-if="isMobile"
        :crypto-list="cryptoList"
        :initial-selected="selectedItems"
        details
        @selection-change="(value) => onSelectionChange(value)" />
      <div class="checks-filter">
        <div class="filter-head">
          <div class="filter-buttons">
            <button
              v-for="button in filterButtons"
              :key="button.id"
              class="filter-btn"
              :class="{ active: filter === button.filterValue }"
              @click="setFilter(button.filterValue)">
              {{ button.label }}
            </button>
          </div>
          <div class="dropdown">
            <button class="arrow-sort__btn" @click="dropdown = !dropdown">
              <ArrowSortIcon />
            </button>
            <div class="dropdown-menu" :class="{ show: dropdown }">
              <div class="dropdown-item">
                <button
                  class="sort-btn"
                  :class="{ active: sortDropdownType === 'sum' }"
                  @click="sortChecks('sum')">
                  {{ $t("checks.bySum") }}
                </button>
              </div>
              <div class="dropdown-item">
                <button
                  class="sort-btn"
                  :class="{ active: sortDropdownType === 'date' }"
                  @click="sortChecks('date')">
                  {{ $t("checks.byTime") }}
                </button>
              </div>
            </div>
          </div>
          <coin-filter-button
            v-if="!isMobile"
            :crypto-list="cryptoList"
            :initial-selected="selectedItems"
            details
            @selection-change="(value) => onSelectionChange(value)" />
          <!-- ??????? ?????? ???????? ???? ??? ?? -->
          <button
            v-if="!isMobile"
            @click="openCheckCreationModal()"
            class="create-check-circle-btn"
            title="??????? ???">
            <img src="/assets/svg/add-icon.svg" alt="add" />
          </button>
        </div>
        <check-list
          :checks="filteredAndSortedChecks"
          @open-check-details="openCheckDetailsModal" />
      </div>
    </div>

    <!-- ????????? ???? ??? ???????? -->
    <bills-modal
      v-if="!isMobile"
      :is-open="activeModal === 'check-creation'"
      :title="$t('checks.checkCreation')"
      @close="closeModal"
      max-width="600px">
      <CheckCreationModal @close="closeModal" />
    </bills-modal>

    <bills-modal
      v-if="!isMobile"
      :is-open="activeModal === 'active-checks'"
      :title="$t('checks.activeChecks')"
      @close="closeModal">
      <ActiveChecksModal @close="closeModal" />
    </bills-modal>

    <!-- ????????? ???? ??? ??????? ???? -->
    <bills-modal
      v-if="!isMobile"
      :is-open="activeModal === 'check-details'"
      :title="$t('checks.checkNumber')"
      @close="closeModal">
      <CheckDetailsContent
        :check="selectedCheck"
        :is-modal="true"
        @close="closeModal" />
    </bills-modal>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/assets/svg/arrow-back.svg?component";
import ArrowSortIcon from "@/assets/svg/arrow-sort.svg?component";
import BillsModal from "~/components/bills-modal.vue";
import ActiveChecksModal from "~/components/checks/ActiveChecksModal.vue";
import CheckCreationModal from "~/components/checks/CheckCreationModal.vue";
import CheckDetailsContent from "~/components/checks/CheckDetailsContent.vue";
import CheckList from "~/components/checks/checkList.vue";
import CoinFilterButton from "~/components/coins/coinFilterButton.vue";
import { useApiClient } from "~/composables/useApiClient";
import type { CheckItem } from "~/entities/checks/model/checks.types";
import type { ChecksListResponseDto } from "~/shared/types/api/checks";

interface Item {
  id: number;
  img: string;
  name: string;
  selected: boolean;
}

// Use localePath if needed
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();
const api = useApiClient();

// Define layout
definePageMeta({
  layout: "sidebar",
});

// Reactive state
const allCheck = ref(false);
const filterModal = ref(false);
const dropdown = ref<boolean>(false);
const filter = ref<string>("All");
const sortDropdownType = ref<"sum" | "date" | null>("sum");
const sortAsc = ref<boolean>(true);
const selectedItems = ref<string[]>([]);
const windowWidth = ref<number>(1920);
const activeModal = ref<string | null>(null);
const selectedCheck = ref<CheckItem | null>(null);
const localData = ref<Item[]>([]);

// Computed properties
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024;
});

const { t } = useI18n();

const filterButtons = computed(() => [
  {
    id: "all",
    label: t("checks.allChecks"),
    filterValue: "All",
  },
  {
    id: "claimed",
    label: t("checks.claimedChecks"),
    filterValue: "Claimed",
  },
  {
    id: "unclaimed",
    label: t("checks.unclaimedChecks"),
    filterValue: "Unclaimed",
  },
]);

const cryptoList = computed(() => [
  {
    id: 1,
    img: '/svg/litecoin-ltc.svg',
    name: t("checks.litecoin"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 2,
    img: '/svg/bitcoin.svg',
    name: t("checks.xrp"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 3,
    img: '/svg/bitcoin.svg',
    name: t("checks.bitcoin"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 4,
    img: '/svg/bitcoin.svg',
    name: t("checks.etherium"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 5,
    img: '/svg/tether-usdt.svg',
    name: t("checks.usdt"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 6,
    img: '/svg/tether-usdt.svg',
    name: t("checks.bnb"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
]);

const allChecks = ref<CheckItem[]>([]);

const filteredAndSortedChecks = computed((): CheckItem[] => {
  let result = [...allChecks.value];

  if (filter.value === "Claimed") {
    result = result.filter((item) => item.status === "Claimed");
  } else if (filter.value === "Unclaimed") {
    result = result.filter((item) => item.status === "Unclaimed");
  }

  if (sortDropdownType.value === "sum") {
    result.sort((a, b) => {
      const aVal = parseFloat(
        a.usdValue.replace(/[^\d.-]/g, "").replace(/\s/g, "")
      );
      const bVal = parseFloat(
        b.usdValue.replace(/[^\d.-]/g, "").replace(/\s/g, "")
      );
      return sortAsc.value ? bVal - aVal : aVal - bVal;
    });
  } else if (sortDropdownType.value === "date") {
    result.sort((a, b) => {
      const aDate = new Date(a.createdOn);
      const bDate = new Date(b.createdOn);
      return sortAsc.value
        ? bDate.getTime() - aDate.getTime()
        : aDate.getTime() - bDate.getTime();
    });
  }

  return result;
});

// Methods
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  updateLayout();
};

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? "" : "sidebar";
  // Layout is handled by definePageMeta
};

const ClickOutside = (event: MouseEvent) => {
  const dropdownEl = document.querySelector(".dropdown");
  if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
    dropdown.value = false;
  }
};

const fetchChecks = async () => {
  try {
    const response = await api<ChecksListResponseDto>("/checks");
    allChecks.value = response.checks ?? [];
  } catch (error) {
    console.error("Failed to fetch checks", error);
    allChecks.value = [];
  }
};

const openCheckCreationModal = () => {
  activeModal.value = "check-creation";
};

const openCheckDetailsModal = (check: CheckItem) => {
  selectedCheck.value = check;
  activeModal.value = "check-details";
};

const closeModal = () => {
  activeModal.value = null;
  selectedCheck.value = null;
};

const setFilter = (value: string) => {
  filter.value = value;
};

const sortChecks = (criteria: "sum" | "date") => {
  if (sortDropdownType.value === criteria) {
    sortAsc.value = true;
  } else {
    sortDropdownType.value = criteria;
    sortAsc.value = true;
  }
};

const onSelectionChange: (selected: string | string[]) => void = (selected) => {
  selectedItems.value = Array.isArray(selected) ? selected : [selected];
};

// Lifecycle hooks
onMounted(() => {
  void fetchChecks();
  document.addEventListener("click", ClickOutside);
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    updateLayout();
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", ClickOutside);
  if (import.meta.client) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<style lang="scss">
@use "@/assets/styles/pages/_checks.scss" as *;
</style>
