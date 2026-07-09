<template>
  <div class="calendar-container">
    <button class="calendar-btn" @click="openCalendar">
      <CalendarIcon />
    </button>
    <div
      ref="calendarInputRef"
      class="calendar-oracle"
      :class="{ show: isOpen }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import CalendarIcon from '@/assets/svg/calendar-icon.svg?component'

const emit = defineEmits<{
  close: []
}>()

// Reactive state
const isOpen = ref(false)
const calendarInstance = ref<any>(null)
const selectedDates = ref('')
const calendarInputRef = ref<HTMLElement | null>(null)

// Methods
const adjustDayCells = () => {
  nextTick(() => {
    document.querySelectorAll('.flatpickr-day').forEach((e) => {
      const el = e as HTMLElement
      const widthPx = el.offsetWidth + 'px'
      el.style.height = widthPx
    })
  })
}

const onDateSelect = (selectedDatesArr: Date[], dateStr: string) => {
  selectedDates.value = dateStr
  console.log('Tanlangan sana:', selectedDatesArr)
}

const addApplyButton = () => {
  setTimeout(() => {
    const calendarContainer = document.querySelector('.flatpickr-calendar')
    if (calendarContainer) {
      const applyBtn = document.createElement('button')
      applyBtn.innerText = 'Apply'
      applyBtn.className = 'apply-button'
      applyBtn.onclick = () => applyDate()
      calendarContainer.appendChild(applyBtn)
    }
  }, 100)
}

const initCalendar = () => {
  calendarInstance.value = flatpickr(
    calendarInputRef.value as HTMLInputElement,
    {
      mode: 'range',
      dateFormat: 'Y-m-d',
      closeOnSelect: false,
      onClose: onDateSelect,
      appendTo: document.body,
    }
  )

  addApplyButton()
}

const applyDate = () => {
  if (calendarInstance.value) {
    calendarInstance.value.close()
    emit('close')
    isOpen.value = false
  }
}

const openCalendar = () => {
  if (calendarInstance.value) {
    isOpen.value = true
    calendarInstance.value.open()
    adjustDayCells()
  }
}

const ClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const calendarInput = calendarInputRef.value

  if (calendarInput && calendarInput.contains(target)) {
    applyDate()
    emit('close')
    isOpen.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  initCalendar()
  document.addEventListener('click', ClickOutside)
  window.addEventListener('resize', adjustDayCells)
  adjustDayCells()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', ClickOutside)
  window.removeEventListener('resize', adjustDayCells)
})
</script>

<style lang="scss">
@use '@/assets/styles/components/calendar-oracle.scss' as *;
</style>
