<template>
  <div class="form-parent">
    <label v-if="label" :for="localValue" class="form-label">{{ label }}</label>
    <div class="the-input" :class="inputStyle">
      <img
        v-if="image"
        :src="`/icons/verification/${image}.svg`"
        alt="Remove"
        @click="removeValue" />

      <input
        :id="localValue"
        ref="input"
        :value="localValue"
        :placeholder="placeholder"
        :readonly="isReadOnly"
        :type="
          isUse === 'password' ? (showPassword ? 'text' : 'password') : type
        "
        @input="updateValue(($event.target as HTMLInputElement).value)"
        @keydown="handleKeydown($event)" />
      <img
        v-if="isRemove"
        src="/icons/verification/trash.svg"
        alt="Remove"
        @click="removeValue" />
      <img
        v-if="isUse === 'password' && !showPassword"
        src="/icons/auth/closed_eye.svg"
        alt="closed_eye"
        style="cursor: pointer"
        @click="togglePasswordVisibility" />
      <img
        v-if="isUse === 'password' && showPassword"
        src="/icons/auth/opened_eye.svg"
        alt="opened_eye"
        style="cursor: pointer"
        @click="togglePasswordVisibility" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";

interface Props {
  value?: string;
  placeholder: string;
  error?: string;
  isReadOnly?: boolean;
  isRemove?: boolean;
  label?: string;
  image?: string;
  type?: string;
  isUse?: string;
  inputStyle?: string;
  autofocus?: boolean;
  onKeydown?: ((e: KeyboardEvent) => void) | null;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  isReadOnly: false,
  isRemove: true,
  label: "",
  image: "",
  type: "text",
  isUse: "text",
  inputStyle: "text",
  autofocus: false,
  onKeydown: null,
});

const emit = defineEmits<{
  "update:value": [value: string];
}>();

const showPassword = ref(false);
const input = ref<HTMLInputElement>();

const localValue = computed({
  get: () => props.value,
  set: (newValue: string) => {
    emit("update:value", newValue);
  },
});

function updateValue(newValue: string) {
  localValue.value = newValue;
}

function removeValue() {
  localValue.value = "";
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function handleKeydown(e: KeyboardEvent) {
  if (props.onKeydown) {
    props.onKeydown(e);
  }
}

onMounted(() => {
  if (props.autofocus) {
    nextTick(() => {
      input.value?.focus();
    });
  }
});
</script>
<style lang="scss">
.form-parent {
  display: flex;
  flex-direction: column;
  gap: 4px;
  .form-label {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0;
    color: white;
  }
  .the-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 12px;
    gap: 10px;
    padding: 11px 12px;
    background: #13121b;
    input {
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      letter-spacing: 0;
      color: white;
      width: 100%;
      background: transparent;
      border: 0;
      outline: none;
    }
    input::placeholder {
      color: #67639a;
    }

    img {
      cursor: pointer;
    }
  }
  .blur {
    background: #61616133;
    input::placeholder {
      margin-top: 2px;
      color: #ffffff8c;
    }
  }
}
</style>
