import { defineStore } from "pinia";
import { useApiClient } from "~/composables/useApiClient";
import {
  sanitizeProfile,
  sanitizeProfiles,
  type ProfileDto,
  type ProfileListQuery,
} from "~/shared/types/api/sanitizers/profile";

export const useProfileStore = defineStore("profile", () => {
  // State
  const profile = ref<ProfileDto | null>(null);
  const profiles = ref<ProfileDto[]>([]);
  const api = useApiClient();

  // Actions
  const setProfile = (profileData: ProfileDto): void => {
    profile.value = profileData;
  };

  const setProfiles = (profilesData: ProfileDto[]): void => {
    profiles.value = profilesData;
  };

  const fetchMyProfile = async (): Promise<void> => {
    const data = await api<unknown>("/user/my-profile");
    setProfile(sanitizeProfile(data));
  };

  const fetchProfile = async (id: number): Promise<void> => {
    const data = await api<unknown>(`/user/profile/${id}`);
    setProfile(sanitizeProfile(data));
  };

  const fetchListProfiles = async ({
    selectedCategories = [],
    name = "",
  }: ProfileListQuery = {}): Promise<void> => {
    let url = "/api/v1/user/list";
    const params = new URLSearchParams();

    if (selectedCategories.length) {
      params.append("cat", selectedCategories.join(";"));
    }
    if (name) {
      params.append("name", name);
    }

    url += "?" + params.toString();

    const requestPath = url.replace("/api/v1", "");
    const data = await api<unknown>(requestPath);
    setProfiles(sanitizeProfiles(data));
  };

  // Getters
  const getMyProfile = computed(() => profile.value);
  const getProfile = computed(() => profile.value);
  const getProfiles = computed(() => profiles.value);

  return {
    // State
    profile,
    profiles,
    // Actions
    setProfile,
    setProfiles,
    fetchMyProfile,
    fetchProfile,
    fetchListProfiles,
    // Getters
    getMyProfile,
    getProfile,
    getProfiles,
  };
});
