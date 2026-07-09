<template>
  <div class="create-pin__code">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/moresettings/privacy-security')"
        :text="$t('moreSettings.setUpYourPin')"
      />
      <pin-code-create-content @pin-created="handlePinCreated" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PinCodeCreateContent from '~/widgets/moresettings/privacy-security/pin-code-create-content.vue'

const localePath = useLocalePath()
const router = useRouter()

const handlePinCreated = () => {
  // Обработка создания PIN-кода
  console.log('PIN code created successfully')
  router.push(localePath('/moresettings/privacy-security'))
}
</script>

<style lang="scss">
.create-pin__code {
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
