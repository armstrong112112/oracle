<template>
  <div class="bill-payment">
    <div class="flex flex-col gap-24">
      <div v-if="!isCreated" class="flex flex-col gap-12 gap-8">
        <TheInput
          :placeholder="$t('bills.inputYourBillNumber')"
          :is-remove="false"
          :value="billNumber"
          @update:value="billNumber = $event" />
        <CustomButton
          :value="$t('bills.byQR')"
          is-image="scan"
          type="confirm"
          class="text-white" />
      </div>

      <div v-if="isCreated" class="flex flex-col gap-24">
        <div class="flex flex-col gap-4">
          <div class="payment_bill_title">
            {{ $t("bills.headingTextForBill") }}
          </div>
          <div class="payment_bill_description">
            {{ $t("bills.loremDescription") }}
          </div>
        </div>

        <div class="bills_created_header">
          <div class="bills_created_header_col">
            <div class="bills_created_header_col_title">
              {{ $t("bills.id") }}
            </div>
            <div class="bills_created_header_col_description">#9329103213</div>
          </div>
          <div class="bills_created_header_col">
            <div class="bills_created_header_col_title">
              {{ $t("bills.creationDate") }}
            </div>
            <div class="bills_created_header_col_description">May 20, 2025</div>
          </div>
          <div class="bills_created_header_col">
            <div class="bills_created_header_col_title">
              {{ $t("bills.dueDate") }}
            </div>
            <div class="bills_created_header_col_description">May 24, 2025</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bill-payment-footer">
      <div
        v-if="isCreated"
        class="bill_payment_info w-full flex items-center justify-between">
        <div class="flex items-center gap-8">
          <img src="/assets/svg/checks/udt.svg" style="width: 26px" alt="" />
          <div class="flex flex-col">
            <div class="bill_payment_info_title">USDT</div>
            <div class="bill_payment_info_price">2500 USDT</div>
          </div>
        </div>
        <img
          src="/assets/svg/arrow-down.svg"
          alt="down"
          class="cursor-pointer" />
      </div>

      <div v-if="isCreated" class="flex flex-col gap-8 w-full">
        <div class="flex flex-col gap-4">
          <div class="payment_bill_amount">{{ $t("bills.amount") }}</div>
          <div class="flex items-center gap-4">
            <div class="payment_bill_amount_price">0.0005 BTC</div>
            <div class="payment_bill_amount_equality">≈ $10.98</div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="bill_fee_title">{{ $t("bills.fees") }}</div>
          <div class="bill_fee_title_price">0.05 USDT</div>
        </div>
      </div>

      <div class="w-full">
        <CustomButton
          :value="isCreated ? $t('bills.payBill') : $t('bills.create')"
          :type="billNumber ? 'primary' : 'confirm'"
          class="w-full"
          @click="handleClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";

const emit = defineEmits<{
  paid: [];
}>();

const billNumber = ref("");
const isCreated = ref(false);

const handleClick = () => {
  if (!isCreated.value && billNumber.value) {
    isCreated.value = true;
  } else if (isCreated.value) {
    emit("paid");
  }
};
</script>

<style lang="scss" scoped>
.bill-payment {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bill-payment-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #2b2741;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment_bill_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 135%;
  color: white;
}

.payment_bill_description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #7a74ba;
}

.bills_created_header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bills_created_header_col {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bills_created_header_col_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #7a74ba;
}

.bills_created_header_col_description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: white;
}

.bill_payment_info_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: #7a74ba;
}

.bill_payment_info_price {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 135%;
  color: white;
}

.payment_bill_amount {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #7a74ba;
}

.payment_bill_amount_price {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 135%;
  color: white;
}

.payment_bill_amount_equality {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #7a74ba;
}

.bill_fee_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #7a74ba;
}

.bill_fee_title_price {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 135%;
  color: white;
}
</style>
