<template>
  <div :class="['loader', `loader--${props.type}`]" :style="loaderStyles">
    <!-- Spinner loader -->
    <div v-if="props.type === 'spinner'" class="loader__spinner">
      <div class="loader__spinner-circle"></div>
    </div>

    <!-- Dots loader -->
    <div v-else-if="props.type === 'dots'" class="loader__dots">
      <div class="loader__dot"></div>
      <div class="loader__dot"></div>
      <div class="loader__dot"></div>
    </div>

    <!-- Pulse loader -->
    <div v-else-if="props.type === 'pulse'" class="loader__pulse"></div>

    <!-- Bars loader -->
    <div v-else-if="props.type === 'bars'" class="loader__bars">
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
    </div>

    <!-- Ring loader -->
    <div v-else-if="props.type === 'ring'" class="loader__ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- Default circle loader -->
    <div v-else class="loader__circle">
      <div class="loader__circle-inner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type LoaderType = "spinner" | "dots" | "pulse" | "bars" | "ring" | "circle";

interface Props {
  type?: LoaderType;
  color?: string;
  animated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "spinner",
  color: "#8780CF",
  animated: true,
});

const loaderStyles = computed(() => ({
  "--loader-color": props.color,
  "--loader-animation": props.animated ? "running" : "paused",
}));
</script>

<style lang="scss" scoped>
.loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  --loader-color: #8780cf;
  --loader-animation: running;

  // Spinner loader
  &--spinner {
    .loader__spinner {
      width: 40px;
      height: 40px;
      position: relative;

      .loader__spinner-circle {
        width: 100%;
        height: 100%;
        border: 3px solid transparent;
        border-top: 3px solid var(--loader-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        animation-play-state: var(--loader-animation);
      }
    }
  }

  // Dots loader
  &--dots {
    .loader__dots {
      display: flex;
      gap: 8px;

      .loader__dot {
        width: 12px;
        height: 12px;
        background-color: var(--loader-color);
        border-radius: 50%;
        animation: dots 1.4s ease-in-out infinite both;
        animation-play-state: var(--loader-animation);

        &:nth-child(1) {
          animation-delay: -0.32s;
        }

        &:nth-child(2) {
          animation-delay: -0.16s;
        }
      }
    }
  }

  // Pulse loader
  &--pulse {
    .loader__pulse {
      width: 40px;
      height: 40px;
      background-color: var(--loader-color);
      border-radius: 50%;
      animation: pulse 1.2s ease-in-out infinite;
      animation-play-state: var(--loader-animation);
    }
  }

  // Bars loader
  &--bars {
    .loader__bars {
      display: flex;
      gap: 4px;
      align-items: center;
      height: 40px;

      .loader__bar {
        width: 6px;
        height: 100%;
        background-color: var(--loader-color);
        border-radius: 2px;
        animation: bars 1.2s ease-in-out infinite;
        animation-play-state: var(--loader-animation);

        &:nth-child(1) {
          animation-delay: -1.2s;
        }

        &:nth-child(2) {
          animation-delay: -1.1s;
        }

        &:nth-child(3) {
          animation-delay: -1s;
        }

        &:nth-child(4) {
          animation-delay: -0.9s;
        }

        &:nth-child(5) {
          animation-delay: -0.8s;
        }
      }
    }
  }

  // Ring loader
  &--ring {
    .loader__ring {
      display: inline-block;
      position: relative;
      width: 40px;
      height: 40px;

      div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 32px;
        height: 32px;
        margin: 4px;
        border: 3px solid var(--loader-color);
        border-radius: 50%;
        animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        animation-play-state: var(--loader-animation);
        border-color: var(--loader-color) transparent transparent transparent;

        &:nth-child(1) {
          animation-delay: -0.45s;
        }

        &:nth-child(2) {
          animation-delay: -0.3s;
        }

        &:nth-child(3) {
          animation-delay: -0.15s;
        }
      }
    }
  }

  // Circle loader
  &--circle {
    .loader__circle {
      width: 40px;
      height: 40px;
      position: relative;

      .loader__circle-inner {
        width: 100%;
        height: 100%;
        border: 3px solid rgba(135, 128, 207, 0.2);
        border-top: 3px solid var(--loader-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        animation-play-state: var(--loader-animation);
      }
    }
  }
}

// Animations
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dots {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

@keyframes bars {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}

@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
