<template>
  <div class="flex flex-col gap-16 py-16">
    <div
      class="bills_created_qr flex flex-col gap-12 justify-center items-center">
      <div class="flex items-center justify-center gap-4">
        <div class="ton_text">0,0244 TON</div>
        <div class="ton_equality">≈ 100.234$</div>
      </div>
      <img src="/icons/bills/qr.png" style="max-width: 246px" alt="" />
    </div>
    <div class="flex flex-col gap-8">
      <div class="form-parent">
        <div class="the-input">
          <input
            ref="billInput"
            :placeholder="$t('bills.fillBillNumber')"
            v-model="billValue" />
          <div class="flex items-center justify-center gap-12">
            <img
              src="/icons/bills/copy.svg"
              alt="copy"
              @click="copyToClipboard" />
            <img src="/icons/bills/share.svg" alt="share" @click="shareBill" />
          </div>
        </div>
      </div>

      <CustomButton :value="$t('bills.updateLink')" is-image="update" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

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
</script>
<style scoped lang="scss">
.form-parent {
  display: flex;
  flex-direction: column;
  gap: 4px;
  .form-label {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0;
    color: white;
  }
  .the-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 12px;
    gap: 10px;
    padding: 11px 12px;
    background: #13121b;
    input {
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      letter-spacing: 0;
      color: white;
      width: 100%;
      background: transparent;
      border: 0;
      outline: none;
    }
    input::placeholder {
      color: #67639a;
    }

    img {
      cursor: pointer;
    }
  }
}

.bills_filter {
  min-width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #181720;
  border: 1px solid #2b2741;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.bills_row_choose {
  padding: 0 12px;
  border-radius: 12px;
  background: #181720;
  height: 44px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: 0;
  color: white;
  cursor: pointer;
}
.ton_text {
  font-family: Inter;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: right;
  vertical-align: middle;
  color: white;
}
.ton_equality {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: right;
  color: #b2aaf9;
}
</style>
