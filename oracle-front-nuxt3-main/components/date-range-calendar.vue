<template>
    <div class="date-range-calendar-modal">
        <div class="date-range-calendar-modal-header">
            <!-- год -->
            <div class="calendar-header">
                <div class="year-selector">
                    <div class="year-selector-value">
                        {{ currentYear }}
                    </div>
                    <ArrowControls color="#F64E2A" container-class="year-selector-controls"
                        button-class="year-selector-control-btn" direction="column" :gap="2" @up="changeYear(1)"
                        @down="changeYear(-1)" />
                </div>
                <CloseButton button-class="calendar-close-btn" :icon-width="24" :icon-height="24" @click="closeModal" />
            </div>

            <!-- start date and end date -->
            <div v-if="!isSaving" class="date-inputs">
                <DateInputField :value="startDateDisplay" placeholder="Start Date" side="left"
                    @clear="clearStartDate" />
                <DateInputField :value="endDateDisplay" placeholder="End Date" side="right"
                    :is-start-date-selected="!!startDateDisplay" @clear="clearEndDate" />
            </div>
        </div>

        <!-- monthes -->
        <div v-if="!isSaving" class="date-range-calendar-modal-monthes">
            <CalendarMonthItem :month-name="previousMonthName" :year="currentYear" :month-index="previousMonthIndex"
                :start-date="selectedStartDate" :end-date="selectedEndDate"
                @month-up="changeMonth(previousMonthIndex, 1, true)"
                @month-down="changeMonth(previousMonthIndex, -1, true)" @date-click="handleDateClick" />
            <CalendarMonthItem :month-name="currentMonthName" :year="currentYear" :month-index="currentMonthIndex"
                :start-date="selectedStartDate" :end-date="selectedEndDate"
                @month-up="changeMonth(currentMonthIndex, 1, false)"
                @month-down="changeMonth(currentMonthIndex, -1, false)" @date-click="handleDateClick" />
        </div>

        <!-- loader -->
        <div v-if="isSaving" class="date-range-calendar-modal-loader">
            <div class="date-range-calendar-modal-loader-spinner">
                <img src="/svg/Spinner-Dots-5.svg" alt="loader" />
            </div>
            <div class="date-range-calendar-modal-loader-text">Loading</div>
        </div>

        <!-- save button -->
        <div>
            <button class="date-range-calendar-modal-save-btn" @click="handleSave">
                Save
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowControls from '~/components/ui/ArrowControls.vue'
import CloseButton from '~/components/ui/CloseButton.vue'
import CalendarMonthItem from '~/components/ui/CalendarMonthItem.vue'
import DateInputField from '~/components/ui/DateInputField.vue'

interface Props {
    value?: string
}

const props = withDefaults(defineProps<Props>(), {
    value: '',
})

const emit = defineEmits<{
    close: []
    save: [dateRange: string]
}>()

const { locale } = useI18n()
const currentYear = ref(new Date().getFullYear())
const today = new Date()
const currentMonthIndex = ref(today.getMonth())
const previousMonthIndex = ref(today.getMonth() - 1 < 0 ? 11 : today.getMonth() - 1)
const startDateDisplay = ref('')
const endDateDisplay = ref('')
const selectedStartDate = ref<Date | null>(null)
const selectedEndDate = ref<Date | null>(null)
const isSaving = ref(false)

const monthNames = computed(() =>
    Array.from({ length: 12 }, (_, index) =>
        new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(new Date(2000, index, 1))
    )
)

// Парсим переданное значение при инициализации
const parseDateRange = (dateRangeStr: string): { start: Date | null; end: Date | null } => {
    if (!dateRangeStr) return { start: null, end: null }

    if (dateRangeStr.includes(' - ')) {
        const [startStr, endStr] = dateRangeStr.split(' - ')
        const startDate = parseDateString(startStr.trim())
        const endDate = parseDateString(endStr.trim())
        return { start: startDate, end: endDate }
    } else {
        const date = parseDateString(dateRangeStr.trim())
        return { start: date, end: null }
    }
}

const parseDateString = (dateStr: string): Date | null => {
    const parts = dateStr.trim().split(' ')
    if (parts.length < 2) return null

    const monthName = parts[0]
    const day = parseInt(parts[1])
    const monthIndex = monthNames.value.indexOf(monthName)

    if (monthIndex === -1 || isNaN(day)) return null

    // Используем текущий год, так как в формате нет года
    const year = new Date().getFullYear()
    return new Date(year, monthIndex, day)
}

