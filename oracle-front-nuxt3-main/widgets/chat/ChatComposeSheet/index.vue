<template>
  <div class="compose-sheet">
    <div v-if="!creating" class="rooms-chrome__create">
      <p class="rooms-chrome__label">{{ t("chat.list.chatType") }}</p>
      <div class="rooms-chrome__types">
        <button
          v-for="item in chatTypes"
          :key="item.id"
          class="rooms-chrome__type"
          type="button"
          @click="onType(item.id)"
        >
          <span class="rooms-chrome__type-icon" :class="`is-${item.id}`" aria-hidden="true">
            <svg v-if="item.id === ChatKind.Channel" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.2 5.2v3.6M4.4 4v6M6.6 2.6v8.8M9.2 4.4l2.6-1.2v7.6L9.2 9.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.2" cy="5" r="2" stroke="currentColor" stroke-width="1.2" />
              <path d="M1.8 11.2c.4-1.8 1.7-2.7 3.4-2.7s3 .9 3.4 2.7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
              <circle cx="9.6" cy="5.2" r="1.5" stroke="currentColor" stroke-width="1.2" />
              <path d="M9.2 8.6c1.2.1 2.1.8 2.5 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </span>
          <span>{{ item.label }}</span>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
            <path d="M1.5 1.5L6.5 6l-5 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <section v-for="group in contactGroups" :key="group.letter" class="rooms-chrome__group">
        <p class="rooms-chrome__letter">{{ group.letter }}</p>
        <div class="rooms-chrome__people">
          <button
            v-for="person in group.people"
            :key="person._id"
            class="rooms-chrome__person"
            type="button"
            @click="emit('contact', person._id)"
          >
            <img :src="person.avatar" alt="" />
            <span>{{ person.username }}</span>
          </button>
        </div>
      </section>
    </div>

    <CreateRoom
      v-else
      class="rooms-chrome__wizard"
      :kind="creating"
      @cancel="creating = null"
      @created="emit('done')"
    />
  </div>
</template>

<script setup lang="ts">
import { filterByName, groupByLetter } from "~/entities/chat/lib/contacts";
import { ChatKind } from "~/entities/chat/model";
import CreateRoom from "~/features/chat/room-modals/CreateRoom.vue";
import { useChatUiStore } from "~/store/chat";
import type { CreatableKind } from "~/entities/chat/model";

const CONTACT_TYPE = "contact";

const query = defineModel<string>("query", { default: "" });
const creating = defineModel<CreatableKind | null>("creating", { default: null });

const emit = defineEmits<{
  contact: [userId: string];
  done: [];
}>();

const { t } = useI18n();
const store = useChatUiStore();

const chatTypes = computed(() => [
  { id: ChatKind.Group, label: t("chat.card.newGroup") },
  { id: CONTACT_TYPE, label: t("chat.list.newContact") },
  { id: ChatKind.Channel, label: t("chat.card.newChannel") },
]);

const contactGroups = computed(() => groupByLetter(filterByName(store.contacts, query.value)));

const onType = (id: CreatableKind | typeof CONTACT_TYPE): void => {
  if (id !== CONTACT_TYPE) {
    creating.value = id;
  }
};
</script>

<style lang="scss" scoped>
.compose-sheet {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}

.rooms-chrome__create {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px 24px;
}

.rooms-chrome__label,
.rooms-chrome__letter {
  margin: 0;
  padding: 0 8px;
  color: var(--primary-3);
  font: 500 14px/1.3 Roboto, Inter, sans-serif;
}

.rooms-chrome__letter {
  margin-top: 12px;
  color: #8780cf;
}

.rooms-chrome__types,
.rooms-chrome__people {
  overflow: hidden;
  border-radius: 12px;
  background: #14131b;
}

.rooms-chrome__type,
.rooms-chrome__person {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 0;
  border-bottom: 1px solid #2b2741;
  background: transparent;
  color: var(--primary-3);
  font: 400 14px/1.3 Roboto, Inter, sans-serif;
  text-align: left;
  cursor: pointer;
}

.rooms-chrome__type:last-child,
.rooms-chrome__person:last-child {
  border-bottom: 0;
}

.rooms-chrome__type span:nth-child(2),
.rooms-chrome__person span {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rooms-chrome__type svg:last-child {
  color: #8780cf;
}

.rooms-chrome__type-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  color: #fff;
}

.rooms-chrome__type-icon.is-group {
  background: #3b82f6;
}

.rooms-chrome__type-icon.is-contact {
  background: #22c55e;
}

.rooms-chrome__type-icon.is-channel {
  background: var(--primary-2);
}

.rooms-chrome__person img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.rooms-chrome__wizard {
  position: absolute;
  inset: 0;
  z-index: 3;
}
</style>
