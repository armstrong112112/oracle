<template>
  <div>
    <!-- Password Change Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isPasswordModalOpen"
      :title="$t('moreSettings.changePassword')"
      @close="closePasswordModal"
      :max-width="'500px'"
    >
      <password-change-content 
        :is-modal="true" 
        @password-changed="handlePasswordChanged"
        @forgot-password="handleForgotPassword"
      />
    </bills-modal>

    <!-- Password New Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isPasswordNewModalOpen"
      :title="$t('moreSettings.createNewPassword')"
      @close="closePasswordNewModal"
      :max-width="'500px'"
    >
      <password-new-content 
        :is-modal="true" 
        @password-created="handlePasswordCreated"
      />
    </bills-modal>

    <!-- Password Reset Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isPasswordResetModalOpen"
      :title="$t('moreSettings.passwordReset')"
      @close="closePasswordResetModal"
      :max-width="'500px'"
    >
      <password-reset-content 
        :is-modal="true" 
        @reset-code-submitted="handlePasswordReset"
      />
    </bills-modal>

    <!-- Email Change Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isEmailChangeModalOpen"
      :title="$t('moreSettings.updateEmailAddress')"
      @close="closeEmailChangeModal"
      :max-width="'500px'"
    >
      <email-change-content 
        :is-modal="true" 
        @email-changed="handleEmailChanged"
      />
    </bills-modal>

    <!-- Email Add Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isEmailAddModalOpen"
      :title="$t('moreSettings.connectEmailAddress')"
      @close="closeEmailAddModal"
      :max-width="'500px'"
    >
      <email-add-content 
        :is-modal="true" 
        @email-added="handleEmailAdded"
      />
    </bills-modal>

    <!-- Pin Code Create Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isPinCodeCreateModalOpen"
      :title="$t('moreSettings.setUpYourPin')"
      @close="closePinCodeCreateModal"
      :max-width="'500px'"
    >
      <pin-code-create-content 
        :is-modal="true" 
        @pin-created="handlePinCodeCreated"
      />
    </bills-modal>

    <!-- Pin Code Change Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isPinCodeChangeModalOpen"
      :title="$t('moreSettings.pinReset')"
      @close="closePinCodeChangeModal"
      :max-width="'500px'"
    >
      <pin-code-change-content 
        :is-modal="true" 
        @pin-removed="handlePinCodeRemoved"
        @pin-update-requested="handlePinCodeUpdateRequested"
      />
    </bills-modal>

    <!-- Pin Code Update Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isPinCodeUpdateModalOpen"
      :title="$t('moreSettings.pinUpdate')"
      @close="closePinCodeUpdateModal"
      :max-width="'500px'"
    >
      <pin-code-update-content 
        :is-modal="true" 
        @pin-updated="handlePinCodeUpdated"
      />
    </bills-modal>

    <!-- Telegram Auth Add Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isTelegramAuthAddModalOpen"
      :title="$t('moreSettings.telegramAuthorization')"
      @close="closeTelegramAuthAddModal"
      :max-width="'600px'"
    >
      <telegram-auth-add-content 
        :is-modal="true" 
        @phone-submitted="handleTelegramAuthAdded"
        @cancel="handleTelegramAuthCancel"
      />
    </bills-modal>

    <!-- Telegram Auth Update Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isTelegramAuthUpdateModalOpen"
      :title="$t('moreSettings.updateLinkedTelegram')"
      @close="closeTelegramAuthUpdateModal"
      :max-width="'600px'"
    >
      <telegram-auth-update-content 
        :is-modal="true" 
        @phone-submitted="handleTelegramAuthUpdated"
        @cancel="handleTelegramAuthCancel"
      />
    </bills-modal>

    <!-- Telegram Auth Pin Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isTelegramAuthPinModalOpen"
      :title="$t('moreSettings.telegramAuthorization')"
      @close="closeTelegramAuthPinModal"
      :max-width="'500px'"
    >
      <telegram-auth-pin-content 
        :is-modal="true" 
        @code-submitted="handleTelegramAuthPinSubmitted"
      />
    </bills-modal>

    <!-- Telegram Auth Update Pin Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isTelegramAuthUpdatePinModalOpen"
      :title="$t('moreSettings.updateLinkedTelegram')"
      @close="closeTelegramAuthUpdatePinModal"
      :max-width="'500px'"
    >
      <telegram-auth-update-pin-content 
        :is-modal="true" 
        @code-submitted="handleTelegramAuthUpdatePinSubmitted"
      />
    </bills-modal>

    <!-- Seed Code Modal for Desktop -->
    <bills-modal
      v-if="!isMobile"
      :is-open="isSeedCodeModalOpen"
      :title="$t('moreSettings.seedCode')"
      @close="closeSeedCodeModal"
      :max-width="'500px'"
    >
      <seed-code-content 
        :is-modal="true" 
        @verification-completed="handleSeedCodeVerified"
      />
    </bills-modal>
  </div>
</template>

<script setup lang="ts">
import BillsModal from '@/components/bills-modal.vue'
import PasswordChangeContent from '~/widgets/moresettings/privacy-security/password-change-content.vue'
import PasswordNewContent from '~/widgets/moresettings/privacy-security/password-new-content.vue'
import PasswordResetContent from '~/widgets/moresettings/privacy-security/password-reset-content.vue'
import EmailChangeContent from '~/widgets/moresettings/privacy-security/email-change-content.vue'
import EmailAddContent from '~/widgets/moresettings/privacy-security/email-add-content.vue'
import PinCodeCreateContent from '~/widgets/moresettings/privacy-security/pin-code-create-content.vue'
import PinCodeChangeContent from '~/widgets/moresettings/privacy-security/pin-code-change-content.vue'
import PinCodeUpdateContent from '~/widgets/moresettings/privacy-security/pin-code-update-content.vue'
import TelegramAuthAddContent from '~/widgets/moresettings/privacy-security/telegram-auth-add-content.vue'
import TelegramAuthUpdateContent from '~/widgets/moresettings/privacy-security/telegram-auth-update-content.vue'
import TelegramAuthPinContent from '~/widgets/moresettings/privacy-security/telegram-auth-pin-content.vue'
import TelegramAuthUpdatePinContent from '~/widgets/moresettings/privacy-security/telegram-auth-update-pin-content.vue'
import SeedCodeContent from '~/widgets/moresettings/privacy-security/seed-code-content.vue'

