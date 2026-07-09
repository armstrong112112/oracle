<template>
  <div class="textarea-oracle">
    <textarea
      id=""
      v-model="localValue"
      cols="30"
      rows="7"
      maxlength="500"
      class="form-textarea"
      :placeholder="placeholder"
      @input="handleInput"
    ></textarea>
    <span class="max-value">{{ localValue.length }} / 500</span>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  placeholder?: string
  v?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  v: '',
})

// Emits
const emit = defineEmits<{
  changed: [value: string]
}>()

// Reactive state
const localValue = ref<string>(props.v)

// Watch for prop changes
watch(
  () => props.v,
  (newValue) => {
    localValue.value = newValue
  },
)

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  localValue.value = target.value
  emit('changed', localValue.value)
}
</script>

<style lang="scss">
.textarea-oracle {
  .form-textarea {
    width: 100%;
    background: #13121b;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 13px 14px;
    resize: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    &:focus {
      outline: none;
      border-color: #67639a;
    }
    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
    }
  }
  .max-value {
    display: block;
    margin-top: 8px 0 0 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
  }
}
</style>
