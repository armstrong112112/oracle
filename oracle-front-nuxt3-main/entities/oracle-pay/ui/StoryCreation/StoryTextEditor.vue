<template>
  <div class="text-editor-modal">
    <div class="story-preview">
      <div class="preview-background"></div>
    </div>
    <div class="text-editor-content">
      <div></div>
      <div class="flex flex-col gap-32">
        <div class="highlight-section">Make as highlight?</div>
        <div class="make-highlight" @click="toggleHighlight">
          <div class="make-highlight-text">Highlight</div>
          <img
            v-if="isHighlight"
            src="/icons/story/checked.svg"
            alt="checked" />
          <img v-else src="/icons/story/uncheck.svg" alt="unchecked" />
        </div>
        <div v-if="isHighlight" class="flex gap-10 items-center">
          <CustomButton
            :value="$t('story.textEditor.newHighlight')"
            :type="selectedOption === 'new' ? 'primary' : 'blur'"
            size="sm"
            @click="selectOption('new')" />
          <CustomButton
            :value="$t('story.textEditor.addToExisting')"
            :type="selectedOption === 'existing' ? 'primary' : 'blur'"
            size="sm"
            @click="selectOption('existing')" />
        </div>

        <!-- Existing Highlights Selection -->
        <div
          v-if="isHighlight && selectedOption === 'existing'"
          class="existing-highlights">
          <div class="highlights-grid">
            <div
              v-for="highlight in existingHighlights"
              :key="highlight.id"
              class="highlight-item"
              :class="{ selected: selectedHighlightId === highlight.id }"
              @click="selectHighlight(highlight.id)">
              <img
                :src="highlight.coverImage"
                alt="highlight"
                class="highlight-cover" />
              <div class="highlight-name">{{ highlight.name }}</div>
            </div>
          </div>
        </div>

        <!-- Highlight Name Input - only for new highlights -->
        <div
          v-if="isHighlight && selectedOption === 'new'"
          class="text-input-container">
          <TheInput
            :input-style="'blur'"
            :value="highlightName"
            :placeholder="$t('story.textEditor.highlightNamePlaceholder')"
            :is-remove="false"
            @update:value="highlightName = $event as string" />
        </div>
      </div>

      <div class="flex flex-col gap-10">
        <CustomButton
          :value="$t('story.textEditor.cancel')"
          type="blur"
          class="w-full"
          @click="$emit('close')" />
        <CustomButton
          :value="$t('story.textEditor.done')"
          type="primary"
          class="w-full"
          @click="handlePost" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StoryHighlight } from "~/entities/oracle-pay/model/stories.types";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useStoriesStore } from "~/store/stories";

interface Props {
  imageUrl: string;
  storyText?: string;
  textColor?: string;
  textFont?: string;
  textX?: number;
  textY?: number;
  textFontSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  storyText: "",
  textColor: "#ffffff",
  textFont: "Roboto",
  textX: 50,
  textY: 50,
  textFontSize: 24,
});

const emit = defineEmits<{
  close: [];
  postStory: [storyData: any];
}>();

const storiesStore = useStoriesStore();

const highlightName = ref("");
const isHighlight = ref(false);
const selectedOption = ref<"new" | "existing">("new");
const selectedHighlightId = ref("");

const existingHighlights = computed((): StoryHighlight[] => {
  return storiesStore.getHighlights;
});

const textOverlayStyle = computed(() => {
  return {
    color: props.textColor,
    fontFamily: props.textFont,
    left: `${props.textX}%`,
    top: `${props.textY}%`,
    transform: "translate(-50%, -50%)",
  };
});

const toggleHighlight = () => {
  isHighlight.value = !isHighlight.value;
  if (!isHighlight.value) {
    selectedOption.value = "new";
    selectedHighlightId.value = "";
  }
};

const selectOption = (option: "new" | "existing") => {
  selectedOption.value = option;
  if (option === "new") {
    selectedHighlightId.value = "";
  }
};

const selectHighlight = (highlightId: string) => {
  selectedHighlightId.value = highlightId;
};

const handleHighlightNameChange = (value: string) => {
  highlightName.value = value;
};

const handlePost = () => {
  // Validate highlight name if creating new highlight
  if (
    isHighlight.value &&
    selectedOption.value === "new" &&
    !highlightName.value.trim()
  ) {
    alert("Please enter a highlight name");
    return;
  }

  const storyData = {
    text: props.storyText,
    textStyle: {
      color: props.textColor,
      fontFamily: props.textFont,
      x: props.textX,
      y: props.textY,
      fontSize: props.textFontSize,
    },
    isHighlight: isHighlight.value,
    highlightMode: selectedOption.value,
    newHighlightName:
      isHighlight.value && selectedOption.value === "new"
        ? highlightName.value.trim()
        : "",
    selectedHighlightId:
      isHighlight.value && selectedOption.value === "existing"
        ? selectedHighlightId.value
        : "",
  };

  emit("postStory", storyData);
};
</script>

<style lang="scss" scoped>
.text-editor-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.text-editor-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}

.story-preview {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-background {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(25px);
  background: rgba(0, 0, 0, 0.8);
}

.highlight-section {
  font-family: Hector;
  font-size: 20px;
  color: white;
  text-align: center;
}
.make-highlight {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #61616133;
  border-radius: 16px;
  padding: 16px;
  justify-content: space-between;
  cursor: pointer;
}
.make-highlight-text {
  font-family: Roboto, sans-serif;
  color: white;
}

.existing-highlights {
  margin-top: 16px;
}

.highlights-title {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
}

.highlights-grid {
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

/* .highlight-item.selected {
  background: rgba(246, 78, 42, 0.2);
  border: 2px solid #f64e2a;
} */

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
</style>
