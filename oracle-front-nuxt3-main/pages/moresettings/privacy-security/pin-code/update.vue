<template>
  <div class="update-pin__code">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.pinUpdate')"
      />
      <pin-code-update-content @pin-updated="handlePinUpdated" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PinCodeUpdateContent from '~/widgets/moresettings/privacy-security/pin-code-update-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handlePinUpdated = () => {
  // Обработка обновления PIN-кода
  console.log('PIN code updated successfully')
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.update-pin__code {
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
