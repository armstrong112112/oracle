<template>
  <div>
    <transition name="slide-left" appear>
      <div
        v-if="isDialogVisibleInternal"
        ref="dialogOverlay"
        class="dialog-overlay"
        tabindex="0"
        @keydown.esc="closeDialog">
        <div
          class="dialog-overlay category_overlay"
          @click.stop="closeDialog"></div>
        <div class="dialog category_dialog">
          <div class="dialog_drag_icon" @click="closeDialog"></div>
          <div class="flex flex-col gap-12">
            <div class="dialog_header">
              <div class="category_header_title">{{ $t("bills.sortBy") }}</div>
            </div>
            <div class="dialog_body py-16">
              <div class="flex flex-col gap-4">
                <div class="dialog_body_title">{{ $t("bills.amount") }}</div>
                <div
                  v-for="(option, index) in amountOptions"
                  :key="'amount-' + index"
                  class="dialog_row_body flex items-center justify-start gap-8"
                  @click="toggleSelection('amount', index)">
                  <img
                    v-show="!option.selected"
                    src="/icons/verification/select.svg"
                    alt="select" />
                  <img
                    v-show="option.selected"
                    src="/icons/verification/selected.svg"
                    alt="selected" />
                  <div class="dialog_row_body_title">
                    {{ $t("bills.lowToHigh") }}
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div class="dialog_body_title">{{ $t("bills.order") }}</div>
                <div
                  v-for="(option, index) in orderOptions"
                  :key="'order-' + index"
                  class="dialog_row_body flex items-center justify-start gap-8"
                  @click="toggleSelection('order', index)">
                  <img
                    v-show="!option.selected"
                    src="/icons/verification/select.svg"
                    alt="select" />
                  <img
                    v-show="option.selected"
                    src="/icons/verification/selected.svg"
                    alt="selected" />
                  <div class="dialog_row_body_title">
                    {{ $t("bills.oldestToNewest") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bills_filter_footer">
            <CustomButton
              :value="$t('bills.save')"
              class="w-full"
              @click="saveSelection" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { useBillsStore } from "~/store/bills";

interface Props {
  isDialogVisible?: boolean;
  hideChooseButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDialogVisible: false,
  hideChooseButton: false,
});

const emit = defineEmits<{
  "update:isDialogVisible": [value: boolean];
  save: [data: { amount?: string; order?: string }];
}>();

const billsStore = useBillsStore();

const isDialogVisibleInternal = ref(false);

const amountOptions = ref([
  { title: "Low to high", selected: false },
  { title: "High to low", selected: false },
]);

const orderOptions = ref([
  { title: "Oldest to newest", selected: false },
  { title: "Newest to oldest", selected: false },
]);

watch(
  () => props.isDialogVisible,
  (newValue) => {
    isDialogVisibleInternal.value = newValue;
  },
  { immediate: true }
);

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isDialogVisibleInternal.value) {
    closeDialog();
  }
};

const toggleSelection = (category: "amount" | "order", index: number) => {
  const options =
    category === "amount" ? amountOptions.value : orderOptions.value;
  options.forEach((option, i) => {
    option.selected = i === index;
  });
};

const saveSelection = () => {
  const selectedAmount = amountOptions.value.find((opt) => opt.selected)?.title;
  const selectedOrder = orderOptions.value.find((opt) => opt.selected)?.title;
  emit("save", { amount: selectedAmount, order: selectedOrder });
  billsStore.setFilterOptions({
    amount: selectedAmount || "",
    order: selectedOrder || "",
  });
  closeDialog();
};

const closeDialog = () => {
  isDialogVisibleInternal.value = false;
  emit("update:isDialogVisible", false);
};

onMounted(() => {
  window.addEventListener("keydown", handleEscKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscKey);
});
</script>
<style lang="scss" scoped>
.dialog_row_body img {
  width: 18px;
  height: 18px;
}
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  transition: all 0.3s ease-out;
  cursor: pointer;
}
.category_overlay {
  background: transparent !important;
}
.dialog {
  max-width: 500px;
  width: 100%;
  background: #121119;
}
.category_dialog {
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  padding-top: 20px;
  z-index: 1001;
  position: relative;
}
.dialog_body {
  overflow-y: auto;
  max-height: 500px;
}

.dialog_header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
}

.dialog_body::-webkit-scrollbar {
  width: 10px;
}

.dialog_body::-webkit-scrollbar-track {
  background: #121212;
  border-radius: 10px;
}

.dialog_body::-webkit-scrollbar-thumb {
  background: #312f42 !important;
  border-radius: 10px;
}

.dialog_body::-webkit-scrollbar-thumb:hover {
  background: #5b5b66 !important;
  cursor: auto;
}

.category_header_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.dialog_body_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.dialog_row_body_title {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.category_dialog {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.bills_filter_footer {
  gap: 8px;
  padding: 12px 20px 24px;
  border-top: 1px solid #2b2741;
}
</style>
