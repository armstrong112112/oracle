<template>
  <div class="flex flex-col gap-24 pb-40">
    <MixingCard :header="cardHeader" :body-rows="cardBodyRows" />
    <div class="flex flex-col gap-24">
      <div class="overview_description_card flex flex-col gap-12">
        <div class="escrow_overview_title">
          {{ $t("escrow.disputeReason") }}
        </div>
        <div class="escrow_overview_description">
          {{
            profile?.description ||
            `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
`
          }}
        </div>
      </div>
      <div class="refund_card flex flex-col items-center justify-center">
        <div class="refund_card_title">{{ $t("escrow.refundAmount") }}</div>
        <div class="flex flex-col gap-8 items-center justify-center">
          <img src="/icons/mixing/usdt.svg" alt="" />
          <div class="flex flex-col gap-4">
            <div class="refund_card_price">100.00</div>
            <div class="refund_card_percent">≈ $98.98</div>
          </div>
        </div>
      </div>
      <div class="overview_description_card flex flex-col gap-12">
        <div class="escrow_overview_title">
          {{ $t("escrow.desiredResolution") }}
        </div>
        <div class="escrow_overview_description">
          {{
            profile?.description ||
            `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
`
          }}
        </div>
      </div>

      <div class="overview_description_card flex flex-col gap-12">
        <div class="escrow_overview_title">
          {{ $t("escrow.additionalDetails") }}
        </div>
        <div class="escrow_overview_description">
          {{
            profile?.description ||
            `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
`
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NewEscrowPopUp from "~/entities/escrow/ui/NewEscrowPopUp/index.vue";
import MixingCard from "~/entities/escrow/ui/dispute/overview/mixing-card.vue";
import { useEscrowStore } from "~~/store/escrow";

// Use localePath if needed
const localePath = useLocalePath();

// Get Pinia store
const escrowStore = useEscrowStore();

// Reactive state
const isOpen = ref(false);

// Computed properties
const profile = computed(() => escrowStore.profile);

const netAmount = computed((): string => {
  const feePercent = 1.11;
  const amount = parseFloat(profile.value?.inputAmount || "0") || 0;
  const fee = amount * (feePercent / 100);
  return (amount - fee).toFixed(2);
});

// Данные для хедера карточки
const cardHeader = computed(() => ({
  title: $t("escrow.dealAmount"),
  icon: profile.value?.selectedCrypto?.icon,
  amount: profile.value?.inputAmount || "0.00",
  netAmount: netAmount.value,
  buttons: [
    { text: $t("escrow.created"), type: "created" },
    { text: $t("escrow.lost"), type: "lost" },
    { text: $t("escrow.resolved"), type: "resolved" },
  ],
}));

// Данные для тела карточки
const cardBodyRows = computed(() => [
  {
    label: $t("escrow.yourRole"),
    value: profile.value?.role || "Customer",
  },
  {
    label: $t("escrow.seller"),
    value: {
      avatar: profile.value?.selectedUser?.avatar,
      name: profile.value?.selectedUser?.name,
    },
    type: "avatar" as const,
  },
  { label: $t("escrow.yourRole"), value: "Defendant" },
  {
    label: $t("escrow.category"),
    value: profile.value?.categories?.[0]?.title || "Design",
  },
  {
    label: $t("escrow.dealCreationDate"),
    value: "Mar 25, 2025 at 09:03",
  },
  {
    label: $t("escrow.disputeCreationDate"),
    value: "Mar 28, 2025 at 09:03",
  },
]);

// Methods
const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/escrow/dispute-overview.scss" as *;
</style>
