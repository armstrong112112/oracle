<template>
  <div class="flex flex-col gap-20">
    <div class="form-row-parent">
      <ChooseCategory
        :values="typeofComplaint"
        :multi-select="false"
        :show-title="false"
        placeholder="Type of Complaint"
        :is-dialog-visible="false"
        @update:categories="onComplaintTypeChange" />
      <div
        v-if="touched.complaintType && errors.complaintType"
        class="error_text">
        {{ errors.complaintType }}
      </div>
    </div>

    <div class="form-row-parent flex flex-col gap-8">
      <!-- Dynamic inputs -->
      <div v-for="(field, idx) in fields" :key="idx" class="form-input-wrapper">
        <TheInput
          :placeholder="field.label"
          :value="(blackListStore.subjectData[field.key] as string)"
          :is-remove="false"
          @update:value="onFieldInput(field.key, $event)" />

        <div v-if="touched[field.key] && errors[field.key]" class="error_text">
          {{ errors[field.key] }}
        </div>
      </div>
    </div>

    <div class="form-row-parent">
      <ChooseCategory
        :values="typeofViolation"
        :multi-select="false"
        :show-title="false"
        placeholder="Type of Violation"
        :is-dialog-visible="false"
        @update:categories="onViolationTypeChange" />
      <div
        v-if="touched.violationType && errors.violationType"
        class="error_text">
        {{ errors.violationType }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlackListStore } from "@/store/blackList";
import type { BlackListSubjectData } from "@/store/blackList/blackList.types";
import type { Category } from "~/entities/verification/data/categories";
import ChooseCategory from "~/entities/verification/ui/VerificationForm/ChooseCategory.vue";
import TheInput from "~/components/ui/TheInput.vue";

const emit = defineEmits<{
  "validation-change": [isValid: boolean];
}>();

const blackListStore = useBlackListStore();

const touched = ref<Record<string, boolean>>({});

// form fields config
const fields: {
  key: keyof BlackListSubjectData;
  label: string;
  required: boolean;
}[] = [
  { key: "username", label: "Username / Handle ", required: false },
  { key: "profileUrl", label: "Profile URL", required: false },
  { key: "telegram", label: "Telegram link *", required: true },
  { key: "website", label: "Website Link *", required: true },
  { key: "email", label: "Email *", required: true },
];

// error state
const errors = ref<Record<string, string>>({});

const typeofComplaint: Category[] = [
  { title: "Person", id: 1 },
  { id: 2, title: "Service / Company" },
  { id: 3, title: "Platform Listing / Post" },
];

const typeofViolation: Category[] = [
  { id: 1, title: "Fraud / Scam" },
  { id: 2, title: "Misrepresentation" },
  { id: 3, title: "Harassment / Abuse" },
  { id: 4, title: "Unauthorized Charge" },
  { id: 5, title: "Data Privacy" },
  { id: 6, title: "Other" },
];

const validateForm = () => {
  errors.value = {};

  if (!blackListStore.subjectData.complaintType) {
    errors.value.complaintType = "Type of Complaint is required";
  }

  if (!blackListStore.subjectData.violationType) {
    errors.value.violationType = "Type of Violation is required";
  }

  fields.forEach((f) => {
    const key = f.key as keyof BlackListSubjectData;
    if (f.required && !blackListStore.subjectData[key]) {
      errors.value[key as string] = `${f.label} is required`;
    }
  });

  emit("validation-change", Object.keys(errors.value).length === 0);
};

const onFieldInput = (key: keyof BlackListSubjectData, val: string) => {
  blackListStore.setSubjectData({ [key]: val });
  touched.value[key] = true;
};

const onComplaintTypeChange = (val: Category[]) => {
  const id = val?.[0]?.id ?? null;
  blackListStore.setSubjectData({ complaintType: id });
  touched.value.complaintType = true;
};

const onViolationTypeChange = (val: Category[]) => {
  const id = val?.[0]?.id ?? null;
  blackListStore.setSubjectData({ violationType: id });
  touched.value.violationType = true;
};

// Watch for store changes to validate form
watch(
  () => blackListStore.subjectData,
  () => {
    validateForm();
  },
  { deep: true }
);
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
.error_text {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #f64e2a;
}
</style>
