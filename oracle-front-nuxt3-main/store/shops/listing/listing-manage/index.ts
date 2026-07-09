import { defineStore } from "pinia";
import type { StepsObjectType } from "~/shared/types/shops";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

const emptyListing: StepsObjectType = {
  step_one: {
    step: "one",
    category: "",
    platform: "",
    product: "",
    subcategory: "",
  },
  step_two: {
    step: "two",
    delivery: false,
    deal_duration: "",
    header: "",
    description: "",
    selfRegistered: "",
    controlled: "",
    accountAge: {
      min: "",
      max: "",
    },
    uploadedImage: "",
  },
  step_three: {
    step: "three",
    phoneNumber: "",
    communication: "",
    quantity: "",
    cost: "",
    duration: {
      start: "",
      end: "",
    },
    plan: "",
    terms: "",
    regions: "",
  },
};

type StepOneType = StepsObjectType["step_one"];
type StepTwoType = StepsObjectType["step_two"];
type StepThreeType = StepsObjectType["step_three"];

type Mode = "new" | "edit";

export const useShopListingManageStore = defineStore(
  "shops-listing-manage",
  () => {
    // State
    const listing = ref<StepsObjectType | null>(null);
    const mode = ref<Mode>("new");

    // Getters
    const LISTING = computed(() => listing.value);

    // Actions
    const SET_MODE = (newMode: Mode): void => {
      mode.value = newMode;
    };

    const SET_LISTING = (item: StepsObjectType): void => {
      listing.value = item;
    };

    const SAVE_LISTING = (
      data: StepOneType | StepTwoType | StepThreeType
    ): void => {
      if (!listing.value) return;

      switch (data.step) {
        case "one":
          listing.value.step_one = data as StepOneType;
          break;
        case "two":
          listing.value.step_two = data as StepTwoType;
          break;
        case "three":
          listing.value.step_three = data as StepThreeType;
          break;
      }

      if (mode.value === "new") {
        writeLocalStorageJson("new-listing", listing.value);
      } else {
        writeLocalStorageJson("edit-listing", listing.value);
      }
    };

    const INIT_LISTING = (newMode: Mode): void => {
      SET_MODE(newMode);

      if (newMode === "edit") {
        const storedListing = readLocalStorageJson<StepsObjectType | null>(
          "edit-listing"
        );
        if (storedListing) {
          SET_LISTING(storedListing);
          return;
        }
      }

      if (newMode === "new") {
        const storedListing = readLocalStorageJson<StepsObjectType | null>(
          "new-listing"
        );

        if (storedListing !== null) {
          SET_LISTING(storedListing);
          return;
        }

        SET_LISTING(emptyListing);
        writeLocalStorageJson("new-listing", emptyListing);
      }
    };

    const SET_STEP = (
      data: StepOneType | StepTwoType | StepThreeType
    ): void => {
      SAVE_LISTING(data);
    };

    return {
      // State
      listing,
      mode,
      // Getters
      LISTING,
      // Actions
      SET_MODE,
      SET_LISTING,
      SAVE_LISTING,
      INIT_LISTING,
      SET_STEP,
    };
  }
);
