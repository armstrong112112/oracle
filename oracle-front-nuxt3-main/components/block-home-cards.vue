<template>
  <ul class="block-home-cards">
    <li v-for="card in cards" :key="card.id" class="card-item">
      <div class="card-img">
        <img :src="card.img" alt="" />
      </div>
      <h4 class="card-title">{{ card.title }}</h4>
    </li>
  </ul>
</template>

<script setup lang="ts">
// @ts-ignore
import externaltransfer from "@/png/external-transfer.png";
// @ts-ignore
import mixcrypto from "@/png/mix-crypto.png";
// @ts-ignore
import recentoracle from "@/png/recent-oracle.png";
// @ts-ignore
import newfeatures from "@/png/new-features.png";

const cards = [
  {
    id: 1,
    img: externaltransfer,
    title: "How to send an external Transfer",
  },
  {
    id: 2,
    img: mixcrypto,
    title: "How to mix crypto",
  },
  {
    id: 3,
    img: recentoracle,
    title: "Recent Oracle System's Update",
  },
  {
    id: 4,
    img: newfeatures,
    title: "How to send an external Transfer",
  },
];
</script>

<style lang="scss">
.block-home-cards {
  width: calc(100% + 20px);
  display: flex;
  align-items: stretch;
  gap: 15px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: -10px;
  padding: 0 10px;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
  .card-item {
    min-width: 125px;
    height: 150px;
    display: flex;
    align-items: end;
    border-radius: 13px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    padding: 8px 10px;
    &:nth-child(2) {
      align-items: start;
      .card-title {
        max-width: 80px;
      }
    }
    &:nth-child(1),
    &:nth-child(2) {
      min-width: 133px;
      border: 1px solid #f64e2a;
    }
    .card-img {
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .card-title {
      position: relative;
      z-index: 2;
      font-family: var(--third-family);
      font-weight: 400;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
