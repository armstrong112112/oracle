<template>
  <div class="add-members">
    <RoomHeader leading="cancel" :title="t('chat.card.addMembers')" @back="emit('cancel')" />
    <SearchField v-model="query" />

    <div v-if="selectedPeople.length" class="chips">
      <button v-for="person in selectedPeople" :key="person.id" class="chip" type="button" @click="toggle(person.id)">
        <CustomAvatar :avatar="person.avatar" :name="person.name" :size="24" :is-name-visible="false" />
        <span>{{ person.name }}</span>
      </button>
    </div>

    <div v-if="groups.length" class="add-members__groups">
      <section v-for="group in groups" :key="group.letter">
        <h3 class="alpha">{{ group.letter }}</h3>
        <ul>
          <li v-for="person in group.people" :key="person.id">
            <button class="person" type="button" @click="toggle(person.id)">
              <CustomAvatar :avatar="person.avatar" :name="person.name" :size="28" :is-name-visible="false" />
              <span class="person__name">{{ person.name }}</span>
              <span class="radio" :class="{ 'is-on': selected.has(person.id) }" />
            </button>
          </li>
        </ul>
      </section>
    </div>
    <EmptyState v-else :title="t('chat.card.noResults')" icon="○" />

    <button class="add-members__continue" type="button" @click="onContinue">
      {{ t("chat.card.continue") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import CustomAvatar from "~/components/custom-avatar.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import RoomHeader from "~/features/chat/room-modals/RoomHeader.vue";
import SearchField from "~/features/chat/room-modals/SearchField.vue";
import { useRoomSession } from "~/features/chat/room-modals/session";
import type { RoomMember } from "~/features/chat/room-modals/types";

const props = defineProps<{
  roomId: string;
}>();

const emit = defineEmits<{
  cancel: [];
  continue: [];
}>();

const { t } = useI18n();
const roomId = toRef(props, "roomId");
const { candidates, addMembers } = useRoomSession(roomId);
const query = ref("");
const selected = ref(new Set<string>());

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase();
  if (!needle) {
    return candidates.value;
  }
  return candidates.value.filter((person) => person.name.toLowerCase().includes(needle));
});

const groups = computed(() => {
  const buckets = new Map<string, RoomMember[]>();
  filtered.value.forEach((person) => {
    const letter = person.name.charAt(0).toUpperCase() || "#";
    const list = buckets.get(letter) ?? [];
    list.push(person);
    buckets.set(letter, list);
  });
  return [...buckets.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([letter, people]) => ({ letter, people }));
});

const selectedPeople = computed(() => candidates.value.filter((person) => selected.value.has(person.id)));

const toggle = (id: string): void => {
  const next = new Set(selected.value);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  selected.value = next;
};

const onContinue = (): void => {
  addMembers(selectedPeople.value);
  emit("continue");
};
</script>

<style lang="scss" scoped>
.add-members {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 420px;
  font-family: Inter, Roboto, sans-serif;
  color: #fff;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 80px;
  max-width: 80px;
  padding: 6px 4px;
  border: 0;
  border-radius: 8px;
  background: #14131b;
  color: #fff;
  cursor: pointer;
}

.chip :deep(.user-item),
.person :deep(.user-item) {
  width: auto;
  min-width: 0;
}

.chip span,
.person__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chip span {
  max-width: 80px;
  font-size: 12px;
}

.alpha {
  margin: 8px 0 0;
  color: #8780cf;
  font-size: 13px;
  font-weight: 500;
}

.add-members ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.person {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #2b2741;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.person__name {
  flex: 1;
  font-size: 14px;
  text-align: left;
}

.radio {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border: 2px solid #8780cf;
  border-radius: 50%;
}

.radio.is-on {
  border-color: #f64e2a;
  background: radial-gradient(circle, #f64e2a 0 5px, transparent 6px);
}

.add-members__continue {
  width: 100%;
  height: 44px;
  margin-top: 8px;
  border: 0;
  border-radius: 14px;
  background: #f64e2a;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
</style>
