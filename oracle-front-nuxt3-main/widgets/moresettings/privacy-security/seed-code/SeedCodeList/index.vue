<template>
  <div class="seed-code__list">
    <label
      v-for="(word, index) in words"
      :key="index"
      :for="word.name"
      class="seed-code__item"
    >
      <input
        :id="word.name"
        type="checkbox"
        class="seed-code__checkbox"
        :value="word.name"
        :checked="!!word.selected"
        style="display: none"
        @change="handleChange(word)"
      />
      <div class="seed-code__custom">
        <span class="seed-code__order">
          {{ word.selected }}
        </span>
        <span class="seed-code__name">
          {{ word.name }}
        </span>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
interface SeedWord {
  id: number
  selected: string
  name: string
}

interface Props {
  words: SeedWord[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:words': [words: SeedWord[]]
}>()

const handleChange = (word: SeedWord) => {
  const updatedWords = [...props.words]
  const wordIndex = updatedWords.findIndex(w => w.id === word.id)

  if (wordIndex > -1) {
    const selectedIndex = updatedWords.findIndex(
      w => w.selected === word.selected && w.selected !== ''
    )

    if (selectedIndex > -1) {
      updatedWords[selectedIndex].selected = ''
    }

    if (word.selected) {
      updatedWords[wordIndex].selected = ''
    } else {
      const nextOrder = Math.max(
        0,
        ...updatedWords.map(w => parseInt(w.selected) || 0)
      ) + 1
      updatedWords[wordIndex].selected = nextOrder.toString()
    }

    emit('update:words', updatedWords)
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/pages/seed-code.scss" as *;
</style>