import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useApiClient} from "~/composables/useApiClient";
import {
  type EscrowDto,
  type EscrowListResponseDto,
  sanitizeEscrow,
  sanitizeEscrowListResponse,
} from "~/shared/types/api/sanitizers/escrow";

export const useEscrowApiStore = defineStore("escrowApi", () => {
  const api = useApiClient();
  const escrows = ref<EscrowDto[]>([]);
  const currentEscrow = ref<EscrowDto | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const setEscrows = (items: EscrowDto[]) => {
    escrows.value = items;
  };

  const setCurrentEscrow = (item: EscrowDto | null) => {
    currentEscrow.value = item;
  };

  const fetchEscrows = async (page = 1, limit = 20): Promise<EscrowListResponseDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/escrow", {
        method: "GET",
        query: { page, limit },
      });
      const response = sanitizeEscrowListResponse(data);
      setEscrows(response.escrows);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch escrows";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createEscrow = async (payload: Partial<EscrowDto>): Promise<EscrowDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/escrow", {
        method: "POST",
        body: payload,
      });
      const response = data && typeof data === "object" && "escrow" in data
        ? sanitizeEscrow((data as { escrow?: unknown }).escrow)
        : sanitizeEscrow(data);
      setCurrentEscrow(response);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create escrow";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getEscrows = computed(() => escrows.value);
  const getCurrentEscrow = computed(() => currentEscrow.value);

  return {
    escrows,
    currentEscrow,
    isLoading,
    error,
    setEscrows,
    setCurrentEscrow,
    fetchEscrows,
    createEscrow,
    getEscrows,
    getCurrentEscrow,
  };
});
