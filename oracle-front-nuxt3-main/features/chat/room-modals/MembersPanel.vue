<template>
  <div class="members">
    <RoomHeader leading="back" :title="t('chat.card.membersCount', { count: members.length })" @back="emit('back')" />
    <SearchField v-model="query" />

    <button class="members__add" type="button" @click="emit('add')">
      {{ t("chat.card.addMembers") }}
    </button>

    <ul v-if="filtered.length" class="members__list">
      <li v-for="member in filtered" :key="member.id" class="member" :class="{ 'is-open': menuId === member.id }">
        <CustomAvatar :avatar="member.avatar" :name="member.name" :size="28" :is-name-visible="false" />
        <div class="member__copy">
          <p class="member__name">{{ member.name }}</p>
          <p v-if="member.role === ChatRole.Owner" class="member__role">{{ t("chat.card.roleOwner") }}</p>
          <p v-else-if="member.promoted" class="member__role">{{ t("chat.card.roleAdmin") }}</p>
        </div>
        <button class="member__icon" type="button" :aria-label="t('chat.card.remove')" @click="removeMember(member.id)">
          <img src="/svg/close.svg" alt="" />
        </button>
        <button
          v-if="isStaff"
          class="member__icon member__icon--more"
          type="button"
          :aria-label="t('chat.card.more')"
          @click="menuId = menuId === member.id ? '' : member.id"
        >
          <img src="/svg/3dots.svg" alt="" />
        </button>
        <div v-if="menuId === member.id" class="member__menu">
          <button v-if="showBan" class="is-danger" type="button" @click="startBan(member)">
            {{ t("chat.card.ban") }}
          </button>
          <button type="button" @click="startMute(member)">{{ t("chat.card.mute") }}</button>
          <button v-if="member.role !== ChatRole.Owner" type="button" @click="onPromote(member.id)">
            {{ member.promoted ? t("chat.card.demote") : t("chat.card.promote") }}
          </button>
        </div>
      </li>
    </ul>
    <EmptyState v-else :title="t('chat.card.noResults')" icon="○" />

    <button v-if="menuId" class="members__backdrop" type="button" @click="menuId = ''" />

    <ActionSheet v-if="step === 'ban-reason'" :continue-disabled="!reason" @continue="step = 'ban-confirm'" @cancel="closeFlow">
      <p class="sheet-copy">{{ t("chat.card.reason") }}</p>
      <div class="reason">
        <button class="reason__field" type="button" @click="reasonOpen = !reasonOpen">
          <span :class="{ 'is-placeholder': !reason }">{{ reasonLabel }}</span>
        </button>
        <ul v-if="reasonOpen" class="reason__menu">
          <li v-for="option in reasons" :key="option">
            <button type="button" @click="pickReason(option)">{{ t(reasonMessageKey(option)) }}</button>
          </li>
        </ul>
      </div>
    </ActionSheet>

    <ActionSheet v-else-if="step === 'ban-confirm' && target" @continue="commitBan" @cancel="closeFlow">
      <div class="sheet-avatar">
        <CustomAvatar :avatar="target.avatar" :name="target.name" :size="56" :is-name-visible="false" />
      </div>
      <p class="sheet-name">{{ target.name }}</p>
      <p class="sheet-copy">{{ t("chat.card.banConfirm", { handle: target.handle, id: target.id }) }}</p>
    </ActionSheet>

    <ActionSheet v-else-if="step === 'mute-confirm' && target" @continue="step = 'mute-duration'" @cancel="closeFlow">
      <div class="sheet-avatar">
        <CustomAvatar :avatar="target.avatar" :name="target.name" :size="56" :is-name-visible="false" />
      </div>
      <p class="sheet-name">{{ target.name }}</p>
      <p class="sheet-copy">{{ t("chat.card.muteConfirm", { handle: target.handle, id: target.id }) }}</p>
    </ActionSheet>

    <ActionSheet v-else-if="step === 'mute-duration' && target" @continue="commitMute" @cancel="closeFlow">
      <DurationField
        v-model:amount="amount"
        v-model:unit="unit"
        :label="t('chat.card.duration')"
        :caption="mutedUntil"
      />
    </ActionSheet>
  </div>
</template>

<script setup lang="ts">
import { ChatRole } from "~/entities/chat/model";
import CustomAvatar from "~/components/custom-avatar.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import ActionSheet from "~/features/chat/room-modals/ActionSheet.vue";
import DurationField from "~/features/chat/room-modals/DurationField.vue";
import RoomHeader from "~/features/chat/room-modals/RoomHeader.vue";
import SearchField from "~/features/chat/room-modals/SearchField.vue";
import {
  formatStamp,
  reasonMessageKey,
  shiftDate,
  useRoomSession,
} from "~/features/chat/room-modals/session";
import type { BanReason, DurationUnit, RoomMember } from "~/features/chat/room-modals/types";

const props = defineProps<{
  roomId: string;
  role: ChatRole;
}>();

const emit = defineEmits<{
  back: [];
  add: [];
}>();

const { t } = useI18n();
const roomId = toRef(props, "roomId");
const { members, removeMember, togglePromote, pushSanction } = useRoomSession(roomId);

