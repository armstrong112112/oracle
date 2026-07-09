<template>
    <div class="statistic-summary-container" :class="{ 'fade-in': !isLoading }">
        <div v-for="(item, index) in (isLoading ? Array(4).fill(null) : STATISTIC_SUMMARY_ITEMS)"
            :key="item?.id || Math.random()" class="statistic-summary-item-container">
            <StatisticSummaryItem v-if="!isLoading && item" :label="LABELS[index]" :value="getValue(item, index)" />
            <StatisticSummaryItem v-else :isLoading="true" />
        </div>
    </div>
</template>

<script setup lang="ts">
import StatisticSummaryItem from './StatisticSummaryItem/index.vue';

defineProps<{
    isLoading?: boolean;
}>();

const LABELS = [
    "Total Play Time",
    "Average Bet Amount",
    "Win Rate",
    "Longest Win Streak"
];

const STATISTIC_SUMMARY_ITEMS = [
    {
        id: 1,
        total_play_time: "00:00 - 12:34",
        avarage_bet_amount: 32,
        win_rate: 32,
        longest_win_streak: 5,
        date: "2025-01-01"
    },
    {
        id: 2,
        total_play_time: "00:00 - 12:34",
        avarage_bet_amount: 12,
        win_rate: 5,
        longest_win_streak: 1,
        date: "2025-02-01"
    },
    {
        id: 3,
        total_play_time: "00:00 - 12:34",
        avarage_bet_amount: 64,
        win_rate: 50,
        longest_win_streak: 2,
        date: "2025-03-01"
    },
    {
        id: 4,
        total_play_time: "00:00 - 12:34",
        avarage_bet_amount: 11,
        win_rate: 3,
        longest_win_streak: 8,
        date: "2025-04-01"
    },
];

const formatPlayTime = (timeRange: string): string => {
    const [start, end] = timeRange.split(' - ');
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const diffMinutes = endTotalMinutes - startTotalMinutes;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
};

const getValue = (item: any, index: number): string => {
    switch (index) {
        case 0:
            return formatPlayTime(item.total_play_time);
        case 1:
            return String(item.avarage_bet_amount);
        case 2:
            return `${item.win_rate}%`;
        case 3:
            return String(item.longest_win_streak);
        default:
            return "";
    }
};
</script>

<style lang="scss" scoped>
.statistic-summary-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;

    &.fade-in {
        animation: fadeIn 2.5s ease-in-out;
    }

    .statistic-summary-item-container {
        width: 100%;
        height: 59px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
</style>