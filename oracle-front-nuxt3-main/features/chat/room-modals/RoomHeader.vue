<template>
  <header class="room-header">
    <button
      class="room-header__leading"
      :class="{ 'is-cancel': leading === 'cancel' }"
      type="button"
      @click="emit('back')"
    >
      <svg v-if="leading === 'back'" width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
        <path d="M6.43 1.75L1.93 7l4.5 5.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span v-else>{{ t("chat.cancel") }}</span>
    </button>
    <h2 class="room-header__title">{{ title }}</h2>
    <button
      v-if="trailing"
      class="room-header__trailing"
      type="button"
      :disabled="trailingDisabled"
      @click="emit('trailing')"
    >
      {{ trailing }}
    </button>
    <span v-else class="room-header__trailing" />
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  leading?: "back" | "cancel";
  trailing?: string;
  trailingDisabled?: boolean;
}>();

const emit = defineEmits<{
  back: [];
  trailing: [];
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.room-header {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) 88px;
  align-items: center;
  min-height: 36px;
  margin-bottom: 12px;
  font-family: Inter, Roboto, sans-serif;
}

.room-header__leading,
.room-header__trailing {
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.room-header__leading {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0;
}

.room-header__leading.is-cancel {
  color: #f64e2a;
}

.room-header__trailing {
  justify-self: end;
  padding: 0;
}

.room-header__trailing:disabled {
  opacity: 0.35;
  cursor: default;
}

.room-header__title {
  margin: 0;
  overflow: hidden;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
