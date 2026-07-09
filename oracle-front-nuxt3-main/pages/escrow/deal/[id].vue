<template>
  <SingleDeal />
</template>

<script setup lang="ts">
import SingleDeal from "~/entities/escrow/ui/deal/SingleDeal.vue";

definePageMeta({ layout: "sidebar" });

const windowWidth = ref(0);

onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
  }
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}
</script>

<style scoped></style>
