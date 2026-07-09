<template>
  <div class="profile_deposit_card">
    <div class="profile_deposit_card_header">
      <div
        class="flex flex-col gap-8 cursor-pointer"
        @click="$emit('clickTrial')">
        <div class="trial_card_header">
          <div class="trial_badge">{{ $t("whitelist.profile.trial") }}</div>
          <div class="trial_card_text">
            {{ $t("whitelist.profile.verified") }}
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="trial_card_text">
            {{ $t("whitelist.profile.escrowMandatory") }}
          </div>
          <div class="trial_card_description">
            {{ $t("whitelist.profile.until", { date: "May 2026" }) }}
          </div>
        </div>
      </div>
      <img
        src="/icons/profile/right.svg"
        alt=""
        class="cursor-pointer"
        @click.stop="$emit('clickArrow')" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "clickTrial"): void;
  (e: "clickArrow"): void;
}>();
</script>

<style scoped>
.profile_deposit_card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px;
  background: #13121b;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: #2b2741;
}

.profile_deposit_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trial_card_header {
  border-radius: 12px;
  padding: 4px;
  border: 1px solid #2b2741;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
}

.profile_deposit_card_plus img {
  width: 18px;
  height: 18px;
}

.trial_badge {
  background: #5b4913;
  gap: 10px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 8px;
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
.trial_card_text {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
.trial_card_description {
  color: #7a74ba;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
}
</style>
