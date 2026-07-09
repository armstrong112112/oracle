import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useApiClient} from "~/composables/useApiClient";
import {
  type ListingDto,
  type ListingListResponseDto,
  sanitizeListing,
  sanitizeListingListResponse,
} from "~/shared/types/api/sanitizers/listings";

export const useListingsStore = defineStore("listings", () => {
  const api = useApiClient();
  const listings = ref<ListingDto[]>([]);
  const currentListing = ref<ListingDto | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const setListings = (items: ListingDto[]) => {
    listings.value = items;
  };

  const setCurrentListing = (item: ListingDto | null) => {
    currentListing.value = item;
  };

  const fetchListings = async (page = 1, limit = 20): Promise<ListingListResponseDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/listings", {
        method: "GET",
        query: { page, limit },
      });
      const response = sanitizeListingListResponse(data);
      setListings(response.listings);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch listings";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createListing = async (payload: Partial<ListingDto>): Promise<ListingDto> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<unknown>("/listings", {
        method: "POST",
        body: payload,
      });
      const response = data && typeof data === "object" && "listing" in data
        ? sanitizeListing((data as { listing?: unknown }).listing)
        : sanitizeListing(data);
      setCurrentListing(response);
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create listing";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getListings = computed(() => listings.value);
  const getCurrentListing = computed(() => currentListing.value);

  return {
    listings,
    currentListing,
    isLoading,
    error,
    setListings,
    setCurrentListing,
    fetchListings,
    createListing,
    getListings,
    getCurrentListing,
  };
});
