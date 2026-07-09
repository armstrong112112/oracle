<template>
  <div class="auth">
    <AuthBackground />
    <div class="auth-content">
      <AuthHeader />
      <div class="sign_in">
        <div class="sign_in_title">{{ $t("auth.signUpTitle") }}</div>
        <div class="sign_in_form flex flex-col gap-4 w-full">
          <TheInput
            :is-remove="false"
            :placeholder="$t('auth.emailPlaceholder')"
            :value="email"
            @update:value="email = $event" />
        </div>
        <div class="flex items-center justify-center">
          <nuxt-link
            :to="localePath('/auth/sign-up-with-telegram')"
            class="tg-btn items-center">
            <img src="/icons/verification/telegram.svg" alt="" />
            <span class="leading-normal">{{
              $t("auth.signUpWithTelegram")
            }}</span>
          </nuxt-link>
        </div>
      </div>
      <div class="auth_footer">
        <CustomButton
          :value="$t('auth.signUpButton')"
          type="primary"
          class="w-full"
          :disabled="isLoading || !email"
          @click="openOtp" />
        <div class="auth_text">
          {{ $t("auth.alreadyHaveAccount") }}
          <nuxt-link :to="localePath('/auth/sign-in')" class="primary-color">{{
            $t("auth.signInLink")
          }}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useAuthStore } from "~/store/auth";
import AuthBackground from "~/widgets/auth/AuthBackground/index.vue";
import AuthHeader from "~/widgets/auth/AuthHeader/index.vue";

// Composables
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
const authStore = useAuthStore();

definePageMeta({
  middleware: "guest",
});

// State
const email = ref<string>("");
const password = ref<string>("");
const isLoading = ref<boolean>(false);

// Methods
const openOtp = async () => {
  if (!email.value) {
    return;
  }

  try {
    isLoading.value = true;
    // Store email for later use in the sign-up flow
    // You might want to store this in a temporary store or pass it via route params
    router.push(localePath("/auth/sign-up/set-password"));
  } catch (error) {
    console.error("Sign up error:", error);
    // Handle error - could show notification
  } finally {
    isLoading.value = false;
  }
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
</style>
