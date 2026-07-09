<template>
  <div
    class="new-creating-card-header border-bottom-1 position-relative"
    ref="dropdownRef">
    <!-- Toggle -->
    <div
      class="new-creating-card-header-toggle cursor-pointer"
      @click="toggleDropdown">
      <slot name="toggle" :isOpen="isOpen" :selected="selected">
        <!-- Default toggle -->
        <div class="new-creating-card-header-content">
          <template v-if="props.multiple && Array.isArray(selected)">
            <div
              v-for="item in (selected as Crypto[])"
              :key="item.id"
              class="selected-multi-item">
              <img :src="item.icon" class="new-creating-card-header-icon" />
              <span class="new-creating-card-header-title">{{
                item.title
              }}</span>
            </div>
          </template>
          <template
            v-else-if="!props.multiple && selected && !Array.isArray(selected)">
            <img
              :src="(selected as Crypto).icon"
              alt="crypto icon"
              class="new-creating-card-header-icon" />
            <div class="new-creating-card-header-text">
              <div class="new-creating-card-header-title">
                {{ (selected as Crypto).title }}
              </div>
              <div class="new-creating-card-header-description">
                2500 {{ (selected as Crypto).title }}
              </div>
            </div>
          </template>
        </div>
        <img
          src="/icons/verification/down.svg"
          alt="down"
          class="new-creating-card-header-arrow"
          :class="{ 'rotate-180': isOpen }" />
      </slot>
    </div>

    <!-- Dropdown -->
    <div
      class="dropdown-container position-absolute position-top-full position-left-0 position-right-0 background-dark rounded-bottom z-index-10 scroll-y transition-height duration-300"
      :class="{ 'height-open': isOpen, 'height-closed': !isOpen }">
      <slot
        name="options"
        :items="props.items"
        :selected="selected"
        :select="handleSelect">
        <div
          v-for="item in props.items"
          :key="item.id"
          class="dropdown-item"
          @click="handleSelect(item)">
          <div class="dropdown-item-content">
            <img :src="item.icon" class="dropdown-item-icon" />
            <div class="dropdown-item-text">
              <div class="dropdown-item-title">{{ item.title }}</div>
              <div class="dropdown-item-subtitle">{{ item.title }} Network</div>
            </div>
            <input
              v-if="props.multiple"
              type="checkbox"
              :checked="isItemSelected(item)"
              class="dropdown-checkbox"
              @click.stop />
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

export interface Crypto {
  id: number | string;
  title: string;
  icon: string;
  [key: string]: any;
}

interface Props {
  items: Crypto[];
  value?: Crypto | Crypto[] | null;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  multiple: false,
});

const emit = defineEmits<{
  input: [value: Crypto | Crypto[]];
  select: [value: Crypto | Crypto[]];
}>();

const isOpen = ref(false);
const selected = ref<Crypto[] | Crypto | null>(null);
const dropdownRef = ref<HTMLElement>();

onMounted(() => {
  selected.value = props.value ?? (props.multiple ? [] : null);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.value,
  (val) => {
    selected.value = val;
  }
);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  if (!dropdownRef.value?.contains(target)) {
    closeDropdown();
  }
}

function isItemSelected(item: Crypto): boolean {
  if (!props.multiple || !Array.isArray(selected.value)) return false;
  return selected.value.some((i) => i.id === item.id);
}

function handleSelect(item: Crypto) {
  if (props.multiple) {
    let newSelection = Array.isArray(selected.value) ? [...selected.value] : [];

    const index = newSelection.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      newSelection.splice(index, 1);
    } else {
      newSelection.push(item);
    }
    selected.value = newSelection;
    emit("input", newSelection);
    emit("select", newSelection);
  } else {
    selected.value = item;
    closeDropdown();
    emit("input", item);
    emit("select", item);
  }
}
</script>

<style lang="scss" scoped>
@use "../../assets/styles/shared/dropdown" as *;
</style>
