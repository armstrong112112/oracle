<template>
  <div class="group-section-root">
  <GroupTypeScreen
    v-if="page === 'type'"
    :room-id="roomId"
    @back="emit('back')"
    @invites="emit('open', 'invite')"
  />

  <MembersPanel
    v-else-if="page === 'members'"
    :room-id="roomId"
    :role="role"
    @back="emit('back')"
    @add="emit('open', 'add')"
  />

  <AddMembersPanel
    v-else-if="page === 'add'"
    :room-id="roomId"
    @cancel="emit('back')"
    @continue="emit('back')"
  />

  <BansPanel v-else-if="page === 'bans'" :room-id="roomId" @back="emit('back')" />

  <section v-else-if="page === 'add-admin'" class="group-section admins-pick">
    <header class="admins-pick__bar">
      <button type="button" @click="emit('back')">{{ t("chat.cancel") }}</button>
      <h2>{{ t("chat.card.addAdministrator") }}</h2>
      <span />
    </header>
    <label class="admins-pick__search">
      <i />
      <input v-model="adminQuery" type="text" :placeholder="t('chat.card.search')" />
    </label>
    <p class="admins__label">{{ t("chat.card.chats") }}</p>
    <div class="admins__card">
      <button
        v-for="member in adminCandidates"
        :key="member.id"
        type="button"
        @click="pickedAdmin = member.id"
      >
        <img :src="member.avatar" alt="" />
        <span>{{ member.name }}</span>
        <i class="admins__check" :class="{ 'is-on': pickedAdmin === member.id }" />
      </button>
    </div>
    <button
      class="admins-pick__done"
      :class="{ 'is-on': pickedAdmin }"
      type="button"
      :disabled="!pickedAdmin"
      @click="confirmAdmin"
    >
      {{ t("chat.card.done") }}
    </button>
  </section>

  <section v-else-if="editing" class="group-section admins-edit">
    <header class="group-section__bar">
      <button type="button" :aria-label="t('chat.card.back')" @click="emit('back')">
        <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
      </button>
      <h2>{{ t("chat.card.administrators") }}</h2>
      <span />
    </header>
    <article class="admins-edit__person">
      <img :src="editing.avatar" alt="" />
      <span>
        <strong>{{ editing.name }}</strong>
        <small>{{ seenLabel(editing.id) }}</small>
      </span>
    </article>
    <p class="admins__label">{{ t("chat.card.whatAdminCan") }}</p>
    <div class="admins__card">
      <div v-for="right in adminRights" :key="right.key">
        <span>{{ right.label }}</span>
        <button
          class="admins__switch"
          :class="{ 'is-on': editing.rights?.[right.key] }"
          type="button"
          @click="updateAdmin(editing.id, { rights: { [right.key]: !editing.rights?.[right.key] } })"
        >
          <i />
        </button>
      </div>
    </div>
    <p v-if="!editing.rights?.addAdmins" class="admins__hint">{{ t("chat.card.noAddAdmins") }}</p>
    <p class="admins__label">{{ t("chat.card.tags") }}</p>
    <label class="admins-edit__tag">
      <input
        :value="editing.tag || ''"
        type="text"
        maxlength="32"
        @input="onTag"
      />
    </label>
    <p class="admins__hint">{{ t("chat.card.tagHint") }}</p>
  </section>

  <section v-else class="group-section">
    <header class="group-section__bar">
      <button type="button" :aria-label="t('chat.card.back')" @click="emit('back')">
        <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
      </button>
      <h2>{{ title }}</h2>
      <span />
    </header>

    <div v-if="page === 'invite'" class="group-section__invite">
      <p class="group-section__label">{{ t("chat.card.inviteLink") }}</p>
      <p class="group-section__url">t.me/+AdmKsLcnG6MndGh</p>
      <div class="group-section__actions">
        <button type="button" @click="onCopy">{{ copied ? t("chat.card.copied") : t("chat.menu.copy") }}</button>
        <button type="button">{{ t("chat.card.share") }}</button>
        <button type="button">{{ t("chat.card.qr") }}</button>
      </div>
      <button class="group-section__create" type="button">
        <i />
        <span>{{ t("chat.card.createLink") }}</span>
      </button>
    </div>

    <div v-else-if="page === 'history'" class="group-section__card">
      <button type="button" @click="updateDraft({ history: 'visible' })">
        <span>{{ t("chat.card.visible") }}</span>
        <i class="group-section__check" :class="{ 'is-on': draft?.history === 'visible' }" />
      </button>
      <button type="button" @click="updateDraft({ history: 'hidden' })">
        <span>{{ t("chat.card.hidden") }}</span>
        <i class="group-section__check" :class="{ 'is-on': draft?.history !== 'visible' }" />
      </button>
    </div>

    <div v-else-if="page === 'permissions'" class="group-section__perms">
      <div class="group-section__card">
        <div>
          <span>{{ t("chat.card.sendMessages") }}</span>
          <button
            class="group-section__toggle"
            :class="{ 'is-on': draft?.sendMessages }"
            type="button"
            @click="updateDraft({ sendMessages: !draft?.sendMessages })"
          >
            <i />
          </button>
        </div>
        <div>
          <span>{{ t("chat.card.sendMedia") }}</span>
          <button
            class="group-section__toggle"
            :class="{ 'is-on': draft?.sendMedia }"
            type="button"
            @click="updateDraft({ sendMedia: !draft?.sendMedia })"
          >
            <i />
          </button>
        </div>
      </div>
      <p class="group-section__label">{{ t("chat.card.slowMode") }}</p>
      <div class="slow">
        <div class="slow__labels">
          <button
            v-for="(stop, index) in stops"
            :key="stop"
            type="button"
            @click="updateDraft({ slow: index })"
          >
            {{ stop }}
          </button>
        </div>
        <div
          class="slow__line"
          role="slider"
          tabindex="0"
          :aria-valuemin="0"
          :aria-valuemax="stops.length - 1"
          :aria-valuenow="slow"
          :aria-valuetext="stops[slow]"
          :aria-label="t('chat.card.slowMode')"
          @pointerdown="onSlowPointer"
          @keydown="onSlowKey"
        >
          <span class="slow__rail" />
          <span class="slow__fill" :style="{ width: `${(slow / 6) * 100}%` }" />
          <i
            v-for="index in 7"
            :key="index"
            class="slow__tick"
            :class="{ 'is-on': slow > 0 && index - 1 <= slow }"
            :style="{ left: `${((index - 1) / 6) * 100}%` }"
          />
          <span class="slow__thumb" :style="{ left: `${(slow / 6) * 100}%` }" />
        </div>
      </div>
      <p class="group-section__hint">{{ t("chat.card.slowModeHint") }}</p>
    </div>

    <div v-else-if="page === 'admins'" class="admins">
      <p class="admins__label">{{ isChannel ? t("chat.card.channelAdmins") : t("chat.card.groupAdmins") }}</p>
      <div class="admins__card">
        <button class="admins__add" type="button" @click="emit('open', 'add-admin')">
          <i />
          <span>{{ t("chat.card.addAdmin") }}</span>
        </button>
        <div v-for="member in admins" :key="member.id" class="admins__row">
          <button type="button" @click="emit('open', `admin:${member.id}`)">
            <img :src="member.avatar" alt="" />
            <span>{{ member.name }}</span>
          </button>
          <button
            v-if="member.role !== ChatRole.Owner"
            type="button"
            :aria-label="t('chat.card.delete')"
            @click="dismissAdmin(member.id)"
          >
            <img src="/svg/figma-icons/close.svg" width="16" height="16" alt="" />
          </button>
        </div>
      </div>
    </div>

    <EmptyState
      v-else
      :title="t('chat.card.comingSoonTitle')"
      :message="t('chat.card.comingSoon')"
      icon="○"
    />
  </section>
  </div>
