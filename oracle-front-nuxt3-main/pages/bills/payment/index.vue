<template>
  <div
    class="whitelist h-dvh notification flex flex-col justify-between relative p-0 mt-0">
    <div class="flex flex-col gap-24">
      <PageHeader :title="$t('bills.billPayment')" :is-plus="false" />

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
    <div class="mixing-footer flex flex-col gap-16 mt-20 py-16">
      <div
        v-if="isCreated"
        class="bill_payment_info w-full flex items-center justify-between">
        <div class="flex items-center gap-8">
          <img src="/icons/mixing/usdt.svg" style="width: 26px" alt="" />
          <div class="flex flex-col">
            <div class="bill_payment_info_title">USDT</div>
            <div class="bill_payment_info_price">2500 USDT</div>
          </div>
        </div>
        <img
          src="/icons/verification/down.svg"
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
      <div></div>
    </div>
    <VerificationDialog
      :type="'success'"
      :button-type="'primary'"
      :title="'bills.billPaymentConfirmed'"
      equality="9 LTC ≈ ($ 9,200.15) "
      :success-text="'bills.billPaidSuccessfully'"
      :is-open="isOpen"
      :button-text="'bills.cancel'"
      :close="() => closeModal()"
      :confirm="() => closeModal()"
      :is-cancel="false" />
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import VerificationDialog from "~/widgets/verification/VerificationDialog/index.vue";

const billNumber = ref("");
const isCreated = ref(false);
const isOpen = ref(false);

const handleClick = () => {
  if (!billNumber.value.trim()) {
    return;
  }

  isCreated.value = true;
  openModal();
};

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<style scoped lang="scss">
.bills_created_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.bills_created_header_col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bills_created_header_col_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #b2aaf9;
}
.bills_created_header_col_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.bills_created_body_title {
  font-family: Inter;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.payment_bill_description {
  font-family: Inter;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.payment_bill_title {
  font-family: Inter;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  color: white;
}
.bill_payment_info {
  background: #13121b;
  justify-content: space-between;
  border-radius: 12px;
  padding: 8px 16px;
}
.bill_payment_info_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: white;
}
.bill_payment_info_price {
  color: #67639a;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
}
.payment_bill_amount {
  color: #b2aaf9;
  font-family: Inter;
}
.payment_bill_amount_price {
  font-family: Roboto;
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.payment_bill_amount_equality {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.bill_fee_title {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: #b2aaf9;
}
.bill_fee_title_price {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
</style>
