<template>
  <div class="posting-options-modal">
    <div class="posting-options-content">
      <div class="story-preview">
        <img :src="previewImage" alt="story preview" class="preview-image" />
        <div v-if="storyText" class="story-text-overlay" :class="textPosition">
          {{ storyText }}
        </div>
      </div>

      <div class="highlight-section">
        <div class="highlight-question">
          {{ $t("story.posting.makeHighlight") }}
        </div>

        <div class="highlight-toggle">
          <label class="toggle-label">
            <input v-model="isHighlight" type="checkbox" class="toggle-input" />
            <span class="toggle-slider" :class="{ active: isHighlight }"></span>
            {{ $t("story.posting.highlight") }}
          </label>
        </div>

        <div v-if="isHighlight" class="highlight-options">
          <div class="highlight-buttons">
            <button
              class="highlight-btn"
              :class="{ active: highlightMode === 'new' }"
              @click="highlightMode = 'new'">
              {{ $t("story.posting.newHighlight") }}
            </button>
            <button
              class="highlight-btn"
              :class="{ active: highlightMode === 'existing' }"
              @click="highlightMode = 'existing'">
              {{ $t("story.posting.addToExisting") }}
            </button>
          </div>

          <div v-if="highlightMode === 'new'" class="highlight-name-input">
            <input
              v-model="newHighlightName"
              type="text"
              :placeholder="$t('story.posting.highlightNamePlaceholder')"
              class="name-input" />
          </div>

          <div v-if="highlightMode === 'existing'" class="existing-highlights">
            <div
              v-for="highlight in existingHighlights"
              :key="highlight.id"
              class="highlight-item"
              :class="{ selected: selectedHighlightId === highlight.id }"
              @click="selectedHighlightId = highlight.id">
              <img
                :src="highlight.coverImage"
                alt="highlight"
                class="highlight-cover" />
              <span class="highlight-name">{{ highlight.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="close-btn" @click="$emit('close')">
          {{ $t("story.posting.close") }}
        </button>
        <button class="post-btn" @click="handlePost">
          {{ $t("story.posting.postStory") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StoryHighlight } from "~/entities/oracle-pay/model/stories.types";
import { useStoriesStore } from "~/store/stories";

interface Props {
  previewImage: string;
  storyText?: string;
  textPosition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  storyText: "",
  textPosition: "bottom",
});

const emit = defineEmits<{
  close: [];
  post: [options: any];
}>();

const storiesStore = useStoriesStore();

const isHighlight = ref(false);
const highlightMode = ref<"new" | "existing">("new");
const newHighlightName = ref("");
const selectedHighlightId = ref("");

const existingHighlights = computed((): StoryHighlight[] => {
  return storiesStore.getHighlights;
});

const handlePost = () => {
  const options = {
    isHighlight: isHighlight.value,
    highlightMode: highlightMode.value,
    newHighlightName: newHighlightName.value,
    selectedHighlightId: selectedHighlightId.value,
  };

  emit("post", options);
};
</script>

<style lang="scss" scoped>
.posting-options-modal {
  position: fixed;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background-color: #000;
  z-index: 1002;
  display: flex;
  flex-direction: column;
}

.posting-options-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.story-preview {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-text-overlay {
  position: absolute;
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  max-width: 80%;
  text-align: center;
  word-wrap: break-word;
}

.story-text-overlay.top {
  top: 20%;
}

.story-text-overlay.center {
  top: 50%;
  transform: translateY(-50%);
}

.story-text-overlay.bottom {
  bottom: 20%;
}

.highlight-section {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(25px);
  background: #000000cc;
  padding: 20px;
  padding-bottom: 40px;
}

.highlight-question {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
}

.highlight-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  cursor: pointer;
}

.toggle-input {
  display: none;
}

.toggle-slider {
  width: 50px;
  height: 28px;
  background: #333;
  border-radius: 14px;
  position: relative;
  transition: background-color 0.3s;
}

.toggle-slider::before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.toggle-slider.active {
  background: #f64e2a;
}

.toggle-slider.active::before {
  transform: translateX(22px);
}

.highlight-options {
  margin-top: 20px;
}

.highlight-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.highlight-btn {
  flex: 1;
  background: transparent;
  border: 2px solid #333;
  color: #999;
  padding: 12px 16px;
  border-radius: 25px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.highlight-btn.active {
  background: #f64e2a;
  border-color: #f64e2a;
  color: white;
}

.highlight-btn:hover {
  border-color: #f64e2a;
  color: white;
}

.highlight-name-input {
  margin-bottom: 16px;
}

.name-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #333;
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.name-input:focus {
  border-color: #f64e2a;
}

.name-input::placeholder {
  color: #999;
}

.existing-highlights {
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

.highlight-item.selected {
  background: rgba(246, 78, 42, 0.2);
  border: 2px solid #f64e2a;
}

.highlight-cover {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #333;
}

.highlight-item.selected .highlight-cover {
  border-color: #f64e2a;
}

.highlight-name {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  text-align: center;
  word-wrap: break-word;
}

.action-buttons {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  gap: 12px;
  padding: 0 20px;
}

.close-btn {
  flex: 1;
  background: transparent;
  border: 2px solid #333;
  color: #999;
  padding: 12px 16px;
  border-radius: 25px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  border-color: #f64e2a;
  color: white;
}

.post-btn {
  flex: 1;
  background: #f64e2a;
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 25px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.post-btn:hover {
  background: #e53e1a;
}
</style>
