<template>
  <div class="feature-link">
    <NuxtLink
      v-if="to"
      :to="to"
      class="feature-link__item"
      :class="{
        'feature-link__item--no-line': !showLine,
        'feature-link__item--active': isActive,
      }">
      <div class="feature-link__icon">
        <img :src="src" alt="" />
      </div>
      <div class="feature-link__label">{{ text }}</div>
      <div class="feature-link__value">{{ val }}</div>
      <div v-if="arrow" class="feature-link__arrow"></div>
    </NuxtLink>
    <component
      v-else
      :is="tag"
      class="feature-link__item"
      :class="{
        'feature-link__item--no-line': !showLine,
        'feature-link__item--active': isActive,
      }">
      <div class="feature-link__icon">
        <img :src="src" alt="" />
      </div>
      <div class="feature-link__label">{{ text }}</div>
      <div class="feature-link__value">{{ val }}</div>
      <div v-if="arrow" class="feature-link__arrow"></div>
    </component>
  </div>
</template>

<script setup lang="ts">
// Define props
const props = withDefaults(
  defineProps<{
    to?: string;
    src?: string;
    text?: string;
    val?: string;
    arrow?: boolean;
    showLine?: boolean;
    tag?: string;
  }>(),
  {
    to: "",
    src: "",
    text: "",
    val: "",
    arrow: true,
    showLine: true,
    tag: "div",
  }
);

// Use route for active state
const route = useRoute();

// Computed properties
const isActive = computed((): boolean => {
  if (!props.to) return false;
  return route.path === props.to || route.path.startsWith(props.to + "/");
});
</script>

<style lang="scss">
.feature-link {
  &__item {
    width: calc(100% + 32px);
    margin-left: -16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 9px 16px;
    transition: 0.2s;
    position: relative;
    text-decoration: none;

    &:hover {
      background: #2b2741;
      @media (min-width: 1024px) {
        border-radius: 12px;
      }
    }

    &--active {
      background: #2b2741;
      @media (min-width: 1024px) {
        border-radius: 12px;
      }

      .feature-link__label {
        color: #7a74ba;
        font-weight: 500;
      }

      .feature-link__icon {
        opacity: 0.8;
      }
    }

    &--no-line {
      &::after {
        display: none;
      }
    }
    &::after {
      content: "";
      width: calc(100% - 58px);
      height: 1px;
      background: #2b2741;
      position: absolute;
      top: calc(100% - 1px);
      right: 0;
    }
  }
  &__icon {
    svg {
      width: 30px;
      height: 30px;
    }
  }
  &__label {
    width: 100%;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    transition: 0.2s;
  }
  &__value {
    white-space: nowrap;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7a74ba;
  }
  &__arrow {
    width: 6px;
    height: 13px;
    min-width: 6px;
    background: url("/svg/arrow-left.svg") no-repeat center/contain;
  }
}
</style>
