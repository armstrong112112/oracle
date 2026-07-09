import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useApiClient} from "~/composables/useApiClient";
import {
  type OfferDto,
  type OfferListResponseDto,
  sanitizeOffer,
  sanitizeOfferListResponse,
} from "~/shared/types/api/sanitizers/offers";

export const useOffersStore = defineStore("offers", () => {
  const api = useApiClient();
  const offers = ref<OfferDto[]>([]);
  const currentOffer = ref<OfferDto | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const setOffers = (items: OfferDto[]) => {
    offers.value = items;
  };

  const setCurrentOffer = (item: OfferDto | null) => {
    currentOffer.value = item;
  };

  const fetchOffers = async (page = 1, limit = 20): Promise<OfferListResponseDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/offers", {
        method: "GET",
        query: { page, limit },
      });
      const response = sanitizeOfferListResponse(data);
      setOffers(response.offers);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch offers";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createOffer = async (payload: Partial<OfferDto>): Promise<OfferDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/offers", {
        method: "POST",
        body: payload,
      });
      const response = data && typeof data === "object" && "offer" in data
        ? sanitizeOffer((data as { offer?: unknown }).offer)
        : sanitizeOffer(data);
      setCurrentOffer(response);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create offer";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getOffers = computed(() => offers.value);
  const getCurrentOffer = computed(() => currentOffer.value);

  return {
    offers,
    currentOffer,
    isLoading,
    error,
    setOffers,
    setCurrentOffer,
    fetchOffers,
    createOffer,
    getOffers,
    getCurrentOffer,
  };
});
