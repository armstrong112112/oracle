<template>
  <div class="">
    <div class="notification mt-0 pb-0">
      <PageHeader
        :title="$t('verification.verificationTrackingTitle')"
        :is-created="false" />
      <VerificationCreationPreview />
    </div>
  </div>
</template>

<script setup lang="ts">
import VerificationCreationPreview from "@/entities/verification/ui/VerificationCreationPreview/index.vue";
import PageHeader from "@/widgets/notifications/pageHeader.vue";

// Composables
const { t } = useI18n();

definePageMeta({
  layout: "navbar",
});
</script>

<style lang="scss">
// write here
</style>
