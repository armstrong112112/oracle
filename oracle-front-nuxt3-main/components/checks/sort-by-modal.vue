<template>
  <div class="sort-by-modal" :class="{ show: isOpen }">
    <div ref="modal" class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ $t('checks.sortBy') }}</h2>
        <button class="close-modal" @click="$emit('close')">
          {{ $t('checks.cancel') }}
        </button>
      </div>
      <div class="modal-filter">
        <div class="filter-item">
          <p class="label">{{ $t('checks.amount') }}</p>
          <div class="filter-list">
            <div
              v-for="item in amount"
              :key="item.id"
              class="list-item"
              @click="amountFilter(item.id)"
            >
              <div class="icon" :class="{ active: item.selected }">
                <tickCircleIcon />
              </div>
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="filter-item">
          <p class="label">{{ $t('checks.order') }}</p>
          <div class="filter-list">
            <div
              v-for="item in order"
              :key="item.id"
              class="list-item"
              @click="orderFilter(item.id)"
            >
              <div class="icon" :class="{ active: item.selected }">
                <tickCircleIcon />
              </div>
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <button-oracle
        :text="$t('checks.confirm')"
        color="orange"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import tickCircleIcon from '@/assets/svg/tick-circle.svg?component'

const { t } = useI18n()

interface Props {
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})

const emit = defineEmits<{
  close: []
}>()

// Reactive state
const amount = ref([
  {
    id: 1,
    title: t('checks.ascendingFirst'),
    selected: true,
  },
  {
    id: 2,
    title: t('checks.descendingFirst'),
    selected: false,
  },
])

const order = ref([
  {
    id: 1,
    title: t('checks.oldestFirst'),
    selected: true,
  },
  {
    id: 2,
    title: t('checks.newestFirst'),
    selected: false,
  },
])

// Methods
const amountFilter = (id: number) => {
  amount.value = amount.value.map((item) => ({
    ...item,
    selected: item.id === id,
  }))
}

const orderFilter = (id: number) => {
  order.value = order.value.map((item) => ({
    ...item,
    selected: item.id === id,
  }))
}
</script>

<style lang="scss">
@use '@/assets/styles/components/checks/sort-by-modal.scss' as *;
</style>
