<template>
  <div class="profile_review_card" style="gap: 8 !important">
    <div
      v-if="Object.keys(savedContacts).length === 0"
      class="profile_review_card_no flex flex-col justify-center items-center"
      @click="openContactModal">
      <div class="flex flex-col gap-4 justify-center">
        <div class="profile_review_card_no_title">
          {{ $t("whitelist.profile.contacts.title") }}
        </div>
        <div class="profile_review_card_no_description">
          {{ $t("whitelist.profile.contacts.addDetails") }}
        </div>
      </div>
      <img
        src="/icons/profile/plus.svg"
        alt="plus"
        style="width: 24px"
        class="plus_icon cursor-pointer flex m-auto" />
    </div>
    <div
      v-if="Object.keys(savedContacts).length !== 0"
      class="profile_deposit_card_header">
      <div class="flex items-center gap-8">
        <div class="profile_card_title">
          {{ $t("whitelist.profile.contacts.title") }}
        </div>
      </div>
      <div v-if="!isUser" class="rating">
        <img
          src="/icons/profile/plus.svg"
          alt="plus"
          class="plus_icon cursor-pointer"
          @click="openContactModal" />
        <img
          v-if="Object.keys(savedContacts).length > 0"
          src="/icons/profile/edit.svg"
          alt="edit"
          class="star_icon cursor-pointer"
          @click="editMode" />
      </div>
    </div>
    <div
      v-if="savedContacts && Object.keys(savedContacts).length > 0"
      class="profile_deposit_card_body">
      <div class="links flex flex-col gap-10">
        <div class="flex flex-col gap-8">
          <TheInput
            v-for="(contact, key) in savedContacts"
            :key="key"
            :value="contact.value"
            :placeholder="`Your ${contact.name} link`"
            :is-read-only="true"
            :image="contact.icon"
            :is-remove="false"
            @click="editContact(key)" />
        </div>
      </div>
    </div>

    <ProfileContactModal
      ref="contactModal"
      :contacts="contacts"
      :saved-contacts="savedContacts"
      :is-edit-mode="isEditMode"
      @add:contact="addContact"
      @update:contact="updateContactFromModal"
      @click="$emit('toggle-no-data')" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  contacts,
  type ContactsType,
} from "~/entities/verification/data/contacts";
import TheInput from "~/components/ui/TheInput.vue";
import ProfileContactModal from "~/widgets/profile/ProfileContactModal/index.vue";

interface SavedContact {
  name: string;
  icon: string;
  value: string;
}

// Props
interface Props {
  isUser?: boolean;
  isNoData?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isUser: false,
  isNoData: false,
});

// Emits
const emit = defineEmits<{
  "toggle-no-data": [];
  "update:contacts": [contacts: Record<string, SavedContact>];
}>();

// Template refs
const contactModal = ref();

// Reactive state
const contactsList: ContactsType[] = contacts;
const savedContacts = ref<Record<string, SavedContact>>({});
const isEditMode = ref<boolean>(false);

// Methods
const openContactModal = () => {
  isEditMode.value = false;
  contactModal.value?.toggleDialog();
};

const editMode = () => {
  isEditMode.value = true;
  contactModal.value?.toggleDialog();
};

const editContact = (contactId: string) => {
  const contact = savedContacts.value[contactId];
  if (contact) {
    isEditMode.value = false; // Switch to single contact edit mode
    contactModal.value?.toggleDialog(true, contactId, contact.value);
  }
};

const addContact = ({
  id,
  icon,
  value,
}: {
  id: string;
  icon: string;
  value: string;
}) => {
  const contact = {
    name: id,
    icon,
    value,
  };

  savedContacts.value = {
    ...savedContacts.value,
    [id]: contact,
  };

  emit("update:contacts", savedContacts.value);
};

const updateContactFromModal = ({
  id,
  value,
}: {
  id: string;
  value: string;
}) => {
  if (savedContacts.value[id]) {
    savedContacts.value = {
      ...savedContacts.value,
      [id]: {
        ...savedContacts.value[id],
        value,
      },
    };
    emit("update:contacts", savedContacts.value);
  }
};

// Lifecycle
onMounted(() => {
  if (props.isUser) {
    addContact({
      id: "Telegram",
      icon: "telegram",
      value: "Telegram",
    });
  }
});
</script>
<style scoped>
.profile_review_card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px;
}

.profile_deposit_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.profile_card_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: #ffffff;
}
.profile_review_card_no {
  padding-top: 24px;
  padding-bottom: 24px;
  gap: 24px;
  border-radius: 12px;
  border: 1px solid #2b2741;
  cursor: pointer;
}
.profile_review_card_no_title {
  font-family: Roboto;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
  text-align: center;
}
.profile_review_card_no_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #b2aaf9;
}
.m-auto {
  margin: 0 auto;
}
</style>
