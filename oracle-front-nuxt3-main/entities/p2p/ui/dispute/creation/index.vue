<template>
  <div class="flex flex-col gap-24 pb-40 main-mixing-card px-0">
    <div class="mixing_card_left">
      <div class="mixing_card">
        <div class="mixing_card_header flex items-center justify-between">
          <div class="flex flex-col gap-4">
            <div class="remaining-balance">Crypto to Send</div>
            <div class="flex items-center gap-8">
              <div class="mixing_price">328 USDT</div>
              <div class="mixing_equality">≈ $98.98</div>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="remaining-balance">Fiat to Receive</div>
            <div class="flex items-center gap-8">
              <div class="mixing_price">328 USD</div>
            </div>
          </div>
        </div>
        <div class="mixing_card_body flex flex-col">
          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">Exchanger</div>
            <div class="mixing_card_body_row_right">
              <div class="escrow_creating_header">
                <img src="/avatars/user.svg" alt="" />
                <div class="escrow_creating_header_title">@westdev</div>
              </div>
            </div>
          </div>
          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">Payment method</div>
            <div class="mixing_card_body_row_right">PayPal</div>
          </div>

          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">Dispute Creation Date</div>
            <div class="mixing_card_body_row_right">Mar 28, 2025 at 09:03</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-12 w-full mixing_card_right">
      <div class="overview_description_card flex flex-col gap-4">
        <div class="escrow_overview_title">
          {{ $t("escrow.disputeReason") }}
        </div>
        <div class="flex flex-col gap-8">
          <textarea
            v-model="disputeReason"
            :placeholder="$t('escrow.reason')"
            :class="[
              'escrow_creating_input',
              { 'error-border': errors.disputeReason },
            ]"
            maxlength="500"
            @input="validateField('disputeReason')"
            @blur="validateField('disputeReason')" />
          <div v-if="errors.disputeReason" class="error_text">
            {{ errors.disputeReason }}
          </div>
        </div>
      </div>

      <div class="overview_description_card flex flex-col gap-4">
        <div class="escrow_overview_title">
          {{ $t("escrow.desiredResolution") }}
        </div>
        <div class="flex flex-col gap-8">
          <textarea
            v-model="desiredResolution"
            :placeholder="$t('escrow.desiredResolutionPlaceholder')"
            :class="[
              'escrow_creating_input',
              { 'error-border': errors.desiredResolution },
            ]"
            maxlength="500"
            @input="validateField('desiredResolution')"
            @blur="validateField('desiredResolution')" />
          <div v-if="errors.desiredResolution" class="error_text">
            {{ errors.desiredResolution }}
          </div>
        </div>
      </div>

      <div class="overview_description_card flex flex-col gap-4">
        <div class="escrow_overview_title">
          {{ $t("escrow.additionalDetails") }}
        </div>
        <div class="flex flex-col gap-8">
          <textarea
            v-model="additionalDetails"
            :placeholder="$t('escrow.additionalDetailsPlaceholder')"
            :class="[
              'escrow_creating_input',
              { 'error-border': errors.additionalDetails },
            ]"
            maxlength="500"
            @input="validateField('additionalDetails')"
            @blur="validateField('additionalDetails')" />
          <div v-if="errors.additionalDetails" class="error_text">
            {{ errors.additionalDetails }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NewEscrowPopUp from "~/entities/escrow/ui/NewEscrowPopUp/index.vue";
import { useEscrowStore } from "~~/store/escrow";

interface Errors {
  disputeReason: string;
  desiredResolution: string;
  additionalDetails: string;
}

// Use localePath if needed
const localePath = useLocalePath();

// Get Pinia store
const escrowStore = useEscrowStore();

// Reactive state
const disputeReason = ref("");
const desiredResolution = ref("");
const additionalDetails = ref("");
const errors = ref<Errors>({
  disputeReason: "",
  desiredResolution: "",
  additionalDetails: "",
});

// Computed properties
const profile = computed(() => escrowStore.profile);

const netAmount = computed((): string => {
  const feePercent = 1.11;
  const amount = parseFloat(profile.value?.inputAmount || "0") || 0;
  const fee = amount * (feePercent / 100);
  return (amount - fee).toFixed(2);
});

// Methods
const validateField = (field: keyof Errors) => {
  let value = "";

  if (field === "disputeReason") {
    value = disputeReason.value;
  } else if (field === "desiredResolution") {
    value = desiredResolution.value;
  } else if (field === "additionalDetails") {
    value = additionalDetails.value;
  }

  if (!value || value.trim() === "") {
    errors.value[field] = "Please fill this area";
  } else if (value.trim().length < 10) {
    errors.value[field] = "Minimum 10 characters required";
  } else {
    errors.value[field] = "";
  }
};

const validateAllFields = (): boolean => {
  validateField("disputeReason");
  validateField("desiredResolution");
  validateField("additionalDetails");

  const isValid =
    !errors.value.disputeReason &&
    !errors.value.desiredResolution &&
    !errors.value.additionalDetails &&
    disputeReason.value.trim() !== "" &&
    desiredResolution.value.trim() !== "" &&
    additionalDetails.value.trim() !== "";

  // Emit validation change if needed
  return isValid;
};

// Expose validate method for parent components
defineExpose({
  validate: validateAllFields,
});
</script>

<style lang="scss" scoped>
.error_text {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #f64e2a !important;
}

.error-border {
  border-color: #f64e2a !important;

  &:focus {
    border-color: #f64e2a !important;
    box-shadow: 0 0 0 1px #f64e2a !important;
  }
}
.main-mixing-card {
  @media (min-width: 1024px) {
    flex-direction: row;
    .mixing_card_right {
      flex: 1 1 50%;
    }
    .mixing_card_left {
      flex: 1 1 50%;
    }
  }
}
.mixing_card {
  border: 1px solid #2b2741;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  overflow: hidden;
}
.mixing_card_header {
  padding: 12px 16px;
}
.mixing_price {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.mixing_equality {
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0;
  color: #7a74ba;
}
.mixing_from_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.mixing_from_card {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}
.mixing_card_body_row {
  border-top: 1px solid #2b2741;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.mixing_card_body_row_left {
  background: #13121b;
  border-right: 1px solid #2b2741;
}
.mixing_card_body_row_left,
.mixing_card_body_row_right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #ffffff;
}
.remaining-balance {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
}

.escrow_creating_header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}
.escrow_creating_header img {
  width: 20px;
}
.escrow_creating_header_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
.escrow_overview_title {
  font-family: Roboto;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.escrow_overview_description {
  font-family: Roboto;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.add_btn {
  padding: 7px 10px;
  border-radius: 12px;
  background: #1e1d28;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 4px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  vertical-align: middle;
  cursor: pointer;
}

.escrow_creating_input {
  background: #1d1d2999;
  padding: 16px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  outline: none;
  resize: none;
  border-radius: 10px;
  color: white;
  overflow-y: auto;
  height: 130px;
  border: 1px solid #2b2741;
}

.escrow_creating_input::placeholder {
  color: #67639a;
}
</style>
