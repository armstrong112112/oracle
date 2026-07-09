<template>
  <div class="stories-container">
    <div class="py-16">
      <div
        v-if="!hasAnyContent"
        class="profile_review_card_no flex flex-col justify-center items-center"
        @click="triggerFileInput">
        <div class="flex flex-col gap-4 justify-center">
          <div class="profile_review_card_no_title">
            {{ $t("whitelist.profile.addStory") }}
          </div>
        </div>
        <img
          src="/icons/profile/plus.svg"
          alt="plus"
          style="width: 24px"
          class="plus_icon cursor-pointer flex m-auto" />
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          class="d-none"
          @change="handleFileSelect" />
      </div>
    </div>
    <div v-if="hasAnyContent" ref="swiper" class="swiper-container">
      <div class="swiper-wrapper flex items-center justify-start gap-8">
        <div class="swiper-slide story_card viewed">
          <div class="slide-content relative h-full">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              class="d-none"
              @change="handleFileSelect" />
            <div
              v-if="isUpload"
              class="thumbnail-view profile_view"
              @click="triggerFileInput">
              <div class="thumbnail-image flex items-center justify-center">
                <img src="/icons/oracle-profile/plus.svg" alt="" />
              </div>
              <div class="story_text_profile">
                {{ $t("whitelist.profile.addStory") }}
              </div>
              <div :class="'thumbnail-overlay-profile-viewed'"></div>
            </div>
          </div>
        </div>
        <div
          v-for="(highlight, index) in highlights"
          :key="highlight.id"
          class="swiper-slide story_card"
          :class="{ viewed: highlight.stories.some((story) => story.viewed) }"
          @click="openFullScreen(index)">
          <div class="slide-content relative h-full">
            <div
              v-if="isLoaded && !isFullScreen"
              class="thumbnail-view profile_view">
              <img :src="highlight.coverImage" class="thumbnail-image" alt="" />
              <div class="story_text_profile">
                {{ highlight.name || $t("whitelist.profile.storyName") }}
              </div>
              <div
                :class="
                  highlight.stories.some((story) => story.viewed)
                    ? 'thumbnail-overlay-profile-viewed'
                    : 'thumbnail-overlay-profile'
                "></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-left">
      <div v-if="isLoaded && isFullScreen" class="full-screen-modal-story">
        <div class="stories-wrapper">
          <!-- <div class="close-button" @click.stop="closeFullScreen">
            <img
              class="cursor-pointer"
              src="/icons/verification/close.svg"
              alt="close"
            />
          </div> -->

          <div
            v-if="currentIndex > 0"
            class="nav-button left-button"
            @click.stop="prevStory">
            <span class="flex">
              <img :src="'/svg/arrow-back.svg'" alt="" />
            </span>
          </div>

          <div class="story-content" @click.stop="togglePause">
            <img
              :src="currentStory.image"
              class="story-image"
              draggable="false"
              alt="" />

            <!-- Multiple Text Overlays -->
            <div
              v-for="(textItem, textIndex) in getTextItems(currentStory)"
              :key="textIndex"
              class="story-text-overlay"
              :style="getTextItemStyle(textItem)">
              {{ textItem.text }}
            </div>

            <div v-if="currentStory.header" class="story-header">
              <img
                v-if="currentStory.header.profileImage"
                :src="currentStory.header.profileImage"
                class="profile-image"
                alt="" />
              <div class="header-text">
                <div class="heading">
                  {{
                    currentStory.header?.heading ||
                    $t("whitelist.profile.storyName")
                  }}
                </div>
                <div class="subheading">
                  {{
                    currentStory.header?.subheading ||
                    $t("whitelist.profile.justNow")
                  }}
                </div>
              </div>
              <div v-if="isOwnProfile" class="story-actions">
                <button class="action-btn" @click.stop="togglePause">
                  <img
                    v-if="!isPaused"
                    :src="'/icons/story/pause.svg'"
                    alt="pause" />
                  <img v-else :src="'/icons/story/play.svg'" alt="play" />
                </button>

                <button class="action-btn" @click.stop="openStorySettings">
                  <img :src="'/icons/story/settings.svg'" alt="settings" />
                </button>
                <button class="action-btn" @click.stop="shareStory">
                  <img :src="'/icons/story/share.svg'" alt="share" />
                </button>
                <button class="action-btn" @click.stop="closeFullScreen">
                  <img :src="'/icons/story/close.svg'" alt="close" />
                </button>
              </div>
            </div>

            <div class="progress-container">
              <div
                v-for="(story, idx) in currentHighlight
                  ? currentHighlight.stories
                  : stories"
                :key="idx"
                class="progress-bar">
                <div
                  class="progress"
                  :style="{
                    width:
                      idx === currentIndex
                        ? progressWidth + '%'
                        : idx < currentIndex
                        ? '100%'
                        : '0%',
                  }"></div>
              </div>
            </div>
          </div>

          <div
            v-if="
              currentIndex <
              (currentHighlight
                ? currentHighlight.stories.length
                : stories.length) -
                1
            "
            class="nav-button right-button"
            @click.stop="nextStory">
            <span class="flex">
              <img :src="'/svg/arrow-right.svg'" alt="" />
            </span>
          </div>
        </div>
      </div>
    </transition>

    <StoryCreation
      v-if="showStoryCreation"
      :selected-file="selectedFile"
      @close="showStoryCreation = false"
      @story-created="handleStoryCreated" />

    <StorySettings
      v-if="showStorySettings && selectedStoryForSettings"
      :story="selectedStoryForSettings"
      @close="showStorySettings = false"
      @save="handleStorySave"
      @delete="handleStoryDelete" />
  </div>
