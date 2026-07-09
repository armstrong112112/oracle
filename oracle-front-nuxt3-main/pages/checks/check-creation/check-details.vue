<template>
  <CheckDetailsContent :is-modal="false" />
</template>

<script setup lang="ts">
import CheckDetailsContent from '~/components/checks/CheckDetailsContent.vue'

// Use localePath if needed
const localePath = useLocalePath()
</script>
