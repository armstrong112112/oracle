<template>
  <div class="flex flex-col gap-24">
    <div class="mixing_card">
      <div class="mixing_card_header flex items-center justify-between">
        <div class="flex flex-col gap-4">
          <div class="remaining-balance">{{ $t("escrow.dealAmount") }}</div>
          <div class="flex items-center gap-8">
            <img
              :src="profile?.selectedCrypto?.icon"
              style="width: 24px"
              alt="" />
            <div class="mixing_price">{{ profile?.inputAmount || "0.00" }}</div>
            <div class="mixing_equality">≈ ${{ netAmount }}</div>
          </div>
        </div>
      </div>
      <div class="mixing_card_body flex flex-col">
        <div class="mixing_card_body_row">
          <div class="mixing_card_body_row_left">
            {{ $t("escrow.category") }}
          </div>
          <div class="mixing_card_body_row_right">
            {{ profile?.categories?.[0]?.title || "Design" }}
          </div>
        </div>
        <div class="mixing_card_body_row">
          <div class="mixing_card_body_row_left">{{ $t("escrow.with") }}</div>
          <div class="mixing_card_body_row_right">
            <div class="escrow_creating_header">
              <img :src="profile?.selectedUser?.avatar" alt="" />
              <div class="escrow_creating_header_title">
                {{ profile?.selectedUser?.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overview_description_card flex flex-col gap-4">
      <div class="escrow_overview_title">{{ $t("escrow.description") }}</div>
      <div class="escrow_overview_description">
        {{ profile?.description || "No description provided." }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NewEscrowPopUp from "~/entities/escrow/ui/NewEscrowPopUp/index.vue";
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
</style>
