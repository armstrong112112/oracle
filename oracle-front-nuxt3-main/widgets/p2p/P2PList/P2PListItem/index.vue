<template>
    <div class="p2p-list-item">
        <div v-if="getStatusText" class="p2p-list-item-accept-within-container">
            <div class="p2p-list-item-accept-within-container-title">
                {{ getStatusText.status }}<span class="p2p-list-item-accept-within-container-title-time"> {{
                    getStatusText.time }}</span>
            </div>
        </div>

        <div class="p2p-list-item-content-container">

            <div class="p2p-list-item-status-container">
                <div class="p2p-list-item-status-container-title"><span
                        class="p2p-list-item-status-container-status-type">{{ item.status }}</span> {{
                            item.money_value }}</div>
                <div v-if="item.order_status === 'Completed'" class="p2p-list-item-status-container-status">Completed
                </div>
                <div v-else-if="item.order_status === 'Cancelled'" class="p2p-list-item-status-container-status"
                    :class="{ 'cancelled': item.order_status === 'Cancelled' }">
                    Cancelled</div>
            </div>

            <P2PListItemCryptoContent :item="item" />
        </div>


        <div class="p2p-list-item-message-container">
            <div class="p2p-list-item-message-container-icon">
                <img src="/svg/message.svg" alt="message" />
                <div class="p2p-list-item-message-count">{{ item.messages.length }}</div>
            </div>
            <Button class="p2p-list-item-message-container-button" @click="handleAccept">Accept</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ListItem } from "../index.vue";
import P2PListItemCryptoContent from "./P2PListItemCryptoContent/index.vue";

const props = defineProps<{
    item: ListItem;
}>();

const emit = defineEmits<{
    (e: 'accept', id: number): void;
}>();

const handleAccept = () => {
    emit('accept', props.item.id);
};

const getStatusText = computed(() => {
    if (props.item.order_status === "Completed" || props.item.order_status === "Cancelled") {
        return null; // Не показываем статус для завершенных/отмененных
    }

    if (props.item.status_text) {
        return {
            status: props.item.status_text,
            time: props.item.accept_within
        };
    }

    return null;
});
</script>

<style scoped>
.p2p-list-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 234px;
    border-bottom: 1px solid #2B2741;
    padding: 16px 16px 12px 16px;
    gap: 12px;
    font-family: Roboto, sans-serif;
    min-height: 234px;

    .p2p-list-item-accept-within-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: 400;
        font-size: 14px;
        line-height: 145%;
        letter-spacing: 0;
        width: 100%;
        gap: 8px;

        .p2p-list-item-accept-within-container-title-time {
            font-weight: 400;
            color: #F64E2A;
        }
    }

    .p2p-list-item-content-container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .p2p-list-item-status-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 400;
            font-size: 16px;
            line-height: 145%;
            letter-spacing: 0;

            .p2p-list-item-status-container-title {
                .p2p-list-item-status-container-status-type {
                    color: #F64E2A;
                }
            }

            .p2p-list-item-status-container-status {
                font-weight: 600;
                font-size: 12px;
                line-height: 145%;
                letter-spacing: 0;
                color: #31F62A;

                &.cancelled {
                    color: #F64E2A;
                }
            }
        }

    }

    .p2p-list-item-message-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 32px;
        width: 100%;

        .p2p-list-item-message-container-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 32px;
            height: 32px;
            padding: 8px 18px;
            border-radius: 20px;
            transform: translateY(0);
            transition: transform 0.1s ease;

            &:hover {
                cursor: pointer;
                animation: bounceJump 0.6s ease;
                animation-iteration-count: 1;
            }

            .p2p-list-item-message-count {
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                width: 13px;
                height: 17px;
                background-color: #F64E2A;
                border-radius: 8px;
                padding: 1px 4px;
                gap: 10px;
                font-weight: 500;
                font-size: 10px;
                line-height: 145%;
                letter-spacing: 0;
            }

        }

        .p2p-list-item-message-container-button {
            min-height: 31px;
            border-radius: 12px;
            padding: 7px 10px;
            background-color: #F64E2A;
            font-size: 12px;
            font-weight: 500;
            line-height: 145%;
            letter-spacing: 0;
            transition: all 0.3s ease;

            &:hover {
                cursor: pointer;
                transition: all 0.3s ease;
                background-color: #e24121;
            }
        }
    }
}






@keyframes bounceJump {
    0% {
        transform: translateY(0);
    }

    25% {
        transform: translateY(-3px);
    }

    50% {
        transform: translateY(0);
    }

    75% {
        transform: translateY(-2px);
    }

    100% {
        transform: translateY(0);
    }
}
</style>