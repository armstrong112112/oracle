<template>
  <div class="whitelist notification p-0 mt-0">
    <PageHeader
      :title="$t('escrow.activeDeals')"
      :is-plus="true"
      v-if="isMobile"
      @click="openCreateModal" />
    <div class="flex flex-col gap-12">
      <Stories v-if="isMobile" />
      <DealList @openCreatingModal="openCreateModal" />
    </div>

    <!-- Модальное окно создания escrow -->
    <BillsModal
      :is-open="isCreateModalOpen"
      :title="$t('escrow.newEscrowRoom')"
      :max-width="'500px'"
      @close="closeCreateModal">
      <EscrowCreateContent
        :show-footer="true"
        :is-modal="true"
        @close="openCreatingModal" />
    </BillsModal>

    <!-- Модальное окно создания escrow (второй этап) -->
    <BillsModal
      :is-open="isCreatingModalOpen"
      :title="$t('escrow.escrowCreating')"
      :max-width="'600px'"
      @close="closeCreatingModal">
      <EscrowCreatingContent
        :show-footer="true"
        :is-modal="true"
        @close="openOverviewModal" />
    </BillsModal>

    <!-- Модальное окно overview escrow (третий этап) -->
    <BillsModal
      :is-open="isOverviewModalOpen"
      :title="$t('escrow.overview')"
      :max-width="'700px'"
      @close="closeOverviewModal">
      <EscrowOverviewContent
        :show-footer="true"
        :is-modal="true"
        @close="closeOverviewModal" />
    </BillsModal>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import BillsModal from "~/components/bills-modal.vue";
import EscrowCreateContent from "~/components/escrow-create-content.vue";
import EscrowCreatingContent from "~/components/escrow-creating-content.vue";
import EscrowOverviewContent from "~/components/escrow-overview-content.vue";
import DealList from "~/entities/escrow/ui/DealList/index.vue";
import Stories from "~/entities/oracle-pay/ui/stories/stories.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

definePageMeta({ layout: "sidebar" });

const windowWidth = ref(0);
const isCreateModalOpen = ref(false);
const isCreatingModalOpen = ref(false);
const isOverviewModalOpen = ref(false);

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

function openCreateModal() {
  isCreateModalOpen.value = true;
}

function closeCreateModal() {
  isCreateModalOpen.value = false;
}

function openCreatingModal() {
  isCreateModalOpen.value = false;
  isCreatingModalOpen.value = true;
}

function closeCreatingModal() {
  isCreatingModalOpen.value = false;
}

function openOverviewModal() {
  isCreatingModalOpen.value = false;
  isOverviewModalOpen.value = true;
}

function closeOverviewModal() {
  isOverviewModalOpen.value = false;
}
</script>

<style lang="scss" scoped>
.notification {
  @media (min-width: 1024px) {
    min-width: 800px !important;
  }
}
</style>
