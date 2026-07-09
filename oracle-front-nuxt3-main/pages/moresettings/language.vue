<template>
  <more-settings-template :title="$t('moreSettings.language')">
    <div class="lang-settings">
      <div class="main-container">
        <block-nav-back
          :to="localePath('/moresettings')"
          :text="$t('moreSettings.language')"
          v-if="isMobile"
        />
        <ul class="lang-list">
          <li
            v-for="lang of languages"
            :key="lang.id"
            class="list-item"
            @click="selectLang(lang.id)"
          >
            <div class="left-block">
              <div class="lang-info">
                <h5 class="lang-name">{{ $t(lang.name) }}</h5>
              </div>
            </div>
            <div class="selected-icon" :class="{ selected: lang.selected }">
              <tickCircleIcon />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </more-settings-template>
</template>

<script setup lang="ts">
import tickCircleIcon from '@/assets/svg/check-icon.svg?component'
import MoreSettingsTemplate from '~/widgets/moresettings/more-settings-template.vue'

const localePath = useLocalePath()

definePageMeta({
  layout: 'sidebar',
})

interface Language {
  id: number
  name: string
  selected: boolean
}

// Reactive state
const windowWidth = ref<number>(0)
const languages = ref<Language[]>([
  {
    id: 1,
    name: 'moreSettings.english',
    selected: true,
  },
  {
    id: 2,
    name: 'moreSettings.russian',
    selected: false,
  },
  {
    id: 3,
    name: 'moreSettings.chinese',
    selected: false,
  },
  {
    id: 4,
    name: 'moreSettings.spanish',
    selected: false,
  },
  {
    id: 5,
    name: 'moreSettings.french',
    selected: false,
  },
])

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

const selectLang = (id: number) => {
  languages.value = languages.value.map((lang) => ({
    ...lang,
    selected: lang.id === id,
  }))
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

<style lang="scss" scoped>
.lang-settings {
  .main-container {
    @media (min-width: 1024px) {
      max-width: 100%;
      padding: 0;
    }
  }
  .input {
    margin-bottom: 35px;
  }
  .lang-list {
    display: flex;
    flex-direction: column;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 16px 13px 4px;
      margin-right: -16px;
      cursor: pointer;
      border-bottom: 1px solid #2b2741;
      .left-block {
        display: flex;
        align-items: center;
        gap: 15px;
        .lang-info {
          .lang-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            color: #fff;
          }
        }
      }
      .selected-icon {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #2b2b2b;
        border-radius: 50%;
        transition: 0.2s;
        svg {
          opacity: 0;
          transition: 0.2s;
        }
        &.selected {
          background: #f64e2a;
          border-color: #f64e2a;
          svg {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
