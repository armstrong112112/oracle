<template>
    <div class="statistic-small-item" :class="{ 'skeleton': isLoading }">
        <div v-if="!isLoading" class="statistic-small-item-title">
            {{ title }}
        </div>

        <div v-if="!isLoading" class="statistic-small-item-value">
            {{ value }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string;
    value?: string;
    isLoading?: boolean;
}>()
</script>

<style lang="scss" scoped>
.statistic-small-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #14131B;
    padding: 12px 16px;
    border-radius: 20px;
    gap: 4px;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    line-height: 145%;
    letter-spacing: 0;

    .statistic-small-item-title {
        color: #BFB7FF;
        font-size: 14px;
    }

    .statistic-small-item-value {
        font-size: 18px;
    }

    &.skeleton {
        background-color: #14131B;
        animation: skeleton-loading 1.5s ease-in-out infinite;
        width: 100%;
        height: 100%;
        min-height: 100%;
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