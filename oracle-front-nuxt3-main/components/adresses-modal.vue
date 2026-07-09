<template>
  <div
    class="add-addresses-modal"
    :class="isVisible ? 'show' : ''"
    @click.self="$emit('close', false)"
  >
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isVisible?: boolean
}

withDefaults(defineProps<Props>(), {
  isVisible: false,
})

const emit = defineEmits<{
  close: [value: boolean]
}>()
</script>

<style lang="scss">
@use "@/assets/styles/components/adresses-modal.scss" as *;
</style>
