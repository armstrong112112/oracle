<template>
  <NuxtLink :to="to"
    >{{ text }}
    <ArrowRightIcon v-if="arrow == 'right'" />
  </NuxtLink>
</template>
<script setup lang="ts">
import ArrowRightIcon from '@/assets/svg/arrow-right.svg?component'

interface Props {
  text?: string
  to?: string
  arrow?: string
}

withDefaults(defineProps<Props>(), {
  text: '',
  to: '',
  arrow: '',
})
</script>
<style>
/* .nuxt-link-exact-active {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Reza Zulmi Alfaizi Sans';
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  text-transform: uppercase;
  color: #f64e2a;
  text-decoration: none;
} */
</style>
