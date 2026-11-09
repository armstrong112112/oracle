<template>
  <section class="group-type">
    <header class="group-type__bar">
      <button type="button" :aria-label="t('chat.card.back')" @click="emit('back')">
        <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
      </button>
      <h2>{{ typeTitle }}</h2>
      <span />
    </header>

    <p class="group-type__label">{{ typeTitle }}</p>
    <div class="group-type__card">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        @click="pick(option)"
      >
        <span>{{ t(`chat.card.${option}`) }}</span>
        <i class="group-type__check" :class="{ 'is-on': visibility === option }" />
      </button>
    </div>

    <button v-if="visibility !== 'private'" class="group-type__link" type="button" @click="emit('invites')">
      <i />
      <span>{{ t("chat.card.manageInvites") }}</span>
    </button>

    <template v-if="visibility === 'paid'">
      <p class="group-type__label">{{ t("chat.card.subscriptionPrice") }}</p>
      <label class="group-type__price">
        <input
          :value="draft?.price || ''"
          type="text"
          inputmode="decimal"
          :placeholder="t('chat.card.enterPrice')"
          @input="onPrice"
        />
        <b>$</b>
      </label>
      <div class="group-type__billing">
        <button type="button" @click="billingOpen = !billingOpen">
          <span>{{ billingLabel }}</span>
          <img src="/svg/figma-icons/arrow-down.svg" width="24" height="24" alt="" />
        </button>
        <ul v-if="billingOpen">
          <li v-for="option in billingOptions" :key="option.value">
            <button type="button" @click="pickBilling(option.value)">{{ option.label }}</button>
          </li>
        </ul>
      </div>
    </template>

    <template v-if="visibility === 'private'">
      <p class="group-type__label">{{ t("chat.card.inviteLink") }}</p>
      <p class="group-type__url">t.me/+AdmKsLcnG6MndGh</p>
      <div class="group-type__actions">
        <button type="button" @click="onCopy">{{ copied ? t("chat.card.copied") : t("chat.menu.copy") }}</button>
        <button type="button">{{ t("chat.card.share") }}</button>
        <button type="button">{{ t("chat.card.qr") }}</button>
      </div>
      <button class="group-type__create" type="button">
        <i />
        <span>{{ t("chat.card.createLink") }}</span>
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ChatKind } from "~/entities/chat/model";
import { useRoomSession } from "~/features/chat/room-modals/session";
import type { BillingPeriod, RoomVisibility } from "~/features/chat/room-modals/types";
import { useChatUiStore } from "~/store/chat";

const props = defineProps<{ roomId: string }>();
const emit = defineEmits<{ back: []; invites: [] }>();

const INVITE_URL = "t.me/+AdmKsLcnG6MndGh";
const { t } = useI18n();
const store = useChatUiStore();
const roomId = toRef(props, "roomId");
const { draft, updateDraft } = useRoomSession(roomId);
const billingOpen = ref(false);
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const options: RoomVisibility[] = ["public", "private", "paid"];

const visibility = computed(() => draft.value?.visibility ?? "private");
const typeTitle = computed(() =>
  store.extras[props.roomId]?.kind === ChatKind.Channel ? t("chat.card.channelType") : t("chat.card.groupType"),
);

const billingOptions = computed(() => [
  { value: "months" as const, label: t("chat.card.onceMonths") },
  { value: "weeks" as const, label: t("chat.card.onceWeeks") },
  { value: "once" as const, label: t("chat.card.once") },
]);

const billingLabel = computed(
  () => billingOptions.value.find((option) => option.value === draft.value?.billing)?.label ?? t("chat.card.onceMonths"),
);

const pick = (value: RoomVisibility): void => {
  updateDraft({ visibility: value });
  const extra = store.extras[props.roomId];
  if (extra) {
    extra.paid = value === "paid";
  }
  billingOpen.value = false;
};

const onPrice = (event: Event): void => {
  updateDraft({ price: (event.target as HTMLInputElement).value });
};

