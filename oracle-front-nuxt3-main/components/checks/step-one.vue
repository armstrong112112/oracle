<template>
  <div class="create-check-step">
    <block-nav-back
      :text="$t('checks.checkCreation')"
      :to="localePath('/checks')"
      v-if="isMobile"
    />
    <div class="create-check__content">
      <PrePaidDepositForm :is-escrow="true" @update:amount="handleAmountUpdate" />
      <new-oracle-button
        :text="$t('checks.continue')"
        :color="coinConvert != '' ? 'yellow' : 'black'"
        @click="handleNextStep"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PrePaidDepositForm from '~/widgets/prepaid-cards/PrePaidDepositForm/index.vue'

const localePath = useLocalePath()

const emit = defineEmits<{
  nextStep: []
  prevStep: []
}>()

// Reactive state
const coinConvert = ref('')
const dollor = ref('')
const maxValue = '50'
const isFilled = ref(true)
const windowWidth = ref(0)
const convertInputRef = ref<HTMLInputElement | null>(null)

// Computed
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024
})

// Methods
const maxInput = () => {
  coinConvert.value = maxValue
  const inputEl = convertInputRef.value
  inputEl?.focus()

  coinConvertEvent()
}

const coinConvertEvent = () => {
  coinConvert.value = coinConvert.value.replace(',', '.')
  const parsed = parseFloat(coinConvert.value)

  if (!isNaN(parsed)) {
    dollor.value = String(parsed * 0.8)
    isFilled.value = false
  } else {
    dollor.value = ''
    isFilled.value = true
  }
}

const allowDecimalNumbers = (event: KeyboardEvent): void => {
  const key = event.key
  const isNumber = /^\d$/.test(key)
  const isDot = key === '.' || key === ','

  const target = event.target as HTMLInputElement
  const currentValue = target.value
  const alreadyHasDot =
    currentValue.includes('.') || currentValue.includes(',')

  if (!isNumber && !(isDot && !alreadyHasDot)) {
    event.preventDefault()
  }
}

const blockInvalidDecimalPaste = (event: ClipboardEvent): void => {
  event.preventDefault()
  let pasted = event.clipboardData?.getData('text') || ''

  pasted = pasted.replace(/,/g, '.')

  pasted = pasted.replace(/[^\d.]/g, '')

  const firstDotIndex = pasted.indexOf('.')
  if (firstDotIndex !== -1) {
    const beforeDot = pasted.slice(0, firstDotIndex + 1)
    const afterDot = pasted.slice(firstDotIndex + 1).replace(/\./g, '')
    pasted = beforeDot + afterDot
  }

  const target = event.target as HTMLInputElement
  const currentValue = target.value
  const selectionStart = target.selectionStart || 0
  const selectionEnd = target.selectionEnd || 0

  const newValue =
    currentValue.slice(0, selectionStart) +
    pasted +
    currentValue.slice(selectionEnd)

  target.value = newValue
}

const dollorEvent = () => {
  dollor.value = dollor.value.replace(',', '.')
  isFilled.value = dollor.value.trim() === ''

  const parsed = parseFloat(dollor.value)

  if (!isNaN(parsed)) {
    coinConvert.value = String(parsed * 1.2)
    isFilled.value = false
  } else {
    coinConvert.value = ''
    isFilled.value = true
  }
}

const prevStep = () => {
  emit('prevStep')
}

const handleNextStep = () => {
  console.log('handleNextStep called, coinConvert:', coinConvert.value)
  if (coinConvert.value !== '') {
    emit('nextStep')
  }
}

const handleAmountUpdate = (amount: number) => {
  console.log('handleAmountUpdate called with:', amount)
  coinConvert.value = amount > 0 ? amount.toString() : ''
  console.log('coinConvert updated to:', coinConvert.value)
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Lifecycle hooks
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss">
@use '@/assets/styles/components/checks/step-one.scss' as *;
</style>
