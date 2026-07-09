<template>
  <div class="auth">
    <AuthBackground />
    <div class="auth-content flex flex-col justify-between">
      <div></div>
      <div class="sign_in">
        <div class="flex items-center gap-24">
          <img class="tg-icons" src="/avatars/tg.svg" alt="" />
          <img class="tg-icons" src="/avatars/logo.svg" alt="" />
        </div>
        <div class="flex flex-col gap-48">
          <div class="flex flex-col gap-32">
            <div class="sign_in_title text-center">
              {{ $t("auth.logInWithTelegram") }}
            </div>
            <div class="sign_in_description text-center">
              {{ $t("auth.telegramLoginDescription") }}
            </div>
          </div>
        </div>
        <div class="sign_in_form flex flex-col gap-4 w-full">
          <AuthTg
            @country-changed="onCountryChanged"
            @phone-changed="onPhoneChanged" />
        </div>
      </div>
      <div class="auth_footer">
        <CustomButton
          :value="$t('auth.cancel')"
          type="secondary"
          class="w-full"
          @click="cancelTg" />
        <CustomButton
          :value="$t('auth.next')"
          type="primary"
          class="w-full"
          :disabled="!isValidPhone"
          @click="openOtp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { useAuthStore } from "~/store/auth";
import AuthBackground from "~/widgets/auth/AuthBackground/index.vue";
import AuthTg from "~/widgets/auth/AuthTg/index.vue";

interface PhoneData {
  countryCode: string;
  phoneNumber: string;
  isValid: boolean;
  fullNumber: string;
}

interface CountryData {
  name: string;
  dial_code: string;
  code: string;
  flag?: string;
}

const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
const authStore = useAuthStore();

definePageMeta({
  middleware: "guest",
});

// State
const phoneData = ref<PhoneData>({
  countryCode: "+7",
  phoneNumber: "",
  isValid: false,
  fullNumber: "",
});

const countryData = ref<CountryData>({
  name: "Russia",
  dial_code: "+7",
  code: "RU",
  flag: "",
});

// Computed
const isValidPhone = computed(() => phoneData.value.isValid);

// Methods
const onCountryChanged = (country: CountryData) => {
  countryData.value = country;
};

const onPhoneChanged = (data: PhoneData) => {
  phoneData.value = data;
};

const openOtp = async () => {
  if (isValidPhone.value) {
    try {
      // Store phone data for OTP verification
      console.log("Proceeding with phone number:", phoneData.value.fullNumber);
      router.push(localePath("/auth/sign-up-with-telegram/otp"));
    } catch (error) {
      console.error("Telegram signup error:", error);
    }
  }
};

const cancelTg = () => {
  router.push(localePath("/auth/sign-in"));
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
  background: rgba(30, 29, 40, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid rgba(43, 39, 65, 0.8);
  transition: all 0.3s ease;
}

.tg-btn:hover {
  background: rgba(30, 29, 40, 0.9);
  border-color: rgba(43, 39, 65, 1);
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
.tg-icons {
  width: 64px;
  height: 64px;
}
.sign_in_description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
</style>
