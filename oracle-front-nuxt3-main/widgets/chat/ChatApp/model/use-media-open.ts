import type { Ref } from "vue";
import { fileMediaKind } from "~/entities/chat/lib/media-files";
import { unwrapVacEvent } from "~/entities/chat/lib/to-vac";
import { VAC_MESSAGE_WRAPPER, closestInPath } from "~/entities/chat/lib/vac-shadow";
import type { VacMessageFile } from "~/entities/chat/model";
import type { MediaStageApi } from "~/widgets/chat/ChatMediaStage/types";

type OpenedFile = Partial<VacMessageFile> & { action?: string; file?: Partial<VacMessageFile> };

const MEDIA_SOURCES = ["vac-message-image", "vac-video-container"];

export const useMediaOpen = (stage: Ref<MediaStageApi | null>) => {
  let source: HTMLElement | null = null;
  let messageId: string | null = null;

  const remember = (event: Event): void => {
    source = MEDIA_SOURCES.map((name) => closestInPath(event, name)).find(Boolean) ?? null;
    messageId = closestInPath(event, VAC_MESSAGE_WRAPPER)?.id || null;
  };

  const take = (): { source: HTMLElement | null; messageId: string | null } => {
    const pending = { source, messageId };
    source = null;
    messageId = null;
    return pending;
  };

  const onOpenFile = (event: Event): void => {
    const wrapped = unwrapVacEvent<{ file?: OpenedFile }>(event)?.file;
    const pending = take();
    if (wrapped?.action && wrapped.action !== "preview") {
      return;
    }
    const file = wrapped?.file?.url ? wrapped.file : wrapped;
    const kind = file ? fileMediaKind(file) : null;
    if (!file?.url || !kind || !pending.source) {
      return;
    }
    const rect = pending.source.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      return;
    }
    void stage.value?.open({
      url: file.url,
      kind,
      messageId: pending.messageId,
      source: pending.source,
      origin: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
    });
  };

  return { remember, onOpenFile };
};
