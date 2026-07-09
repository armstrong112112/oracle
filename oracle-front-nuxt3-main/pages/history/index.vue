<template>
  <history-layout
    page-class="general-history"
    :page-title="pageTitle"
    :history-data="historyData"
    :months="months"
    :chart-data="chartData"
    :deposit-text="depositText"
    :expenses-text="expensesText"
    :deposit-title="$t('history.all')"
    :expenses-title="$t('history.all')"
    :active-deposit-type="activeDepositType"
    :active-expenses-type="activeExpensesType"
    :selected-items="selectedItems"
    :on-selection-change="handleSelectionChange"
    :on-open-modal="openModal"
    :on-search-open-modal="handleSearchOpenModal"
    :chart-label-step="stepDeposit"
    :chart-label-data="depositData"
    deposit-color="color-green"
    expenses-color="color-brown"
  >
    <template #modal>
      <transfer-modal
        :is-visible="isModalOpen"
        :show-action-button="showActionButton"
        :action-button-text="actionButtonText"
        :data="currentModalData.dataItems || []"
        :title="currentModalData.title"
        :coin-icon="currentModalData.coinIcon"
        @close="isModalOpen = false"
        @action="handleModalAction"
      />
    </template>
  </history-layout>
</template>

<script setup lang="ts">
import HistoryLayout from '~/components/history/historyLayout.vue'
import {
  depositMoreData,
  expensisMoreData,
  historyMoreData,
  mixingData,
} from '~/entities/history/data/transfer.seed'

const localePath = useLocalePath()
const { t } = useI18n()

definePageMeta({
  layout: 'sidebar',
})

// Reactive state
const windowWidth = ref<number>(0)
const selectedItems = ref<string[]>([])
const activeDepositType = ref<string | null>(null)
const activeExpensesType = ref<string | null>(null)
const isModalOpen = ref<boolean>(false)
const showActionButton = ref<boolean>(true)
const currentModalData = ref<any>({})

// Data
const historyData = historyMoreData
const mixingDataRef = mixingData
const depositData = depositMoreData
const expensisData = expensisMoreData
const stepDeposit = 0

// Computed properties
const pageTitle = computed(() => t('history.title'))

const months = computed(() => [
  t('history.months.january'),
  t('history.months.february'),
  t('history.months.march'),
  t('history.months.april'),
  t('history.months.may'),
])

const chartData = computed(() => ({
  labels: [
    t('history.chartLabels.escrow'),
    t('history.chartLabels.p2p'),
    t('history.chartLabels.swap'),
    t('history.chartLabels.transfers'),
  ],
  datasets: [
    {
      data: [28, 25, 28, 19],
      backgroundColor: ['#f6c32a', '#f64e2a', '#902af6', '#2af653'],
      borderWidth: 0,
    },
  ],
}))

const depositText = computed(() => ({ title: t('history.total'), price: '1,923$' }))

const expensesText = computed(() => ({ title: t('history.total'), price: '1,923$' }))

const actionButtonText = computed(() => t('history.goToDealPage'))

// Methods
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
  updateLayout()
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  // Layout is handled by definePageMeta
  // If dynamic layout change is needed, use setPageLayout(newLayout)
}

const openModal = () => {
  // type: 'deposit' | 'expense', item: any
  currentModalData.value = { ...mixingDataRef } // Использованы данные другой страницы
  isModalOpen.value = true
  showActionButton.value = true
}

const handleModalAction = () => {
  console.log('Action button clicked')
  isModalOpen.value = false
}

const handleSelectionChange = (selected: string[]) => {
  selectedItems.value = selected
}

const handleSearchOpenModal = () => {
  // Можешь реализовать позже, если нужно
}

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', updateWindowWidth)
    updateLayout()
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateWindowWidth)
  }
})
</script>

<style lang="scss">
@use '@/assets/styles/pages/_history-all.scss' as *;
</style>
