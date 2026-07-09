<template>
  <div>
    <div class="profile_review_card">
      <div class="flex flex-col gap-4">
        <div class="profile_deposit_card_header">
          <div class="flex items-center gap-8">
            <div class="profile_card_title">
              {{ $t("whitelist.profile.p2pListing.choose") }}
            </div>
          </div>
          <div class="rating">
            <img src="/icons/profile/plus.svg" alt="star" class="star_icon" />
          </div>
        </div>
        <div class="listing_text">
          {{ $t("whitelist.profile.p2pListing.select") }}
        </div>
      </div>
    </div>
    <ProfileP2PListingSlider />
  </div>
</template>

<script setup lang="ts">
import ProfileP2PListingSlider from "~/entities/verification/ui/profile/ProfileP2PListing/ProfileP2PListingSlider.vue";
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
.listing_text {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}
</style>
