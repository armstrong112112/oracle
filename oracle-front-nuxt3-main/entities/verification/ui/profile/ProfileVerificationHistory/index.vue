<template>
  <div class="profile_review_card">
    <div class="profile_deposit_card_header">
      <div class="flex items-center gap-8">
        <div class="profile_card_title">
          {{ $t('whitelist.profile.verificationHistory.title') }}
        </div>
      </div>
    </div>
    <div class="profile_verification_history">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
        <div class="timeline-content">
          <div class="timeline-subtitle">
            {{ $t('whitelist.profile.verificationHistory.memberSince') }}
          </div>
          <div class="timeline-date">May 20, 2023</div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
        <div class="timeline-content">
          <div class="timeline-subtitle">
            {{ $t('whitelist.profile.verificationHistory.verifiedSince') }}
          </div>
          <div class="timeline-date">May 20, 2024</div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
        <div class="timeline-content">
          <div class="timeline-subtitle">
            {{ $t('whitelist.profile.verificationHistory.verifiedUntil') }}
          </div>
          <div class="timeline-date">May 20, 2026</div>
        </div>
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
  padding: 0 12px;
  background-color: #000000;
}

.profile_deposit_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile_card_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: #ffffff;
}

.profile_verification_history {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-item {
  display: flex;
  position: relative;
}

.timeline-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #60578e;
  flex-shrink: 0;
  margin-top: 12px;
}

.timeline-line {
  position: absolute;
  top: 32px;
  left: 2px;
  width: 1px;
  height: 25px;
  background-color: #60578e;
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-content {
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeline-subtitle {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}

.timeline-date {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #b2aaf9;
}
</style>
