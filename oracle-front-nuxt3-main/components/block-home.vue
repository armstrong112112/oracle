<template>
  <div
    class="home-block"
    :class="{ collapsed: !showAllTutorials, 'w-full': wFull }">
    <transition-group
      name="card-fade"
      tag="ul"
      class="home-cards"
      :class="{ hidden: !showAllTutorials }">
      <li v-for="card of displayedCards" :key="card.id" class="card-item">
        <div class="card-img">
          <img :src="card.img" alt="" />
        </div>
        <h3 class="home-title">{{ $t(card.title) }}</h3>
      </li>
    </transition-group>
    <div class="home-actions">
      <button
        v-if="isDesktop"
        @click="toggleTutorials"
        class="hide-tutorials-btn">
        {{ showAllTutorials ? "Hide tutorials" : "Show tutorials" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from "~/store/dashboard";

interface Props {
  wFull?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  wFull: false,
});

// Store
const dashboardStore = useDashboardStore();
const { showAllTutorials, isDesktop, displayedCards } =
  storeToRefs(dashboardStore);
const { toggleTutorials, checkScreenSize } = dashboardStore;

// Lifecycle
onMounted(() => {
  checkScreenSize();
  if (import.meta.client) {
    window.addEventListener("resize", checkScreenSize);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", checkScreenSize);
  }
});
</script>

<style lang="scss">
.home-block {
  width: calc(100% + 32px);
  margin-left: -16px;
  transition: all 0.3s ease;
  &.w-full {
    width: 100%;
  }
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    padding-bottom: 12px;
    border-bottom: 1px solid #2b2741;

    &.collapsed {
      justify-content: flex-end;
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  .hide-tutorials-btn {
    border-radius: 8px;
    padding: 8px 16px;
    color: #f64e2a;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .home-cards {
    display: flex;
    gap: 8px;
    padding: 0 16px;
    overflow-x: auto;
    overflow-y: hidden;
    transition: all 0.3s ease;

    @media (min-width: 1024px) {
      &.hidden {
        width: 0;
        opacity: 0;
        padding: 0;
        margin: 0;
        overflow: hidden;
      }
    }

    &::-webkit-scrollbar {
      height: 0;
    }

    .card-item {
      border: 1px solid #2b2741;
      border-radius: 14px;
      padding: 4px;
      width: 89px;
      min-width: 89px;
      height: 107px;
      position: relative;

      .card-img {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .home-title {
        position: absolute;
        padding: 10px;
        left: 0;
        bottom: 0;
        font-family: "Inter", sans-serif;
        font-weight: 600;
        font-size: 12px;
        line-height: 120%;
        color: #fff;
        text-shadow: 0 0 20px #000;
      }
    }
  }
}

// Анимации для transition-group
.card-fade-enter-active,
.card-fade-leave-active {
  transition: all 0.3s ease;
}

.card-fade-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.card-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.card-fade-move {
  transition: transform 0.3s ease;
}
</style>
