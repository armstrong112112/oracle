<template>
  <div class="more-settings-template">
    <!-- Десктопная версия -->
    <div class="more-settings-template__desktop" v-if="!isMobile">
      <div class="more-settings-template__sidebar">
        <more-settings-sidebar />
      </div>
      <div class="more-settings-template__content">
        <h1 class="more-settings-template__title">{{ title }}</h1>
        <slot />
      </div>
    </div>
    
    <!-- Мобильная версия - только слот -->
    <div class="more-settings-template__mobile" v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import MoreSettingsSidebar from '~/widgets/moresettings/more-settings-sidebar.vue'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

// Reactive state
const windowWidth = ref<number>(0)

// Computed properties
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024
})

// Methods
const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
  }
}

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" scoped>
.more-settings-template {
  width: 100%;
  padding: 0 20px 0 40px;
  &__title {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 120%;
    color: #fff;
    margin-bottom: 24px;
  }
  &__desktop {
    display: flex;
    gap: 24px;
    padding: 20px 0;
    
    .more-settings-template__sidebar {
      flex-shrink: 0;
      flex-basis: 320px;

    }
    
    .more-settings-template__content {
      border-left: 1px solid #2b2741;
      margin-left: 10px;
      flex: 1;
      min-width: 0; // Для корректной работы flex
      padding: 0 24px;
    }
  }
  
  &__mobile {
    width: 100%;
    // На мобильных устройствах компонент просто пропускает контент
  }
}

// Медиа-запрос для мобильных устройств
@media (max-width: 1023px) {
  .more-settings-template__desktop {
    display: none;
  }
  
  .more-settings-template__mobile {
    display: block;
  }
}

@media (min-width: 1024px) {
  .more-settings-template__mobile {
    display: none;
  }
  
  .more-settings-template__desktop {
    display: flex;
  }
}
</style> 