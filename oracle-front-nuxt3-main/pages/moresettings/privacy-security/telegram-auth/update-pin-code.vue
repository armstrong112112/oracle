<template>
  <div class="telegram-update">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security/telegram-auth')"
        :text="$t('moreSettings.updateLinkedTelegram')"
      />
      <telegram-auth-update-pin-content @code-submitted="handleCodeSubmitted" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TelegramAuthUpdatePinContent from '~/widgets/moresettings/privacy-security/telegram-auth-update-pin-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handleCodeSubmitted = () => {
  // Обработка отправки кода
  console.log('Code submitted successfully')
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.telegram-update {
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
