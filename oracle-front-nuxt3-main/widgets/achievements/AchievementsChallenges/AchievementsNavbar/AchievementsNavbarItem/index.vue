<template>
    <div class="achievements-navbar-item" :class="{ 'active': active }">
        {{ title }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    active: boolean;
}>();
</script>

<style lang="scss" scoped>
.achievements-navbar-item {
    margin: 0 auto;
    border-radius: 24px;
    padding: 8px 16px;
    background-color: #2C2A3D;
    font-size: 14px;
    font-weight: 500;
    line-height: 145%;
    letter-spacing: 0;
    font-family: Roboto, sans-serif;
    transition: all 0.3s ease;

    &.active {
        background-color: #FFFFFF;
        color: #000000;
        transition: all 0.3s ease;
    }

    &:hover:not(.active) {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }
}
</style>