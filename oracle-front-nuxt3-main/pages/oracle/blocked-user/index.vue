<template>
  <div
    class="profile bg-black notification overflow-x-hidden p-0 flex flex-col gap-16 mt-0">
    <PageHeader title="@UserUser Oracle Profile" :is-dot="true" />
    <ProfileHeader
      :status="status"
      :no-text="true"
      :is-id="true"
      :is-me="true"
      :is-no-data="isNoData"
      @toggle-no-data="toggleNoData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOracleProfileStore } from "~/store/oracle-profile";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import ProfileHeader from "~/widgets/profile/ProfileHeader/index.vue";

definePageMeta({
  layout: "sidebar",
});

const oracleProfileStore = useOracleProfileStore();

const status = ref<string>("blocked");
const isNoData = ref<boolean>(false);

const toggleNoData = () => {
  isNoData.value = !isNoData.value;
};
</script>

<style scoped></style>
