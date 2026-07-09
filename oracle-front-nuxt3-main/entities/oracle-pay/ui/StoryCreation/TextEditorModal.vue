<template>
  <div class="text-editor-modal">
    <div class="text-left-btn">
      <CustomButton
        :value="$t('story.textEditor.cancel')"
        type="blur"
        class="w-full"
        size="sm"
        style="padding: 0 12px"
        @click="$emit('close')" />
    </div>
    <div class="text-right-btn">
      <CustomButton
        :value="$t('story.textEditor.next')"
        type="primary"
        class="w-full"
        size="sm"
        style="padding: 0 12px"
        @click="handleNext" />
    </div>

    <!-- Media Background -->
    <div
      ref="modalElement"
      class="media-background"
      @click="handleBackgroundClick">
      <img :src="imageUrl" alt="story preview" class="background-image" />
    </div>

    <!-- Text Overlays -->
    <div
      v-for="(textItem, index) in textItems"
      v-show="!showOverlayInput || selectedTextIndex !== index"
      :key="index"
      class="text-overlay"
      :class="{ selected: selectedTextIndex === index }"
      :style="getTextOverlayStyle(textItem)"
      @click.stop="editText(index)"
      @dblclick.stop="editText(index)"
      @mousedown.stop="startDrag($event, index)"
      @touchstart.stop="startDrag($event, index)"
      @mouseup.stop="stopDrag"
      @touchend.stop="stopDrag">
      {{ textItem.text }}

      <!-- Delete Button -->
      <div
        v-if="selectedTextIndex === index"
        class="delete-handle"
        @click.stop="deleteText(index)"
        @touchstart.stop="deleteText(index)">
        <img src="/icons/story/close.svg" alt="delete" />
      </div>

      <!-- Always Visible Resize Handle -->
      <div
        class="resize-handle resize-handle-bottom-right"
        @mousedown="startResize($event, index)"
        @touchstart="startResize($event, index)"></div>
    </div>

    <!-- Overlay Input for Creating/Editing Text -->
    <div
      v-if="showOverlayInput"
      class="overlay-input-container"
      :style="overlayInputStyle">
      <input
        ref="overlayInput"
        v-model="currentText"
        class="overlay-input"
        :style="currentTextStyle"
        :placeholder="$t('story.textEditor.textPlaceholder')"
        @blur="handleBlur"
        @keydown.enter.prevent="saveCurrentText" />
    </div>

    <!-- Full Screen Overlay for Text Creation -->
    <div
      v-if="isCreatingText"
      class="fullscreen-overlay"
      @click="handleOverlayClick"></div>

    <!-- Double-tap to add new text overlay -->
    <div
      v-if="!isCreatingText && textItems.length === 0"
      class="add-text-hint"
      @dblclick="startTextCreation">
      <div class="hint-content">
        <button class="tool-btn">
          <img src="/icons/story/text.svg" alt="text" />
        </button>
        <span>Double tap to add text</span>
      </div>
    </div>

    <!-- Toggle Panel Button -->
    <button class="toggle-panel-btn" @click="togglePanel">
      <img v-if="showPanel" src="/icons/story/close.svg" alt="" />
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M19 9H5M19 5H5M19 13H5M19 17H5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round" />
      </svg>
    </button>

    <!-- Control Panel -->
    <div
      class="control-panel"
      :class="{ hidden: !showPanel, 'keyboard-open': isKeyboardOpen }">
      <!-- Add Text Button -->
      <div class="add-text-section">
        <div class="add-text-btn" @click="startTextCreation">
          <button class="tool-btn">
            <img src="/icons/story/text.svg" alt="text" />
          </button>
          Add Text
        </div>
      </div>

      <div class="text-styling-options">
        <div class="color-options">
          <div
            v-for="color in textColors"
            :key="color"
            class="color-option"
            :class="{ active: selectedColor === color }"
            :style="{ backgroundColor: color }"
            tabindex="0"
            @click="changeTextColor(color)" />
        </div>

        <div class="font-options">
          <button
            v-for="font in fontOptions"
            :key="font.value"
            class="font-option"
            :class="{ active: selectedFont === font.value }"
            :style="{ fontFamily: font.value }"
            @click="changeTextFont(font.value)">
            {{ font.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

interface TextItem {
  text: string;
  color: string;
  fontFamily: string;
  x: number;
  y: number;
  fontSize: number;
}

interface Props {
  imageUrl: string;
  initialText?: string;
  initialColor?: string;
  initialFont?: string;
  initialX?: number;
  initialY?: number;
  initialTextItems?: TextItem[];
}

const props = withDefaults(defineProps<Props>(), {
  initialText: "",
  initialColor: "#ffffff",
  initialFont: "Druk Text Wide Cyr",
  initialX: 50,
  initialY: 50,
  initialTextItems: () => [],
});

const emit = defineEmits<{
  close: [];
  "text-saved": [data: any];
  next: [data: any];
}>();

const overlayInput = ref<HTMLTextAreaElement | null>(null);
const modalElement = ref<HTMLElement | null>(null);

const textItems = ref<TextItem[]>([]);
const currentText = ref("");
const selectedColor = ref(props.initialColor);
const selectedFont = ref(props.initialFont);
const selectedTextIndex = ref(-1);
const showOverlayInput = ref(false);
const isCreatingText = ref(false);
const overlayInputX = ref(50);
const overlayInputY = ref(50);
const isDragging = ref(false);
const isResizing = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const dragTargetIndex = ref(-1);
const showPanel = ref(true);
const isKeyboardOpen = ref(false);
const initialViewportHeight = ref(0);

const textColors = [
  "#ffffff",
  "#000000",
  "#ff6b35",
  "#ff3838",
  "#f368e0",
  "#341f97",
  "#2e86de",
  "#1dd1a1",
  "#ffa502",
  "#48dbfb",
  "#a29bfe",
];

const fontOptions = [
  { label: "Druk Cyr", value: "Druk Text Wide Cyr" },
  { label: "Roboto", value: "Roboto" },
  { label: "Hanson", value: "Hanson" },
  { label: "Evolventa", value: "Evolventa" },
  { label: "Reza Zulmi", value: "Reza Zulmi Alfaizi Sans" },
  { label: "Kenyan Coffee", value: "Kenyan Coffee" },
  { label: "Inter", value: "Inter" },
  { label: "Hector", value: "Hector" },
  { label: "Nunito", value: "Nunito" },
  { label: "Impact", value: "Impact" },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
];

const currentTextStyle = computed(() => {
  // Get the current fontSize from the selected text item if editing
  let fontSize = "24px";
  if (
    selectedTextIndex.value >= 0 &&
    textItems.value[selectedTextIndex.value]
  ) {
    fontSize = `${textItems.value[selectedTextIndex.value].fontSize}px`;
  }

  return {
    color: selectedColor.value,
    fontFamily: selectedFont.value,
    fontSize,
    background: "transparent",
    border: "none",
    outline: "none",
    textAlign: "center" as const,
    minWidth: "100px",
    maxWidth: "80vw",
    display: "inline-block",
    width: "auto",
    height: "auto",
    lineHeight: "1",
    padding: "0",
    margin: "0",
  };
});

const overlayInputStyle = computed(() => {
  return {
    left: `${overlayInputX.value}%`,
    top: `${overlayInputY.value}%`,
    transform: "translate(-50%, -50%)",
  };
});

const startTextCreation = () => {
  isCreatingText.value = true;
  showOverlayInput.value = true;
  currentText.value = "";
  selectedTextIndex.value = -1;
  overlayInputX.value = 50;
  overlayInputY.value = 50;
  showPanel.value = false; // Hide panel when creating text

  nextTick(() => {
    if (overlayInput.value) {
      overlayInput.value.focus();
      overlayInput.value.select();
    }
  });
};

const handleOverlayClick = (event: MouseEvent) => {
  if (!isCreatingText.value) return;

  if (!modalElement.value) return;
  const rect = modalElement.value.getBoundingClientRect();

  overlayInputX.value = ((event.clientX - rect.left) / rect.width) * 100;
  overlayInputY.value = ((event.clientY - rect.top) / rect.height) * 100;

  // Ensure the input stays within bounds
  overlayInputX.value = Math.max(10, Math.min(90, overlayInputX.value));
  overlayInputY.value = Math.max(10, Math.min(90, overlayInputY.value));

  nextTick(() => {
    if (overlayInput.value) {
      overlayInput.value.focus();
    }
  });
};

const handleBackgroundClick = () => {
  if (showOverlayInput.value) {
    // Save text without changing position
    saveCurrentText();
  } else {
    deselectText();
  }
};

const deselectText = () => {
  selectedTextIndex.value = -1;
};

const editText = (index: number) => {
  // Prevent editing if already editing this text
  if (selectedTextIndex.value === index && showOverlayInput.value) {
    return;
  }

  // Don't edit if we just finished dragging
  if (isDragging.value || isResizing.value) {
    return;
  }

  const textItem = textItems.value[index];
  selectedTextIndex.value = index;
  currentText.value = textItem.text;
  selectedColor.value = textItem.color;
  selectedFont.value = textItem.fontFamily;

  // Use exact same position to prevent jumping
  overlayInputX.value = textItem.x;
  overlayInputY.value = textItem.y;

  showOverlayInput.value = true;
  isCreatingText.value = false;

  nextTick(() => {
    if (overlayInput.value) {
      overlayInput.value.focus();
      overlayInput.value.select();
    }
  });
};

const handleBlur = () => {
  setTimeout(() => {
    if (
      !document.activeElement ||
      !modalElement.value?.contains(document.activeElement)
    ) {
      // Only save if we're actually editing text
      if (showOverlayInput.value && currentText.value.trim()) {
        saveCurrentText();
      }
    }
  }, 0);
};

const saveCurrentText = () => {
  if (!currentText.value.trim()) {
    cancelTextEditing();
    return;
  }

  if (selectedTextIndex.value >= 0) {
    // Edit existing text - preserve ALL existing properties
    const existingItem = textItems.value[selectedTextIndex.value];
    if (existingItem) {
      // Only update the text content, preserve everything else
      existingItem.text = currentText.value;
      // Don't change color, font, position, or size
    }
  } else {
    // Add new text with current selections
    const textData: TextItem = {
      text: currentText.value,
      color: selectedColor.value,
      fontFamily: selectedFont.value,
      x: overlayInputX.value,
      y: overlayInputY.value,
      fontSize: 24,
    };
    textItems.value.push(textData);
  }

  cancelTextEditing();
  showPanel.value = true; // Show panel after saving
};

const cancelTextEditing = () => {
  showOverlayInput.value = false;
  isCreatingText.value = false;
  selectedTextIndex.value = -1;
  currentText.value = "";
  showPanel.value = true; // Show panel after canceling

  // Reset drag state to ensure it works after editing
  isDragging.value = false;
  isResizing.value = false;
  dragTargetIndex.value = -1;
};

const deleteText = (index: number) => {
  if (index >= 0 && index < textItems.value.length) {
    textItems.value.splice(index, 1);
    selectedTextIndex.value = -1;
    showOverlayInput.value = false;
    isCreatingText.value = false;
  }
};

const getTextOverlayStyle = (textItem: TextItem) => {
  return {
    color: textItem.color,
    fontFamily: textItem.fontFamily,
    fontSize: `${textItem.fontSize}px`,
    left: `${textItem.x}%`,
    top: `${textItem.y}%`,
    transform: "translate(-50%, -50%)",
  };
};

const setupDragListeners = () => {
  document.addEventListener("mousemove", handleDrag, { passive: false });
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", handleDrag, { passive: false });
  document.addEventListener("touchend", stopDrag);
};

let handleResizeFn: (() => void) | null = null;

const setupKeyboardDetection = () => {
  handleResizeFn = () => {
    const currentHeight = window.innerHeight;
    const heightDifference = initialViewportHeight.value - currentHeight;
    isKeyboardOpen.value = heightDifference > 150;
    document.documentElement.style.setProperty(
      "--vh",
      `${currentHeight * 0.01}px`
    );
  };

  window.addEventListener("resize", handleResizeFn);
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      initialViewportHeight.value = window.innerHeight;
      handleResizeFn?.();
    }, 100);
  });

  handleResizeFn();
};

