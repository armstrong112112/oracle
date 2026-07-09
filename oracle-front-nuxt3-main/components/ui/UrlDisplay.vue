<template>
  <div class="shareable-input-wrapper">
    <input
      ref="inputRef"
      :placeholder="placeholder"
      :value="urlValue"
      class="shareable-input"
      readonly />
    <div class="shareable-input-actions">
      <button class="shareable-action-btn" @click="copyToClipboard">
        <img src="/assets/svg/copy.svg" alt="copy" />
      </button>
      <button class="shareable-action-btn" @click="shareUrl">
        <img src="/assets/svg/share.svg" alt="share" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  url: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "URL",
});

const urlValue = computed(() => props.url);

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.url);
    // Можно добавить уведомление об успешном копировании
    console.log("URL скопирован в буфер обмена");
  } catch (error) {
    console.error("Ошибка при копировании:", error);
  }
}

async function shareUrl() {
  if (navigator.share) {
    try {
      await navigator.share({
        url: props.url,
      });
    } catch (error) {
      console.error("Ошибка при шаринге:", error);
    }
  } else {
    // Fallback для браузеров без поддержки Web Share API
    copyToClipboard();
  }
}
</script>

<style lang="scss" scoped>
.shareable-input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  gap: 10px;
  padding: 11px 12px;
  background: #13121b;
  border: 1px solid #2b2741;
}

.shareable-input {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;
}

.shareable-input::placeholder {
  color: #67639a;
}

.shareable-input-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.shareable-action-btn {
  background: #2c2a3d;
  border: none;
  cursor: pointer;
  padding: 12px;
  margin: -6px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.shareable-action-btn:nth-child(1) {
  margin-right: 0;
}

.shareable-action-btn:hover {
  background: #2b2741;
}

.shareable-action-btn img {
  width: 16px;
  height: 16px;
}
</style>
