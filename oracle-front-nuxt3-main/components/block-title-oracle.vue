<template>
  <span class="block-title-oracle">{{ text }}</span>
</template>
<script setup lang="ts">
interface Props {
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: "",
});
</script>
<style lang="scss">
.block-title-oracle {
  width: 100%;
  letter-spacing: 0.7px;
  font-family: var(--second-family);
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
}
</style>
