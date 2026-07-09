import { defineStore } from "pinia";
import { ref } from "vue";
// eslint-disable-next-line import/named
import type {
  CreationData,
  VerificationData,
} from "@/store/verification/verification.types";

export const useVerificationStore = defineStore("verification", () => {
  // State
  const verificationData = ref<VerificationData>({
    category: [{ title: "", price: 0, id: 0 }],
    verificationPeriod: "",
    description: "",
    links: [
      { link: "", description: "" },
      { link: "", description: "" },
      { link: "", description: "" },
      { link: "", description: "" },
    ],
    contacts: {
      telegram: "",
      matrix: "",
      signal: "",
      whatsapp: "",
      forum1: "",
      forum2: "",
    },
    screenshots: [] as string[],
  });

  const verificationCreationListData = ref<CreationData>({
    promoText: "",
    links: [{ link: "", description: "" }],
    moderatorText: "",
    screenshots: [] as string[],
  });

  const isProcessed = ref<boolean>(false);
  const isCreationProcessed = ref<boolean>(false);

  // Actions (formerly mutations)
  const setVerificationData = (
    data: VerificationData & { isProcessed?: boolean }
  ): void => {
    const isProcessedValue = data.isProcessed ?? true;

    verificationData.value = {
      ...verificationData.value,
      ...data,
    };
    isProcessed.value = isProcessedValue;
  };

  const setVerificationCreationData = (
    data: CreationData & { isCreationProcessed?: boolean }
  ): void => {
    const isProcessedValue = data.isCreationProcessed ?? true;

    verificationCreationListData.value = {
      ...verificationCreationListData.value,
      ...data,
    };
    isCreationProcessed.value = isProcessedValue;
  };

  const resetVerification = (): void => {
    verificationData.value = {
      category: [{ title: "", price: 0, id: 141 }],
      verificationPeriod: "",
      description: "",
      links: [
        { link: "", description: "" },
        { link: "", description: "" },
        { link: "", description: "" },
        { link: "", description: "" },
      ],
      contacts: {
        telegram: "",
        matrix: "",
        signal: "",
        whatsapp: "",
        forum1: "",
        forum2: "",
      },
      screenshots: [],
    };
    isProcessed.value = false;
  };

  const resetCreation = (): void => {
    verificationCreationListData.value = {
      promoText: "",
      links: [{ link: "", description: "" }],
      moderatorText: "",
      screenshots: [],
    };
    isCreationProcessed.value = false;
  };

  const UpdateData = (): void => {
    isProcessed.value = false;
  };

  const UpdateCreationData = (): void => {
    isCreationProcessed.value = false;
  };

  return {
    // State
    verificationData,
    verificationCreationListData,
    isProcessed,
    isCreationProcessed,
    // Actions
    setVerificationData,
    setVerificationCreationData,
    resetVerification,
    resetCreation,
    UpdateData,
    UpdateCreationData,
  };
});
