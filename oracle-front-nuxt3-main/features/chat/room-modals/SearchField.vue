<template>
  <input-oracle
    class="room-search"
    :search="true"
    :placeholder="placeholder || t('chat.card.search')"
    :v="modelValue"
    @changed="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import InputOracle from "~/components/input-oracle.vue";

withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
  }>(),
  {
    placeholder: "",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.room-search {
  :deep(input) {
    background: #13121b;
    border-radius: 12px;

    &::placeholder {
      color: #67639a;
    }
  }
}
</style>