</template>

<script setup lang="ts">
import { ChatKind, ChatRole } from "~/entities/chat/model";
import EmptyState from "~/components/ui/EmptyState.vue";
import AddMembersPanel from "~/features/chat/room-modals/AddMembersPanel.vue";
import BansPanel from "~/features/chat/room-modals/BansPanel.vue";
import MembersPanel from "~/features/chat/room-modals/MembersPanel.vue";
import { useRoomSession } from "~/features/chat/room-modals/session";
import { useChatUiStore } from "~/store/chat";

import GroupTypeScreen from "~/widgets/chat/ChatCardModal/GroupTypeScreen.vue";

const props = defineProps<{
  roomId: string;
  page: string;
  role: ChatRole;
}>();

const emit = defineEmits<{ back: []; open: [id: string] }>();

const INVITE_URL = "t.me/+AdmKsLcnG6MndGh";
const { t } = useI18n();
const store = useChatUiStore();
const roomId = toRef(props, "roomId");
const { draft, updateDraft, members, dismissAdmin, promoteAdmin, updateAdmin } = useRoomSession(roomId);
const adminQuery = ref("");
const pickedAdmin = ref("");
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const title = computed(() => {
  if (props.page === "invite") {
    return t("chat.card.inviteLinks");
  }
  if (props.page === "discussions") {
    return t("chat.card.discussions");
  }
  if (props.page === "history") {
    return t("chat.card.history");
  }
  if (props.page === "permissions") {
    return t("chat.card.permissions");
  }
  if (props.page === "admins" || props.page.startsWith("admin:")) {
    return t("chat.card.administrators");
  }
  if (props.page === "add-admin") {
    return t("chat.card.addAdministrator");
  }
  if (props.page === "welcome") {
    return t("chat.card.welcome");
  }
  if (props.page === "recent") {
    return t("chat.card.recent");
  }
  if (props.page === "statics") {
    return t("chat.card.statics");
  }
  return t("chat.card.groupType");
});

