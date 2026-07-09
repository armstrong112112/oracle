<template>
  <div class="profile_review_card">
    <div class="profile_deposit_card_header">
      <div class="flex items-center gap-8">
        <div class="profile_card_title">
          {{ $t("whitelist.profile.reviewCard.title") }}
        </div>
        <div class="dot"></div>
        <div class="profile_card_total">
          {{ $t("whitelist.profile.reviewCard.total", { count: 105 }) }}
        </div>
      </div>
      <div class="rating">
        4.5/5
        <img src="/icons/profile/star.svg" alt="star" class="star_icon" />
      </div>
    </div>
    <div class="review_cards">
      <div class="review_card">
        <img src="/icons/profile/escrow.svg" alt="" />
        <span>{{ $t("whitelist.profile.reviewCard.escrow") }}</span>
      </div>
      <div class="review_card">
        <img src="/icons/profile/p2p.svg" alt="" />
        <span>{{ $t("whitelist.profile.reviewCard.p2p") }}</span>
      </div>
      <div class="review_card">
        <img src="/icons/profile/stores.svg" alt="" />
        <span>{{ $t("whitelist.profile.reviewCard.stores") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component is already using composition API structure
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
  color: white;
  opacity: 0.5;
}
.review_cards {
  display: flex;
  align-items: center;
  gap: 8px;
}
.review_card {
  gap: 10px;
  padding: 6px 12px 6px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
  background: #1e1d28;
  width: 100%;
}
</style>
