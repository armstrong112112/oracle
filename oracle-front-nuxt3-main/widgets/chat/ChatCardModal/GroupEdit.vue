<template>
  <section class="group-edit">
    <header class="group-edit__bar">
      <button type="button" @click="emit('cancel')">{{ t("chat.cancel") }}</button>
      <button type="button" @click="save">{{ t("chat.edit") }}</button>
    </header>

    <img class="group-edit__avatar" :src="room?.avatar" alt="" />
    <button class="group-edit__photo" type="button">{{ t("chat.setNewPhoto") }}</button>

    <label class="group-edit__field">
      <span>{{ isChannel ? t("chat.card.channelName") : t("chat.card.nameLabel") }}</span>
      <input v-model="name" type="text" maxlength="100" />
    </label>

    <label class="group-edit__field">
      <span>{{ t("chat.card.bio") }}</span>
      <input v-model="bio" type="text" maxlength="100" :placeholder="t('chat.card.bio')" />
      <small>{{ bio.length }} / 100</small>
    </label>

    <div class="group-edit__group">
      <button v-for="row in profileRows" :key="row.id" type="button" @click="openRow(row.id)">
        <img :src="row.icon" width="24" height="24" alt="" />
        <span>{{ row.label }}</span>
        <em v-if="row.value">{{ row.value }}</em>
        <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
      </button>
    </div>

    <div class="group-edit__group">
      <button v-for="row in manageRows" :key="row.id" type="button" @click="openRow(row.id)">
        <img :src="row.icon" width="24" height="24" alt="" />
        <span>{{ row.label }}</span>
        <em v-if="row.value">{{ row.value }}</em>
        <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
      </button>
    </div>

    <div class="group-edit__group">
      <button type="button" @click="openRow('statics')">
        <img src="/svg/figma-icons/statics.svg" width="24" height="24" alt="" />
        <span>{{ t("chat.card.statics") }}</span>
        <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
      </button>
    </div>

    <button class="group-edit__delete" type="button" @click="confirm = true">
      <span>{{ isChannel ? t("chat.card.deleteChannel") : t("chat.card.deleteGroup") }}</span>
      <i />
    </button>

    <div v-if="confirm" class="group-edit__confirm">
      <div class="group-edit__dialog" role="dialog">
        <h3>{{ t("chat.card.deleteEveryone") }}</h3>
        <p>{{ t(isChannel ? "chat.card.deleteChannelConfirm" : "chat.card.deleteGroupConfirm", { name: room?.roomName || "" }) }}</p>
        <button class="is-primary" type="button" @click="confirm = false">{{ t("chat.cancel") }}</button>
        <button type="button" @click="removeGroup">{{ isChannel ? t("chat.card.deleteChannel") : t("chat.card.deleteGroup") }}</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChatKind, ChatRole } from "~/entities/chat/model";
import { useRoomSession } from "~/features/chat/room-modals/session";
import { useChatUiStore } from "~/store/chat";

const props = defineProps<{ roomId: string; active: boolean }>();
const emit = defineEmits<{ cancel: []; done: []; open: [id: string] }>();

const { t } = useI18n();
const store = useChatUiStore();

const name = ref("");
const bio = ref("");
const confirm = ref(false);
const roomKey = toRef(props, "roomId");
const { draft: roomDraft } = useRoomSession(roomKey);

const room = computed(() => store.rooms.find((item) => item.roomId === props.roomId) ?? null);
const extra = computed(() => store.extras[props.roomId] ?? null);
const isChannel = computed(() => extra.value?.kind === ChatKind.Channel);
const typeLabel = computed(() => t(`chat.card.${roomDraft.value?.visibility ?? "private"}`));
const historyLabel = computed(() =>
  roomDraft.value?.history === "visible" ? t("chat.card.visible") : t("chat.card.hidden"),
);

const profileRows = computed(() => {
  const type = {
    id: "type",
    icon: "/svg/figma-icons/group-type.svg",
    label: t(isChannel.value ? "chat.card.channelType" : "chat.card.groupType"),
    value: typeLabel.value,
  };
  const invite = {
    id: "invite",
    icon: "/svg/figma-icons/invite-links.svg",
    label: t("chat.card.inviteLinks"),
    value: "1",
  };
  if (isChannel.value) {
    return [
      type,
      invite,
      {
        id: "discussions",
        icon: "/svg/figma-icons/chat-history.svg",
        label: t("chat.card.discussions"),
        value: "",
      },
    ];
  }
  return [
    type,
    invite,
    {
      id: "history",
      icon: "/svg/figma-icons/chat-history.svg",
      label: t("chat.card.history"),
      value: historyLabel.value,
    },
    {
      id: "welcome",
      icon: "/svg/figma-icons/welcome-messages.svg",
      label: t("chat.card.welcome"),
      value: "",
    },
  ];
});

