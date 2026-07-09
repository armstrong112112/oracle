<template>
  <div class="update-email__account">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.updateEmailAddress')"
      />
      <email-change-content @email-changed="handleEmailChanged" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EmailChangeContent from '~/widgets/moresettings/privacy-security/email-change-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handleEmailChanged = (email: string) => {
  // Обработка изменения email
  console.log('Email changed:', email)
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.update-email__account {
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
