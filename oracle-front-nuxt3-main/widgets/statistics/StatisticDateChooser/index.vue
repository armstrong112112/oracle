<template>
    <div class="statistic-date-chooser" :class="{ 'skeleton': isLoading }">
        <div v-if="!isLoading" class="statistic-date-chooser-item">
            <div>
                <img :src="'/svg/shop/icons/date-today-svgrepo-com.svg'" alt="date-range" />
            </div>
            <div>
                {{ dateRange || 'August 1 - September 1' }}
            </div>
        </div>

        <button v-if="!isLoading" class="statistic-date-chooser-button" @click="openCalendar">
            <img :src="'/svg/shop/icons/date-today-svgrepo-com.svg'" alt="date-range" /> Choose date
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineProps<{
    isLoading?: boolean;
}>();

const emit = defineEmits<{
    dateChange: [dateRange: string];
    openCalendar: [];
}>();

const dateRange = ref('');

const openCalendar = () => {
    emit('openCalendar');
};

const dateRangeValue = computed(() => dateRange.value);

const updateDateRange = (dateStr: string) => {
    dateRange.value = dateStr;
    emit('dateChange', dateStr);
};

defineExpose({
    openCalendar,
    dateRange: dateRangeValue,
    updateDateRange
});
</script>

<style lang="scss" scoped>
.statistic-date-chooser {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 52px;
    gap: 8px;
    padding: 8px;
    font-family: Roboto, sans-serif;

    .statistic-date-chooser-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        gap: 8px;

        img {
            width: 20px;
            height: 20px;
        }

        :last-child {
            font-size: 14px;
            font-weight: 400;
            line-height: 145%;
            letter-spacing: 0;
        }
    }

    .statistic-date-chooser-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        gap: 8px;

        background-color: #1B1A24;
        padding: 12px 14px;
        height: 36px;
        width: 133px;
        border-radius: 12px;

        font-size: 14px;
        font-weight: 400;
        line-height: 145%;
        letter-spacing: 0;

        img {
            width: 16px;
            height: 16px;
        }

        &:hover {
            cursor: pointer;
        }
    }

    &.skeleton {
        background-color: #14131B;
        animation: skeleton-loading 1.5s ease-in-out infinite;
        width: 100%;
        height: 52px;
        border-radius: 16px;
    }

    @media (max-width: 1023px) {
        display: none;
    }
}

@keyframes skeleton-loading {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>