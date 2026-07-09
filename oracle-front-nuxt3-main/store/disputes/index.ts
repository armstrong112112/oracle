import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useApiClient} from "~/composables/useApiClient";
import {
  type DisputeDto,
  type DisputeListResponseDto,
  sanitizeDispute,
  sanitizeDisputeListResponse,
} from "~/shared/types/api/sanitizers/disputes";

export const useDisputesStore = defineStore("disputes", () => {
  const api = useApiClient();
  const disputes = ref<DisputeDto[]>([]);
  const currentDispute = ref<DisputeDto | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const setDisputes = (items: DisputeDto[]) => {
    disputes.value = items;
  };

  const setCurrentDispute = (item: DisputeDto | null) => {
    currentDispute.value = item;
  };

  const fetchDisputes = async (page = 1, limit = 20): Promise<DisputeListResponseDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/disputes", {
        method: "GET",
        query: { page, limit },
      });
      const response = sanitizeDisputeListResponse(data);
      setDisputes(response.disputes);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch disputes";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createDispute = async (payload: Partial<DisputeDto>): Promise<DisputeDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/disputes", {
        method: "POST",
        body: payload,
      });
      const response = data && typeof data === "object" && "dispute" in data
        ? sanitizeDispute((data as { dispute?: unknown }).dispute)
        : sanitizeDispute(data);
      setCurrentDispute(response);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create dispute";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getDisputes = computed(() => disputes.value);
  const getCurrentDispute = computed(() => currentDispute.value);

  return {
    disputes,
    currentDispute,
    isLoading,
    error,
    setDisputes,
    setCurrentDispute,
    fetchDisputes,
    createDispute,
    getDisputes,
    getCurrentDispute,
  };
});
