<template>
  <div class="flex flex-col gap-16">
    <div class="withdraw_card">
      <div
        class="withdraw_card_header flex items-center py-16 justify-between"
        @click="toggleDropdown"
        :class="isOpen ? 'border-bottom-1' : 'border-0'">
        <div class="withdraw_card_header_title">
          {{ t("mixing.withdrawals") }}
        </div>
        <img
          src="/icons/verification/down.svg"
          alt="down"
          :class="{ 'rotate-180': isOpen }"
          class="transition-transform duration-300" />
      </div>
      <div v-show="isOpen" class="withdraw_card_body">
        <div class="mixing_list flex-col flex">
          <div
            v-for="(item, index) in originalData"
            :key="index"
            class="mixing_list_item py-16">
            <div class="mixing_list_item_left flex flex-col gap-8">
              <div class="mixing_body_card_header_title">
                {{ t("mixing.mixingNumber", { number: item.id }) }}
              </div>
              <div class="flex flex-col gap-4">
                <div class="mixing_body_card_header_price">
                  {{ item.createdAt }}
                </div>
                <div class="mixing_body_card_header_finished">
                  {{ item.finishedAt }}
                </div>
              </div>
            </div>
            <div class="mixing_list_item_right flex flex-col gap-4">
              <div class="mixing_body_card_header_title">
                {{ item.amountLTC }} {{ t("mixing.ltc") }}
              </div>
              <div class="mixing_body_card_header_quantity">
                {{ item.amountUSD }}{{ t("mixing.usd") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mixingData } from "~/entities/mixing/data/mixes";
import { useMixingStore } from "~/store/mixing";

// Composables
const { t } = useI18n();
const mixingStore = useMixingStore();

// Reactive state
const isOpen = ref(false);

// Computed
const originalData = computed(() =>
  mixingStore.mixingData.length > 0 ? mixingStore.mixingData : mixingData
);

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Initialize data if not already set
onMounted(() => {
  if (mixingStore.mixingData.length === 0) {
    mixingStore.setMixingData(mixingData);
  }
});
</script>

<style scoped>
.withdraw_card {
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  padding-bottom: 12px;
  gap: 12px;
  border-radius: 16px;
  border: 1px solid #2b2741;
}
.withdraw_card_header {
  cursor: pointer;
}
.rotate-180 {
  transform: rotate(180deg);
}
.border-bottom-1 {
  border-bottom: 1px solid #2b2741;
  padding-bottom: 8px;
}
.border-0 {
  border: 0;
}
.withdraw_card_header_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
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
.mixing_body_card_header_quantity {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #b2aaf9;
  text-align: right;
}
.mixing_list_item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #2b2741;
}
.mixing_body_card_header_finished {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #31f62a;
}
</style>
