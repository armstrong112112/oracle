<template>
  <div class="story-creation-container">
    <div class="story-creation-header">
      <button class="close-btn" @click="$emit('close')">
        <img src="/icons/story/back.svg" alt="close" />
      </button>
      <!-- <div class="header-title">{{ $t('story.creation.title') }}</div> -->
    </div>

    <div class="story-creation-content">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="d-none"
        @change="handleImageSelect" />

      <div v-if="selectedImage" class="story-editor">
        <div class="story-preview">
          <img :src="selectedImage" alt="story preview" class="preview-image" />

          <!-- Multiple Text Overlays -->
          <div
            v-for="(textItem, textIndex) in getTextItems()"
            :key="textIndex"
            class="story-text-overlay"
            :style="getTextItemStyle(textItem)">
            {{ textItem.text }}
          </div>
        </div>

        <div class="editing-tools">
          <!-- <button class="tool-btn" @click="undo">
            <img src="/icons/story/undo.svg" alt="undo" />
          </button> -->
          <button class="tool-btn" @click="showStickers = true">
            <img src="/icons/story/sticker.svg" alt="sticker" />
          </button>
          <button class="tool-btn" @click="showTextModal = true">
            <img src="/icons/story/text.svg" alt="text" />
          </button>
          <button class="tool-btn" @click="showDrawModal = true">
            <img src="/icons/story/pen.svg" alt="draw" />
          </button>
          <button class="tool-btn" @click="showCropModal = true">
            <img src="/icons/story/crop.svg" alt="crop" />
          </button>

          <!-- <button class="tool-btn" @click="showDrawing = true">
            <img src="/icons/story/draw.svg" alt="draw" />
          </button>
          <button class="tool-btn" @click="showFilters = true">
            <img src="/icons/story/filter.svg" alt="filter" />
          </button> -->
        </div>

        <div class="action-buttons">
          <div class="action-button">
            <CustomButton
              :value="$t('story.creation.next')"
              type="primary"
              size="sm"
              style="padding: 0 14px"
              @click="proceedToTextEditor" />
          </div>
        </div>
      </div>
    </div>

    <!-- Text Editor Modal -->
    <TextEditorModal
      v-if="showTextModal && selectedImage"
      :image-url="selectedImage"
      :initial-text="storyText"
      :initial-color="textStyle.color"
      :initial-font="textStyle.fontFamily"
      :initial-x="textStyle.x"
      :initial-y="textStyle.y"
      :initial-text-items="textItems"
      @close="showTextModal = false"
      @text-saved="handleTextSaved"
      @next="handleTextNext" />

    <!-- Crop Modal -->
    <CropModal
      v-if="showCropModal && selectedImage"
      :image-url="selectedImage"
      @close="showCropModal = false"
      @crop-applied="handleCropApplied" />

    <!-- Draw Modal -->
    <DrawModal
      v-if="showDrawModal && selectedImage"
      :image-url="selectedImage"
      @close="showDrawModal = false"
      @drawing-applied="handleDrawingApplied" />

    <!-- Story Posting Modal -->
    <StoryTextEditor
      v-if="showTextEditor && selectedImage"
      :image-url="selectedImage"
      :story-text="storyText"
      :text-color="textStyle.color"
      :text-font="textStyle.fontFamily"
      :text-x="textStyle.x"
      :text-y="textStyle.y"
      :text-font-size="textStyle.fontSize"
      @close="showTextEditor = false"
      @back="backToEditing"
      @postStory="handlePostStory" />
  </div>
</template>

<script setup lang="ts">
import { useStoryText } from "~/composables/useStoryText";
import CropModal from "~/entities/oracle-pay/ui/StoryCreation/CropModal.vue";
import DrawModal from "~/entities/oracle-pay/ui/StoryCreation/DrawModal.vue";
import StoryTextEditor from "~/entities/oracle-pay/ui/StoryCreation/StoryTextEditor.vue";
import TextEditorModal from "~/entities/oracle-pay/ui/StoryCreation/TextEditorModal.vue";
import CustomButton from "~/components/ui/Button.vue";