const setupMobilePinchZoom = () => {
  let initialDistance = 0;
  let initialFontSize = 0;
  let targetTextIndex = -1;

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      event.preventDefault();
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      initialDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      // Find which text element is being touched
      const target = event.target as HTMLElement;
      const textOverlay = target.closest(".text-overlay");
      if (textOverlay && modalElement.value) {
        const index = Array.from(
          textOverlay.parentElement?.children || []
        ).indexOf(textOverlay);
        if (index >= 0 && textItems.value[index]) {
          targetTextIndex = index;
          initialFontSize = textItems.value[index].fontSize;
        }
      }
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 2 && targetTextIndex >= 0) {
      event.preventDefault();
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      const scale = currentDistance / initialDistance;
      const newFontSize = Math.max(12, Math.min(72, initialFontSize * scale));

      if (textItems.value[targetTextIndex]) {
        textItems.value[targetTextIndex].fontSize = newFontSize;
      }
    }
  };

  const handleTouchEnd = () => {
    targetTextIndex = -1;
  };

  document.addEventListener("touchstart", handleTouchStart, {
    passive: false,
  });
  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("touchend", handleTouchEnd);
};

const startDrag = (event: MouseEvent | TouchEvent, index: number) => {
  // Exit any ongoing edit mode when starting drag
  if (showOverlayInput.value) {
    cancelTextEditing();
  }

  // Prevent text selection during drag
  event.preventDefault();
  event.stopPropagation();

  // Ensure clean state before starting drag
  isDragging.value = true;
  isResizing.value = false;
  dragTargetIndex.value = index;
  // Don't set selectedTextIndex during drag - only for visual feedback
  selectedTextIndex.value = index;

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  dragStartX.value = clientX;
  dragStartY.value = clientY;

  // Add visual feedback for drag start
  const textElement = event.target as HTMLElement;
  if (textElement) {
    textElement.style.cursor = "grabbing";
  }
};

