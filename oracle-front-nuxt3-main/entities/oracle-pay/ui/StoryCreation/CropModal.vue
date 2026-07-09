<template>
  <div class="crop-modal">
    <!-- Header with buttons -->
    <div class="crop-header flex items-center justify-between">
      <div>
        <CustomButton
          :value="$t('story.crop.cancel')"
          type="blur"
          size="sm"
          style="padding: 0 12px"
          @click="handleCancel" />
      </div>
      <div>
        <CustomButton
          :value="$t('story.crop.apply')"
          type="primary"
          size="sm"
          style="padding: 0 12px"
          :disabled="!isInitialized"
          @click="applyCrop" />
      </div>
    </div>

    <!-- Crop Area -->
    <div ref="cropContainer" class="crop-container">
      <div ref="cropWrapper" class="crop-wrapper">
        <img
          ref="cropImage"
          :src="imageUrl"
          alt="crop preview"
          class="crop-image"
          @load="initializeCrop"
          @error="handleImageError" />

        <!-- Crop Overlay -->
        <div v-if="isInitialized" class="crop-overlay">
          <!-- Dark overlay outside crop area -->
          <div class="crop-mask">
            <!-- Top mask -->
            <div
              class="crop-mask-top"
              :style="{ height: cropData.y + '%' }"></div>
            <!-- Bottom mask -->
            <div
              class="crop-mask-bottom"
              :style="{
                top: cropData.y + cropData.height + '%',
                height: 100 - cropData.y - cropData.height + '%',
              }"></div>
            <!-- Left mask -->
            <div
              class="crop-mask-left"
              :style="{
                top: cropData.y + '%',
                left: 0,
                width: cropData.x + '%',
                height: cropData.height + '%',
              }"></div>
            <!-- Right mask -->
            <div
              class="crop-mask-right"
              :style="{
                top: cropData.y + '%',
                left: cropData.x + cropData.width + '%',
                width: 100 - cropData.x - cropData.width + '%',
                height: cropData.height + '%',
              }"></div>
          </div>

          <div
            ref="cropBox"
            class="crop-box"
            :style="cropBoxStyle"
            @mousedown="startMove($event)"
            @touchstart="startMove($event)">
            <!-- Corner handles -->
            <div
              class="crop-handle corner top-left"
              @mousedown="startResize('top-left', $event)"
              @touchstart="startResize('top-left', $event)"></div>
            <div
              class="crop-handle corner top-right"
              @mousedown="startResize('top-right', $event)"
              @touchstart="startResize('top-right', $event)"></div>
            <div
              class="crop-handle corner bottom-left"
              @mousedown="startResize('bottom-left', $event)"
              @touchstart="startResize('bottom-left', $event)"></div>
            <div
              class="crop-handle corner bottom-right"
              @mousedown="startResize('bottom-right', $event)"
              @touchstart="startResize('bottom-right', $event)"></div>

            <!-- Edge handles -->
            <div
              class="crop-handle edge top"
              @mousedown="startResize('top', $event)"
              @touchstart="startResize('top', $event)"></div>
            <div
              class="crop-handle edge bottom"
              @mousedown="startResize('bottom', $event)"
              @touchstart="startResize('bottom', $event)"></div>
            <div
              class="crop-handle edge left"
              @mousedown="startResize('left', $event)"
              @touchstart="startResize('left', $event)"></div>
            <div
              class="crop-handle edge right"
              @mousedown="startResize('right', $event)"
              @touchstart="startResize('right', $event)"></div>

            <!-- Crop box border -->
            <div class="crop-box-border"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="!isInitialized" class="loading-indicator">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  imageUrl: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  "crop-applied": [croppedUrl: string];
}>();

const cropContainer = ref<HTMLDivElement | null>(null);
const cropWrapper = ref<HTMLDivElement | null>(null);
const cropImage = ref<HTMLImageElement | null>(null);
const cropBox = ref<HTMLDivElement | null>(null);

const isInitialized = ref(false);
const isResizing = ref(false);
const isMoving = ref(false);
const resizeHandle = ref("");
const startX = ref(0);
const startY = ref(0);
const startCrop = ref<CropData>({ x: 0, y: 0, width: 0, height: 0 });
const imageError = ref(false);

const cropData = ref<CropData>({
  x: 10,
  y: 10,
  width: 80,
  height: 80,
});

const selectedAspect = ref("free");

const aspectRatios = [
  { value: "free", label: "Free" },
  { value: "1:1", label: "1:1" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
];

const cropBoxStyle = computed(() => {
  return {
    left: `${cropData.value.x}%`,
    top: `${cropData.value.y}%`,
    width: `${cropData.value.width}%`,
    height: `${cropData.value.height}%`,
  };
});

const setupEventListeners = () => {
  document.addEventListener("mousemove", handleMouseMove, {
    passive: false,
  });
  document.addEventListener("mouseup", stopInteraction);
  document.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });
  document.addEventListener("touchend", stopInteraction);
  document.addEventListener("touchcancel", stopInteraction);
};

