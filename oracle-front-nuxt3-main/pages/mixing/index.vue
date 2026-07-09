<template>
  <div class="whitelist notification p-0 mt-0">
    <PageHeader
      :plus-link="localePath('/mixing/creating')"
      :title="t('mixing.pageTitle')"
      :is-plus="true"
      v-if="isMobile" />
    <block-home :wFull="isMobile" />
    <div class="flex flex-col gap-12 maxing-container w-full">
      <MixingList />
    </div>
  </div>
</template>

<script setup lang="ts">
import MixingList from "~/entities/mixing/ui/MixingList/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

// Layout
definePageMeta({
  layout: "sidebar",
});

// Composables
const localePath = useLocalePath();
const { t } = useI18n();

// Reactive state
const windowWidth = ref(0);

// Computed
const isMobile = computed(() => windowWidth.value < 1024);

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
});
</script>
<style lang="scss" scoped>
.notification {
  @media (min-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
}
.maxing-container {
  margin-top: 20px;
  @media (min-width: 1024px) {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
