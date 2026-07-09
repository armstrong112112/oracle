<template>
  <div class="links flex flex-col gap-10">
    <TheInput
  v-for="(value, key) in contacts"
  :key="key"
  :value="value"
  :placeholder="$t('verification.contactDetails.placeholder', { contact: capitalize(key) })"
  :is-read-only="false"
  :image="key"
  :is-remove="false"
  @update:value="updateContact(key, $event)"
/>

  </div>
</template>

<script setup lang="ts">
import TheInput from "~/components/ui/TheInput.vue"

interface Props {
  contacts: Record<string, string>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:contacts': [contacts: Record<string, string>]
}>()

const updateContact = (field: string, value: string) => {
  const updatedContacts = { ...props.contacts, [field]: value }
  emit('update:contacts', updatedContacts)
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>
