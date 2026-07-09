<template>
  <div class="privacy-settings">
    <div class="main-container">
      <!-- Header -->
      <div class="privacy-settings__header">
        <nuxt-link
          :to="localePath('/chat-settings')"
          class="privacy-settings__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="privacy-settings__header-title">
          {{ $t('chat.privacy.title') }}
        </h1>
      </div>

      <!-- Pin code-->
      <div class="privacy-settings__account-security">
        <ul class="privacy-settings__account-security-list">
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/privacy/blocked-users')"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <span
                  class="privacy-settings__account-security-icon privacy-settings__account-security-icon--private"
                >
                  <BlockedUsersIcon />
                </span>
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title">{{
                    $t('chat.privacy.blockedUsers')
                  }}</span>
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >1912</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/privacy/pin-code')"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <span
                  class="privacy-settings__account-security-icon privacy-settings__account-security-icon--group"
                >
                  <PinCodeIcon />
                </span>
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title">{{
                    $t('chat.privacy.pinCode')
                  }}</span>
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status">{{
                  $t('chat.notifications.on')
                }}</span>
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- privacys -->
      <div class="privacy-settings__account-security">
        <h3 class="privacy-settings__section-title">
          {{ $t('chat.privacy.title') }}
        </h3>
        <ul class="privacy-settings__account-security-list">
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/privacy/last-seen')"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title">{{
                    $t('chat.privacy.lastSeen')
                  }}</span>
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status">{{
                  $t('chat.privacy.myContacts')
                }}</span>
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/privacy/bio')"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title"
                    >Bio</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >{{ $t('chat.privacy.nobody') }} (+14)</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/privacy/forwarded-messages')"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title">{{
                    $t('chat.privacy.forwardedMessages')
                  }}</span>
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status">{{
                  $t('chat.privacy.everyone')
                }}</span>
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/privacy/messages')"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title">
                    {{ $t('chat.privacy.messages') }}</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >{{ $t('chat.privacy.nobody') }} (+7)</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from '@/assets/svg/arrow-back.svg?component'
import BlockedUsersIcon from '@/assets/svg/blocked-users.svg?component'
import PinCodeIcon from '@/assets/svg/pin-code.svg?component'

// Use localePath if needed
const localePath = useLocalePath()
</script>

<style lang="scss">
.privacy-settings {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    gap: 4px;
    margin-bottom: 24px;
    position: relative;
    &-back {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    &-title {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      text-align: center;
      color: #fff;
    }
  }
  &__section-title {
    padding: 0 0 8px 4px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.02em;
    color: var(--primary-3);
  }
  &__account-security {
    margin-bottom: 32px;
  }
  &__account-security-list,
  &__in-app-list {
    display: flex;
    flex-direction: column;
    background: #14131b;
    border-radius: 12px;
    overflow: hidden;
    li {
      &:last-child {
        .privacy-settings__account-security--item {
          &::after {
            display: none;
          }
        }
      }
    }
  }
  &__account-security--item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    gap: 8px;
    padding: 0 16px;
    transition: 0.2s;
    position: relative;

    &::after {
      content: '';
      width: calc(100% - 16px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    &:hover {
      background: #2b2741;
    }
  }
  &__account-security-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__account-security-icon {
    svg {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
    }
  }
  &__account-security-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__account-security-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__account-security-status {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #8780cf;
  }
  &__account-security-arrow {
    width: 7px;
    height: 13px;
    background: url('@/assets/svg/shape-icon.svg') no-repeat center/contain;
  }
  &__in-app-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 10px 12px 10px 14px;
  }
  &__in-app-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
  &__toggle {
    &-input {
      display: none;
    }
    &-slider {
      display: block;
      width: 40px;
      height: 25px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 41px;
      cursor: pointer;
      transition: 0.2s;
      &::after {
        content: '';
        display: inline-block;
        padding: 10.5px;
        border-radius: 50%;
        background: var(--primary-3);
        margin-left: 2px;
        margin-top: 2px;
        line-height: 0;
        transition: 0.2s;
      }
    }
    &-input:checked + .privacy-settings__toggle-slider {
      background-color: #00c853;
    }
    &-input:checked ~ .privacy-settings__toggle-slider::after {
      background: white;
      margin-left: 17px;
    }
  }
}
</style>
