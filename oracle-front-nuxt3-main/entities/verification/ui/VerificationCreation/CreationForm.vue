<template>
  <div>
    <div class="py-16 gap-24 flex flex-col">
      <div class="form-row-parent">
        <div class="form-row">
          <div class="form-title">
            {{ $t("creation.promoTextTitle") }}
          </div>
          <div class="info" @click="openModal('business')">
            <img src="/icons/verification/info.svg" alt="" />
          </div>
        </div>
        <textarea
          v-model="localPromoText"
          :placeholder="$t('creation.promoTextPlaceholder')"
          class="verification-textarea"
          maxlength="1000" />
        <div
          class="form-limit"
          :class="localPromoText.length === 1000 ? 'primary-color' : null">
          {{ localPromoText.length }} / 1000
        </div>
      </div>
      <div class="form-row-parent">
        <div class="form-row">
          <div class="form-title">
            {{ $t("creation.linksTitle") }}
          </div>
          <div class="info" @click="openModal('links')">
            <img src="/icons/verification/info.svg" alt="" />
          </div>
        </div>
        <div
          v-for="(link, index) in localLinks"
          :key="index"
          class="flex flex-col gap-16">
          <div class="gap-10 flex flex-col">
            <div class="form_link_header flex items-center justify-between">
              <div class="link_title">
                {{ $t("creation.link") }} {{ index + 1 }}
              </div>
              <div class="link_icon cursor-pointer" @click="removeLink(index)">
                <img src="/icons/verification/white_close.svg" alt="" />
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <TheInput
                :value="link.link"
                :placeholder="$t('creation.linkPlaceholder')"
                :is-read-only="false"
                :is-remove="false"
                @update:value="updateLink(index, 'link', $event)" />
              <TheInput
                :value="link.description"
                :placeholder="$t('creation.linkDescriptionPlaceholder')"
                :is-read-only="false"
                :is-remove="false"
                @update:value="updateLink(index, 'description', $event)" />
            </div>
          </div>

          <div v-if="index === 0" class="input_line"></div>
          <div v-if="index === 1" class="input_line"></div>
        </div>
        <CustomButton
          v-if="localLinks.length < 3"
          :value="$t('creation.addLink')"
          type="secondary"
          class="w-full mt-10"
          @click="addLink" />
      </div>
      <div class="form-row-parent">
        <div class="form-row">
          <div class="form-title">
            {{ $t("creation.moderatorTextTitle") }}
          </div>
          <div class="info" @click="openModal('business')">
            <img src="/icons/verification/info.svg" alt="" />
          </div>
        </div>
        <textarea
          v-model="localModeratorText"
          :placeholder="$t('creation.moderatorTextPlaceholder')"
          class="verification-textarea"
          maxlength="1000" />
        <div
          class="form-limit"
          :class="localModeratorText.length === 1000 ? 'primary-color' : null">
          {{ localModeratorText.length }} / 1000
        </div>
      </div>
      <div class="form-row-parent">
        <div class="form-row">
          <div class="form-title">
            {{ $t("creation.screenshotsTitle") }}
          </div>
          <div class="info" @click="openModal('attachedFiles')">
            <img src="/icons/verification/info.svg" alt="" />
          </div>
        </div>
        <UploadImages class="mt-20" />
      </div>
    </div>
    <div class="form-footer">
      <CustomButton
        class="mt-20 w-full"
        :value="$t('creation.submit')"
        type="primary"
        @click="openModal('successApplication')" />
    </div>
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="(modal.buttonType as ButtonType)"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => processCreation(key as number)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
import { modals, type Modals } from "@/entities/verification/data/modal";
import UploadImages from "@/entities/verification/ui/VerificationForm/UploadImages.vue";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationDialog, {
  type ButtonType,
} from "@/widgets/verification/VerificationDialog/index.vue";
import { onMounted, ref } from "vue";

// Composables
const verificationStore = useVerificationStore();

// Reactive state
const localModals = ref<Modals>(modals);
const localPromoText = ref("");
const localModeratorText = ref("");
const localLinks = ref<Array<{ link: string; description: string }>>([
  { link: "", description: "" },
]);
const localScreenshots = ref<string[]>([]);

// Methods
const updateLink = (
  index: number,
  field: "link" | "description",
  value: string
) => {
  const updatedLink = { ...localLinks.value[index] };
  updatedLink[field] = value;
  localLinks.value.splice(index, 1, updatedLink);
};

const addLink = () => {
  if (localLinks.value.length < 3) {
    localLinks.value.push({ link: "", description: "" });
  }
};

const removeLink = (index: number) => {
  if (localLinks.value.length > 1) {
    localLinks.value.splice(index, 1);
  }
};

const processCreation = (key: number) => {
  const formData = {
    promoText: localPromoText.value,
    links: [...localLinks.value],
    moderatorText: localModeratorText.value,
    screenshots: [...localScreenshots.value],
    isCreationProcessed: true,
  };
  verificationStore.setVerificationCreationData(formData);
  closeModal(key);
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};

// Lifecycle
onMounted(() => {
  if (verificationStore.verificationCreationListData) {
    const { verificationCreationListData } = verificationStore;

    localPromoText.value = verificationCreationListData.promoText || "";
    localModeratorText.value = verificationCreationListData.moderatorText || "";

    if (
      verificationCreationListData.links &&
      verificationCreationListData.links.length > 0
    ) {
      localLinks.value = JSON.parse(
        JSON.stringify(verificationCreationListData.links)
      );
    }

    if (verificationCreationListData.screenshots) {
      localScreenshots.value = [...verificationCreationListData.screenshots];
    }
  }
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/verification/creation-form.scss" as *;
</style>