interface Props {
  selectedFile?: File | null;
}

const props = withDefaults(defineProps<Props>(), {
  selectedFile: null,
});

const emit = defineEmits<{
  close: [];
  "story-created": [story: any];
}>();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedImage = ref<string | null>(null);
const storyText = ref("");
const textItems = ref<any[]>([]);
const textPosition = ref("bottom");
const textStyle = ref({
  color: "#ffffff",
  fontFamily: "Druk Text Wide Cyr",
  x: 50,
  y: 50,
  fontSize: 24,
});

const showTextEditor = ref(false);
const showTextModal = ref(false);
const showCropModal = ref(false);
const showDrawModal = ref(false);
const showStickers = ref(false);
const showDrawing = ref(false);
const showFilters = ref(false);
const showPostingOptions = ref(false);

const textOverlayStyle = computed(() => {
  return {
    color: textStyle.value.color,
    fontFamily: textStyle.value.fontFamily,
    fontSize: `${textStyle.value.fontSize}px`,
    left: `${textStyle.value.x}%`,
    top: `${textStyle.value.y}%`,
    transform: "translate(-50%, -50%)",
  };
});

const getTextItems = () => {
  const { getTextItems } = useStoryText();
  return getTextItems({
    id: "temp",
    textItems: textItems.value,
    text: storyText.value,
    textStyle: { ...textStyle.value, text: storyText.value },
    image: selectedImage.value || "",
  });
};

const getTextItemStyle = (textItem: any) => {
  const { getTextItemStyle } = useStoryText();
  return getTextItemStyle(textItem);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  selectedImage.value = URL.createObjectURL(file);

  // Don't auto-open text editor - let user use editing tools first
};

const undo = () => {
  storyText.value = "";
  textStyle.value = {
    color: "#ffffff",
    fontFamily: "Roboto",
    x: 50,
    y: 80,
    fontSize: 24,
  };
  textPosition.value = "bottom";
};

const proceedToTextEditor = () => {
  showTextEditor.value = true;
};

const backToEditing = () => {
  showTextEditor.value = false;
  showPostingOptions.value = false;
};

const handleTextSaved = (textData: any) => {
  console.log("StoryCreation - handleTextSaved called with:", textData);

  if (!textData) {
    console.error("textData is undefined");
    return;
  }

  // Store multiple text items if available
  if (textData.textItems && Array.isArray(textData.textItems)) {
    console.log("StoryCreation - storing textItems:", textData.textItems);
    textItems.value = textData.textItems;
  } else {
    console.log("StoryCreation - no textItems found in textData");
  }

  // Keep single text for backward compatibility
  storyText.value = textData.text;
  textStyle.value = {
    color: textData.color,
    fontFamily: textData.fontFamily,
    x: textData.x,
    y: textData.y,
    fontSize: textData.fontSize || 24,
  };
  // Update textPosition based on y coordinate for consistency
  updateTextPosition(textData.y);
  showTextModal.value = false;
  // Show action tools after text editing - user can now crop/add emojis
};

const handleTextNext = (textData: any) => {
  if (textData) {
    handleTextSaved(textData);
  }
  // After saving text, proceed to the story posting editor
  showTextEditor.value = true;
};

const updateTextPosition = (y: number) => {
  // Update textPosition for backward compatibility
  if (y <= 25) {
    textPosition.value = "top";
  } else if (y >= 75) {
    textPosition.value = "bottom";
  } else {
    textPosition.value = "center";
  }
};

