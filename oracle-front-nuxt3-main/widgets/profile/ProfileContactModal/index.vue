<template>
  <div>
    <transition name="slide-left" appear>
      <div
        v-if="isDialogVisible"
        ref="dialogOverlay"
        class="dialog-overlay"
        tabindex="0"
        @keydown.esc="closeDialog">
        <div
          class="dialog-overlay category_overlay"
          @click.stop="closeDialog"></div>
        <div class="dialog category_dialog">
          <div class="dialog_drag_icon" @click="closeDialog"></div>
          <div class="dialog_header flex items-center justify-between">
            <div class="flex items-center justify-between w-full">
              <div class="category_header_title">
                {{
                  $t(
                    isEditMode
                      ? "whitelist.profile.editingContact"
                      : "whitelist.profile.addingContact"
                  )
                }}
              </div>
              <img
                src="/icons/profile/close.svg"
                alt="close"
                @click="closeDialog" />
            </div>
          </div>
          <div class="dialog_body flex flex-col gap-24 pb-24">
            <div v-if="!isEditMode" class="contact_cards py-16">
              <div
                v-for="contact in contacts"
                :key="contact.name"
                class="contact_card"
                :class="{
                  selected:
                    selectedContact && selectedContact.name === contact.name,
                }"
                @click="selectContact(contact)">
                <img
                  :src="`/icons/verification/${contact.icon}.svg`"
                  :alt="contact.icon" />
                <div class="contact_card_title">
                  {{ contact.name }}
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col gap-8 py-16">
              <TheInput
                v-for="(contact, key) in savedContacts"
                :key="key"
                class="contact_card_input"
                :value="contact.value"
                :placeholder="
                  $t('whitelist.profile.contactLinkPlaceholder', {
                    name: contact.name,
                  })
                "
                :is-read-only="false"
                :image="contact.icon"
                :is-remove="false"
                @update:value="updateContactValue(key, $event)" />
            </div>
            <div v-if="!isEditMode" class="flex flex-col gap-8 py-16">
              <TheInput
                class="contact_card_input"
                :is-remove="false"
                :is-read-only="false"
                :placeholder="$t('whitelist.profile.linkName')"
                :value="selectedContact?.name"
                disabled />
              <TheInput
                class="contact_card_input"
                :is-remove="false"
                :is-read-only="false"
                :placeholder="$t('whitelist.profile.linkHere')"
                :value="linkUrl"
                @update:value="updateLink($event)" />
            </div>
            <div class="form-footer">
              <CustomButton
                class="mt-20 w-full"
                :value="$t('whitelist.profile.save')"
                type="primary"
                @click="saveContact" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { type ContactsType } from "~/entities/verification/data/contacts";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";

interface SavedContact {
  name: string;
  icon: string;
  value: string;
}

interface Props {
  contacts: ContactsType[];
  isEditMode: boolean;
  savedContacts?: Record<string, SavedContact>;
}

const props = withDefaults(defineProps<Props>(), {
  savedContacts: () => ({}),
});

const emit = defineEmits<{
  (
    e: "add:contact",
    contact: { id: string; icon: string; value: string }
  ): void;
  (e: "update:contact", contact: { id: string; value: string }): void;
  (e: "toggle-no-data"): void;
}>();

// Template refs
const dialogOverlay = ref<HTMLElement | null>(null);

// State
const isDialogVisible = ref(false);
const selectedContact = ref<ContactsType | null>(null);
const linkUrl = ref("");
const editingId = ref("");
const isEditingAllContacts = ref(false);
const contactsToEdit = ref<Record<string, SavedContact>>({});
const updatedContacts = ref<Record<string, SavedContact>>({});

// Computed
const selectedContactName = computed((): string => {
  return selectedContact.value ? selectedContact.value.name : "";
});

// Methods
const updateLink = (value: string) => {
  linkUrl.value = value;
};

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isDialogVisible.value) {
    closeDialog();
  }
};

const updateContactValue = (key: string, value: string) => {
  // Create a local copy to track changes if not already created
  if (Object.keys(updatedContacts.value).length === 0) {
    updatedContacts.value = { ...props.savedContacts };
  }

  // Update the value in our local copy
  if (updatedContacts.value[key]) {
    updatedContacts.value = {
      ...updatedContacts.value,
      [key]: {
        ...updatedContacts.value[key],
        value,
      },
    };
  }
};

const toggleDialog = (isEditing = false, contactId = "", contactValue = "") => {
  isDialogVisible.value = !isDialogVisible.value;
  isEditingAllContacts.value = false;
  updatedContacts.value = {}; // Reset updated contacts

  if (isEditing) {
    editingId.value = contactId;
    // Find the contact by ID (which is the name)
    selectedContact.value =
      props.contacts.find((c) => c.name === contactId) || null;
    linkUrl.value = contactValue;
  } else {
    resetForm();
  }

  nextTick(() => {
    if (isDialogVisible.value) {
      dialogOverlay.value?.focus();
    }
  });
};

const closeDialog = () => {
  isDialogVisible.value = false;
  resetForm();
};

const resetForm = () => {
  selectedContact.value = null;
  linkUrl.value = "";
  editingId.value = "";
  isEditingAllContacts.value = false;
  contactsToEdit.value = {};
  updatedContacts.value = {};
};

const selectContact = (contact: ContactsType) => {
  selectedContact.value = contact;
};

const saveContact = () => {
  if (!props.isEditMode) {
    // Add mode
    if (!selectedContact.value?.name) {
      return;
    }

    if (linkUrl.value) {
      emit("add:contact", {
        id: selectedContact.value.name,
        icon: selectedContact.value.icon,
        value: linkUrl.value,
      });
    }
  } else {
    // Edit mode - check if we have any updates
    if (Object.keys(updatedContacts.value).length > 0) {
      // Emit updates for each changed contact
      Object.entries(updatedContacts.value).forEach(([key, contact]) => {
        emit("update:contact", {
          id: key,
          value: contact.value,
        });
      });
    }
  }
  emit("toggle-no-data");
  closeDialog();
};

// Expose methods for parent component
defineExpose({
  toggleDialog,
});

// Lifecycle
onMounted(() => {
  window.addEventListener("keydown", handleEscKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscKey);
});
</script>

<style lang="scss">
@use "~/assets/styles/widgets/profile-contact-modal.scss" as *;
</style>
