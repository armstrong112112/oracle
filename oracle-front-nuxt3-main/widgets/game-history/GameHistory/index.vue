<template>
    <div class="game-history-item-container">
        <div v-for="[date, items] in groupedItems" :key="date" class="game-history-date-group">
            <div class="game-history-date-header">{{ formatDate(date) }}</div>
            <div v-for="item in items" :key="item.id" class="game-history-item-wrapper">
                <GameHistoryItem :item="item" @click="handleClick(item)" />
            </div>
        </div>

        <div v-if="showModal" class="game-history-modal">
            <GameHistoryModal :handleCloseModal="handleCloseModal" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import GameHistoryItem from './GameHistoryItem/index.vue';
import type { GameHistoryItemProps } from './GameHistoryItem/index.vue';
import GameHistoryModal from './GameHistoryModal/index.vue';

const showModal = ref(false);
const clickedItem = ref<{
    rounds: number;
    list: {
        id: number;
        money: number;
        money_value: string;
    }[];
} | null>(null);

const GAME_HISTORY_ITEM: GameHistoryItemProps[] = [
    {
        id: 1,
        name: "Game name",
        img: "",
        status: "Offline",
        players: 0,
        money: 321,
        money_value: "USDT",
        game_time_start: "12:32",
        game_time_end: "12:53",
        rounds: 10,
        date: "2025-03-20"
    },
    {
        id: 2,
        name: "Game name",
        img: "",
        status: "Offline",
        players: 12,
        money: -123,
        money_value: "USDT",
        game_time_start: "12:21",
        game_time_end: "12:56",
        rounds: 10,
        date: "2025-03-20"
    },
    {
        id: 3,
        name: "Game name",
        img: "",
        status: "Online",
        players: 0,
        money: 32,
        money_value: "USDT",
        game_time_start: "11:32",
        game_time_end: "12:53",
        rounds: 10,
        date: "2025-03-20"
    },
    {
        id: 4,
        name: "Game name",
        img: "",
        status: "Offline",
        players: 0,
        money: -103,
        money_value: "USDT",
        game_time_start: "12:01",
        game_time_end: "14:08",
        rounds: 10,
        date: "2025-04-20"
    },
    {
        id: 5,
        name: "Game name",
        img: "",
        status: "Offline",
        players: 0,
        money: 321,
        money_value: "USDT",
        game_time_start: "12:32",
        game_time_end: "12:53",
        rounds: 10,
        date: "2025-04-20"
    },
    {
        id: 6,
        name: "Game name",
        img: "",
        status: "Offline",
        players: 3,
        money: 321,
        money_value: "USDT",
        game_time_start: "12:32",
        game_time_end: "12:53",
        rounds: 10,
        date: "2025-04-20"
    },
];

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
};

const groupedItems = computed(() => {
    const groups = new Map<string, GameHistoryItemProps[]>();

    GAME_HISTORY_ITEM.forEach(item => {
        const date = item.date;
        if (!groups.has(date)) {
            groups.set(date, []);
        }
        groups.get(date)!.push(item);
    });

    const sortedDates = Array.from(groups.keys()).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });

    return sortedDates.map(date => [date, groups.get(date)!] as [string, GameHistoryItemProps[]]);
});

const handleClick = (item: GameHistoryItemProps) => {
    // clickedItem.value = {
    //     rounds: item.rounds,
    //     list: {
    //         id: item.id,
    //         money: item.money,
    //         money_value: item.money_value,
    //     }
    // };
    showModal.value = true;
};

const handleCloseModal = () => {
    showModal.value = false;
};
</script>

<style lang="scss" scoped>
.game-history-item-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-family: Roboto, sans-serif;
    overflow-y: auto;

    .game-history-date-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .game-history-date-header {
        font-size: 14px;
        font-weight: 600;
        font-family: Roboto, sans-serif;
        color: #BFB7FF;
        line-height: 145%;
        padding: 0 8px;
    }

    .game-history-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #00000099;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 600px) {
            align-items: flex-end;
        }

        .game-history-modal-content {
            width: 100%;
            height: 100%;
            background-color: #14131b;
            border-radius: 20px;
        }

        .game-history-modal-content-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;

            .game-history-modal-content-header-title {
                font-size: 18px;
                font-weight: 500;
                font-family: Roboto, sans-serif;
                color: #fff;
            }
        }
    }

}
</style>