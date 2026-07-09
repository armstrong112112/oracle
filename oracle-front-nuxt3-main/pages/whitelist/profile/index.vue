<template>
  <div class="profile bg-black desktop-profile-layout notification p-0 mt-0">
    <div class="flex flex-col gap-24 border-r">
      <div class="py-16">
        <CustomButton
          :value="$t('whitelist.profile.changeStatus')"
          class="w-full"
          type="secondary"
          @click="toggleStatus" />
      </div>
      <ProfileHeader :status="status" />
      <div class="flex flex-col gap-24">
        <div v-if="status === 'trial'">
          <ProfileTrialCard
            @clickTrial="openModal('profileTrial')"
            @clickArrow="openModal('profileTrialArrow')" />
        </div>

        <div class="cursor-pointer">
          <ProfileDepositCard
            :price="'$ 1092.032'"
            @clickDeposit="openModal('securityDeposit')"
            @clickDepositMean="openModal('securityDepositMean')" />
        </div>
        <template v-if="windowWidth < 1024">
          <ProfileReview />
          <ProfileContacts />
        </template>
        <ProfileVerificationHistory />
        <ProfileP2PListing />
      </div>
      <div></div>
      <VerificationDialog
        v-for="(modal, key) in localModals"
        :key="key"
        :type="modal.type"
        :button-type="(modal.buttonType as ButtonType)"
        :title="`modals.${key}.title`"
        :description="`modals.${key}.description`"
        :cancel-text="`modals.${key}.cancelText`"
        :success-text="modal.successText"
        :is-open="modal.isOpen"
        :close="() => closeModal(key as keyof typeof modals)"
        :confirm="() => closeModal(key as keyof typeof modals)"
        :is-cancel="modal.isCancel" />
    </div>
    <div class="flex flex-col gap-24">
      <template v-if="windowWidth > 1024">
        <ProfileReview />
        <ProfileContacts />
      </template>
      <ProfileAddMoreCategories v-if="status === 'verified'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { modals, type Modals } from "~/entities/verification/data/modal";
import ProfileAddMoreCategories from "~/entities/verification/ui/profile/ProfileAddMoreCategories/index.vue";
import ProfileContacts from "~/entities/verification/ui/profile/ProfileContacts/index.vue";
import ProfileP2PListing from "~/entities/verification/ui/profile/ProfileP2PListing/index.vue";
import ProfileReview from "~/entities/verification/ui/profile/ProfileReview/index.vue";
import ProfileVerificationHistory from "~/entities/verification/ui/profile/ProfileVerificationHistory/index.vue";
import CustomButton from "~/components/ui/Button.vue";
import ProfileDepositCard from "~/widgets/profile/ProfileDepositCard/index.vue";
import ProfileHeader from "~/widgets/profile/ProfileHeader/index.vue";
import ProfileTrialCard from "~/widgets/profile/ProfileTrialCard/index.vue";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";

definePageMeta({
  layout: "sidebar",
});

const windowWidth = ref(0);
const status = ref<"verified" | "trial">("verified");
const localModals = ref<Modals>(modals || {});

const modalEntries = computed(() => {
  if (!localModals.value) return [];
  return Object.entries(localModals.value);
});

const toggleStatus = () => {
  status.value = status.value === "verified" ? "trial" : "verified";
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};

const updateLayout = () => {
  if (import.meta.client) {
    const newLayout = windowWidth.value < 1024 ? "footer" : "sidebar";
    setPageLayout(newLayout);
  }
};

const updateWindowWidth = () => {
  if (import.meta.client && window) {
    windowWidth.value = window.innerWidth;
    updateLayout();
  }
};

onMounted(() => {
  if (import.meta.client && window) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", updateWindowWidth);
    updateLayout();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client && window) {
    window.removeEventListener("resize", updateWindowWidth);
  }
});
</script>

<style lang="scss">
@media (min-width: 1024px) {
  .desktop-profile-layout {
    display: flex;
    max-width: 65vw;
    flex-direction: row;

    .profile_deposit_card,
    .profile_top {
      border-radius: 16px;
      border: none;
      margin: 0 8px;
    }

    & > div:nth-child(1) {
      max-width: 37vw;
    }

    .border-r {
      border-right: 1px solid #2b2741;
    }
  }
}
</style>
