<template>
  <div class="bill-created">
    <div class="bill-created-content">
      <!-- QR Code Section -->
      <div class="bill-created-qr-section">
        <div class="qr-code-container">
          <img src="/icons/bills/qr.png" alt="QR Code" class="qr-code" />
        </div>
      </div>

      <!-- Information Section -->
      <div class="bill-created-info-section">
        <div class="bill-title">{{ $t("bills.headingTextForBill") }}</div>
        <div class="bill-amount">
          <span class="amount-value">0,0244 TON</span>
          <span class="amount-equality">≈ 100.234$</span>
        </div>

        <div class="bill-details">
          <div class="detail-col">
            <span class="detail-label">{{ $t("bills.id") }}</span>
            <span class="detail-value">#9329103213</span>
          </div>
          <div class="detail-col">
            <span class="detail-label">{{ $t("bills.creationDate") }}</span>
            <span class="detail-value">May 20, 2025</span>
          </div>
          <div class="detail-col">
            <span class="detail-label">{{ $t("bills.dueDate") }}</span>
            <span class="detail-value">May 24, 2025</span>
          </div>
        </div>

        <div class="bill-description">
          {{ $t("bills.loremDescription") }}
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="bill-created-bottom">
      <div class="input-section">
        <div class="input-container">
          <input
            ref="billInput"
            :placeholder="$t('bills.fillBillNumber')"
            v-model="billValue"
            class="bill-input"
            readonly />
          <div class="input-actions">
            <button class="action-button" @click="copyToClipboard">
              <img src="/svg/copy.svg" alt="copy" />
            </button>
            <button class="action-button" @click="shareBill">
              <img src="/svg/share.svg" alt="share" />
            </button>
          </div>
        </div>
        <CustomButton
          :value="$t('bills.updateLink')"
          type="secondary"
          class="update-button"
          is-image="update"
          style="" />
        <CustomButton
          :value="$t('bills.voidThisBill')"
          class="void-button"
          @click="handleVoidBill" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

const emit = defineEmits<{
  void: [];
}>();

const billInput = ref<HTMLInputElement>();
const billValue = ref(
  "https://oraclehub.su/bill382941940509230950923450-92345"
);

const copyToClipboard = (): void => {
  const originalValue = billValue.value;
  navigator.clipboard.writeText(billValue.value).then(() => {
    billValue.value = $t("bills.copied") as string;
    setTimeout(() => {
      billValue.value = originalValue;
    }, 2000);
  });
};

const shareBill = (): void => {
  if (navigator.share) {
    navigator
      .share({
        title: "Bill",
        text: billValue.value,
      })
      .catch((error) => {
        console.error("Error sharing:", error);
      });
  } else {
    alert("Sharing is not supported on this browser.");
  }
};

const handleVoidBill = () => {
  emit("void");
};
</script>

<style lang="scss" scoped>
.bill-created {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
}

.bill-created-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.bill-created-qr-section {
  flex-shrink: 0;
}

.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

.qr-code {
  width: 330px;
  height: 330px;
  max-width: 100%;
}

.bill-created-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bill-title {
  font-family: Hector, Roboto, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 130%;
  color: white;
  margin: 0;
}

.bill-amount {
  display: flex;
  align-items: center;
  gap: 8px;
}

.amount-value {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: white;
}

.amount-equality {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #b2aaf9;
}

.bill-details {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.detail-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  color: #b2aaf9;
}

.detail-value {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
}

.bill-description {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  color: white;
  margin-top: 8px;
}

.bill-created-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #2b2741;
}

.input-section {
  display: flex;
  gap: 12px;
}

.input-container {
  flex: 1 1 45%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  gap: 10px;
  padding: 11px 12px;
  background: #13121b;
  border: 1px solid #2b2741;
}

.bill-input {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;

  &::placeholder {
    color: #67639a;
  }
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-button:nth-child(1) {
  margin-right: 0px;
}

.action-button {
  background: #2c2a3d;
  border: none;
  cursor: pointer;
  padding: 12px;
  margin: -6px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #2b2741;
  }

  img {
    width: 16px;
    height: 16px;
  }
}

.update-button {
  flex: 1 1 20%;
  align-self: flex-start;
  color: #f64e2a;
}

.void-button {
  flex: 1 1 35%;
  min-width: 120px;
}

// Responsive design for smaller screens
@media (max-width: 768px) {
  .bill-created-content {
    flex-direction: column;
    align-items: center;
  }

  .qr-code {
    width: 150px;
    height: 150px;
  }

  .bill-title {
    font-size: 18px;
    text-align: center;
  }

  .bill-amount {
    justify-content: center;
  }
}
</style>
