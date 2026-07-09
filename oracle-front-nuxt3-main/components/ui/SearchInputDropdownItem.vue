<template>
    <div class="search-input-dropdown-item">
        <div class="search-input-dropdown-item-left">
            <div class="search-input-dropdown-item-icon" :class="{ 'search-input-dropdown-item-icon--empty': !icon }"
                :style="icon ? { backgroundImage: `url(${icon})` } : {}"></div>

            <div class="search-input-dropdown-item-content">
                <div class="search-input-dropdown-item-name">{{ name }}</div>

                <div v-if="counterparty" class="search-input-dropdown-item-counterparty">counterparty: {{ counterparty
                    }}
                </div>
            </div>

        </div>
        <div v-if="money || percentage !== undefined" class="search-input-dropdown-item-right">
            <div v-if="percentage !== undefined" class="search-input-dropdown-item-percentage" :class="{
                'search-input-dropdown-item-percentage--positive': percentage > 0,
                'search-input-dropdown-item-percentage--negative': percentage < 0
            }">
                <img v-if="percentage > 0" src="/svg/down.svg" alt="up"
                    class="search-input-dropdown-item-percentage-icon" />
                <img v-else-if="percentage < 0" src="/svg/arrow-down.svg" alt="down"
                    class="search-input-dropdown-item-percentage-icon" />
                <div>{{ percentage > 0 ? '+' : '' }}{{ percentage }}%</div>
            </div>
            <div v-if="money" class="search-input-dropdown-item-money">{{ money > 0 ? '+' : '' }}{{ money }} {{
                money_value }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    icon: string;
    name: string;
    counterparty?: string;
    percentage?: number;
    money?: number;
    money_value?: string;
}>()
</script>

<style lang="scss" scoped>
.search-input-dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    max-width: 391px;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    transition: background-color 0.2s ease;
    cursor: pointer;

    .search-input-dropdown-item-left {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        gap: 12px;

        .search-input-dropdown-item-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            flex-shrink: 0;

            &--empty {
                width: 32px;
                height: 32px;
                background-color: #1A1728;
                border-radius: 8px;
                background-image: url('/svg/coin.svg');
                background-size: 20px 20px;
                background-position: center;
                background-repeat: no-repeat;
            }
        }

        .search-input-dropdown-item-content {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .search-input-dropdown-item-name {
                font-family: Roboto, sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 145%;
                letter-spacing: 0;
            }

            .search-input-dropdown-item-counterparty {
                font-family: Roboto, sans-serif;
                font-weight: 400;
                font-size: 12px;
                line-height: 145%;
                letter-spacing: 0;
                color: #8780CF;
            }
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.04);
        }

        &:active {
            background-color: rgba(255, 255, 255, 0.06);
        }

    }

    .search-input-dropdown-item-right {

        .search-input-dropdown-item-percentage {
            display: flex;
            align-items: center;
            gap: 4px;
            font-family: Roboto, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 145%;
            margin-left: auto;

            &--positive {
                color: #31F62A;

                >div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #31F62A;
                    font-size: 12px;
                    line-height: 145%;
                    font-weight: 400;
                    font-family: Roboto, sans-serif;
                }
            }

            &--negative {
                color: #F64E2A;

                .search-input-dropdown-item-percentage-icon {
                    filter: brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(2080%) hue-rotate(343deg) brightness(100%) contrast(98%);
                }

                >div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #F64E2A;
                    font-size: 12px;
                    line-height: 145%;
                    font-weight: 400;
                    font-family: Roboto, sans-serif;
                }
            }

            &-icon {
                width: 14px;
                height: 14px;
                flex-shrink: 0;
            }
        }

        .search-input-dropdown-item-money {
            font-weight: 400;
            font-family: Roboto, sans-serif;
            font-size: 14px;
            line-height: 145%;
            color: #F64E2A;
        }
    }

}
</style>