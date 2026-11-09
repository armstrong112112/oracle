<template>
  <div class="invite">
    <p class="invite__url">{{ url }}</p>
    <div class="invite__actions">
      <button type="button" @click="onCopy">
        {{ copied ? t("chat.card.copied") : t("chat.menu.copy") }}
      </button>
      <button type="button" @click="onShare">{{ t("chat.card.share") }}</button>
      <button type="button" @click="qrOpen = !qrOpen">{{ t("chat.card.qr") }}</button>
    </div>
    <p v-if="qrOpen" class="invite__code">{{ url }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  url: string;
}>();

const { t } = useI18n();
const copied = ref(false);
const qrOpen = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const onCopy = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(props.url.startsWith("http") ? props.url : `https://${props.url}`);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch {
    copied.value = false;
  }
};

const onShare = async (): Promise<void> => {
  const link = props.url.startsWith("http") ? props.url : `https://${props.url}`;
  if (navigator.share) {
    try {
      await navigator.share({ url: link });
      return;
    } catch {
      return;
    }
  }
  await onCopy();
};

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.invite {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.invite__url,
.invite__code {
  display: flex;
  align-items: center;
  height: 44px;
  margin: 0;
  padding: 0 16px;
  border-radius: 16px;
  background: #14131b;
  color: var(--primary-3);
  font: 400 16px/1.4 Roboto, Inter, sans-serif;
}

.invite__actions {
  display: flex;
  gap: 8px;
}

.invite__actions button {
  flex: 1;
  height: 36px;
  padding: 0 8px;
  border: 0;
  border-radius: 12px;
  background: #2c2a3d;
  color: var(--primary-3);
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
  cursor: pointer;
}

.invite__code {
  justify-content: center;
  height: auto;
  min-height: 88px;
  text-align: center;
  word-break: break-all;
}
</style>
