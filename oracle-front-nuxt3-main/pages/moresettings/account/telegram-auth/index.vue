<template>
  <div class="auth-link-address">
    <block-nav-back
      :text="$t('moreSettings.telegramAuthorization')"
      :to="localePath('/moresettings/account')"
    />
    <input-oracle
      type="text"
      :placeholder="$t('moreSettings.telegramLink')"
      :label="$t('moreSettings.beCarefulTelegramAccess')"
    />
    <button-oracle :text="$t('moreSettings.confirmTelegram')" color="orange" />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

definePageMeta({
  layout: 'mobile',
})
</script>

<style lang="scss">
.auth-link-address {
  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
    .label {
      order: 2;
      margin-bottom: 0;
      font-size: 10px;
      line-height: 7px;
    }
    .input-group {
      order: 1;
      margin-bottom: 12px;
    }
  }
  button {
    height: 48px;
    span {
      font-size: 16px;
    }
  }
}
</style>
