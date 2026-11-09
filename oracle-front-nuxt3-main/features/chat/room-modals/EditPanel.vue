<template>
  <div v-if="draft" class="edit">
    <RoomHeader
      leading="cancel"
      :title="kind === ChatKind.Channel ? t('chat.card.newChannel') : t('chat.card.newGroup')"
      :trailing="canSave ? t('chat.card.save') : ''"
      @back="emit('cancel')"
      @trailing="emit('save')"
    />

    <div class="edit__identity">
      <div class="edit__camera" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 8.5h2.2l1.3-2h8.9l1.3 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" stroke="#8780cf" stroke-width="1.6" />
          <circle cx="12" cy="13.5" r="3" stroke="#8780cf" stroke-width="1.6" />
        </svg>
      </div>
      <input
        class="edit__name"
        :value="draft.name"
        :placeholder="kind === ChatKind.Channel ? t('chat.card.channelName') : t('chat.card.groupName')"
        @input="onName"
      />
    </div>

    <p class="edit__label">{{ kind === ChatKind.Channel ? t("chat.card.channelType") : t("chat.card.groupType") }}</p>
    <div class="edit__card">
      <label v-for="option in visibilityOptions" :key="option.value" class="edit__choice">
        <span>{{ option.label }}</span>
        <input v-model="visibility" type="radio" name="room-visibility" :value="option.value" />
        <span class="radio" />
      </label>
    </div>

    <div v-if="visibility === 'paid'" class="edit__paid">
      <p class="edit__label">{{ t("chat.card.price") }}</p>
      <div class="price">
        <span class="price__chip">$</span>
        <input :value="draft.price" inputmode="decimal" @input="onPrice" />
      </div>
      <div class="billing">
        <button class="billing__field" type="button" @click="billingOpen = !billingOpen">
          {{ billingLabel }}
        </button>
        <ul v-if="billingOpen" class="billing__menu">
          <li v-for="option in billingOptions" :key="option.value">
            <button type="button" @click="pickBilling(option.value)">{{ option.label }}</button>
          </li>
        </ul>
      </div>
    </div>

    <button class="edit__link" type="button" @click="emit('invite')">{{ t("chat.card.manageInvites") }}</button>
    <button class="edit__link" type="button" @click="emit('add')">{{ t("chat.card.addMembers") }}</button>

    <section v-if="isStaff" class="perms">
      <h3>{{ t("chat.card.permissions") }}</h3>
      <p class="perms__question">
        {{ kind === ChatKind.Channel ? t("chat.card.membersCanChannel") : t("chat.card.membersCan") }}
      </p>
      <div class="edit__card">
        <div class="perms__row">
          <span>{{ t("chat.card.sendMessages") }}</span>
          <button
            class="toggle"
            :class="{ 'is-on': draft.sendMessages }"
            type="button"
            @click="updateDraft({ sendMessages: !draft.sendMessages })"
          >
            <span />
          </button>
        </div>
        <div class="perms__row">
          <span>{{ t("chat.card.sendMedia") }}</span>
          <button
            class="toggle"
            :class="{ 'is-on': draft.sendMedia }"
            type="button"
            @click="updateDraft({ sendMedia: !draft.sendMedia })"
          >
            <span />
          </button>
        </div>
      </div>

      <p class="perms__slow">{{ t("chat.card.slowMode") }}</p>
      <input class="slow" type="range" min="0" max="6" step="1" :value="draft.slow" @input="onSlow" />
      <div class="slow__stops">
        <button
          v-for="(stop, index) in stops"
          :key="stop"
          type="button"
          :class="{ 'is-on': draft.slow === index }"
          @click="updateDraft({ slow: index })"
        >
          {{ stop }}
        </button>
      </div>
      <p class="perms__hint">{{ t("chat.card.slowModeHint") }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ChatKind } from "~/entities/chat/model";
import RoomHeader from "~/features/chat/room-modals/RoomHeader.vue";
import { useRoomSession } from "~/features/chat/room-modals/session";
import type { BillingPeriod, RoomVisibility } from "~/features/chat/room-modals/types";

const props = defineProps<{
  roomId: string;
  kind: ChatKind;
  isStaff: boolean;
}>();

const emit = defineEmits<{
  cancel: [];
  save: [];
  invite: [];
  add: [];
}>();

const { t } = useI18n();
const roomId = toRef(props, "roomId");
const { draft, updateDraft } = useRoomSession(roomId);
const billingOpen = ref(false);

const canSave = computed(() => Boolean(draft.value?.name.trim()));

