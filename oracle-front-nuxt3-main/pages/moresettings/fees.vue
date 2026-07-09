<template>
  <more-settings-template :title="$t('moreSettings.fees')">
    <div class="fees">
      <div class="main-container">
        <block-nav-back
          :text="$t('moreSettings.fees')"
          :to="localePath('/moresettings')"
          v-if="isMobile"
        />
        <ul class="fees-list">
          <div
            v-for="item in fees"
            :key="item.id"
            class="list-item"
            :class="item.selected ? 'selected' : ''"
            @click="selectedFees(item.id)"
          >
            {{ $t(item.name) }}
          </div>
        </ul>
        <ul class="section-list">
          <li v-for="(section, index) in sections" :key="index" class="list-item">
            <h4 class="list-title">{{ $t(section.title) }}</h4>
            <p class="list-description">
              {{ section.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </more-settings-template>
</template>

<script setup lang="ts">
import MoreSettingsTemplate from '~/widgets/moresettings/more-settings-template.vue'

const localePath = useLocalePath()

definePageMeta({
  layout: 'sidebar',
})

interface Fee {
  id: number
  name: string
  selected: boolean
}

interface Section {
  id: number
  title: string
  description: string
}

// Reactive state
const windowWidth = ref<number>(0)
const fees = ref<Fee[]>([
  {
    id: 1,
    name: 'moreSettings.escrow',
    selected: true,
  },
  {
    id: 2,
    name: 'moreSettings.p2p',
    selected: false,
  },
  {
    id: 3,
    name: 'moreSettings.checks',
    selected: false,
  },
  {
    id: 4,
    name: 'moreSettings.mixing',
    selected: false,
  },
  {
    id: 5,
    name: 'moreSettings.swap',
    selected: false,
  },
  {
    id: 6,
    name: 'moreSettings.chats',
    selected: false,
  },
  {
    id: 7,
    name: 'moreSettings.escrow',
    selected: false,
  },
  {
    id: 8,
    name: 'moreSettings.p2p',
    selected: false,
  },
  {
    id: 9,
    name: 'moreSettings.checks',
    selected: false,
  },
  {
    id: 10,
    name: 'moreSettings.mixing',
    selected: false,
  },
  {
    id: 11,
    name: 'moreSettings.swap',
    selected: false,
  },
  {
    id: 12,
    name: 'moreSettings.bills',
    selected: false,
  },
  {
    id: 13,
    name: 'moreSettings.other',
    selected: false,
  },
])

const sections = ref<Section[]>([
  {
    id: 1,
    title: 'moreSettings.yourRequest',
    description:
      'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
  },
  {
    id: 2,
    title: 'moreSettings.yourRequest',
    description:
      'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
  },
  {
    id: 3,
    title: 'moreSettings.yourRequest',
    description:
      'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
  },
  {
    id: 4,
    title: 'moreSettings.yourRequest',
    description:
      'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
  },
  {
    id: 5,
    title: 'moreSettings.yourRequest',
    description:
      'Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån. Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt. ',
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

const selectedFees = (id: number) => {
  fees.value = fees.value.map((fee) => ({ ...fee, selected: fee.id === id }))
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
.fees {
  padding-bottom: 24px;
  
  .main-container {
    @media (min-width: 1024px) {
      max-width: 100%;
      padding: 0;
    }
  }
  
  .fees-list {
    width: calc(100% + 32px);
    display: flex;
    align-items: stretch;
    gap: 8px;
    overflow-x: auto;
    margin-left: -16px;
    padding: 0 16px;
    margin-bottom: 30px;
    &::-webkit-scrollbar {
      display: none;
    }
    .list-item {
      background: #13121b;
      border-radius: 8px;
      padding: 10px 16px;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      white-space: nowrap;
      font-weight: 500;
      font-size: 12px;
      line-height: 135%;
      text-align: center;
      color: #fff;
      transition: 0.2s;
      &:hover {
        background: #2b2741;
      }
      &.selected {
        background: #f64e2a;
      }
    }
  }
  .section-list {
    .list-item {
      padding: 12px 0;
      .list-title {
        margin-bottom: 8px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
      .list-description {
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 12px;
        line-height: 140%;
        color: #fff;
      }
    }
  }
}
</style>
