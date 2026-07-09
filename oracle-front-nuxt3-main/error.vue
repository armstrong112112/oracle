<template>
  <div class="auth">
    <AuthBackground />
    <div class="auth-content">
      <AuthHeader />
      <div class="error-content">
        <div class="error-title">{{ errorCode }}</div>
        <div class="error-description">{{ errorMessage }}</div>
      </div>
      <div class="auth_footer">
        <CustomButton
          value="Back home"
          type="primary"
          class="w-full"
          @click="goHomePage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import AuthBackground from "~/widgets/auth/AuthBackground/index.vue";
import AuthHeader from "~/widgets/auth/AuthHeader/index.vue";

// Nuxt 3 error prop - error is automatically passed as a prop
interface NuxtError {
  statusCode?: number;
  statusMessage?: string;
  message?: string;
}

const props = defineProps<{
  error: NuxtError;
}>();

// Computed properties for dynamic error display
const errorCode = computed(() => {
  return props.error?.statusCode || 404;
});

const errorMessage = computed(() => {
  if (props.error?.statusMessage) {
    return props.error.statusMessage;
  }
  if (props.error?.message) {
    return props.error.message;
  }

  // Fallback messages based on status code
  const messages: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Page not found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
  };

  return messages[errorCode.value] || "An error occurred";
});

// Composables
const router = useRouter();
const localePath = useLocalePath();

const goHomePage = () => {
  router.push(localePath("/"));
};
useHead({
  title: errorMessage.value,
});
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

.error-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100vh;
  flex: 1;
  padding-bottom: 108px;
}
.error-title {
  font-family: Hector, sans-serif;
  font-weight: 700;
  font-size: 56px;
  line-height: 130%;
  letter-spacing: 0;
  vertical-align: middle;
  color: white;
}
.error-description {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 130%;
  letter-spacing: 0;
  vertical-align: middle;
  color: white;
}
@media (min-width: 768px) {
  .error-title {
    font-size: 120px;
  }
  .error-description {
    font-size: 48px;
  }
}
</style>
