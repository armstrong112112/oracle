<template>
    <div class="p2p-list-item-crypto-content-container">
        <div class="p2p-list-item-title">
            {{ title }}
        </div>
        <div class="p2p-list-item-value">
            {{ value }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    value: string;
}>()
</script>

<style scoped>
.p2p-list-item-crypto-content-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 16px;
    font-weight: 400;
    font-size: 12px;
    line-height: 145%;
    letter-spacing: 0;

    .p2p-list-item-title {
        color: #BFB7FF;
    }
}
</style>