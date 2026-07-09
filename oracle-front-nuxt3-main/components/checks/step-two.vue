<template>
  <div class="create-check-step step-two">
    <block-nav-back
      :text="$t('checks.checkCreation')"
      @prev="prevStep"
      v-if="isMobile"
    />
    <div class="create-check__content">
      <div class="form-control">
        <label for="#" class="form-label">{{
          $t('checks.enterNumberOfActivations')
        }}</label>
        <input
          id="activations"
          ref="convertInputRef"
          v-model="activations"
          type="text"
          inputmode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          class="form-input"
          :placeholder="$t('checks.maximumActivationsPlaceholder')"
          @input="convertedUSDT(activations)"
          @keypress="allowDecimalNumbers"
          @paste="blockInvalidDecimalPaste"
        />
        <label for="#" class="form-label label-bottom">{{
          $t('checks.upTo10ActivationsAvailable')
        }}</label>
      </div>
      <div class="bottom">
        <div v-if="convert != 0" class="currency-usd">
          <span class="amount-in-usd">
            <span class="value">$ {{ convert }}</span> / per
          </span>
          <span class="approximate-price amount-in-usd" v-if="!isMobile">≈$ {{ convert }}</span>
        </div>
        <new-oracle-button
          :text="$t('checks.continue')"
          :to="
            convert != 0
              ? localePath('/checks/check-creation/check-details')
              : ''
          "
          :color="convert != 0 ? 'yellow' : 'black'"
        />
      </div>
    </div>
    <adresses-modal
      :is-visible="false"
      class="check-created__successfully error-modal"
    >
      <div class="modal-in">
        <div class="modal-head">
          <div class="icon">
            <ErrorIcon />
          </div>
          <h3 class="modal-title">{{ $t('checks.checkAlreadyActivated') }}</h3>
        </div>
        <div class="modal-body">
          <p class="body-title">{{ $t('checks.reason') }}</p>
          <p class="body-description">
            {{ $t('checks.checkAlreadyClaimed') }}
          </p>
          <p class="body-description">
            {{ $t('checks.tryAgain') }}
          </p>
        </div>
      </div>
      <new-oracle-button :text="$t('checks.returnToWallet')" color="yellow" />
    </adresses-modal>
    <adresses-modal
      :is-visible="false"
      class="check-created__successfully successfully-modal"
    >
      <div class="modal-in">
        <div class="modal-head">
          <div class="icon">
            <SuccessfullIcon />
          </div>
          <h3 class="modal-title">
            {{ $t('checks.checkActivatedSuccessfully') }}
          </h3>
        </div>
        <div class="modal-body">
          <p class="body-title">
            {{ $t('checks.youHaveReceived') }}: 1.902 USDT
          </p>
          <p class="body-description">
            {{ $t('checks.totalAmountReceived') }}: 2.6 USDT
          </p>
        </div>
      </div>
      <new-oracle-button :text="$t('checks.returnToWallet')" color="yellow" />
    </adresses-modal>
  </div>
</template>

<script setup lang="ts">
import SuccessfullIcon from '@/assets/svg/checks-succesfull.svg?component'
import ErrorIcon from '@/assets/svg/check-error.svg?component'

const localePath = useLocalePath()

const emit = defineEmits<{
  prevStep: []
}>()

// Reactive state
const convert = ref(0)
const activations = ref('')
const shareUrl = 'https://oraclehub.su/check382941940509230950923450-92345-923-050-23403240324095г2390'
const windowWidth = ref(0)
const convertInputRef = ref<HTMLInputElement | null>(null)

// Computed
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024
})

// Methods
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const shareContent = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        url: shareUrl,
      })
    } catch (error) {
      console.error(error)
    }
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

const convertedUSDT = (v: string) => {
  convert.value = parseFloat((Number(v) * 35.51).toFixed(2))
}

const prevStep = () => {
  emit('prevStep')
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
@use '@/assets/styles/components/checks/step-two.scss' as *;
</style>
