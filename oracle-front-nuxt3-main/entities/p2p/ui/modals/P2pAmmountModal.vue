<template>
    <div class="p2p-ammount-modal">
      <div class="p2p-ammount-modal__body">
        <input-oracle
          :value="ammountValue"
          @changed="handleChange"
          type="text"
          placeholder="Amount"
          :appendText="ammountCurrency"
        />
        <div class="p2p-ammount-modal__body-ammount">
          <span class="p2p-ammount-modal__ammount-sign">{{ formattedAmmount.sign }}</span>
          <span class="p2p-ammount-modal__ammount-integer">{{ formattedAmmount.integer }}</span>
          <span class="p2p-ammount-modal__ammount-decimal">.{{ formattedAmmount.decimal }}</span>
        </div>

      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { formatCurrency } from '~/composables/formatter'

interface Props {
  ammount: string;
  ammountCurrency?: string;
}

const props = withDefaults(defineProps<Props>(), {
  ammountCurrency: 'USD',
});

const emit = defineEmits<{
  select: [value: string];
}>();

// Reactive state
const ammountValue = ref<string>(props.ammount);
const formattedAmmount = ref(formatCurrency(Number(props.ammount) || 0, props.ammountCurrency));

// Watch for prop changes
watch(() => props.ammount, (newValue: string) => {
  formattedAmmount.value = formatCurrency(Number(newValue) || 0, props.ammountCurrency);
  ammountValue.value = newValue;
  emit('select', newValue);
});

// Methods
const handleChange = (value: string) => {
  formattedAmmount.value = formatCurrency(Number(value) || 0, props.ammountCurrency);
  ammountValue.value = value;
  emit('select', value);
};
</script>
  
  <style lang="scss">
    .p2p-ammount-modal {
      min-height: 300px;
      @media (min-width: 1024px) {
        min-height: auto;
      }
      &__body {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      &__ammount-sign {
        font-size: 20px;
        font-weight: 400;
        color: #8383AFCC;
      }
      &__ammount-integer {
        font-size: 20px;
        font-weight: 400;
        color: #8383AFCC;
        margin: 0 -2px;
      }
      &__ammount-decimal {
        font-size: 16px;
        font-weight: 400;
        color: #8383AFCC;
      }
    }
  </style>
  