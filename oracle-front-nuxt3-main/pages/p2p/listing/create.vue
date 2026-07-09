<template>
  <div>
    <PageHeaderLayout :title="$t('p2p.listing.create')" />
    <P2PListingCreate v-if="step === 1" />
    <P2PListingCreateStepTwo v-if="step === 2" />
  </div>
</template>

<script setup lang="ts">
import PageHeaderLayout from "~/widgets/layout/PageHeader.vue";
import P2PListingCreate from "~/widgets/p2p/P2PListingCreate/index.vue";
import P2PListingCreateStepTwo from "~/widgets/p2p/P2PListingCreateStepTwo/index.vue";
import { useP2PCreateStore } from "~~/store/p2p/createStore";

// Use localePath if needed
const localePath = useLocalePath();

// Define layout
definePageMeta({
  layout: "sidebar",
});

// Get Pinia store
const p2pCreateStore = useP2PCreateStore();

// Get step from Pinia store
const step = computed(() => p2pCreateStore.getStep);
</script>

<style scoped></style>
