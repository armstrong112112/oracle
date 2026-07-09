<template>
  <div class="profile bg-black notification p-0 flex flex-col mt-0">
    <PageHeader title="@UserUser P2P Profile" />
    <ProfileHeader
      :status="status"
      :no-text="true"
      :is-user="true"
      :is-id="true"
      :is-p2p="true" />
    <div class="flex flex-col gap-24" style="transform: translateY(-24px)">
      <OracleReviews style="padding-top: 0" />
    </div>
    <ProfileContacts :is-user="true" />
    <OracleScore />
    <OracleAchievements />
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="modal.buttonType"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :success-text="modal.successText"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => closeModal(key)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
import { modals, type Modals } from "~/entities/verification/data/modal";
import ProfileContacts from "~/entities/verification/ui/profile/ProfileContacts/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import OracleAchievements from "~/widgets/oracle/profile/OracleAchievements/index.vue";
import OracleReviews from "~/widgets/oracle/profile/OracleReviews/index.vue";
import OracleScore from "~/widgets/oracle/profile/OracleScore/index.vue";
import ProfileHeader from "~/widgets/profile/ProfileHeader/index.vue";
import VerificationDialog from "~/widgets/verification/VerificationDialog/index.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Reactive state
const status = ref("verified");
const localModals = ref<Modals>(modals);

// Methods
const toggleStatus = () => {
  status.value = status.value === "verified" ? "trial" : "verified";
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};
</script>

<style scoped></style>
