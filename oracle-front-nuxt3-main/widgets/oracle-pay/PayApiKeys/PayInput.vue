<template>
  <div class="pay-input-container">
    <label v-if="label" class="pay-input-label">{{ label }}</label>
    <div class="pay-input-wrapper">
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        class="pay-input-value bg-none w-full border-0 outline-none h-full"
        :class="{ copied: isCopied }" />

      <div class="pay-input-actions">
        <!--        <img-->
        <!--          alt="Copy"-->
        <!--          src="/icons/oracle-pay/copy.svg"-->
        <!--          class="pay-input-icon"-->
        <!--          @click="copyToClipboard"-->
        <!--        />-->
        <img
          :class="share ? '' : 'visibility_hidden'"
          alt="Share"
          src="/icons/oracle-pay/share.svg"
          class="pay-input-icon"
          @click="shareValue" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  modelValue?: string;
  value?: string;
  share?: boolean;
  placeholder?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isCopied = ref(false);

// Support both v-model (modelValue) and value prop
const inputValue = computed({
  get: () => {
    // If modelValue is provided (v-model), use it
    if (props.modelValue !== undefined) {
      return props.modelValue;
    }
    // Otherwise use value prop if provided
    return props.value || "";
  },
  set: (val: string) => {
    emit("update:modelValue", val);
  },
});

const copyToClipboard = (): void => {
  const valueToCopy = inputValue.value;
  navigator.clipboard
    .writeText(valueToCopy)
    .then(() => {
      isCopied.value = true;

      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
};

const shareValue = (): void => {
  const valueToShare = inputValue.value;
  if (navigator.share) {
    navigator
      .share({
        title: valueToShare,
        text: valueToShare,
      })
      .catch((err) => {
        console.error("Failed to share: ", err);
      });
  } else {
    copyToClipboard();
    alert(
      "Sharing not supported on this browser. Value copied to clipboard instead."
    );
  }
};
</script>

<style scoped>
.pay-input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pay-input-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}

.pay-input-wrapper {
  background: #13121b;
  border-radius: 12px;
  padding: 4px 4px 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pay-input-value {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  flex: 1;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pay-input-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.pay-input-icon {
  cursor: pointer;
}
</style>
