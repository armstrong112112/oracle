<template>
  <header class="pinned-screen">
    <button class="pinned-screen__back" type="button" :aria-label="t('chat.card.back')" @click="emit('close')">
      <img src="/svg/figma-icons/arrow.svg" width="22" height="22" alt="" />
    </button>
    <h1>{{ t("chat.card.pinnedMessages") }}</h1>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [] }>();
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.pinned-screen {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 8px;
  border-top: 1px solid #2b2741;
  background: #14131b;

  h1 {
    margin: 0;
    color: var(--primary-2);
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.3;
  }
}

.pinned-screen__back {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  img {
    display: block;
    transform: rotate(180deg);
  }
}
</style>
