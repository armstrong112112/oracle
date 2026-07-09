<template>
  <div class="post-share" @click="sharePost">
    <img src="/icons/market/SharePost.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
import { getNavigator, getWindowLocationHref } from "~/utils/clientStorage";

interface Props {
  author: string;
  text: string;
}

const props = defineProps<Props>();

const sharePost = async () => {
  const navigatorApi = getNavigator();
  if (navigatorApi?.share) {
    try {
      await navigatorApi.share({
        title: `Post by ${props.author}`,
        text: props.text,
        url: getWindowLocationHref() ?? "",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }
};
</script>

<style lang="scss">
.post-share {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #17161f;
  position: absolute;
  right: -40px;
  bottom: 0;
  cursor: pointer;
}
</style>