const startResize = (event: MouseEvent | TouchEvent, index: number) => {
  event.stopPropagation();
  event.preventDefault();

  // Exit any ongoing edit mode when starting resize
  if (showOverlayInput.value) {
    cancelTextEditing();
  }

  // Reset any existing state
  isResizing.value = true;
  isDragging.value = false;
  dragTargetIndex.value = index;
  selectedTextIndex.value = index;

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  dragStartX.value = clientX;
  dragStartY.value = clientY;
};

const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (isResizing.value) {
    handleResize(event);
    return;
  }

  if (!isDragging.value || dragTargetIndex.value < 0) return;

  event.preventDefault();
  event.stopPropagation();

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  if (!modalElement.value) return;

  const rect = modalElement.value.getBoundingClientRect();
  const deltaX = clientX - dragStartX.value;
  const deltaY = clientY - dragStartY.value;

  const textItem = textItems.value[dragTargetIndex.value];

  // Calculate new position with better precision
  const newX = Math.max(
    2, // Smaller margin for better edge usage
    Math.min(98, textItem.x + (deltaX / rect.width) * 100)
  );
  const newY = Math.max(
    2, // Smaller margin for better edge usage
    Math.min(98, textItem.y + (deltaY / rect.height) * 100)
  );

  // Update position smoothly
  textItem.x = newX;
  textItem.y = newY;

  // Update drag start position for next frame
  dragStartX.value = clientX;
  dragStartY.value = clientY;
};

