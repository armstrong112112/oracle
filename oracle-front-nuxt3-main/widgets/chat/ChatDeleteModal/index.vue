<template>
  <Teleport to="body">
    <div v-if="isOpen" class="delete-sheet" @mousedown="onBackdrop">
      <div class="delete-sheet__preview">
        <article v-if="message" class="delete-sheet__card" :class="{ 'is-text': !media }">
          <div v-if="media" class="delete-sheet__media" :class="{ 'is-solo': !caption }">
            <img class="delete-sheet__shot" :src="media.url" alt="" />
            <span v-if="media.video" class="delete-sheet__play">
              <img src="/svg/figma-icons/play.svg" width="24" height="24" alt="" />
            </span>
            <span v-if="message.timestamp" class="delete-sheet__chip">{{ message.timestamp }}</span>
          </div>
          <div v-if="caption || !media" class="delete-sheet__caption">
            <p v-if="caption">{{ caption }}</p>
            <time v-if="message.timestamp">{{ message.timestamp }}</time>
          </div>
        </article>
      </div>
      <div class="delete-sheet__actions">
        <button type="button" @click="confirm(DeleteScope.Me)">{{ t("chat.menu.deleteForMe") }}</button>
        <button class="is-both" type="button" @click="confirm(DeleteScope.Both)">{{ t("chat.menu.deleteForBoth") }}</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { fileMediaKind } from "~/entities/chat/lib/media-files";
import { ChatModalName, DeleteScope, MediaKind } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";
import type { ChatDeleteMessagesPayload, VacMessage } from "~/entities/chat/model";

const { t } = useI18n();
const store = useChatUiStore();

const payload = computed(
  () => (store.modal.payload as ChatDeleteMessagesPayload | null) ?? null,
);
const isOpen = computed(() => store.modal.name === ChatModalName.DeleteMessages && Boolean(payload.value));

const message = computed((): VacMessage | null => {
  const data = payload.value;
  if (!data) {
    return null;
  }

  const messages = store.messagesByRoom[data.roomId] ?? [];
  return messages.find((item) => data.messageIds.includes(item._id)) ?? null;
});

const media = computed(() => {
  const current = message.value;
  if (!current?.files?.length) {
    return null;
  }

  for (const file of current.files) {
    const kind = fileMediaKind(file);
    const video = kind === MediaKind.Video;
    const url = video ? file.preview : file.preview || file.url;
    if (kind && url) {
      return { url, video };
    }
  }

  return null;
});

const caption = computed(() => {
  const text = message.value?.content?.trim();
  if (text) {
    return text;
  }
  if (media.value) {
    return "";
  }
  return message.value?.files?.[0]?.name ?? "";
});

const onBackdrop = (event: MouseEvent): void => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  if (target.closest(".delete-sheet__card, .delete-sheet__actions")) {
    return;
  }
  close();
};

const close = (): void => {
  if (isOpen.value) {
    store.closeModal();
  }
};

const confirm = (scope: DeleteScope): void => {
  const data = payload.value;
  if (!data?.messageIds.length) {
    close();
    return;
  }

  store.deleteMessages(data.roomId, data.messageIds, scope);
  store.closeModal();
};

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key !== "Escape" || !isOpen.value) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  close();
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown, true);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown, true);
});
</script>

<style lang="scss" scoped>
.delete-sheet {
  position: fixed;
  inset: 0;
  z-index: 4100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 24px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12.5px);
}

.delete-sheet__preview {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
}

.delete-sheet__card {
  width: 280px;
}

.delete-sheet__media {
  position: relative;
  height: 170px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.delete-sheet__media.is-solo {
  border-radius: 12px;
}

.delete-sheet__card.is-text .delete-sheet__caption {
  border-radius: 12px;
}

.delete-sheet__shot {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-sheet__play {
  position: absolute;
  left: 8px;
  bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.delete-sheet__chip {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 4px 8px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(16px);
  color: var(--primary-3);
  font: 400 12px/1.35 Roboto, Inter, sans-serif;
}

.delete-sheet__caption {
  position: relative;
  min-height: 56px;
  padding: 8px 12px 22px;
  border-radius: 0 0 4px 16px;
  background: #14131b;
  color: var(--primary-3);
  font: 400 14px/1.4 Roboto, Inter, sans-serif;

  p {
    margin: 0;
  }

  time {
    position: absolute;
    right: 12px;
    bottom: 8px;
    color: #8780cf;
    font: 500 12px/1.35 Roboto, Inter, sans-serif;
  }
}

.delete-sheet__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(343px, 100%);
}

.delete-sheet__actions button {
  height: 44px;
  border: 0;
  border-radius: 14px;
  background: var(--primary-2);
  color: var(--primary-3);
  font: 400 16px/1.4 Roboto, Inter, sans-serif;
  cursor: pointer;
}

.delete-sheet__actions button.is-both {
  background: #1b1a24;
}
</style>
