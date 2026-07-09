<template>
  <div class="auth">
    <AuthBackground />
    <div class="auth-content">
      <AuthHeader />
      <div class="sign_in">
        <div class="flex flex-col gap-8">
          <div class="sign_in_title text-center">
            {{ $t("auth.recoveryTitle") }}
          </div>
          <div class="sign_in_description">
            {{ $t("auth.recoveryDescription") }}
          </div>
        </div>
        <div class="sign_in_form flex flex-col gap-4 w-full">
          <Chips @complete="handleComplete" />
        </div>
      </div>
      <div class="auth_footer">
        <CustomButton
          :value="$t('auth.signInButton')"
          type="primary"
          class="w-full"
          @click="handleComplete" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import AuthBackground from "~/widgets/auth/AuthBackground/index.vue";
import AuthHeader from "~/widgets/auth/AuthHeader/index.vue";
import Chips from "~/widgets/auth/Chips/index.vue";

// Composables
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

// Methods
const handleComplete = () => {
  router.push(localePath("/"));
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
.sign_in_description {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
</style>
