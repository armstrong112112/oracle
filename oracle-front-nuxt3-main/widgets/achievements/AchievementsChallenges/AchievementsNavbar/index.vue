<template>
    <div class="achievements-navbar-container">
        <template v-if="!isLoading">
            <div v-for="item in NAVIGATION_ITEMS" :key="item.id" class="achievements-navbar-item-container-item">
                <AchievementsNavbarItem :title="item.title" :active="activeItem === item.id"
                    @click="handleClick(item)" />
            </div>
        </template>
        <template v-else>
            <div v-for="i in 5" :key="i" class="achievements-navbar-item-container-item">
                <div class="skeleton-block skeleton-nav-item"></div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AchievementsNavbarItem from './AchievementsNavbarItem/index.vue';

defineProps<{
    isLoading?: boolean;
}>();

const activeItem = ref<number>(1);

interface NavigationItem {
    id: number;
    title: string;
    active: boolean;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        id: 1,
        title: "All",
        active: true,
    },
    {
        id: 2,
        title: "Bets",
        active: false,
    },
    {
        id: 3,
        title: "Wins",
        active: false,
    },
    {
        id: 4,
        title: "Activity",
        active: false,
    },
    {
        id: 5,
        title: "Completed",
        active: false,
    },
]

const handleClick = (item: NavigationItem) => {
    activeItem.value = item.id;
}
</script>

<style lang="scss" scoped>
.achievements-navbar-container {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;

    .skeleton-block {
        background-color: #1B1A24;
        border-radius: 24px;
        height: 32px;
        width: 60px;
        animation: skeleton-loading 1.5s ease-in-out infinite;

        &.skeleton-nav-item {
            width: 60px;
            height: 32px;
        }
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

@media (max-width: 1023px) {
    .achievements-navbar-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        width: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .achievements-navbar-item-container-item {
            flex-shrink: 0;
        }
    }
}
</style>