const handleResize = (event: MouseEvent | TouchEvent) => {
  if (!isResizing.value || dragTargetIndex.value < 0) return;

  event.preventDefault();
  event.stopPropagation();

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  const deltaX = clientX - dragStartX.value;
  const deltaY = clientY - dragStartY.value;

  // Simple resize: use the larger movement for intuitive resizing
  const movement = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
  const sizeChange = movement * 0.3; // Less sensitive resize

  const textItem = textItems.value[dragTargetIndex.value];
  const newFontSize = Math.max(
    12,
    Math.min(72, textItem.fontSize + sizeChange)
  );

  // Update fontSize and ensure it persists
  textItem.fontSize = newFontSize;

  dragStartX.value = clientX;
  dragStartY.value = clientY;
};

const stopDrag = () => {
  // Only stop if we were actually dragging
  if (isDragging.value) {
    isDragging.value = false;
    dragTargetIndex.value = -1;
    // Don't keep text selected after drag - prevent edit mode
    selectedTextIndex.value = -1;

    // Exit edit mode if it was open
    showOverlayInput.value = false;
    isCreatingText.value = false;

    // Reset cursor
    if (modalElement.value) {
      const textElements = modalElement.value.querySelectorAll(".text-overlay");
      textElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.cursor = "move";
        }
      });
    }
  }

  // Always stop resizing
  if (isResizing.value) {
    isResizing.value = false;
    dragTargetIndex.value = -1;
    // Exit edit mode if it was open during resize
    showOverlayInput.value = false;
    isCreatingText.value = false;
  }
};

