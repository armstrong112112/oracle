<template>
  <div class="change-pin__code">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.pinReset')"
      />
      <pin-code-change-content 
        @pin-removed="handlePinRemoved"
        @pin-update-requested="handlePinUpdateRequested"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PinCodeChangeContent from '~/widgets/moresettings/privacy-security/pin-code-change-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handlePinRemoved = () => {
  // Обработка удаления PIN-кода
  console.log('PIN code removed successfully')
  router.push(localePath('/moresettings/privacy-security'))
}

const handlePinUpdateRequested = () => {
  // Переход на страницу обновления PIN-кода
  router.push(localePath('/moresettings/privacy-security/pin-code/update'))
}
</script>

<style lang="scss">
.change-pin__code {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
  .block-nav-back {
    margin-bottom: 0;
  }
}
</style>
