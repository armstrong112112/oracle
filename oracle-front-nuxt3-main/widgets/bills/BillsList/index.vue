<template>
  <div class="overflow-hidden flex flex-col gap-16">
    <!-- Mobile Version Tabs -->
    <div class="mixing_header py-16 show_mobile">
      <div
        class="mixing_header_title"
        :class="{ active: selectedTab === 'All' }"
        @click="setTab('All')">
        {{ $t("bills.all") }}
      </div>
      <div
        class="mixing_header_title"
        :class="{ active: selectedTab === 'Active Bills' }"
        @click="setTab('Active Bills')">
        {{ $t("bills.activeBills") }}
      </div>
      <div
        class="mixing_header_title"
        :class="{ active: selectedTab === 'Paid Bills' }"
        @click="setTab('Paid Bills')">
        {{ $t("bills.paidBills") }}
      </div>
    </div>
    <div class="mixing_body_card py-16 flex flex-col gap-12 show_mobile">
      <div class="flex flex-col gap-8">
        <CustomButton :value="$t('bills.history')" type="secondary" />
      </div>
    </div>
    <div class="mixing_list py-16 flex-col flex">
      <div
        v-for="item in filteredData"
        :key="item.id"
        class="mixing_list_item pl-0">
        <div class="flex items-center justify-start gap-12">
          <img :src="item.icon" style="width: 36px" alt="" />
          <div class="mixing_list_item_left flex flex-col gap-8">
            <div class="mixing_body_card_header_title">
              {{ item.heading }}
            </div>
            <div class="flex items-center justify-start gap-4">
              <div
                v-if="item.type === 'active'"
                class="mixing_body_card_header_price due_date">
                {{ $t("bills.dueDate") }}
              </div>
              <div
                v-if="item.type === 'paid'"
                class="mixing_body_card_header_finished">
                {{ $t("bills.paid") }}
              </div>
              <div class="mixing_body_card_header_price due_date">
                {{ $t("bills.on") }} {{ item.date }}
              </div>
            </div>
          </div>
        </div>
        <div class="mixing_list_item_right flex flex-col gap-4">
          <div class="mixing_body_card_header_title">
            {{ item.amountTON }} LTC
          </div>
          <div class="mixing_body_card_header_quantity">
            {{ item.amountUSD }}$
          </div>
        </div>
        <div
          class="mixing_list_item_clickable"
          @click="handleItemClick(item)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Bill } from "~/entities/bills/data/BillsData";
import CustomButton from "~/components/ui/Button.vue";
import { useBillsStore } from "~/store/bills";

interface Props {
  selectedTab?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedTab: "All",
});

const emit = defineEmits<{
  "update:selectedTab": [tab: string];
  "open-created-modal": [item: Bill];
}>();

const billsStore = useBillsStore();

const filteredData = computed(() => billsStore.filteredBills);

const setTab = (tab: string) => {
  emit("update:selectedTab", tab);
};

const handleItemClick = (item: Bill) => {
  emit("open-created-modal", item);
};
</script>

<style scoped>

.mixing_header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
}
.mixing_header_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
  border-bottom: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: pointer;
}
.mixing_header_title.active {
  border-bottom: 1px solid #f64e2a;
  color: #f64e2a;
}
.mixing_body_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mixing_body_card_header_title,
.mixing_body_card_header_price {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.mixing_body_card_header_date {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}
.mixing_body_card_header_quantity {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #b2aaf9;
  text-align: right;
}

.mixing_list {
  overflow-y: auto;
  max-height: 600px;
}
.mixing_list_item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #2b2741;
  gap: 12px;
  padding: 14px 16px;
}
.mixing_body_card_header_finished {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #31f62a;
}
.due_date {
  color: #7a74ba !important;
}
.overflow-hidden {
  overflow: hidden !important;
}

.mixing_list_item {
  position: relative;
}

.mixing_list_item_clickable {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 1;
}

/* Responsive visibility classes */
.show_mobile {
  display: flex;
}

.show_desktop {
  display: none;
}

@media (min-width: 1024px) {
  .show_mobile {
    display: none;
  }

  .show_desktop {
    display: flex;
  }
}

</style>
