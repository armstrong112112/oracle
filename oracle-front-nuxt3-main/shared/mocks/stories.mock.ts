import type { Story, StoryHighlight } from "~/entities/oracle-pay/model/stories.types";

export const MOCK_STORIES: Story[] = [
  {
    id: "mock-story-1",
    image: "/images/stories/story1.jpg",
    duration: 5000,
    viewed: false,
    views: 0,
    createdAt: new Date().toISOString(),
    isOwn: true,
  },
  {
    id: "mock-story-2",
    image: "/images/stories/story2.jpg",
    duration: 5000,
    viewed: false,
    views: 12,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isOwn: false,
  },
];

export const MOCK_HIGHLIGHTS: StoryHighlight[] = [
  {
    id: "mock-highlight-1",
    name: "My Highlights",
    coverImage: "/images/stories/story1.jpg",
    stories: [MOCK_STORIES[0]],
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

// Draft contract — заменить реальным контрактом после получения спецификации
export interface CreateStoryResponseDraft {
  id: string;
  story: Story;
}

export interface CreateHighlightResponseDraft {
  id: string;
  highlight: StoryHighlight;
}

