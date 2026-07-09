<template>
  <div
    class="profile bg-black notification overflow-x-hidden p-0 flex flex-col gap-24 mt-0">
    <PageHeader :title="$t('whitelist.profile.oracle.myProfile')" />
    <ProfileHeader
      :status="status"
      :no-text="true"
      :is-id="true"
      :is-me="true"
      :is-no-data="isNoData"
      @toggle-no-data="toggleNoData" />
    <ProfileContacts :is-no-data="isNoData" @toggle-no-data="toggleNoData" />
    <OracleScore />
    <OracleAchievements />
    <div class="flex flex-col gap-24">
      <OracleReviews :is-no-data="isNoData" />
    </div>
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="(modal.buttonType as ButtonType)"
      :button-text="`modals.${key}.buttonText`"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => closeModal(key)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { modals, type Modals } from "~/entities/verification/data/modal";
import ProfileContacts from "~/entities/verification/ui/profile/ProfileContacts/index.vue";
import { useOracleProfileStore } from "~/store/oracle-profile";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import OracleAchievements from "~/widgets/oracle/profile/OracleAchievements/index.vue";
import OracleReviews from "~/widgets/oracle/profile/OracleReviews/index.vue";
import OracleScore from "~/widgets/oracle/profile/OracleScore/index.vue";
import ProfileHeader from "~/widgets/profile/ProfileHeader/index.vue";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";

definePageMeta({
  layout: "sidebar",
});

const oracleProfileStore = useOracleProfileStore();

const status = ref<string>("verified");
const isNoData = ref<boolean>(false);
const localModals = ref<Modals>(modals || {});

const modalEntries = computed(() => {
  if (!localModals.value) return [];
  return Object.entries(localModals.value);
});

const openModal = (modalName: keyof typeof modals) => {
  if (localModals.value[modalName]) {
    localModals.value[modalName].isOpen = true;
  }
};

const toggleNoData = () => {
  isNoData.value = !isNoData.value;
};

const closeModal = (modalName: keyof typeof modals) => {
  if (localModals.value[modalName]) {
    localModals.value[modalName].isOpen = false;
  }
};
</script>

<style scoped></style>
