<template>
  <div class="badge-wrapper" :class="wrapperClasses">
    <slot />
    <div
      v-if="showBadge"
      class="badge"
      :class="badgeClasses"
      :style="badgeStyles">
      <span v-if="!dot" class="badge__content">
        {{ content }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type BadgeSize = "x-small" | "small" | "default" | "large" | "x-large";
type BadgeLocation =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "top"
  | "bottom"
  | "start"
  | "end";

interface Props {
  modelValue?: boolean;
  content?: string | number;
  dot?: boolean;
  size?: BadgeSize;
  color?: string;
  bgColor?: string;
  location?: BadgeLocation;
  offsetX?: number;
  offsetY?: number;
  bordered?: boolean;
  borderColor?: string;
  borderSize?: string;
  floating?: boolean;
  overlap?: boolean;
  transition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  content: "",
  dot: false,
  size: "default",
  color: "#fff",
  bgColor: "#ff5252",
  location: "top-end",
  offsetX: 0,
  offsetY: 0,
  bordered: false,
  borderColor: "#fff",
  borderSize: "2px",
  floating: false,
  overlap: false,
  transition: "scale-rotate-transition",
});

const wrapperClasses = computed(() => [
  "badge-wrapper",
  {
    "badge-wrapper--overlap": props.overlap,
    "badge-wrapper--floating": props.floating,
  },
]);

const badgeClasses = computed(() => [
  "badge",
  `badge--${props.size}`,
  `badge--${props.location}`,
  {
    "badge--dot": props.dot,
    "badge--bordered": props.bordered,
    "badge--floating": props.floating,
    "badge--overlap": props.overlap,
  },
]);

const badgeStyles = computed(() => {
  const styles: Record<string, string> = {
    backgroundColor: props.bgColor,
    color: props.color,
  };

  if (props.offsetX !== 0) {
    styles.transform = `translate(${props.offsetX}px, ${props.offsetY}px)`;
  } else if (props.offsetY !== 0) {
    styles.transform = `translateY(${props.offsetY}px)`;
  }

  return styles;
});

const showBadge = computed(() => {
  if (!props.modelValue) return false;
  if (props.dot) return true;
  return props.content !== "" && props.content !== 0;
});
</script>

<style scoped lang="scss">
.badge-wrapper {
  position: relative;
  display: inline-block;

  &--overlap {
    .badge {
      position: absolute;
    }
  }

  &--floating {
    .badge {
      position: absolute;
    }
  }
}

.badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  // Размеры
  &--x-small {
    width: 8px;
    height: 8px;
    font-size: 8px;
    min-width: 8px;
  }

  &--small {
    width: 12px;
    height: 12px;
    font-size: 10px;
    min-width: 12px;
  }

  &--default {
    width: 18px;
    height: 18px;
    font-size: 12px;
    min-width: 18px;
  }

  &--large {
    width: 24px;
    height: 24px;
    font-size: 14px;
    min-width: 24px;
  }

  &--x-large {
    width: 32px;
    height: 32px;
    font-size: 16px;
    min-width: 32px;
  }

  // Типы
  &--dot {
    width: 8px !important;
    height: 8px !important;
    min-width: 8px !important;

    .badge__content {
      display: none;
    }
  }

  // Позиционирование
  &--top-start {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  &--top-end {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  &--bottom-start {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  &--bottom-end {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }

  &--top {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &--bottom {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  &--start {
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
  }

  &--end {
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
  }

  // Дополнительные стили
  &--bordered {
    border-width: v-bind(borderSize);
    border-style: solid;
    border-color: v-bind(borderColor);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  &--floating {
    position: fixed;
  }

  &--overlap {
    // Стили для перекрывающегося бейджа
  }

  &__content {
    line-height: 1;
    font-weight: 500;
  }
}

// Адаптивные размеры шрифта
@media (max-width: 768px) {
  .badge {
    &--x-small {
      font-size: 6px;
    }

    &--small {
      font-size: 8px;
    }

    &--default {
      font-size: 10px;
    }

    &--large {
      font-size: 12px;
    }

    &--x-large {
      font-size: 14px;
    }
  }
}

// Анимации
.scale-rotate-transition-enter-active,
.scale-rotate-transition-leave-active {
  transition: all 0.2s ease-in-out;
}

.scale-rotate-transition-enter-from,
.scale-rotate-transition-leave-to {
  opacity: 0;
  transform: scale(0) rotate(-45deg);
}
</style>