const visibilityOptions = computed(() => [
  { value: "public" as const, label: t("chat.card.public") },
  { value: "private" as const, label: t("chat.card.private") },
  { value: "paid" as const, label: t("chat.card.paid") },
]);

const billingOptions = computed(() => [
  { value: "months" as const, label: t("chat.card.onceMonths") },
  { value: "weeks" as const, label: t("chat.card.onceWeeks") },
  { value: "once" as const, label: t("chat.card.once") },
]);

const stops = computed(() => [
  t("chat.card.slowOff"),
  t("chat.card.slow10s"),
  t("chat.card.slow30s"),
  t("chat.card.slow1m"),
  t("chat.card.slow5m"),
  t("chat.card.slow15m"),
  t("chat.card.slow1h"),
]);

const visibility = computed({
  get: (): RoomVisibility => draft.value?.visibility ?? "private",
  set: (value: RoomVisibility) => updateDraft({ visibility: value }),
});

const billingLabel = computed(
  () => billingOptions.value.find((option) => option.value === draft.value?.billing)?.label ?? t("chat.card.onceMonths"),
);

const onName = (event: Event): void => {
  updateDraft({ name: (event.target as HTMLInputElement).value });
};

const onPrice = (event: Event): void => {
  updateDraft({ price: (event.target as HTMLInputElement).value });
};

const onSlow = (event: Event): void => {
  updateDraft({ slow: Number((event.target as HTMLInputElement).value) });
};

const pickBilling = (value: BillingPeriod): void => {
  updateDraft({ billing: value });
  billingOpen.value = false;
};
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Inter, Roboto, sans-serif;
  color: #fff;
}

.edit__identity {
  display: flex;
  align-items: center;
  gap: 12px;
}

.edit__camera {
  display: grid;
  flex: 0 0 60px;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #14131b;
}

.edit__name,
.price input,
.billing__field {
  border: 0;
  background: #13121b;
  color: #fff;
  font-family: Inter, Roboto, sans-serif;
  font-size: 14px;
  outline: none;
}

.edit__name {
  flex: 1;
  min-width: 0;
  height: 44px;
  padding: 0 12px;
  border-radius: 12px;
}

.edit__name::placeholder {
  color: #67639a;
}

.edit__label,
.perms__question,
.perms__slow {
  margin: 0;
  font-size: 14px;
}

.edit__label,
.perms__slow {
  color: #8780cf;
}

.edit__card {
  overflow: hidden;
  border-radius: 12px;
  background: #14131b;
}

.edit__choice,
.perms__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 0 12px;
}

.edit__choice + .edit__choice,
.perms__row + .perms__row {
  border-top: 1px solid #2b2741;
}

.edit__choice {
  cursor: pointer;
}

.edit__choice input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border: 2px solid #8780cf;
  border-radius: 50%;
}

.edit__choice input:checked + .radio {
  border-color: #f64e2a;
  background: radial-gradient(circle, #f64e2a 0 5px, transparent 6px);
}

.price {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  background: #13121b;
}

.price__chip {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #f64e2a;
  font-weight: 600;
}

.price input {
  flex: 1;
  min-width: 0;
  background: transparent;
}

.billing {
  position: relative;
  z-index: 2;
}

.billing__field {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  background: #1b1a24;
  text-align: left;
  cursor: pointer;
}

.billing__menu {
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

.billing__menu button {
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.billing__menu button:hover {
  background: #2b2741;
}

.edit__link {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: transparent;
  color: #f64e2a;
  font-size: 14px;
  cursor: pointer;
}

.perms {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.perms h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.perms__row span {
  font-size: 14px;
}

.toggle {
  position: relative;
  flex: 0 0 40px;
  width: 40px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: #2b2741;
  cursor: pointer;
}

.toggle span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.15s ease;
}

.toggle.is-on {
  background: #f64e2a;
}

.toggle.is-on span {
  transform: translateX(16px);
}

.slow {
  width: 100%;
  height: 18px;
  margin: 0;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.slow::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 4px;
  background: #2b2741;
}

.slow::-webkit-slider-thumb {
  width: 18px;
  height: 18px;
  margin-top: -7px;
  appearance: none;
  border: 0;
  border-radius: 50%;
  background: #f64e2a;
}

.slow::-moz-range-track {
  height: 4px;
  border-radius: 4px;
  background: #2b2741;
}

.slow::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 50%;
  background: #f64e2a;
}

.slow__stops {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 2px;
}

.slow__stops button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #7873b4;
  font-size: 11px;
  cursor: pointer;
}

.slow__stops button.is-on {
  color: #f64e2a;
}

.perms__hint {
  margin: 0;
  color: #7873b4;
  font-size: 12px;
  line-height: 1.4;
}
</style>
