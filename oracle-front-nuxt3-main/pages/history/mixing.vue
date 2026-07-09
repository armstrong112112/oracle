<template>
  <history-layout
    page-class="mixing__history"
    :page-title="$t('history.title')"
    :history-data="historyDataRef"
    :months="months"
    :chart-data="chartData"
    :deposit-text="depositText"
    :expenses-text="expensesText"
    :deposit-title="$t('history.mixing.title')"
    :expenses-title="$t('history.mixing.title')"
    :active-deposit-type="activeDepositType"
    :active-expenses-type="activeExpensesType"
    :selected-items="selectedItems"
    :on-selection-change="handleSelectionChange"
    :on-open-modal="openModal"
    :on-search-open-modal="handleSearchOpenModal"
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
import { historyData, mixingData } from '~/entities/history/data/transfer.seed'

const localePath = useLocalePath()
const { t } = useI18n()

definePageMeta({
  layout: 'sidebar',
})

// Reactive state
const windowWidth = ref<number>(0)
const isModalOpen = ref<boolean>(false)
const currentModalData = ref<any>({})
const showActionButton = ref<boolean>(true)
const selectedItems = ref<string[]>([])
const activeDepositType = ref<string | null>(null)
const activeExpensesType = ref<string | null>(null)

// Data
const historyDataRef = historyData
const mixingDataRef = mixingData

// Computed properties
const actionButtonText = computed(() => t('history.goToDealPage'))

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

// Methods
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
  updateLayout()
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  // Layout is handled by definePageMeta
}

const openModal = () => {
  // type, item: any
  currentModalData.value = { ...mixingDataRef }
  showActionButton.value = true
  isModalOpen.value = true
}

const handleModalAction = () => {
  console.log('Go to Deal Page clicked')
  isModalOpen.value = false
}

const handleSearchOpenModal = () => {
  // Логика при открытии из поиска
}

const handleSelectionChange = (selected: string[]) => {
  selectedItems.value = selected
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
