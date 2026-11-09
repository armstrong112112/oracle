import type { MediaBox, MediaKind, MessageAction } from "~/entities/chat/model";

export interface MediaLaunch {
  url: string;
  kind: MediaKind;
  origin: MediaBox;
  source: HTMLElement | null;
  messageId: string | null;
}

export interface MediaSlide {
  url: string;
  kind: MediaKind;
  messageId: string;
}

export interface StageAction {
  id: MessageAction;
  label: string;
  icon: string;
  width: number;
  height: number;
}

export interface MediaStageApi {
  open: (launch: MediaLaunch) => Promise<void>;
}
