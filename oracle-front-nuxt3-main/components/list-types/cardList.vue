<template>
  <ul class="prepaid-cards__list">
    <li v-for="card of items" :key="card.id" class="card-item">
      <div class="card-head">
        <h5 class="card-name">{{ card.name }}</h5>
        <div class="wallet-card"><span>****</span> {{ card.number }}</div>
      </div>
      <div class="card-img">
        <img :src="card.img" alt="" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Card } from "~/entities/dashboard-payment/model/cards.types";

interface Props {
  items: Card[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/card-list.scss" as *;
</style>
