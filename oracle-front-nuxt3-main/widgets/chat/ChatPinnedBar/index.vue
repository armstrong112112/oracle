<template>
  <div class="pinned-bar">
    <button class="pinned-bar__main" type="button" @click="message && emit('pick', message._id)">
      <span class="pinned-bar__mark" :class="{ 'is-stack': messages.length > 1 }">
        <img v-if="messages.length < 2" src="/svg/figma-icons/pinned-line.svg" width="32" height="1" alt="" />
        <template v-else>
          <span
            v-for="(item, index) in messages"
            :key="item._id"
            class="pinned-bar__tick"
            :class="{ 'is-active': index === activeIndex }"
          />
        </template>
      </span>
      <span v-if="thumb" class="pinned-bar__thumb">
        <img :src="thumb" alt="" />
      </span>
      <span class="pinned-bar__copy">
        <span class="pinned-bar__title">{{ t("chat.card.pinnedMessage") }}</span>
        <span class="pinned-bar__preview">{{ preview }}</span>
      </span>
    </button>
    <button
      v-if="listed"
      class="pinned-bar__list"
      type="button"
      :aria-label="t('chat.card.pinnedMessages')"
      @click="emit('list')"
    >
      <img src="/svg/figma-icons/lines.svg" width="24" height="24" alt="" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { fileMediaKind } from "~/entities/chat/lib/media-files";
import { MediaKind } from "~/entities/chat/model";
import type { VacMessage } from "~/entities/chat/model";

const props = defineProps<{ messages: VacMessage[]; activeIndex: number; listed?: boolean }>();
const emit = defineEmits<{ pick: [messageId: string]; list: [] }>();

const { t } = useI18n();

const message = computed(
  () => props.messages[props.activeIndex] ?? props.messages[props.messages.length - 1] ?? null,
);

const mediaFile = computed(() => (message.value?.files ?? []).find((file) => fileMediaKind(file)) ?? null);

const thumb = computed(() => mediaFile.value?.preview || mediaFile.value?.url || "");

const preview = computed(() => {
  const text = message.value?.content?.trim();
  if (text) {
    return text;
  }
  if (fileMediaKind(mediaFile.value ?? {}) === MediaKind.Video) {
    return t("chat.card.video");
  }
  if (mediaFile.value) {
    return t("chat.card.photo");
  }
  return "";
});
</script>

<style lang="scss" scoped src="./ChatPinnedBar.scss"></style>
