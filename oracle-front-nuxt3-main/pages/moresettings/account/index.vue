<template>
  <div class="account-settings">
    <block-nav-back
      :text="$t('moreSettings.accountSettings')"
      :to="localePath('/moresettings')"
    />
    <div class="change-password">
      <div class="left-content">
        <p class="label">{{ $t('moreSettings.password') }}</p>
        <input
          class="password-input"
          type="password"
          placeholder="**********"
          value="1234567890"
          disabled
        />
      </div>
      <nuxt-link
        :to="localePath('/moresettings/account/change-password')"
        class="change-link"
      >
        {{ $t('moreSettings.change') }}
      </nuxt-link>
    </div>
    <div class="additional-security">
      <h1 class="block-title">{{ $t('moreSettings.additionalSecurity') }}</h1>
      <security-cards-list :cards="securityCards" />
    </div>
    <ActiveSessionsList
      :sessions="activeSession"
      @update:sessions="updateSessions"
    />
  </div>
</template>

<script setup lang="ts">
import ActiveSessionsList from '@/widgets/moresettings/account/ActiveSessions/index.vue'
import SecurityCardsList from '@/widgets/moresettings/account/SecurityCardsList/index.vue'

definePageMeta({
  layout: 'mobile',
})

const localePath = useLocalePath()

const activeSession = ref([
  {
    id: 1,
    title: 'iOS - Mobile Safari 17.0',
    active: false,
  },
  {
    id: 2,
    title: 'iOS - Mobile Safari 17.0',
    active: true,
  },
])

const securityCards = [
  {
    title: 'Email Address Authorization',
    description: 'Recover your account if you forget your password',
    infoText: 'We will send password reset instructions to your email',
    isActive: false,
    details: 'Email address: user@gmail.com',
    buttonTextActive: 'CHANGE EMAIL ADDRESS',
    buttonTextNoActive: 'CONNECT YOUR EMAIL NOW',
    routeActive: '/moresettings/account/change-email-address',
    routeNoActive: '/moresettings/account/email-auth',
  },
  {
    title: 'Telegram Authorization',
    description: "Log in with one click and enhance your account's security",
    infoText: 'Get instant notifications and secure login via Telegram',
    isActive: true,
    details: 'Linked account: @UserUser',
    buttonTextActive: 'CHANGE LINKED ACCOUNT',
    buttonTextNoActive: 'CONNECT YOUR TELEGRAM NOW',
    routeActive: '/moresettings/account/change-link-address',
    routeNoActive: '/moresettings/account/telegram-auth',
  },
  {
    title: 'PIN Code',
    description: 'Protect your funds even if your phone is compromised',
    infoText: '4-digit code required for sensitive operations',
    isActive: true,
    details: 'Set PIN Code: ••••',
    buttonTextActive: 'CHANGE PIN CODE',
    buttonTextNoActive: 'SET UP PIN CODE',
    routeActive: '/moresettings/account/change-pincode',
    routeNoActive: '/moresettings/account/setup-pincode',
  },
]

const updateSessions = (updatedSessions: Array<any>) => {
  activeSession.value = updatedSessions
}
</script>

<style lang="scss">
@use '@/assets/styles/pages/_moresettings-account.scss' as *;
</style>
