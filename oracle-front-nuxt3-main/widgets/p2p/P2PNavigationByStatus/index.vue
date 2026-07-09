<template>
    <div class="p2p-navigation-by-status">
        <div v-for="item in NAVIGATION_ITEMS_BY_STATUS" :key="item.id" class="p2p-navigation-by-status-item"
            :class="{ 'active': activeNavigationItemByStatus === item.id }" @click="emit('click', item.id)">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    activeNavigationItemByStatus: number;
}>();
const emit = defineEmits<{
    (e: 'click', item: number): void;
}>();

const NAVIGATION_ITEMS_BY_STATUS = [
    {
        id: 1,
        name: "All",
    },
    {
        id: 2,
        name: "New",
    },
    {
        id: 3,
        name: "Ongoing",
    },
    {
        id: 4,
        name: "Completed",
    },
    {
        id: 5,
        name: "Cancelled",
    },
]
</script>

<style scoped>
.p2p-navigation-by-status {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #2B2741;

    .p2p-navigation-by-status-item {
        display: flex;
        justify-content: center;
        height: 100%;
        gap: 8px;
        font-weight: 500;
        font-size: 14px;
        line-height: 145%;
        letter-spacing: 0;
        min-width: 40px;

        &:hover {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        &.active {
            color: #F64E2A;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #F64E2A;
            }
        }
    }
}

@media (max-width: 1023px) {
    .p2p-navigation-by-status {
        min-width: 375px;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }
}
</style>