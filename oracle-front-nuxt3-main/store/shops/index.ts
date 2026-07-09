import { defineStore } from "pinia";
import { MockDefaultUser } from "~/shared/constants/shops";
import type { MockDefaultUserType } from "~/shared/types/shops";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

export const useShopsStore = defineStore("shops", () => {
  // State
  const profile = ref<MockDefaultUserType | null>(null);

  // Actions
  const getProfile = (state: MockDefaultUserType): MockDefaultUserType => {
    return (profile.value = state);
  };

  const SettingMockUser = (): void => {
    const profileData = readLocalStorageJson<MockDefaultUserType | null>("profile");
    if (!profileData) {
      writeLocalStorageJson("profile", MockDefaultUser);
    } else {
      getProfile(profileData);
    }
  };

  return {
    // State
    profile,
    // Actions
    getProfile,
    SettingMockUser,
  };
});
