<template>
  <div class="market-feed">
    <div class="market-feed__header" style="z-index: 6">
      <!--      <MarketHeader />-->
      <PageHeader
        title="Oracle Market"
        :plus-link="localePath('/whitelist/verification')"
        :is-plus="true" />
    </div>
    <div class="market-feed__content">
      <PinnedMessage class="market-feed__header" @click="handlePinnedClick" />
      <PostCard ref="postListRef" />
    </div>
    <div class="market-feed__footer">
      <MarketFooter button-text="Post at Oracle’s Market" />
    </div>

    <ScrollDown />
  </div>
</template>

<script setup lang="ts">
import PostCard from "@/entities/market/ui/Post/index.vue";
import ScrollDown from "@/features/market/ScrollDown/index.vue";
import MarketFooter from "@/widgets/market/MarketFeed/MarketFooter/index.vue";
import PinnedMessage from "@/widgets/market/MarketFeed/MarketPinnedMessage/index.vue";
import PageHeader from "@/widgets/notifications/pageHeader.vue";

const localePath = useLocalePath();

const postListRef = ref<InstanceType<typeof PostCard> | null>(null);

const handlePinnedClick = (): void => {
  if (postListRef.value && "scrollToPinnedPost" in postListRef.value) {
    (postListRef.value as any).scrollToPinnedPost();
  }
};
</script>

<style lang="scss">
.main-content {
  min-width: 100% !important;
}
.market-feed {
  display: flex;
  flex-direction: column;
  height: 90dvh;
  overflow: hidden;
  position: relative;

  &__header {
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: #121212;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 16px;
    @media (min-width: 1024px) {
      border: 1px solid #2b2741;
      border-radius: 16px;
      margin: 0 8px;
    }
  }
  &__content::-webkit-scrollbar {
    width: 10px;
  }

  &__content::-webkit-scrollbar-track {
    background: #121212;
    border-radius: 10px;
  }

  &__content::-webkit-scrollbar-thumb {
    background: #312f42 !important;
    border-radius: 10px;
  }

  &__content::-webkit-scrollbar-thumb:hover {
    background: #5b5b66 !important;
    cursor: auto;
  }

  &__content,
  &__footer {
    @media (min-width: 1024px) {
      margin: 0 24px;
    }
  }

  &__footer {
    position: sticky;
    bottom: 0;
    z-index: 10;
    background-color: #111016;
    border-top: 1px solid #21212d;
    padding: 12px;
    @media (min-width: 1024px) {
      border-top: none;
      background-color: transparent;
    }
  }
}
</style>
