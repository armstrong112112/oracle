<template>
  <div ref="postListContainer" class="post-list">
    <div
      v-for="post in posts"
      :key="post.id"
      :ref="(el) => (post.id === pinnedPostId ? setPinnedPostRef(el as Element | null) : null)"
      :class="post.id === pinnedPostId ? 'pinnedPost' : undefined"
      class="post">
      <div v-if="post.type === 'text'" class="post-content">
        {{ post.content }}
      </div>
      <div
        v-else-if="post.type === 'image'"
        class="post-content post-content--media">
        <img :src="post.image" alt="Post image" class="post-image" />
        <div class="post-content post-content--with-media">
          {{ post.content }}
        </div>
      </div>
      <div
        v-else-if="post.type === 'video'"
        class="post-content post-content--media">
        <video
          :src="post.video"
          controls
          autoplay
          loop
          class="post-video"></video>
        <div class="post-content post-content--with-media">
          {{ post.content }}
        </div>
      </div>
      <div class="post-bottom">
        <EmojiClicker
          :post-id="post.id"
          :reactions="post.reactions || []"
          @update-reactions="updateReactions" />
        <div class="post-meta">
          <span>
            <img src="/icons/market/eye.svg" alt="" />
            {{ post.views }}</span
          >
          <span> {{ post.username }} at {{ post.timestamp }}</span>
        </div>
      </div>
      <div class="post-footer">
        <CustomButton value="Contact Seller" type="primary" class="w-full" />
      </div>
      <SharePost :author="post.author" :text="post.content || ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Posts } from "~/entities/market/data/posts";
import type {
  Post,
  UpdateReactionsPayload,
} from "~/entities/market/model/types";
import EmojiClicker from "~/entities/market/ui/EmojiClicker.vue";
import SharePost from "~/features/market/SharePost/index.vue";
import CustomButton from "~/components/ui/Button.vue";

const posts = ref<Post[]>(Posts);
const pinnedPostId = ref<string>("3");
const postListContainer = ref<HTMLElement | null>(null);
const pinnedPost = ref<HTMLElement | null>(null);

// Function to handle the pinned post ref callback (Vue 3 style)
const setPinnedPostRef = (el: Element | null) => {
  if (el instanceof HTMLElement) {
    pinnedPost.value = el;
  }
};

const updateReactions = (payload: UpdateReactionsPayload): void => {
  const post = posts.value.find((p) => p.id === payload.postId);
  if (post) {
    post.reactions = payload.reactions;
  }
};

const scrollToPinnedPost = () => {
  if (!postListContainer.value || !pinnedPost.value) {
    console.error("Required elements are missing", {
      container: postListContainer.value,
      pinned: pinnedPost.value,
    });
    return;
  }

  const pinned = pinnedPost.value;
  const container = postListContainer.value;

  // Scroll the pinned post into view smoothly
  pinned.scrollIntoView({ behavior: "smooth", block: "start" });

  // Alternative: manually calculate scroll position
  setTimeout(() => {
    const pinnedOffsetTop = pinned.offsetTop - container.offsetTop;
    container.scrollTop = pinnedOffsetTop;
  }, 100);
};

defineExpose({
  scrollToPinnedPost,
});
</script>

<style lang="scss">
.post-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  flex-direction: column;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 1024px) {
  .post-list {
    width: 100%;
    max-width: 100%;
  }
}

.post {
  background-color: #17161f;
  border-radius: 12px;
  color: #ffffff;
  max-width: 318px;
  width: max-content;
  position: relative;
  &-content {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    padding: 8px 16px 0;

    &--media {
      max-width: 278px;
      padding: 0 !important;
    }

    &--with-media {
      padding: 8px 16px 0 16px;
    }
  }

  &-image,
  &-video {
    max-width: 100%;
    border-radius: 8px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &-meta {
    color: white;
    opacity: 0.6;
    margin-left: auto;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 10px;
    line-height: 130%;
    letter-spacing: 0;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2px;
      margin-left: 6px;
    }
  }

  &-bottom {
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &-footer {
    font-family: Hanson, sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0;
    text-align: center;
    text-transform: uppercase;
    border-top: 1px solid #1d1c28;
    color: #f64e2a;
    padding: 12px;
    cursor: pointer;
  }
}
</style>
