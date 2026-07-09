<template>
  <div class="story-settings-modal">
    <div class="story-settings-content">
      <div class="story-preview">
        <img :src="story.image" alt="story preview" class="preview-image" />

        <div class="views-info">
          <div class="views-header flex items-center justify-between w-full">
            <div class="action-btn" @click="handleDelete">
              <img src="/icons/story/trash.svg" alt="" />
            </div>
            <div class="action-btn" @click="close">
              <img src="/icons/story/close.svg" alt="" />
            </div>
          </div>
          <div class="flex flex-col gap-32 w-full">
            <div class="flex flex-col gap-4 items-center justify-center">
              <img src="/icons/story/eye.svg" alt="views" class="views-icon" />
              <span class="views-count">{{ story.views || 0 }}</span>
            </div>

            <div class="flex flex-col gap-32 w-full">
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
                    <div
                      v-if="
                        isEditingHighlight &&
                        editingHighlightId === highlight.id
                      "
                      class="highlight-edit">
                      <TheInput
                        class="highlight-name-input"
                        :input-style="'blur'"
                        :value="editingHighlightName"
                        :placeholder="'Highlight name'"
                        :is-remove="false"
                        @update:value="editingHighlightName = $event"
                        @keyup.enter="saveHighlightEdit"
                        @keyup.escape="cancelHighlightEdit" />
                      <div class="edit-actions">
                        <button
                          class="edit-btn save"
                          @click.stop="saveHighlightEdit">
                          ✓
                        </button>
                        <button
                          class="edit-btn cancel"
                          @click.stop="cancelHighlightEdit">
                          ✗
                        </button>
                      </div>
                    </div>
                    <div v-else class="highlight-name-container">
                      <div class="highlight-name">{{ highlight.name }}</div>
                      <button
                        class="edit-highlight-btn"
                        @click.stop="startEditingHighlight(highlight)">
                        ✏️
                      </button>
                    </div>
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
                  @update:value="highlightName = $event" />
              </div>
            </div>
          </div>
          <CustomButton
            value="Save Changes"
            type="primary"
            class="w-full"
            @click="handleSave" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  Story,
  StoryHighlight,
} from "@/entities/oracle-pay/model/stories.types";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useStoriesStore } from "@/store/stories";

interface Props {
  story: Story;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  save: [story: Story];
  delete: [storyId: string];
}>();

const storiesStore = useStoriesStore();

const isHighlight = ref(false);
const selectedOption = ref<"new" | "existing">("new");
const highlightName = ref("");
const selectedHighlightId = ref("");
const isEditingHighlight = ref(false);
const editingHighlightId = ref("");
const editingHighlightName = ref("");

const existingHighlights = computed(() => {
  return storiesStore.getHighlights;
});

const initializeHighlightSettings = () => {
  if (props.story.isHighlight && props.story.highlightId) {
    selectedOption.value = "existing";
    selectedHighlightId.value = props.story.highlightId;
  }
};

onMounted(() => {
  isHighlight.value = props.story.isHighlight || false;
  selectedHighlightId.value = props.story.highlightId || "";
  initializeHighlightSettings();
});

const toggleHighlight = () => {
  isHighlight.value = !isHighlight.value;
  if (!isHighlight.value) {
    selectedOption.value = "new";
    selectedHighlightId.value = "";
    highlightName.value = "";
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

const startEditingHighlight = (highlight: StoryHighlight) => {
  isEditingHighlight.value = true;
  editingHighlightId.value = highlight.id;
  editingHighlightName.value = highlight.name;
};

const saveHighlightEdit = () => {
  if (!editingHighlightName.value.trim()) return;

  storiesStore.updateHighlight({
    highlightId: editingHighlightId.value,
    updates: { name: editingHighlightName.value.trim() },
  });

  isEditingHighlight.value = false;
  editingHighlightId.value = "";
  editingHighlightName.value = "";
};

const cancelHighlightEdit = () => {
  isEditingHighlight.value = false;
  editingHighlightId.value = "";
  editingHighlightName.value = "";
};

const handleSave = () => {
  if (
    isHighlight.value &&
    selectedOption.value === "new" &&
    !highlightName.value.trim()
  ) {
    alert("Please enter a highlight name");
    return;
  }

  if (
    isHighlight.value &&
    selectedOption.value === "existing" &&
    !selectedHighlightId.value
  ) {
    alert("Please select an existing highlight");
    return;
  }

  const updatedStory = {
    ...props.story,
    isHighlight: isHighlight.value,
    highlightId: isHighlight.value
      ? selectedOption.value === "new"
        ? highlightName.value.trim()
        : selectedHighlightId.value
      : undefined,
  };

  // If converting to highlight, handle the conversion properly
  if (isHighlight.value && !props.story.isHighlight) {
    // Remove from regular stories first
    storiesStore.deleteStory(props.story.id);

    // Then add to highlight
    if (selectedOption.value === "new") {
      storiesStore.createHighlight({
        name: highlightName.value.trim(),
        story: updatedStory,
      });
    } else if (selectedOption.value === "existing") {
      storiesStore.addToHighlight({
        story: updatedStory,
        highlightId: selectedHighlightId.value,
      });
    }
  } else {
    // Regular update
    emit("save", updatedStory);
  }

  emit("close");
};

const close = () => {
  emit("close");
};

const handleDelete = () => {
  // Check if this story belongs to a highlight
  const highlight = existingHighlights.value.find((h) =>
    h.stories.some((s) => s.id === props.story.id)
  );

  if (highlight) {
    // Delete the entire highlight if this story belongs to one
    storiesStore.deleteHighlight(highlight.id);
  } else {
    // Delete just the individual story
    storiesStore.deleteStory(props.story.id);
  }

  // Emit delete event to parent component
  emit("delete", props.story.id);

  // Close the menu after deletion
  emit("close");
};
</script>

<style lang="scss" scoped>
.story-settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  background-color: #000;
  z-index: 1003;
  display: flex;
  flex-direction: column;
}

.story-settings-content {
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

.views-info {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  backdrop-filter: blur(25px);
  background: #000000cc;
  padding: 16px;
}

.views-icon {
  width: 48px;
  height: 48px;
  filter: brightness(0) invert(1);
}

.views-count {
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-weight: 600;
}

.settings-section {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
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

.highlight-name-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.highlight-edit {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.highlight-name-input {
  width: 100%;
}

.edit-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.edit-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.edit-btn.save {
  background: #4caf50;
  color: white;
}

.edit-btn.cancel {
  background: #f44336;
  color: white;
}

.edit-btn:hover {
  opacity: 0.8;
}

.edit-highlight-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.edit-highlight-btn:hover {
  opacity: 1;
}

.action-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #61616133;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-btn {
  flex: 1;
  background: transparent;
  border: 2px solid #ff4444;
  color: #ff4444;
  padding: 12px 16px;
  border-radius: 25px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #ff4444;
  color: white;
}

.save-btn {
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

.save-btn:hover {
  background: #e53e1a;
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
