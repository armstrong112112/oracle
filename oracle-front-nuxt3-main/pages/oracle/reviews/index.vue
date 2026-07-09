<template>
  <div class="profile bg-black notification p-0 flex flex-col gap-24 mt-0">
    <PageHeader title="Reviews" />
    <OracleReviewsList />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import OracleReviewsList from "~/widgets/oracle/profile/OracleReviewsList/index.vue";

definePageMeta({
  layout: "sidebar",
});
</script>

<style scoped></style>