const query = ref("");
const menuId = ref("");
const step = ref<"idle" | "ban-reason" | "ban-confirm" | "mute-confirm" | "mute-duration">("idle");
const target = ref<RoomMember | null>(null);
const reason = ref<BanReason | "">("");
const reasonOpen = ref(false);
const amount = ref(1);
const unit = ref<DurationUnit>("hours");
const reasons: BanReason[] = ["spam", "nudes", "harassment", "scam"];

const isStaff = computed(() => props.role === ChatRole.Owner || props.role === ChatRole.Admin);
const showBan = computed(() => props.role !== ChatRole.Member);

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase();
  if (!needle) {
    return members.value;
  }
  return members.value.filter((member) =>
    `${member.name} ${member.handle}`.toLowerCase().includes(needle),
  );
});

const reasonLabel = computed(() => (reason.value ? t(reasonMessageKey(reason.value)) : t("chat.card.reason")));

const unitLabel = computed(() => {
  if (unit.value === "minutes") {
    return t("chat.card.unitMinutes");
  }
  if (unit.value === "months") {
    return t("chat.card.unitMonths");
  }
  if (unit.value === "years") {
    return t("chat.card.unitYears");
  }
  if (unit.value === "forever") {
    return t("chat.card.unitForever");
  }
  return t("chat.card.unitHours");
});

const mutedUntil = computed(() => {
  const next = shiftDate(amount.value, unit.value);
  const date = next ? formatStamp(next) : t("chat.card.unitForever");
  return t("chat.card.mutedUntil", { date });
});

const closeFlow = (): void => {
  step.value = "idle";
  target.value = null;
  reason.value = "";
  reasonOpen.value = false;
  menuId.value = "";
};

const startBan = (member: RoomMember): void => {
  target.value = member;
  reason.value = "";
  reasonOpen.value = false;
  menuId.value = "";
  step.value = "ban-reason";
};

const startMute = (member: RoomMember): void => {
  target.value = member;
  amount.value = 1;
  unit.value = "hours";
  menuId.value = "";
  step.value = "mute-confirm";
};

const pickReason = (option: BanReason): void => {
  reason.value = option;
  reasonOpen.value = false;
};

const commitBan = (): void => {
  if (!target.value || !reason.value) {
    return;
  }
  pushSanction(target.value, "ban", reason.value, formatStamp(new Date()));
  closeFlow();
};

const commitMute = (): void => {
  if (!target.value) {
    return;
  }
  const next = shiftDate(amount.value, unit.value);
  const until = next ? formatStamp(next) : t("chat.card.unitForever");
  const note = unit.value === "forever" ? t("chat.card.unitForever") : `${amount.value} ${unitLabel.value}`;
  pushSanction(target.value, "mute", null, until, note);
  closeFlow();
};

const onPromote = (memberId: string): void => {
  togglePromote(memberId);
  menuId.value = "";
};
</script>

<style lang="scss" scoped>
.members {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 420px;
  font-family: Inter, Roboto, sans-serif;
  color: #fff;
}

.members__add {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: transparent;
  color: #f64e2a;
  font-size: 14px;
  cursor: pointer;
}

.members__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.member {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  border-bottom: 1px solid #2b2741;
}

.member.is-open {
  z-index: 6;
}

.member :deep(.user-item) {
  width: 28px;
  min-width: 28px;
}

.member__copy {
  flex: 1;
  min-width: 0;
}

.member__name,
.member__role,
.sheet-name,
.sheet-copy {
  margin: 0;
}

.member__name {
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.member__role {
  color: #f64e2a;
  font-size: 12px;
}

.member__icon {
  display: grid;
  flex: 0 0 32px;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.member__icon img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.member__icon--more img {
  width: 18px;
  height: 8px;
}

.member__menu {
  position: absolute;
  z-index: 6;
  top: 40px;
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: 180px;
  padding: 4px;
  border-radius: 12px;
  background: #1b1a24;
}

.member__menu button {
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.member__menu button.is-danger {
  color: #f64e2a;
}

.member__menu button:hover {
  background: #2b2741;
}

.members__backdrop {
  position: absolute;
  z-index: 4;
  inset: 0;
  border: 0;
  background: transparent;
  cursor: default;
}

.sheet-name {
  font-size: 16px;
  font-weight: 500;
}

.sheet-copy {
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
}

.reason {
  position: relative;
  z-index: 2;
  text-align: left;
}

.reason__field,
.reason__menu button {
  width: 100%;
  border: 0;
  background: #1b1a24;
  color: #fff;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.reason__field {
  height: 44px;
  padding: 0 12px;
  border-radius: 12px;
}

.reason__field .is-placeholder {
  color: #67639a;
}

.reason__menu {
  position: absolute;
  z-index: 2;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 4px;
  list-style: none;
  border-radius: 12px;
  background: #1b1a24;
}

.reason__menu button {
  padding: 10px 12px;
  border-radius: 8px;
  background: transparent;
}

.reason__menu button:hover {
  background: #2b2741;
}

.sheet-avatar {
  display: flex;
  justify-content: center;
}
</style>
