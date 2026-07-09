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
          <RecoveryPhraseChips
            :predefined-words="recoveryWords"
            @complete="handleComplete" />
        </div>
      </div>
      <div class="auth_footer">
        <CustomButton
          :value="buttonText"
          type="secondary"
          class="w-full"
          @click="copyRecoveryPhrase" />
        <CustomButton
          value="Sign up"
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
import RecoveryPhraseChips from "~/widgets/auth/RecoveryPhraseChips/index.vue";

// Props
interface Props {
  isSignUp?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isSignUp: false,
});

// Composables
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

// State
const buttonText = ref<string>(t("auth.copy"));

// Computed
const recoveryWords = computed((): string[] => {
  const words = t("auth.recoveryWords") as unknown;
  if (Array.isArray(words)) return words as string[];
  return [
    "apple",
    "bridge",
    "cradle",
    "dream",
    "Nikol",
    "forest",
    "gadget",
    "honey",
    "island",
    "journey",
    "knife",
    "logic",
  ];
});

// Methods
const handleComplete = () => {
  router.push(localePath("/auth/sign-in"));
};

const copyRecoveryPhrase = () => {
  const phrase = recoveryWords.value.join(" ");
  navigator.clipboard
    .writeText(phrase)
    .then(() => {
      buttonText.value = t("auth.copied");
      setTimeout(() => {
        buttonText.value = t("auth.copy");
      }, 3000);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
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
