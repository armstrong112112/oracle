<template>
  <div class="bill-pre-finished">
    <div class="flex flex-col gap-16">
      <div class="bill-pre-finished-header">
        <div class="pre-finished-icon">
          <img src="/assets/svg/check-icon.svg" alt="success" />
        </div>
        <h3 class="pre-finished-title">{{ $t("bills.billPreFinished") }}</h3>
        <p class="pre-finished-description">
          {{ $t("bills.billPreFinishedDescription") }}
        </p>
      </div>

      <div class="bill-pre-finished-info">
        <div class="info-row">
          <span class="info-label">{{ $t("bills.billNumber") }}</span>
          <span class="info-value">#9329103213</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ $t("bills.amount") }}</span>
          <span class="info-value">2500 USDT</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ $t("bills.status") }}</span>
          <span class="info-value status-pending">{{
            $t("bills.pending")
          }}</span>
        </div>
      </div>

      <div class="bill-pre-finished-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: 75%"></div>
        </div>
        <div class="progress-text">{{ $t("bills.processingPayment") }}</div>
      </div>
    </div>

    <div class="bill-pre-finished-footer">
      <CustomButton
        :value="$t('bills.viewDetails')"
        type="secondary"
        class="w-full mb-3"
        @click="handleViewDetails" />
      <CustomButton
        :value="$t('bills.close')"
        type="primary"
        class="w-full"
        @click="handleClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

const emit = defineEmits<{
  viewDetails: [];
  close: [];
}>();

const handleViewDetails = () => {
  emit("viewDetails");
};

const handleClose = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.bill-pre-finished {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bill-pre-finished-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.pre-finished-icon {
  width: 64px;
  height: 64px;
  background: #f64e2a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 32px;
    height: 32px;
  }
}

.pre-finished-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 135%;
  color: white;
  margin: 0;
}

.pre-finished-description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #7a74ba;
  margin: 0;
}

.bill-pre-finished-info {
  background: #181720;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: #7a74ba;
}

.info-value {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 135%;
  color: white;

  &.status-pending {
    color: #f64e2a;
  }
}

.bill-pre-finished-progress {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #2b2741;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #f64e2a;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-text {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: #7a74ba;
  text-align: center;
}

.bill-pre-finished-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #2b2741;
}
</style>
