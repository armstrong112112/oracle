<template>
  <div class="email-add-content">
    <form
      v-if="step === 1"
      action="#"
      class="email-add-content__form"
      @submit.prevent="enterPincode"
    >
      <input-oracle
        type="email"
        :placeholder="$t('moreSettings.yourEmail')"
        @changed="onChanged"
      />
      <div class="email-add-content__button">
        <new-oracle-button
          :text="$t('moreSettings.continue')"
          :color="isValidEmail ? 'yellow' : 'black'"
          type="submit"
        />
      </div>
    </form>
    <form v-if="step === 2" action="#" class="email-add-content__pin-form">
      <h2 class="email-add-content__title">
        {{ $t('moreSettings.addEmail') }}
      </h2>
      <p class="email-add-content__description">
        {{ $t('moreSettings.weSentConfirmationOTP') }} <br />
        {{ $t('moreSettings.yourEmail') }}: youremail@gmail.com.
      </p>
      <div class="input-group">
        <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
      </div>
      <div class="email-add-content__button">
        <p class="resend-info">
          {{ $t('moreSettings.didntReceiveCode') }}
          <span class="resend-timer">{{
            $t('moreSettings.resendIn30s')
          }}</span>
        </p>
        <new-oracle-button
          v-if="isOpenCode"
          :text="$t('moreSettings.continue')"
          color="yellow"
          @click="handleContinue"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const emit = defineEmits<{
  'email-added': [email: string]
}>()

// Reactive state
const step = ref<number>(1)
const isOpenCode = ref<boolean>(false)
const email = ref<string>('')

// Computed properties
const isValidEmail = computed((): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email.value)
})

// Methods
const enterPincode = (event: Event) => {
  event.preventDefault()
  if (!isValidEmail.value) {
    return
  }
  step.value = 2
}

const openPinCode = (pin: string[]) => {
  isOpenCode.value = pin.every((val) => val.trim() !== '')
}

const onChanged = (emailValue: string) => {
  email.value = emailValue
}

const handleContinue = () => {
  if (props.isModal) {
    emit('email-added', email.value)
  }
}
</script>

<style lang="scss" scoped>
.email-add-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1 1 100%;
    height: 100%;
    justify-content: space-between;
  }

  &__pin-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1 1 100%;
    height: 100%;
  }

  &__title {
    margin-bottom: 8px;
    font-family: 'Hector', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }

  &__description {
    margin-bottom: 24px;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__button {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .resend-info {
      padding: 13px 0;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
      color: #fff;
      
      .resend-timer {
        color: #b2aaf9;
      }
    }

    .new-oracle-button {
      line-height: 22px;
      padding: 9.5px;
      border: 2px solid #2b2741;
      border-radius: 14px;
      box-sizing: border-box;
      
      &.black {
        background: #13121b;
        color: #67639a;
        &:hover {
          background: #13121b;
          box-shadow: none;
        }
      }
      
      &.yellow {
        border-color: #f64e2a;
      }
    }
  }
}
</style> 