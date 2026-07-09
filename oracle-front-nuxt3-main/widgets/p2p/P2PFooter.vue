<template>
  <nav class="p2p-footer">
    <div class="p2p-footer__container">
      <NuxtLink v-for="item in footerItems" :key="item.path" :to="item.path" class="p2p-footer__item"
        active-class="active" :exact="item.exact">
        <div class="p2p-footer__icon">
          <component :is="item.icon" />
        </div>
        <span class="p2p-footer__text">{{ item.text }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { FooterItem } from "~/shared/types/footer";
import { p2pFooterItems } from "./model/footer-data";

// Use localePath if needed
const localePath = useLocalePath();

// Computed properties
const footerItems = computed<FooterItem[]>(() => p2pFooterItems);
</script>

<style lang="scss" scoped>
.p2p-footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  height: 80px;
  background: linear-gradient(180deg, rgba(26, 25, 31, 0.95) 0%, rgba(26, 25, 31, 0.98) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 8px;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #646094;
    text-decoration: none;
    min-width: 60px;

    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }

    &.active {
      color: #FFFFFF;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    transition: all 0.3s ease;
    color: inherit;

    svg {
      width: 24px;
      height: 24px;
      transition: all 0.3s ease;

    }
  }

  &__text {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
    text-align: center;
    transition: all 0.3s ease;
  }

  &__item:hover &__icon {
    background: rgba(255, 255, 255, 0.05);

    svg {
      filter: brightness(0) saturate(100%) invert(1);
    }
  }

  &__item.active &__icon {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);

    svg {
      filter: brightness(0) saturate(100%) invert(1);
    }
  }

  &__item.active &__text {
    color: #FFFFFF;
  }
}

// Адаптивность для мобильных устройств
@media (max-width: 375px) {
  .p2p-footer {
    max-width: 100%;

    &__container {
      padding: 0 16px;
    }

    &__item {
      min-width: 50px;
      padding: 8px 4px;
    }

    &__icon {
      width: 32px;
      height: 32px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &__text {
      font-size: 11px;
    }
  }
}
</style>
