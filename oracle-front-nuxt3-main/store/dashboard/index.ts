import { defineStore } from "pinia";

export interface HomeCard {
  id: number;
  title: string;
  img: string;
}

export interface DashboardState {
  showAllTutorials: boolean;
  isDesktop: boolean;
  cards: HomeCard[];
}

export const useDashboardStore = defineStore("dashboard", () => {
  // State
  const showAllTutorials = ref<boolean>(true);
  const isDesktop = ref<boolean>(false);
  const cards = ref<HomeCard[]>([
    {
      id: 1,
      title: "dashboard.homeHowToSwap",
      img: "/png/home-1.png",
    },
    {
      id: 2,
      title: "dashboard.homeBestRates",
      img: "/png/home-2.png",
    },
    {
      id: 3,
      title: "dashboard.homeLowerFees",
      img: "/png/home-3.png",
    },
    {
      id: 4,
      title: "dashboard.homeLowerFees",
      img: "/png/home-3.png",
    },
    {
      id: 5,
      title: "dashboard.homeHowToSwap",
      img: "/png/home-1.png",
    },
    {
      id: 6,
      title: "dashboard.homeBestRates",
      img: "/png/home-2.png",
    },
    {
      id: 7,
      title: "dashboard.homeLowerFees",
      img: "/png/home-3.png",
    },
  ]);

  // Getters
  const displayedCards = computed(() => {
    if (isDesktop.value && !showAllTutorials.value) {
      return [];
    }
    if (isDesktop.value) {
      return cards.value.slice(0, 4);
    }
    return cards.value;
  });

  // Actions
  const toggleTutorials = () => {
    showAllTutorials.value = !showAllTutorials.value;
  };

  const checkScreenSize = () => {
    if (import.meta.client) {
      isDesktop.value = window.innerWidth >= 1024;
    }
  };

  const setShowAllTutorials = (value: boolean) => {
    showAllTutorials.value = value;
  };

  const setIsDesktop = (value: boolean) => {
    isDesktop.value = value;
  };

  const setCards = (newCards: HomeCard[]) => {
    cards.value = newCards;
  };

  return {
    // State
    showAllTutorials,
    isDesktop,
    cards,
    // Getters
    displayedCards,
    // Actions
    toggleTutorials,
    checkScreenSize,
    setShowAllTutorials,
    setIsDesktop,
    setCards,
  };
});
