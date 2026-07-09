<template>
  <div class="telegram-auth-pin-content">
    <form class="telegram-auth-pin-content__form">
      <h2 class="telegram-auth-pin-content__title">
        {{ $t('moreSettings.verifyAccountViaTelegram') }}
      </h2>
      <p class="telegram-auth-pin-content__description">
        {{ $t('moreSettings.enterCodeSentByBot') }} <br />
        {{ $t('moreSettings.toCompleteTelegramLinking') }}
      </p>
      <div class="input-group">
        <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
      </div>
      <div class="telegram-auth-pin-content__button">
        <new-oracle-button
          :text="$t('moreSettings.goToOracleOTPBot')"
          :color="{ yellow: isOpenCode }"
          @click="handleSubmit"
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
  'code-submitted': []
}>()

// Reactive state
const isOpenCode = ref<boolean>(false)

// Methods
const openPinCode = (pin: string[]) => {
  isOpenCode.value = pin.every((val) => val.trim() !== '')
}

const handleSubmit = () => {
  if (props.isModal) {
    emit('code-submitted')
  }
}
</script>

<style lang="scss" scoped>
.telegram-auth-pin-content {
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
      padding: 11px;
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