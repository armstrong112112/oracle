<template>
  <div class="active-sessions">
    <h3 class="active-sessions__title">Active Sessions</h3>

    <div class="active-sessions__group">
      <div
        v-for="(session, index) in sessions"
        :key="index"
        class="active-sessions__item"
      >
        <div class="active-sessions__button" @click="toggle(index)">
          <div class="active-sessions__icon">
            <img :src="session.device" alt="" />
          </div>
          <div class="active-sessions__info">
            {{ session.name }}
          </div>
          <div
            class="active-sessions__arrow"
            :class="{ rotated: activeIndex === index }"
          >
            <ArrowIcon />
          </div>
        </div>

        <transition
          name="accordion"
          @enter="enter"
          @after-enter="afterEnter"
          @leave="leave"
        >
          <div v-show="activeIndex === index" class="active-sessions__body">
            <p class="active-sessions__location">
              {{ session.location }} · {{ session.time }}
            </p>
          </div>
        </transition>
      </div>
    </div>

    <new-oracle-button text="Terminate All the Sessions" />
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/svg/arrow-left.svg?component'

interface SessionItem {
  name: string
  device: string
  location: string
  time: string
}

// Data
const sessions: SessionItem[] = [
  {
    name: 'iOS - Mobile Safari 17.0',
    device: '/svg/moresettings/computer-img.svg',
    location: 'Moscow, Russia',
    time: 'yesterday at 22:21',
  },
  {
    name: 'iOS - Mobile Safari 17.0',
    device: '/svg/moresettings/mobile-img.svg',
    location: 'Tashkent, Uzbekistan',
    time: 'today at 10:05',
  },
  {
    name: 'iOS - Mobile Safari 17.0',
    device: '/svg/moresettings/computer-img.svg',
    location: 'London, UK',
    time: '2 days ago',
  },
  {
    name: 'iOS - Mobile Safari 17.0',
    device: '/svg/moresettings/mobile-img.svg',
    location: 'Tashkent, Uzbekistan',
    time: 'today at 10:05',
  },
]

const activeIndex = ref<number | null>(0)

// Methods
const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const enter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.height = '0px'
  element.style.overflow = 'hidden'
  const height = element.scrollHeight
  requestAnimationFrame(() => {
    element.style.height = height + 'px'
  })
  setTimeout(() => {
    done()
  }, 300)
}

const afterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = ''
}

const leave = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    element.style.height = '0px'
  })
  setTimeout(() => {
    done()
  }, 300)
}
</script>

<style lang="scss">
.active-sessions {
  &__title {
    margin-bottom: 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #fff;
  }
  &__group {
    margin-bottom: 8px;
  }
  &__item {
    width: calc(100% + 32px);
    margin-left: -16px;
    padding: 12px 16px;
    border-bottom: 1px solid #2b2741;
    &:last-child {
      border: 0;
    }
  }
  &__button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px 0;
    cursor: pointer;
  }
  &__info {
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__arrow {
    transition: 0.2s;
    svg {
      width: 6px;
      height: 12px;
    }
    &.rotated {
      transform: rotate(90deg);
    }
  }
  &__body {
    transition: 0.2s;
  }
  &__location {
    padding: 8px 0 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #67639a;
  }
  .new-oracle-button {
    min-height: 36px;
    font-weight: 500;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
  }
}
</style>
