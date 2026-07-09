<template>
    <div class="achievements-challenges-item" :class="{
        'achievements-challenges-item--completed': !isLoading && isCompletedWithDelay,
        'skeleton': isLoading
    }" :style="!isLoading ? { '--progress': `${progressPercent}%` } : {}">
        <div v-if="!isLoading" class="achievements-challenges-item-title">
            {{ title }}
        </div>
        <div v-else class="skeleton-block skeleton-title"></div>

        <div class="achievements-challenges-item-experience">
            <template v-if="!isLoading">
                <div v-if="progressPercent < 100" class="achievements-challenges-item-experience-container">
                    <div class="achievements-challenges-item-experience-value">{{ experience }}PX</div>

                    <div class="achievements-challenges-item-completed-container">
                        <span class="achievements-challenges-item-completed">{{ completed }}</span>/<span
                            class="achievements-challenges-item-completed-from">{{ from }}</span>
                    </div>
                </div>

                <div v-else class="achievements-challenges-item-completed-container-completed">
                    <DoneIcon class="completed-icon" />
                    Completed {{ experience }}PX
                </div>
            </template>
            <div v-else class="achievements-challenges-item-experience-container">
                <div class="skeleton-block skeleton-xp"></div>
                <div class="skeleton-block skeleton-progress-text"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
// @ts-ignore
import DoneIcon from '@/assets/svg/Done.svg?component';

const props = defineProps<{
    title?: string;
    experience?: number;
    completed?: number;
    from?: number;
    isLoading?: boolean;
}>();

const progressPercent = computed(() => {
    if (props.isLoading || !props.completed || !props.from) return 0;
    return Math.min((props.completed / props.from) * 100, 100);
});

const completedTimestamp = ref<number | null>(null);
const isCompletedWithDelay = ref(false);

watch([progressPercent, () => props.isLoading], ([percent, loading]) => {
    if (loading) {
        completedTimestamp.value = null;
        isCompletedWithDelay.value = false;
        return;
    }

    if (percent === 100 && !completedTimestamp.value) {
        completedTimestamp.value = Date.now();
        setTimeout(() => {
            isCompletedWithDelay.value = true;
        }, 1000);
    } else if (percent < 100) {
        completedTimestamp.value = null;
        isCompletedWithDelay.value = false;
    }
}, { immediate: true });

</script>

<style lang="scss" scoped>
.achievements-challenges-item {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 12px 16px;
    gap: 12px;
    font-family: Roboto, sans-serif;
    background-color: #14131B;
    overflow: hidden;
    min-height: 80px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: var(--progress);
        height: 100%;
        background-color: #2C2A3D;
        z-index: 0;
        transform-origin: left;
        animation: progressBarExpandChallenges 1s ease-out forwards;
    }

    &--completed {
        animation: completedAppear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        background-color: #0AAD04;
        box-shadow: 0 0 20px rgba(10, 173, 4, 0.4);

        &::before {
            background-color: #0AAD04;
            animation: completedAppearBefore 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
    }

    >* {
        position: relative;
        z-index: 1;
    }

    .achievements-challenges-item-title {
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        line-height: 145%;
        letter-spacing: 0;
    }

    .achievements-challenges-item-experience {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .achievements-challenges-item-experience-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        .achievements-challenges-item-experience-value {
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));
        }

        .achievements-challenges-item-completed-container-completed {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            font-size: 14px;

            .completed-icon {
                width: 16px;
                height: 16px;
                flex-shrink: 0;
            }
        }

        .achievements-challenges-item-completed-container {
            font-size: 16px;
            font-weight: 500;
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));

            .achievements-challenges-item-completed-from {
                color: #BFB7FF;
            }
        }

    }

    &.skeleton {
        background-color: #1B1A24;
        animation: skeleton-loading 1.5s ease-in-out infinite;

        &::before {
            display: none;
        }
    }

    .skeleton-block {
        background-color: #1B1A24;
        border-radius: 4px;
        animation: skeleton-loading 1.5s ease-in-out infinite;

        &.skeleton-title {
            width: 80%;
            height: 14px;
        }

        &.skeleton-xp {
            width: 50px;
            height: 16px;
        }

        &.skeleton-progress-text {
            width: 60px;
            height: 16px;
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

@keyframes progressBarExpandChallenges {
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(1);
    }
}

@keyframes completedAppear {
    0% {
        background-color: #14131B;
        opacity: 0.8;
        transform: scale(0.98);
        box-shadow: 0 0 0 rgba(10, 173, 4, 0);
    }

    50% {
        transform: scale(1.02);
    }

    100% {
        background-color: #0AAD04;
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 0 20px rgba(10, 173, 4, 0.4);
    }
}

@keyframes completedAppearBefore {
    0% {
        background-color: #2C2A3D;
        opacity: 0.8;
    }

    100% {
        background-color: #0AAD04;
        opacity: 1;
    }
}

@media (max-width: 1023px) {
    .achievements-challenges-item {
        height: 112px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
</style>