</template>

<script setup lang="ts">
import Swiper from "swiper";
import "swiper/css";
import { useStoryText } from "~/composables/useStoryText";
import type { Story } from "~/entities/oracle-pay/model/stories.types";
import StoryCreation from "~/entities/oracle-pay/ui/StoryCreation/index.vue";
import StorySettings from "~/entities/oracle-pay/ui/StorySettings/index.vue";
import { useStoriesStore } from "~/store/stories";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

interface Props {
  isUpload?: boolean;
  isNoData?: boolean;
  isOwnProfile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isUpload: false,
  isNoData: false,
  isOwnProfile: false,
});

const emit = defineEmits<{
  "story-end": [index: number];
  "story-highlighted": [story: Story];
}>();

const storiesStore = useStoriesStore();
const swiper = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const isLoaded = ref(false);
const isFullScreen = ref(false);
const currentIndex = ref(0);
const progressWidth = ref(0);
const interval = ref<number | null>(null);
const isPaused = ref(false);
const showStoryCreation = ref(false);
const showStorySettings = ref(false);
const selectedStoryForSettings = ref<Story | null>(null);
const selectedFile = ref<File | null>(null);
const currentHighlight = ref<any>(null);

const stories = computed((): Story[] => {
  return storiesStore.getStories;
});

const highlights = computed(() => {
  return storiesStore.getHighlights;
});

const allStories = computed((): Story[] => {
  return storiesStore.getAllStoriesForDisplay;
});

const currentStory = computed((): Story => {
  if (currentHighlight.value && currentHighlight.value.stories.length > 0) {
    return (
      currentHighlight.value.stories[currentIndex.value] ||
      currentHighlight.value.stories[0]
    );
  }
  return stories.value[currentIndex.value] || stories.value[0];
});

const allStoriesViewed = computed((): boolean => {
  return stories.value.every((story) => story.viewed === true);
});

const hasAnyContent = computed((): boolean => {
  return stories.value.length > 0 || highlights.value.length > 0;
});

const getTextItems = (story: Story) => {
  const { getTextItems } = useStoryText();
  return getTextItems(story);
};

const getTextItemStyle = (textItem: any) => {
  const { getTextItemStyle } = useStoryText();
  return getTextItemStyle(textItem);
};

