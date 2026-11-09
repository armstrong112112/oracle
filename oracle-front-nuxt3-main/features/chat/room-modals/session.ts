import { computed, reactive, unref, watch, type ComputedRef, type Ref } from "vue";
import { ChatRole } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";
import type { VacRoomUser } from "~/entities/chat/model";
import type {
  AdminRights,
  BanReason,
  DurationUnit,
  RoomDraft,
  RoomMember,
  RoomSanction,
  RoomSession,
} from "./types";

const sessions = reactive<Record<string, RoomSession>>({});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const handleOf = (name: string): string => name.replace(/\s+/g, "").toLowerCase();

const REASON_KEYS: Record<BanReason, string> = {
  spam: "chat.card.reasonSpam",
  nudes: "chat.card.reasonNudes",
  harassment: "chat.card.reasonHarassment",
  scam: "chat.card.reasonScam",
};

export const reasonMessageKey = (reason: BanReason): string => REASON_KEYS[reason];

export const formatStamp = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${MONTHS[date.getMonth()]} ${date.getFullYear()}, ${hours}:${minutes}`;
};

export const shiftDate = (amount: number, unit: DurationUnit): Date | null => {
  if (unit === "forever") {
    return null;
  }

  const date = new Date();
  const safe = Number.isFinite(amount) && amount > 0 ? Math.floor(amount) : 1;
  if (unit === "minutes") {
    date.setMinutes(date.getMinutes() + safe);
  } else if (unit === "hours") {
    date.setHours(date.getHours() + safe);
  } else if (unit === "months") {
    date.setMonth(date.getMonth() + safe);
  } else {
    date.setFullYear(date.getFullYear() + safe);
  }
  return date;
};

const emptyRights = (): AdminRights => ({
  changeInfo: false,
  manageMessages: false,
  banUsers: false,
  muteUsers: false,
  pinMessages: false,
  sendMessages: false,
  addAdmins: false,
});

const toMember = (user: VacRoomUser, role: ChatRole): RoomMember => ({
  id: user._id,
  name: user.username,
  handle: handleOf(user.username),
  avatar: user.avatar,
  role,
  promoted: role === ChatRole.Admin || role === ChatRole.Owner,
  tag: user.username.split(/\s+/)[0] || user.username,
  rights: emptyRights(),
});

export const useRoomSession = (roomId: Ref<string> | ComputedRef<string>) => {
  const store = useChatUiStore();
  const id = computed(() => unref(roomId));

  const ensure = (roomKey: string): void => {
    if (!roomKey || sessions[roomKey]?.ready) {
      return;
    }

    const room = store.findRoom(roomKey);
    if (!room) {
      return;
    }

    const extra = store.extras[roomKey];
    const members = room.users.map((user) =>
      toMember(user, user._id === store.currentUserId ? extra?.role ?? ChatRole.Member : ChatRole.Member),
    );
    const memberIds = new Set(members.map((member) => member.id));
    const outsiders = store.knownUsers.filter((user) => !memberIds.has(user._id));
    const sanctions: RoomSanction[] = [];

    if (outsiders[0]) {
      const person = toMember(outsiders[0], ChatRole.Member);
      sanctions.push({
        id: `seed-ban-${person.id}`,
        personId: person.id,
        name: person.name,
        handle: person.handle,
        avatar: person.avatar,
        kind: "ban",
        reason: "nudes",
        note: "",
        untilLabel: "12 Oct 2026",
      });
    }

    if (outsiders[1]) {
      const person = toMember(outsiders[1], ChatRole.Member);
      sanctions.push({
        id: `seed-mute-${person.id}`,
        personId: person.id,
        name: person.name,
        handle: person.handle,
        avatar: person.avatar,
        kind: "mute",
        reason: null,
        note: "2 Hours",
        untilLabel: "15 Oct 2026, 18:00",
      });
    }

    sessions[roomKey] = {
      ready: true,
      members,
      sanctions,
      draft: {
        name: room.roomName,
        visibility: extra?.paid ? "paid" : "private",
        price: "",
        billing: "months",
        sendMessages: true,
        sendMedia: true,
        slow: 0,
        history: "hidden",
      },
    };
  };

  watch(
    () => [id.value, store.rooms.length] as const,
    () => ensure(id.value),
    { immediate: true },
  );

  const session = computed(() => sessions[id.value] ?? null);

  const updateDraft = (partial: Partial<RoomDraft>): void => {
    const current = sessions[id.value];
    if (!current) {
      return;
    }
    current.draft = { ...current.draft, ...partial };
  };

  const removeMember = (memberId: string): void => {
    const current = sessions[id.value];
    if (!current) {
      return;
    }
    current.members = current.members.filter((member) => member.id !== memberId);
  };

  const togglePromote = (memberId: string): void => {
    const member = sessions[id.value]?.members.find((item) => item.id === memberId);
    if (!member || member.role === ChatRole.Owner) {
      return;
    }
    member.promoted = !member.promoted;
  };

  const promoteAdmin = (memberId: string): void => {
    const member = sessions[id.value]?.members.find((item) => item.id === memberId);
    if (!member || member.role === ChatRole.Owner) {
      return;
    }
    member.promoted = true;
    member.role = ChatRole.Admin;
    member.rights = member.rights ?? emptyRights();
    member.tag = member.tag || member.name.split(/\s+/)[0] || member.name;
  };

  const dismissAdmin = (memberId: string): void => {
    const member = sessions[id.value]?.members.find((item) => item.id === memberId);
    if (!member || member.role === ChatRole.Owner) {
      return;
    }
    member.promoted = false;
    member.role = ChatRole.Member;
  };

  const updateAdmin = (memberId: string, partial: { tag?: string; rights?: Partial<AdminRights> }): void => {
    const member = sessions[id.value]?.members.find((item) => item.id === memberId);
    if (!member) {
      return;
    }
    member.rights = { ...(member.rights ?? emptyRights()), ...partial.rights };
    if (partial.tag != null) {
      member.tag = partial.tag;
    }
  };

  const pushSanction = (
    member: RoomMember,
    kind: SanctionKind,
    reason: BanReason | null,
    untilLabel: string,
    note = "",
  ): void => {
    const current = sessions[id.value];
    if (!current) {
      return;
    }

    const next: RoomSanction = {
      id: `${kind}-${member.id}-${Date.now()}`,
      personId: member.id,
      name: member.name,
      handle: member.handle,
      avatar: member.avatar,
      kind,
      reason,
      note,
      untilLabel,
    };

    current.sanctions = [next, ...current.sanctions.filter((item) => item.personId !== member.id)];
    if (kind === "ban") {
      current.members = current.members.filter((item) => item.id !== member.id);
    }
  };

  const liftSanction = (sanctionId: string): void => {
    const current = sessions[id.value];
    if (!current) {
      return;
    }
    current.sanctions = current.sanctions.filter((item) => item.id !== sanctionId);
  };

  const changeDuration = (sanctionId: string, untilLabel: string, note?: string): void => {
    const row = sessions[id.value]?.sanctions.find((item) => item.id === sanctionId);
    if (!row) {
      return;
    }
    row.untilLabel = untilLabel;
    if (note != null) {
      row.note = note;
    }
  };

  const addMembers = (people: RoomMember[]): void => {
    const current = sessions[id.value];
    if (!current) {
      return;
    }
    const existing = new Set(current.members.map((member) => member.id));
    const next = people.filter((person) => !existing.has(person.id));
    current.members = [...current.members, ...next];
  };

  const candidates = computed((): RoomMember[] => {
    const taken = new Set((session.value?.members ?? []).map((member) => member.id));
    return store.knownUsers
      .filter((user) => !taken.has(user._id))
      .map((user) => toMember(user, ChatRole.Member))
      .sort((left, right) => left.name.localeCompare(right.name));
  });

  return {
    members: computed(() => session.value?.members ?? []),
    sanctions: computed(() => session.value?.sanctions ?? []),
    draft: computed(() => session.value?.draft ?? null),
    candidates,
    updateDraft,
    removeMember,
    togglePromote,
    promoteAdmin,
    dismissAdmin,
    updateAdmin,
    pushSanction,
    liftSanction,
    changeDuration,
    addMembers,
  };
};
