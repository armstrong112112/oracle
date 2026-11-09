<template>
  <div class="group-stage">
    <GroupCard :room-id="roomId" @edit="openSettings" />
    <GroupEdit
      class="group-stage__slide"
      :class="{ 'is-open': stack.length > 0 }"
      :room-id="roomId"
      :active="stack[0] === 'edit'"
      @cancel="closeAll"
      @done="closeAll"
      @open="openSection"
    />
    <GroupSection
      class="group-stage__slide group-stage__slide--section"
      :class="{ 'is-open': stack.length > 1 }"
      :inert="stack.length < 2"
      :room-id="roomId"
      :page="section"
      :role="role"
      @back="back"
      @open="openDeeper"
    />
    <GroupSection
      class="group-stage__slide group-stage__slide--deep"
      :class="{ 'is-open': stack.length > 2 }"
      :inert="stack.length < 3"
      :room-id="roomId"
      :page="deeper"
      :role="role"
      @back="back"
      @open="openDeeper"
    />
  </div>
</template>

<script setup lang="ts">
import { ChatRole } from "~/entities/chat/model";
import { useChatUiStore } from "~/store/chat";

import GroupCard from "~/widgets/chat/ChatCardModal/GroupCard.vue";
import GroupEdit from "~/widgets/chat/ChatCardModal/GroupEdit.vue";
import GroupSection from "~/widgets/chat/ChatCardModal/GroupSection.vue";

const props = defineProps<{ roomId: string }>();
const emit = defineEmits<{ covered: [value: boolean] }>();

const store = useChatUiStore();
const stack = ref<string[]>([]);
const section = ref("type");
const deeper = ref("invite");

const role = computed((): ChatRole => store.extras[props.roomId]?.role ?? ChatRole.Member);

watch(
  () => stack.value.length,
  (depth) => emit("covered", depth > 0),
  { immediate: true },
);

watch(
  () => store.modal.name,
  (name) => {
    if (name !== "chat-card") {
      stack.value = [];
    }
  },
);

watch(
  () => props.roomId,
  () => {
    stack.value = [];
  },
);

const openSettings = (): void => {
  stack.value = ["edit"];
};

const closeAll = (): void => {
  stack.value = [];
};

const openSection = (id: string): void => {
  section.value = id;
  stack.value = ["edit", id];
};

const openDeeper = (id: string): void => {
  deeper.value = id;
  stack.value = ["edit", section.value, id];
};

const back = (): void => {
  stack.value = stack.value.slice(0, -1);
};
</script>

<style lang="scss" scoped>
.group-stage {
  min-height: 100%;
}

.group-stage__slide {
  position: absolute;
  inset: 0;
  z-index: 8;
  overflow: auto;
  background: #0a090f;
  transform: translateX(100%);
  transition: transform 0.32s ease;
  pointer-events: none;

  &.is-open {
    transform: translateX(0);
    pointer-events: auto;
  }
}

.group-stage__slide--section {
  z-index: 9;
}

.group-stage__slide--deep {
  z-index: 10;
}
</style>
