<template>
    <NuxtModal>
        <div class="game-history-modal-content"
            :class="{ 'game-history-modal-content--loading': isLoading, 'game-history-modal-content--selected-round': selectedRound }">
            <div v-if="isLoading" class="game-history-modal-loader">
                <div class="game-history-modal-loader-spinner">
                    <img src="/svg/Spinner-Dots-5.svg" alt="loader" />
                </div>
                <div class="game-history-modal-loader-text">Loading</div>
            </div>
            <template v-else>
                <div class="game-history-modal-content-header">
                    <div>
                        Game name
                        <span v-if="!selectedRound">
                            - {{ list.length }} rounds
                        </span>
                    </div>
                    <button class="game-history-modal-close" @click="handleCloseModal">
                        <img src="/svg/close.svg" alt="close" />
                    </button>
                </div>

                <div v-if="!selectedRound">
                    <GameHistoryModalContent :list="list" @select-round="handleSelectRound" />
                </div>

                <div v-else class="game-history-modal-content-by-rounds">
                    <GameHistoryModalContectByRounds :round="selectedRound" />
                </div>

            </template>
        </div>
    </NuxtModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GameHistoryModalContent from './GameHistoryModalContent/index.vue';
import GameHistoryModalContectByRounds from './GameHistoryModalContectByRounds/index.vue';

const props = defineProps<{
    // rounds: number;
    // list: {
    //     id: number;
    //     money: number;
    //     money_value: string;
    // }[];
    handleCloseModal: () => void;
}>()

const isLoading = ref(true);
const selectedRound = ref<number | null>(null);

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 1000);
});

const handleSelectRound = (round: number) => {
    selectedRound.value = round;
}

const list = [
    {
        id: 1,
        money: 100,
        money_value: "USDT",
    },
    {
        id: 2,
        money: -20,
        money_value: "USDT",
    },
    {
        id: 3,
        money: -30,
        money_value: "USDT",
    },
    {
        id: 4,
        money: 400,
        money_value: "USDT",
    },
    {
        id: 5,
        money: -50,
        money_value: "USDT",
    },
    {
        id: 6,
        money: 60,
        money_value: "USDT",
    },
    {
        id: 7,
        money: -70,
        money_value: "USDT",
    },
    {
        id: 8,
        money: 80,
        money_value: "USDT",
    },
    {
        id: 9,
        money: -90,
        money_value: "USDT",
    },
    {
        id: 10,
        money: 100,
        money_value: "USDT",
    },
    {
        id: 11,
        money: -110,
        money_value: "USDT",
    },
    {
        id: 12,
        money: 120,
        money_value: "USDT",
    },
    {
        id: 13,
        money: -130,
        money_value: "USDT",
    },
]
</script>

<style lang="scss" scoped>
.game-history-modal-content {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 500px;
    height: 542px;
    background-color: #14131B;
    padding: 20px 24px;
    border-radius: 30px;
    gap: 24px;
    position: relative;
    z-index: 2001;
    box-sizing: border-box;
    transition: height 0.2s ease;

    @media (max-width: 600px) {
        width: 100vw;
        height: auto;
        border-radius: 0;
        padding: 20px 24px;
        border-radius: 30px 30px 0 0;
        gap: 24px;
    }

    &--loading {
        height: 356px;

        @media (max-width: 600px) {
            height: auto;
        }
    }

    &--selected-round {
        height: 615px;

        @media (max-width: 600px) {
            height: 762px;
            justify-content: flex-start;

            .game-history-modal-content-by-rounds {
                height: 100%;
            }
        }
    }

    .game-history-modal-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 16px;

        .game-history-modal-loader-spinner {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 100%;
                height: 100%;
                animation: rotate 3s linear infinite;
            }
        }

        .game-history-modal-loader-text {
            color: white;
            font-family: Roboto, sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 150%;
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }


    .game-history-modal-content-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;
    }

    .game-history-modal-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: background 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: #2b2741;
        }

        img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>