const togglePanel = () => {
  showPanel.value = !showPanel.value;
};

const changeTextColor = (color: string) => {
  selectedColor.value = color;

  // Apply color to selected text immediately
  if (selectedTextIndex.value >= 0 && !showOverlayInput.value) {
    textItems.value[selectedTextIndex.value].color = color;
  }

  // Apply to currently editing text immediately
  if (showOverlayInput.value && selectedTextIndex.value >= 0) {
    textItems.value[selectedTextIndex.value].color = color;
  }
};

const changeTextFont = (font: string) => {
  selectedFont.value = font;

  // Apply font to selected text immediately
  if (selectedTextIndex.value >= 0 && !showOverlayInput.value) {
    textItems.value[selectedTextIndex.value].fontFamily = font;
  }

  // Apply to currently editing text immediately
  if (showOverlayInput.value && selectedTextIndex.value >= 0) {
    textItems.value[selectedTextIndex.value].fontFamily = font;
  }
};

const handleNext = () => {
  // Save current text first
  saveCurrentText();

  // Emit the text data back to parent before closing
  emit("text-saved", {
    textItems: textItems.value,
    // Keep single text for backward compatibility
    text: textItems.value.length > 0 ? textItems.value[0].text : "",
    textStyle:
      textItems.value.length > 0
        ? {
            color: textItems.value[0].color,
            fontFamily: textItems.value[0].fontFamily,
            x: textItems.value[0].x,
            y: textItems.value[0].y,
            fontSize: textItems.value[0].fontSize,
          }
        : undefined,
  });
  emit("next", {
    textItems: textItems.value,
    text: textItems.value.length > 0 ? textItems.value[0].text : "",
    textStyle:
      textItems.value.length > 0
        ? {
            color: textItems.value[0].color,
            fontFamily: textItems.value[0].fontFamily,
            x: textItems.value[0].x,
            y: textItems.value[0].y,
            fontSize: textItems.value[0].fontSize,
          }
        : undefined,
  });

  // Then close the editor
  emit("close");
};

onMounted(() => {
  modalElement.value = document.querySelector(
    ".text-editor-modal"
  ) as HTMLElement;

  setupDragListeners();
  setupKeyboardDetection();
  setupMobilePinchZoom();
  initialViewportHeight.value = window.innerHeight;

  // If there are existing text items, use them
  if (props.initialTextItems && props.initialTextItems.length > 0) {
    textItems.value = [...props.initialTextItems];
  } else if (props.initialText) {
    // If there's initial text, add it to textItems
    textItems.value.push({
      text: props.initialText,
      color: props.initialColor,
      fontFamily: props.initialFont,
      x: props.initialX,
      y: props.initialY,
      fontSize: 24,
    });
  } else {
    // Auto-start text creation when modal opens
    startTextCreation();
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", handleDrag);
  document.removeEventListener("touchend", stopDrag);
  if (handleResizeFn) {
    window.removeEventListener("resize", handleResizeFn);
  }

  // Reset drag state
  isDragging.value = false;
  isResizing.value = false;
  dragTargetIndex.value = -1;
});
</script>

<style lang="scss" scoped>
@use "./TextEditorModal.scss";
</style>
