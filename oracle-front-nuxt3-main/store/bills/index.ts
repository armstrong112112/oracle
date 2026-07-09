import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useApiClient } from "~/composables/useApiClient";
import {
  sanitizeBillsListResponse,
  type BillDto,
} from "~/shared/types/api/sanitizers/bills";

export const useBillsStore = defineStore("bills", () => {
  const api = useApiClient();

  // State
  const bills = ref<BillDto[]>([]);
  const selectedTab = ref<string>("All");
  const isCategoryDialogOpen = ref<boolean>(false);
  const isCreatingModalOpen = ref<boolean>(false);
  const isPaymentModalOpen = ref<boolean>(false);
  const isCreatedModalOpen = ref<boolean>(false);
  const isPreFinishedModalOpen = ref<boolean>(false);
  const currentBill = ref<BillDto | null>(null);
  const filterOptions = ref<{ amount: string; order: string }>({
    amount: "",
    order: "",
  });
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Getters (computed)
  const filteredBills = computed(() => {
    if (selectedTab.value === "Active Bills") {
      return bills.value.filter((bill: BillDto) => bill.type === "active");
    } else if (selectedTab.value === "Paid Bills") {
      return bills.value.filter((bill: BillDto) => bill.type === "paid");
    }
    return bills.value;
  });

  const activeBills = computed(() =>
    bills.value.filter((bill: BillDto) => bill.type === "active")
  );

  const paidBills = computed(() =>
    bills.value.filter((bill: BillDto) => bill.type === "paid")
  );

  // Actions
  const setBills = (newBills: BillDto[]) => {
    bills.value = newBills;
  };

  const setSelectedTab = (tab: string) => {
    selectedTab.value = tab;
  };

  const toggleCategoryDialog = () => {
    isCategoryDialogOpen.value = !isCategoryDialogOpen.value;
  };

  const openCreatingModal = () => {
    isCreatingModalOpen.value = true;
  };

  const closeCreatingModal = () => {
    isCreatingModalOpen.value = false;
  };

  const openPaymentModal = () => {
    isPaymentModalOpen.value = true;
  };

  const closePaymentModal = () => {
    isPaymentModalOpen.value = false;
  };

  const openCreatedModal = (bill?: BillDto) => {
    if (bill) {
      currentBill.value = bill;
    }
    isCreatedModalOpen.value = true;
  };

  const closeCreatedModal = () => {
    isCreatedModalOpen.value = false;
    currentBill.value = null;
  };

  const openPreFinishedModal = () => {
    isPreFinishedModalOpen.value = true;
  };

  const closePreFinishedModal = () => {
    isPreFinishedModalOpen.value = false;
  };

  const setFilterOptions = (options: { amount: string; order: string }) => {
    filterOptions.value = options;
  };

  const addBill = (bill: BillDto) => {
    bills.value.unshift(bill);
  };

  const updateBill = (id: number, updates: Partial<BillDto>) => {
    const index = bills.value.findIndex((bill: BillDto) => bill.id === id);
    if (index !== -1) {
      bills.value[index] = { ...bills.value[index], ...updates };
    }
  };

  const deleteBill = (id: number) => {
    const index = bills.value.findIndex((bill: BillDto) => bill.id === id);
    if (index !== -1) {
      bills.value.splice(index, 1);
    }
  };

  // API Action with backend contract
  const fetchBills = async (page: number = 1, pageSize: number = 20) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await api<unknown>("/bills", {
        method: "GET",
        query: {
          page,
          pageSize,
        },
      });

      const payload = sanitizeBillsListResponse(response);
      setBills(payload.bills);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch bills";
      error.value = errorMessage;
      console.error("Error fetching bills:", errorMessage);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    bills,
    selectedTab,
    isCategoryDialogOpen,
    isCreatingModalOpen,
    isPaymentModalOpen,
    isCreatedModalOpen,
    isPreFinishedModalOpen,
    currentBill,
    filterOptions,
    isLoading,
    error,

    // Getters
    filteredBills,
    activeBills,
    paidBills,

    // Actions
    setBills,
    setSelectedTab,
    toggleCategoryDialog,
    openCreatingModal,
    closeCreatingModal,
    openPaymentModal,
    closePaymentModal,
    openCreatedModal,
    closeCreatedModal,
    openPreFinishedModal,
    closePreFinishedModal,
    setFilterOptions,
    addBill,
    updateBill,
    deleteBill,
    fetchBills,
  };
});
