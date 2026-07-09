<template>
  <div class="telegram-auth-code">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.telegramAuthorization')"
      />
      <telegram-auth-pin-content @code-submitted="handleCodeSubmitted" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TelegramAuthPinContent from '~/widgets/moresettings/privacy-security/telegram-auth-pin-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handleCodeSubmitted = () => {
  // Обработка отправки кода
  console.log('Code submitted successfully')
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.telegram-auth-code {
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
