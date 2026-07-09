import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useApiClient} from "~/composables/useApiClient";
import {
  type PaymentDto,
  type PaymentListResponseDto,
  sanitizePayment,
  sanitizePaymentListResponse,
} from "~/shared/types/api/sanitizers/payment";

export const usePaymentStore = defineStore("payment", () => {
  const api = useApiClient();
  const payments = ref<PaymentDto[]>([]);
  const currentPayment = ref<PaymentDto | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const setPayments = (items: PaymentDto[]) => {
    payments.value = items;
  };

  const setCurrentPayment = (item: PaymentDto | null) => {
    currentPayment.value = item;
  };

  const fetchPayments = async (page = 1, limit = 20): Promise<PaymentListResponseDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/payment", {
        method: "GET",
        query: { page, limit },
      });
      const response = sanitizePaymentListResponse(data);
      setPayments(response.payments);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch payments";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createPayment = async (payload: Partial<PaymentDto>): Promise<PaymentDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/payment", {
        method: "POST",
        body: payload,
      });
      const response = data && typeof data === "object" && "payment" in data
        ? sanitizePayment((data as { payment?: unknown }).payment)
        : sanitizePayment(data);
      setCurrentPayment(response);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create payment";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getPayments = computed(() => payments.value);
  const getCurrentPayment = computed(() => currentPayment.value);

  return {
    payments,
    currentPayment,
    isLoading,
    error,
    setPayments,
    setCurrentPayment,
    fetchPayments,
    createPayment,
    getPayments,
    getCurrentPayment,
  };
});
