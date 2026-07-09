<template>
    <div :class="[inputClass, { 'date-input-active': isActive, 'date-input-selected': value }]">
        <div class="date-inputs-value-wrapper">
            <div class="date-inputs-value">{{ value || placeholder }}</div>
            <CloseButton v-if="value" button-class="date-inputs-clear-btn" :icon-width="18" :icon-height="18"
                @click="$emit('clear')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import CloseButton from './CloseButton.vue'

interface Props {
    value?: string
    placeholder?: string
    side?: 'left' | 'right'
    isStartDateSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: '',
    side: 'left',
    isStartDateSelected: false,
})

const isActive = computed(() => {
    // Активен (выбирается start date), если это левый элемент и значение пустое
    if (props.side === 'left') {
        return !props.value
    }
    // Для правого элемента: активен, если start date выбран, но end date не выбран
    return props.isStartDateSelected && !props.value
})

const emit = defineEmits<{
    clear: []
}>()

const inputClass = computed(() => {
    return props.side === 'left' ? 'date-inputs-left' : 'date-inputs-right'
})
</script>

<style lang="scss" scoped>
.date-inputs-left {
    background-color: #2C2A3D;
    border-radius: 14px 0 0 14px;
    padding: 0 4px 0 16px;
    width: 50%;

    .date-inputs-value-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        gap: 10px;

        :deep(.date-inputs-clear-btn) {
            padding: 8px 18px;
        }
    }

    &.date-input-active {
        border: 1px solid #F64E2A;
    }

    &.date-input-selected {
        border: none;
    }
}

.date-inputs-right {
    background-color: #2C2A3D;
    border-radius: 0 14px 14px 0;
    padding: 0 4px 0 16px;
    width: 50%;

    .date-inputs-value-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        gap: 10px;

        :deep(.date-inputs-clear-btn) {
            padding: 8px 18px;
        }
    }

    &.date-input-active {
        border: 1px solid #F64E2A;

        .date-inputs-value {
            color: #ffffff;
        }
    }

    &.date-input-selected {
        border: none;
    }

    &:not(.date-input-selected):not(.date-input-active) {
        .date-inputs-value {
            color: #8780CF;
        }
    }
}

.date-inputs-value {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 145%;
    color: #ffffff;
}
</style>
