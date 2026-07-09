<template>
  <div class="auth">
    <AuthBackground />
    <div class="auth-content">
      <AuthHeader />
      <div class="sign_in">
        <div class="sign_in_title">{{ $t("auth.setPasswordTitle") }}</div>
        <div class="sign_in_form flex flex-col gap-8 w-full">
          <TheInput
            :is-remove="false"
            placeholder="Enter your password"
            :value="password"
            type="password"
            is-use="password"
            @update:value="onPasswordChange" />
          <div class="flex flex-col gap-4">
            <div class="password_checker_row">
              <img
                v-if="!validations.hasMinLength"
                src="/icons/verification/select.svg"
                alt="select" />
              <img
                v-else
                src="/icons/verification/selected.svg"
                alt="selected" />
              <div class="password_checker_row_title">
                {{ $t("passwordCheckerMin") }}
              </div>
            </div>
            <div class="password_checker_row">
              <img
                v-if="!validations.hasUppercase"
                src="/icons/verification/select.svg"
                alt="select" />
              <img
                v-else
                src="/icons/verification/selected.svg"
                alt="selected" />
              <div class="password_checker_row_title">
                At least one uppercase letter
              </div>
            </div>
            <div class="password_checker_row">
              <img
                v-if="!validations.hasDigit"
                src="/icons/verification/select.svg"
                alt="select" />
              <img
                v-else
                src="/icons/verification/selected.svg"
                alt="selected" />
              <div class="password_checker_row_title">
                {{ $t("auth.passwordCheckerDigit") }}
              </div>
            </div>
            <div class="password_checker_row">
              <img
                v-if="!validations.hasSymbol"
                src="/icons/verification/select.svg"
                alt="select" />
              <img
                v-else
                src="/icons/verification/selected.svg"
                alt="selected" />
              <div class="password_checker_row_title">
                {{ $t("auth.passwordCheckerSymbol") }}
              </div>
            </div>
          </div>
        </div>
        <TheInput
          :is-remove="false"
          placeholder="Confirm password"
          class="w-full"
          :value="confirm"
          type="password"
          is-use="password"
          @update:value="onConfirmChange" />
        <div
          v-if="!passwordsMatch && confirm.length > 0"
          class="primary-color text-roboto mt-2">
          Passwords do not match
        </div>
      </div>
      <div class="auth_footer">
        <CustomButton
          v-if="isPasswordValid && passwordsMatch && confirm.length > 0"
          value="Continue"
          type="primary"
          class="w-full"
          @click="openOtp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import AuthBackground from "~/widgets/auth/AuthBackground/index.vue";
import AuthHeader from "~/widgets/auth/AuthHeader/index.vue";

// Types
interface PasswordValidations {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
}

// Composables
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

// State
const confirm = ref<string>("");
const password = ref<string>("");
const validations = ref<PasswordValidations>({
  hasMinLength: false,
  hasUppercase: false,
  hasDigit: false,
  hasSymbol: false,
});

// Computed
const isPasswordValid = computed((): boolean => {
  return Object.values(validations.value).every((value) => value === true);
});

const passwordsMatch = computed((): boolean => {
  return password.value === confirm.value;
});

// Methods
const validatePassword = (passwordValue: string): void => {
  // Check for minimum length (8 characters)
  validations.value.hasMinLength = passwordValue.length >= 8;

  // Check for at least one uppercase letter
  validations.value.hasUppercase = /[A-Z]/.test(passwordValue);

  // Check for at least one digit
  validations.value.hasDigit = /[0-9]/.test(passwordValue);

  // Check for at least one symbol (non-alphanumeric character)
  validations.value.hasSymbol = /[^A-Za-z0-9]/.test(passwordValue);
};

const onPasswordChange = (value: string): void => {
  password.value = value;
  validatePassword(value);
};

const onConfirmChange = (value: string): void => {
  confirm.value = value;
};

const openOtp = () => {
  router.push(localePath("/auth/sign-up/otp"));
};
</script>
<style scoped lang="scss">
.auth {
  min-height: 100vh;
  width: 100%;
}

.auth-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sign_in {
  padding-top: 35px;
  padding-right: 16px;
  padding-left: 16px;
  gap: 38px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}
.sign_in_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.tg-btn {
  padding: 8px 12px;
  border-radius: 12px;
  background: #1e1d28;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid #2b2741;
}
.tg-btn span {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  vertical-align: middle;
  color: #ffffff;
}

.auth_footer {
  padding-right: 16px;
  padding-bottom: 28px;
  padding-left: 16px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.auth_footer .auth_text {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  vertical-align: middle;
  color: white;
}
.password_checker_row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
.password_checker_row_title {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
</style>
