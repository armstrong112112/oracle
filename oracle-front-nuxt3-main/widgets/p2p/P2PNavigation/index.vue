<template>
    <div class="p2p-navigation">
        <div v-for="item in NAVIGATION_ITEMS" :key="item.id" class="p2p-navigation-item" @click="emit('click', item.id)"
            :class="{ 'active': activeNavigationItem === item.id }">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    activeNavigationItem: number;
}>();
const emit = defineEmits<{
    (e: 'click', item: number): void;
}>();

const NAVIGATION_ITEMS = [
    {
        id: 1,
        name: "All",
    },
    {
        id: 2,
        name: "Sell",
    },
    {
        id: 3,
        name: "Buy",
    }
]
</script>

<style scoped>
.p2p-navigation {
    display: flex;
    flex-direction: row;
    gap: 4px;
    width: 100%;
    height: 28px;

    .p2p-navigation-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 16px;
        border-radius: 8px;
        width: 100%;
        gap: 10px;
        background-color: #1B1A24;
        transition: all 0.3s ease;
        font-weight: 500;
        font-size: 12px;

        &:hover {
            cursor: pointer;
            transition: all 0.3s ease;
            background-color: #2C2A3D;
        }

        &.active {
            background-color: #F64E2A;
            transition: all 0.3s ease;
        }
    }

}

@media (max-width: 1023px) {
    .p2p-navigation {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px;
        min-width: 375px;
        overflow-x: auto;
    }
}
</style>