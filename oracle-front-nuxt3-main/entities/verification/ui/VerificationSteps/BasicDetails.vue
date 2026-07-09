<template>
  <div class="flex flex-col gap-20">
    <!-- Description -->
    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          {{ $t("verification.basicDetails.title") }}
        </div>
        <div class="info" @click="openModal('business')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <textarea
        v-model="localDescription"
        :placeholder="$t('verification.basicDetails.placeholder')"
        class="verification-textarea"
        maxlength="500"
        @input="validateForm" />
      <div class="max-length">{{ localDescription.length }} / 500</div>
    </div>

    <!-- Business Links -->
    <div class="form-row-parent">
      <div class="form-row">
        <div class="form-title">
          {{ $t("verification.basicDetails.businessPresence") }}
        </div>
        <div class="info" @click="openModal('links')">
          <img src="/icons/verification/info.svg" alt="" />
        </div>
      </div>
      <div class="flex flex-col gap-16">
        <template v-for="(link, index) in visibleLinks" :key="`link-${index}`">
          <div class="links flex flex-col gap-4">
            <div class="link_header flex items-center justify-between">
              <div class="link_title">
                {{
                  $t("verification.basicDetails.linkLabel", {
                    index: index + 1,
                  })
                }}
              </div>
              <div class="link_icon cursor-pointer" @click="removeLink(index)">
                <img src="/icons/verification/white_close.svg" alt="" />
              </div>
            </div>
            <TheInput
              :value="link.link"
              :placeholder="$t('verification.basicDetails.linkPlaceholder')"
              :is-read-only="false"
              :is-remove="false"
              @update:value="updateLink(index, 'link', $event)" />
            <TheInput
              :value="link.description"
              :placeholder="
                $t('verification.basicDetails.descriptionPlaceholder')
              "
              :is-read-only="false"
              :is-remove="false"
              @update:value="updateLink(index, 'description', $event)" />
          </div>
          <div
            v-if="index < visibleLinksCount - 1"
            :key="`divider-${index}`"
            class="input_line"></div>
        </template>

        <CustomButton
          v-if="visibleLinksCount < 4"
          :value="$t('verification.basicDetails.addLink')"
          class="w-full"
          type="secondary"
          @click="addLink" />
      </div>
    </div>

    <!-- Modals -->
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :button-text="'verification.basicDetails.understood'"
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
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { useVerificationStore } from "@/store/verification";
import VerificationDialog from "@/widgets/verification/VerificationDialog/index.vue";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

// Composables
const verificationStore = useVerificationStore();

// Reactive state
const localModals = ref<Modals>(modals);
const localDescription = ref("");
const localLinks = ref<Array<{ link: string; description: string }>>([
  { link: "", description: "" },
  { link: "", description: "" },
  { link: "", description: "" },
  { link: "", description: "" },
]);
const visibleLinksCount = ref(1);

// Computed properties
const visibleLinks = computed(() =>
  localLinks.value.slice(0, visibleLinksCount.value)
);

// Methods
const updateLink = (
  index: number,
  field: "link" | "description",
  value: string
) => {
  const updated = { ...localLinks.value[index] };
  updated[field] = value;
  localLinks.value.splice(index, 1, updated);
  validateForm();
};

const removeLink = (index: number) => {
  if (visibleLinksCount.value > 1) {
    localLinks.value.splice(index, 1);
    localLinks.value.push({ link: "", description: "" });
    visibleLinksCount.value--;
    validateForm();
  }
};

const addLink = () => {
  if (visibleLinksCount.value < 4) {
    visibleLinksCount.value++;
  }
};

const validateForm = () => {
  const isValid = checkIsValid();
  emit("validation-change", isValid as boolean);
  return isValid;
};

const checkIsValid = () => {
  const hasDescription =
    localDescription.value && localDescription.value.trim().length > 0;

  const hasValidLink = visibleLinks.value.some(
    (link) =>
      (link.link && link.link.trim() !== "") ||
      (link.description && link.description.trim() !== "")
  );

  return hasDescription && hasValidLink;
};

const saveData = () => {
  const filledLinks = localLinks.value
    .slice(0, visibleLinksCount.value)
    .filter(
      (link) => link.link.trim() !== "" || link.description.trim() !== ""
    );

  const formData = {
    ...verificationStore.verificationData,
    description: localDescription.value,
    links: filledLinks,
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
  if (verificationStore.verificationData) {
    const { verificationData } = verificationStore;
    localDescription.value = verificationData.description || "";

    if (verificationData.links && verificationData.links.length > 0) {
      localLinks.value = JSON.parse(JSON.stringify(verificationData.links));

      if (localLinks.value.length < 4) {
        const missing = 4 - localLinks.value.length;
        for (let i = 0; i < missing; i++) {
          localLinks.value.push({ link: "", description: "" });
        }
      }
    }
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

.input_line {
  width: 100%;
  height: 1px;
  background: #67639a;
}
.link_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
.link_title {
  font-family: Roboto;
  font-weight: 500;
  font-style: Medium;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
}
</style>
