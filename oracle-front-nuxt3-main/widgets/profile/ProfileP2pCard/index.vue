<template>
  <div class="profile_p2p_card">
    <div class="flex flex-col gap-12">
      <div class="profile_p2p_card_title">4</div>
      <div class="profile_p2p_card_description">30d Trades</div>
    </div>
    <div class="flex flex-col gap-12">
      <div class="profile_p2p_card_title">100.00%</div>
      <div class="profile_p2p_card_description">30d Completion Rate</div>
    </div>
    <div class="flex flex-col gap-12">
      <div class="profile_p2p_card_title">3 min</div>
      <div class="profile_p2p_card_description">Avg. Release Time</div>
    </div>
    <div class="flex flex-col gap-12">
      <div class="profile_p2p_card_title">90</div>
      <div class="profile_p2p_card_description">All Trades</div>
    </div>
  </div>
</template>
<script setup lang="ts">
// This component doesn't require any props or logic
</script>
<style>
.profile_p2p_card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  width: 100%;
}
.profile_p2p_card_title {
  font-family: Roboto;
  font-weight: 400;
  font-style: Regular;
  font-size: 18px;
  line-height: 145%;
  letter-spacing: 0%;
  color: white;
}

.profile_p2p_card_description {
  font-family: Roboto;
  font-weight: 400;
  font-style: Regular;
  font-size: 12px;
  line-height: 145%;
  color: #8780cf;
  letter-spacing: 0%;
}
</style>