const handleCropApplied = (croppedImageUrl: string) => {
  // Update the selected image with the cropped version
  selectedImage.value = croppedImageUrl;
  showCropModal.value = false;

  // Keep the original text position - don't reset it after cropping
  // Text position should remain exactly where user placed it

  // Ensure we're back to the main editing view - reset all modal states
  showTextEditor.value = false;
  showPostingOptions.value = false;
  showTextModal.value = false;
  showStickers.value = false;
  showDrawing.value = false;
  showFilters.value = false;

  // Force DOM update to ensure editing tools are visible
  nextTick(() => {
    // Additional safety check to ensure we're in the correct state
    if (selectedImage.value && !showCropModal.value) {
      // All good - editing tools should be visible
    }
  });
};

const handleDrawingApplied = (drawnImageUrl: string) => {
  // Update the selected image with the drawn version
  selectedImage.value = drawnImageUrl;
  showDrawModal.value = false;

  // Ensure we're back to the main editing view - reset all modal states
  showTextEditor.value = false;
  showPostingOptions.value = false;
  showTextModal.value = false;
  showStickers.value = false;
  showDrawing.value = false;
  showFilters.value = false;
};

const handleTextSave = (text: string, position: string) => {
  storyText.value = text;
  textPosition.value = position;
  showTextEditor.value = false;
  // After text is saved, show posting options
  showPostingOptions.value = true;
};

const handlePostStory = (storyData: any) => {
  console.log("StoryCreation - handlePostStory called with:", storyData);
  console.log("StoryCreation - textItems:", textItems.value);

  // Update local state with new text, position, and styling
  storyText.value = storyData.text;
  textPosition.value = storyData.position;
  if (storyData.textStyle) {
    textStyle.value = storyData.textStyle;
  }

  const story = {
    id: Date.now().toString(),
    image: selectedImage.value!,
    text: storyData.text,
    textPosition: storyData.position,
    textStyle: storyData.textStyle,
    textItems: textItems.value.length > 0 ? textItems.value : undefined,
    duration: 5000,
    views: 0,
    createdAt: new Date().toISOString(),
    isOwn: true,
    isHighlight: storyData.isHighlight,
    highlightMode: storyData.highlightMode,
    newHighlightName: storyData.newHighlightName,
    selectedHighlightId: storyData.selectedHighlightId,
    highlightId: storyData.isHighlight
      ? storyData.highlightMode === "new"
        ? storyData.newHighlightName
        : storyData.selectedHighlightId
      : undefined,
    header: {
      heading:
        storyData.isHighlight && storyData.highlightMode === "new"
          ? storyData.newHighlightName
          : storyData.text || "Story name",
      subheading: "Just now",
      profileImage: selectedImage.value!,
    },
  };

  console.log("StoryCreation - emitting story-created with:", story);
  emit("story-created", story);
  emit("close");
};

onMounted(() => {
  // If file is provided, load it automatically
  if (props.selectedFile) {
    selectedImage.value = URL.createObjectURL(props.selectedFile);
  } else {
    // Auto-trigger file input when modal opens
    nextTick(() => {
      triggerFileInput();
    });
  }
});
</script>

<style lang="scss" scoped>
.story-creation-container {
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
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.story-creation-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
  z-index: 10;
}

.close-btn {
  background: #262530b2;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.close-btn img {
  width: 16px;
  height: 16px;
}

.header-title {
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 18px;
}

.story-creation-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.story-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
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
  font-weight: 600;
  font-size: 24px;
  max-width: 80%;
  text-align: center;
  word-wrap: break-word;
  z-index: 10;
  pointer-events: none;
}

.editing-tools {
  position: fixed;
  bottom: 24px;
  display: flex;
  gap: 12px;
  margin-left: 20px;
}

.action-buttons {
  position: relative;
  bottom: 20px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 20px;
}
.action-button {
  position: fixed;
  bottom: 20px;
}
.tool-btn {
  background: #2625308c;

  border-radius: 50%;
  backdrop-filter: blur(10px);
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.tool-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.tool-btn img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}

.next-btn {
  background: #f64e2a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.next-btn:hover {
  background: #e53e1a;
}

.d-none {
  display: none;
}
</style>
