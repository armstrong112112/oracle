<template>
  <div class="notification-settings">
    <div class="main-container">
      <!-- Header -->
      <div class="notification-settings__header">
        <nuxt-link
          :to="localePath('/chat-settings')"
          class="notification-settings__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="notification-settings__header-title">
          {{ $t('chat.notifications.title') }}
        </h1>
      </div>

      <!-- Message Notifications -->
      <div class="notification-settings__message-section">
        <h3 class="notification-settings__section-title">
          {{ $t('chat.notifications.messages') }}
        </h3>

        <ul class="notification-settings__message-list">
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/privacy')"
              class="notification-settings__message-item"
            >
              <div class="notification-settings__message-left">
                <span
                  class="notification-settings__message-icon notification-settings__message-icon--private"
                >
                  <PrivateIcon />
                </span>
                <div class="notification-settings__message-text">
                  <span class="notification-settings__message-title">{{
                    $t('chat.notifications.privateChats')
                  }}</span>
                  <span class="notification-settings__message-subtext">{{
                    $t('chat.notifications.exceptionsCount', { count: 2 })
                  }}</span>
                </div>
              </div>
              <div class="notification-settings__message-right">
                <span class="notification-settings__message-status">{{
                  $t('chat.notifications.off')
                }}</span>
                <span class="notification-settings__message-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/notifications/groups')"
              class="notification-settings__message-item"
            >
              <div class="notification-settings__message-left">
                <span
                  class="notification-settings__message-icon notification-settings__message-icon--group"
                >
                  <ChatsGroupIcon />
                </span>
                <div class="notification-settings__message-text">
                  <span class="notification-settings__message-title">{{
                    $t('chat.notifications.groupChats')
                  }}</span>
                  <span class="notification-settings__message-subtext">{{
                    $t('chat.notifications.exceptionsCount', { count: 376 })
                  }}</span>
                </div>
              </div>
              <div class="notification-settings__message-right">
                <span class="notification-settings__message-status">On</span>
                <span class="notification-settings__message-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="localePath('/chat-settings/notifications/channels')"
              class="notification-settings__message-item"
            >
              <div class="notification-settings__message-left">
                <span
                  class="notification-settings__message-icon notification-settings__message-icon--channel"
                >
                  <ChannelsIcon />
                </span>
                <div class="notification-settings__message-text">
                  <span class="notification-settings__message-title">{{
                    $t('chat.notifications.channels')
                  }}</span>
                  <span class="notification-settings__message-subtext">{{
                    $t('chat.notifications.exceptionsCount', { count: 7 })
                  }}</span>
                </div>
              </div>
              <div class="notification-settings__message-right">
                <span class="notification-settings__message-status">{{
                  $t('chat.notifications.on')
                }}</span>
                <span class="notification-settings__message-arrow"></span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- In-App Notifications -->
      <div class="notification-settings__in-app-section">
        <h3 class="notification-settings__section-title">
          {{ $t('chat.notifications.inApp') }}
        </h3>

        <ul class="notification-settings__in-app-list">
          <li class="notification-settings__in-app-item">
            <span class="notification-settings__in-app-label">{{
              $t('chat.notifications.inAppSounds')
            }}</span>
            <label class="notification-settings__toggle">
              <input
                type="checkbox"
                class="notification-settings__toggle-input"
              />
              <span class="notification-settings__toggle-slider"></span>
            </label>
          </li>
          <li class="notification-settings__in-app-item">
            <span class="notification-settings__in-app-label">{{
              $t('chat.notifications.inAppVibrate')
            }}</span>
            <label class="notification-settings__toggle">
              <input
                type="checkbox"
                class="notification-settings__toggle-input"
              />
              <span class="notification-settings__toggle-slider"></span>
            </label>
          </li>
          <li class="notification-settings__in-app-item">
            <span class="notification-settings__in-app-label">{{
              $t('chat.notifications.inAppPreview')
            }}</span>
            <label class="notification-settings__toggle">
              <input
                type="checkbox"
                class="notification-settings__toggle-input"
              />
              <span class="notification-settings__toggle-slider"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from '@/assets/svg/arrow-back.svg?component'
import PrivateIcon from '@/assets/svg/privacy-icon.svg?component'
import ChatsGroupIcon from '@/assets/svg/groups.svg?component'
import ChannelsIcon from '@/assets/svg/channels.svg?component'

// Use localePath if needed
const localePath = useLocalePath()
</script>

<style lang="scss">
.notification-settings {
  &__header {
    display: flex;
    align-items: center;
    padding: 10px 0;
    position: relative;
    margin-bottom: 24px;

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
    padding: 0 8px 8px 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #fff;
  }
  &__message-section {
    margin-bottom: 24px;
  }
  &__message-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    gap: 8px;
    padding: 5px 0;
    position: relative;
    &::after {
      content: '';
      width: calc(100% - 30px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: -12px;
    }
  }
  &__message-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__message-icon {
    svg {
      width: 30px;
      height: 30px;
      min-width: 30px;
      min-height: 30px;
    }
  }
  &__message-text {
    width: 100%;
  }
  &__message-title {
    display: block;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #bfb7ff;
  }
  &__message-subtext {
    display: block;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__message-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__message-status {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #8780cf;
  }
  &__message-arrow {
    width: 7px;
    height: 13px;
    background: url('@/assets/svg/shape-icon.svg') no-repeat center/contain;
  }
  &__in-app-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 44px;
    position: relative;
    &::after {
      content: '';
      width: calc(100% + 12px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: -12px;
    }
  }
  &__in-app-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__toggle {
    &-input {
      display: none;
    }
    &-slider {
      display: block;
      width: 51px;
      height: 31px;
      background: rgba(120, 120, 128, 0.16);
      border-radius: 100px;
      cursor: pointer;
      transition: 0.2s;
      &::after {
        content: '';
        display: inline-block;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        box-shadow:
          0 3px 1px 0 rgba(0, 0, 0, 0.06),
          0 3px 8px 0 rgba(0, 0, 0, 0.15),
          0 0 0 1px rgba(0, 0, 0, 0.04);
        background: #fff;
        margin-left: 2px;
        margin-top: 2px;
        line-height: 0;
        transition: 0.2s;
      }
    }
    &-input:checked + .notification-settings__toggle-slider {
      background: #f64e2a;
    }
    &-input:checked ~ .notification-settings__toggle-slider::after {
      margin-left: 22px;
    }
  }
}
</style>
