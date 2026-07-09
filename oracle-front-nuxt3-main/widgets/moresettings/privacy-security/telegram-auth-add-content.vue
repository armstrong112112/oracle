<template>
  <div class="telegram-auth-add-content">
    <div class="telegram-auth-add-content__content">
      <div class="telegram-auth-add-content__header">
        <TelegramIcon class="telegram-icon" />
        <Logo />
      </div>
      <h1 class="telegram-auth-add-content__title">
        {{ $t('moreSettings.logInToUseTelegram') }}<br />
        {{ $t('moreSettings.accountWithExampleAndBot') }}
      </h1>
      <p class="telegram-auth-add-content__description">
        {{ $t('moreSettings.enterPhoneNumberInternational') }}
      </p>

      <phone-input
        @country-selected="onCountrySelected"
        @phone-changed="onPhoneChanged"
        @phone-input-max-length="onPhoneInputMaxLengthChanged"
      />
    </div>
    <div class="telegram-auth-add-content__button">
      <new-oracle-button 
        :text="$t('moreSettings.cancel')" 
        @click="handleCancel"
      />
      <new-oracle-button
        :text="$t('moreSettings.next')"
        color="yellow"
        @click="handleNext"
        :disabled="phoneInputMaxLength !== phoneNumberRaw.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TelegramIcon from '@/assets/svg/telegram-original.svg?component'
import Logo from '@/assets/svg/logo.svg?component'
import PhoneInput from '~/components/ui/PhoneInput.vue'

interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const emit = defineEmits<{
  cancel: []
  'phone-submitted': [phone: string]
}>()

const phoneNumberRaw = ref<string>('')
const phoneInputMaxLength = ref<number>(9)
const countries = ref<any[]>([])

const onCountrySelected = (country: any) => {
  // Обработка выбора страны
}

const onPhoneChanged = (phone: string) => {
  phoneNumberRaw.value = phone
}

const onPhoneInputMaxLengthChanged = (maxLength: number) => {
  phoneInputMaxLength.value = maxLength
}

const handleCancel = () => {
  if (props.isModal) {
    emit('cancel')
  }
}

const handleNext = () => {
  if (props.isModal && phoneInputMaxLength.value === phoneNumberRaw.value.length) {
    emit('phone-submitted', phoneNumberRaw.value)
  }
}
</script>

<style lang="scss" scoped>
.telegram-auth-add-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1 1 100%;

  &__content {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
    svg {
      width: 64px;
      height: 64px;
    }
  }

  &__title {
    margin-bottom: 32px;
    font-family: 'Hector', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    text-align: center;
    color: #fff;
  }

  &__description {
    margin-bottom: 48px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    text-align: center;
    color: #fff;
  }

  &__button {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .new-oracle-button {
      line-height: 22px;
      padding: 11px;
    }
  }
}
</style> 