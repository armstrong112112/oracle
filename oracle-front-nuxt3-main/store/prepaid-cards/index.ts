import { defineStore } from "pinia";

export interface PrepaidCardState {
  currentCardIndex: number;
  isTransferModalVisible: boolean;
  isTopUpModalVisible: boolean;
  isWithdrawModalVisible: boolean;
  isNewCardModalVisible: boolean;
  inputAmount: number;
  feePercent: number;
  selectedCrypto: Crypto;
  isDropdownOpen: boolean;
  isModalVisible: boolean;
  modalTitle: string;
  modalButtonText: string;
  modalType: string;
  blockedText: string;
  localModals: Modals;
}

export interface Crypto {
  id: number;
  title: string;
  checked: boolean;
  icon: string;
}

export interface Modals {
  [key: string]: {
    isOpen: boolean;
    type: string;
    buttonType: string;
    successText?: string;
    isCancel?: boolean;
  };
}

export const usePrepaidCardsStore = defineStore("prepaid-cards", () => {
  // State
  const currentCardIndex = ref<number>(0);
  const isTransferModalVisible = ref<boolean>(false);
  const isTopUpModalVisible = ref<boolean>(false);
  const isWithdrawModalVisible = ref<boolean>(false);
  const isNewCardModalVisible = ref<boolean>(false);
  const inputAmount = ref<number>(0);
  const feePercent = ref<number>(1.11);
  const selectedCrypto = ref<Crypto>({
    id: 1,
    title: "USDT",
    checked: true,
    icon: "/icons/crypto/usdt.svg",
  });
  const isDropdownOpen = ref<boolean>(false);
  const isModalVisible = ref<boolean>(false);
  const modalTitle = ref<string>("");
  const modalButtonText = ref<string>("");
  const modalType = ref<string>("");
  const blockedText = ref<string>("Block");
  const localModals = ref<Modals>({});

  // Actions
  const setCurrentCardIndex = (index: number) => {
    currentCardIndex.value = index;
  };

  const setTransferModalVisible = (visible: boolean) => {
    isTransferModalVisible.value = visible;
  };

  const setTopUpModalVisible = (visible: boolean) => {
    isTopUpModalVisible.value = visible;
  };

  const setWithdrawModalVisible = (visible: boolean) => {
    isWithdrawModalVisible.value = visible;
  };

  const setNewCardModalVisible = (visible: boolean) => {
    isNewCardModalVisible.value = visible;
  };

  const setInputAmount = (amount: number) => {
    inputAmount.value = amount;
  };

  const setSelectedCrypto = (crypto: Crypto) => {
    selectedCrypto.value = crypto;
  };

  const setDropdownOpen = (open: boolean) => {
    isDropdownOpen.value = open;
  };

  const setModalVisible = (visible: boolean) => {
    isModalVisible.value = visible;
  };

  const setModalTitle = (title: string) => {
    modalTitle.value = title;
  };

  const setModalButtonText = (text: string) => {
    modalButtonText.value = text;
  };

  const setModalType = (type: string) => {
    modalType.value = type;
  };

  const setBlockedText = (text: string) => {
    blockedText.value = text;
  };

  const setLocalModals = (modals: Modals) => {
    localModals.value = modals;
  };

  const openModal = (modalName: string) => {
    if (localModals.value[modalName]) {
      localModals.value[modalName].isOpen = true;
    }
  };

  const closeModal = (modalName: string) => {
    if (localModals.value[modalName]) {
      localModals.value[modalName].isOpen = false;
    }
  };

  const resetPrepaidCards = () => {
    currentCardIndex.value = 0;
    isTransferModalVisible.value = false;
    isTopUpModalVisible.value = false;
    isWithdrawModalVisible.value = false;
    isNewCardModalVisible.value = false;
    inputAmount.value = 0;
    selectedCrypto.value = {
      id: 1,
      title: "USDT",
      checked: true,
      icon: "/icons/crypto/usdt.svg",
    };
    isDropdownOpen.value = false;
    isModalVisible.value = false;
    modalTitle.value = "";
    modalButtonText.value = "";
    modalType.value = "";
    blockedText.value = "Block";
  };

  // Getters
  const netAmount = computed(() => {
    const fee = (inputAmount.value * feePercent.value) / 100;
    return inputAmount.value - fee;
  });

  const netAmountInteger = computed(() => {
    return netAmount.value.toFixed(2).split(".")[0];
  });

  const netAmountDecimal = computed(() => {
    return netAmount.value.toFixed(2).split(".")[1];
  });

  const inputAmountInteger = computed(() => {
    return inputAmount.value.toFixed(2).split(".")[0];
  });

  const inputAmountDecimal = computed(() => {
    return inputAmount.value.toFixed(2).split(".")[1];
  });

  return {
    // State
    currentCardIndex,
    isTransferModalVisible,
    isTopUpModalVisible,
    isWithdrawModalVisible,
    isNewCardModalVisible,
    inputAmount,
    feePercent,
    selectedCrypto,
    isDropdownOpen,
    isModalVisible,
    modalTitle,
    modalButtonText,
    modalType,
    blockedText,
    localModals,
    // Actions
    setCurrentCardIndex,
    setTransferModalVisible,
    setTopUpModalVisible,
    setWithdrawModalVisible,
    setNewCardModalVisible,
    setInputAmount,
    setSelectedCrypto,
    setDropdownOpen,
    setModalVisible,
    setModalTitle,
    setModalButtonText,
    setModalType,
    setBlockedText,
    setLocalModals,
    openModal,
    closeModal,
    resetPrepaidCards,
    // Getters
    netAmount,
    netAmountInteger,
    netAmountDecimal,
    inputAmountInteger,
    inputAmountDecimal,
  };
});
