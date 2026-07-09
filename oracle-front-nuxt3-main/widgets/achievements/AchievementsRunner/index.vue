<template>
    <div class="achievements-runner-container">
        <div class="achievements-runner">
            <img v-if="!isLoading" :src="ACHIEVEMENTS_RUNNER_CHIP_ITEMS_IMAGES[ACHIEVEMENTS_RUNNER_CHIP_ITEMS[4].title]"
                alt="achievements-runner-bg" />
            <div v-else class="skeleton-image"></div>
        </div>
        <AchievementsRunnerChipItem :key="ACHIEVEMENTS_RUNNER_CHIP_ITEMS[0].id"
            :title="ACHIEVEMENTS_RUNNER_CHIP_ITEMS[0].title" :xp="ACHIEVEMENTS_RUNNER_CHIP_ITEMS[0].xp"
            :currentXp="ACHIEVEMENTS_RUNNER_CHIP_ITEMS[0].currentXp" :isLoading="isLoading" />
    </div>
</template>

<script setup lang="ts">
import AchievementsRunnerChipItem from './AchievementsRunnerChipItem/index.vue';

defineProps<{
    isLoading?: boolean;
}>();

const ACHIEVEMENTS_RUNNER_CHIP_ITEMS_IMAGES: Record<string, string> = {
    "Chip Runner": "/svg/Trophy-Icon.svg",
    "Pit Regular": "/svg/Trophy-Pit.svg",
    "High Roller": "/svg/Trophy-High.svg",
    "Table Legend": "/svg/Trophy-Legend.svg",
    "House Laureate": "/svg/Trophy-Laureate.svg",
}

const ACHIEVEMENTS_RUNNER_CHIP_ITEMS = [
    {
        id: 1,
        title: "Chip Runner",
        xp: 200,
        currentXp: 200,
    },
    {
        id: 2,
        title: "Pit Regular",
        xp: 0,
        currentXp: 100,
    },
    {
        id: 3,
        title: "High Roller",
        xp: 0,
        currentXp: 100,
    },
    {
        id: 4,
        title: "Table Legend",
        xp: 0,
        currentXp: 100,
    },
    {
        id: 5,
        title: "House Laureate",
        xp: 0,
        currentXp: 100,
    },
]
</script>

<style lang="scss" scoped>
.achievements-runner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 24px;
    width: 100%;
    max-width: 624px;
    min-width: 0;
    height: 440px;
    box-sizing: border-box;

    >* {
        width: 100%;
        max-width: 100%;
        min-width: 0;
    }

    .achievements-runner {
        height: 230px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        // box-sizing: border-box;

        img {
            animation: trophyAppear 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
                trophyFloat 3s ease-in-out 3s infinite;
            transform-origin: center center;
            max-width: 100%;
            height: auto;
        }

        .skeleton-image {
            width: 210px;
            height: 198px;
            background-color: #1B1A24;
            border-radius: 32px;
            animation: skeleton-loading 1.5s ease-in-out infinite;
        }
    }
}

@keyframes trophyAppear {
    0% {
        opacity: 0;
        transform: scale(0);
    }

    70% {
        opacity: 1;
        transform: scale(0.98);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes trophyFloat {

    0%,
    100% {
        transform: scale(1) translateY(0);
    }

    50% {
        transform: scale(1) translateY(-12px);
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
    .achievements-runner-container {
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 0;
    }
}
</style>