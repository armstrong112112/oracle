<template>
  <div class="preview">
    <div class="stepper-container">
      <div class="stepper-back-button">
        <img
          class="cursor-pointer mb-4"
          src="/assets/svg/arrow-back.svg"
          alt=""
          @click="update" />
      </div>
      <div class="stepper-header">
        <h1 class="m-0">{{ $t("verification.verificationPreview.header") }}</h1>
      </div>
      <div class="stepper-next-button">
        <div
          v-if="windowWidth < 1024"
          class="action-button"
          @click="openModal('success')">
          {{ $t("verification.verificationPreview.submit") }}
        </div>
      </div>
    </div>
    <div class="process_parent_row flex flex-col gap-20 py-16">
      <div class="process_row">
        <div class="process_title">
          {{ $t("verification.verificationPreview.verificationCategory") }}
        </div>
        <div v-if="verificationData?.category" class="categories">
          <div class="selected_categories mt-0">
            <div
              v-for="(category, index) in verificationData?.category"
              :key="index"
              class="selected_category text-white">
              {{ category.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="process_row">
        <div class="flex items-center justify-between">
          <div class="process_title">
            {{ $t("verification.verificationPreview.verificationPeriod") }}
          </div>
          <div class="primary-color text-500 text-roboto">
            {{ verificationData.verificationPeriod }}
            {{ $t("verification.verificationPreview.month") }}
          </div>
        </div>
      </div>

      <div class="process_row">
        <div class="process_title">
          {{ $t("verification.verificationPreview.businessDescription") }}
        </div>
        <div class="process_description">
          {{ verificationData.description }}
        </div>
      </div>
      <div class="process_row">
        <div class="process_title">
          {{ $t("verification.verificationPreview.webPresence") }}
        </div>
        <div class="preview_links flex flex-col gap-8">
          <div
            v-for="(link, index) in verificationData.links"
            :key="index"
            class="links">
            <div class="link_header flex items-center justify-between">
              <div class="link_title text-white">
                {{ $t("verification.verificationPreview.link") }}
                {{ index + 1 }}
              </div>
              <div class="link_icon cursor-pointer">
                <img src="/icons/verification/white_close.svg" alt="" />
              </div>
            </div>
            <div class="preview_link_card">
              <div class="link_card_title">
                <img src="/icons/verification/world.svg" alt="" />
                <span>
                  {{ link.link }}
                </span>
              </div>
              <div class="link_card_description">
                {{ link.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="process_row">
        <div class="process_title">
          {{ $t("verification.verificationPreview.contactDetails") }}
        </div>
        <div class="categories">
          <div
            v-for="([key, value], index) in Object.entries(
              verificationData.contacts || {}
            )"
            :key="index"
            class="category">
            <TheInput
              v-if="value"
              :value="value"
              :placeholder="key.charAt(0).toUpperCase() + key.slice(1)"
              :is-read-only="true"
              :image="key"
              :is-remove="false"
              class="category-input mt-2" />
          </div>
        </div>
      </div>
      <div class="process_row">
        <div class="categories overflow-hidden">
          <UploadImages :show-upload-button="false" />
        </div>
      </div>

      <CustomButton
        v-if="windowWidth > 1024"
        type="primary"
        size="lg"
        class="w-full mt-30"
        :value="$t('verification.verificationPreview.submit')"
        @click="openModal('success')" />
    </div>

    <VerificationPreviewDialog
      :is-open="isOpen"
      :close="() => closeModal('success')"
      :title="modalData.title"
      :description="modalData.description"
      :image="modalData.image"
      :buttons="modalData.buttons" />

    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      type="success"
      :button-text="'verification.verificationPreview.trackButton'"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => onDialogConfirm(key)" />
  </div>
</template>

<script setup lang="ts">
import { modals, type Modals } from "@/entities/verification/data/modal";
import { type ModalType } from "@/entities/verification/model/modalTypes";
import UploadImages from "@/entities/verification/ui/VerificationForm/UploadImages.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationDialog from "@/widgets/verification/VerificationDialog/index.vue";
import VerificationPreviewDialog from "@/widgets/verification/VerificationPreviewDialog/index.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import CustomButton from "~/components/ui/Button.vue";
const router = useRouter();
type ButtonType =
  | "primary"
  | "outline"
  | "secondary"
  | "confirm"
  | "grey"
  | "transparent"
  | "blur";

interface Button {
  text: string;
  type: ButtonType;
  action?: () => void;
}

// Composables
const verificationStore = useVerificationStore();

// Reactive state
const windowWidth = ref<number>(0);
const isOpen = ref(false);
const showTrackingOverlay = ref<boolean>(false);
const modalData = ref<ModalType & { buttons: Button[] }>({
  title: "",
  description: "",
  image: "",
  buttons: [],
});

const localModals = ref<Modals>(modals);

// Computed properties
const verificationData = computed(() => verificationStore.verificationData);
const verificationCreationListData = computed(
  () => verificationStore.verificationCreationListData
);

// Methods
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const update = () => {
  verificationStore.UpdateData();
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const onDialogConfirm = (modalName: keyof typeof modals) => {
  router.push("/whitelist/tracking");
};

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", updateWindowWidth);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", updateWindowWidth);
  }
});

// openErrorModal() {
//   modalData.value = {
//     title: 'Your verification fee payment failed!',
//     description: 'Payment error. <br> Please check your available balance.',
//     image: '/icons/verification/error.svg',
//     buttons: [
//       { text: 'ALRIGHT', type: 'primary', action: closeModal },
//       { text: 'TOP UP YOUR BALANCE', type: 'outline' },
//     ],
//   }
//   isOpen.value = true
// }
// openSuccessModal() {
//   modalData.value = {
//     title: 'Your verification fee payment was successful!',
//     description: 'Your Escrow application has been submitted!',
//     image: '/icons/verification/success.svg',
//     buttons: [{ text: 'ALRIGHT', type: 'primary', action: closeModal }],
//   }
//   isOpen.value = true
// }
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/verification/preview.scss" as *;
</style>
