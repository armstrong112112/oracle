<template>
  <section class="create">
    <header class="create__nav">
      <button class="create__cancel" type="button" @click="onCancel">
        {{ t("chat.cancel") }}
      </button>
      <h2>{{ title }}</h2>
      <span />
    </header>

    <div v-if="step === 'form'" class="create__body">
      <div class="create__identity">
        <label class="create__photo">
          <img v-if="photoUrl" class="create__photo-img" :src="photoUrl" alt="" />
          <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 8.5h2.2l1.3-2h8.9l1.3 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" stroke="currentColor" stroke-width="1.6" />
            <circle cx="12" cy="13.5" r="3" stroke="currentColor" stroke-width="1.6" />
          </svg>
          <input type="file" accept="image/*" @change="onPhoto" />
        </label>
        <input
          v-model="name"
          class="create__name"
          type="text"
          :placeholder="kind === ChatKind.Channel ? t('chat.card.channelName') : t('chat.card.groupName')"
        />
      </div>

      <div class="create__block">
        <p class="create__label">
          {{ kind === ChatKind.Channel ? t("chat.card.channelType") : t("chat.card.groupType") }}
        </p>
        <div class="create__card">
          <button
            v-for="option in typeOptions"
            :key="option"
            class="create__option"
            type="button"
            @click="visibility = option"
          >
            <span>{{ t(`chat.card.${option}`) }}</span>
            <span class="create__check" :class="{ 'is-on': visibility === option }" />
          </button>
        </div>
      </div>

      <div v-if="visibility === 'public'" class="create__block">
        <button class="create__card create__invite-row" type="button" @click="invitesOpen = !invitesOpen">
          <span class="create__link-icon" />
          <span>{{ t("chat.card.manageInvites") }}</span>
        </button>
        <CreateInvite v-if="invitesOpen" :url="inviteUrl" />
      </div>

      <div v-else-if="visibility === 'private'" class="create__block">
        <p class="create__label">{{ t("chat.card.inviteLink") }}</p>
        <CreateInvite :url="inviteUrl" />
      </div>

      <div v-else class="create__block">
        <p class="create__label">{{ t("chat.card.subscriptionPrice") }}</p>
        <div class="create__price">
          <input v-model="price" inputmode="decimal" :placeholder="t('chat.card.enterPrice')" />
          <span>$</span>
        </div>
        <div class="create__billing">
          <button type="button" @click="billingOpen = !billingOpen">
            <span>{{ billingLabel }}</span>
            <img
              src="/svg/figma-icons/arrow-down.svg"
              width="20"
              height="20"
              alt=""
              :class="{ 'is-open': billingOpen }"
            />
          </button>
          <ul v-if="billingOpen">
            <li v-for="option in billingOptions" :key="option.value">
              <button type="button" @click="pickBilling(option.value)">{{ option.label }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="create__body create__body--members">
      <label class="create__search">
        <img src="/svg/figma-icons/search.svg" width="18" height="18" alt="" />
        <input v-model="query" type="search" :placeholder="t('chat.search')" />
      </label>

      <div v-if="selectedPeople.length" class="create__chips">
        <button
          v-for="person in selectedPeople"
          :key="person._id"
          type="button"
          @click="toggle(person._id)"
        >
          <img :src="person.avatar" alt="" />
          <span>{{ person.username }}</span>
        </button>
      </div>

      <div v-if="groups.length" class="create__people">
        <section v-for="group in groups" :key="group.letter">
          <p class="create__label">{{ group.letter }}</p>
          <div class="create__card">
            <button
              v-for="person in group.people"
              :key="person._id"
              class="create__option"
              type="button"
              @click="toggle(person._id)"
            >
              <img class="create__avatar" :src="person.avatar" alt="" />
              <span>{{ person.username }}</span>
              <span class="create__check" :class="{ 'is-on': selectedIds.includes(person._id) }" />
            </button>
          </div>
        </section>
      </div>
      <EmptyState v-else :title="t('chat.card.noResults')" icon="○" />
    </div>

    <footer class="create__footer">
      <button class="create__submit" type="button" :disabled="!canSubmit" @click="onSubmit">
        {{ step === "form" ? t("chat.card.create") : t("chat.card.continue") }}
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { filterByName, groupByLetter } from "~/entities/chat/lib/contacts";
import { ChatKind } from "~/entities/chat/model";
import EmptyState from "~/components/ui/EmptyState.vue";
import CreateInvite from "~/features/chat/room-modals/CreateInvite.vue";
import { useChatUiStore } from "~/store/chat";
import type { BillingPeriod, RoomVisibility } from "~/features/chat/room-modals/types";
import type { CreatableKind } from "~/entities/chat/model";

const props = defineProps<{
  kind: CreatableKind;
}>();

const emit = defineEmits<{
  cancel: [];
  created: [];
}>();

const INVITE_URL = "t.me/+AdmKsLcnG6MndGh";

const { t } = useI18n();
const store = useChatUiStore();

const step = ref<"form" | "members">("form");
const name = ref("");
const photoUrl = ref("");
const visibility = ref<RoomVisibility>("public");
const price = ref("");
const billing = ref<BillingPeriod>("months");
const billingOpen = ref(false);
const invitesOpen = ref(false);
const query = ref("");
const selectedIds = ref<string[]>([]);

const inviteUrl = INVITE_URL;
const typeOptions: RoomVisibility[] = ["public", "private", "paid"];

const title = computed(() => {
  if (step.value === "members") {
    return t("chat.card.addMembers");
  }
  return props.kind === ChatKind.Channel ? t("chat.card.newChannel") : t("chat.card.newGroup");
});

const billingOptions = computed(() => [
  { value: "months" as const, label: t("chat.card.onceMonths") },
  { value: "weeks" as const, label: t("chat.card.onceWeeks") },
  { value: "once" as const, label: t("chat.card.once") },
]);

const billingLabel = computed(
  () => billingOptions.value.find((option) => option.value === billing.value)?.label ?? "",
);

const people = computed(() => store.contacts);
const groups = computed(() => groupByLetter(filterByName(people.value, query.value)));

const selectedPeople = computed(() =>
  selectedIds.value.flatMap((id) => {
    const person = people.value.find((item) => item._id === id);
    return person ? [person] : [];
  }),
);

const canSubmit = computed(() => {
  if (step.value === "members") {
    return selectedIds.value.length > 0;
  }
  if (!name.value.trim()) {
    return false;
  }
  return visibility.value !== "paid" || Boolean(price.value.trim());
});

const onPhoto = (event: Event): void => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }
  if (photoUrl.value.startsWith("blob:")) {
    URL.revokeObjectURL(photoUrl.value);
  }
  photoUrl.value = URL.createObjectURL(file);
};

const pickBilling = (value: BillingPeriod): void => {
  billing.value = value;
  billingOpen.value = false;
};

const toggle = (id: string): void => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id);
    return;
  }
  selectedIds.value = [...selectedIds.value, id];
};

const onCancel = (): void => {
  if (step.value === "members") {
    step.value = "form";
    return;
  }
  emit("cancel");
};

const onSubmit = (): void => {
  if (!canSubmit.value) {
    return;
  }
  if (step.value === "form") {
    step.value = "members";
    return;
  }
  store.createRoom({
    kind: props.kind,
    name: name.value,
    avatar: photoUrl.value,
    paid: visibility.value === "paid",
    memberIds: selectedIds.value,
  });
  emit("created");
};

onBeforeUnmount(() => {
  if (photoUrl.value.startsWith("blob:") && !store.rooms.some((room) => room.avatar === photoUrl.value)) {
    URL.revokeObjectURL(photoUrl.value);
  }
});
</script>

<style lang="scss" scoped src="./CreateRoom.scss"></style>
