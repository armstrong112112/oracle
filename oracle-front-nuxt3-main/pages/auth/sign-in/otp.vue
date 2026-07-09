<template>
  <div class="auth">
    <AuthBackground />
    <div class="auth-content">
      <AuthHeader />
      <div class="sign_in">
        <div class="sign_in_title">
          {{ $t("auth.sentCodeTitle") }}
        </div>
        <OTPForm
          ref="otpForm"
          v-model="otpValue"
          :length="4"
          @complete="handleOtpComplete" />
        <div class="timer-container">
          <span v-if="timeLeft > 0">{{
            $t("auth.resendCodeIn", { time: timeLeft })
          }}</span>
          <span v-else class="resend-link" @click="resendCode">{{
            $t("auth.resendCode")
          }}</span>
        </div>
      </div>
      <div class="auth_footer">
        <div class="auth_text">
          {{ $t("auth.didntReceive") }}
          <span class="secondary-color" @click="resendCode"
            >{{ $t("auth.resend")
            }}{{
              timeLeft > 0
                ? ` ${$t("auth.resendCodeIn", { time: timeLeft })}`
                : ""
            }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import AuthBackground from "~/widgets/auth/AuthBackground/index.vue";
import AuthHeader from "~/widgets/auth/AuthHeader/index.vue";
import OTPForm from "~/widgets/auth/OTPForm/index.vue";

// Composables
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
const authStore = useAuthStore();

// State
const otpValue = ref<string>("");
const timeLeft = ref<number>(30);
const timerInterval = ref<number | null>(null);

// Template refs
const otpForm = ref<InstanceType<typeof OTPForm> | null>(null);

// Lifecycle
onMounted(() => {
  startTimer();
  nextTick(() => {
    if (otpForm.value) {
      otpForm.value.focusFirstInput();
    }
  });
});

onBeforeUnmount(() => {
  clearTimer();
});

// Methods
const startTimer = () => {
  timeLeft.value = 30;
  clearTimer();

  timerInterval.value = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearTimer();
    }
  }, 1000);
};

const clearTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

const resendCode = () => {
  if (timeLeft.value === 0) {
    startTimer();
    otpValue.value = "";
  }
};

const handleOtpComplete = (otp: string) => {
  verifyOtp(otp);
};

const verifyOtp = async (otp: string) => {
  try {
    console.log("Verifying OTP:", otp);
    // Here you would typically verify the OTP with your backend
    // await authStore.verifyOtp(otp);
    setTimeout(() => {
      router.push(localePath("/auth/sign-in/recovery-phrase"));
    }, 1000);
  } catch (error) {
    console.error("OTP verification error:", error);
    // Handle error - could show notification
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
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

.timer-container {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
  text-align: center;
}

.resend-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
</style>
