<template>
  <div class="profile_review_card">
    <div class="profile_deposit_card_header">
      <NuxtLink
        :to="localePath('/oracle/reviews')"
        class="header-content flex items-center gap-8">
        <div class="profile_card_title">
          {{ $t("whitelist.profile.oracle.reviews.title") }}
        </div>
        <div class="dot"></div>
        <div class="profile_card_total">
          {{ $t("whitelist.profile.oracle.reviews.total", { count: 105 }) }}
        </div>
      </NuxtLink>
      <div class="rating">
        <div class="like">
          <span>90%</span>
          <img src="/icons/oracle-profile/like.svg" alt="like" />
        </div>
        <div class="rating_dot"></div>
        <div class="dis_like">
          <span>10%</span>
          <img src="/icons/oracle-profile/dislike.svg" alt="dislike" />
        </div>
      </div>
    </div>
    <div
      v-if="isNoData"
      class="profile_review_card_no flex flex-col justify-center items-center">
      <div class="flex flex-col gap-4 justify-center">
        <div class="profile_review_card_no_title">
          {{ $t("whitelist.profile.oracle.reviews.title") }}
        </div>
        <div class="profile_review_card_no_description">
          {{ $t("whitelist.profile.oracle.reviews.noReviews") }}
        </div>
      </div>
    </div>
    <div v-if="!isNoData" class="review_cards">
      <div
        class="review_card"
        :class="{ active: activeCard === 'exchanges' }"
        @click="setActiveCard('exchanges')">
        <img src="/icons/profile/escrow.svg" alt="exchanges" />
        <span>{{ $t("whitelist.profile.oracle.reviews.exchanges") }}</span>
      </div>
      <div
        class="review_card"
        :class="{ active: activeCard === 'p2p' }"
        @click="setActiveCard('p2p')">
        <img src="/icons/profile/p2p.svg" alt="p2p" />
        <span>{{ $t("whitelist.profile.oracle.reviews.p2p") }}</span>
      </div>
      <div
        class="review_card"
        :class="{ active: activeCard === 'shops' }"
        @click="setActiveCard('shops')">
        <img src="/icons/profile/stores.svg" alt="shops" />
        <span>{{ $t("whitelist.profile.oracle.reviews.shops") }}</span>
      </div>
    </div>
    <OracleReviewsList v-if="!props.isNoData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import OracleReviewsList from "~/widgets/oracle/profile/OracleReviewsList/index.vue";

interface Props {
  isNoData?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isNoData: false,
});

const localePath = useLocalePath();

const activeCard = ref<string>("exchanges");

const setActiveCard = (card: string): void => {
  activeCard.value = card;
};
</script>

<style scoped>
.profile_review_card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px;
}

.profile_deposit_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.profile_card_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: #ffffff;
}
.dot {
  width: 3px;
  height: 3px;
  background: #ffffff;
}
.profile_card_total {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #7a74ba;
}
.review_cards {
  display: flex;
  align-items: center;
  gap: 8px;
}
.review_card {
  gap: 10px;
  padding: 6px 12px 12px 8px;
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
  width: 100%;
  border-bottom: 1px solid transparent;
  transition: all 0.3s linear;
  cursor: pointer;
}
.review_card.active {
  border-bottom: 1px solid #f64e2a;
}
.rating {
  display: flex;
  gap: 8px;
}
.rating .like {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #31f62a;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
}
.rating .rating_dot {
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background: #443d69;
}
.rating .dis_like {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #f64e2a;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
}

.profile_review_card_no {
  padding-top: 24px;
  padding-bottom: 24px;
  gap: 24px;
  border-radius: 12px;
  border: 1px solid #2b2741;
  cursor: pointer;
  height: 120px;
}
.profile_review_card_no_title {
  font-family: Roboto;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
  text-align: center;
}
.profile_review_card_no_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #b2aaf9;
}
.m-auto {
  margin: 0 auto;
}
</style>
