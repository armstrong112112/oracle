<template>
    <div class="game-history-item" :style="{ '--active-index': activeIndex }">
        <div class="game-history-item-slider"></div>
        <div v-for="item in GAME_HISTORY_ITEM" :key="item.id" class="game-history-item-wrapper">
            <div :class="{ active: activeItem === item.id }" class="game-history-item-content"
                @click="handleClick(item.id)">
                <img :src="item.icon" alt="icon" />
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeItem = ref<number>(1);
const handleClick = (id: number) => {
    activeItem.value = id;
};

const GAME_HISTORY_ITEM = [
    {
        id: 1,
        name: "All Games",
        icon: "/svg/shop/icons/All-games.svg",
    },
    {
        id: 2,
        name: "Top Games",
        icon: "/svg/shop/icons/Group.svg",
    },
    {
        id: 3,
        name: "Poker",
        icon: "/svg/shop/icons/Poker.svg",
    },
    {
        id: 4,
        name: "Slots",
        icon: "/svg/shop/icons/Slots.svg",
    },
    {
        id: 5,
        name: "Roulette",
        icon: "/svg/shop/icons/roulette-casino-svgrepo-com.svg",
    },
    {
        id: 6,
        name: "Cube",
        icon: "/svg/shop/icons/Cube.svg",
    },
];

const activeIndex = computed(() => {
    return GAME_HISTORY_ITEM.findIndex(item => item.id === activeItem.value);
});
</script>

<style lang="scss" scoped>
.game-history-item {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 44px;
    position: relative;
    gap: 8px;
    box-sizing: border-box;
    overflow: hidden;

    .game-history-item-slider {
        position: absolute;
        width: calc((100% - 40px) / 6);
        height: 100%;
        background-color: #1B1A24;
        border-radius: 14px;
        transition: left 0.3s ease;
        left: calc(var(--active-index) * ((100% - 40px) / 6) + var(--active-index) * 8px);
        top: 0;
        z-index: 0;
    }

    .game-history-item-wrapper {
        position: relative;
        z-index: 1;
        flex: 1;
        height: 100%;

        .game-history-item-content {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Roboto, sans-serif;
            font-weight: 500;
            font-size: 15px;
            position: relative;
            z-index: 1;
            color: #a09fc5;
            transition: color 0.3s ease;
            padding: 8px 8px;
            gap: 2px;
            height: 100%;
            box-sizing: border-box;

            :last-child {
                padding: 5px;
            }

            &:hover {
                cursor: pointer;
            }

            &.active {
                color: white;
            }
        }
    }


}
</style>