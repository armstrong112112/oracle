<template>
  <custom-list :items="items" variant="underline" clickable >
    <template v-slot:title="{ item }">
      <div class="left-block">
        <div class="coin-info">
          <h3 class="coin-name">{{ item.name }}</h3>
          <div
            :class="[
              'coin-status__icon',
              {
                negative: !isPositive(item.change),
              },
            ]"
          >
            <WalletIcon />
          </div>
          <div
            :class="[
              'coin-change',
              {
                positive: isPositive(item.change),
                negative: !isPositive(item.change),
              },
            ]"
          >
            {{ formatChange(item.change) }}
          </div>
        </div>
        <div class="wallet-card">
          <span>****</span> {{ item.cardNumber }}
        </div>
      </div>
      <div class="right-block">
        <h4 class="coin-amount">{{ item.amount }}</h4>
        <h4 class="coin-price">{{ item.usdValue }}</h4>
      </div>
    </template>
  </custom-list>
</template>

<script setup lang="ts">
import CustomList from '../custom-list.vue';
import WalletIcon from '@/assets/svg/wallet-status.svg?component'
import { isPositive } from '~/composables/checker';
import { formatChange } from '~/composables/formatter';

interface Props {
  items: any[]
}

defineProps<Props>()
</script>