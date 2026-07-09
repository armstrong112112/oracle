<template>
  <div class="password-new-content">
    <form
      action="#"
      class="password-new-content__form"
      @submit.prevent="confirmParol"
    >
      <div class="password-new-content__head">
        <input-oracle
          type="password"
          :placeholder="$t('moreSettings.enterYourPassword')"
          :error="!!errors.currentPassword"
          :error-message="errors.currentPassword"
          @changed="currentPasswordUpdate"
        />
        <ul class="password-new-content__rules">
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
        <input-oracle
          type="password"
          :placeholder="$t('moreSettings.confirmPassword')"
          :deactivated="isConfirmPasswordDeactivated"
          :error="!!errors.confirmPassword"
          :error-message="errors.confirmPassword"
          @changed="confirmPasswordUpdate"
        />
      </div>
      <div class="password-new-content__button">
        <new-oracle-button
          :text="$t('moreSettings.confirm')"
          color="yellow"
          type="submit"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const emit = defineEmits<{
  'password-created': []
}>()

const submitAttempted = ref(false)
const currentPassword = ref('')
const confirmPassword = ref('')

interface Rule {
  key: string
  text: string
  enabled: boolean
}

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
  confirmPassword: '',
})

const currentPasswordUpdate = (val: string) => {
  currentPassword.value = val
}

const confirmPasswordUpdate = (val: string) => {
  confirmPassword.value = val
}

const isConfirmPasswordDeactivated = computed((): boolean => {
  return currentPassword.value.trim() === ''
})

const confirmParol = (event: Event) => {
  event.preventDefault()
  const isValid = validateForm()

  if (isValid) {
    console.log('Form valid – sending data...')
    if (props.isModal) {
      emit('password-created')
    }
  }
}

const validateForm = (): boolean => {
  submitAttempted.value = true
  errors.value.confirmPassword = ''
  errors.value.currentPassword = ''

  let valid = true

  // ✅ Bo'sh inputlar uchun tekshiruv
  if (!currentPassword.value) {
    errors.value.currentPassword = 'Current password is required.'
    valid = false
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password.'
    valid = false
  }

  // 🔒 Faqat to'ldirilgan bo'lsa — validatsiya qo'llanadi
  if (currentPassword.value) {
    const pw = currentPassword.value

    rules.value.forEach((rule) => {
      if (!rule.enabled) return

      switch (rule.key) {
        case 'length':
          passwordValid.value.length = pw.length >= 8
          if (!passwordValid.value.length) {
            errors.value.currentPassword ||=
              'Password must be at least 8 characters.'
            valid = false
          }
          break
        case 'uppercase':
          passwordValid.value.uppercase = /[A-Z]/.test(pw)
          if (!passwordValid.value.uppercase) {
            errors.value.currentPassword ||=
              'Password must contain an uppercase letter.'
            valid = false
          }
          break
        case 'digit':
          passwordValid.value.digit = /\d/.test(pw)
          if (!passwordValid.value.digit) {
            errors.value.currentPassword ||= 'Password must contain a digit.'
            valid = false
          }
          break
        case 'symbol':
          passwordValid.value.symbol = /[^a-zA-Z0-9]/.test(pw)
          if (!passwordValid.value.symbol) {
            errors.value.currentPassword ||= 'Password must contain a symbol.'
            valid = false
          }
          break
      }
    })

    // ✅ Confirm password faqat bo'sh emas bo'lsa tekshiriladi
    if (
      confirmPassword.value &&
      confirmPassword.value !== currentPassword.value
    ) {
      errors.value.confirmPassword = 'Passwords do not match.'
      valid = false
    }
  }

  return valid
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

watch([currentPassword, confirmPassword], () => {
  if (submitAttempted.value) {
    validateForm()
  }
})
</script>

<style lang="scss" scoped>
.password-new-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  &__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    flex: 1 1 100%;
    height: 100%;
  }

  &__head {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    justify-content: start;
  }

  &__rules {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1 1 100%;
    height: 100%;
  }

  .rule-item {
    cursor: pointer;

    &__label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
      transition: color 0.2s ease;

      &.active {
        .rule-icon {
          border-color: #f64e2a;
          background: #f64e2a url('/svg/check-icon.svg') no-repeat
            center/12px;
        }
      }
    }
  }

  .rule-icon {
    width: 24px;
    height: 24px;
    min-width: 24px;
    border-radius: 50%;
    border: 1px solid #2b2b2b;
    transition: all 0.2s ease;
  }

  &__button {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .new-oracle-button {
      line-height: 22px;
      padding: 11px;
    }
  }
}
</style> 