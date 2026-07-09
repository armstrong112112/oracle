<template>
  <div
    class="flex flex-col gap-24 justify-between notification mt-0 pb-0 pt-0"
    :class="{ 'h-dvh': isMobile }">
    <div class="flex flex-col gap-24">
      <PageHeader :title="$t('escrow.dispute')" :is-chat="true" />
      <div class="py-16 flex flex-col gap-24">
        <EscrowDisputeOverview />
      </div>
    </div>
    <div class="escrow-overview-footer">
      <CustomButton
        class="w-full"
        :value="$t('escrow.cancelDisputeContinueDeal')"
        type="secondary"
        @click="openModal" />

      <NewEscrowPopUp
        button-type="secondary"
        :button-text="$t('escrow.checkDisputePage')"
        :title="$t('escrow.disputeResolvedInFavor')"
        :is-open="isOpen"
        :fail="true"
        :username="`${profile?.selectedUser?.name}`"
        :cancel-text="$t('escrow.close')"
        :close="() => closeModal()"
        :confirm="() => closeModal()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewEscrowPopUp from "~/entities/escrow/ui/NewEscrowPopUp/index.vue";
import EscrowDisputeOverview from "~/entities/escrow/ui/dispute/overview/index.vue";
import CustomButton from "~/components/ui/Button.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import { storeToRefs } from "pinia";
import { useEscrowStore } from "~/store/escrow";

definePageMeta({ layout: 'sidebar' })

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

const windowWidth = ref(0);
const isOpen = ref(false);
const isMobile = computed(() => windowWidth.value < 1024);

onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
  }
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

const buttonType = computed(() => {
  const { role, categories, selectedUser } = profile.value;
  const isDataFilled = role !== "" && categories.length > 0 && selectedUser !== null;
  return isDataFilled ? "primary" : "confirm";
});

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}
</script>

<style scoped>
.notification {
  @media (min-width: 1024px) {
    padding: 0;
  }
}
.escrow-overview-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #14131b;
  z-index: 222;
  border-top: 1px solid #2b2741;
  @media (min-width: 1024px) {
    background: none;
    border-top: none;
    position: static;
    flex-direction: row;
  }
}
.escrow-overview-footer-fee {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #bfb7ff;
}
.escrow-overview-footer-price {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #ffffff;
}
</style>
