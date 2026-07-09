<template>
  <div class="profile bg-black notification p-0 flex flex-col gap-24 mt-0">
    <PageHeader title="@UserUser Oracle Profile" />
    <ProfileHeader
      :status="status"
      :no-text="true"
      :is-user="true"
      :is-id="true" />
    <ProfileContacts :is-user="true" />
    <OracleScore />
    <OracleAchievements />
    <div class="flex flex-col gap-24">
      <OracleReviews />
    </div>
    <VerificationDialog
      v-for="(modal, key) in modals"
      :key="key"
      :type="modal.type"
      :button-type="(modal.buttonType as ButtonType)"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :success-text="modal.successText"
      :is-open="modal.isOpen"
      :close="() => closeModal(key as keyof typeof modals)"
      :confirm="() => closeModal(key as keyof typeof modals)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
const localModals = ref<Modals>(modals);

const toggleStatus = () => {
  status.value = status.value === "verified" ? "trial" : "verified";
};

const openModal = (modalName: keyof typeof modals) => {
  if (localModals.value[modalName]) {
    localModals.value[modalName].isOpen = true;
  }
};

const closeModal = (modalName: keyof typeof modals) => {
  if (localModals.value[modalName]) {
    localModals.value[modalName].isOpen = false;
  }
};
</script>

<style scoped></style>
