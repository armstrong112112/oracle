<template>
  <div class="sheet">
    <button class="sheet__backdrop" type="button" :aria-label="t('chat.cancel')" @click="emit('cancel')" />
    <div class="sheet__card">
      <slot />
      <button class="sheet__continue" type="button" :disabled="continueDisabled" @click="emit('continue')">
        {{ t("chat.card.continue") }}
      </button>
      <button class="sheet__cancel" type="button" @click="emit('cancel')">
        {{ t("chat.cancel") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    continueDisabled?: boolean;
  }>(),
  {
    continueDisabled: false,
  },
);

const emit = defineEmits<{
  continue: [];
  cancel: [];
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.sheet {
  position: absolute;
  z-index: 8;
  inset: 0;
  display: flex;
  align-items: flex-end;
}

.sheet__backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(0, 0, 0, 0.55);
  cursor: pointer;
}

.sheet__card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 16px 16px 0 0;
  background: #14131b;
  text-align: center;
}

.sheet__continue,
.sheet__cancel {
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  font-family: Inter, Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.sheet__continue {
  background: #f64e2a;
}

.sheet__continue:disabled {
  opacity: 0.45;
  cursor: default;
}

.sheet__cancel {
  background: #1b1a24;
}
</style>
