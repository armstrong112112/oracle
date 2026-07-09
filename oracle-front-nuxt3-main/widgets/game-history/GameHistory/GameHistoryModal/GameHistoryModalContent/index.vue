<template>
    <div class="game-history-modal-list">
        <div v-for="item in list" :key="item.id">
            <div class="game-history-modal-list-item" @click="handleClick(item.id)">
                <div>#{{ item.id }}</div>
                <div :class="item.money > 0 ? 'positive-money' : 'negative-money'">
                    {{ item.money }} {{ item.money_value }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    list: {
        id: number;
        money: number;
        money_value: string;
    }[];
}>()

const emit = defineEmits<{
    'select-round': [round: number];
}>()

const handleClick = (roundId: number) => {
    emit('select-round', roundId);
}
</script>

<style lang="scss" scoped>
.game-history-modal-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 440px;

    .game-history-modal-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 44px;
        border-bottom: 1px solid #2B2741;
        padding: 9px;
        gap: 10px;
        line-height: 145%;
        font-weight: 400;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s ease;

        .positive-money {
            color: #31F62A;
        }

        .negative-money {
            color: #F64E2A;
        }

        &:hover {
            background: #2b2741;
        }
    }
}
</style>