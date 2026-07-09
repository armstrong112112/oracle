<template>
    <div class="game-history-item-container">
        <div class="game-history-item-content-container">
            <div class="game-history-item-img-container">
                <!-- <img :src="item.img" alt="game-history-item-img" /> -->
                <!-- <div class="game-history-item-img">
                </div> -->
                <div class="game-history-item-img-text">{{ props.item.status }}</div>
            </div>

            <div class="game-history-item-content">
                <div class="game-history-item-content-name-time">
                    <div class="game-history-item-content-name-time-name-players">
                        <div class="game-history-item-content-name-time-name-players-name">{{ props.item.name }}</div>
                        <div v-if="props.item.players != 0">
                            {{ props.item.players }} Players
                        </div>
                    </div>
                    <div>{{ timeRange }}</div>
                </div>

                <div class="game-history-item-content-money-rounds">
                    <div :class="{ 'positive-money': props.item.money > 0 }">{{ props.item.money > 0 ? '+' +
                        props.item.money : props.item.money }} {{
                            props.item.money_value }}</div>

                    <div>{{ props.item.rounds }} Rounds</div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.game-history-item-container {
    cursor: pointer;
    width: 100%;
    height: 113px;
    border-radius: 20px;
    background-color: #14131B;
    padding: 12px;

    .game-history-item-content-container {
        display: flex;
        gap: 10px;

        .game-history-item-img-container {
            width: 80px;
            height: 89px;
            border-radius: 12px;
            background-color: #1B1A24;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 16px 22px 8px 22px;

            .game-history-item-img-text {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 23px;
                background-color: #14131B;
                font-size: 10px;
                font-weight: 500;
                line-height: 145%;
                color: #7873B4;
                border-radius: 12px;
                padding: 4px 8px
            }
        }

        .game-history-item-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 8px;

            .game-history-item-content-name-time {
                display: flex;
                flex-direction: column;
                gap: 4px;
                font-size: 16px;
                font-family: Roboto, sans-serif;
                font-weight: 400;
                line-height: 135%;

                .game-history-item-content-name-time-name-players {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    color: #8780CF;

                    .game-history-item-content-name-time-name-players-name {
                        color: #FFFFFF;
                    }


                    :last-child {
                        font-size: 14px;
                        line-height: 145%;
                        font-weight: 500;
                        font-family: Roboto, sans-serif;
                    }
                }

                :last-child {
                    color: #7873B4;
                    font-size: 14px;
                    line-height: 145%;
                }
            }

            .game-history-item-content-money-rounds {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: Roboto, sans-serif;


                >div {
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 145%;
                }

                :first-child {
                    color: #F64E2A;
                    font-weight: 400;
                }

                .positive-money {
                    color: #31F62A;
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

export interface GameHistoryItemProps {
    id: number;
    name: string;
    img: string;
    status: string;
    players: number;
    money: number;
    money_value: string;
    game_time_start: string;
    game_time_end: string;
    rounds: number;
    date: string;
}
const props = defineProps<{
    item: GameHistoryItemProps
}>()

const parseTimeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
        return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
};

const timeRange = computed(() => {
    const startTime = props.item.game_time_start;
    const endTime = props.item.game_time_end;

    if (!startTime || !endTime) {
        return props.item.date;
    }

    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);
    const diffMinutes = endMinutes - startMinutes;

    const duration = formatDuration(diffMinutes);
    return `${startTime}-${endTime} (${duration})`;
});

</script>