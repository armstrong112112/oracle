<template>
  <more-settings-template :title="$t('moreSettings.privacyAndSecurity')">
    <div class="privacy-security">
      <div class="main-container">
        <block-nav-back
          :to="localePath('/moresettings')"
          :text="$t('moreSettings.privacyAndSecurity')"
          v-if="isMobile"
        />
        <div class="privacy-security__form">
          <div class="privacy-security__group">
            <input-oracle
              type="text"
              :label="$t('moreSettings.email')"
              v="yourmail@gmail.com"
            />
            <new-oracle-button
              v-if="isMobile"
              :to="localePath('/moresettings/privacy-security/email')"
              class="update-btn"
              :text="$t('moreSettings.update')"
            />
            <new-oracle-button
              v-else
              @click="openEmailChangeModal"
              class="update-btn"
              :text="$t('moreSettings.update')"
            />
          </div>
          <div class="privacy-security__group">
            <input-oracle
              type="password"
              :label="$t('moreSettings.password')"
              v="***********"
            />
            <new-oracle-button
              v-if="isMobile"
              :to="localePath('/moresettings/privacy-security/password')"
              class="update-btn"
              :text="$t('moreSettings.update')"
            />
            <new-oracle-button
              v-else
              @click="openPasswordChangeModal"
              class="update-btn"
              :text="$t('moreSettings.update')"
            />
          </div>
        </div>
        <ul class="privacy-security__list">
          <li v-for="link in privacySecurity" :key="link.id" class="list-item">
            <app-feature-link
              :src="link.img"
              :text="link.title"
              :val="link.status"
              :tag="!isMobile ? 'div' : 'nuxt-link'"
              :to="link.to"
              @click.native="!isMobile ? handleLinkClick(link) : null"
              class="list-item-wrapper"
            />
          </li>
        </ul>
        <accordion-oracle />
        <privacy-security-modals
          :is-mobile="isMobile"
          :is-password-modal-open="modals.password"
          :is-password-new-modal-open="modals.passwordNew"
          :is-password-reset-modal-open="modals.passwordReset"
          :is-email-change-modal-open="modals.emailChange"
          :is-email-add-modal-open="modals.emailAdd"
          :is-pin-code-create-modal-open="modals.pinCreate"
          :is-pin-code-change-modal-open="modals.pinChange"
          :is-pin-code-update-modal-open="modals.pinUpdate"
          :is-telegram-auth-add-modal-open="modals.telegramAdd"
          :is-telegram-auth-update-modal-open="modals.telegramUpdate"
          :is-telegram-auth-pin-modal-open="modals.telegramPin"
          :is-telegram-auth-update-pin-modal-open="modals.telegramUpdatePin"
          :is-seed-code-modal-open="modals.seedCode"
          @close-password-modal="closeModal('password')"
          @close-password-new-modal="closeModal('passwordNew')"
          @close-password-reset-modal="closeModal('passwordReset')"
          @close-email-change-modal="closeModal('emailChange')"
          @close-email-add-modal="closeModal('emailAdd')"
          @close-pin-code-create-modal="closeModal('pinCreate')"
          @close-pin-code-change-modal="closeModal('pinChange')"
          @close-pin-code-update-modal="closeModal('pinUpdate')"
          @close-telegram-auth-add-modal="closeModal('telegramAdd')"
          @close-telegram-auth-update-modal="closeModal('telegramUpdate')"
          @close-telegram-auth-pin-modal="closeModal('telegramPin')"
          @close-telegram-auth-update-pin-modal="closeModal('telegramUpdatePin')"
          @close-seed-code-modal="closeModal('seedCode')"
          @password-changed="handleEvent('passwordChanged')"
          @password-created="handleEvent('passwordCreated')"
          @password-reset="handleEvent('passwordReset')"
          @email-changed="handleEvent('emailChanged')"
          @email-added="handleEvent('emailAdded')"
          @pin-code-created="handleEvent('pinCreated')"
          @pin-code-removed="handleEvent('pinRemoved')"
          @pin-code-update-requested="handleEvent('pinUpdateRequested')"
          @pin-code-updated="handleEvent('pinUpdated')"
          @telegram-auth-added="handleEvent('telegramAdded')"
          @telegram-auth-updated="handleEvent('telegramUpdated')"
          @telegram-auth-pin-submitted="handleEvent('telegramPinSubmitted')"
          @telegram-auth-update-pin-submitted="handleEvent('telegramUpdatePinSubmitted')"
          @telegram-auth-cancel="handleEvent('telegramCancel')"
          @seed-code-verified="handleEvent('seedCodeVerified')"
          @forgot-password="handleEvent('forgotPassword')"
        />
      </div>
    </div>
  </more-settings-template>
</template>

<script setup lang="ts">
import MoreSettingsTemplate from '~/widgets/moresettings/more-settings-template.vue'
import PrivacySecurityModals from '~/widgets/moresettings/privacy-security/privacy-security-modals.vue'

interface Modals {
  password: boolean
  passwordNew: boolean
  passwordReset: boolean
  emailChange: boolean
  emailAdd: boolean
  pinCreate: boolean
  pinChange: boolean
  pinUpdate: boolean
  telegramAdd: boolean
  telegramUpdate: boolean
  telegramPin: boolean
  telegramUpdatePin: boolean
  seedCode: boolean
}

definePageMeta({
  layout: 'sidebar',
})

