<template>
  <more-settings-template :title="$t('moreSettings.termsOfService')">
    <div class="terms-of-service">
      <div class="main-container">
        <block-nav-back
          :text="$t('moreSettings.termsOfServiceTitle')"
          :to="localePath('/moresettings')"
          v-if="isMobile"
        />
        <block-title-oracle :text="$t('moreSettings.oracleNetworkVersion')" />
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

definePageMeta({
  layout: 'sidebar',
})

const localePath = useLocalePath()

const windowWidth = ref(0)

const sections = [
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
]

const isMobile = computed(() => windowWidth.value < 1024)

const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
  }
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  setPageLayout(newLayout)
}

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
.terms-of-service {
  padding-bottom: 24px;
  
  .main-container {
    @media (min-width: 1024px) {
      max-width: 100%;
      padding: 0;
    }
  }
  
  .block-title-oracle {
    display: block;
    margin-bottom: 24px;
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
