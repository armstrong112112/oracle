<template>
  <div class="insert-pin-code">
    <div class="logo">
      <LogoIcon />
      Oracle
    </div>
    <nuxt-link :to="localePath('/moresettings/account/')" class="close-button">
      <circleCloseIcon />
    </nuxt-link>
    <form class="insert-pin-code-form">
      <block-title-oracle :text="$t('moreSettings.insertYourPinCode')" />
      <p class="block-description">
        {{ $t('moreSettings.weNeedToVerifyIdentity') }}
      </p>
      <input-oracle type="password" placeholder="0" :ispin="true" />
      <nuxt-link to="#" class="pin-text">{{
        $t('moreSettings.dontRememberPinCode')
      }}</nuxt-link>
      <nuxt-link to="#" class="logout-btn">{{
        $t('moreSettings.logOut')
      }}</nuxt-link>
      <div class="form-button">
        <button-oracle :text="$t('moreSettings.continue')" color="orange" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import LogoIcon from '@/assets/svg/logo.svg?component'
import circleCloseIcon from '@/assets/svg/close-circle.svg?component'

const localePath = useLocalePath()
</script>

<style lang="scss">
.insert-pin-code {
  max-width: 375px;
  margin: 0 auto;
  padding: 40px 12px 50px;
  position: relative;
  min-height: 100vh;
  &::before {
    content: '';
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background: #f64e2a;
    filter: blur(125px);
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    svg {
      height: 80px;
      margin-bottom: 24px;
    }
  }
  .close-button {
    position: absolute;
    top: 40px;
    right: 12px;
    img {
      height: 35px;
    }
  }
  &-form {
    .block-title-oracle {
      display: block;
      margin-bottom: 8px;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 20px;
      letter-spacing: normal;
      text-transform: uppercase;
      text-align: center;
      color: #fff;
    }
    .block-description {
      margin-bottom: 42px;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
    }
    .input-group {
      margin-bottom: 24px;
    }
    .input-eye {
      display: none;
    }
    .pin-text,
    .logout-btn {
      display: block;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      line-height: 17px;
      color: #f64e2a;
      margin: 10px;
    }
    .form-button {
      display: flex;
      flex-direction: column;
      justify-content: end;
      margin-top: 25px;
      min-height: calc(100vh - 509px);
      button {
        height: 48px;
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
