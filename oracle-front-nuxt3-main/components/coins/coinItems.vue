<template>
  <ul class="wallet-actions">
    <li v-for="coin of items" :key="coin.id" class="wallet-action">
      <button class="wallet-action__btn">
        <div class="coin-icon">
          <img :src="coin.img" alt="" />
        </div>
        <div class="wallet-action__body">
          <div class="left-block">
            <div class="coin-info">
              <h3 class="coin-name">{{ coin.name }}</h3>
              <div
                :class="[
                  'coin-status__icon',
                  {
                    negative: !isPositive(coin.change),
                  },
                ]">
                <WalletIcon />
              </div>
              <div
                :class="[
                  'coin-change',
                  {
                    positive: isPositive(coin.change),
                    negative: !isPositive(coin.change),
                  },
                ]">
                {{ formatChange(coin.change) }}
              </div>
            </div>
          </div>
          <div class="right-block">
            <h4 class="coin-amount">{{ coin.amount }}</h4>
            <h4 class="coin-price">{{ coin.usdValue }}</h4>
          </div>
        </div>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import WalletIcon from "@/assets/svg/wallet-status.svg?component";
import { isPositive } from "~/composables/checker";
import { formatChange } from "~/composables/formatter";
import type { Coin } from "~/entities/dashboard-payment/model/coins.types";

interface Props {
  items: Coin[];
}

defineProps<Props>();

const formatPrice = (value: number): string => {
  return value.toLocaleString();
};
</script>

<style lang="scss">
@use "@/assets/styles/components/coins.scss" as *;
</style>
