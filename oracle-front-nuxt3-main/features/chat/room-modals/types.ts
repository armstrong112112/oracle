import type { ChatRole } from "~/entities/chat/model";

export type DurationUnit = "minutes" | "hours" | "months" | "years" | "forever";
export type RoomVisibility = "public" | "private" | "paid";
export type BillingPeriod = "months" | "weeks" | "once";
export type BanReason = "spam" | "nudes" | "harassment" | "scam";
export type SanctionKind = "ban" | "mute";

export interface AdminRights {
  changeInfo: boolean;
  manageMessages: boolean;
  banUsers: boolean;
  muteUsers: boolean;
  pinMessages: boolean;
  sendMessages: boolean;
  addAdmins: boolean;
}

export interface RoomMember {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: ChatRole;
  promoted: boolean;
  tag: string;
  rights: AdminRights;
}

export interface RoomSanction {
  id: string;
  personId: string;
  name: string;
  handle: string;
  avatar: string;
  kind: SanctionKind;
  reason: BanReason | null;
  note: string;
  untilLabel: string;
}

export interface RoomDraft {
  name: string;
  visibility: RoomVisibility;
  price: string;
  billing: BillingPeriod;
  sendMessages: boolean;
  sendMedia: boolean;
  slow: number;
  history: "visible" | "hidden";
}

export interface RoomSession {
  ready: boolean;
  members: RoomMember[];
  sanctions: RoomSanction[];
  draft: RoomDraft;
}
