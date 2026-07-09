<template>
  <div class="more-main">
    <div class="main-container">
      <BlockNavBack :text="$t('moreSettings.settings')" v-if="isMobile" />
      <more-settings-sidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import MoreSettingsSidebar from '~/widgets/moresettings/more-settings-sidebar.vue'

const localePath = useLocalePath()

definePageMeta({
  layout: 'sidebar',
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
    updateLayout()
  }
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  // Layout is handled by definePageMeta
}

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss">
.more-main {
  min-height: calc(100vh - 85px);
  padding: 0 0 20px;
}
</style>
