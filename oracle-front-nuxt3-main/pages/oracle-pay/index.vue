<template>
  <div class="">
    <div class="notification mt-0 pb-0 p-0">
      <PageHeader :title="$t('pay.oraclePay')" :is-plus="true" @click="showGenerateModal" v-if="windowWidth < 1024" />
    </div>
    <PayActionsWithApiKeys v-if="windowWidth >= 1024" />
    <div v-if="windowWidth < 1024" class="w-500 flex flex-col gap-20">
      <Stories />
      <PayActionsList />
      <OraclePayApiKeys />
    </div>
    <PayDialog v-if="modalType === 'delete' || modalType === 'generate'" :title="modalTitle"
      :button-text="modalButtonText" :is-visible="isModalVisible" @close="closeModal" @confirm="processConfirmation" />
  </div>
</template>

<script setup lang="ts">
import PayActionsList from "~/entities/oracle-pay/ui/PayActionsList/index.vue";
import PayActionsWithApiKeys from "~/entities/oracle-pay/ui/PayActionsWithApiKeys/index.vue";
import OraclePayApiKeys from "~/entities/oracle-pay/ui/PayApiKeys/OraclePayApiKeys.vue";
import Stories from "~/entities/oracle-pay/ui/stories/stories.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import PayDialog from "~/widgets/oracle-pay/PayDialog/index.vue";

definePageMeta({
  layout: "sidebar",
});

const { t } = useI18n();
const windowWidth = ref(1024);

const isModalVisible = ref(false);
const modalTitle = ref("");
const modalButtonText = ref("");
const modalType = ref("");

const showGenerateModal = (): void => {
  modalTitle.value = t("pay.createApiKeysTitle");
  modalType.value = "generate";
  modalButtonText.value = t("pay.createConnection");
  isModalVisible.value = true;
};

const closeModal = (): void => {
  isModalVisible.value = false;
};

const processConfirmation = (): void => {
  if (modalType.value === "delete") {
    console.log("Deleting API keys pair");
  } else if (modalType.value === "generate") {
    console.log("Generating additional API keys pair");
  }

  closeModal();
};

const handleResize = (): void => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
  }
};

onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<style scoped></style>
