<template>
  <div class="change-password">
    <block-nav-back
      :text="$t('moreSettings.passwordChange')"
      :to="localePath('/moresettings/account')"
    />
    <div class="change-password-input__group">
      <input-oracle
        type="password"
        :placeholder="$t('moreSettings.currentPassword')"
      />
      <input-oracle
        type="password"
        :placeholder="$t('moreSettings.newPassword')"
      />
      <input-oracle
        type="password"
        :placeholder="$t('moreSettings.confirmNewPassword')"
      />
    </div>
    <div class="change-password__buttons">
      <button-oracle
        :text="$t('moreSettings.confirm')"
        color="orange"
        :to="localePath('/moresettings/account')"
      />
      <button-oracle
        :text="$t('moreSettings.cancel')"
        :to="localePath('/moresettings/account')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

definePageMeta({
  layout: 'mobile',
})
</script>

<style lang="scss">
.change-password {
  max-width: 375px;
  .input {
    input {
      height: 56px;
    }
  }
  &-input__group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 35px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    button {
      height: 48px;
      span {
        font-size: 16px;
      }
    }
    .black {
      border-color: #e70303;
    }
  }
}
</style>
