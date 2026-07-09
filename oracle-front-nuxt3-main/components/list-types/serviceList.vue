<template>
  <custom-list :items="items" variant="bordered">
    <template #title="{ item }">
      <h3 class="service-name">{{ $t('dashboard.serviceTitle') }}</h3>
      <nuxt-link :to="localePath(item.link)" class="more-link">{{
        $t('dashboard.seeMore')
        }}</nuxt-link>
    </template>
  </custom-list>
</template>

<script setup lang="ts">
import CustomList from '../custom-list.vue'

const localePath = useLocalePath()

interface Props {
  items: any[]
}

defineProps<Props>()
</script>
