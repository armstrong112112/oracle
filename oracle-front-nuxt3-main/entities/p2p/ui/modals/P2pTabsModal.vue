<template>
    <div class="p2p-tabs-modal">
      <!-- Поиск -->
      <div class="search-container mb-10">
          <input-oracle
            :search="true"
            @changed="handleSearch"
            type="text"
            class="search-input"
            placeholder="Payment name"
          />
      </div>
      <!-- /Поиск -->
      <div class="p2p-tabs-modal__tabs-container custom-scrollbar">
        <slot name="tabs" :data="{ tabs: filteredList, active: activeTabs, select: handleTabClick }">
          <Tabs :tabs="filteredList" :active="activeTabs" :multiple="isMultiple" @select="handleTabClick" />
        </slot>
      </div>
      
    </div>
  </template>
  
<script setup lang="ts">
import type { PaymentType } from '~/entities/p2p/model/paymentType'
import Tabs from '~/components/ui/Tabs.vue'

interface Props {
  tabsList: PaymentType[];
  initialSelected: PaymentType;
  isMultiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isMultiple: true,
});

const emit = defineEmits<{
  select: [value: object[]];
}>();

// Reactive state
const searchQuery = ref<string>('');
const activeTabs = ref<object>(props.initialSelected);

// Computed properties
const filteredList = computed((): PaymentType[] => {
  if (!searchQuery.value.trim()) {
    return props.tabsList;
  } else {
    return props.tabsList.filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
});

// Methods
const handleSearch = (value: string) => {
  searchQuery.value = value;
};

const handleTabClick = (value: object[]) => {
  activeTabs.value = value;
  emit('select', value);
};
</script>
  
  <style lang="scss">
  .p2p-tabs-modal .tabs-container {
    flex-wrap: wrap;
    .tab-item {
        flex: 0 calc(33.333% - 5.333px);
    }
  }
  .p2p-tabs-modal__tabs-container {
    min-height: 300px;
    max-height: 300px;
    @media (min-width: 1024px) {
      min-height: auto;
    }
  }
  </style>
  