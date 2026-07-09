<template>
  <div class="whitelist h-dvh notification relative p-0 mt-0">
    <PageHeader
      :title="t('mixing.newMixing')"
      :is-plus="false"
      :is-created="true" />
    <div class="flex flex-col gap-24 px-16 py-8">
      <MixingCreatedCard />
      <MixingCreatedProgressCard />
    </div>
    <div class="mixing-footer mt-20">
      <nuxt-link :to="localePath('/mixing/pre-finished')" class="w-full">
        <CustomButton
          :value="t('mixing.contactSupport')"
          type="primary"
          class="w-full" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { useMixingStore } from "~/store/mixing";
import MixingCreatedCard from "~/widgets/mixing/MixingCreatedCard/index.vue";
import MixingCreatedProgressCard from "~/widgets/mixing/MixingCreatedProgressCard/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

// Layout
definePageMeta({
  layout: "sidebar",
});

// Composables
const localePath = useLocalePath();
const { t } = useI18n();

const mixingStore = useMixingStore();

// Reactive state
const windowWidth = ref(0);

// Computed

// Methods

const selectMode = (mode: string) => {
  mixingStore.setSelectedMode(mode);
};

// Lifecycle
</script>

<style lang="scss" scoped>
.mixing-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  border-top: 1px solid #2b2741;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #13121b;
  z-index: 999;
  left: 0;
  right: 0;
  @media (min-width: 1024px) {
    border-top: none;
    background: transparent;
  }
}
</style>
