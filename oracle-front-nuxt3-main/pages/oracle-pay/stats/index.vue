<template>
  <div class="">
    <!-- Мобильная версия -->
    <div v-if="windowWidth < 1024" class="notification mt-0 pb-0 p-0">
      <PageHeader v-if="windowWidth < 1024" :title="$t('pay.stats')" />
      <PayStats />
      <div class="api_keys_bottom py-16">
        <PayActionsList :show-stats="true" class="p-0" />
        <CustomButton
          :value="$t('pay.generateApiKeys')"
          class="text-13 p-12-4 w-full"
          type="primary"
          @click="showGenerateModal" />
      </div>
    </div>

    <!-- Десктопная версия -->
    <div v-if="windowWidth >= 1024" class="desktop_stats_page">
      <PayActionsWithApiKeys />
      <div class="desktop_button_container">
        <CustomButton
          :value="$t('pay.generateApiKeys')"
          class="text-13 p-12-4"
          type="primary"
          @click="showGenerateModal" />
      </div>
    </div>

    <PayDialog
      v-if="modalType === 'delete' || modalType === 'generate'"
      :title="modalTitle"
      :button-text="modalButtonText"
      :is-visible="isModalVisible"
      @close="closeModal"
      @confirm="processConfirmation" />
  </div>
</template>

<script setup lang="ts">
import PayActionsList from "~/entities/oracle-pay/ui/PayActionsList/index.vue";
import PayActionsWithApiKeys from "~/entities/oracle-pay/ui/PayActionsWithApiKeys/index.vue";
import PayStats from "~/entities/oracle-pay/ui/PayStats/index.vue";
import CustomButton from "~/components/ui/Button.vue";
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

const showGenerateModal = (): void => {
  modalTitle.value = t("pay.createApiKeysTitle");
  modalType.value = "generate";
  modalButtonText.value = t("pay.createConnection");
  isModalVisible.value = true;
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

<style scoped>
.api_keys_bottom {
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px !important;
  background: #0a090f;
  z-index: 99;
  padding-bottom: 8px !important;
}

.desktop_stats_page {
  position: relative;
  width: 100%;
}

.desktop_button_container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}
</style>
