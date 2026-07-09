<template>
  <ul class="market-ticker">
    <li v-for="(item, index) in items" :key="index" class="market-ticker__item">
      <div class="market-ticker__icon">
        <img :src="item.img" alt="" />
      </div>
      <div class="market-ticker__body">
        <div class="body-head">
          <div class="market-ticker__pair">{{ item.name }}</div>
          <div :class="['coin-status__icon', item.change < 0 ? 'negative' : 'positive']">
            <WalletIcon />
          </div>
          <div :class="['coin-change', item.change < 0 ? 'negative' : 'positive']">
            {{ formatChange(item.change) }}
          </div>
        </div>
        <div class="market-ticker__price">
          {{ formatPrice(item.amount) }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import WalletIcon from '@/assets/svg/wallet-status.svg?component'
import { formatChange } from '~/composables/formatter'
import type { DifCoin } from '~/entities/dashboard-payment/model/coins.types'

interface Props {
  items: DifCoin[]
}

defineProps<Props>()

const formatPrice = (value: number): string => {
  return value.toLocaleString()
}
</script>

<style lang="scss">
@use '@/assets/styles/components/coins.scss' as *;
</style>
