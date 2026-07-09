<template>
  <div>
    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          What category you want to get verified for?
        </div>
        <div class="info" @click="openModal('categoryInfo')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <ChooseCategory
        placeholder="Select verification category"
        :multi-select="true"
        :values="categories" />

      <div class="form-description">
        You can pick several categories. You'll pay a full fee for the most
        expensive category and 50% of a fee for additional categories.
      </div>
    </div>
    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">Select the verification period</div>
        <div class="info" @click="openModal('verificationPeriod')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <ChooseVerificationPeriod />
      <div class="form-description grid grid-cols-4">
        <span>140% of Price</span>
        <span>Regular Price</span>
        <span>40% cheaper</span>
        <span class="primary-color"
          >50% cheaper <br />
          <span class="uppercase">Good deal</span></span
        >
      </div>
    </div>

    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          Tell us a little bit about you and your business
        </div>
        <div class="info" @click="openModal('business')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <textarea
        v-model="localDescription"
        placeholder="Tell us more about your business operations..."
        class="verification-textarea" />
    </div>

    <form @submit.prevent="processVerification">
      <div class="form-row-parent">
        <div class="form-row">
          <div class="form-title">
            Add up to 4 links related to your business
          </div>
          <div class="info" @click="openModal('links')">
            <img src="/icons/verification/info.svg" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div v-for="(link, index) in localLinks" :key="index" class="links">
          <TheInput
            :value="link.link"
            placeholder="Link"
            :is-read-only="false"
            :is-remove="true"
            @update:value="updateLink(index, 'link', $event)" />
          <TheInput
            :value="link.description"
            placeholder="Description"
            :is-read-only="false"
            :is-remove="true"
            @update:value="updateLink(index, 'description', $event)" />
        </div>
      </div>
      <div class="form-row-parent">
        <div class="form-row">
          <div class="form-title">My Contact Details</div>
        </div>
        <ContactsForm
          :contacts="localContacts"
          @update:contacts="updateContacts" />
      </div>
      <div class="form-row-parent">
        <div class="form-row">
          <div class="form-title">Add up to 5 screenshots</div>
          <div class="info" @click="openModal('attachedFiles')">
            <img src="/icons/verification/info.svg" alt="" />
          </div>
        </div>
      </div>

      <UploadImages class="mt-20" />
      <CertificationCard />
      <CustomButton class="mt-20 w-full" value="Process" type="primary" />
    </form>
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  categories,
  type Category,
} from "@/entities/verification/data/categories";
import { modals, type Modals } from "@/entities/verification/data/modal";
import CertificationCard from "@/entities/verification/ui/VerificationForm/CertificationCard.vue";
import ChooseCategory from "@/entities/verification/ui/VerificationForm/ChooseCategory.vue";
import ChooseVerificationPeriod from "@/entities/verification/ui/VerificationForm/ChooseVerificationPeriod.vue";
import ContactsForm from "@/entities/verification/ui/VerificationForm/ContactsForm.vue";
import UploadImages from "@/entities/verification/ui/VerificationForm/UploadImages.vue";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import VerificationDialog from "@/widgets/verification/VerificationDialog/index.vue";
import { useVerificationStore } from "@/store/verification";

const { t } = useI18n();

// Use Pinia store directly
const verificationStore = useVerificationStore();

// State
const localModals = ref<Modals>(modals);
const localCategory = ref<Category[]>([{ title: "", price: 0, id: 0 }]);
const localVerificationPeriod = ref("");
const localDescription = ref("");
const localLinks = ref<Array<{ link: string; description: string }>>([
  { link: "", description: "" },
  { link: "", description: "" },
  { link: "", description: "" },
  { link: "", description: "" },
]);
const localContacts = ref({
  telegram: "",
  matrix: "",
  signal: "",
  whatsapp: "",
  forum1: "",
  forum2: "",
});
const localScreenshots = ref<string[]>([]);

// Initialize data from store
onMounted(() => {
  if (verificationStore.verificationData) {
    const { verificationData } = verificationStore;

    localCategory.value = verificationData.category || [
      { title: "", price: 0, id: 141 },
    ];
    localVerificationPeriod.value = verificationData.verificationPeriod || "";
    localDescription.value = verificationData.description || "";

    if (verificationData.links && verificationData.links.length > 0) {
      localLinks.value = JSON.parse(JSON.stringify(verificationData.links));

      if (localLinks.value.length < 4) {
        const emptyLinksNeeded = 4 - localLinks.value.length;
        for (let i = 0; i < emptyLinksNeeded; i++) {
          localLinks.value.push({ link: "", description: "" });
        }
      }
    }

    if (verificationData.contacts) {
      localContacts.value = {
        telegram: verificationData.contacts.telegram || "",
        matrix: verificationData.contacts.matrix || "",
        signal: verificationData.contacts.signal || "",
        whatsapp: verificationData.contacts.whatsapp || "",
        forum1: verificationData.contacts.forum1 || "",
        forum2: verificationData.contacts.forum2 || "",
      };
    }

    if (verificationData.screenshots) {
      localScreenshots.value = [...verificationData.screenshots];
    }
  }
});

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

const updateContacts = (updatedContacts: any) => {
  localContacts.value = updatedContacts;
};

const processVerification = () => {
  const formData = {
    category: verificationStore.verificationData.category,
    verificationPeriod: verificationStore.verificationData.verificationPeriod,
    description: localDescription.value,
    links: [...localLinks.value],
    contacts: { ...localContacts.value },
    screenshots: [...(verificationStore.verificationData.screenshots || [])],
  };
  verificationStore.setVerificationData(formData);
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};
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
}
.form-title {
  font-family: "Reza Zulmi Alfaizi Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
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
</style>
