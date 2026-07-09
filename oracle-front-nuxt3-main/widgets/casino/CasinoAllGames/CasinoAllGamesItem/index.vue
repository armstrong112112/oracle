<template>
    <div class="casino-all-games-item">
        <div class="casino-all-games-item-icon"></div>
        <div class="casino-all-games-item-title">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    icon: string;
}>();
</script>

<style lang="scss" scoped>
.casino-all-games-item {
    width: 185.5px;
    height: 242px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .casino-all-games-item-icon {
        background-color: #1B1A24;
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }

    .casino-all-games-item-title {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: 0;
    }
}

@media (max-width: 1023px) {
    .casino-all-games-item {
        width: 179px;
        height: 206px;
    }
}
</style>