<template>
  <div class="block-nav-bar">
    <nuxt-link :to="to" class="back-btn">
      <BackIcon />
    </nuxt-link>
    <span class="block-nav-bar__text">
      {{ text }}
    </span>
    <button v-if="search" class="search-btn" @click="$emit('openSearch', true)">
      <SearchIcon />
    </button>
    <button v-if="time" class="time-btn" @click="$emit('openTime', true)">
      <ClockIcon />
    </button>
  </div>
</template>
<script setup lang="ts">
import BackIcon from '@/assets/svg/oracle-back.svg?component'
import SearchIcon from '@/assets/svg/search.svg?component'
import ClockIcon from '@/assets/svg/clock-circle.svg?component'

interface Props {
  text?: string
  to?: string
  search?: boolean
  time?: boolean
}

withDefaults(defineProps<Props>(), {
  text: '',
  to: '',
  search: false,
  time: false,
})

const emit = defineEmits<{
  openSearch: [value: boolean]
  openTime: [value: boolean]
}>()
</script>
<style lang="scss" scoped>
.block-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 0;
  margin-bottom: 4px;
  position: relative;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #fff;
  .back-btn {
    min-width: 22px;
    min-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    z-index: 3;
    svg {
      path {
        stroke: #fff;
      }
    }
  }
  .search-btn,
  .time-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: 3;
    cursor: pointer;
  }
  &__text {
    width: 100%;
    text-align: center;
  }
  .search-btn {
    cursor: pointer;
    svg {
      path {
        stroke: #fff;
      }
    }
  }
}
</style>
