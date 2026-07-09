<template>
    <div class="game-history-modal-content-by-rounds-list">
        <div class="game-history-modal-content-by-rounds-list-items">
            <div v-for="item in playersList" :key="item.id" class="game-history-modal-content-by-rounds-list-item">
                <div>#{{ item.id }}</div>
                <div class="game-history-modal-content-by-rounds-list-item-player">
                    <div>
                        <img :src="'/svg/person.jpg'" alt="avatar" />
                    </div>
                    <div>{{ item.name }}</div>
                </div>
                <div :class="item.money > 0 ? 'positive-money' : 'negative-money'">
                    {{ item.money > 0 ? '+' : '' }}{{ item.money }} $
                </div>
            </div>
        </div>

        <div class="game-history-modal-content-by-rounds-list-item-pagination">
            <button class="pagination-button pagination-button--prev">
                <img :src="'/svg/arrow-left.svg'" alt="previous" />
            </button>
            <div>Round 1 of 13</div>
            <button class="pagination-button pagination-button--next">
                <img :src="'/svg/arrow-right.svg'" alt="next" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const playersList = ref([
    { id: 4, name: 'Player Four', money: -120 },
    { id: 5, name: 'Player Five', money: 95 },
    { id: 6, name: 'Player Six', money: -200 },
    { id: 6, name: 'Player Six', money: -200 },
    { id: 6, name: 'Player Six', money: -200 },
]);
</script>

<style lang="scss" scoped>
.game-history-modal-content-by-rounds-list {
    height: 244px;
    padding: 24px 16px;
    background-color: #1B1A24;
    border-radius: 24px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 600px) {
        margin-left: -24px;
        margin-right: -24px;
        height: 100%;
    }

    .game-history-modal-content-by-rounds-list-items {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-height: 0;
    }

    .game-history-modal-content-by-rounds-list-item {
        display: grid;
        grid-template-columns: 54px 1fr 75px;
        align-items: center;
        height: 44px;
        background-color: #262530;
        border-radius: 20px;
        padding: 10px;

        :first-child {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
        }

        :last-child {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 400;
            font-size: 14px;
        }

        .game-history-modal-content-by-rounds-list-item-player {
            display: flex;
            align-items: center;
            gap: 8px;

            :first-child {
                width: 28px;
                height: 28px;
                background-color: #8780CF;
                border-radius: 100px;
            }

            :last-child {
                font-weight: 400;
                font-size: 14px;
            }
        }

        .positive-money {
            color: #31F62A;
        }

        .negative-money {
            color: #F64E2A;
        }
    }

    .game-history-modal-content-by-rounds-list-item-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        flex-shrink: 0;

        >div {
            font-weight: 400;
            font-size: 14px;
            line-height: 145%;
        }

        .pagination-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: background 0.2s ease;
            position: relative;
            z-index: 1;

            &--prev {
                transform: rotate(180deg);
            }

            &:hover {
                background: #2b2741;
            }

            img {
                width: 20px;
                height: 20px;
                display: block;
            }
        }
    }
}
</style>
