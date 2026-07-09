<template>
  <div class="">
    <div class="notification mt-0 pb-0 p-0">
      <PageHeader :title="$t('verdict.pageTitle')" />
      <div class="py-16">
        <VerificationVerdict />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerificationVerdict from "@/entities/verification/ui/VerificationVerdict/index.vue";
import PageHeader from "@/widgets/notifications/pageHeader.vue";

definePageMeta({
  layout: "navbar",
});
</script>

<style scoped></style>
