<template>
    <div class="casino-page">
        <!-- <h1>Casino</h1>
        <div class="casino-navbar">
            <NuxtLink to="/casino/now">Now</NuxtLink>
            <NuxtLink to="/casino/game-history">Game History</NuxtLink>
            <NuxtLink to="/casino/statistics">Statistics</NuxtLink>
            <NuxtLink to="/casino/achievments">Achievments</NuxtLink>
        </div> -->
        <div class="casino-container">
            <div class="casino-header-container" ref="headerContainer" @scroll="handleScroll">
                <div v-for="item in CASINO_HEADER_DATA" :key="item.id" class="casino-header-item">
                    <CasinoHeader :title="item.title" :activeIndex="activeIndex" />
                </div>
            </div>
            <CasinoAllGames />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CasinoHeader from '~/widgets/casino/CasinoHeader/index.vue';
import CasinoAllGames from '~/widgets/casino/CasinoAllGames/index.vue';

definePageMeta({
    layout: "sidebar",
});

const activeIndex = ref(1);
const headerContainer = ref<HTMLElement | null>(null);

const handleScroll = () => {
    if (!headerContainer.value) return;

    const container = headerContainer.value;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth;
    const currentIndex = Math.round(scrollLeft / itemWidth) + 1;

    activeIndex.value = Math.min(Math.max(currentIndex, 1), CASINO_HEADER_DATA.length);
};

onMounted(() => {
    if (headerContainer.value) {
        handleScroll();
    }
});

const CASINO_HEADER_DATA = [
    {
        id: 1,
        title: "Roulette Bonus - $50 USDT",
    },
    {
        id: 2,
        title: "Roulette Bonus - $50 USDT",
    },
    {
        id: 3,
        title: "Roulette Bonus - $50 USDT",
    },
    {
        id: 4,
        title: "Roulette Bonus - $50 USDT",
    },
    {
        id: 5,
        title: "Roulette Bonus - $50 USDT",
    },
    {
        id: 6,
        title: "Roulette Bonus - $50 USDT",
    },
    {
        id: 7,
        title: "Roulette Bonus - $50 USDT",
    },
]
</script>

<style lang="scss" scoped>
.casino-navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.casino-page {
    padding: 24px;

    .casino-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;

        .casino-header-container {
            width: 100%;
            max-width: 800px;
            height: 311px;
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
                display: none;
            }

            .casino-header-item {
                min-width: 100%;
                width: 100%;
                height: 311px;
                flex-shrink: 0;
                scroll-snap-align: start;
            }
        }
    }
}

@media (max-width: 393px) {
    .casino-page {
        .casino-container {
            gap: 16px;
        }
    }
}

@media (min-width: 394px) and (max-width: 430px) {}

@media (max-width: 1023px) {
    .casino-page {
        padding: 0;

        .casino-container {
            gap: 16px;

            .casino-header-container {
                width: 100vw;
                max-width: 100vw;
            }

        }
    }
}
</style>