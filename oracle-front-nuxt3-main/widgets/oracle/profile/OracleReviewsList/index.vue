<template>
  <div class="reviews-container flex flex-col gap-16">
    <div class="review_tabs">
      <div
        class="review_tab"
        :class="{ active: activeTab === 'all' }"
        @click="setActiveTab('all')">
        {{ $t("whitelist.profile.oracle.reviews.all") }}
      </div>
      <div
        class="review_tab"
        :class="{ active: activeTab === 'like' }"
        @click="setActiveTab('like')">
        <like-icon />
      </div>
      <div
        class="review_tab"
        :class="{ active: activeTab === 'dislike' }"
        @click="setActiveTab('dislike')">
        <dislike-icon />
      </div>
    </div>
    <div class="reviews_list">
      <div
        v-for="review in filteredReviews"
        :key="review.id"
        class="review_item">
        <div class="review-header">
          <img :src="review.avatar" alt="avatar" class="avatar" />
          <div class="flex flex-col gap-12">
            <div class="flex items-center justify-between w-full">
              <div class="user-info">
                <div class="username">{{ review.username }}</div>
              </div>
              <div class="sentiment-icon">
                <img
                  :src="review.isPositive ? likeIconPath : dislikeIconPath"
                  :alt="review.isPositive ? 'like' : 'dislike'"
                  class="icon" />
              </div>
            </div>
            <div class="review-text">{{ review.text }}</div>
            <div class="flex gap-12">
              <div class="date">{{ review.date }}</div>
              <div class="reply-button" @click="toggleReply(review.id)">
                {{ $t("whitelist.profile.oracle.reviews.reply") }}
              </div>
            </div>

            <div v-if="review.replies?.length" class="replies-list">
              <div
                v-for="reply in review.replies"
                :key="reply.id"
                class="reply-item">
                <div class="flex items-start justify-start gap-8">
                  <img class="reply-item-ava" :src="review.avatar" alt="" />
                  <div class="flex flex-col gap-8 w-full">
                    <div class="flex items-center justify-between">
                      <span class="username">{{ reply.username }}</span>
                      <img
                        :src="
                          review.isPositive ? likeIconPath : dislikeIconPath
                        "
                        :alt="review.isPositive ? 'like' : 'dislike'"
                        class="icon" />
                    </div>
                    <div class="reply-meta">
                      <div class="review-text">{{ reply.text }}</div>
                      <span class="date">{{ reply.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeReply" class="reply-section">
      <TheInput
        class="w-full"
        :value="replyText"
        :placeholder="$t('whitelist.profile.oracle.reviews.reviewHere')"
        :is-remove="false"
        :autofocus="true"
        @update:value="replyText = $event"
        @keydown="handleReplyKeydown" />

      <div v-if="replyText" class="reply-actions flex items-center gap-12">
        <div
          v-if="activeReply"
          class="send-reply"
          @click="submitReply(activeReply)">
          <img src="/icons/oracle-profile/arrow-top.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DislikeIcon from "~/public/icons/mixing/dislikeIcon.vue";
import LikeIcon from "~/public/icons/mixing/likeIcon.vue";

import { reviews } from "~/entities/oracle-profile/data/profileReviews";
import type {
  IReply,
  IReview,
} from "~/entities/oracle-profile/model/oracle.profile.reviews.types";
import TheInput from "~/components/ui/TheInput.vue";

const activeTab = ref<string>("all");
const activeReply = ref<number | null>(null);
const replyText = ref<string>("");

const reviewsList = ref<IReview[]>(reviews);

const likeIconPath = "/icons/oracle-profile/like.svg";
const dislikeIconPath = "/icons/oracle-profile/dislike.svg";

const filteredReviews = computed<IReview[]>(() => {
  if (activeTab.value === "like") {
    return reviewsList.value.filter((r) => r.isPositive);
  } else if (activeTab.value === "dislike") {
    return reviewsList.value.filter((r) => !r.isPositive);
  }
  return reviewsList.value;
});

const setActiveTab = (tab: string): void => {
  activeTab.value = tab;
};

const toggleReply = (reviewId: number): void => {
  activeReply.value = activeReply.value === reviewId ? null : reviewId;
  replyText.value = "";
};

const submitReply = (reviewId: number): void => {
  const text = replyText.value.trim();
  if (!text) return;

  const review = reviewsList.value.find((r) => r.id === reviewId);
  if (review) {
    const newReply: IReply = {
      id: review.replies.length + 1,
      text,
      username: "current_user",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    review.replies.push(newReply);
  }

  activeReply.value = null;
  replyText.value = "";
};

const handleReplyKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && replyText.value.trim() && activeReply.value) {
    submitReply(activeReply.value);
  }
};

const cancelReply = (): void => {
  activeReply.value = null;
  replyText.value = "";
};
</script>

<style scoped>
.review_tabs {
  background: #121119;
  border-radius: 12px;
  padding: 4px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.review_tab {
  gap: 10px;
  border-radius: 8px;
  padding: 4px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  cursor: pointer;
  color: white;
  transition: all 0.3s linear;
}
.review_tab.active {
  background: #f64e2a;
}
.reviews_list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.review-header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
}
.review-header .avatar {
  width: 34px;
  height: auto;
}
.username {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #7a74ba;
}
.review-text {
  font-family: Roboto;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.date {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}
.reply-button {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  vertical-align: middle;
  color: white;
  cursor: pointer;
}
.reply-item-ava {
  width: 28px;
  height: auto;
}
.reply-item {
  margin-top: 8px;
}
.reply-section {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  gap: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 0 24px;
  border-top: 1px solid #2b2741;
}
.send-reply {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f64e2a;
  border-radius: 50%;
  cursor: pointer;
}
</style>
