<template>
  <div class="add-email__account">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.connectEmailAddress')"
      />
      <email-add-content @email-added="handleEmailAdded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EmailAddContent from '~/widgets/moresettings/privacy-security/email-add-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handleEmailAdded = (email: string) => {
  // Обработка добавления email
  console.log('Email added:', email)
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.add-email__account {
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