const loadStories = () => {
  // Stories are now reactive from Pinia store
  // No need to manually load them
};

const loadViewedState = () => {
  try {
    const viewedStories = readLocalStorageJson<boolean[] | null>("storiesViewedState");
    if (viewedStories) {
      stories.value.forEach((story, index) => {
        if (viewedStories[index] && story.id) {
          storiesStore.updateStory({
            storyId: story.id,
            updates: { viewed: true },
          });
        }
      });
    }
  } catch (error) {
    // Error loading stories state
  }
};

const saveViewedState = () => {
  try {
    const viewedState = stories.value.map((story) => story.viewed);
    writeLocalStorageJson("storiesViewedState", viewedState);
  } catch (error) {
    // Error saving stories state
  }
};

const openFullScreen = (highlightIndex: number) => {
  // Get the highlight and set its stories as current stories
  const highlight = highlights.value[highlightIndex];
  if (highlight && highlight.stories.length > 0) {
    // Store the current highlight for reference
    currentHighlight.value = highlight;
    currentIndex.value = 0;
    isFullScreen.value = true;
    startProgress();

    if (import.meta.client) {
      document.body.classList.add("no-scroll");
    }
  }
};

const closeFullScreen = () => {
  isFullScreen.value = false;
  clearProgressInterval();
  currentHighlight.value = null;
  saveViewedState();

  if (import.meta.client) {
    document.body.classList.remove("no-scroll");
  }
};

const startProgress = () => {
  clearProgressInterval();
  progressWidth.value = 0;
  isPaused.value = false;

  const currentStories = currentHighlight.value
    ? currentHighlight.value.stories
    : stories.value;
  if (
    currentStories[currentIndex.value] &&
    currentStories[currentIndex.value].id
  ) {
    storiesStore.updateStory({
      storyId: currentStories[currentIndex.value].id!,
      updates: { viewed: true },

    });
  }

  const duration = currentStory.value.duration || 5000;
  const increment = 100 / (duration / 100);

  interval.value = window.setInterval(() => {
    progressWidth.value += increment;
    if (progressWidth.value >= 100) {
      nextStory();
    }
  }, 100);
};

const clearProgressInterval = () => {
  if (interval.value !== null) {
    window.clearInterval(interval.value);
    interval.value = null;
  }
};

const nextStory = () => {
  const currentStories = currentHighlight.value
    ? currentHighlight.value.stories
    : stories.value;

  if (currentIndex.value < currentStories.length - 1) {
    currentIndex.value++;
    startProgress();
  } else {
    isFullScreen.value = false;
    clearProgressInterval();
    currentHighlight.value = null;
    emit("story-end", currentIndex.value);

    if (import.meta.client) {
      document.body.classList.remove("no-scroll");
    }
  }
};

const prevStory = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    startProgress();
  }
};

const togglePause = () => {
  isPaused.value = !isPaused.value;
};

const shareStory = () => {
  // Placeholder for future share action
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);

  if (files.length > 0) {
    selectedFile.value = files[0];
    showStoryCreation.value = true;
  }
};

const handleStoryCreated = () => {
  showStoryCreation.value = false;
  loadViewedState();
};

const openStorySettings = () => {
  if (currentStory.value) {
    selectedStoryForSettings.value = currentStory.value;
    showStorySettings.value = true;
  }
};

const handleStorySave = (story: Story) => {
  storiesStore.updateStory({
    storyId: story.id || "",
    updates: story,
  });
  showStorySettings.value = false;
};

const handleStoryDelete = (storyId: string) => {
  storiesStore.deleteStory(storyId);
  showStorySettings.value = false;
};

onMounted(() => {
  loadStories();
  loadViewedState();
});

watch(
  () => storiesStore.getStories,
  () => {
    loadViewedState();
  },
  { deep: true }
);

watch(isLoaded, () => {
  if (isLoaded.value && props.isUpload) {
    if (swiper.value) {
      new Swiper(swiper.value, {
        slidesPerView: "auto",
        spaceBetween: 16,
        observer: true,
        observeParents: true,
      });
    }
  }
});