const removeEventListeners = () => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", stopInteraction);
  document.removeEventListener("touchmove", handleTouchMove);
  document.removeEventListener("touchend", stopInteraction);
  document.removeEventListener("touchcancel", stopInteraction);
};

const handleImageError = () => {
  imageError.value = true;
  console.error("Failed to load image for cropping:", props.imageUrl);
};

const initializeCrop = () => {
  if (!cropImage.value || !cropContainer.value || imageError.value) return;

  // Wait for next tick to ensure DOM is fully rendered
  nextTick(() => {
    // Set initial crop area (center 80% of image)
    cropData.value = {
      x: 10,
      y: 10,
      width: 80,
      height: 80,
    };

    isInitialized.value = true;

    // Ensure crop container is properly sized
    if (cropContainer.value) {
      cropContainer.value.style.height = "100%";
      cropContainer.value.style.width = "100%";
    }
  });
};

const startMove = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  event.stopPropagation();

  isMoving.value = true;
  resizeHandle.value = "move";

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  startX.value = clientX;
  startY.value = clientY;
  startCrop.value = { ...cropData.value };
};

const startResize = (handle: string, event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  event.stopPropagation();

  isResizing.value = true;
  resizeHandle.value = handle;

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  startX.value = clientX;
  startY.value = clientY;
  startCrop.value = { ...cropData.value };
};

const handleMouseMove = (event: MouseEvent) => {
  processMove(event);
};

const handleTouchMove = (event: TouchEvent) => {
  processMove(event);
};

const processMove = (event: MouseEvent | TouchEvent) => {
  if (!isResizing.value && !isMoving.value) return;

  if (isResizing.value) {
    handleResize(event);
  } else if (isMoving.value) {
    handleMove(event);
  }
};

const handleMove = (event: MouseEvent | TouchEvent) => {
  if (!isMoving.value || !cropContainer.value) return;

  event.preventDefault();

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  const deltaX = clientX - startX.value;
  const deltaY = clientY - startY.value;

  const containerRect = cropContainer.value.getBoundingClientRect();
  const deltaXPercent = (deltaX / containerRect.width) * 100;
  const deltaYPercent = (deltaY / containerRect.height) * 100;

  const newX = Math.max(
    0,
    Math.min(100 - startCrop.value.width, startCrop.value.x + deltaXPercent)
  );
  const newY = Math.max(
    0,
    Math.min(100 - startCrop.value.height, startCrop.value.y + deltaYPercent)
  );

  cropData.value = {
    ...startCrop.value,
    x: newX,
    y: newY,
  };
};

const handleResize = (event: MouseEvent | TouchEvent) => {
  if (!isResizing.value || !cropContainer.value) return;

  event.preventDefault();

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  const deltaX = clientX - startX.value;
  const deltaY = clientY - startY.value;

  const containerRect = cropContainer.value.getBoundingClientRect();
  const deltaXPercent = (deltaX / containerRect.width) * 100;
  const deltaYPercent = (deltaY / containerRect.height) * 100;

  updateCropData(deltaXPercent, deltaYPercent);
};

const updateCropData = (deltaX: number, deltaY: number) => {
  const newCrop = { ...startCrop.value };
  const minSize = 5; // Minimum crop size percentage

  switch (resizeHandle.value) {
    case "top-left": {
      const newXTL = Math.max(0, startCrop.value.x + deltaX);
      const newYTL = Math.max(0, startCrop.value.y + deltaY);
      const newWidthTL = Math.max(minSize, startCrop.value.width - deltaX);
      const newHeightTL = Math.max(minSize, startCrop.value.height - deltaY);

      // Ensure boundaries are respected
      if (newXTL + newWidthTL <= 100 && newYTL + newHeightTL <= 100) {
        newCrop.x = newXTL;
        newCrop.y = newYTL;
        newCrop.width = newWidthTL;
        newCrop.height = newHeightTL;
      }
      break;
    }
    case "top-right": {
      const newYTR = Math.max(0, startCrop.value.y + deltaY);
      const newWidthTR = Math.max(minSize, startCrop.value.width + deltaX);
      const newHeightTR = Math.max(minSize, startCrop.value.height - deltaY);

      // Ensure boundaries are respected
      if (
        startCrop.value.x + newWidthTR <= 100 &&
        newYTR + newHeightTR <= 100
      ) {
        newCrop.y = newYTR;
        newCrop.width = newWidthTR;
        newCrop.height = newHeightTR;
      }
      break;
    }
    case "bottom-left":
      newCrop.x = Math.max(0, startCrop.value.x + deltaX);
      newCrop.width = Math.max(minSize, startCrop.value.width - deltaX);
      newCrop.height = Math.max(minSize, startCrop.value.height + deltaY);
      break;
    case "bottom-right":
      newCrop.width = Math.max(minSize, startCrop.value.width + deltaX);
      break;
    case "top": {
      const newY = Math.max(0, startCrop.value.y + deltaY);
      const newHeight = Math.max(minSize, startCrop.value.height - deltaY);
      // Ensure we don't go beyond the bottom boundary
      if (newY + newHeight <= 100) {
        newCrop.y = newY;
        newCrop.height = newHeight;
      }
      break;
    }

    case "bottom":
      newCrop.height = Math.max(minSize, startCrop.value.height + deltaY);
      break;
    case "left":
      newCrop.x = Math.max(0, startCrop.value.x + deltaX);
      newCrop.width = Math.max(minSize, startCrop.value.width - deltaX);
      break;
    case "right":
      newCrop.width = Math.max(minSize, startCrop.value.width + deltaX);
      break;
  }

  // Ensure crop stays within bounds
  if (newCrop.x + newCrop.width > 100) {
    newCrop.width = 100 - newCrop.x;
  }
  if (newCrop.y + newCrop.height > 100) {
    newCrop.height = 100 - newCrop.y;
  }

  cropData.value = newCrop;
};

