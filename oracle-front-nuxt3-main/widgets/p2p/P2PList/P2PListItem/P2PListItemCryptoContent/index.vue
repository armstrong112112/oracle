<template>
    <div class="p2p-list-item-ctypto-content-container">
        <P2PListItemCryptoContentItem v-for="contentItem in contentItems" :key="contentItem.title"
            :title="contentItem.title" :value="contentItem.value" />
    </div>
</template>

<script setup lang="ts">
import type { ListItem } from "../../index.vue";
import P2PListItemCryptoContentItem from "./P2PListItemCryptoContentItem/index.vue";

const props = defineProps<{
    item: ListItem;
}>();

const contentItems = computed(() => {
    if (props.item.status === "Buy") {
        // Для Buy: Fiat to Send, Crypto to Receive, Account, Payment method, Order
        return [
            {
                title: "Fiat to Send",
                value: `${props.item.fiat_sent} ${props.item.fiat_sent_money_value}`
            },
            {
                title: "Crypto to Receive",
                value: `${props.item.crypto_received} ${props.item.crypto_received_money_value}`
            },
            ...(props.item.account ? [{
                title: "Account",
                value: props.item.account
            }] : []),
            ...(props.item.payment_method ? [{
                title: "Payment method",
                value: props.item.payment_method
            }] : []),
            {
                title: "Order",
                value: props.item.order
            }
        ];
    } else {
        // Для Sell: Amount to Receive, Fiat Ammount, Payment method, Order
        return [
            {
                title: "Amount to Receive",
                value: `${props.item.crypto_received} ${props.item.crypto_received_money_value}`
            },
            {
                title: "Fiat Ammount",
                value: `${props.item.fiat_sent} ${props.item.fiat_sent_money_value}`
            },
            ...(props.item.payment_method ? [{
                title: "Payment method",
                value: props.item.payment_method
            }] : []),
            {
                title: "Order",
                value: props.item.order
            }
        ];
    }
});
</script>

<style scoped>
.p2p-list-item-ctypto-content-container {
    display: flex;
    flex-direction: column;
    min-height: 90px;
    gap: 8px;
}
</style>