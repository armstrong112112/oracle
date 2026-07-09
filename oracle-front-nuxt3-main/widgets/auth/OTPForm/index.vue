<template>
  <div class="otp-form">
    <input
      v-for="(digit, index) in otpDigits"
      :key="index"
      ref="otpInputs"
      v-model="otpDigits[index]"
      class="otp-box"
      :class="{ 'otp-box-typed': digit !== '' }"
      maxlength="1"
      @input="handleInput(index)"
      @keydown="handleKeyDown($event, index)"
      @focus="handleFocus(index)" />
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  length?: number;
  value?: string;
}
const props = withDefaults(defineProps<Props>(), {
  length: 4,
  value: "",
});

// Emits
const emit = defineEmits<{
  input: [value: string];
  complete: [value: string];
}>();

// State
const otpDigits = ref<string[]>([]);

// Template refs
const otpInputs = ref<HTMLInputElement[]>([]);

// Lifecycle
onMounted(() => {
  initializeOtp();
});

// Watchers
watch(
  () => props.value,
  () => {
    initializeOtp();
  }
);

// Methods
const initializeOtp = () => {
  otpDigits.value = Array(props.length).fill("");
  if (props.value) {
    const valueArray = props.value.split("");
    otpDigits.value = Array(props.length)
      .fill("")
      .map((_, i) => valueArray[i] || "");
    emit("input", otpDigits.value.join(""));
  }
};

const handleInput = (index: number) => {
  otpDigits.value[index] = otpDigits.value[index].replace(/[^0-9]/g, "");

  if (otpDigits.value[index] && index < props.length - 1) {
    focusInput(index + 1);
  }

  const combinedValue = otpDigits.value.join("");
  emit("input", combinedValue);

  if (combinedValue.length === props.length) {
    emit("complete", combinedValue);
  }
};

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  if (event.key === "Backspace") {
    if (otpDigits.value[index] === "" && index > 0) {
      focusInput(index - 1);
    }
  }
};

const handleFocus = (index: number) => {
  selectInput(index);
};

const focusInput = (index: number) => {
  if (!otpInputs.value) return;

  const inputs = otpInputs.value;
  if (Array.isArray(inputs) && inputs[index]) {
    inputs[index].focus();
  }
};

const selectInput = (index: number) => {
  if (!otpInputs.value) return;

  const inputs = otpInputs.value;
  if (Array.isArray(inputs) && inputs[index]) {
    inputs[index].select();
  }
};

const focusFirstInput = () => {
  setTimeout(() => {
    focusInput(0);
  }, 0);
};

// Expose methods for parent components
defineExpose({
  focusFirstInput,
});
</script>

<style scoped lang="scss">
.otp-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.otp-box {
  padding: 10px;
  width: 54px;
  height: 64px;
  border-radius: 20px;
  border: 1px solid #2b2741;
  outline: none;
  background: transparent;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 135%;
  letter-spacing: 0;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: border-color 0.3s;
}

.otp-box:focus {
  border: 1px solid #f64e2a;
}

.otp-box-typed {
  border: 1px solid #2b2741;
}
</style>
