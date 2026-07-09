<template>
    <div class="statistic-game-item" :class="{ 'skeleton': isLoading }">
        <img v-if="!isLoading" class="statistic-game-item-icon" :src="icon" alt="game-icon" />

        <div v-if="!isLoading" class="statistic-game-item-content">
            <div>{{ content_label }}</div>
            <div>{{ content_value }} times</div>
        </div>

        <div v-if="!isLoading" class="statistic-game-item-money">
            {{ money !== undefined ? getMoneyValue(money) : '' }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    icon?: string;
    content_label?: string;
    content_value?: number;
    money?: number;
    isLoading?: boolean;
}>();

const getMoneyValue = (money: number) => {
    if (money >= 0) {
        return `+ $${money}`;
    }
    return `- $${Math.abs(money)}`;
}
</script>

<style lang="scss" scoped>
.statistic-game-item {
    width: 100%;
    height: 115px;
    background-color: #14131B;
    border-radius: 12px;
    padding: 12px;
    gap: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    font-family: Roboto, sans-serif;

    .statistic-game-item-icon {
        width: 20px;
        height: 20px;
    }

    .statistic-game-item-content {
        font-size: 12px;
        font-weight: 500;
        line-height: 145%;
        letter-spacing: 0;

        :last-child {
            color: #8780CF;
            font-weight: 400;
        }
    }

    .statistic-game-item-money {
        font-size: 12px;
        font-weight: 500;
        line-height: 145%;
        letter-spacing: 0;
    }

    &.skeleton {
        background-color: #14131B;
        animation: skeleton-loading 1.5s ease-in-out infinite;
        width: 100%;
        height: 115px;
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

@media (max-width: 640px) {
    .statistic-game-item {
        width: 105px;

        &.skeleton {
            width: 105px;
        }
    }
}
</style>