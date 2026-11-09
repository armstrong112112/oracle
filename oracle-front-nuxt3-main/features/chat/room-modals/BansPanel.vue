<template>
  <div class="bans">
    <RoomHeader leading="back" :title="t('chat.card.bans')" @back="emit('back')" />

    <Tabs :tabs="tabs" :active="tab" size="sm" @select="onSelectTab" />
    <SearchField v-model="query" />

    <ul v-if="rows.length" class="bans__list">
      <li v-for="row in rows" :key="row.id" class="ban" :class="{ 'is-open': menuId === row.id }">
        <CustomAvatar :avatar="row.avatar" :name="row.name" :size="32" :is-name-visible="false" />
        <div class="ban__copy">
          <p class="ban__name">{{ row.name }}</p>
          <p class="ban__reason">{{ reasonLine(row) }}</p>
          <p class="ban__date">{{ row.untilLabel }}</p>
        </div>
        <button class="ban__pill" type="button" @click="liftSanction(row.id)">
          {{ row.kind === "ban" ? t("chat.card.unban") : t("chat.card.unmuteUser") }}
        </button>
        <button
          class="ban__more"
          type="button"
          :aria-label="t('chat.card.more')"
          @click="menuId = menuId === row.id ? '' : row.id"
        >
          <img src="/svg/3dots.svg" alt="" />
        </button>
        <div v-if="menuId === row.id" class="ban__menu">
          <button class="is-ok" type="button" @click="liftSanction(row.id)">
            {{ row.kind === "ban" ? t("chat.card.unban") : t("chat.card.unmuteUser") }}
          </button>
          <button type="button" @click="openDuration(row)">{{ t("chat.card.changeDuration") }}</button>
        </div>
      </li>
    </ul>
    <EmptyState v-else :title="t('chat.card.noResults')" icon="○" />

    <button v-if="menuId" class="bans__backdrop" type="button" @click="menuId = ''" />

    <ActionSheet v-if="editing" @continue="applyDuration" @cancel="editing = null">
      <p class="sheet-copy">{{ t("chat.card.changeDurationConfirm") }}</p>
      <p class="sheet-meta">{{ editing.untilLabel }}</p>
      <p class="sheet-meta">{{ reasonLine(editing) }}</p>
      <DurationField
        v-model:amount="amount"
        v-model:unit="unit"
        :label="t('chat.card.newDuration')"
        :caption="mutedUntil"
      />
    </ActionSheet>
  </div>
</template>

<script setup lang="ts">
import CustomAvatar from "~/components/custom-avatar.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import Tabs, { type TabItem } from "~/components/ui/Tabs.vue";
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
import type { DurationUnit, RoomSanction, SanctionKind } from "~/features/chat/room-modals/types";

const props = defineProps<{
  roomId: string;
}>();

const emit = defineEmits<{
  back: [];
}>();

const { t } = useI18n();
const roomId = toRef(props, "roomId");
const { sanctions, liftSanction, changeDuration } = useRoomSession(roomId);

const tab = ref<SanctionKind>("ban");
const query = ref("");
const menuId = ref("");
const editing = ref<RoomSanction | null>(null);
const amount = ref(1);
const unit = ref<DurationUnit>("hours");

const tabs = computed((): TabItem[] => [
  { value: "ban", title: t("chat.card.bannedUsers") },
  { value: "mute", title: t("chat.card.mutedUsers") },
]);

const rows = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return sanctions.value.filter((row) => {
    if (row.kind !== tab.value) {
      return false;
    }
    if (!needle) {
      return true;
    }
    return `${row.name} ${row.handle}`.toLowerCase().includes(needle);
  });
});

const mutedUntil = computed(() => {
  const next = shiftDate(amount.value, unit.value);
  const date = next ? formatStamp(next) : t("chat.card.unitForever");
  return t("chat.card.mutedUntil", { date });
});

const reasonLine = (row: RoomSanction): string => {
  if (row.kind === "mute") {
    return t("chat.card.mutedFor", { reason: row.note || row.untilLabel });
  }
  return t("chat.card.bannedFor", { reason: t(reasonMessageKey(row.reason ?? "spam")) });
};

const onSelectTab = (value: TabItem | (string | TabItem)[]): void => {
  if (Array.isArray(value)) {
    return;
  }
  tab.value = value.value as SanctionKind;
  menuId.value = "";
};

const openDuration = (row: RoomSanction): void => {
  editing.value = row;
  amount.value = 1;
  unit.value = "hours";
  menuId.value = "";
};

const unitText = computed(() => {
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

const applyDuration = (): void => {
  if (!editing.value) {
    return;
  }
  const next = shiftDate(amount.value, unit.value);
  const until = next ? formatStamp(next) : t("chat.card.unitForever");
  const note = unit.value === "forever" ? t("chat.card.unitForever") : `${amount.value} ${unitText.value}`;
  changeDuration(editing.value.id, until, editing.value.kind === "mute" ? note : undefined);
  editing.value = null;
};
</script>

<style lang="scss" scoped>
.bans {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 420px;
  font-family: Inter, Roboto, sans-serif;
  color: #fff;

  :deep(.tabs-container) {
    min-width: 0;
  }

  :deep(.tab-item) {
    flex: 1;
    min-width: 0;
  }
}

.bans__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ban {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #2b2741;
}

.ban.is-open {
  z-index: 6;
}

.ban :deep(.user-item) {
  width: 32px;
  min-width: 32px;
}

.ban__copy {
  flex: 1;
  min-width: 0;
}

.ban__name,
.ban__reason,
.ban__date,
.sheet-copy,
.sheet-meta {
  margin: 0;
}

.ban__name {
  font-size: 14px;
}

.ban__reason,
.sheet-meta {
  color: #8780cf;
  font-size: 12px;
}

.ban__date {
  margin-top: 2px;
  font-size: 12px;
}

.ban__pill {
  align-self: center;
  height: 28px;
  padding: 0 10px;
  border: 0;
  border-radius: 12px;
  background: #1b1a24;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.ban__more {
  display: grid;
  flex: 0 0 32px;
  place-items: center;
  align-self: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.ban__more img {
  width: 18px;
  height: 8px;
}

.ban__menu {
  position: absolute;
  z-index: 6;
  top: 36px;
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: 180px;
  padding: 4px;
  border-radius: 12px;
  background: #1b1a24;
}

.ban__menu button {
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.ban__menu button.is-ok {
  color: #26ff2d;
}

.ban__menu button:hover {
  background: #2b2741;
}

.bans__backdrop {
  position: absolute;
  z-index: 4;
  inset: 0;
  border: 0;
  background: transparent;
}

.sheet-copy {
  font-size: 14px;
  line-height: 1.4;
}
</style>
