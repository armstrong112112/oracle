<template>
  <div v-if="isOpen" class="bills-filter-modal-overlay" @click="closeModal">
    <div class="bills-filter-modal-content" @click.stop>
      <div class="bills-filter-modal-header">
        <h2 class="bills-filter-modal-title">{{ $t("bills.sortBy") }}</h2>
        <button class="bills-filter-modal-close" @click="closeModal">
          <img src="/svg/close.svg" alt="close" />
        </button>
      </div>
      <div class="bills-filter-modal-body">
        <div class="filter-section">
          <div class="filter-section-title">{{ $t("bills.amount") }}</div>
          <div class="filter-options">
            <div
              v-for="(option, index) in amountOptions"
              :key="'amount-' + index"
              class="filter-option"
              :class="{ active: option.selected }"
              @click="toggleSelection('amount', index)">
              <div class="filter-option-icon">
                <img
                  v-if="option.selected"
                  src="/svg/check-icon.svg"
                  alt="selected" />
              </div>
              <div class="filter-option-text">
                {{ $t("bills.lowToHigh") }}
              </div>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <div class="filter-section-title">{{ $t("bills.order") }}</div>
          <div class="filter-options">
            <div
              v-for="(option, index) in orderOptions"
              :key="'order-' + index"
              class="filter-option"
              :class="{ active: option.selected }"
              @click="toggleSelection('order', index)">
              <div class="filter-option-icon">
                <img
                  v-if="option.selected"
                  src="/svg/check-icon.svg"
                  alt="selected" />
              </div>
              <div class="filter-option-text">
                {{ $t("bills.oldestToNewest") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bills-filter-modal-footer">
        <CustomButton
          :value="$t('bills.save')"
          type="primary"
          class="w-full"
          @click="saveSelection" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { useBillsStore } from "~/store/bills";

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  save: [data: { amount?: string; order?: string }];
}>();

const billsStore = useBillsStore();

const amountOptions = ref([
  { title: "Low to high", selected: false },
  { title: "High to low", selected: false },
]);

const orderOptions = ref([
  { title: "Oldest to newest", selected: false },
  { title: "Newest to oldest", selected: false },
]);

const closeModal = () => {
  emit("close");
};

const toggleSelection = (category: "amount" | "order", index: number) => {
  if (category === "amount") {
    amountOptions.value.forEach((option, i) => {
      option.selected = i === index;
    });
  } else {
    orderOptions.value.forEach((option, i) => {
      option.selected = i === index;
    });
  }
};

const saveSelection = () => {
  const selectedAmount = amountOptions.value.find((opt) => opt.selected)?.title;
  const selectedOrder = orderOptions.value.find((opt) => opt.selected)?.title;
  emit("save", { amount: selectedAmount, order: selectedOrder });
  billsStore.setFilterOptions({
    amount: selectedAmount || "",
    order: selectedOrder || "",
  });
  closeModal();
};
</script>

<style lang="scss" scoped>
.bills-filter-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.bills-filter-modal-content {
  background: #13121b;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #2b2741;
}

.bills-filter-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #2b2741;
}

.bills-filter-modal-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 135%;
  color: white;
  margin: 0;
}

.bills-filter-modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #2b2741;
  }

  img {
    width: 20px;
    height: 20px;
  }
}

.bills-filter-modal-body {
  padding: 16px 24px;
}

.filter-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.filter-section-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: white;
  margin-bottom: 12px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background: #181720;
  }

  &.active {
    background: #181720;
    border-color: #f64e2a;
  }
}

.filter-option-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
  }
}

.filter-option-text {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
}

.bills-filter-modal-footer {
  padding: 16px 24px 24px;
  border-top: 1px solid #2b2741;
}
</style>
