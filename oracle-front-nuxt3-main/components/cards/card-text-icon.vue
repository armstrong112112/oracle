<template>
  <li class="cart-item">
    <div class="card-icon">
      <component v-if="isComponent" :is="icon" />
      <span v-else>{{ icon }}</span>
    </div>
    <p class="label">{{ title }}</p>
  </li>
</template>

<script setup lang="ts">
interface Props {
  icon: any
  title: string
}

const props = defineProps<Props>()

const isComponent = computed((): boolean => {
  // проверка, является ли объектом (Vue-компонент)
  return typeof props.icon === 'object'
})
</script>

<style lang="scss" scoped>
.cart-item {
  min-width: 104px;
  border-radius: 12px;
  padding: 10px;
  background: #13121b;
  .card-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #262530;
    border-radius: 8px;
    margin-bottom: 28px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .label {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
  }
}
</style>