<template>
  <div class="new-creating-card">
    <Dropdown
      :items="CryptoScale"
      :value="selectedCrypto"
      style="padding: 0; width: 100%" />
    <div class="new-creating-card-body">
      <div class="new-creating-card-body-header">
        <input
          v-model.number="inputAmount"
          class="new-creating-card-body-header-title"
          :class="[inputAmountDecimal === '0.00' ? 'text-violet' : null]"
          placeholder="0.00"
          type="number"
          min="0"
          inputmode="numeric" />
        <div class="new-creating-card-body-header-description">
          {{ selectedCrypto.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CryptoScale } from "~/entities/oracle-pay/data/CryptoScale";
import Dropdown from "~/components/ui/Dropdown.vue";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Interfaces
interface Crypto {
  id: number;
  title: string;
  checked: boolean;
  icon: string;
}

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const inputAmount = ref<number>(0);
const feePercent = ref<number>(1.11);
const isDropdownOpen = ref<boolean>(false);
const selectedCrypto = ref<Crypto>(CryptoScale[0]);

// Methods
const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectCrypto = (crypto: Crypto): void => {
  selectedCrypto.value = crypto;
  isDropdownOpen.value = false;
};

// Computed
const inputAmountInteger = computed((): string => {
  return inputAmount.value.toFixed(2).split(".")[0];
});

const inputAmountDecimal = computed((): string => {
  return inputAmount.value.toFixed(2).split(".")[1];
});

const netAmount = computed((): number => {
  const fee = (inputAmount.value * feePercent.value) / 100;
  return inputAmount.value - fee;
});

const netAmountInteger = computed((): string => {
  return netAmount.value.toFixed(2).split(".")[0];
});

const netAmountDecimal = computed((): string => {
  return netAmount.value.toFixed(2).split(".")[1];
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/widgets/pre-paid-withdrawal.scss" as *;
</style>
