<template>
    <div class="achievements-challenges-page">
        <div class="game-history-header">
            <PageHeaderLeft title="Achievments" :back-route="'/casino'" :mobile-centered="true" />

            <div class="game-history-header-center">
                <div class="search-input-wrapper">
                    <SearchInput v-model="searchValue" @focus="isSearchFocused = true" @blur="handleSearchBlur"
                        :placeholder="isSearchFocused ? 'Typing...' : 'Search'" />
                    <SearchInputDropdown v-if="isSearchFocused" :searchValue="searchValue"
                        :SEARCH_INPUT_DROPDOWN_ITEMS="SEARCH_INPUT_DROPDOWN_ITEMS" />
                </div>
            </div>

        </div>

        <div class="achievements-challenges-content">
            <AchievementsRunner :isLoading="isLoading" />
            <AchievementsChallenges :isLoading="isLoading" />
        </div>
    </div>
</template>

<script setup lang="ts">
import SearchInput from '~/components/ui/SearchInput.vue';
import SearchInputDropdown from '~/components/ui/SearchInputDropdown.vue';
import PageHeaderLeft from '~/components/ui/PageHeaderLeft.vue';
import AchievementsChallenges from '~/widgets/achievements/AchievementsChallenges/index.vue';
import AchievementsRunner from '~/widgets/achievements/AchievementsRunner/index.vue';

const isLoading = ref(true);
const isSearchFocused = ref(false);
const searchValue = ref('');

const handleSearchBlur = () => {
    isSearchFocused.value = false;
};

// TODO: Заменить на реальную загрузку данных
onMounted(() => {
    // Пример: загрузка данных
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
});

definePageMeta({
    layout: "sidebar",
});

const SEARCH_INPUT_DROPDOWN_ITEMS = [
    {
        id: 2,
        icon: '/svg/girl-face.jpg',
        name: 'Coin name2',
        // counterparty: '@MerchantName',
        percentage: 3,
    },
    {
        id: 3,
        icon: '/svg/bitcoin.svg',
        name: 'Coin name3',
        // counterparty: '@MerchantName',
        // percentage: 3,
    },
    {
        id: 4,
        icon: '',
        name: 'Coin name4',
        // counterparty: '@MerchantName',
        // percentage: 3,
    },
    {
        id: 5,
        icon: '',
        name: 'Coin name5',
        counterparty: '@MerchantName',
        // percentage: 3,
        // money: -0.0244,
        money: -244,
        money_value: 'TON',
    },
    {
        id: 6,
        icon: '',
        name: 'Coin name6',
        // counterparty: '@MerchantName',
        // percentage: 3,
    },
    {
        id: 7,
        icon: '',
        name: 'Coin name7',
        // counterparty: '@MerchantName',
        // percentage: 3,
    },
    {
        id: 8,
        icon: '',
        name: 'Coin name8',
        // counterparty: '@MerchantName',
        // percentage: 3,
    },
]
</script>

<style lang="scss" scoped>
.achievements-challenges-page {
    display: flex;
    flex-direction: column;

    gap: 24px;

    .game-history-header {
        display: grid;
        height: 84px;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        padding: 0 8px;

        .game-history-header-center {
            display: flex;
            justify-content: center;

            .search-input-wrapper {
                position: relative;
            }
        }
    }

    .achievements-challenges-content {
        display: flex;
        justify-content: center;
        gap: 48px;
        padding: 0 24px;
        width: 100%;
        box-sizing: border-box;
        overflow-x: hidden;

        >* {
            flex: 0 1 auto;
            min-width: 0;
            box-sizing: border-box;
        }
    }
}

@media (max-width: 1023px) {
    .achievements-challenges-page {
        gap: 0;

        .game-history-header {
            grid-template-columns: auto 1fr;
            position: relative;
            height: 38px;

            .game-history-header-center {
                display: none;
            }
        }

        .achievements-challenges-content {
            flex-direction: column;
            align-items: center;
            gap: 0px;
            padding: 0 16px;
        }
    }
}
</style>