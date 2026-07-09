<template>
  <div class="flex flex-col gap-24">
    <div class="flex flex-col gap-12">
      <div class="escrow_creating_header">
        <img :src="profile?.selectedUser?.avatar" alt="" />
        <div class="escrow_creating_header_title">
          {{ profile?.selectedUser?.name }}
        </div>
      </div>
      <div class="escrow_cards">
        <div class="escrow_card">
          <img src="/icons/profile/profile.svg" alt="" />
          <span>{{ $t("escrow.profile") }}</span>
        </div>
        <div class="escrow_card">
          <img src="/icons/profile/escrow.svg" alt="" />
          <span>{{ $t("escrow.escrowReviews") }}</span>
        </div>
        <div class="escrow_card">
          <img src="/icons/profile/p2p.svg" alt="" />
          <span>{{ $t("escrow.p2pReviews") }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-12">
      <PrePaidDepositForm :is-escrow="true" />
      <textarea
        ref="descriptionTextarea"
        v-model="localDescription"
        :placeholder="$t('escrow.descriptionPlaceholder')"
        class="escrow_creating_input"
        maxlength="500" />

      <div
        class="max-length"
        :class="localDescription.length === 500 ? 'text-red' : null">
        {{ localDescription.length }} / 500
      </div>
      <div v-if="localDescription.length === 500" class="max-length text-red">
        {{ $t("escrow.textTooLong") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrePaidDepositForm from "~/widgets/prepaid-cards/PrePaidDepositForm/index.vue";
import { storeToRefs } from "pinia";
import { useEscrowStore } from "~/store/escrow";

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

const localDescription = ref("");
const descriptionTextarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  localDescription.value = profile.value.description;
});

watch(localDescription, (newVal) => {
  escrowStore.setEscrow({ description: newVal });
});

function resizeTextarea() {
  const textarea = descriptionTextarea.value;
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 260) + "px";
  }
}
</script>
<style scoped>
.escrow_creating_header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}
.escrow_creating_header img {
  width: 32px;
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
.escrow_cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  overflow-x: auto;
}

.escrow_card {
  gap: 10px;
  padding: 6px 12px 6px 8px;
  border-radius: 12px;
  background: #1b1a24;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.escrow_card span {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
  white-space: nowrap;
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
  border: none;
  resize: none;
  border-radius: 10px;
  color: white;
  max-height: 260px;
  overflow-y: auto;
  height: 260px;
  @media (min-width: 1024px) {
    height: auto;
  }
}

.escrow_creating_input::placeholder {
  color: #67639a;
}
</style>
