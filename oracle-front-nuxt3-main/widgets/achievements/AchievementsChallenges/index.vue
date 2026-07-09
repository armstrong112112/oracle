<template>
    <div class="achievements-challenges-container">
        <div class="achievements-challenges-header">
            <div v-if="!isLoading" class="achievements-challenges-title">Challenges</div>
            <div v-else class="skeleton-block skeleton-title"></div>
            <AchievementsNavbar :isLoading="isLoading" />
        </div>
        <div class="achievements-challenges-item-container">
            <div v-for="item in (isLoading ? Array(5).fill(null) : ACHIEVEMENTS_CHALLENGES_ITEMS)"
                :key="item?.id || Math.random()" class="achievements-challenges-item-wrapper">
                <AchievementsChallengesItem v-if="!isLoading && item" :title="item.title" :experience="item.experience"
                    :completed="item.completed" :from="item.from" />
                <AchievementsChallengesItem v-else :isLoading="true" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AchievementsChallengesItem from './AchievementsChallengesItem/index.vue';
import AchievementsNavbar from './AchievementsNavbar/index.vue';

defineProps<{
    isLoading?: boolean;
}>();

const ACHIEVEMENTS_CHALLENGES_ITEMS = [
    {
        id: 0,
        title: "Place 10 qualifying bets of $5 or more within regular gameplay.",
        experience: 100,
        completed: 10,
        from: 10,
    },
    {
        id: 1,
        title: "Place 10 qualifying bets of $5 or more within regular gameplay.",
        experience: 100,
        completed: 8,
        from: 10,
    },
    {
        id: 2,
        title: "Complete 5 sessions where your average bet size remains at or above $10",
        experience: 50,
        completed: 2,
        from: 5,
    },
    {
        id: 3,
        title: "Complete 5 sessions where your average bet size remains at or above $10",
        experience: 50,
        completed: 2,
        from: 5,
    },
    {
        id: 4,
        title: "Score a standout win of at least $500 in one round or spin.",
        experience: 150,
        completed: 0,
        from: 1,
    },
]
</script>

<style lang="scss" scoped>
.achievements-challenges-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 624px;
    min-width: 0;
    box-sizing: border-box;

    .achievements-challenges-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .achievements-challenges-title {
        font-family: Roboto, sans-serif;
        font-weight: 700;
        font-size: 24px;
        font-style: bold;
        line-height: 140%;
    }

    .skeleton-block {
        background-color: #1B1A24;
        border-radius: 4px;
        animation: skeleton-loading 1.5s ease-in-out infinite;

        &.skeleton-title {
            width: 120px;
            height: 24px;
            border-radius: 24px;
        }
    }

    .achievements-challenges-item-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .achievements-challenges-item-wrapper {
        width: 100%;
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
    .achievements-challenges-container {
        width: 100%;
        max-width: 100%;
    }
}
</style>