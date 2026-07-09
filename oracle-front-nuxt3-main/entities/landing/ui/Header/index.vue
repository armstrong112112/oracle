<template>
  <div>
    <div class="landing_header flex items-center justify-between">
      <nuxt-link to="/" class="landing_header_logo flex items-center gap-12">
        <img src="/avatars/logo.svg" alt="" />
        <div class="landing_logo_text">Oracle</div>
      </nuxt-link>
      <div class="landing_header_button" @click="showGenerateModal">
        Join Whitelist
      </div>
    </div>
    <LandingFormDialog
      v-if="isModalVisible"
      :is-visible="isModalVisible"
      @close="closeModal"
      @confirm="processConfirmation" />
  </div>
</template>

<script setup lang="ts">
import LandingFormDialog from "@/entities/landing/ui/LandingFormDialog/index.vue";

const isModalVisible = ref(false);

function showGenerateModal(): void {
  isModalVisible.value = true;
}

function closeModal(): void {
  isModalVisible.value = false;
}

function processConfirmation(): void {
  closeModal();
}
</script>

<style lang="scss" scoped>
.landing_header {
  height: 97px;
  gap: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.landing_header_logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.landing_header_logo img {
  width: 42px;
  height: 42px;
}

.landing_logo_text {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 125%;
  letter-spacing: 3%;
  text-align: center;
  color: #ffffff;
}

.landing_header_button {
  width: 140px;
  height: 44px;
  border-radius: 14px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #f64e2a;
  background: white;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media (min-width: 768px) {
  .landing_header {
    padding: 0 38px;
    justify-content: space-between;
  }

  .landing_header_button {
    display: flex;
  }
}

@media (min-width: 1200px) {
  .landing_header {
    padding: 0 84px;
  }
}
</style>
