<template>
    <div class="game-history-navbar-container">
        <div class="game-history-navbar" :style="{ '--active-index': activeIndex }">
            <div class="game-history-navbar-slider"></div>
            <div v-for="item in GAME_HISTORY_NAVBAR_ITEMS" :key="item.id" class="game-history-navbar-item-wrapper">
                <div :class="{ active: activeItem === item.id }" class="game-history-navbar-item"
                    @click="handleClick(item.id)">{{ item.name }}</div>
            </div>

        </div>
        <div class="game-history-navbar-calendar">
            <CalendarOracle @close="onCalendarClose" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CalendarOracle from '~/components/calendar-oracle.vue';

const activeItem = ref<number>(1);
const handleClick = (id: number) => {
    activeItem.value = id;
};
const GAME_HISTORY_NAVBAR_ITEMS = [
    { id: 1, name: "All" },
    { id: 2, name: "Offline" },
    { id: 3, name: "Live Games" },
];

const activeIndex = computed(() => {
    return GAME_HISTORY_NAVBAR_ITEMS.findIndex(item => item.id === activeItem.value);
});

const onCalendarClose = () => {
    console.log('Calendar closed');
};
</script>

<style lang="scss" scoped>
.game-history-navbar-container {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.game-history-navbar-calendar {
    position: relative;

    :deep(.calendar-container) {
        .calendar-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
}

.game-history-navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background-color: #14131B;
    width: 500px;
    height: 44px;
    font-size: 14px;
    font-style: Roboto, sans-serif;
    font-weight: 400;
    position: relative;
    padding: 4px;
}

.game-history-navbar-slider {
    position: absolute;
    width: 164px;
    height: 36px;
    background-color: #f64e2a;
    border-radius: 12px;
    transition: transform 0.3s ease;
    transform: translateX(calc(var(--active-index) * 164px));
    top: 4px;
    left: 4px;
    z-index: 0;
}

.game-history-navbar-item-wrapper {
    position: relative;
    z-index: 1;
}

.game-history-navbar-item {
    width: 164px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;

    &:hover {
        cursor: pointer;
    }

    &.active {
        color: white;
    }
}
</style>