<template>
  <div>
    <div class="notification mt-0 pt-0 p-0">
      <div class="verification mt-0">
        <VerificationStepper v-if="!isProcessed" @processed="showPreview" />
        <VerificationPreview v-else />
      </div>

      <VerificationDialog />
    </div>
  </div>
</template>

<script setup lang="ts">
import VerificationPreview from "@/entities/verification/ui/VerificationPreview/index.vue";
import VerificationStepper from "@/entities/verification/ui/VerificationStepper/index.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationDialog from "@/widgets/verification/VerificationDialog/index.vue";
import { computed } from "vue";

// Composables

const verificationStore = useVerificationStore();

// Computed properties
const isProcessed = computed(() => verificationStore.isProcessed);

// Methods

const showPreview = () => {
  // Any additional logic when showing the preview
};

// Lifecycle hooks

// Layout
definePageMeta({
  layout: "sidebar",
});
</script>

<style lang="scss">
.verification {
  margin-top: 20px;
}
</style>
