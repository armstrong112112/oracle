<template>
  <div class="password-reset">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.passwordReset')"
      />
      <password-reset-content @reset-code-submitted="handleResetCodeSubmitted" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordResetContent from '~/widgets/moresettings/privacy-security/password-reset-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handleResetCodeSubmitted = () => {
  // Обработка отправки кода сброса
  console.log('Reset code submitted')
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.password-reset {
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
