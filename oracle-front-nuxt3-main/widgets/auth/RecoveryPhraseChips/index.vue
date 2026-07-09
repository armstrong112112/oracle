<template>
  <div class="chips">
    <div
      v-for="(word, index) in predefinedWords"
      :key="`${word}-${index}`"
      :class="['chip', getWordSelectionClass(word)]"
      @click="isSignUp ? null : toggleWordSelection(word)">
      <div class="choose_chip">
        {{ index + 1 }}
      </div>
      <div class="chip_title">{{ word }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  isSignUp?: boolean;
  predefinedWords?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  isSignUp: false,
  predefinedWords: () => [],
});

// Emits
const emit = defineEmits<{
  complete: [words: string[]];
}>();

// State
const selectedWords = ref<string[]>([]);
const requiredWords = ref<number>(12);

// Methods
const toggleWordSelection = (word: string): void => {
  if (!props.isSignUp) {
    const index = selectedWords.value.indexOf(word);

    if (index !== -1) {
      selectedWords.value.splice(index, 1);
    } else if (selectedWords.value.length < requiredWords.value) {
      selectedWords.value.push(word);
    }
  }
};

const getWordSelectionClass = (word: string): string => {
  if (props.isSignUp) {
    return "sign-up-chip";
  }
  return selectedWords.value.includes(word) ? "chosen_chip" : "";
};

const onComplete = (): string[] => {
  const words = props.isSignUp ? props.predefinedWords : selectedWords.value;
  emit("complete", words);
  return words;
};
</script>
<style scoped>
.chips {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  width: 100%;
}

.chip {
  background: #181720;
  justify-content: space-between;
  display: flex;
  padding: 6px 12px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #2b2741;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}

.choose_chip {
  border: 1px solid #443d69;
  width: 20px;
  height: 22px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #fff;
}

.chosen_chip {
  background: #f64e2a;
}

.chosen_chip .choose_chip {
  background: white;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #000;
  width: 22px;
  height: 24px;
  border: none;
}

.continue-btn-active {
  background: #f64e2a;
  color: white;
  cursor: pointer;
  border: 1px solid transparent;
}
</style>
