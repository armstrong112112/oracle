<template>
  <div class="notification mt-0 pb-0 p-0">
    <PageHeader
      v-if="windowWidth < 1024"
      :title="
        isCreationProcessed
          ? $t('creation.applicationPreview')
          : $t('creation.trackingTitle')
      " />
    <div class="verification py">
      <CreationForm v-if="!isCreationProcessed" @processed="showPreview" />
      <VerificationCreationPreview v-else />
    </div>
    <VerificationDialog />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import CreationForm from "~/entities/verification/ui/VerificationCreation/CreationForm.vue";
import VerificationCreationPreview from "~/entities/verification/ui/VerificationCreationPreview/index.vue";
import { useVerificationStore } from "~/store/verification";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import VerificationDialog from "~/widgets/verification/VerificationDialog/index.vue";

definePageMeta({
  layout: "sidebar",
});

const verificationStore = useVerificationStore();
const windowWidth = ref(0);

const isCreationProcessed = computed(
  () => verificationStore.isCreationProcessed
);

const showPreview = () => {};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>
<style lang="scss">
.verification {
  margin-top: 20px;
}
</style>
