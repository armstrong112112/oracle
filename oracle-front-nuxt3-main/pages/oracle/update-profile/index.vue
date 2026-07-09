<template>
  <div class="notification mt-0 pb-0 p-0 h-full flex flex-col justify-between">
    <div class="flex flex-col">
      <PageHeader title="Update Profile" />
      <div class="py-16">
        <div class="flex flex-col gap-16">
          <div class="mt-10 gap-10 flex flex-col">
            <TheInput
              :value="username"
              placeholder="Username"
              :is-read-only="false"
              :is-remove="false"
              @update:value="username = $event" />
          </div>
        </div>
        <div class="form-row-parent">
          <div class="flex items-center justify-start gap-8">
            <div class="form-title">Bio</div>
            <div
              class="info flex items-center justify-start"
              @click="openModal('business')">
              <img src="/icons/verification/info.svg" alt="" />
            </div>
          </div>
          <textarea
            v-model="bio"
            placeholder="Tell more about your offer..."
            class="verification-textarea"
            maxlength="300" />
          <div
            class="form-limit"
            :class="bio.length === 300 ? 'primary-color' : null">
            {{ bio.length }} / 300
          </div>
        </div>
      </div>
    </div>
    <div class="form-footer">
      <CustomButton
        class="mt-20 w-full"
        value="Save"
        type="primary"
        :disabled="isSubmitting"
        @click="submitProfile" />
    </div>
    <VerificationDialog
      v-for="(modal, key) in modalEntries"
      :key="key"
      :type="modal[1].type"
      :button-type="(modal[1].buttonType as ButtonType)"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :success-text="modal[1].successText"
      :is-open="modal[1].isOpen"
      :close="() => closeModal(key as keyof typeof modals)"
      :confirm="() => closeModal(key as keyof typeof modals)"
      :is-cancel="modal[1].isCancel" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { modals, type Modals } from "~/entities/verification/data/modal";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useOracleProfileStore } from "~/store/oracle-profile";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";

definePageMeta({
  layout: "sidebar",
});

const router = useRouter();
const localePath = useLocalePath();
const oracleProfileStore = useOracleProfileStore();

const localModals = ref<Modals>(modals || {});
const username = ref<string>("");
const bio = ref<string>("");
const isSubmitting = ref<boolean>(false);

const modalEntries = computed(() => {
  if (!localModals.value) return [];
  return Object.entries(localModals.value);
});

const loadProfile = () => {
  username.value = oracleProfileStore.profile.username || "";
  bio.value = oracleProfileStore.profile.bio || "";
};

const submitProfile = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    oracleProfileStore.SET_PROFILE({
      username: username.value,
      bio: bio.value,
    });

    setTimeout(() => {
      router.push(localePath("/oracle/my-profile"));
      isSubmitting.value = false;
    }, 2000);
  } catch (error) {
    console.error("Failed to update profile:", error);
    isSubmitting.value = false;
  }
};

const openModal = (modalName: keyof typeof modals) => {
  if (localModals.value[modalName]) {
    localModals.value[modalName].isOpen = true;
  }
};

const closeModal = (modalName: keyof typeof modals) => {
  if (localModals.value[modalName]) {
    localModals.value[modalName].isOpen = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style lang="scss" scoped>
.links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  grid-template-rows: auto;
  margin-top: 12px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.form-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.form-limit {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
}
.info {
  cursor: pointer;
}
.form-description {
  font-family: "Reza Zulmi Alfaizi Sans", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  color: white;
}

.form-row-parent {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.more-btn {
  margin-top: 20px;
  background: linear-gradient(
    105.62deg,
    rgba(246, 78, 42, 0.2) 0%,
    #232130 35.65%
  );
  position: relative;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  align-items: center;
  gap: 12px;
  color: white;
  -webkit-text-decoration: none;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.more-btn::before {
  background: linear-gradient(
    105.62deg,
    rgba(246, 78, 42, 0.2) 0%,
    #232130 35.65%
  );
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 12px;
  z-index: -1;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0, #fff 0) content-box,
    linear-gradient(#fff 0, #fff 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.more-title {
  font-family: Hanson, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  text-transform: uppercase;
  color: white;
}
.link_header {
  margin-top: 8px;
}
.form-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  border-top: 1px solid #2b2741;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #13121b;
  z-index: 999;
}
.input_line {
  width: 100%;
  height: 1px;
  background: #67639a;
}
</style>
