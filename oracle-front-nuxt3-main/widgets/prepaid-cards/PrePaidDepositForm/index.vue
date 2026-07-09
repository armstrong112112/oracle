<template>
  <div class="new-creating-card">
    <Dropdown :items="CryptoScale" :value="selectedCrypto" />
    <div class="new-creating-card-body">
      <div class="new-creating-card-body-header">
        <input
          v-model="displayAmount"
          class="new-creating-card-body-header-title"
          :class="[
            isError ? 'text-red' : null,
            displayAmount === '0.00' ? 'text-violet' : null,
          ]"
          placeholder="0.00"
          type="text"
          min="0"
          inputmode="numeric"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur" />
        <div class="new-creating-card-body-header-description">
          {{ selectedCrypto.title }}
        </div>
      </div>

      <div class="new-creating-card-body-content">
        <div class="flex flex-col w-full gap-8">
          <div class="flex items-center justify-between">
            <div class="new-creating-card-body-content-title">
              $ {{ netAmountInteger
              }}<span class="decimal">.{{ netAmountDecimal }}</span>
            </div>
            <img
              src="/icons/mixing/swap.svg"
              alt="swap"
              class="new-creating-card-body-swap cursor-pointer" />
          </div>
          <div v-if="validationMessage" class="error_text">
            {{ validationMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CryptoScale } from "~/entities/oracle-pay/data/CryptoScale";
import Dropdown from "~/components/ui/Dropdown.vue";
import { useEscrowStore } from "~/store/escrow";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

interface Crypto {
  id: number;
  title: string;
  checked: boolean;
  icon: string;
}

// Props
const props = withDefaults(
  defineProps<{
    isEscrow?: boolean;
  }>(),
  {
    isEscrow: false,
  }
);

// Composables
const escrowStore = useEscrowStore();
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const inputAmount = ref("0");
const displayAmount = ref("0.00");
const isError = ref(false);
const validationMessage = ref("");
const isFocused = ref(false);

// Data

// Computed
const selectedCrypto = computed(() => prepaidCardsStore.selectedCrypto);
const netAmount = computed(() => {
  const amount = parseFloat(inputAmount.value) || 0;
  const fee = amount * (prepaidCardsStore.feePercent / 100);
  return amount - fee;
});

const netAmountInteger = computed(() => {
  return netAmount.value.toFixed(2).split(".")[0];
});

const netAmountDecimal = computed(() => {
  return netAmount.value.toFixed(2).split(".")[1];
});

// Methods
const handleFocus = (): void => {
  isFocused.value = true;
  // Clear default value when user starts typing
  if (inputAmount.value === "0") {
    inputAmount.value = "";
    displayAmount.value = "";
  }
};

const handleBlur = (): void => {
  isFocused.value = false;
  // Format display when user leaves input
  formatDisplay();
};

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  let value = target.value;
  const cursorPosition = target.selectionStart || 0;

  value = value.replace(/[^0-9.]/g, "");

  const dotCount = (value.match(/\./g) || []).length;
  if (dotCount > 1) {
    value = value.substring(0, value.lastIndexOf("."));
  }

  const dotIndex = value.indexOf(".");
  if (dotIndex !== -1 && value.length > dotIndex + 3) {
    value = value.substring(0, dotIndex + 3);
  }

  if (value.length > 1 && value.startsWith("0") && value[1] !== ".") {
    value = value.substring(1);
  }

  inputAmount.value = value;

  if (isFocused.value) {
    formatDisplayWhileTyping();
    // Set cursor position after formatting
    nextTick(() => {
      if (target) {
        // If we're typing numbers and no dot, keep cursor before the .00
        if (!value.includes(".") && value !== "") {
          target.setSelectionRange(value.length, value.length);
        } else {
          target.setSelectionRange(cursorPosition, cursorPosition);
        }
      }
    });
  } else {
    displayAmount.value = value;
  }
  emit(
    "update:amount",
    inputAmount.value === "" ? 0 : parseFloat(inputAmount.value)
  );

  validateInput();
};

const formatDisplayWhileTyping = (): void => {
  displayAmount.value = inputAmount.value;
};

const formatDisplay = (): void => {
  if (inputAmount.value === "" || inputAmount.value === "0") {
    inputAmount.value = "0";
    displayAmount.value = "0";
    return;
  }

  const value = parseFloat(inputAmount.value);
  if (!isNaN(value)) {
    // Show as integer if no decimals, otherwise show up to 2 decimals (no trailing zeros)
    inputAmount.value = value.toString();
    displayAmount.value =
      value % 1 === 0
        ? value.toString()
        : value.toFixed(2).replace(/\.?0+$/, "");
  }
};

const validateInput = (): void => {
  isError.value = false;
  validationMessage.value = "";

  if (inputAmount.value === "" || inputAmount.value === "0") {
    return;
  }

  const value = parseFloat(inputAmount.value);
  const balance = 2500;

  if (isNaN(value)) {
    isError.value = true;
    validationMessage.value = "Please enter a valid number";
    return;
  }

  if (value <= 0) {
    isError.value = true;
    validationMessage.value = "Amount must be greater than 0";
    return;
  }

  if (value > balance) {
    isError.value = true;
    validationMessage.value =
      "Oops! That amount exceeds your balance. Please enter a lower amount.";
    return;
  }

  // Check minimum amount (example: minimum 0.01)
  if (value < 0.01) {
    isError.value = true;
    validationMessage.value =
      "Minimum amount is 0.01 " + selectedCrypto.value.title;
  }
};

// Emits
const emit = defineEmits<{
  "update:amount": [amount: number];
}>();

// Watchers
watch(inputAmount, (newVal: string) => {
  if (props.isEscrow) {
    escrowStore.setEscrow({
      inputAmount: newVal,
    });
  }
});

// Lifecycle
onMounted(() => {
  if (props.isEscrow) {
    escrowStore.setEscrow({
      selectedCrypto: selectedCrypto.value,
      inputAmount: inputAmount.value,
    });
  }

  validateInput();
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/widgets/pre-paid-deposit-form.scss" as *;
</style>
