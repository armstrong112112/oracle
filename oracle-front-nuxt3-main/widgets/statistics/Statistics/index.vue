<template>
    <div class="statistics-container">
        <div class="statistic-biggest-win-item-container">
            <StatisticBiggestWinItem :isLoading="isLoading" />
        </div>

        <div class="statistic-small-items-container" :class="{ 'fade-in': !isLoading }">
            <div v-for="item in (isLoading ? Array(3).fill(null) : STATISTICS_ITEMS)" :key="item?.id || Math.random()"
                class="statistic-small-item-container">
                <StatisticSmallItem v-if="!isLoading && item" :title="item.title" :value="item.value" />
                <StatisticSmallItem v-else :isLoading="true" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StatisticBiggestWinItem from './StatisticBiggestWinItem/index.vue';
import StatisticSmallItem from './StatisticSmallItem/index.vue';

defineProps<{
    isLoading?: boolean;
}>();

const STATISTICS_ITEMS = [
    {
        id: 2,
        title: "Total Winnings",
        value: "$3 832",
    },
    {
        id: 3,
        title: "Total losses",
        value: "$3 832",
    },
    {
        id: 4,
        title: "Favorite Game",
        value: "Roulette",
    },
]
</script>

<style lang="scss" scoped>
.statistics-container {
    display: flex;
    gap: 10px;
    width: 100%;

    .statistic-biggest-win-item-container {
        flex: 1;
        display: flex;
        min-height: 230px;
    }

    .statistic-small-items-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-height: 200px;

        &.fade-in {
            animation: fadeIn 1.5s ease-in-out;
        }
    }

    .statistic-small-item-container {
        flex: 1;
        min-height: 0;
    }
}

@keyframes skeleton-loading {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}
</style>