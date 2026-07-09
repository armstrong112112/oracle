<template>
  <div class="bill-creating">
    <div class="flex flex-col gap-12">
      <TheInput :placeholder="$t('bills.title')" :is-remove="false" />
      <PrePaidDepositForm />
      <textarea
        :placeholder="$t('bills.description')"
        class="verification-textarea"
        maxlength="500" />
      <BillCreation />
    </div>
    <div class="bill-creating-footer">
      <CustomButton
        :value="$t('bills.create')"
        type="primary"
        class="w-full"
        @click="handleCreate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import BillCreation from "~/widgets/bills/BillCreation/index.vue";
import PrePaidDepositForm from "~/widgets/prepaid-cards/PrePaidDepositForm/index.vue";

const emit = defineEmits<{
  created: [];
}>();

const inputAmount = ref(0);
const feePercent = ref(1.11);
const selectedMode = ref("slow");

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

const selectMode = (mode: string) => {
  selectedMode.value = mode;
};

const handleCreate = () => {
  emit("created");
};
</script>

<style lang="scss" scoped>
.bill-creating {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bill-creating-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #2b2741;
}

.verification-textarea {
  background: #181720;
  border: 1px solid #2b2741;
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 130%;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: #7a74ba;
  }

  &:focus {
    outline: none;
    border-color: #f64e2a;
  }
}
</style>
