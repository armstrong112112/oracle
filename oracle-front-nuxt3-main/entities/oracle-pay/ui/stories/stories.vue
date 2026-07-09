<template>
  <div class="stories-container">
    <div
      ref="swiper"
      :class="
        props.enableSwiper ? 'swiper-container' : 'stories-container-inner'
      ">
      <div
        :class="
          props.enableSwiper ? 'swiper-wrapper' : 'stories-wrapper-inner'
        ">
        <div
          v-for="(item, index) in stories"
          :key="index"
          :class="[
            props.enableSwiper ? 'swiper-slide story_card' : 'story_card',
            { viewed: item.viewed },
          ]"
          @click="openFullScreen(index)">
          <div class="slide-content relative">
            <div v-if="isLoaded && !isFullScreen" class="thumbnail-view">
              <img :src="item.image" class="thumbnail-image" alt="" />
              <!-- Multiple Text Items for Thumbnail -->
              <div
                v-for="(textItem, textIndex) in getTextItems(item)"
                :key="textIndex"
                class="story_text"
                :class="item.textPosition === 'top' ? 'top_slider' : null"
                :style="getTextItemStyle(textItem)">
                {{ textItem.text }}
              </div>
              <div v-if="!item.viewed" class="thumbnail-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-left">
      <div v-if="isLoaded && isFullScreen" class="full-screen-modal">
        <div class="stories-wrapper">
          <div class="close-button" @click.stop="closeFullScreen">
            <img
              class="cursor-pointer"
              :src="'/svg/close.svg'"
              alt="close" />
          </div>

          <div
            v-if="currentIndex > 0"
            class="nav-button left-button"
            @click.stop="prevStory">
            <span class="flex">
              <img :src="'/svg/arrow-back.svg'" alt="" />
            </span>
          </div>

          <div class="story-content" @click.stop="nextStory">
            <img
              :src="currentStory.image"
              class="story-image"
              alt=""
              draggable="false" />

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
                <div class="heading">{{ currentStory.header.heading }}</div>
                <div class="subheading">
                  {{ currentStory.header.subheading }}
                </div>
              </div>
            </div>

            <div class="progress-container">
              <div v-for="(_, idx) in stories" :key="idx" class="progress-bar">
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
            v-if="currentIndex < stories.length - 1"
            class="nav-button right-button"
            @click.stop="nextStory">
            <span class="flex">
              <img :src="'/svg/arrow-right.svg'" alt="" />
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Swiper from "swiper";
import "swiper/css";
import { useStoryText } from "@/composables/useStoryText";
import type { Story } from "@/entities/oracle-pay/model/stories.types";
import { useStoriesStore } from "@/store/stories";
import { readLocalStorageJson, writeLocalStorageJson } from "~/utils/clientStorage";

interface Props {
  enableSwiper?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  enableSwiper: true,
});

const emit = defineEmits<{
  "story-end": [index: number];
}>();

const storiesStore = useStoriesStore();
const swiper = ref<HTMLElement | null>(null);
const isLoaded = ref(false);
const isFullScreen = ref(false);
const currentIndex = ref(0);
const progressWidth = ref(0);
const interval = ref<number | null>(null);

const stories = computed((): Story[] => {
  return storiesStore.getStories;
});

const currentStory = computed((): Story => {
  return stories.value[currentIndex.value] || stories.value[0];
});

const allStoriesViewed = computed((): boolean => {
  return stories.value.every((story) => story.viewed === true);
});

const getTextItems = (story: Story) => {
  const { getTextItems } = useStoryText();
  return getTextItems(story);
};

const getTextItemStyle = (textItem: any) => {
  const { getTextItemStyle } = useStoryText();
  return getTextItemStyle(textItem);
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
    console.error("Error loading stories state:", error);
  }
};

const saveViewedState = () => {
  try {
    const viewedState = stories.value.map((story) => story.viewed);
    writeLocalStorageJson("storiesViewedState", viewedState);
  } catch (error) {
    console.error("Error saving stories state:", error);
  }
};

const openFullScreen = (index: number) => {
  currentIndex.value = index;
  isFullScreen.value = true;
  startProgress();

  if (import.meta.client) {
    document.body.classList.add("no-scroll");
  }
};

const closeFullScreen = () => {
  isFullScreen.value = false;
  clearProgressInterval();
  saveViewedState();

  if (import.meta.client) {
    document.body.classList.remove("no-scroll");
  }
};

const startProgress = () => {
  clearProgressInterval();
  progressWidth.value = 0;

  if (
    stories.value[currentIndex.value] &&
    stories.value[currentIndex.value].id
  ) {
    storiesStore.updateStory({
      storyId: stories.value[currentIndex.value].id!,
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
  if (currentIndex.value < stories.value.length - 1) {
    currentIndex.value++;
    startProgress();
  } else {
    isFullScreen.value = false;
    clearProgressInterval();
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

onMounted(() => {
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
  if (isLoaded.value) {
    // Initialize Swiper when loaded
    if (swiper.value && props.enableSwiper) {
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

<style lang="scss">
.story_card {
  width: 94px !important;
  height: 113px !important;
  position: relative;
  border-radius: 13px;
  border: 1px solid #f64e2a;
  overflow: hidden;
  margin-left: 12px;
  padding: 2px;
}

.stories-container {
  cursor: pointer;
  margin-top: 20px;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 4px;
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
  z-index: 1;
}

.full-screen-modal {
  position: fixed;
  top: 0;
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
  max-height: 800px;
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

.story-text-overlay {
  position: absolute;
  font-weight: 600;
  max-width: 80%;
  text-align: center;
  word-wrap: break-word;
  z-index: 10;
}

.story-header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), transparent);
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
  font-family: "Kenyan Coffee", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;
}
.story_text {
  position: absolute;
  color: white;
  bottom: 20px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  left: 8px;
}
.top_slider {
  top: 10px;
  bottom: auto;
  width: 60%;
}
.subheading {
  font-size: 14px;
  opacity: 0.8;
  font-family: "Reza Zulmi Alfaizi Sans", sans-serif;
}

.progress-container {
  position: absolute;
  top: 8px;
  left: 0;
  width: 100%;
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
</style>
