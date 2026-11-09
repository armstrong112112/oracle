<template>
  <div class="invite">
    <RoomHeader leading="back" :title="t('chat.card.manageInvites')" @back="emit('back')" />
    <p class="invite__url">t.me/+AdmKsLcnG6MndGh</p>
    <div class="invite__actions">
      <button type="button" @click="onCopy">{{ copied ? t("chat.card.copied") : t("chat.menu.copy") }}</button>
      <button type="button">{{ t("chat.card.share") }}</button>
      <button type="button">{{ t("chat.card.qr") }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoomHeader from "~/features/chat/room-modals/RoomHeader.vue";

const emit = defineEmits<{
  back: [];
}>();

const INVITE_URL = "t.me/+AdmKsLcnG6MndGh";
const { t } = useI18n();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const onCopy = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(INVITE_URL);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch {
    copied.value = false;
  }
};

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.invite {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 220px;
  font-family: Inter, Roboto, sans-serif;
}

.invite__url {
  margin: 0;
  padding: 14px 16px;
  border-radius: 16px;
  background: #14131b;
  color: #fff;
  font-size: 14px;
  text-align: center;
}

.invite__actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.invite__actions button {
  min-height: 40px;
  padding: 8px 6px;
  border: 0;
  border-radius: 12px;
  background: #2c2a3d;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
</style>