const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const windowWidth = ref(0)
const modals = ref<Modals>({
  password: false,
  passwordNew: false,
  passwordReset: false,
  emailChange: false,
  emailAdd: false,
  pinCreate: false,
  pinChange: false,
  pinUpdate: false,
  telegramAdd: false,
  telegramUpdate: false,
  telegramPin: false,
  telegramUpdatePin: false,
  seedCode: false,
})

const userSecurityStatus = ref({
  password: false,
  email: false,
  pinCode: true,
  telegramAuth: true,
  seedCode: true,
})

const isMobile = computed(() => windowWidth.value < 1024)

const privacySecurity = computed(() => {
  const status = userSecurityStatus.value
  return [
    {
      id: 1,
      to: status.password ? localePath('/moresettings/privacy-security/password') : localePath('/moresettings/privacy-security/password/new'),
      img: '/svg/moresettings/password-icon.svg',
      title: t('moreSettings.password'),
      status: status.password ? t('moreSettings.change') : t('moreSettings.setUp'),
    },
    {
      id: 2,
      to: status.email ? localePath('/moresettings/privacy-security/email') : localePath('/moresettings/privacy-security/email/add'),
      img: '/svg/moresettings/mail-icon.svg',
      title: t('moreSettings.email'),
      status: status.email ? t('moreSettings.change') : t('moreSettings.setUp'),
    },
    {
      id: 3,
      to: status.pinCode ? localePath('/moresettings/privacy-security/pin-code/change') : localePath('/moresettings/privacy-security/pin-code/'),
      img: '/svg/moresettings/pin-code.svg',
      title: t('moreSettings.pinCode'),
      status: status.pinCode ? t('moreSettings.change') : t('moreSettings.setUp'),
    },
    {
      id: 4,
      to: status.telegramAuth ? localePath('/moresettings/privacy-security/telegram-auth/update') : localePath('/moresettings/privacy-security/telegram-auth'),
      img: '/svg/moresettings/telegram-authorization.svg',
      title: t('moreSettings.telegramAuthorization'),
      status: status.telegramAuth ? t('moreSettings.change') : t('moreSettings.setUp'),
    },
    {
      id: 5,
      to: status.seedCode ? localePath('/moresettings/privacy-security/seed-code') : localePath('/moresettings/privacy-security/seed-code/new'),
      img: '/svg/moresettings/seed-code.svg',
      title: t('moreSettings.seedCode'),
      status: status.seedCode ? t('moreSettings.verify') : t('moreSettings.setUp'),
    },
  ]
})

const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
  }
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  setPageLayout(newLayout)
}

const openModal = (type: string) => {
  const modalMap: { [key: string]: keyof Modals } = {
    password: userSecurityStatus.value.password ? 'password' : 'passwordNew',
    email: userSecurityStatus.value.email ? 'emailChange' : 'emailAdd',
    pinCode: userSecurityStatus.value.pinCode ? 'pinChange' : 'pinCreate',
    telegramAuth: userSecurityStatus.value.telegramAuth ? 'telegramUpdate' : 'telegramAdd',
    seedCode: 'seedCode',
  }
  const modalKey = modalMap[type] || (type as keyof Modals)
  modals.value[modalKey] = true
}

const openPasswordChangeModal = () => {
  modals.value.password = true
}

const openEmailChangeModal = () => {
  modals.value.emailChange = true
}

const closeModal = (type: string) => {
  modals.value[type as keyof Modals] = false
}

const handleEvent = (event: string, data?: any) => {
  const actions: { [key: string]: () => void } = {
    passwordChanged: () => closeModal('password'),
    passwordCreated: () => { closeModal('password'); userSecurityStatus.value.password = true },
    passwordReset: () => closeModal('passwordReset'),
    emailChanged: () => { closeModal('emailChange'); userSecurityStatus.value.email = true },
    emailAdded: () => { closeModal('emailAdd'); userSecurityStatus.value.email = true },
    pinCreated: () => { closeModal('pinCreate'); userSecurityStatus.value.pinCode = true },
    pinRemoved: () => { closeModal('pinChange'); userSecurityStatus.value.pinCode = false },
    pinUpdateRequested: () => { closeModal('pinChange'); modals.value.pinUpdate = true },
    pinUpdated: () => closeModal('pinUpdate'),
    telegramAdded: () => { closeModal('telegramAdd'); modals.value.telegramPin = true },
    telegramUpdated: () => { closeModal('telegramUpdate'); modals.value.telegramUpdatePin = true },
    telegramPinSubmitted: () => { closeModal('telegramPin'); userSecurityStatus.value.telegramAuth = true },
    telegramUpdatePinSubmitted: () => closeModal('telegramUpdatePin'),
    telegramCancel: () => { closeModal('telegramAdd'); closeModal('telegramUpdate') },
    seedCodeVerified: () => { closeModal('seedCode'); userSecurityStatus.value.seedCode = true },
    forgotPassword: () => { closeModal('password'); router.push(localePath('/moresettings/privacy-security/password/reset')) },
  }
  actions[event]?.()
  console.log(`${event} event handled`, data)
}

const handleLinkClick = (link: any) => {
  const modalTypes: { [key: string]: string } = {
    [t('moreSettings.password')]: 'password',
    [t('moreSettings.email')]: 'email',
    [t('moreSettings.pinCode')]: 'pinCode',
    [t('moreSettings.telegramAuthorization')]: 'telegramAuth',
    [t('moreSettings.seedCode')]: 'seedCode',
  }
  openModal(modalTypes[link.title])
}

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

<style lang="scss">
@use '@/assets/styles/pages/privacy-security.scss' as *;
</style>