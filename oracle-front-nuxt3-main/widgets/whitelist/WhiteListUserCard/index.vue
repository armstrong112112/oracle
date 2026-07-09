<template>
  <div class="white_list_user_card flex justify-between">
    <div class="white_list_user_card_profile flex gap-12 items-start">
      <img src="/avatars/user.svg" alt="User" class="user_avatar" />
      <div class="flex flex-col gap-8">
        <div class="flex flex-col">
          <div class="white_list_user_card_profile_title">
            {{ $t("whitelist.userCard.name") }}
          </div>
          <div class="white_list_user_card_profile_description">
            {{
              $t("whitelist.userCard.verifiedSince", { date: "December 2020" })
            }}
          </div>
        </div>
        <div class="white_list_user_card_profile_price">
          {{ $t("whitelist.userCard.deposit", { amount: "$1000" }) }}
        </div>
        <div class="white_list_user_card_profile_skills flex flex-wrap gap-4">
          <div class="white_list_user_card_profile_skill">
            {{ $t("whitelist.userCard.skills.uiux") }}
          </div>
          <div class="white_list_user_card_profile_skill">
            {{ $t("whitelist.userCard.skills.graphic") }}
          </div>
        </div>
      </div>
    </div>
    <div class="white_list_user_card_rating flex flex-col justify-between">
      <div class="white_list_user_card_rating_header">
        <div class="white_list_user_card_rating_header_title">
          4.5
          <img src="/icons/profile/star.svg" alt="star" class="star_icon" />
        </div>
      </div>
      <div class="white_list_user_card_rating_footer">
        <div class="user_trial_badge">{{ $t("whitelist.userCard.trial") }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Component is presentational only - no state management needed
</script>
<style lang="scss">
.white_list_user_card {
  justify-content: space-between;
  padding: 12px 12px 16px;
  border-bottom: 1px solid #2b2741;
}

.white_list_user_card_profile_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.white_list_user_card_profile_description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #7a74ba;
}
.white_list_user_card_profile_price {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.white_list_user_card_profile_skill {
  gap: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  background: #1e1d28;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
  display: flex;
  justify-content: center;
}
.white_list_user_card_rating_header_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.user_trial_badge {
  gap: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid #2b2741;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #f6c32a;
}
.user_avatar {
  width: 38px;
  height: 38px;
  object-fit: cover;
}
</style>
