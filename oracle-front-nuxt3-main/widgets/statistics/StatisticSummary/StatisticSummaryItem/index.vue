<template>
    <div class="statistic-summary-item" :class="{ 'skeleton': isLoading }">
        <div v-if="!isLoading" class="statistic-summary-item-value">{{ label == "Average Bet Amount" ? '$ ' + value :
            value }}</div>
        <div v-if="!isLoading" class="statistic-summary-item-label">{{ label }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    value?: string;
    label?: string;
    isLoading?: boolean;
}>();
</script>

<style lang="scss" scoped>
.statistic-summary-item {
    width: 100%;
    height: 59px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 16px;
    padding: 8px 12px;
    background-color: #14131B;
    font-weight: 400;
    line-height: 145%;
    letter-spacing: 0;
    font-family: Roboto, sans-serif;


    .statistic-summary-item-value {
        font-size: 18px;
    }

    .statistic-summary-item-label {
        font-size: 12px;
        color: #8780CF;
    }

    &.skeleton {
        background-color: #14131B;
        animation: skeleton-loading 1.5s ease-in-out infinite;
        width: 100%;
        height: 59px;
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
</style>