<template>
  <div class="external-transfer__step-one">
    <input-oracle
      v-if="!addressSelected"
      :scan="true"
      :saved="true"
      :external="true"
      :placeholder="$t('transfers.address')"
    />
    <div v-else class="address-selected">
      <div class="left-block">
        <div class="coin-img">
          <CoinIcon />
        </div>
        <div class="address-info">
          <h4 class="address-title">{{ $t('transfers.webcumLtcAddress') }}</h4>
          <h5 class="address-code">92das8d9asdh89dsa8dupaosd2e32</h5>
        </div>
      </div>
      <button class="clear-btn">
        <ClearImg />
      </button>
    </div>
    <div class="form-control">
      <input
        ref="amountInputRef"
        v-model="amount"
        type="text"
        inputmode="decimal"
        pattern="[0-9]*[.,]?[0-9]*"
        placeholder="0.00"
        class="form-input"
        :class="{ error_input: errorInput }"
        @input="updateAmount"
        @keypress="allowDecimalNumbers"
        @paste="blockInvalidDecimalPaste"
      />
      <span v-if="errorInput" class="error-text">{{
        $t('transfers.insufficientFunds')
      }}</span>
    </div>
    <div class="external-transfer_select">
      <h5 class="from-text">{{ $t('transfers.fromText') }}</h5>
      <coin-select name="USDT" price="2500 USDT" amount="2500" />
    </div>
    <div class="number-pad">
      <button
        v-for="n in 9"
        :key="n"
        class="number-btn"
        @click="appendNumber(n.toString())"
      >
        {{ n }}
      </button>
      <button class="action-btn max-btn" @click="setMax()">
        {{ $t('transfers.max') }}
      </button>
      <button class="number-btn" @click="appendNumber('0')">0</button>
      <button
        class="action-btn confirm-btn"
        @mousedown="startDeleting"
        @mouseup="stopDeleting"
        @mouseleave="stopDeleting"
        @touchstart="startDeleting"
        @touchend="stopDeleting"
        @touchcancel="stopDeleting"
      >
        <ClearIcon />
      </button>
    </div>
    <button-oracle
      :text="$t('transfers.transfer')"
      color="orange"
      @click="$emit('nextStep')"
    />
    <draggable-modal :is-open="isOpen" @close="isOpen = false">
      <h1 class="modal-title">{{ $t('transfers.savedAddresses') }}</h1>
      <ul class="saved-addresses__list">
        <li v-for="item of 6" :key="item" class="list-item">
          <div class="coin-img">
            <CoinIcon />
          </div>
          <div class="address-info">
            <h4 class="address-title">
              {{ $t('transfers.webcumLtcAddress') }}
            </h4>
            <h5 class="address-code">92das8d9asdh89dsa8dupaosd2e32</h5>
          </div>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>

<script setup lang="ts">
import ClearIcon from '@/assets/svg/input-clear.svg?component'
import CoinIcon from '@/assets/svg/usdt.svg?component'
import ClearImg from '@/assets/svg/clear-icon.svg?component'

const emit = defineEmits<{
  nextStep: []
}>()

// Reactive state
const amountInputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const addressSelected = ref(false)
const errorInput = ref(false)
const amount = ref('')
const previousAmount = ref('')
const deleteInterval = ref<number | null>(null)

// Computed
const amountAsNumber = computed((): number => {
  return Number(amount.value)
})

// Methods
const checkAmount = (): void => {
  const value = Number(amount.value)
  errorInput.value = value > 2999
}

const watchAmount = () => {
  checkAmount()
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

  amount.value = newValue
  updateAmount()
}

const appendNumber = (num: string): void => {
  amount.value += num
  updateAmount()
}

const setMax = (): void => {
  amount.value = '2999'
  updateAmount()
}

const deleteOnce = (): void => {
  if (amount.value.length > 0) {
    if (amount.value.endsWith('.') && /^\d+\.$/.test(amount.value)) {
      amount.value = amount.value.slice(0, -1)
    } else {
      amount.value = amount.value.slice(0, -1)
    }
  }
  updateAmount()
}

const startDeleting = (): void => {
  deleteOnce()
  deleteInterval.value = window.setInterval(() => {
    deleteOnce()
  }, 100)
}

const stopDeleting = (): void => {
  if (deleteInterval.value) {
    clearInterval(deleteInterval.value)
    deleteInterval.value = null
  }
}

const updateAmount = () => {
  amount.value = amount.value.replace(',', '.')
  errorInput.value =
    (Number(amount.value) < 1 || Number(amount.value) > 2999) &&
    amount.value !== ''
}

// Lifecycle hooks
onMounted(() => {
  checkAmount()
})
</script>

<style lang="scss">
@use '@/assets/styles/components/transfer/external/step-one.scss' as *;
</style>
