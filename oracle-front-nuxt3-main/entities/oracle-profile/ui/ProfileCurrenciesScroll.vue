<template>
  <div class="profile-currencies-scroll">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="profile-currencies-scroll-item">
      <div class="profile-currencies-scroll-item-col">
        <component
          :is="item.iconComponent"
          class="profile-currencies-scroll-item-col-icon" />
      </div>
      <div class="profile-currencies-scroll-item-col">
        <div class="profile-currencies-scroll-item-title">{{ item.title }}</div>
        <div class="profile-currencies-scroll-item-amount">
          {{ item.amount }}
        </div>
        <div class="profile-currencies-scroll-item-desc">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

interface CurrencyItem {
  title: string;
  amount: string;
  description: string;
  iconComponent: Component;
}

interface Props {
  items: CurrencyItem[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.profile-currencies-scroll {
  display: flex;
  gap: 10px;
  overflow: auto;

  &-item {
    display: grid;
    grid-template-columns: 70px min(100px);
    gap: 12px;
    box-sizing: border-box;
    min-width: 189px;
    height: 74px;
    border: 1px solid #18171c;
    border-radius: 12px;
    flex: none;
    order: 0;
    flex-grow: 0;

    &-title {
      font-family: "Hanson";
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 12px;
    }

    &-amount {
      font-family: "Reza Zulmi Alfaizi Sans";
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
    }

    &-desc {
      font-family: "Reza Zulmi Alfaizi Sans";
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
    }

    &-col {
      &-icon {
        background: #fff;
        padding: 6px 9px;
        border-radius: 50%;
      }

      &:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 58px;
        height: 58px;
        background: rgba(60, 60, 72, 0.2);
        border-radius: 8px;
      }

      &:last-child {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px 0;
      }
    }
  }
}
</style>
