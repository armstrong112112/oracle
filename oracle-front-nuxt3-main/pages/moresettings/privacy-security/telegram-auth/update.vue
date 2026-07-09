<template>
  <div class="telegram-auth">
    <div class="main-container">
      <telegram-auth-update-content 
        @phone-submitted="handlePhoneSubmitted"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TelegramAuthUpdateContent from '~/widgets/moresettings/privacy-security/telegram-auth-update-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handlePhoneSubmitted = (phone: string) => {
  // Обработка отправки номера телефона
  console.log('Phone submitted:', phone)
  router.push(localePath('/moresettings/privacy-security/telegram-auth/update-pin-code'))
}

const handleCancel = () => {
  // Обработка отмены
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
@use '@/assets/styles/pages/_telegram-auth.scss' as *;
</style>
