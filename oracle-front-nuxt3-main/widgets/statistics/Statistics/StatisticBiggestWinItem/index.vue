<template>
    <div class="statistic-biggest-win-item" :class="{ 'skeleton': isLoading }">
        <div v-if="!isLoading" class="statistic-biggest-win-item-content">
            <div class="statistic-biggest-win-item-content-title">Biggest Win</div>
            <div class="statistic-biggest-win-item-content-value">$ 3 832</div>
        </div>

        <div v-if="!isLoading" class="statistic-biggest-win-item-game">
            <img src="/svg/shop/icons/Tropy-Star.svg" alt="tropy-star" class="tropy-star-icon" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isLoading?: boolean;
}>();
</script>

<style lang="scss" scoped>
.statistic-biggest-win-item {
    border-radius: 24px;
    padding: 12px 16px 0px 16px;
    background-color: #14131B;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .statistic-biggest-win-item-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        .statistic-biggest-win-item-content-title {
            font-weight: 400;
            font-family: Roboto, sans-serif;
            font-size: 16px;
            line-height: 150%;
            letter-spacing: 0;
            color: #BFB7FF;
        }

        .statistic-biggest-win-item-content-value {
            font-weight: 400;
            font-family: Roboto, sans-serif;
            font-size: 20px;
            line-height: 145%;
            letter-spacing: 0;
        }
    }

    .statistic-biggest-win-item-game {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        overflow: hidden;
        background-image: url('/svg/shop/icons/Ellipse.svg');
        background-repeat: no-repeat;
        background-position: center bottom;

        .tropy-star-icon {
            position: relative;
            z-index: 1;
            animation: slideUpFadeIn 1.5s ease-out;
        }
    }

    &.skeleton {
        background-color: #14131B;
        animation: skeleton-loading 1.5s ease-in-out infinite;
        width: 100%;
        height: 100%;
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

@keyframes slideUpFadeIn {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>