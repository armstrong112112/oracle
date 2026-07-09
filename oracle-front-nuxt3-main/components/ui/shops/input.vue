<template>
  <div class="input__container">
    <div class="input__label">
      <label :for="forWho">
        {{ label }}
        <span v-if="hint"> (In months) </span>
      </label>
      <img v-if="withHelp" src="/svg/shop/icons/question.svg" alt="question" />
    </div>
    <input
      :id="forWho"
      :placeholder="placeholder"
      :name="forWho"
      :type="type"
      :value="value"
      @input="onInput" />
    <div v-if="withIcon" class="input__icon">
      <slot name="icon" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";

interface Props {
  title?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  forWho?: string;
  value?: string;
  icon?: string;
  withIcon?: boolean;
  help?: string;
  withHelp?: boolean;
  hint?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  input: [value: string];
}>();

watch(
  () => props.value,
  (newValue) => {
    if (newValue) {
      emit("input", newValue);
    }
  },
  { immediate: true }
);

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
}
</script>
<style lang="scss">
.input__container {
  margin-top: 16px;
  width: 100%;
  position: relative;

  .input__label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    label {
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 14px;
      span {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #bfb7ff;
      }
    }
  }

  input {
    margin-top: 10px;
    width: 100%;
    height: 44px;
    padding: 11px 12px;
    background-color: #13121b;
    border: none;
    border-radius: 12px;
    color: #fff;
    &::placeholder {
      color: #fff;
      color: rgba(255, 255, 255, 0.6);
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 14px;
    }

    &:focus {
      outline: none;
    }
  }

  .input__icon {
    position: absolute;
    right: 12px;
    bottom: 11px;
  }
}
</style>
