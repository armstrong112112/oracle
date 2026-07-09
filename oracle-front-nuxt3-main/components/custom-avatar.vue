<template>
  <component
    :is="tag"
    class="user-item"
    :class="{ horizontal: namePosition === 'right' }"
  >
    <div class="user-avatar" :style="avatarStyle">
      <template v-if="shouldShowImage">
        <img :src="avatar" alt="" @error="onAvatarError" />
      </template>
      <template v-else>
        <span class="initials" :style="{ color: color }">{{ initials }}</span>
      </template>
    </div>

    <h4
      v-if="name && isNameVisible"
      class="user-name"
      :class="{ 'name-right': namePosition === 'right' }"
    >
      {{ name }}
    </h4>
  </component>
</template>

<script setup lang="ts">
import { getInitials } from '~/composables/formatter'

interface Props {
  name?: string
  avatar?: string
  namePosition?: 'bottom' | 'right'
  color?: string
  tag?: keyof HTMLElementTagNameMap
  size?: number
  isNameVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  avatar: '',
  namePosition: 'bottom',
  color: '#ff9900',
  tag: 'div',
  size: 48,
  isNameVisible: true,
})

// Reactive state
const imageError = ref(false)

// Computed properties
const initials = computed((): string => {
  return props.name ? getInitials(props.name) : ''
})

const shouldShowImage = computed((): boolean => {
  return Boolean(props.avatar) && !imageError.value
})

const avatarStyle = computed((): Record<string, string> => {
  return {
    background: props.avatar && !imageError.value ? 'transparent' : `${props.color}22`, // transparent bg
    border: `1px solid ${props.color}44`,
    width: `${props.size}px`,
    height: `${props.size}px`,
    marginBottom: props.isNameVisible ? '6px' : '0',
  }
})

// Methods
const onAvatarError = () => {
  imageError.value = true
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/user.scss' as *;
</style>
