<template>
    <div class="achievements-runner-chip-item" :class="{ 'skeleton': isLoading }">
        <div class="achievements-runner-chip-item-content">
            <div v-if="!isLoading" class="achievements-runner-chip-item-content-title">{{ title }}</div>
            <div v-else class="skeleton-block skeleton-title"></div>
            <div v-if="!isLoading" class="achievements-runner-chip-item-content-xp">{{ xp }}PX</div>
            <div v-else class="skeleton-block skeleton-xp"></div>
        </div>

        <div class="achievements-runner-chip-item-xp-container">
            <div v-if="!isLoading" class="achievements-runner-chip-item-xp">
                {{ currentXp }}<span> more XP to Next LVL</span>
            </div>
            <div v-else class="skeleton-block skeleton-xp-text"></div>

            <div class="achievements-runner-chip-item-progress-bar" :class="{ 'skeleton': isLoading }"
                :style="!isLoading ? { '--progress': `${progressPercent}%` } : {}">
                <div v-if="!isLoading" class="achievements-runner-chip-item-progress-bar-fill"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title?: string;
    xp?: number;
    currentXp?: number;
    isLoading?: boolean;
}>();

const progressPercent = computed(() => {
    if (props.isLoading || !props.xp) return 0;
    if (props.xp === 0) return 0;
    const currentXp = props.currentXp || 0;
    return Math.min((currentXp / props.xp) * 100, 100);
});
</script>

<style lang="scss" scoped>
.achievements-runner-chip-item {
    position: relative;
    background-color: #14131B;
    width: 100%;
    max-width: 500px;
    min-width: 0;
    border-radius: 24px;
    padding: 16px 20px;
    background-clip: padding-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    box-sizing: border-box;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 24px;
        padding: 1px;
        background: linear-gradient(180deg, #504B74 0%, #2C2A3D 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        pointer-events: none;
    }

    .achievements-runner-chip-item-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        line-height: 150%;

        .achievements-runner-chip-item-content-title {
            font-style: medium;
        }
    }

    .achievements-runner-chip-item-xp-container {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .achievements-runner-chip-item-xp {


            >span {
                color: #BFB7FF;
                font-size: 14px;
                font-weight: 400;
                font-family: Roboto, sans-serif;
                line-height: 145%;
                letter-spacing: 0;
            }
        }

        .achievements-runner-chip-item-progress-bar {
            position: relative;
            width: 100%;
            height: 8px;
            background-color: #2C2A3D;
            border-radius: 12px;
            overflow: hidden;

            &.skeleton {
                background-color: #1B1A24;
                animation: skeleton-loading 1.5s ease-in-out infinite;
            }

            .achievements-runner-chip-item-progress-bar-fill {
                position: absolute;
                top: 0;
                left: 0;
                width: 24px;
                height: 8px;
                background-color: #FFFFFF;
                border-radius: 12px;
                animation: progressBarExpand 1s ease-out forwards;
            }

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: var(--progress);
                height: 8px;
                background-color: #FFFFFF;
                border-radius: 12px;
                z-index: 1;
                transform-origin: left;
                animation: progressBarExpandRunnerBefore 1s ease-out forwards;
            }

            &.skeleton::before {
                display: none;
            }
        }

    }

    &.skeleton {
        background-color: #1B1A24;
        animation: skeleton-loading 1.5s ease-in-out infinite;

        &::before {
            background: transparent;
        }
    }

    .skeleton-block {
        background-color: #1B1A24;
        border-radius: 4px;
        animation: skeleton-loading 1.5s ease-in-out infinite;

        &.skeleton-title {
            width: 60%;
            height: 16px;
        }

        &.skeleton-xp {
            width: 50px;
            height: 16px;
        }

        &.skeleton-xp-text {
            width: 40%;
            height: 14px;
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

@keyframes progressBarExpand {
    0% {
        width: 0;
    }

    100% {
        width: 24px;
    }
}

@keyframes progressBarExpandBefore {
    0% {
        left: 0;
        width: 0;
    }

    100% {
        left: 12px;
        width: 12px;
    }
}

@keyframes progressBarExpandRunnerBefore {
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(1);
    }
}

@media (max-width: 1023px) {
    .achievements-runner-chip-item {
        width: 100%;
        max-width: 100%;
    }
}
</style>