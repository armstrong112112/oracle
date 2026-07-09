<template>
  <adresses-modal :is-visible="isVisible" class="verification-modal">
    <div class="verification-modal__head">
      <div class="verification-modal__icon">
        <CheckSuccesfullIcon v-if="type === 'success'" />
        <span v-else>⚠️</span>
      </div>

      <h2 class="verification-modal__title">{{ title }}</h2>

      <p class="verification-modal__message">{{ message }}</p>

      <div v-if="type === 'failed'" class="verification-modal__tips">
        <p class="verification-modal__tips--head">You can:</p>
        <ul class="verification-modal__list">
          <li class="verification-modal__list-item">
            Verify each word is spelled correctly
          </li>
          <li class="verification-modal__list-item">
            Ensure the words are in the correct order
          </li>
          <li class="verification-modal__list-item">
            Try again with your backup phrase
          </li>
        </ul>
      </div>
    </div>
    <div class="verification-modal__actions">
      <new-oracle-button
        v-if="type === 'failed'"
        text="Contact Support"
        @click="contactSupport"
      />
      <new-oracle-button
        :text="type === 'success' ? 'Close' : 'Try Again'"
        color="yellow"
        @click="closeModal"
      />
    </div>
  </adresses-modal>
</template>

<script setup lang="ts">
import CheckSuccesfullIcon from '@/assets/svg/checks-succesfull.svg?component'

type ModalType = 'success' | 'failed'

interface Props {
  isVisible: boolean
  type: ModalType
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  'contact-support': []
}>()

const title = computed((): string => {
  return props.type === 'success'
    ? 'Application has been successfully confirmed!'
    : 'Verification Failed'
})

const message = computed((): string => {
  return props.type === 'success'
    ? 'Your recovery phrase has been verified. Your wallet is now secure and ready to use.'
    : "The recovery phrase you entered doesn't match our records. Please check the words and their order carefully."
})

const closeModal = () => {
  emit('close')
}

const contactSupport = () => {
  emit('contact-support')
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/pages/seed-code.scss" as *;
</style>