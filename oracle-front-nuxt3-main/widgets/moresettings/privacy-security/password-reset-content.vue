<template>
  <div class="password-reset-content">
    <form
      action="#"
      class="password-reset-content__form"
      @submit.prevent="enterPincode"
    >
      <h2 class="password-reset-content__title">
        {{ $t('moreSettings.resetYourPassword') }}
      </h2>
      <p class="password-reset-content__description">
        {{ $t('moreSettings.weSentResetCodeToEmail') }} <br />
        {{ $t('moreSettings.yourEmail') }}: youremail@gmail.com.
        {{ $t('moreSettings.enterCodeToCreateNewPassword') }}
      </p>
      <div class="input-group">
        <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
      </div>
      <div class="password-reset-content__button">
        <new-oracle-button
          v-if="isOpenCode"
          :text="$t('moreSettings.continue')"
          color="yellow"
          type="submit"
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
  'reset-code-submitted': []
}>()

// Reactive state
const isOpenCode = ref<boolean>(false)
const email = ref<string>('')

// Methods
const enterPincode = (event: Event) => {
  event.preventDefault()
  if (props.isModal) {
    emit('reset-code-submitted')
  }
}

const openPinCode = (pin: string[]) => {
  isOpenCode.value = pin.every((val) => val.trim() !== '')
}
</script>

<style lang="scss" scoped>
.password-reset-content {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
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