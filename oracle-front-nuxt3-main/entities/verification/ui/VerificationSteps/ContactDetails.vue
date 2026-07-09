<template>
  <div>
    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          {{ $t("verification.contactDetails.title") }}
        </div>
        <div class="info" @click="openModal('contact')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <ContactsForm
        :contacts="localContacts"
        @update:contacts="updateContacts" />
      <div class="form-description">
        {{ $t("verification.contactDetails.description") }}
      </div>
    </div>

    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :button-text="'verification.contactDetails.understood'"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :cancel-text="`modals.${key}.cancelText`"
      :is-open="modal.isOpen"
      :is-cancel="false"
      :close="() => closeModal(key)" />
  </div>
</template>

<script setup lang="ts">
import { modals, type Modals } from "@/entities/verification/data/modal";
import ContactsForm from "@/entities/verification/ui/VerificationForm/ContactsForm.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationDialog from "@/widgets/verification/VerificationDialog/index.vue";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

// Composables
const verificationStore = useVerificationStore();

// Reactive state
const localModals = ref<Modals>(modals);
const localContacts = ref({
  telegram: "",
  matrix: "",
  signal: "",
  whatsapp: "",
  forum1: "",
  forum2: "",
});

// Methods
const updateContacts = (updatedContacts: any) => {
  localContacts.value = updatedContacts;
  validateForm();
};

const validateForm = () => {
  const isValid = checkIsValid();
  emit("validation-change", isValid);
};

const checkIsValid = () => {
  return Object.values(localContacts.value).some(
    (contact) => contact && contact.trim() !== ""
  );
};

const saveData = () => {
  const formData = {
    ...verificationStore.verificationData,
    contacts: { ...localContacts.value },
  };
  verificationStore.setVerificationData(formData);
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};

// Expose methods for parent component
const isValid = () => checkIsValid();

// Emits
const emit = defineEmits<{
  "validation-change": [isValid: boolean];
}>();

// Watchers
watch(
  () => verificationStore.verificationData,
  () => {
    validateForm();
  },
  { deep: true }
);

// Lifecycle hooks
onMounted(() => {
  if (
    verificationStore.verificationData &&
    verificationStore.verificationData.contacts
  ) {
    const { contacts } = verificationStore.verificationData;
    localContacts.value = {
      telegram: contacts.telegram || "",
      matrix: contacts.matrix || "",
      signal: contacts.signal || "",
      whatsapp: contacts.whatsapp || "",
      forum1: contacts.forum1 || "",
      forum2: contacts.forum2 || "",
    };
  }

  nextTick(() => {
    validateForm();
  });
});

onBeforeUnmount(() => {
  saveData();
});

// Expose methods for parent component
defineExpose({
  isValid,
});
</script>

<style scoped>
.form-row-parent {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
}
.info {
  cursor: pointer;
}
.form-description {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: #b2aaf9;
}
</style>