const manageRows = computed(() => {
  const members = {
    id: "members",
    icon: "/svg/figma-icons/manage-users.svg",
    label: t("chat.card.manageUsers"),
    value: String(room.value?.users.length ?? 0),
  };
  const admins = {
    id: "admins",
    icon: "/svg/figma-icons/administrators.svg",
    label: t("chat.card.administrators"),
    value: extra.value?.role === ChatRole.Admin || extra.value?.role === ChatRole.Owner ? "1" : "0",
  };
  const bans = {
    id: "bans",
    icon: "/svg/figma-icons/banned-muted-users.svg",
    label: t("chat.card.bans"),
    value: "1",
  };
  const recent = {
    id: "recent",
    icon: "/svg/figma-icons/recent-actions.svg",
    label: t("chat.card.recent"),
    value: "",
  };
  if (isChannel.value) {
    return [members, admins, bans, recent];
  }
  return [
    members,
    {
      id: "permissions",
      icon: "/svg/figma-icons/permissions.svg",
      label: t("chat.card.permissions"),
      value: "13/13",
    },
    admins,
    bans,
    recent,
  ];
});

const resetDraft = (): void => {
  name.value = room.value?.roomName || "";
  bio.value = extra.value?.bio || "";
  confirm.value = false;
};

watch(
  () => props.active,
  (open) => {
    if (open) {
      resetDraft();
    }
  },
  { immediate: true },
);

const save = (): void => {
  const nextName = name.value.trim();
  if (room.value && nextName) {
    room.value.roomName = nextName;
  }
  const current = store.extras[props.roomId];
  if (current) {
    current.bio = bio.value;
  }
  emit("done");
};

const openRow = (id: string): void => {
  emit("open", id);
};

const removeGroup = (): void => {
  if (room.value) {
    store.clearHistory(room.value.roomId);
  }
  confirm.value = false;
  store.closeModal();
};
</script>

<style lang="scss" scoped>
.group-edit {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100%;
  padding: 0 0 24px;
  background: #0a090f;
  color: #fff;
  font-family: Roboto, Inter, sans-serif;

  > * {
    flex: 0 0 auto;
  }
}

.group-edit__bar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
  background: #0a090f;

  button {
    padding: 8px 4px;
    border: 0;
    background: none;
    color: #f64e2a;
    font: 500 14px/1.3 Roboto, Inter, sans-serif;
    cursor: pointer;
  }
}

.group-edit__avatar {
  width: 80px;
  height: 80px;
  margin: 8px auto 0;
  border-radius: 50%;
  object-fit: cover;
}

.group-edit__photo {
  margin: 0 auto 14px;
  padding: 0;
  border: 0;
  background: none;
  color: #f64e2a;
  font: 400 16px/1 Roboto, Inter, sans-serif;
  letter-spacing: 0.32px;
  cursor: pointer;
}

.group-edit__field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  span,
  small {
    padding: 0 8px;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
  }

  small {
    font-size: 12px;
    line-height: 1.35;
  }

  input {
    width: 100%;
    height: 44px;
    padding: 4px 12px;
    border: 0;
    border-radius: 12px;
    background: #13121b;
    color: #fff;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
    outline: none;
  }

  input::placeholder {
    color: #7a74ba;
  }
}

.group-edit__group {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: #14131b;
  overflow: hidden;

  button {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 44px;
    padding: 0 4px 0 12px;
    border: 0;
    border-bottom: 1px solid #2b2741;
    background: transparent;
    color: #fff;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
    text-align: left;
    cursor: pointer;
  }

  button:last-child {
    border-bottom: 0;
  }

  span {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  em {
    color: #8780cf;
    font: 400 12px/1.35 Roboto, Inter, sans-serif;
    font-style: normal;
    white-space: nowrap;
  }

  img {
    display: block;
    flex: 0 0 24px;
  }
}

.group-edit__delete {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 0;
  border-radius: 12px;
  background: #14131b;
  color: #fff;
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
  cursor: pointer;

  i {
    display: block;
    width: 24px;
    height: 24px;
    background: #f64e2a;
    -webkit-mask: url("/svg/figma-icons/trash.svg") center / 24px 24px no-repeat;
    mask: url("/svg/figma-icons/trash.svg") center / 24px 24px no-repeat;
  }
}

.group-edit__confirm {
  position: fixed;
  inset: 0;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
}

.group-edit__dialog {
  width: min(320px, 100%);
  padding: 28px 16px 16px;
  border-radius: 16px;
  background: #14131b;
  text-align: center;

  h3 {
    margin: 0 0 12px;
    font: 500 18px/1.4 Roboto, Inter, sans-serif;
  }

  p {
    margin: 0 0 20px;
    color: #8780cf;
    font: 400 14px/1.4 Roboto, Inter, sans-serif;
  }

  button {
    display: block;
    width: 100%;
    height: 44px;
    margin-top: 8px;
    border: 0;
    border-radius: 12px;
    background: #1b1a24;
    color: #fff;
    font: 500 16px/1 Roboto, Inter, sans-serif;
    cursor: pointer;
  }

  button.is-primary {
    background: #f64e2a;
  }
}
</style>