interface Props {
  isMobile?: boolean
  isPasswordModalOpen?: boolean
  isPasswordNewModalOpen?: boolean
  isPasswordResetModalOpen?: boolean
  isEmailChangeModalOpen?: boolean
  isEmailAddModalOpen?: boolean
  isPinCodeCreateModalOpen?: boolean
  isPinCodeChangeModalOpen?: boolean
  isPinCodeUpdateModalOpen?: boolean
  isTelegramAuthAddModalOpen?: boolean
  isTelegramAuthUpdateModalOpen?: boolean
  isTelegramAuthPinModalOpen?: boolean
  isTelegramAuthUpdatePinModalOpen?: boolean
  isSeedCodeModalOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false,
  isPasswordModalOpen: false,
  isPasswordNewModalOpen: false,
  isPasswordResetModalOpen: false,
  isEmailChangeModalOpen: false,
  isEmailAddModalOpen: false,
  isPinCodeCreateModalOpen: false,
  isPinCodeChangeModalOpen: false,
  isPinCodeUpdateModalOpen: false,
  isTelegramAuthAddModalOpen: false,
  isTelegramAuthUpdateModalOpen: false,
  isTelegramAuthPinModalOpen: false,
  isTelegramAuthUpdatePinModalOpen: false,
  isSeedCodeModalOpen: false,
})

const emit = defineEmits<{
  'close-password-modal': []
  'close-password-new-modal': []
  'close-password-reset-modal': []
  'close-email-change-modal': []
  'close-email-add-modal': []
  'close-pin-code-create-modal': []
  'close-pin-code-change-modal': []
  'close-pin-code-update-modal': []
  'close-telegram-auth-add-modal': []
  'close-telegram-auth-update-modal': []
  'close-telegram-auth-pin-modal': []
  'close-telegram-auth-update-pin-modal': []
  'close-seed-code-modal': []
  'password-changed': []
  'password-created': []
  'password-reset': []
  'email-changed': [email: string]
  'email-added': [email: string]
  'pin-code-created': []
  'pin-code-removed': []
  'pin-code-update-requested': []
  'pin-code-updated': []
  'telegram-auth-added': [phone: string]
  'telegram-auth-updated': [phone: string]
  'telegram-auth-pin-submitted': []
  'telegram-auth-update-pin-submitted': []
  'telegram-auth-cancel': []
  'seed-code-verified': [selectedOrder: string[]]
  'forgot-password': []
}>()

// Methods
const closePasswordModal = () => {
  emit('close-password-modal')
}

const closePasswordNewModal = () => {
  emit('close-password-new-modal')
}

const closePasswordResetModal = () => {
  emit('close-password-reset-modal')
}

const closeEmailChangeModal = () => {
  emit('close-email-change-modal')
}

const closeEmailAddModal = () => {
  emit('close-email-add-modal')
}

const closePinCodeCreateModal = () => {
  emit('close-pin-code-create-modal')
}

const closePinCodeChangeModal = () => {
  emit('close-pin-code-change-modal')
}

const closePinCodeUpdateModal = () => {
  emit('close-pin-code-update-modal')
}

const closeTelegramAuthAddModal = () => {
  emit('close-telegram-auth-add-modal')
}

const closeTelegramAuthUpdateModal = () => {
  emit('close-telegram-auth-update-modal')
}

const closeTelegramAuthPinModal = () => {
  emit('close-telegram-auth-pin-modal')
}

const closeTelegramAuthUpdatePinModal = () => {
  emit('close-telegram-auth-update-pin-modal')
}

const closeSeedCodeModal = () => {
  emit('close-seed-code-modal')
}

// Event handlers
const handlePasswordChanged = () => {
  emit('password-changed')
}

const handlePasswordCreated = () => {
  emit('password-created')
}

const handlePasswordReset = () => {
  emit('password-reset')
}

const handleEmailChanged = (email: string) => {
  emit('email-changed', email)
}

const handleEmailAdded = (email: string) => {
  emit('email-added', email)
}

const handlePinCodeCreated = () => {
  emit('pin-code-created')
}

const handlePinCodeRemoved = () => {
  emit('pin-code-removed')
}

const handlePinCodeUpdateRequested = () => {
  emit('pin-code-update-requested')
}

const handlePinCodeUpdated = () => {
  emit('pin-code-updated')
}

const handleTelegramAuthAdded = (phone: string) => {
  emit('telegram-auth-added', phone)
}

const handleTelegramAuthUpdated = (phone: string) => {
  emit('telegram-auth-updated', phone)
}

const handleTelegramAuthPinSubmitted = () => {
  emit('telegram-auth-pin-submitted')
}

const handleTelegramAuthUpdatePinSubmitted = () => {
  emit('telegram-auth-update-pin-submitted')
}

const handleTelegramAuthCancel = () => {
  emit('telegram-auth-cancel')
}

const handleSeedCodeVerified = (selectedOrder: string[]) => {
  emit('seed-code-verified', selectedOrder)
}

const handleForgotPassword = () => {
  emit('forgot-password')
}
</script> 