onBeforeUnmount(() => {
  clearProgressInterval();
  if (import.meta.client) {
    document.body.classList.remove("no-scroll");
  }
});
</script>
<style lang="scss" scoped>
.profile_review_card_no {
  padding-top: 24px;
  padding-bottom: 24px;
  gap: 24px;
  border-radius: 12px;
  border: 1px solid #2b2741;
  cursor: pointer;
}
.profile_review_card_no_title {
  font-family: Roboto;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
  text-align: center;
}
.profile_review_card_no_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #b2aaf9;
}
.m-auto {
  margin: 0 auto;
}

.story_card:first-child {
  margin-left: 10px;
}
.story_card {
  width: 77px !important;
  height: 84px !important;
  gap: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 13px;
  overflow: hidden;
  border: 0 !important;
}

.stories-container {
  cursor: pointer;
  margin-top: -10px !important;
}

.viewed {
  border: none !important;
}

.thumbnail-view {
  width: 100%;
  height: 100%;
  position: relative;
}

.thumbnail-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 4px;
}

.thumbnail-overlay-profile {
  position: absolute;
  top: 2px;

  width: 56px;
  height: 56px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
  z-index: 1;
  border: 1px solid #f64e2a;
  border-radius: 50%;
}
.thumbnail-overlay-profile-viewed {
  border: 1px solid #2b2741;
  position: absolute;
  top: 2px;

  width: 56px;
  height: 56px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
  z-index: 1;
  border-radius: 50%;
}
.full-screen-modal-story {
  position: fixed !important;
  top: 0 !important;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}

.stories-wrapper {
  position: relative;
  width: 100%;

  height: 100vh;

  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  border: 1px solid #f64e2a;
}
.close-button img {
  width: 80%;
}

.story-content {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.story-image {
  height: 100%;
  object-fit: cover;
}

.story-header {
  position: absolute;
  top: 12px;
  left: 8px;
  right: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 15px 0px #0000000d;
  background: #ffffff26;
  backdrop-filter: blur(25px);
  border-radius: 12px;
}

.profile-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.header-text {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.heading {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;
}
.story_text_profile {
  color: white;
  bottom: 20px;
  left: 8px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  text-align: left;
}
.top_slider {
  top: 10px;
  bottom: auto;
  width: 60%;
}
.subheading {
  font-size: 14px;
  opacity: 0.8;
  font-family: Roboto, sans-serif;
}

.progress-container {
  position: absolute;
  top: 20px;
  left: 16px;
  right: 16px;
  height: 3px;
  display: flex;
  gap: 2px;
  padding: 0 8px;
  z-index: 10;
}

.progress-bar {
  flex-grow: 1;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: white;
  transition: width 0.1s linear;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-size: 20px;
}

.left-button {
  left: 10px;
}

.right-button {
  right: 10px;
}

/* Add to your global CSS */
:global(.no-scroll) {
  overflow: hidden;
}
.profile_view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
}

.story-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.action-btn {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.story-text-overlay {
  position: absolute;
  font-weight: 600;
  max-width: 80%;
  text-align: center;
  word-wrap: break-word;
  z-index: 10;
}

.highlights-section {
  margin-top: 20px;
  padding: 16px 0;
}

.highlights-title {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.highlights-container {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  transition: background-color 0.2s;
  min-width: 80px;
}

.highlight-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.highlight-cover {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f64e2a;
}

.highlight-name {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  text-align: center;
  word-wrap: break-word;
  max-width: 80px;
}

.highlight-stories-container {
  margin-top: 20px;
}

.highlight-stories-section {
  margin-bottom: 20px;
}

.highlight-stories-title {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.highlight-stories-grid {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.highlight-story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  transition: background-color 0.2s;
  min-width: 80px;
}

.highlight-story-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.highlight-story-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f64e2a;
}

.highlight-story-text {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  text-align: center;
  word-wrap: break-word;
  max-width: 80px;
}
</style>
