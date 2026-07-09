<template>
  <div class="bills_header flex items-center justify-start py-16 gap-8">
    <div class="bills_row w-full">
      <div class="bills_row_choose flex items-center justify-between">
        <div class="bills_row_choose_title">{{ $t("bills.allCrypto") }}</div>
        <img src="/icons/verification/down.svg" alt="down" />
      </div>
    </div>
    <div class="bills_filter" @click="toggleCategoryDialog">
      <img src="/icons/bills/filter.svg" alt="" />
    </div>
    <BillsFilter
      v-model:isDialogVisible="isCategoryDialogOpen"
      :hide-choose-button="true" />
  </div>
</template>

<script setup lang="ts">
import { useBillsStore } from "~/store/bills";
import BillsFilter from "~/widgets/bills/BillsFilter/index.vue";

const billsStore = useBillsStore();

const isCategoryDialogOpen = computed({
  get: () => billsStore.isCategoryDialogOpen,
  set: (value: boolean) => {
    if (value) {
      billsStore.toggleCategoryDialog();
    } else {
      billsStore.toggleCategoryDialog();
    }
  },
});

const toggleCategoryDialog = () => {
  billsStore.toggleCategoryDialog();
};
</script>

<style scoped>
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
</style>
