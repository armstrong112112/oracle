<template>
    <div class="statistic-games-container" :class="{ 'fade-in': !isLoading }">
        <div class="statistic-games-title">
            Games Played
        </div>

        <div class="statistic-games-items-wrapper">
            <div v-for="item in (isLoading ? Array(5).fill(null) : STATISTIC_GAMES_ITEMS)"
                :key="item?.id || Math.random()" class="statistic-games-item-container">
                <StatisticGameItem v-if="!isLoading && item" :icon="item.icon" :content_label="item.content_label"
                    :content_value="item.content_value" :money="item.money" />
                <StatisticGameItem v-else :isLoading="true" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StatisticGameItem from './StatisticGameItem/index.vue';

defineProps<{
    isLoading?: boolean;
}>();

const STATISTIC_GAMES_ITEMS = [
    {
        id: 1,
        icon: "/svg/shop/icons/All-games.svg",
        content_label: "All Games",
        content_value: 200,
        money: 1350,
    },
    {
        id: 2,
        icon: "/svg/shop/icons/roulette-casino-svgrepo-com.svg",
        content_label: "Roulette",
        content_value: 84,
        money: 900,
    },
    {
        id: 3,
        icon: "/svg/shop/icons/Poker.svg",
        content_label: "Poker",
        content_value: 42,
        money: 800,
    },
    {
        id: 4,
        icon: "/svg/shop/icons/Cube.svg",
        content_label: "Cube",
        content_value: 42,
        money: -150,
    },
    {
        id: 5,
        icon: "/svg/shop/icons/Slots.svg",
        content_label: "Slots",
        content_value: 32,
        money: -200,
    },
];
</script>

<style lang="scss" scoped>
.statistic-games-container {
    width: 100%;
    font-family: Roboto, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &.fade-in {
        animation: fadeIn 2.5s ease-in-out;
    }

    .statistic-games-title {
        width: 100%;
        font-weight: 400;
        font-size: 24px;
        line-height: 130%;
        letter-spacing: 0;
    }

    .statistic-games-items-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        width: 100%;
    }

    .statistic-games-item-container {
        width: 155px;
        flex-shrink: 0;
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
        opacity: 0.1;
    }

    100% {
        opacity: 1;
    }
}

@media (max-width: 1023px) {
    .statistic-games-container {
        .statistic-games-items-wrapper {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-bottom: 4px;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .statistic-games-item-container {
            width: 156px;
            min-width: 156px;
        }
    }
}

@media (max-width: 640px) {
    .statistic-games-container {
        .statistic-games-item-container {
            width: 115px;
            min-width: 115px;
        }
    }
}
</style>