<script setup lang="ts">
import { CryptoScale as cryptoScaleData } from "~/entities/oracle-pay/data/CryptoScale";

interface CryptoScaleItem {
  id: number;
  title: string;
  checked: boolean;
  icon: string;
}

const apiKeys = ref<CryptoScaleItem[]>([...cryptoScaleData]);
const isOpen = ref(false);

const selectedKeys = computed((): string => {
  const selected = apiKeys.value
    .filter((api) => api.checked)
    .map((api) => api.title);
  return selected.length ? selected.join(", ") : "Scale";
});

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value;
};

const toggleCheck = (api: CryptoScaleItem): void => {
  api.checked = !api.checked;
};
</script>

<template>
  <div class="choose_stats"
  :class="isOpen ? 'is-open' : null">
    <div
      class="choose_stats_header"
      :class="selectedKeys === 'Scale' ? 'placeholder-color' : null"
      @click="toggleDropdown">
      <span>{{ selectedKeys }}</span>
      <img
        src="/icons/verification/down.svg"
        :class="{ 'rotate-180': isOpen }"
        alt="down" />
    </div>
    <transition name="slide-left">
      <div v-if="isOpen" class="choose_body">
        <div
          v-for="api in apiKeys"
          :key="api.id"
          class="choose_body_item"
          @click="toggleCheck(api)">
          <div class="flex items-center justify-center gap-10">
            <img :src="api.icon" alt="checked" />
            <div class="choose_body_item_title">{{ api.title }}</div>
          </div>
          <div class="choose_body_item_image">
            <img
              v-if="api.checked"
              src="/icons/oracle-pay/checked.svg"
              alt="checked" />
            <img v-else src="/icons/oracle-pay/unchecked.svg" alt="unchecked" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.choose_stats {
  border-radius: 12px !important;
  background: #13121b !important;
}
.is-open {
  border-radius: 12px 12px 0 0 !important;
}
.choose_stats_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 10px 14px;
  font-family: Roboto, sans-serif !important;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
  cursor: pointer;
}
.choose_stats_header img {
  transition: transform 0.3s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}
.choose_body_item {
  border-top: 1px solid #242232;
  gap: 8px;
  padding: 10px 12px 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.choose_body_item_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: white;
}

.placeholder-color {
  color: #67639a !important;
}
</style>