const pickBilling = (value: BillingPeriod): void => {
  updateDraft({ billing: value });
  billingOpen.value = false;
};

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

<style lang="scss" scoped>
.group-type {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 100%;
  padding: 0 0 24px;
  background: #0a090f;
  color: #fff;
  font-family: Roboto, Inter, sans-serif;

  > * {
    flex: 0 0 auto;
  }
}

.group-type__bar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
  min-height: 38px;
  margin-bottom: 16px;
  background: #0a090f;

  button {
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  img {
    display: block;
    transform: rotate(180deg);
  }

  h2 {
    margin: 0;
    font: 500 18px/1.4 Roboto, Inter, sans-serif;
    text-align: center;
  }
}

.group-type__label {
  margin: 16px 0 0;
  padding: 0 8px;
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
}

.group-type__card,
.group-type__link,
.group-type__create {
  border-radius: 12px;
  background: #14131b;
}

.group-type__card button,
.group-type__link,
.group-type__create {
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 0 16px 0 16px;
  border: 0;
  background: transparent;
  color: #fff;
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
  text-align: left;
  cursor: pointer;
}

.group-type__card button + button {
  border-top: 1px solid #2b2741;
}

.group-type__card span,
.group-type__link span,
.group-type__create span {
  flex: 1;
}

.group-type__check {
  width: 20px;
  height: 20px;
  border: 1.5px solid #8780cf;
  border-radius: 50%;

  &.is-on {
    border-color: #f64e2a;
    background: #f64e2a;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10.2 8.2 13.5 15 6.5' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px 16px;
  }
}

.group-type__link,
.group-type__create {
  gap: 8px;
  margin-top: 16px;
  color: #f64e2a;
}

.group-type__link i,
.group-type__create i {
  width: 24px;
  height: 24px;
  background: #f64e2a;
}

.group-type__link i {
  -webkit-mask: url("/svg/figma-icons/link-big.svg") center / 24px 24px no-repeat;
  mask: url("/svg/figma-icons/link-big.svg") center / 24px 24px no-repeat;
}

.group-type__create i {
  background:
    linear-gradient(#f64e2a, #f64e2a) center / 12px 2px no-repeat,
    linear-gradient(#f64e2a, #f64e2a) center / 2px 12px no-repeat;
}

.group-type__price,
.group-type__billing > button,
.group-type__url {
  display: flex;
  align-items: center;
  height: 44px;
  margin-top: 8px;
  border-radius: 12px;
  background: #13121b;
}

.group-type__price {
  padding: 4px;

  input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 8px;
    border: 0;
    background: transparent;
    color: #fff;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
    outline: none;
  }

  input::placeholder {
    color: #67639a;
  }

  b {
    display: grid;
    place-items: center;
    min-width: 36px;
    height: 100%;
    border-radius: 8px;
    background: #14131b;
    color: #f64e2a;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
  }
}

.group-type__billing {
  position: relative;

  > button {
    justify-content: space-between;
    width: 100%;
    padding: 0 12px;
    border: 0;
    color: #fff;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
    cursor: pointer;
  }

  ul {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    left: 0;
    z-index: 2;
    margin: 0;
    padding: 4px 0;
    list-style: none;
    border-radius: 12px;
    background: #1b1a24;
  }

  li button {
    width: 100%;
    padding: 10px 12px;
    border: 0;
    background: transparent;
    color: #fff;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
    text-align: left;
    cursor: pointer;
  }
}

.group-type__url {
  padding: 0 16px;
  border-radius: 16px;
  background: #14131b;
  font: 400 16px/1.4 Roboto, Inter, sans-serif;
}

.group-type__actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 8px;

  button {
    height: 36px;
    border: 0;
    border-radius: 12px;
    background: #2c2a3d;
    color: #fff;
    font: 400 14px/1.3 Roboto, Inter, sans-serif;
    cursor: pointer;
  }
}
</style>
