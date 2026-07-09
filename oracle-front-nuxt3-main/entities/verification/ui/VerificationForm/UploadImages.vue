<template>
  <div class="flex-col flex gap-20">
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      class="hidden"
      @change="handleFiles" />
    <div
      v-if="showUploadButton && uploadedImages.length < 5"
      class="upload_drop_section"
      @click="triggerFileInput">
      <img src="/icons/verification/upload.svg" alt="upload" />
      <div class="upload_title">
        {{ $t("verification.screenshots.uploadTitle") }}
      </div>
      <div class="upload_description">
        {{ $t("verification.screenshots.uploadResolution") }}
      </div>
      <div class="upload_description">
        {{ $t("verification.screenshots.uploadSize") }}
      </div>
    </div>
    <div v-if="errorMessage" class="error_text">
      {{ errorMessage }}
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="3.5"
      :space-between="20"
      :loop="false"
      :autoplay="false"
      :navigation="false"
      :pagination="false"
      class="swiper-container">
      <swiper-slide
        v-for="(image, index) in uploadedImages"
        :key="index"
        class="swiper-slide upload-slide">
        <div class="slide-content relative">
          <img :src="image" alt="uploaded-image" class="uploaded-img" />
          <div
            v-if="showUploadButton"
            class="remove-image-btn"
            @click="removeImage(index)">
            <img src="/icons/verification/remove-image.svg" alt="upload" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { validateAndProcessFile } from "@/composables/checker";
import { useVerificationStore } from "@/store/verification";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";

interface Props {
  showUploadButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showUploadButton: true,
});

const { t } = useI18n();

// Pinia store - auto-imported
const verificationStore = useVerificationStore();

// Template refs
const fileInput = ref<HTMLInputElement | null>(null);

// State
const uploadedImages = ref<string[]>([]);
const errorMessage = ref("");
const fileSizeLimit = 15 * 1024 * 1024;
const minImageDimension = 300;
const fileHashes = ref<string[]>([]);

// Modules
const modules = [Navigation, Pagination, Autoplay];

// Initialize
onMounted(() => {
  if (verificationStore.verificationData.screenshots) {
    uploadedImages.value = [...verificationStore.verificationData.screenshots];
  }
});

// Methods
const triggerFileInput = () => {
  errorMessage.value = "";
  fileInput.value?.click();
};

const isDuplicateFile = async (file: File): Promise<boolean> => {
  const fileBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", fileBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const fileHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (fileHashes.value.includes(fileHash)) {
    return true;
  }

  fileHashes.value.push(fileHash);
  return false;
};

const handleFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  errorMessage.value = "";

  if (uploadedImages.value.length >= 5) {
    errorMessage.value = t(
      "verification.screenshots.errors.maxFiles"
    ) as string;
    target.value = "";
    return;
  }

  const remainingSlots = 5 - uploadedImages.value.length;
  const files = Array.from(target.files).slice(0, remainingSlots);

  for (const file of files) {
    if (file.size > fileSizeLimit) {
      errorMessage.value =
        "File Size Limit Exceeded. Your file is too large. Maximum allowed size is 15MB. Please compress your file or upload a smaller one.";
      continue;
    }

    if (await isDuplicateFile(file)) {
      errorMessage.value =
        "Duplicate File. This file has already been uploaded. Please select a different file.";
      continue;
    }

    try {
      const validationResult = await validateAndProcessFile(
        file,
        minImageDimension
      );
      if (validationResult.valid) {
        // @ts-ignore
        uploadedImages.value.push(validationResult.dataUrl);

        const currentVerificationData = {
          ...verificationStore.verificationData,
          screenshots: [...uploadedImages.value],
          isProcessed: false,
        };
        verificationStore.setVerificationData(currentVerificationData);

        // Swiper will automatically update when uploadedImages changes
      } else {
        errorMessage.value =
          validationResult.error ||
          "Upload Failed. Something went wrong during the upload process. Please try again in a few moments.";
      }
    } catch (error) {
      errorMessage.value =
        "Upload Failed. Something went wrong during the upload process. Please try again in a few moments.";
      console.error("File processing error:", error);
    }
  }

  target.value = "";
};

const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1);
  errorMessage.value = "";

  const currentVerificationData = {
    ...verificationStore.verificationData,
    screenshots: [...uploadedImages.value],
  };
  verificationStore.setVerificationData(currentVerificationData);
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/verification/upload-images.scss" as *;
</style>
