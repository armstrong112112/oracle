<template>
  <div class="page-header">
    <div class="page-header__left">
      <img
        v-if="showBackButton"
        src="/assets/svg/arrow-back.svg"
        alt="Назад"
        class="page-header__back-icon"
        @click="handleBackClick" />
    </div>

    <div class="page-header__center">
      <h1 class="page-header__title">{{ title }}</h1>
    </div>

    <div class="page-header__right">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const emit = defineEmits<{
  back: [];
}>();

withDefaults(
  defineProps<{
    title: string;
    showBackButton?: boolean;
  }>(),
  {
    showBackButton: true,
  }
);

const handleBackClick = () => {
  emit("back");
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  position: sticky;
  top: 0;
  background: #000;
  z-index: 99;
  width: 100%;

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  &__center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  &__back-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__title {
    font-family: Inter, sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0;
    color: white;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
}
</style>
