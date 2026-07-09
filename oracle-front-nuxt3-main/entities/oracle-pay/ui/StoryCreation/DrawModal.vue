<template>
  <div class="draw-modal-overlay" @click="closeModal">
    <div class="draw-modal" @click.stop>
      <div class="draw-header">
        <button class="close-btn" @click="closeModal">
          <img src="/icons/story/back.svg" alt="close" />
        </button>
        <div class="draw-title">Draw</div>
        <div>
          <CustomButton
            style="padding: 0 12px"
            value="Clear"
            type="blur"
            size="sm"
            @click="clearCanvas" />
        </div>
      </div>

      <div class="draw-canvas-container">
        <canvas
          ref="drawCanvas"
          class="draw-canvas"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
          @touchstart="startDrawing"
          @touchmove="draw"
          @touchend="stopDrawing"></canvas>
      </div>

      <div class="draw-tools">
        <div class="color-palette">
          <button
            v-for="color in colors"
            :key="color"
            class="color-btn"
            :class="{ active: selectedColor === color }"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)"></button>
        </div>

        <div class="brush-sizes">
          <button
            v-for="size in brushSizes"
            :key="size"
            class="brush-btn"
            :class="{ active: selectedBrushSize === size }"
            @click="selectBrushSize(size)">
            <div
              class="brush-preview"
              :style="{ width: size + 'px', height: size + 'px' }"></div>
          </button>
        </div>
      </div>

      <div class="draw-actions flex items-center justify-between">
        <div>
          <CustomButton
            style="padding: 0 12px"
            :value="$t('story.textEditor.cancel')"
            type="blur"
            size="sm"
            @click="closeModal" />
        </div>

        <div>
          <CustomButton
            style="padding: 0 12px"
            value="Apply"
            type="primary"
            size="sm"
            @click="applyDrawing" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

interface Props {
  imageUrl: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  "drawing-applied": [dataUrl: string];
}>();

const drawCanvas = ref<HTMLCanvasElement | null>(null);

const isDrawing = ref(false);
const selectedColor = ref("#ffffff");
const selectedBrushSize = ref(5);
const drawingArea = ref({ x: 0, y: 0, width: 0, height: 0 });
const colors = [
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

const brushSizes = [2, 5, 10, 15, 20];

const setupCanvas = () => {
  if (!drawCanvas.value) return;
  const canvas = drawCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Load and draw the image with proper aspect ratio
  const img = new Image();
  img.onload = () => {
    const container = canvas.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate aspect ratios for object-fit: cover behavior
    const imgAspect = img.width / img.height;
    const containerAspect = containerWidth / containerHeight;

    // For object-fit: cover, scale image to fill container completely
    let drawWidth;
    let drawHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > containerAspect) {
      // Image is wider - scale to fit height, crop width
      drawHeight = containerHeight;
      drawWidth = containerHeight * imgAspect;
      offsetX = (containerWidth - drawWidth) / 2;
    } else {
      // Image is taller - scale to fit width, crop height
      drawWidth = containerWidth;
      drawHeight = containerWidth / imgAspect;
      offsetY = (containerHeight - drawHeight) / 2;
    }

    // Set canvas size to match container
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Draw image with object-fit: cover behavior (scale to fill, crop excess)
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Store drawing area for coordinate conversion (actual image area)
    drawingArea.value = {
      x: offsetX,
      y: offsetY,
      width: drawWidth,
      height: drawHeight,
    };
  };
  img.src = props.imageUrl;

  // Set default drawing styles
  ctx.strokeStyle = selectedColor.value;
  ctx.lineWidth = selectedBrushSize.value;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
};

const startDrawing = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  isDrawing.value = true;
  if (!drawCanvas.value) return;
  const canvas = drawCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const x =
    (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) -
    rect.left;
  const y =
    (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) -
    rect.top;

  // Simple 1:1 coordinate mapping for accurate drawing
  const drawX = x;
  const drawY = y;

  ctx.beginPath();
  ctx.moveTo(drawX, drawY);
};

const draw = (event: MouseEvent | TouchEvent) => {
  if (!isDrawing.value) return;

  event.preventDefault();
  if (!drawCanvas.value) return;
  const canvas = drawCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const x =
    (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) -
    rect.left;
  const y =
    (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) -
    rect.top;

  // Simple 1:1 coordinate mapping for accurate drawing
  const drawX = x;
  const drawY = y;

  ctx.lineTo(drawX, drawY);
  ctx.stroke();
};

const stopDrawing = () => {
  isDrawing.value = false;
};

const selectColor = (color: string) => {
  selectedColor.value = color;
  if (!drawCanvas.value) return;
  const canvas = drawCanvas.value;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.strokeStyle = color;
  }
};

const selectBrushSize = (size: number) => {
  selectedBrushSize.value = size;
  if (!drawCanvas.value) return;
  const canvas = drawCanvas.value;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.lineWidth = size;
  }
};

const clearCanvas = () => {
  if (!drawCanvas.value) return;
  const canvas = drawCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Recalculate the same cover logic as in setupCanvas
    const containerWidth = canvas.width;
    const containerHeight = canvas.height;
    const imgAspect = img.width / img.height;
    const containerAspect = containerWidth / containerHeight;

    let drawWidth;
    let drawHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > containerAspect) {
      drawHeight = containerHeight;
      drawWidth = containerHeight * imgAspect;
      offsetX = (containerWidth - drawWidth) / 2;
    } else {
      drawWidth = containerWidth;
      drawHeight = containerWidth / imgAspect;
      offsetY = (containerHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };
  img.src = props.imageUrl;
};

const applyDrawing = () => {
  if (!drawCanvas.value) return;
  const canvas = drawCanvas.value;
  const dataUrl = canvas.toDataURL("image/png");
  emit("drawing-applied", dataUrl);
};

const closeModal = () => {
  emit("close");
};

onMounted(() => {
  setupCanvas();
});
</script>

<style lang="scss" scoped>
.draw-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  overflow: hidden;
  contain: layout;
}

.draw-modal {
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
}

.draw-header {
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

.draw-title {
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 18px;
}

.clear-btn {
  background: #262530b2;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  cursor: pointer;
}

.draw-canvas-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  object-fit: cover;
}

.draw-canvas {
  max-width: 100%;
  max-height: 100%;
  height: 100dvh;
  object-fit: cover;
  cursor: crosshair;
  display: block;
}

.draw-tools {
  position: absolute;
  bottom: 80px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.color-palette {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.color-btn {
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.color-btn.active {
  border-color: #fff;
  transform: scale(1.1);
}

.brush-sizes {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.brush-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #333;
  background: #262530;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.brush-btn.active {
  border-color: #fff;
  background: #444;
}

.brush-preview {
  border-radius: 50%;
  background: #fff;
}

.draw-actions {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px 24px;
  border-radius: 25px;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
</style>
