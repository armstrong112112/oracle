<template>
  <div class="dashboard-home__block">
    <ul class="home-cards">
      <li v-for="card of crads" :key="card.id" class="card-item">
        <div class="card-img">
          <img :src="card.img" alt="" />
        </div>
        <h3 class="home-title">{{ $t(card.title) }}</h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const crads = [
  {
    id: 1,
    title: 'dashboard.homeHowToSwap',
    img: '/png/home-1.png',
  },
  {
    id: 2,
    title: 'dashboard.homeBestRates',
    img: '/png/home-2.png',
  },
  {
    id: 3,
    title: 'dashboard.homeLowerFees',
    img: '/png/home-3.png',
  },
  {
    id: 4,
    title: 'dashboard.homeLowerFees',
    img: '/png/home-3.png',
  },
  {
    id: 5,
    title: 'dashboard.homeHowToSwap',
    img: '/png/home-1.png',
  },
  {
    id: 6,
    title: 'dashboard.homeBestRates',
    img: '/png/home-2.png',
  },
  {
    id: 7,
    title: 'dashboard.homeLowerFees',
    img: '/png/home-3.png',
  },
]
</script>

<style lang="scss">
.dashboard-home__block {
  width: calc(100% + 32px);
  margin-left: -16px;
  .home-cards {
    display: flex;
    gap: 8px;
    padding: 0 16px;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      height: 0;
    }
    .card-item {
      border: 1px solid #2b2741;
      border-radius: 14px;
      padding: 4px;
      width: 89px;
      min-width: 89px;
      height: 107px;
      position: relative;
      .card-img {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .home-title {
        position: absolute;
        padding: 10px;
        left: 0;
        bottom: 0;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 12px;
        line-height: 120%;
        color: #fff;
        text-shadow: 0 0 20px #000;
      }
    }
  }
}
</style>
