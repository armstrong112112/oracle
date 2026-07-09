<template>
  <div class="password-change-content">
    <form
      action="#"
      class="password-change-content__form"
      @submit.prevent="confirmParol"
    >
      <div class="input-group">
        <input-oracle
          type="password"
          :placeholder="$t('moreSettings.currentPassword')"
          :error="!!errors.currentPassword"
          :error-message="errors.currentPassword"
          @changed="currentPasswordUpdate"
        />
        <input-oracle
          type="password"
          :placeholder="$t('moreSettings.newPassword')"
          :deactivated="isNewPasswordDeactivated"
          :error="!!errors.newPassword"
          :error-message="errors.newPassword"
          @changed="newPasswordUpdate"
        />
        <input-oracle
          type="password"
          :placeholder="$t('moreSettings.confirmNewPassword')"
          :deactivated="isConfirmPasswordDeactivated"
          :error="!!errors.confirmPassword"
          :error-message="errors.confirmPassword"
          @changed="confirmPasswordUpdate"
        />
      </div>
      <div class="password-change-content__bottom">
        <ul class="password-change-content__rules">
          <li
            v-for="rule of rules"
            :key="rule.key"
            class="rule-item"
            @click="updateRule(rule.key)"
          >
            <div
              :for="rule.key"
              class="rule-item__label"
              :class="{ active: rule.enabled }"
            >
              <input
                :id="rule.key"
                type="checkbox"
                :checked="rule.enabled"
                style="display: none"
              />
              <span class="rule-icon"></span>
              {{ $t(rule.text) }}
            </div>
          </li>
        </ul>
        <div class="password-change-content__button">
          <new-oracle-button 
            :text="$t('moreSettings.forgotPassword')" 
            @click="handleForgotPassword"
          />
          <new-oracle-button
            :text="$t('moreSettings.confirm')"
            color="yellow"
            type="submit"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { validatePasswordForm, type Rule } from '@/composables/checker'

const localePath = useLocalePath()
const router = useRouter()

interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const emit = defineEmits<{
  'password-changed': []
  'forgot-password': []
}>()

// Reactive state
const submitAttempted = ref<boolean>(false)
const currentPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmPassword = ref<string>('')

const rules = ref<Rule[]>([
  {
    key: 'length',
    text: 'moreSettings.eightOrMoreCharacters',
    enabled: false,
  },
  {
    key: 'uppercase',
    text: 'moreSettings.atLeastOneUppercaseLetter',
    enabled: false,
  },
  { key: 'digit', text: 'moreSettings.atLeastOneDigit', enabled: false },
  { key: 'symbol', text: 'moreSettings.atLeastOneSymbol', enabled: false },
])

const passwordValid = ref({
  length: false,
  uppercase: false,
  digit: false,
  symbol: false,
})

const errors = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Computed properties
const isNewPasswordDeactivated = computed((): boolean => {
  return currentPassword.value.trim() === ''
})

const isConfirmPasswordDeactivated = computed((): boolean => {
  return newPassword.value.trim() === ''
})

// Methods
const currentPasswordUpdate = (val: string) => {
  currentPassword.value = val
}

const newPasswordUpdate = (val: string) => {
  newPassword.value = val
}

const confirmPasswordUpdate = (val: string) => {
  confirmPassword.value = val
}

const confirmParol = (event: Event) => {
  event.preventDefault()
  const isValid = validateForm()

  if (isValid) {
    console.log('Form valid – sending data...')
    // Здесь можно добавить логику отправки данных
    if (props.isModal) {
      emit('password-changed')
    }
  }
}

const handleForgotPassword = () => {
  if (props.isModal) {
    emit('forgot-password')
  } else {
    router.push(localePath('/moresettings/privacy-security/password/reset'))
  }
}

const validateForm = (): boolean => {
  submitAttempted.value = true

  const result = validatePasswordForm(
    currentPassword.value,
    newPassword.value,
    confirmPassword.value,
    rules.value,
  )

  errors.value = result.errors
  passwordValid.value = result.passwordValid

  return result.valid
}

const updateRule = (key: string) => {
  const rule = rules.value.find((r) => r.key === key)
  if (rule) {
    rule.enabled = !rule.enabled
  }
  if (submitAttempted.value) {
    validateForm()
  }
}

// Watchers
watch([currentPassword, newPassword, confirmPassword], () => {
  if (submitAttempted.value) {
    validateForm()
  }
})
</script>

<style lang="scss" scoped>
.password-change-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  &__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    flex: 1 1 100%;
    height: 100%;
  }
  
  .input-group {
    flex: 1 1 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 16px 0;
    padding: 0;
    .input {
      width: 100%;
    }
  }

  &__rules {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .rule-item {
    cursor: pointer;

    &__label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #7a74ba;
      transition: color 0.2s ease;

      &.active {
        color: #31f62a;
      }
    }
  }

  .rule-icon {
    width: 16px;
    height: 16px;
    border: 1px solid #7a74ba;
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease;

    .rule-item__label.active & {
      background: #31f62a;
      border-color: #31f62a;

      &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 8px;
        border: solid #000;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }

  &__button {
    display: flex;
    gap: 12px;
    margin-top: 16px;

    .new-oracle-button {
      flex: 1;
    }
  }
}
</style> 