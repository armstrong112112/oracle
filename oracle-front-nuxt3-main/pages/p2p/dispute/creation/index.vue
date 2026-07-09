<template>
  <div
    class="flex flex-col gap-24 justify-between notification mt-0 pb-0 pt-0 px-0">
    <div class="flex flex-col gap-24">
      <PageHeader title="Dispute Creation" />
      <div class="py-16 flex flex-col gap-24">
        <P2PDisputeCreation />
      </div>
    </div>
    <div class="escrow-overview-footer">
      <CustomButton class="w-full" value="Open Dispute" type="primary" />

      <NewEscrowPopUp
        type="success"
        button-type="secondary"
        button-text="Check Deal Page"
        :title="`Escrow Deal Offer is sent to ${profile?.selectedUser?.name}`"
        :reminder-text="`${profile.role} has not accepted your deal offer yet. If they decline, you'll be refunded. `"
        description="You'll be notified once the Deal is accepted by a costumer"
        :is-open="isOpen"
        :username="`${profile?.selectedUser?.name}`"
        cancel-text="Close"
        :close="() => closeModal()"
        :confirm="() => router.push('/escrow/deal/12')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewEscrowPopUp from "~/entities/escrow/ui/NewEscrowPopUp/index.vue";
import P2PDisputeCreation from "~/entities/p2p/ui/dispute/creation/index.vue";
import CustomButton from "~/components/ui/Button.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import { useEscrowStore } from "~~/store/escrow";

// Use localePath if needed
const localePath = useLocalePath();
const router = useRouter();

// Define layout
definePageMeta({
  layout: "sidebar",
});

// Get Pinia store
const escrowStore = useEscrowStore();

// Reactive state
const isOpen = ref(false);

// Computed properties
const profile = computed(() => escrowStore.profile);

const buttonType = computed((): string => {
  const { role, categories, selectedUser } = escrowStore.profile;
  const isDataFilled =
    role !== "" && categories.length > 0 && selectedUser !== null;

  return isDataFilled ? "primary" : "confirm";
});

// Methods
const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.notification {
  @media (min-width: 1024px) {
    padding: 0;
    max-width: 800px;
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
    width: 50%;
    margin: 0 0 0 auto;
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
