<template>
  <div class="tabs-container" :style="containerStyle">
    <div
      v-for="tab in tabs"
      :key="tab.value"
      class="tab-item"
      :class="{
        'tab-item--active': isActive(tab.value),
        'tab-item--icon': isIcon,
        [`tab-item--${size}`]: true,
      }"
      @click="handleTabClick(tab)">
      <slot :item="tab" :isActive="isActive(tab.value)" name="item">
        <img
          v-if="tab.prepaidIcon"
          :src="tab.prepaidIcon"
          alt="prepaid"
          class="tab-prepaid-icon" />
        <img
          v-if="isIcon && tab.icon"
          :src="tab.icon"
          :alt="tab.title || tab.value"
          class="tab-icon" />
        <span v-if="!isIcon || tab.title" class="tab-title">
          {{ tab.title || tab.value }}
        </span>
        <img
          v-if="tab.appendIcon"
          :src="tab.appendIcon"
          alt="append"
          class="tab-append-icon" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hexToRgb } from "~/composables/formatter";

export interface TabItem {
  title?: string;
  value: string;
  prepaidIcon?: string;
  appendIcon?: string;
  icon?: string;
  cardNumber?: string;
  name?: string;
  surname?: string;
  currency?: string;
}

type TabSize = "sm" | "md" | "lg" | "xl";
type ActiveValue = string | TabItem | (string | TabItem)[];

interface Props {
  tabs: TabItem[];
  color?: string;
  activeColor?: string;
  innerColor?: string;
  activeInnerColor?: string;
  isIcon?: boolean;
  multiple?: boolean;
  active?: ActiveValue;
  size?: TabSize;
}

const props = withDefaults(defineProps<Props>(), {
  color: "#1B1A24",
  activeColor: "#F64E2A",
  innerColor: "#ffffff",
  activeInnerColor: "#ffffff",
  isIcon: false,
  multiple: false,
  active: "",
  size: "md",
});

const emit = defineEmits<{
  select: [value: TabItem | (string | TabItem)[]];
}>();

// Type guards
const isTabItem = (item: string | TabItem): item is TabItem => {
  return typeof item === "object" && item !== null && "value" in item;
};

const getTabValue = (item: string | TabItem): string => {
  return typeof item === "string" ? item : item.value;
};

// Computed CSS variables (calculated once, not per tab)
const containerStyle = computed(() => {
  const colorRgb = hexToRgb(props.color) || "";
  const activeColorRgb = hexToRgb(props.activeColor) || "";

  return {
    "--tab-color": props.color,
    "--tab-color-rgb": colorRgb,
    "--tab-active-color": props.activeColor,
    "--tab-active-color-rgb": activeColorRgb,
    "--tab-inner-color": props.innerColor,
    "--tab-active-inner-color": props.activeInnerColor,
  };
});

// Normalize active value to array for easier processing
const activeArray = computed(() => {
  if (!props.active || props.active === "") return [];
  return Array.isArray(props.active) ? props.active : [props.active];
});

// Optimized active state check
function isActive(tabValue: string): boolean {
  if (!props.active || props.active === "") return false;

  const checkValue = (item: string | TabItem): boolean => {
    return getTabValue(item) === tabValue;
  };

  if (props.multiple) {
    return activeArray.value.some(checkValue);
  } else {
    return checkValue(props.active as string | TabItem);
  }
}

// Optimized click handler
function handleTabClick(tab: TabItem) {
  if (props.multiple) {
    const current = activeArray.value;
    const tabValue = tab.value;

    const existingIndex = current.findIndex(
      (item) => getTabValue(item) === tabValue
    );

    const newSelection =
      existingIndex !== -1
        ? current.filter((_, idx) => idx !== existingIndex)
        : [...current, tab];

    emit("select", newSelection);
  } else {
    emit("select", tab);
  }
}
</script>

<style lang="scss" scoped>
.tabs-container {
  display: flex;
  gap: 8px;
  width: 100%;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: var(--tab-color);
  color: var(--tab-inner-color);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  white-space: nowrap;

  &:hover {
    background-color: rgba(var(--tab-color-rgb), 0.8);
  }

  &--active {
    background-color: var(--tab-active-color);
    color: var(--tab-active-inner-color);

    &:hover {
      background-color: rgba(var(--tab-active-color-rgb), 0.8);
    }
  }

  &--icon {
    flex-direction: column;
    gap: 4px;
    padding: 16px 12px;
    min-width: 80px;
  }

  // Размеры
  &--sm {
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 8px;

    &.tab-item--icon {
      padding: 12px 8px;
      min-width: 60px;
    }
  }

  &--md {
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 12px;

    &.tab-item--icon {
      padding: 16px 12px;
      min-width: 80px;
    }
  }

  &--lg {
    padding: 16px 20px;
    font-size: 16px;
    border-radius: 14px;

    &.tab-item--icon {
      padding: 20px 16px;
      min-width: 100px;
    }
  }

  &--xl {
    padding: 20px 24px;
    font-size: 18px;
    border-radius: 16px;

    &.tab-item--icon {
      padding: 24px 20px;
      min-width: 120px;
    }
  }
}

.tab-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(1);
}

.tab-item--active .tab-icon {
  filter: brightness(0) saturate(100%) invert(1);
}

.tab-title {
  font-weight: 500;
}

.tab-prepaid-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(1);
}

.tab-item--active .tab-prepaid-icon {
  filter: brightness(0) saturate(100%) invert(1);
}

.tab-append-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(1);
}

.tab-item--active .tab-append-icon {
  filter: brightness(0) saturate(100%) invert(1);
}

// Размеры иконок для разных размеров табов
.tab-item--sm {
  .tab-icon {
    width: 20px;
    height: 20px;
  }

  .tab-prepaid-icon,
  .tab-append-icon {
    width: 14px;
    height: 14px;
  }
}

.tab-item--md {
  .tab-icon {
    width: 24px;
    height: 24px;
  }

  .tab-prepaid-icon,
  .tab-append-icon {
    width: 16px;
    height: 16px;
  }
}

.tab-item--lg {
  .tab-icon {
    width: 28px;
    height: 28px;
  }

  .tab-prepaid-icon,
  .tab-append-icon {
    width: 18px;
    height: 18px;
  }
}

.tab-item--xl {
  .tab-icon {
    width: 32px;
    height: 32px;
  }

  .tab-prepaid-icon,
  .tab-append-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
