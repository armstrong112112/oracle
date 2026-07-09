import { defineStore } from "pinia";
import { useApiClient } from "~/composables/useApiClient";
import type {
  Story,
  StoryHighlight,
} from "~/entities/oracle-pay/model/stories.types";

export const useStoriesStore = defineStore("stories", () => {
  // State
  const stories = ref<Story[]>([]);
  const highlights = ref<StoryHighlight[]>([]);
  const currentStory = ref<Story | null>(null);
  const isStoryViewOpen = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const api = useApiClient();

  // Getters (computed)
  const getStories = computed((): Story[] => stories.value);
  const getHighlights = computed((): StoryHighlight[] => highlights.value);
  const getCurrentStory = computed((): Story | null => currentStory.value);
  const getIsStoryViewOpen = computed((): boolean => isStoryViewOpen.value);
  const getAllStoriesForDisplay = computed((): Story[] => {
    const allStories = [...stories.value];
    highlights.value.forEach((highlight) => {
      allStories.push(...highlight.stories);
    });
    return allStories.sort(
      (a, b) =>
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime()
    );
  });

  // ──────────────────────────────────────────────
  // API Actions (ID всегда приходит с сервера)
  // ──────────────────────────────────────────────

  const fetchStories = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await api<{ stories: Story[] }>("/stories");
      stories.value = data?.stories ?? [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch stories";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchHighlights = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await api<{ highlights: StoryHighlight[] }>("/stories/highlights");
      highlights.value = data?.highlights ?? [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch highlights";
    } finally {
      isLoading.value = false;
    }
  };

  /** createStory: ID назначает сервер (или Nitro mock) */
  const createStory = async (story: Omit<Story, "id">): Promise<Story | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<{ story: Story }>('/stories', {
        method: "POST",
        body: story,
      });
      if (data?.story) {
        stories.value.unshift(data.story);
        return data.story;
      }
      return null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create story";
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /** createHighlight: ID назначает сервер */
  const createHighlight = async ({
    name,
    story,
  }: {
    name: string;
    story: Story;
  }): Promise<StoryHighlight | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<{ highlight: StoryHighlight }>('/stories/highlights', {
        method: "POST",
        body: { name, story },
      });
      if (data?.highlight) {
        highlights.value.unshift(data.highlight);
        return data.highlight;
      }
      return null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create highlight";
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /** addToHighlight: ID новой истории назначает сервер */
  const addToHighlight = async ({
    story,
    highlightId,
  }: {
    story: Story;
    highlightId: string;
  }): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await api<{ story: Story }>(
        `/stories/highlights/${highlightId}/stories`,
        { method: "POST", body: story }
      );
      if (data?.story) {
        const highlight = highlights.value.find((h) => h.id === highlightId);
        highlight?.stories.unshift(data.story);
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to add story to highlight";
    } finally {
      isLoading.value = false;
    }
  };

  // ──────────────────────────────────────────────
  // Local mutations (не требуют server round-trip)
  // ──────────────────────────────────────────────

  const SET_STORIES = (storiesData: Story[]) => {
    stories.value = storiesData;
  };

  const SET_HIGHLIGHTS = (highlightsData: StoryHighlight[]) => {
    highlights.value = highlightsData;
  };

  const deleteStory = (storyId: string) => {
    stories.value = stories.value.filter((s) => s.id !== storyId);
    highlights.value.forEach((highlight) => {
      highlight.stories = highlight.stories.filter((s) => s.id !== storyId);
    });
  };

  const updateStory = ({
    storyId,
    updates,
  }: {
    storyId: string;
    updates: Partial<Story>;
  }) => {
    const idx = stories.value.findIndex((s) => s.id === storyId);
    if (idx !== -1) stories.value[idx] = { ...stories.value[idx], ...updates };

    highlights.value.forEach((highlight) => {
      const hIdx = highlight.stories.findIndex((s) => s.id === storyId);
      if (hIdx !== -1) {
        highlight.stories[hIdx] = { ...highlight.stories[hIdx], ...updates };
      }
    });
  };

  const updateHighlight = ({
    highlightId,
    updates,
  }: {
    highlightId: string;
    updates: Partial<StoryHighlight>;
  }) => {
    const idx = highlights.value.findIndex((h) => h.id === highlightId);
    if (idx !== -1) highlights.value[idx] = { ...highlights.value[idx], ...updates };
  };

  const deleteHighlight = (highlightId: string) => {
    highlights.value = highlights.value.filter((h) => h.id !== highlightId);
  };

  const openStoryView = (story: Story) => {
    currentStory.value = story;
    isStoryViewOpen.value = true;
  };

  const closeStoryView = () => {
    currentStory.value = null;
    isStoryViewOpen.value = false;
  };

  return {
    // State
    stories,
    highlights,
    currentStory,
    isStoryViewOpen,
    isLoading,
    error,
    // Getters
    getStories,
    getHighlights,
    getCurrentStory,
    getIsStoryViewOpen,
    getAllStoriesForDisplay,
    // API Actions
    fetchStories,
    fetchHighlights,
    createStory,
    createHighlight,
    addToHighlight,
    // Local mutations
    SET_STORIES,
    SET_HIGHLIGHTS,
    deleteStory,
    updateStory,
    openStoryView,
    closeStoryView,
    updateHighlight,
    deleteHighlight,
  };
});
