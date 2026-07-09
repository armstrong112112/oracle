<template>
    <div>
        <P2PListItem v-for="item in filteredList" :key="item.id" :item="item" @accept="handleAccept(item.id)" />
    </div>
</template>

<script setup lang="ts">
import P2PListItem from "./P2PListItem/index.vue";

const props = defineProps<{
    activeNavigationItem: number;
    activeNavigationItemByStatus: number;
}>();

const LIST_ITEMS: ListItem[] = [
    {
        id: 1,
        status: "Buy",
        money_value: "USDT",
        order: "213213324234324324",
        order_status: "New",
        account: "USDT ***3213",
        payment_method: "Bank Transfer",
        status_text: "Waiting for Exchanger to confirm receipt",
        messages: [
            {
                id: 1,
                text: "Hello, how are you?",
                author: "John Doe",
            },
            {
                id: 2,
                text: "I'm fine, thank you!",
                author: "Jane Doe",
            },
        ],
        accept_within: "12:23",
        price: 1.01,
        price_money_value: "USDT",
        fiat_sent: 325,
        fiat_sent_money_value: "USD",
        crypto_received: 328,
        crypto_received_money_value: "USDT",
    },
    {
        id: 2,
        status: "Sell",
        money_value: "USDT",
        order: "213213324234324324",
        order_status: "Completed",
        payment_method: "Credit Card",
        messages: [
            {
                id: 1,
                text: "Hello, how are you?",
                author: "John Doe",
            }
        ],
        accept_within: "12:23",
        price: 1.01,
        price_money_value: "USDT",
        fiat_sent: 325,
        fiat_sent_money_value: "USD",
        crypto_received: 328,
        crypto_received_money_value: "USDT",
    },
    {
        id: 3,
        status: "Buy",
        money_value: "USDT",
        order: "213213324234324324",
        order_status: "Ongoing",
        account: "USDT ***3213",
        payment_method: "PayPal",
        status_text: "Awaiting your Payment",
        messages: [
            {
                id: 1,
                text: "Hello, how are you?",
                author: "John Doe",
            }
        ],
        accept_within: "12:23",
        price: 1.01,
        price_money_value: "USDT",
        fiat_sent: 325,
        fiat_sent_money_value: "USD",
        crypto_received: 328,
        crypto_received_money_value: "USDT",
    },
    {
        id: 4,
        status: "Sell",
        money_value: "USDT",
        order: "213213324234324324",
        order_status: "Cancelled",
        payment_method: "Bank Transfer",
        messages: [],
        accept_within: "12:23",
        price: 1.01,
        price_money_value: "USDT",
        fiat_sent: 325,
        fiat_sent_money_value: "USD",
        crypto_received: 328,
        crypto_received_money_value: "USDT",
    },
];

const list = ref<ListItem[]>(LIST_ITEMS);

const filteredList = computed(() => {
    let filtered = [...list.value];

    // Фильтр по типу (All/Sell/Buy)
    if (props.activeNavigationItem === 2) {
        // Sell
        filtered = filtered.filter(item => item.status === "Sell");
    } else if (props.activeNavigationItem === 3) {
        // Buy
        filtered = filtered.filter(item => item.status === "Buy");
    }
    // activeNavigationItem === 1 (All) - не фильтруем

    // Фильтр по статусу (All/New/Ongoing/Completed/Cancelled)
    if (props.activeNavigationItemByStatus === 2) {
        // New
        filtered = filtered.filter(item => item.order_status === "New");
    } else if (props.activeNavigationItemByStatus === 3) {
        // Ongoing
        filtered = filtered.filter(item => item.order_status === "Ongoing");
    } else if (props.activeNavigationItemByStatus === 4) {
        // Completed
        filtered = filtered.filter(item => item.order_status === "Completed");
    } else if (props.activeNavigationItemByStatus === 5) {
        // Cancelled
        filtered = filtered.filter(item => item.order_status === "Cancelled");
    }
    // activeNavigationItemByStatus === 1 (All) - не фильтруем

    return filtered;
});

type ListItemStatus = "Buy" | "Sell" | "All" | "New" | "Ongoing" | "Completed" | "Cancelled";
type ListItemMoneyValue = "USDT" | "BTC" | "ETH" | "USD";
export type OrderStatus = "New" | "Ongoing" | "Completed" | "Cancelled";

export type OrderStatusText =
    | "Waiting for Exchanger to confirm receipt"
    | "Awaiting your Payment"
    | "Dispute Opened"
    | "Exchanger delayed payment confirmation"
    | "You Haven't Confirmed Payment";

export interface ListItem {
    id: number;
    status: ListItemStatus;
    money_value: ListItemMoneyValue;
    order: string;
    account?: string;
    payment_method?: string;
    order_status: OrderStatus;
    status_text?: OrderStatusText;
    messages: {
        id: number;
        text: string;
        author: string;
    }[];
    accept_within: string;
    price: number;
    price_money_value: ListItemMoneyValue;
    fiat_sent: number;
    fiat_sent_money_value: ListItemMoneyValue;

    crypto_received: number,
    crypto_received_money_value: ListItemMoneyValue,
}



const handleAccept = (id: number) => {
    list.value = list.value.map(item => {
        if (item.id === id) {
            // Переключаем статус: new -> ongoing -> completed
            let newStatus: OrderStatus = "Ongoing";
            if (item.order_status === "New") {
                newStatus = "Ongoing";
            } else if (item.order_status === "Ongoing") {
                newStatus = "Completed";
            }
            return { ...item, order_status: newStatus };
        }
        return item;
    });
}
</script>

<style scoped></style>