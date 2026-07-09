import { defineStore } from "pinia";
import type { MixingItem } from "~/entities/mixing/data/mixes";

export interface MixingState {
  selectedTab: string;
  activeModal: string | null;
  currentStep: number;
  isButtonEnabled: boolean;
  buttonType: string;
  inputAmount: number;
  feePercent: number;
  selectedMode: string;
  addresses: Address[];
  mixingData: MixingItem[];
}

export interface Address {
  input: string;
  amount: string;
  fee: number;
  netAmount: number;
  netAmountInteger: string;
  netAmountDecimal: string;
}

export const useMixingStore = defineStore("mixing", () => {
  // State
  const selectedTab = ref<string>("All");
  const activeModal = ref<string | null>(null);
  const currentStep = ref<number>(0);
  const isButtonEnabled = ref<boolean>(false);
  const buttonType = ref<string>("confirm");
  const inputAmount = ref<number>(0);
  const feePercent = ref<number>(1.11);
  const selectedMode = ref<string>("slow");
  const addresses = ref<Address[]>([
    {
      input: "",
      amount: "0",
      fee: 0.05,
      netAmount: 0,
      netAmountInteger: "0",
      netAmountDecimal: "00",
    },
  ]);
  const mixingData = ref<MixingItem[]>([]);

  // Actions
  const setSelectedTab = (tab: string) => {
    selectedTab.value = tab;
  };

  const setActiveModal = (modal: string | null) => {
    activeModal.value = modal;
  };

  const setCurrentStep = (step: number) => {
    currentStep.value = step;
  };

  const setIsButtonEnabled = (enabled: boolean) => {
    isButtonEnabled.value = enabled;
  };

  const setButtonType = (type: string) => {
    buttonType.value = type;
  };

  const setInputAmount = (amount: number) => {
    inputAmount.value = amount;
  };

  const setSelectedMode = (mode: string) => {
    selectedMode.value = mode;
  };

  const addAddress = () => {
    if (addresses.value.length < 3) {
      addresses.value.push({
        input: "",
        amount: "0",
        fee: 0.05,
        netAmount: 0,
        netAmountInteger: "0",
        netAmountDecimal: "00",
      });
    }
  };

  const removeAddress = (index: number) => {
    if (index > 0) {
      addresses.value.splice(index, 1);
    }
  };

  const updateAddress = (index: number, address: Partial<Address>) => {
    if (addresses.value[index]) {
      addresses.value[index] = { ...addresses.value[index], ...address };
    }
  };

  const setMixingData = (data: MixingItem[]) => {
    mixingData.value = data;
  };

  const resetMixing = () => {
    selectedTab.value = "All";
    activeModal.value = null;
    currentStep.value = 0;
    isButtonEnabled.value = false;
    buttonType.value = "confirm";
    inputAmount.value = 0;
    selectedMode.value = "slow";
    addresses.value = [
      {
        input: "",
        amount: "0",
        fee: 0.05,
        netAmount: 0,
        netAmountInteger: "0",
        netAmountDecimal: "00",
      },
    ];
  };

  // Getters
  const filteredData = computed(() => {
    if (selectedTab.value === "Active Mixes") {
      return mixingData.value.filter((item) => item.status === "active");
    } else if (selectedTab.value === "Completed Mixes") {
      return mixingData.value.filter((item) => item.status === "completed");
    }
    return mixingData.value;
  });

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

  return {
    // State
    selectedTab,
    activeModal,
    currentStep,
    isButtonEnabled,
    buttonType,
    inputAmount,
    feePercent,
    selectedMode,
    addresses,
    mixingData,
    // Actions
    setSelectedTab,
    setActiveModal,
    setCurrentStep,
    setIsButtonEnabled,
    setButtonType,
    setInputAmount,
    setSelectedMode,
    addAddress,
    removeAddress,
    updateAddress,
    setMixingData,
    resetMixing,
    // Getters
    filteredData,
    netAmount,
    netAmountInteger,
    netAmountDecimal,
  };
});
