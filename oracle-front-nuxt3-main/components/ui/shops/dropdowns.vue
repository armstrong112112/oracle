<template>
  <div class="dropdown">
    <div v-if="lable" class="dropdown__lable">{{ lable }}</div>
    <div
      class="dropdown__trigger"
      :class="{ active: isOpen }"
      @click="handleToggle">
      <div class="dropdown-content">
        <div
          class="dropdown-title"
          :class="selected !== 'Choose' ? `active` : ''">
          {{ selected }}
        </div>
        <div class="dropdown-arrow">
          <img
            src="/svg/shop/icons/arrow-down.svg"
            alt="arrow"
            :class="{ open: isOpen }" />
        </div>
      </div>
    </div>
    <transition name="accordion">
      <div v-if="isOpen" class="dropdown-menu">
        <div
          v-for="(option, i) of options"
          :key="i"
          class="dropdown-item"
          @click="handleSelect(option)">
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

interface Props {
  value?: string;
  modelValue?: string;
  lable: string;
  options: string[];
  default?: string | null;
  tabindex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  modelValue: "",
  default: null,
  tabindex: 0,
});

const emit = defineEmits<{
  input: [value: string];
}>();

const instance = getCurrentInstance();
const selected = ref<string | null>(null);
const isOpen = ref(false);

watch(
  () => props.value,
  (newValue) => {
    selected.value = newValue || props.default || "Choose";
  },
  { immediate: true }
);

function handleToggle(): void {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event: Event): void {
  if (instance && !instance.vnode.el?.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

function handleSelect(option: string): void {
  selected.value = option;
  isOpen.value = false;
  emit("input", option);
}

onMounted(() => {
  selected.value = props.value || props.default || "Choose";
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  flex-direction: column;

  .dropdown__lable {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }

  .dropdown__trigger {
    width: 100%;
    padding: 12px 13px;
    display: flex;
    align-items: center;
    gap: 9px;
    background-color: #13121b;
    border-radius: 12px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: border-color 0.1s ease;
    margin-top: 8px;

    &.active {
      border-color: #f64e2a !important;
    }

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .dropdown-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .dropdown-content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .dropdown-title {
        margin-top: 3px;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 12px;
        color: #67639a;

        &.active {
          font-size: 14px;
          color: white !important;
        }
      }

      .dropdown-arrow {
        img {
          transition: transform 0.1s ease-in;

          &.open {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .dropdown-menu {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #13121b;
    color: white;
    border-radius: 12px;
    .dropdown-item {
      padding: 10px 12px;
      font-size: 15px;

      font-family: Roboto, sans-serif;
      font-weight: 400;
      color: #fff;
      cursor: pointer;
    }
  }
}

.accordion-enter-active {
  transition: all 0.015s ease-out;
  overflow: hidden;
}

.accordion-leave-active {
  transition: all 0.015s ease-in;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-left: 32px;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px; // Установите достаточное значение для ваших пунктов
  opacity: 1;
  margin-top: 4px;
  padding-left: 32px;
}
</style>
