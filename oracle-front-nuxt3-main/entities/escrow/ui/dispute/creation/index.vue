<template>
  <div class="flex flex-col gap-24 pb-40 main-mixing-card">
    <div class="mixing_card_left">
      <div class="mixing_card">
        <div class="mixing_card_header flex items-center justify-between">
          <div class="flex flex-col gap-4">
            <div class="remaining-balance">{{ $t("escrow.dealAmount") }}</div>
            <div class="flex items-center gap-8">
              <img
                :src="profile?.selectedCrypto?.icon"
                style="width: 24px"
                alt="" />
              <div class="mixing_price">
                {{ profile?.inputAmount || "0.00" }}
              </div>
              <div class="mixing_equality">≈ ${{ netAmount }}</div>
            </div>
          </div>
          <div class="add_btn">{{ $t("escrow.created") }}</div>
        </div>
        <div class="mixing_card_body flex flex-col">
          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">
              {{ $t("escrow.yourRole") }}
            </div>
            <div class="mixing_card_body_row_right">
              {{ profile?.role || "Customer" }}
            </div>
          </div>
          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">
              {{ $t("escrow.seller") }}
            </div>
            <div class="mixing_card_body_row_right">
              <div class="escrow_creating_header">
                <img :src="profile?.selectedUser?.avatar" alt="" />
                <div class="escrow_creating_header_title">
                  {{ profile?.selectedUser?.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">
              {{ $t("escrow.yourRole") }}
            </div>
            <div class="mixing_card_body_row_right">Defendant</div>
          </div>
          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">
              {{ $t("escrow.category") }}
            </div>
            <div class="mixing_card_body_row_right">
              {{ profile?.categories?.[0]?.title || "Design" }}
            </div>
          </div>
          <div class="mixing_card_body_row">
            <div class="mixing_card_body_row_left">
              {{ $t("escrow.dealCreationDate") }}
            </div>
            <div class="mixing_card_body_row_right">Mar 25, 2025 at 09:03</div>
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
        <textarea
          ref="descriptionTextarea"
          :placeholder="$t('escrow.reason')"
          class="escrow_creating_input"
          maxlength="500" />
      </div>

      <div class="overview_description_card flex flex-col gap-4">
        <div class="escrow_overview_title">
          {{ $t("escrow.desiredResolution") }}
        </div>
        <textarea
          ref="descriptionTextarea"
          :placeholder="$t('escrow.desiredResolutionPlaceholder')"
          class="escrow_creating_input"
          maxlength="500" />
      </div>

      <div class="overview_description_card flex flex-col gap-4">
        <div class="escrow_overview_title">
          {{ $t("escrow.additionalDetails") }}
        </div>
        <textarea
          ref="descriptionTextarea"
          :placeholder="$t('escrow.additionalDetailsPlaceholder')"
          class="escrow_creating_input"
          maxlength="500" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEscrowStore } from "~/store/escrow";

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

const isOpen = ref(false);

const netAmount = computed(() => {
  const feePercent = 1.11;
  const amount = parseFloat(profile.value?.inputAmount || "0") || 0;
  const fee = amount * (feePercent / 100);
  return (amount - fee).toFixed(2);
});

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}
</script>

<style lang="scss" scoped>
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
  letter-spacing: 0%;
  color: white;
}
.mixing_equality {
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0%;
  color: #7a74ba;
}
.mixing_from_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.mixing_from_card {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
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
  letter-spacing: 0%;
  color: #ffffff;
}
.remaining-balance {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
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
