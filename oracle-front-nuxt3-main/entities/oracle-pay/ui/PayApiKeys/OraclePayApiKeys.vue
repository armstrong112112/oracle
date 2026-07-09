<template>
  <div class="api_keys">
    <div class="api_keys_row flex items-center justify-between">
      <div class="api_keys_title">
        {{ $t("pay.superShop") || "Super Shop" }}
      </div>
      <div class="flex items-center justify-between gap-8 cursor-pointer">
        <img
          src="/icons/oracle-pay/pencil.svg"
          alt="pencil"
          @click="showRenameModal" />
        <img
          src="/icons/oracle-pay/remove.svg"
          alt="remove"
          @click="showDeleteModal" />
      </div>
    </div>
    <PayInput
      :label="$t('pay.paymentGatewayApiKey') || 'Payment Gateway API Key'"
      value="btc9104391491309490134013094913094" />
    <PayInput
      :label="$t('pay.oraclePayWidgetApiKey') || 'OraclePay Widget API Key'"
      value="btc9104391491309490134013094913094" />
    <div class="api_keys_row flex items-center justify-between">
      <div class="api_keys_title">
        {{ $t("pay.megaStore") || "Mega Store" }}
      </div>
      <div class="flex items-center justify-between gap-8 cursor-pointer">
        <img
          src="/icons/oracle-pay/pencil.svg"
          alt="pencil"
          @click="showRenameModal" />
        <img
          src="/icons/oracle-pay/remove.svg"
          alt="remove"
          @click="showDeleteModal" />
      </div>
    </div>
    <PayInput
      :label="$t('pay.paymentGatewayApiKey') || 'Payment Gateway API Key'"
      value="btc9104391491309490134013094913094" />
    <PayInput
      :label="$t('pay.oraclePayWidgetApiKey') || 'OraclePay Widget API Key'"
      value="btc9104391491309490134013094913094" />
    <div class="api_keys_row flex items-center justify-between">
      <div class="api_keys_title">
        {{ $t("pay.megaStore") || "Mega Store" }}
      </div>
      <div class="flex items-center justify-between gap-8 cursor-pointer">
        <img
          src="/icons/oracle-pay/pencil.svg"
          alt="pencil"
          @click="showRenameModal" />
        <img
          src="/icons/oracle-pay/remove.svg"
          alt="remove"
          @click="showDeleteModal" />
      </div>
    </div>
    <PayInput
      :label="$t('pay.paymentGatewayApiKey') || 'Payment Gateway API Key'"
      value="btc9104391491309490134013094913094" />
    <PayInput
      :label="$t('pay.oraclePayWidgetApiKey') || 'OraclePay Widget API Key'"
      value="btc9104391491309490134013094913094" />
    <div class="api_keys_bottom">
      <div class="flex flex-col gap-4">
        <!--        <div class="pay-input-label">OraclePay Widget API Key</div>-->
        <CustomButton
          :value="$t('pay.generateApiKeys')"
          class="text-13 p-12-4 mb-10"
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

    <RenameDialog
      v-if="modalType === 'rename'"
      :is-visible="isModalVisible"
      button-text="Save"
      :current-name="shopName"
      :title="$t('pay.renameApiKeysTitle')"
      @close="closeModal"
      @rename="processRename" />
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import PayInput from "~/widgets/oracle-pay/PayApiKeys/PayInput.vue";
import PayDialog from "~/widgets/oracle-pay/PayDialog/index.vue";
import RenameDialog from "~/widgets/oracle-pay/RenameDialog/index.vue";

const { t } = useI18n();

const isModalVisible = ref(false);
const modalTitle = ref("");
const modalButtonText = ref("");
const modalType = ref("");
const shopName = ref("Super shop");

const showDeleteModal = (): void => {
  modalTitle.value = t("pay.deleteApiKeysTitle");
  modalType.value = "delete";
  modalButtonText.value = t("pay.deleteKeys");
  isModalVisible.value = true;
};

const showGenerateModal = (): void => {
  modalTitle.value = t("pay.createApiKeysTitle");
  modalType.value = "generate";
  modalButtonText.value = t("pay.createConnection");
  isModalVisible.value = true;
};

const showRenameModal = (): void => {
  modalType.value = "rename";
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

const processRename = (newName: string): void => {
  shopName.value = newName;
  closeModal();
};
</script>

<style scoped>
.api_keys {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 12px;
}
.api_keys_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: white;
}

.api_keys_bottom {
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px !important;
  z-index: 99;
  padding-bottom: 8px !important;
}

.pay-input-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}
</style>
