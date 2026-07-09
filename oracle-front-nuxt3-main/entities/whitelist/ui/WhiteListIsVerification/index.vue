<template>
  <div class="flex items-center gap-12 py-16">
    <nuxt-link
      :to="localePath('/whitelist/verification')"
      class="whitelist_is_verification_card">
      <img src="/icons/whitelist/verified.svg" alt="" />
      <div class="whitelist_is_verification_card_title">
        {{ $t("whitelist.verification.becomeVerified") }}
      </div>
    </nuxt-link>
    <nuxt-link
      class="whitelist_is_verification_card"
      :to="localePath('/whitelist/creation')">
      <img src="/icons/whitelist/plus.svg" alt="" />
      <div class="whitelist_is_verification_card_title">
        {{ $t("whitelist.verification.postAtOracleMarket") }}
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
</script>
<style lang="scss">
.whitelist_is_verification_card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #2b2741;
  background: #181720;
  cursor: pointer;
  flex-direction: column;
  gap: 10px;
  padding: 12px 18px;
  width: 100%;
}
.whitelist_is_verification_card_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: white;
  white-space: nowrap;
}
</style>
