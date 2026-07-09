<template>
  <div class="payout_address flex flex-col gap-16">
    <div
      v-for="(address, index) in addresses"
      :key="index"
      class="flex flex-col gap-8">
      <div class="flex items-center justify-between">
        <div class="payout_address_title">
          {{ t("mixing.payoutAddress", { number: index + 1 }) }}
        </div>
        <img
          v-if="index > 0"
          src="/icons/profile/close.svg"
          alt="close"
          class="cursor-pointer"
          @click="removeAddress(index)" />
      </div>
      <div class="payout_address_cards relative flex flex-col gap-8">
        <div class="payout_address_card_input flex items-center justify-start">
          <input
            v-model="address.input"
            type="text"
            :placeholder="t('mixing.address')"
            @input="handleInput(index)" />
          <div class="flex gap-16">
            <img
              v-if="!address.input"
              src="/icons/mixing/search.svg"
              alt="search"
              class="cursor-pointer" />
            <img
              v-if="!address.input"
              src="/icons/mixing/scan.svg"
              alt="scan"
              class="cursor-pointer" />
          </div>
        </div>
        <div class="new_creating_card">
          <div class="new_creating_card_body">
            <div
              class="new_creating_card_body_header flex items-center justify-between">
              <input
                v-model="address.amount"
                class="new_creating_card_body_header_title"
                :placeholder="t('mixing.amountPlaceholder')"
                type="text"
                min="0"
                inputmode="numeric"
                @input="sanitizeInput($event, index)"
                @keyup="calculateFee(index)" />
              <div
                class="new_creating_card_body_header_description"
                v-if="!address.amount">
                {{ t("mixing.all") }}
              </div>
              <img
                v-if="parseFloat(address.amount) > 0"
                src="/icons/mixing/backspace.svg"
                alt="backspace"
                class="cursor-pointer"
                @click="handleBackspace(index)" />
            </div>
            <div
              class="new_creating_card_body_body flex items-center justify-between">
              <div class="new_creating_card_body_body_title">
                $ {{ address.netAmountInteger
                }}<span class="decimal">.{{ address.netAmountDecimal }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pre_finished_fees">
          <div class="pre_finished_fees_title">{{ t("mixing.fees") }}</div>
          <div class="pre_finished_fees_fee">{{ address.fee }} USDT</div>
        </div>
      </div>
    </div>
    <div class="payout_line"></div>
    <CustomButton
      v-if="addresses.length < 3"
      :value="t('mixing.addAnotherPayoutAddress')"
      type="secondary"
      @click="addAddress" />
  </div>
</template>

<script setup lang="ts">
import { hasAnyValidAmount } from "~/composables/checker";
import { calculateNetAmount } from "~/composables/fee";
import { sanitizeAmountInput } from "~/composables/formatter";
import CustomButton from "~/components/ui/Button.vue";
import { useMixingStore } from "~/store/mixing";

// Composables
const { t } = useI18n();
const mixingStore = useMixingStore();

// Reactive state
const feePercent = ref(1.11);

// Computed
const addresses = computed(() => mixingStore.addresses);

// Methods
const addAddress = (): void => {
  mixingStore.addAddress();
  emitInputChanged();
};

const removeAddress = (index: number): void => {
  mixingStore.removeAddress(index);
  emitInputChanged();
};

const handleInput = (index: number): void => {
  calculateFee(index);
};

const sanitizeInput = (event: Event, index: number): void => {
  const input = (event.target as HTMLInputElement).value;
  const sanitizedAmount = sanitizeAmountInput(input);
  mixingStore.updateAddress(index, { amount: sanitizedAmount });
};

const handleBackspace = (index: number): void => {
  const address = addresses.value[index];
  const current = address.amount.toString();
  const updated = current.slice(0, -1) || "0";
  mixingStore.updateAddress(index, { amount: updated });
  calculateFee(index);
  emitInputChanged();
};

const calculateFee = (index: number): void => {
  const address = addresses.value[index];
  const result = calculateNetAmount(address.amount, feePercent.value);
  mixingStore.updateAddress(index, {
    fee: result.fee,
    netAmount: result.netAmount,
    netAmountInteger: result.netAmountInteger,
    netAmountDecimal: result.netAmountDecimal,
  });
};

const emitInputChanged = (): void => {
  const isValid = hasAnyValidAmount(addresses.value);
  emit("input-changed", isValid ? "valid" : "");
};

// Emits
const emit = defineEmits<{
  "input-changed": [value: string];
}>();
</script>

<style lang="scss" scoped>
@use "@/assets/styles/widgets/payout-address.scss" as *;
</style>
