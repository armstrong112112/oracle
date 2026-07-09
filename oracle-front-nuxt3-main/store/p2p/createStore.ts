import { defineStore } from "pinia";
import { useApiClient } from "~/composables/useApiClient";
import type { Coin } from "~/entities/p2p/model/coins";
import type { Deadline } from "~/entities/p2p/model/deadline";
import type { Fiat } from "~/entities/p2p/model/fiat";
import type { PaymentType } from "~/entities/p2p/model/paymentType";
import {
  sanitizeP2PCoinsResponse,
  sanitizeP2PDeadlinesResponse,
  sanitizeP2PFiatResponse,
  sanitizeP2PPaymentTypesResponse,
} from "~/shared/types/api/sanitizers/p2p";

export const useP2PCreateStore = defineStore("p2pCreate", () => {
  const api = useApiClient();

  // State — инициализируем пустыми массивами, данные приходят с API
  const activeTab = ref("buy");
  const receiveCrypto = ref<Coin[]>([]);
  const receiveCryptoSelected = ref<Coin | null>(null);
  const fiatDataRef = ref<Fiat[]>([]);
  const fiatSelected = ref<Fiat | null>(null);
  const paymentTypesRef = ref<PaymentType[]>([]);
  const paymentTypesSelected = ref<PaymentType[]>([]);
  const windowWidth = ref(0);
  const step = ref(1);
  const exchangeRateCrypto = ref<number | null>(null);
  const exchangeRateFiat = ref<number | null>(null);
  const minTrade = ref(0.0);
  const maxTrade = ref(0.0);
  const deadlineRef = ref<Deadline[]>([]);
  const deadlineSelected = ref<Deadline | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // ──────────────────────────────────────────────
  // API fetch actions (данные с сервера, не хардкод)
  // ──────────────────────────────────────────────

  const fetchCoins = async (): Promise<void> => {
    error.value = null;
    try {
      const data = await api<unknown>("/p2p/coins");
      const response = sanitizeP2PCoinsResponse(data);
      receiveCrypto.value = response.coins as Coin[];
      if (!receiveCryptoSelected.value && receiveCrypto.value.length > 0) {
        receiveCryptoSelected.value = receiveCrypto.value[0];
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch coins";
    }
  };

  const fetchFiat = async (): Promise<void> => {
    error.value = null;
    try {
      const data = await api<unknown>("/p2p/fiat");
      const response = sanitizeP2PFiatResponse(data);
      fiatDataRef.value = response.fiat as Fiat[];
      if (!fiatSelected.value && fiatDataRef.value.length > 0) {
        fiatSelected.value = fiatDataRef.value[0];
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch fiat";
    }
  };

  const fetchPaymentMethods = async (): Promise<void> => {
    error.value = null;
    try {
      const data = await api<unknown>("/p2p/payment-methods");
      const response = sanitizeP2PPaymentTypesResponse(data);
      paymentTypesRef.value = response.paymentTypes as PaymentType[];
      if (paymentTypesSelected.value.length === 0 && paymentTypesRef.value.length > 0) {
        paymentTypesSelected.value = [paymentTypesRef.value[0]];
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch payment methods";
    }
  };

  const fetchDeadlines = async (): Promise<void> => {
    error.value = null;
    try {
      const data = await api<unknown>("/p2p/deadlines");
      const response = sanitizeP2PDeadlinesResponse(data);
      deadlineRef.value = response.deadlines as Deadline[];
      if (!deadlineSelected.value && deadlineRef.value.length > 0) {
        deadlineSelected.value = deadlineRef.value[0];
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch deadlines";
    }
  };

  /** Загружает все справочники за один вызов */
  const fetchAll = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    await Promise.all([fetchCoins(), fetchFiat(), fetchPaymentMethods(), fetchDeadlines()]);
    isLoading.value = false;
  };

  // ──────────────────────────────────────────────
  // Mutations
  // ──────────────────────────────────────────────

  const setActiveTab = (tab: string): void => { activeTab.value = tab; };
  const setReceiveCryptoSelected = (crypto: Coin): void => { receiveCryptoSelected.value = crypto; };
  const setFiatSelected = (fiat: Fiat): void => { fiatSelected.value = fiat; };
  const setPaymentTypesSelected = (types: PaymentType[]): void => { paymentTypesSelected.value = types; };
  const setStep = (stepValue: number): void => { step.value = stepValue; };
  const setExchangeRateCrypto = (val: number): void => { exchangeRateCrypto.value = val; };
  const setExchangeRateFiat = (val: number): void => { exchangeRateFiat.value = val; };
  const setMinTrade = (val: number): void => { minTrade.value = val; };
  const setMaxTrade = (val: number): void => { maxTrade.value = val; };
  const setDeadlineSelected = (dl: Deadline): void => { deadlineSelected.value = dl; };

  // Actions (handlers для компонентов)
  const handleTabChange = (tab: string) => setActiveTab(tab);
  const handleReceiveCryptoSelect = (crypto: Coin) => setReceiveCryptoSelected(crypto);
  const handleFiatSelect = (fiat: Fiat) => setFiatSelected(fiat);
  const handlePaymentTypesSelect = (types: PaymentType[]) => setPaymentTypesSelected(types);
  const handleStepChange = (s: number) => setStep(s);
  const handleExchangeRateCryptoChange = (val: number) => setExchangeRateCrypto(val);
  const handleExchangeRateFiatChange = (val: number) => setExchangeRateFiat(val);
  const handleMinTradeChange = (val: number) => setMinTrade(val);
  const handleMaxTradeChange = (val: number) => setMaxTrade(val);
  const handleDeadlineSelect = (dl: Deadline) => setDeadlineSelected(dl);

  // Getters
  const getActiveTab = computed(() => activeTab.value);
  const getReceiveCrypto = computed(() => receiveCrypto.value);
  const getReceiveCryptoSelected = computed(() => receiveCryptoSelected.value);
  const getFiatData = computed(() => fiatDataRef.value);
  const getFiatSelected = computed(() => fiatSelected.value);
  const getPaymentTypes = computed(() => paymentTypesRef.value);
  const getPaymentTypesSelected = computed(() => paymentTypesSelected.value);
  const isListEmpty = computed(() =>
    receiveCrypto.value.length === 0 &&
    fiatDataRef.value.length === 0 &&
    paymentTypesRef.value.length === 0 &&
    deadlineRef.value.length === 0
  );
  const isAllElementsSelected = computed(
    () => receiveCryptoSelected.value && fiatSelected.value && paymentTypesSelected.value.length > 0
  );
  const getTabs = computed(() => [
    { title: "Buy crypto", value: "buy" },
    { title: "Sell crypto", value: "sell" },
  ]);
  const getStep = computed(() => step.value);
  const getExchangeRateCrypto = computed(() => exchangeRateCrypto.value);
  const getExchangeRateFiat = computed(() => exchangeRateFiat.value);
  const getMinTrade = computed(() => minTrade.value);
  const getMaxTrade = computed(() => maxTrade.value);
  const getDeadline = computed(() => deadlineRef.value);
  const getDeadlineSelected = computed(() => deadlineSelected.value);

  return {
    // State
    activeTab, receiveCrypto, receiveCryptoSelected,
    fiatData: fiatDataRef, fiatSelected,
    paymentTypes: paymentTypesRef, paymentTypesSelected,
    windowWidth, step, exchangeRateCrypto, exchangeRateFiat,
    minTrade, maxTrade, deadline: deadlineRef, deadlineSelected,
    isLoading, error,
    // API fetch
    fetchCoins, fetchFiat, fetchPaymentMethods, fetchDeadlines, fetchAll,
    // Mutations
    setActiveTab, setReceiveCryptoSelected, setFiatSelected, setPaymentTypesSelected,
    setStep, setExchangeRateCrypto, setExchangeRateFiat, setMinTrade, setMaxTrade, setDeadlineSelected,
    // Actions
    handleTabChange, handleReceiveCryptoSelect, handleFiatSelect, handlePaymentTypesSelect,
    handleStepChange, handleExchangeRateCryptoChange, handleExchangeRateFiatChange,
    handleMinTradeChange, handleMaxTradeChange, handleDeadlineSelect,
    // Getters
    getActiveTab, getReceiveCrypto, getReceiveCryptoSelected, getFiatData, getFiatSelected,
    getPaymentTypes, getPaymentTypesSelected, isListEmpty, isAllElementsSelected,
    getTabs, getStep, getExchangeRateCrypto, getExchangeRateFiat,
    getMinTrade, getMaxTrade, getDeadline, getDeadlineSelected,
  };
});
