import type { MessageAction } from "~/entities/chat/model";

export interface MenuAction {
  id: MessageAction;
  label: string;
  icon?: string;
}
