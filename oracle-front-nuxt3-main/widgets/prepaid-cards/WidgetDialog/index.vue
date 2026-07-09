<template>
  <transition name="slide-left">
    <div v-if="isVisible" class="widget_dialog">
      <!--    <div class="dialog_overlay" @click="cancelAction"></div>-->
      <div class="widget_dialog_overlay" @click="cancelAction"></div>
      <div class="widget_dialog_card">
        <div class="widget_dialog_card_inner">
          <div class="widget_dialog_card_inner_header">
            <div class="flex flex-col gap-16 justify-center items-center">
              <img
                src="/icons/prepaid-cards/success.svg"
                style="height: 48px; width: 48px"
                alt="" />
              <div class="widget_dialog_card_inner_header_title">
                {{
                  modalType === "deposit"
                    ? "Deposit Confirmed!"
                    : "    Withdrawal Confirmed!"
                }}
              </div>
            </div>
            <div class="black_hole black_hole_left"></div>
            <div class="black_hole black_hole_right"></div>
          </div>
          <div class="widget_dialog_card_inner_body flex flex-col gap-24">
            <div class="widget_dialog_card_inner_body_row">
              <div class="widget_dialog_card_inner_body_row_col">
                <div class="widget_dialog_card_inner_body_row_col_title">
                  Date
                </div>
                <div class="widget_dialog_card_inner_body_row_col_description">
                  Feb 20, 2025
                </div>
              </div>
              <div class="widget_dialog_card_inner_body_row_col">
                <div
                  class="widget_dialog_card_inner_body_row_col_title text-right">
                  Time
                </div>
                <div class="widget_dialog_card_inner_body_row_col_description">
                  11:23 AM
                </div>
              </div>
            </div>
            <div class="widget_dialog_card_inner_body_row">
              <div class="widget_dialog_card_inner_body_row_col">
                <div class="widget_dialog_card_inner_body_row_col_title">
                  From Card
                </div>
                <div class="widget_dialog_card_inner_body_row_col_description">
                  VISA ****2991
                </div>
              </div>
              <div class="widget_dialog_card_inner_body_row_col">
                <div
                  class="widget_dialog_card_inner_body_row_col_title items-end text-right">
                  To
                </div>
                <div class="flex items-end justify-center gap-8">
                  <img
                    src="/icons/prepaid-cards/lite.svg"
                    width="20px;"
                    alt="" />
                  <div
                    class="widget_dialog_card_inner_body_row_col_description">
                    xxxx9012
                  </div>
                </div>
              </div>
            </div>
            <div class="widget_dialog_card_inner_body_row">
              <div class="widget_dialog_card_inner_body_row_col">
                <div class="widget_dialog_card_inner_body_row_col_title">
                  Amount Withdrawn
                </div>
                <div class="flex items-center justify-start gap-4">
                  <div
                    class="widget_dialog_card_inner_body_row_col_description">
                    0.0000312 BTC
                  </div>
                  <div class="widget_dialog_card_inner_body_row_col_title">
                    ≈ $50 USD
                  </div>
                </div>
              </div>
            </div>
            <div class="widget_dialog_card_inner_body_row">
              <div class="widget_dialog_card_inner_body_row_col">
                <div class="widget_dialog_card_inner_body_row_col_title">
                  Amount to be Received
                </div>
                <div class="flex items-center justify-start gap-4">
                  <div
                    class="widget_dialog_card_inner_body_row_col_description">
                    45$
                  </div>
                  <div class="widget_dialog_card_inner_body_row_col_title">
                    ≈ $5 USD
                  </div>
                </div>
              </div>
              <div class="widget_dialog_card_inner_body_row_col">
                <div class="widget_dialog_card_inner_body_row_col_title">
                  Fees
                </div>
                <div class="flex items-center justify-start gap-4">
                  <div
                    class="widget_dialog_card_inner_body_row_col_description">
                    0.05 BTC
                  </div>
                  <div class="widget_dialog_card_inner_body_row_col_title">
                    ≈ $5 USD
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="modalType !== 'deposit'"
            class="widget_dialog_card_footer mt-20">
            <div class="widget_dialog_card_inner_body_row_col_title">
              Amount Received
            </div>
            <div class="flex items-center justify-starty">
              <div class="widget_dialog_card_inner_body_row_col_price">
                100 USDT
              </div>
              <div class="widget_dialog_card_inner_body_row_col_description">
                ≈ $98.98
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Props
interface Props {
  title: string;
  buttonText: string;
  modalType?: string;
  isVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modalType: "",
  isVisible: false,
});

// Emits
const emit = defineEmits<{
  close: [];
  confirm: [];
}>();

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Methods
const cancelAction = (): void => {
  emit("close");
};

const confirmAction = (): void => {
  emit("confirm");
};
</script>

<style lang="scss">
.widget_dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 12px;
  z-index: 999;
  flex-direction: column;
}

.widget_dialog_card {
  border-radius: 8px;

  max-width: 400px;
  width: 90%;
  padding: 30px 16px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.widget_dialog {
  padding: 12px;
}

.widget_dialog_overlay {
  background: #00000099;
  backdrop-filter: blur(35.4px);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
.widget_dialog_card_inner {
  padding: 24px;
  gap: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  background: #181720;
  width: 100%;
  position: relative;
  z-index: 9;
}
.widget_dialog_card_inner_header {
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed #443d69;
  padding-bottom: 28px;
}
.widget_dialog_card_inner_header_title {
  font-family: Inter;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.black_hole {
  width: 28px;
  height: 28px;
  background: #000;
  border-radius: 50%;
  position: absolute;
  top: 125px;
}
.black_hole_left {
  left: -14px;
}
.black_hole_right {
  right: -14px;
}
.widget_dialog_card_inner_body_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.widget_dialog_card_inner_body_row_col_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #7a74ba;
}
.widget_dialog_card_inner_body_row_col_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.widget_dialog_card_inner_body_row_col_price {
  font-family: Roboto;
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
</style>
