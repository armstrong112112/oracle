<template>
  <div class="new-password">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.createNewPassword')"
      />
      <password-new-content @password-created="handlePasswordCreated" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordNewContent from '~/widgets/moresettings/privacy-security/password-new-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handlePasswordCreated = () => {
  // Обработка создания пароля
  console.log('Password created successfully')
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.new-password {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
}
</style>
