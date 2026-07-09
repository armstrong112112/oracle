<template>
  <div>
    <!-- Поиск -->
    <div class="search-container mb-10">
        <input-oracle
          :search="true"
          @changed="handleSearch"
          type="text"
          class="search-input"
          placeholder="Coin name"
        />
    </div>
    <!-- /Поиск -->

    <ul class="crypto-list custom-scrollbar">
      <li v-for="item in filteredCryptoList" :key="item.id" class="list-item">
        <button class="crypto-button" @click.prevent="onItemClick(item)">
          <div class="form-control">
            <div class="form-input">
              <input
                type="radio"
                :name="radioGroup"
                class="crypto-selection"
                :checked="isSelected(item.value)"
                readonly
              />
              <div class="checkbox-button">
                <span class="check-icon">
                  <CheckIcon />
                </span>
              </div>
            </div>
          </div>

          <div class="right-block">
            <slot name="item" :item="item">
              <div class="icon">
                <slot name="icon" :item="item">
                  <img :src="item.icon" :alt="item.value" />
                </slot>
              </div>
              <div class="coin-body">
                <slot name="body" :item="item">
                  <div class="body-head">
                    <p class="crypto-name">{{ item.title }}</p>
                    <p class="crypto-amound">{{ item.amount }}</p>
                  </div>
                  <div class="body-bottom">
                    <p class="crypto-card">**** {{ item.cardNumber }}</p>
                    <p class="crypto-price">≈ {{ item.price }}$</p>
                  </div>
                </slot>
              </div>
            </slot>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/svg/arrow-back.svg?component'
import CheckIcon from '@/assets/svg/check-icon.svg?component'
import type { Coin } from '~/entities/p2p/model/coins'

interface Props {
  cryptoList: Coin[];
  initialSelected: Coin;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [value: Coin];
}>();

// Reactive state
const selectedSingle = ref<Coin | null>(props.initialSelected);
const searchQuery = ref<string>('');
const radioGroup = ref<string>('crypto-selection-' + Math.random().toString(36).substr(2, 9));

// Computed properties
const filteredCryptoList = computed((): Coin[] => {
  if (!searchQuery.value.trim()) {
    return props.cryptoList;
  } else {
    return props.cryptoList.filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
});

// Methods
const onItemClick = (value: Coin) => {
  selectedSingle.value = value;
  emit('select', value);
};

const isSelected = (value: string): boolean => {
  return selectedSingle.value?.value === value;
};

const handleSearch = (value: string) => {
  searchQuery.value = value;
};
</script>

<style scoped lang="scss">
.crypto-list {
  min-height: 300px;
  max-height: 300px;
  @media (min-width: 1024px) {
    min-height: auto;
    
  }
}
</style>

<style lang="scss" scoped>
@use '@/assets/styles/components/coin-filter-button.scss' as *;
</style>
