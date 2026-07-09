<template>
    <div class="statistics-page">
        <div class="statistics-page-container">
            <div class="game-history-header">
                <PageHeaderLeft title="Statistics" :back-route="'/casino'" :mobile-centered="true" />

                <div class="game-history-header-center">
                    <SearchInput />
                </div>

                <button class="mobile-date-button" @click="openCalendar">
                    <img src="/svg/shop/icons/date-today-svgrepo-com.svg" alt="date-range" />
                </button>
            </div>

            <div class="statistics-content">
                <div class="statistics-content-container">
                    <StatisticDateChooser ref="dateChooserRef" :isLoading="isLoading" @openCalendar="openCalendar" />
                    <Statistics :isLoading="isLoading" />
                    <StatisticGames :isLoading="isLoading" />
                    <StatisticSummary :isLoading="isLoading" />
                </div>
            </div>

        </div>

        <div v-if="!isLoading" class="mobile-date-text">
            {{ dateRangeText || 'August 1 - September 1' }}
        </div>

        <div v-if="showCalendar" class="date-calendar-overlay" @click.self="showCalendar = false">
            <DateRangeCalendar :value="selectedDateValue" @input="onDateInput" @close="handleClose"
                @save="onDateSave" />
        </div>
    </div>
</template>

<script setup lang="ts">
import StatisticDateChooser from '~/widgets/statistics/StatisticDateChooser/index.vue';
import Statistics from '~/widgets/statistics/Statistics/index.vue';
import StatisticGames from '~/widgets/statistics/StatisticGames/index.vue';
import StatisticSummary from '~/widgets/statistics/StatisticSummary/index.vue';
import SearchInput from '~/components/ui/SearchInput.vue';
import PageHeaderLeft from '~/components/ui/PageHeaderLeft.vue';
import DateRangeCalendar from '~/components/date-range-calendar.vue';

const isLoading = ref(true);
const showCalendar = ref(false);
const selectedDateValue = ref('');
const dateChooserRef = ref<{ openCalendar: () => void; dateRange: string; updateDateRange: (dateStr: string) => void } | null>(null);
const dateRangeText = computed(() => dateChooserRef.value?.dateRange || '');

const onDateInput = (dateStr: string) => {
    selectedDateValue.value = dateStr;
};

const openCalendar = () => {
    showCalendar.value = true;
    console.log('openCalendar');
};

const onDateSave = (dateRangeStr: string) => {
    selectedDateValue.value = dateRangeStr;
    dateChooserRef.value?.updateDateRange(dateRangeStr);
};

const handleClose = () => {
    showCalendar.value = false;
};

// TODO: Заменить на реальную загрузку данных
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
});

definePageMeta({
    layout: "sidebar",
});
</script>

<style lang="scss" scoped>
.statistics-page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 1023px) {
        justify-content: space-between;
        height: 100%;
        padding: 0 16px;
    }

    .statistics-page-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .game-history-header {
        display: grid;
        height: 84px;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        padding: 0 8px;
        position: relative;

        .game-history-header-center {
            display: flex;
            justify-content: center;

            @media (max-width: 1023px) {
                display: none;
            }
        }

        .mobile-date-button {
            display: none;

            @media (max-width: 1023px) {
                display: flex;
                align-items: center;
                justify-content: center;
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
                width: 24px;
                height: 24px;
                margin-left: auto;
                position: relative;
                z-index: 1;

                img {
                    width: 20px;
                    height: 20px;
                }

                &:hover {
                    opacity: 0.8;
                }
            }
        }

        @media (max-width: 1023px) {
            grid-template-columns: 1fr auto;
            height: 38px;
        }
    }

    .mobile-date-text {
        display: none;

        @media (max-width: 1023px) {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 81px;
            padding: 16px;
            font-size: 14px;
            font-weight: 400;
            line-height: 145%;
            font-family: Roboto, sans-serif;
        }
    }

    .statistics-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .statistics-content-container {
            width: 500px;
            gap: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            @media (max-width: 1023px) {
                width: 100%;
                max-width: 100%;
                padding: 0 16px;
                box-sizing: border-box;
            }
        }
    }
}

.date-calendar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000099;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    @media (max-width: 600px) {
        align-items: flex-end;
    }
}
</style>