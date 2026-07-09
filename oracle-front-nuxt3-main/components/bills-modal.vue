<template>
  <div v-if="isOpen" class="bills-modal-overlay" @click="closeModal">
    <div
      class="bills-modal-content"
      @click.stop
      :style="{ maxWidth: maxWidth }">
      <div class="bills-modal-header">
        <h2 class="bills-modal-title">{{ title }}</h2>
        <button class="bills-modal-close" @click="closeModal">
          <img src="/svg/close.svg" alt="close" />
        </button>
      </div>
      <div class="bills-modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  isOpen: boolean;
  title: string;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: "800px",
});

// Emits
const emit = defineEmits<{
  close: [];
}>();

// Methods
const closeModal = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.bills-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.bills-modal-content {
  background: #13121b;
  border-radius: 16px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;

  border: 1px solid #2b2741;
}

.bills-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #2b2741;
}

.bills-modal-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 135%;
  color: white;
  margin: 0;
}

.bills-modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #2b2741;
  }

  img {
    width: 20px;
    height: 20px;
  }
}

.bills-modal-body {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 24px 24px;

  /* Стилизация скролла */
  scrollbar-width: thin;
  scrollbar-color: #7a74ba #1b1a24;
  max-height: 80vh;

  &::-webkit-scrollbar {
    width: 8px;
    background: #1b1a24;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #7a74ba;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a29be7;
  }
}
</style>
