<template>
    <div class="p2p-footer-nav-bar">
        <div v-for="item in FOOTER_NAV_BAR_ITEMS" :key="item.id" class="p2p-footer-nav-bar-item"
            @click="handleClick(item.id)" :class="{ 'active': activeItem === item.id }" :to="item.path">
            <img :src="item.icon" alt="icon" />
            <div class="p2p-footer-nav-bar-item-name">{{ item.name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const activeItem = ref(2);
const handleClick = (item: number) => {
    activeItem.value = item;
}
const FOOTER_NAV_BAR_ITEMS = [
    {
        id: 1,
        name: "P2P",
        icon: "/svg/transfer.svg",
        path: "/p2p",
    },
    {
        id: 2,
        name: "Orders",
        icon: "/svg/time-quarter-past.svg",
        path: "/p2p/orders",
    },
    {
        id: 3,
        name: "Listing",
        icon: "/svg/layers.svg",
        path: "/p2p/listing",
    },
    {
        id: 4,
        name: "Chat",
        icon: "/svg/chat.svg",
        path: "/p2p/chat",
    },
]
</script>

<style scoped>
.p2p-footer-nav-bar {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    min-height: 71px;
    background-color: #14131B;
    border-top: 1px solid #2B2741;
    padding: 8px 16px 16px;
    font-family: Roboto, sans-serif;

    .p2p-footer-nav-bar-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        max-width: 88.36px;
        width: 100%;
        transition: all 0.3s ease;

        &:hover {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        &.active {
            color: #FFFFFF;

            .p2p-footer-nav-bar-item-name {
                color: #FFFFFF;
            }
        }

        >div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            padding: 2px;
        }

        .p2p-footer-nav-bar-item-name {
            color: #8780CF;
            font-size: 12px;
            font-weight: 400;
            line-height: 145%;
            letter-spacing: 0;

        }

    }
}

@media (min-width: 600px) {
    .p2p-footer-nav-bar {
        display: none;
    }
}
</style>