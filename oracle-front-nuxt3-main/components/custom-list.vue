<template>
  <ul :class="listClass">
    <li v-for="(item, key) in items" :key="item.id || key" :class="itemClass" @click="handleClick(item, key)">
      <div v-if="variant == 'underline'" class="wallet-action__btn">
        <slot name="item" :item="item">
          <div v-if="item.img" class="method-img">
            <slot name="img" :item="item">
              <img :src="item.img" alt="" />
            </slot>
          </div>
          <div :class="itemBodyClass">
            <slot name="title" :item="item">
              <h3 class="method-name">
                {{ $t(item.title) }}
              </h3>
            </slot>
            <p v-if="item.description" class="method-description">
              <slot name="description" :item="item">
                {{ $t(item.description) }}
              </slot>
            </p>
          </div>
        </slot>
      </div>
      <template v-else>
        <slot name="item" :item="item">
          <div v-if="item.img" class="method-img">
            <slot name="img" :item="item">
              <img :src="item.img" alt="" />
            </slot>
          </div>
          <div :class="itemBodyClass">
            <slot name="title" :item="item">
              <h3 class="method-name">
                {{ $t(item.title) }}
              </h3>
            </slot>
            <p v-if="item.description" class="method-description">
              <slot name="description" :item="item">
                {{ $t(item.description) }}
              </slot>
            </p>
          </div>
        </slot>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  items: any[]
  clickable?: boolean
  variant?: 'elevated' | 'underline' | 'bordered'
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  clickable: false,
  variant: 'elevated',
})

// Computed properties
const listClass = computed(() => {
  return {
    'select-method__list': props.variant === 'elevated',
    'wallet-action': props.variant === 'underline',
    'oracle-services__list': props.variant === 'bordered',
  }
})

const itemBodyClass = computed(() => {
  return {
    'item-body': props.variant === 'elevated',
    'wallet-action__body': props.variant === 'underline',
    'service-body': props.variant === 'bordered',
  }
})

const itemClass = computed(() => {
  return {
    clickable: props.clickable,
    'method-item': props.variant === 'elevated',
    'wallet-actions': props.variant === 'underline',
    'service-item': props.variant === 'bordered',
  }
})

// Methods
const handleClick = (item: any, index: number) => {
  if (!props.clickable) return
  if (typeof item.onClick === 'function') {
    item.onClick()
  } else {
    console.log(`Clicked item at index ${index}:`, item)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/list.scss' as *;
</style>
