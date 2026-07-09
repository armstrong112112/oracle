<template>
  <more-settings-template :title="$t('moreSettings.personalAccount')">
    <div class="personal-account">
      <div class="main-container">
        <block-nav-back
          :to="localePath('/moresettings')"
          :text="$t('moreSettings.personalAccount')"
          v-if="isMobile"
        />
        <div class="personal-account__photo">
          <div class="personal-account__avatar">
            <UserIcon />
          </div>
          <label for="changeFoto" class="personal-account__change-btn">
            <input id="changeFoto" type="file" class="form-input" />
            {{ $t('moreSettings.changeProfilePhoto') }}
          </label>
        </div>
        <form class="personal-account__form">
          <div class="personal-account__form-group">
            <input-oracle
              :label="$t('moreSettings.firstName')"
              type="text"
              :v="firstName"
              :restrict-input="true"
            />
            <input-oracle
              :label="$t('moreSettings.lastName')"
              type="text"
              :v="lastName"
              :restrict-input="true"
            />
            <input-oracle
              :label="$t('moreSettings.username')"
              type="text"
              :v="username"
              :restrict-input="true"
            />
          </div>
          <new-oracle-button :text="$t('moreSettings.confirm')" color="yellow" />
        </form>
      </div>
    </div>
  </more-settings-template>
</template>

<script setup lang="ts">
import UserIcon from '@/assets/svg/user-icon.svg?component'
import MoreSettingsTemplate from '~/widgets/moresettings/more-settings-template.vue'

const localePath = useLocalePath()

definePageMeta({
  layout: 'sidebar',
})

// Reactive state
const windowWidth = ref<number>(0)
const username = ref<string>('Vakko')
const firstName = ref<string>('Niko')
const lastName = ref<string>('Vakko_Design')

// Computed properties
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024
})

// Methods
const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
  }
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  // Layout is handled by definePageMeta
}

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" scoped>
.personal-account {
  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
    
    @media (min-width: 1024px) {
      max-width: 100%;
      padding: 0;
    }
  }
  &__photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 20px;
  }
  &__avatar {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-bottom: 16px;
    background: #1e1d28;
    overflow: hidden;
    svg {
      width: 32px;
      height: 32px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__change-btn {
    background: #1e1d28;
    border-radius: 12px;
    padding: 7px 13px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
    .form-input {
      display: none;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
  }
  &__form-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1 1 100%;
  }
  .new-oracle-button {
    line-height: 22px;
    border: 1px solid #2b2741;
    border-radius: 14px;
    padding: 10px 16px;
    &:hover {
      border-color: #f64e2a;
    }
  }
}
</style>
