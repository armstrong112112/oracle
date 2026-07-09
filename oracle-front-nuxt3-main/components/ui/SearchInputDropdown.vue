<template>
    <div v-if="filteredSEARCH_INPUT_DROPDOWN_ITEMS.length > 0" class="search-input-dropdown">
        <SearchInputDropdownItem v-for="item in filteredSEARCH_INPUT_DROPDOWN_ITEMS" :key="item.id" :icon="item.icon"
            :name="item.name" :counterparty="item.counterparty" :percentage="item.percentage" :money="item.money"
            :money_value="item.money_value" />
    </div>
    <div v-else class="search-input-dropdown-empty">
        <div class="search-input-dropdown-empty-text">No results found</div>
    </div>
</template>

<script setup lang="ts">
import SearchInputDropdownItem from './SearchInputDropdownItem.vue';

interface DropdownItem {
    id: number;
    icon: string;
    name: string;
    counterparty?: string;
    percentage?: number;
    money?: number;
    money_value?: string;
}

const props = defineProps<{
    searchValue: string;
    SEARCH_INPUT_DROPDOWN_ITEMS: DropdownItem[];
}>();

const filteredSEARCH_INPUT_DROPDOWN_ITEMS = computed(() => props.SEARCH_INPUT_DROPDOWN_ITEMS.filter(item => item.name.toLowerCase().includes(props.searchValue.toLowerCase())));

// const SEARCH_INPUT_DROPDOWN_ITEMS = computed(() => [
//     {
//         id: 2,
//         icon: '/svg/girl-face.jpg',
//         name: 'Coin name2',
//         // counterparty: '@MerchantName',
//         percentage: -3,
//     },
//     {
//         id: 3,
//         icon: '',
//         name: 'Coin name3',
//         // counterparty: '@MerchantName',
//         // percentage: 3,
//     },
//     {
//         id: 4,
//         icon: '',
//         name: 'Coin name4',
//         // counterparty: '@MerchantName',
//         // percentage: 3,
//     },
//     {
//         id: 5,
//         icon: '',
//         name: 'Coin name5',
//         counterparty: '@MerchantName',
//         // percentage: 3,
//         // money: -0.0244,
//         money: -244,
//         money_value: 'TON',
//     },
//     {
//         id: 6,
//         icon: '',
//         name: 'Coin name6',
//         // counterparty: '@MerchantName',
//         // percentage: 3,
//     },
//     {
//         id: 7,
//         icon: '',
//         name: 'Coin name7',
//         // counterparty: '@MerchantName',
//         // percentage: 3,
//     },
//     {
//         id: 8,
//         icon: '',
//         name: 'Coin name8',
//         // counterparty: '@MerchantName',
//         // percentage: 3,
//     },
// ]
</script>

<style lang="scss" scoped>
.search-input-dropdown,
.search-input-dropdown-empty {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    width: 391px;
    border-radius: 16px;
    background-color: #14131B;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.search-input-dropdown {
    display: flex;
    flex-direction: column;
    max-height: 256px;
    overflow-y: auto;
    padding: 8px 0;
    gap: 12px;
}

.search-input-dropdown-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    padding: 24px;

    &-text {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 145%;
        color: #7873B4;
    }
}
</style>