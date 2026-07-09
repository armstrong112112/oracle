<template>
  <div
    class="flex flex-col gap-24 justify-between h-dvh notification mt-0 pb-0 pt-0 relative px-0">
    <img
      src="/icons/blackList/blackListBg.png"
      class="blackListBg"
      alt=""
      draggable="false" />
    <div class="flex flex-col gap-24">
      <PageHeader title="Oracle BlackList" :is-search="true" />
      <div class="py-16 flex flex-col gap-24">
        <BlackListPostCard ref="postListRef" />
      </div>
      <div class="market-feed__footer">
        <MarketFooter button-text="Submit Complaint" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlackListPostCard from "~/entities/blackList/ui/BlackListPostCard.vue";
import MarketFooter from "~/widgets/market/MarketFeed/MarketFooter/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
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
.blackListBg {
  position: fixed;
  object-fit: cover;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  opacity: 8%;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}
</style>