const stopInteraction = () => {
  isResizing.value = false;
  isMoving.value = false;
  resizeHandle.value = "";
};

const setAspectRatio = (ratio: string) => {
  selectedAspect.value = ratio;
  // Apply aspect ratio logic here if needed
};

const handleCancel = () => {
  emit("close");
};

const applyCrop = () => {
  if (!isInitialized.value || !cropImage.value) {
    console.error("Crop not initialized or image not loaded");
    return;
  }

  try {
    // Create canvas to crop the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Could not get canvas context");
      return;
    }

    const img = cropImage.value;
    const cropX = (cropData.value.x / 100) * img.naturalWidth;
    const cropY = (cropData.value.y / 100) * img.naturalHeight;
    const cropWidth = (cropData.value.width / 100) * img.naturalWidth;
    const cropHeight = (cropData.value.height / 100) * img.naturalHeight;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    // Clear canvas and draw the cropped image
    ctx.clearRect(0, 0, cropWidth, cropHeight);
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Convert to blob and create URL
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          emit("crop-applied", croppedUrl);
        } else {
          console.error("Failed to create blob from canvas");
        }
      },
      "image/jpeg",
      0.9
    );
  } catch (error) {
    console.error("Error during crop operation:", error);
  }
};

watch(
  () => cropImage.value,
  (newVal) => {
    if (newVal) {
      newVal.addEventListener("load", initializeCrop);
      if (newVal.complete) {
        initializeCrop();
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  setupEventListeners();
});

onBeforeUnmount(() => {
  removeEventListeners();
});
</script>

<style lang="scss" scoped>
.crop-modal {
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
  background: #000;
}

.crop-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  z-index: 20;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
}

.crop-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.cancel-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  &.apply-btn {
    background: #ff6b35;
    color: white;

    &:hover {
      background: #e55a2b;
    }
  }
}

.crop-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 0;
  width: 100%;
  height: 100%;
}

.crop-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crop-image {
  max-width: 100%;
  height: 100vh;
  object-fit: cover;
  display: block;
}

.crop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.crop-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.crop-mask-top,
.crop-mask-bottom,
.crop-mask-left,
.crop-mask-right {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  pointer-events: none;
}

.crop-mask-top {
  top: 0;
  left: 0;
  right: 0;
}

.crop-mask-bottom {
  left: 0;
  right: 0;
}

.crop-mask-left {
  top: 0;
}

.crop-mask-right {
  top: 0;
}

.crop-box {
  position: absolute;
  border: 2px solid #ff6b35;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  pointer-events: all;
  cursor: move;
  z-index: 10;
}

.crop-handle {
  position: absolute;
  background: #ff6b35;
  border: 2px solid white;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  pointer-events: all;

  &.top-left {
    top: -6px;
    left: -6px;
    cursor: nw-resize;
  }

  &.top-right {
    top: -6px;
    right: -6px;
    cursor: ne-resize;
  }

  &.bottom-left {
    bottom: -6px;
    left: -6px;
    cursor: sw-resize;
  }

  &.bottom-right {
    bottom: -6px;
    right: -6px;
    cursor: se-resize;
  }

  &.top {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    cursor: n-resize;
  }

  &.bottom {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    cursor: s-resize;
  }

  &.left {
    top: 50%;
    left: -6px;
    transform: translateY(-50%);
    cursor: w-resize;
  }

  &.right {
    top: 50%;
    right: -6px;
    transform: translateY(-50%);
    cursor: e-resize;
  }
}

.aspect-ratios {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  padding: 12px 16px;
  border-radius: 25px;
  z-index: 20;
}

.aspect-btn {
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  background: transparent;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 50px;
  text-align: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &.active {
    background: #ff6b35;
    border-color: #ff6b35;
    color: white;
  }
}

// Mobile optimizations
@media (max-width: 480px) {
  .crop-header {
    padding: 12px 16px;
  }

  .crop-btn {
    padding: 6px 12px;
    font-size: 13px;
  }

  .aspect-ratios {
    bottom: 16px;
    padding: 10px 12px;
    gap: 6px;
  }

  .aspect-btn {
    padding: 6px 12px;
    font-size: 12px;
    min-width: 40px;
  }

  .crop-handle {
    width: 10px;
    height: 10px;

    &.top-left,
    &.top-right,
    &.bottom-left,
    &.bottom-right {
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
    }
  }
}
</style>
