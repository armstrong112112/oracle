<template>
  <div class="auth-email-address">
    <block-nav-back
      :text="$t('moreSettings.emailAddressAuthorization')"
      :to="localePath('/moresettings/account')"
    />
    <input-oracle type="email" :placeholder="$t('moreSettings.emailAddress')" />
    <button-oracle :text="$t('moreSettings.confirmEmail')" color="orange" />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

definePageMeta({
  layout: 'mobile',
})
</script>

<style lang="scss">
.auth-email-address {
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
  }
  button {
    height: 48px;
    span {
      font-size: 16px;
    }
  }
}
</style>
