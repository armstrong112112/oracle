<template>
  <div class="dropdown" ref="dropdownRef">
    <button class="arrow-sort__btn" @click="dropdown = !dropdown">
      <ArrowSortIcon />
    </button>
    <div class="dropdown-menu" :class="{ show: dropdown }">
      <div class="dropdown-item" v-for="item in items" :key="item.value">
        <button
          class="sort-btn"
          :class="{ active: item.value === selectedItem }"
          @click="selectItem(item.value)">
          {{ item.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowSortIcon from "assets/svg/arrow-sort.svg?component";
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { SortItem } from "#shared/types/sortItems";

interface Props {
  items: SortItem[];
  selectedItem: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [value: string];
}>();

const dropdown = ref(false);
const dropdownRef = ref<HTMLElement>();

function selectItem(value: string) {
  emit("select", value);
}

function clickOutside(event: Event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", clickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutside);
});
</script>

<style lang="scss">
.dropdown {
  position: relative;
  .arrow-sort__btn {
    cursor: pointer;
  }
  .dropdown-menu {
    min-width: 100px;
    border-radius: 5px;
    position: absolute;
    top: calc(100% + 15px);
    right: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s;
    &.show {
      opacity: 1;
      visibility: visible;
      top: calc(100% + 5px);
    }
    .dropdown-item {
      .sort-btn {
        width: 100%;
        padding: 5px 10px;
        background: #13121b;
        white-space: nowrap;
        cursor: pointer;
        font-family: "Inter", sans-serif;
        font-weight: 300;
        font-size: 12px;
        line-height: 140%;
        text-align: left;
        color: #fff;
        transition: 0.2s;
        &.active {
          background: #2b2741;
        }
      }
    }
  }
}
</style>