const stops = computed(() => [
  t("chat.card.slowOff"),
  t("chat.card.slow10s"),
  t("chat.card.slow30s"),
  t("chat.card.slow1m"),
  t("chat.card.slow5m"),
  t("chat.card.slow15m"),
  t("chat.card.slow1h"),
]);

const slow = computed(() => draft.value?.slow ?? 0);

const slowIndexAt = (line: HTMLElement, clientX: number): number => {
  const rect = line.getBoundingClientRect();
  const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
  const last = stops.value.length - 1;
  return Math.round(Math.min(1, Math.max(0, ratio)) * last);
};

const onSlowPointer = (event: PointerEvent): void => {
  const line = event.currentTarget as HTMLElement;
  line.setPointerCapture(event.pointerId);
  const move = (next: PointerEvent): void => {
    updateDraft({ slow: slowIndexAt(line, next.clientX) });
  };
  const end = (next: PointerEvent): void => {
    line.releasePointerCapture(next.pointerId);
    line.removeEventListener("pointermove", move);
    line.removeEventListener("pointerup", end);
    line.removeEventListener("pointercancel", end);
  };
  move(event);
  line.addEventListener("pointermove", move);
  line.addEventListener("pointerup", end);
  line.addEventListener("pointercancel", end);
};

const onSlowKey = (event: KeyboardEvent): void => {
  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    updateDraft({ slow: Math.min(stops.value.length - 1, slow.value + 1) });
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    updateDraft({ slow: Math.max(0, slow.value - 1) });
  }
};

const admins = computed(() =>
  (members.value ?? []).filter((member) => member.role === ChatRole.Owner || member.promoted),
);

const isChannel = computed(() => store.extras[props.roomId]?.kind === ChatKind.Channel);

const editingId = computed(() => (props.page.startsWith("admin:") ? props.page.slice("admin:".length) : ""));

const editing = computed(() => (members.value ?? []).find((member) => member.id === editingId.value) ?? null);

const adminCandidates = computed(() => {
  const query = adminQuery.value.trim().toLowerCase();
  return (members.value ?? []).filter((member) => {
    if (member.role === ChatRole.Owner || member.promoted) {
      return false;
    }
    return !query || member.name.toLowerCase().includes(query);
  });
});

const adminRights = computed(() => [
  {
    key: "changeInfo" as const,
    label: t(isChannel.value ? "chat.card.changeChannelInfo" : "chat.card.changeGroupInfo"),
  },
  { key: "manageMessages" as const, label: t("chat.card.manageMessages") },
  { key: "banUsers" as const, label: t("chat.card.banUsers") },
  { key: "muteUsers" as const, label: t("chat.card.muteUsers") },
  { key: "pinMessages" as const, label: t("chat.card.pinMessages") },
  { key: "sendMessages" as const, label: t("chat.card.sendMessages") },
  { key: "addAdmins" as const, label: t("chat.card.addNewAdmins") },
]);

const seenLabel = (memberId: string): string => {
  const user = store.findUser(memberId);
  if (user?.status?.state === "online") {
    return t("chat.card.online");
  }
  return user?.status?.lastChanged ? `${t("chat.vac.lastSeen")}${user.status.lastChanged}` : "";
};

const onTag = (event: Event): void => {
  if (!editing.value) {
    return;
  }
  updateAdmin(editing.value.id, { tag: (event.target as HTMLInputElement).value });
};

const confirmAdmin = (): void => {
  const memberId = pickedAdmin.value;
  if (!memberId) {
    return;
  }
  promoteAdmin(memberId);
  pickedAdmin.value = "";
  emit("open", `admin:${memberId}`);
};

watch(
  () => props.page,
  () => {
    adminQuery.value = "";
    pickedAdmin.value = "";
  },
);

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

<style lang="scss" scoped src="./GroupSection.scss"></style>