const formatDate = (date: Date): string => {
    return `${monthNames.value[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const formatDateShort = (date: Date): string => {
    return `${monthNames.value[date.getMonth()]} ${date.getDate()}`
}

// Инициализация из props
watch(() => props.value, (newValue) => {
    if (newValue) {
        const { start, end } = parseDateRange(newValue)
        if (start) {
            selectedStartDate.value = start
            startDateDisplay.value = formatDate(start)
            // Обновляем год и месяц для отображения
            currentYear.value = start.getFullYear()
            currentMonthIndex.value = start.getMonth()
            previousMonthIndex.value = start.getMonth() - 1 < 0 ? 11 : start.getMonth() - 1
        }
        if (end) {
            selectedEndDate.value = end
            endDateDisplay.value = formatDate(end)
        }
    }
}, { immediate: true })

const previousMonthName = computed(() => monthNames.value[previousMonthIndex.value])
const currentMonthName = computed(() => monthNames.value[currentMonthIndex.value])

const changeYear = (delta: number) => {
    currentYear.value += delta
}

const changeMonth = (targetMonthIndex: number, delta: number, isPrevious: boolean) => {
    let newMonth = targetMonthIndex + delta
    let newYear = currentYear.value

    if (newMonth < 0) {
        newMonth = 11
        newYear -= 1
    } else if (newMonth > 11) {
        newMonth = 0
        newYear += 1
    }

    // Изменяем только тот месяц, на котором была нажата кнопка
    if (isPrevious) {
        previousMonthIndex.value = newMonth
    } else {
        currentMonthIndex.value = newMonth
    }

    currentYear.value = newYear
}

const handleDateClick = (date: Date) => {
    if (!selectedStartDate.value && !selectedEndDate.value) {
        // Оба пустые - начинаем с start date
        selectedStartDate.value = date
        startDateDisplay.value = formatDate(date)
    } else if (!selectedStartDate.value && selectedEndDate.value) {
        // End date выбран, start date нет - устанавливаем start date в правильном порядке
        if (date <= selectedEndDate.value) {
            selectedStartDate.value = date
            startDateDisplay.value = formatDate(date)
        } else {
            // Если выбранная дата позже end date - делаем её новым end date, старый end date становится start
            selectedStartDate.value = selectedEndDate.value
            selectedEndDate.value = date
            startDateDisplay.value = formatDate(selectedStartDate.value)
            endDateDisplay.value = formatDate(date)
        }
    } else if (selectedStartDate.value && !selectedEndDate.value) {
        // Start date выбран, end date нет - выбираем end date
        if (date < selectedStartDate.value) {
            // Если выбранная дата раньше start date - делаем её новой start date
            selectedEndDate.value = selectedStartDate.value
            selectedStartDate.value = date
            startDateDisplay.value = formatDate(date)
            endDateDisplay.value = formatDate(selectedEndDate.value)
        } else {
            // Иначе делаем её end date
            selectedEndDate.value = date
            endDateDisplay.value = formatDate(date)
        }
    } else if (selectedStartDate.value && selectedEndDate.value) {
        // Оба выбраны - начинаем новый выбор
        selectedStartDate.value = date
        selectedEndDate.value = null
        startDateDisplay.value = formatDate(date)
        endDateDisplay.value = ''
    }
}

const clearStartDate = () => {
    startDateDisplay.value = ''
    selectedStartDate.value = null
}

const clearEndDate = () => {
    endDateDisplay.value = ''
    selectedEndDate.value = null

    if (!startDateDisplay.value) {
        selectedStartDate.value = null
    }
}

const handleSave = () => {
    if (selectedStartDate.value && selectedEndDate.value) {
        const dateRange = `${formatDateShort(selectedStartDate.value)} - ${formatDateShort(selectedEndDate.value)}`
        emit('save', dateRange)
    } else if (selectedStartDate.value) {
        emit('save', formatDateShort(selectedStartDate.value))
    }
    emit('close')
}

const closeModal = () => {
    emit('close')
}
</script>

<style lang="scss" scoped>
.date-range-calendar-modal {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 595px;
    height: 488px;
    border-radius: 30px;
    background-color: #1B1A24;
    padding: 20px 24px;
    position: relative;

    @media (max-width: 600px) {
        width: 100%;
        // height: 744px;
        height: auto;
        border-radius: 0;
        padding: 12px 16px;
        border-radius: 30px 30px 0 0;
    }

    .date-range-calendar-modal-header {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .year-selector {
                display: flex;
                align-items: center;
                gap: 10px;

                .year-selector-value {
                    color: #F64E2A;
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 130%;
                }

                .year-selector-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
            }
        }
    }


    .date-inputs {
        display: flex;
        gap: 2px;
        height: 44px;
        width: 100%;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 145%;
    }

    .date-range-calendar-modal-monthes {
        display: flex;
        gap: 24px;
        height: 264px;

        @media (max-width: 600px) {
            flex-direction: column;
            height: auto;

            :deep(.date-range-calendar-modal-monthes-item-wrapper) {
                width: 100% !important;
            }
        }
    }

    .date-range-calendar-modal-save-btn {
        width: 100%;
        height: 44px;
        background-color: #F64E2A;
        border-radius: 14px;
        padding: 11px 16px;
        font-size: 16px;
        font-weight: 500;
        font-family: Roboto, sans-serif;
    }

    .date-range-calendar-modal-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 418px;
        gap: 16px;

        .date-range-calendar-modal-loader-spinner {
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

        .date-range-calendar-modal-loader-text {
            color: white;
            font-family: Roboto, sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 150%;
        }
    }

}

@keyframes slideUp {
    from {
        transform: translateY(100%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
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
</style>