<template>
  <div class="flex flex-col gap-24">
    <div
      class="new_escrow_buttons flex items-center justify-between gap-16 w-full">
      <div
        class="new_escrow_button w-full"
        :class="{ active: profile.role === 'Vendor' }"
        @click="setRole('Vendor')">
        {{ $t("escrow.asAVendor") }}
      </div>
      <div
        class="new_escrow_button w-full"
        :class="{ active: profile.role === 'Customer' }"
        @click="setRole('Customer')">
        {{ $t("escrow.asACustomer") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEscrowStore } from "~/store/escrow";

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

function setRole(role: string) {
  escrowStore.setEscrow({ role });
}
</script>

<style scoped>
.new_escrow_button {
  gap: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  background: #14131b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s linear;
  @media (min-width: 1024px) {
    background: #1b1a24;
  }
}
.new_escrow_button.active {
  background: #f64e2a;
}
</style>
