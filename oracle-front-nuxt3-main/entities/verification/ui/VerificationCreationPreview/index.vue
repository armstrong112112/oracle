<template>
  <div>
    <div class="flex flex-col justify-between">
      <div class="py-16 flex flex-col gap-16">
        <div class="flex items-center gap-10">
          <div class="status created">{{ $t("creation.statusCreated") }}</div>
          <div class="status paid">{{ $t("creation.statusPaid") }}</div>
          <div class="status confirmed">
            {{ $t("creation.statusConfirmed") }}
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex items-center justify-between">
            <div class="preview_description">Period</div>
            <div class="preview_description">until March 2026</div>
          </div>
          <div class="flex items-center justify-between">
            <div class="preview_description">Verification Fee</div>
            <div class="preview_description">$200</div>
          </div>
          <div class="flex items-center justify-between">
            <div class="preview_description">Paid with</div>
            <div class="preview_description">
              <img src="/assets/svg/litecoin-ltc.svg" alt="" /> xxxx9012
            </div>
          </div>
        </div>

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

        <!-- <div class="preview_title">{{ $t('creation.moderatorTextTitle') }}</div>
        <p class="preview_description">
          {{
            verificationCreationListData.moderatorText ??
            $t('creation.moderatorTextDefault')
          }}
        </p>

        <div class="preview_title">{{ $t('creation.promoTextTitle') }}</div>
        <p class="preview_description">
          {{ verificationCreationListData.promoText }}
        </p> -->

        <div class="flex flex-col gap-8">
          <div class="preview_title">
            {{ $t("verification.verificationPreview.webPresence") }}
          </div>
          <div class=" ">
            <div
              v-for="(link, index) in verificationCreationListData.links"
              :key="index"
              class="preview_links mt-10 flex flex-col gap-8">
              <div class="preview_link_card">
                <div class="link_card_title">
                  <img src="/icons/verification/red-world.svg" alt="" />
                  <span class="text-red-500" style="color: #f64e2a">
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
                :value="value as string"
                :placeholder="key.charAt(0).toUpperCase() + key.slice(1)"
                :is-read-only="true"
                :image="key"
                :is-remove="false"
                class="category-input mt-2" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <div class="preview_title">{{ $t("creation.screenshotsTitle") }}</div>
          <div class="categories overflow-hidden">
            <UploadImages :show-upload-button="false" />
          </div>
        </div>

        <VerificationPreviewDialog
          :is-open="isOpen"
          :close="closeModal"
          :title="modalData.title"
          :description="modalData.description"
          :image="modalData.image"
          :buttons="modalData.buttons" />
      </div>
      <div class="form-footer mt-20">
        <CustomButton
          :value="$t('creation.contactSupport')"
          type="primary"
          class="w-full"
          @click="update" />
        <CustomButton
          :value="$t('creation.cancelApplication')"
          class="w-full"
          type="secondary"
          @click="update" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModalType } from "@/entities/verification/model/modalTypes";
import UploadImages from "@/entities/verification/ui/VerificationForm/UploadImages.vue";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationPreviewDialog from "@/widgets/verification/VerificationPreviewDialog/index.vue";
import { computed, ref } from "vue";

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

// Props
interface Props {
  verificationDataProp?: any;
  verificationCreationListDataProp?: any;
}

const props = withDefaults(defineProps<Props>(), {
  verificationDataProp: undefined,
  verificationCreationListDataProp: undefined,
});

// Composables
const verificationStore = useVerificationStore();

// Reactive state
const isOpen = ref(false);
const modalData = ref<ModalType & { buttons: Button[] }>({
  title: "",
  description: "",
  image: "",
  buttons: [],
});

const trackingSteps = ref([
  { title: "Created", date: "25 Mar 09:30 PM", status: "completed" },
  { title: "Cancelled", date: "25 Mar 09:30 PM", status: "active" },
  { title: "", date: "", status: "" },
  { title: "", date: "", status: "" },
]);

// Computed properties
const verificationCreationListData = computed(() => {
  return (
    props.verificationCreationListDataProp ??
    verificationStore.verificationCreationListData
  );
});

const verificationData = computed(() => {
  return props.verificationDataProp ?? verificationStore.verificationData;
});

// Methods
const update = () => {
  verificationStore.UpdateCreationData();
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/verification/preview.scss" as *;
.links {
  margin-top: 0;
  gap: 8px;
}
.preview_links {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
.preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.categories {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  grid-template-rows: auto;
}
.preview_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;

  color: white;
}
.preview_description {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.month_title {
  font-family: "Reza Zulmi Alfaizi Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  color: white;
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

.preview_link_card {
  gap: 8px;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #13121b;
}
.link_card_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #f64e2a;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
.link_card_description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.status {
  border-radius: 8px;
  padding-right: 10px;
  padding-left: 10px;
  gap: 10px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 145%;
  letter-spacing: 0;
  color: black;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.created {
  background: #31f62a;
}
.paid {
  background: #f2ff00;
}
.confirmed {
  background: #f64e2a;
  color: white;
}
</style>
