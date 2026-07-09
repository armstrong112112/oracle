<template>
  <div class="change-password">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.changePassword')"
      />
      <password-change-content 
        @password-changed="handlePasswordChanged"
        @forgot-password="handleForgotPassword"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordChangeContent from '~/widgets/moresettings/privacy-security/password-change-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handlePasswordChanged = () => {
  // Обработка изменения пароля
  console.log('Password changed successfully')
  router.push(localePath('/moresettings/privacy-security'))
}

const handleForgotPassword = () => {
  // Переход на страницу сброса пароля
  router.push(localePath('/moresettings/privacy-security/password/reset'))
}
</script>

<style lang="scss">
@use '@/assets/styles/pages/moresettings-password.scss' as *;
</style>
