<template>
    <div class="date-range-calendar-modal-monthes-item-wrapper">
        <div class="date-range-calendar-modal-monthes-item">
            <div class="date-range-calendar-modal-monthes-item-month">{{ monthName }}</div>
            <ArrowControls color="#7A74BA" container-class="date-range-calendar-modal-monthes-item-controls"
                button-class="date-range-calendar-modal-monthes-item-controls-btn" direction="column" :gap="2"
                :button-width="20" :button-height="9" @up="$emit('monthUp')" @down="$emit('monthDown')" />
        </div>
        <!-- dates -->
        <div class="date-range-calendar-modal-monthes-item-dates">
            <div class="date-range-calendar-modal-monthes-item-dates-row">
                <div v-for="day in dayNames" :key="day" class="date-range-calendar-modal-monthes-item-dates-row-item">
                    {{ day }}
                </div>
            </div>
            <div class="date-range-calendar-modal-monthes-item-dates-grid">
                <div v-for="(dateItem, index) in calendarDays" :key="index"
                    class="date-range-calendar-modal-monthes-item-dates-grid-item" :class="{
                        'date-empty': !dateItem,
                        'date-weekend': dateItem && (dateItem.dayOfWeek === 5 || dateItem.dayOfWeek === 6),
                        'date-start': dateItem && dateItem.dateState === 'start',
                        'date-end': dateItem && dateItem.dateState === 'end',
                        'date-in-range': dateItem && dateItem.dateState === 'inRange'
                    }" @click="dateItem && handleDateClick(dateItem.day)">
                    {{ dateItem ? dateItem.day : '' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowControls from './ArrowControls.vue'

interface Props {
    monthName: string
    year: number
    monthIndex: number
    startDate?: Date | null
    endDate?: Date | null
}

const props = withDefaults(defineProps<Props>(), {
    startDate: null,
    endDate: null,
})

const { locale } = useI18n()
const dayNames = computed(() =>
    Array.from({ length: 7 }, (_, index) =>
        new Intl.DateTimeFormat(locale.value, { weekday: 'short' }).format(new Date(2000, 0, index + 1))
    )
)

const emit = defineEmits<{
    monthUp: []
    monthDown: []
    dateClick: [date: Date]
}>()

const handleDateClick = (day: number) => {
    const clickedDate = new Date(props.year, props.monthIndex, day)
    emit('dateClick', clickedDate)
}

const calendarDays = computed(() => {
    const days: Array<{ day: number; dayOfWeek: number; dateState: 'start' | 'end' | 'inRange' | 'none' } | null> = []

    // Получаем первый день месяца
    const firstDay = new Date(props.year, props.monthIndex, 1)
    // Получаем день недели (0 = воскресенье, 1 = понедельник, и т.д.)
    // Но нам нужно понедельник = 0, воскресенье = 6
    let firstDayOfWeek = firstDay.getDay()
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1 // Преобразуем: воскресенье (0) -> 6, понедельник (1) -> 0

    // Получаем количество дней в месяце
    const lastDay = new Date(props.year, props.monthIndex + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Добавляем пустые ячейки для выравнивания
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null)
    }

    // Добавляем все дни месяца с информацией о дне недели и состоянии выбора
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(props.year, props.monthIndex, day)
        let dayOfWeek = date.getDay()
        dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Преобразуем: воскресенье (0) -> 6, понедельник (1) -> 0

        // Нормализуем даты для сравнения (убираем время)
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const normalizedStartDate = props.startDate ? new Date(props.startDate.getFullYear(), props.startDate.getMonth(), props.startDate.getDate()) : null
        const normalizedEndDate = props.endDate ? new Date(props.endDate.getFullYear(), props.endDate.getMonth(), props.endDate.getDate()) : null

        let dateState: 'start' | 'end' | 'inRange' | 'none' = 'none'

        if (normalizedStartDate && normalizedEndDate) {
            if (normalizedDate.getTime() === normalizedStartDate.getTime()) {
                dateState = 'start'
            } else if (normalizedDate.getTime() === normalizedEndDate.getTime()) {
                dateState = 'end'
            } else if (normalizedDate > normalizedStartDate && normalizedDate < normalizedEndDate) {
                dateState = 'inRange'
            }
        } else if (normalizedStartDate && normalizedDate.getTime() === normalizedStartDate.getTime()) {
            dateState = 'start'
        } else if (normalizedEndDate && !normalizedStartDate && normalizedDate.getTime() === normalizedEndDate.getTime()) {
            dateState = 'end'
        }

        days.push({ day, dayOfWeek, dateState })
    }

    return days
})
</script>

<style lang="scss" scoped>
.date-range-calendar-modal-monthes-item-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .date-range-calendar-modal-monthes-item {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 20px;

        .date-range-calendar-modal-monthes-item-month {
            font-weight: 400;
            font-size: 20px;
            line-height: 120%;
        }

        :deep(.date-range-calendar-modal-monthes-item-controls) {
            display: flex;
            flex-direction: column;
            gap: 2px;
            width: 20px;
            height: 20px;
            justify-content: space-between;

            :deep(.date-range-calendar-modal-monthes-item-controls-btn) {
                padding: 0;
            }
        }
    }

    .date-range-calendar-modal-monthes-item-dates {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media (max-width: 600px) {
            gap: 12px;
        }

        .date-range-calendar-modal-monthes-item-dates-row {
            display: flex;
            width: 100%;

            .date-range-calendar-modal-monthes-item-dates-row-item {
                width: calc(100% / 7);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 500;
                font-family: Roboto, sans-serif;
                font-size: 14px;
                line-height: 145%;
                letter-spacing: 0%;


                &:nth-child(6),
                &:nth-child(7) {
                    color: #8780CF;
                }
            }
        }

        .date-range-calendar-modal-monthes-item-dates-grid {
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            .date-range-calendar-modal-monthes-item-dates-grid-item {
                width: calc(100% / 7);
                font-weight: 400;
                font-family: Roboto, sans-serif;
                font-size: 14px;
                line-height: 145%;
                letter-spacing: 0%;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 32px;
                padding: 6px 12px;
                cursor: pointer;
                border: 1px solid transparent;

                &:hover {
                    border: 1px solid #3b394f;
                    border-radius: 5px;
                }

                &.date-empty {
                    opacity: 0;
                    cursor: default;
                }

                &.date-weekend {
                    color: #BFB7FF;
                }

                &.date-start {
                    background-color: #F64E2A;
                    border-radius: 12px 0 0 12px;
                    color: #ffffff;

                    &.date-weekend {
                        color: #ffffff;
                    }
                }

                &.date-end {
                    background-color: #F64E2A;
                    border-radius: 0 12px 12px 0;
                    color: #ffffff;

                    &.date-weekend {
                        color: #ffffff;
                    }
                }

                &.date-in-range {
                    background-color: #F64E2A4D;
                    color: #ffffff;

                    &.date-weekend {
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>
