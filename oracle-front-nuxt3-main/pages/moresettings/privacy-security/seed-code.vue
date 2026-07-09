<template>
  <div class="seed-code">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.seedCode')"
      />
      <seed-code-content 
        @verification-completed="handleVerificationCompleted"
        @contact-support="handleContactSupport"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SeedCodeContent from '~/widgets/moresettings/privacy-security/seed-code-content.vue'

const localePath = useLocalePath()

const handleVerificationCompleted = (selectedOrder: string[]) => {
  // Обработка завершения верификации
  console.log('Verification completed:', selectedOrder)
}

const handleContactSupport = () => {
  // Обработка обращения в поддержку
  console.log('Contact support requested')
}
</script>

<style lang="scss">
@use '@/assets/styles/pages/_seed-code.scss' as *;
</style>
