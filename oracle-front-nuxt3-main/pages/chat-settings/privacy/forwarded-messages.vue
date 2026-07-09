<template>
  <div class="forwarded-messages">
    <div class="main-container">
      <!-- Header -->
      <div class="forwarded-messages__header">
        <nuxt-link
          :to="localePath('/chat-settings/privacy/')"
          class="forwarded-messages__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="forwarded-messages__header-title">
          {{ $t('chat.privacy.forwardedMessages') }}
        </h1>
      </div>

      <!-- Visibility options block -->
      <div class="forwarded-messages__visibility">
        <h2 class="forwarded-messages__title">
          {{ $t('chat.privacy.whoCanAddLinkWhenForwarding') }}
        </h2>

        <ul class="forwarded-messages__options">
          <li
            v-for="option in options"
            :key="option"
            class="forwarded-messages__option"
            :class="{
              'forwarded-messages__option--active': selectedOption === option,
            }"
            @click="selectedOption = option"
          >
            {{ option }}
            <span class="forwarded-messages__checkmark"><CheckmarkIcon /></span>
          </li>
        </ul>

        <p class="forwarded-messages__description">
          {{ $t('chat.privacy.forwardedMessagesDescription') }}
        </p>
      </div>

      <!-- Exceptions block -->
      <div class="forwarded-messages__exceptions">
        <h3 class="forwarded-messages__title">
          {{ $t('chat.privacy.exceptions') }}
        </h3>

        <div class="forwarded-messages__exceptions-list">
          <nuxt-link
            to="/chat-settings/privacy/add-users"
            class="forwarded-messages__exceptions-item"
          >
            <span class="forwarded-messages__exceptions-label">{{
              $t('chat.privacy.neverShareWith')
            }}</span>
            <button class="forwarded-messages__exceptions-action">
              {{ $t('chat.privacy.addUsers') }}
              <span class="forwarded-messages__exceptions-arrow">
                <ArrowIcon />
              </span>
            </button>
          </nuxt-link>
          <nuxt-link
            :to="localePath('/chat-settings/privacy/add-users')"
            class="forwarded-messages__exceptions-item"
          >
            <span class="forwarded-messages__exceptions-label">{{
              $t('chat.privacy.alwaysShareWith')
            }}</span>
            <button class="forwarded-messages__exceptions-action">
              {{ $t('chat.privacy.addUsers') }}
              <span class="forwarded-messages__exceptions-arrow">
                <ArrowIcon />
              </span>
            </button>
          </nuxt-link>
        </div>

        <p class="forwarded-messages__description">
          {{ $t('chat.privacy.exceptionsDescription') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from '@/assets/svg/arrow-back.svg?component'
import CheckmarkIcon from '@/assets/svg/check-icon.svg?component'
import ArrowIcon from '@/assets/svg/shape-icon.svg?component'

// Use localePath if needed
const localePath = useLocalePath()

// Reactive state
const selectedOption = ref<string>('Everybody')

const options = ['Everybody', 'My contacts', 'Nobody']
</script>

<style lang="scss">
.forwarded-messages {
  padding-bottom: 32px;
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
  &__title {
    padding: 0 8px 8px 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7873b4;
  }
  &__visibility {
    margin-bottom: 24px;
  }
  &__options {
    border-radius: 12px;
    background: var(--secondary-1);
    margin-bottom: 8px;
  }
  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 16px;
    min-height: 44px;
    position: relative;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    &:last-child {
      &::after {
        display: none;
      }
    }
    &::after {
      content: '';
      width: calc(100% - 12px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &__checkmark {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #60578e;
    border-radius: 50%;
    svg {
      opacity: 0;
    }
  }
  &__option--active {
    .forwarded-messages__checkmark {
      background: #f64e2a;
      border-color: #f64e2a;
      svg {
        opacity: 1;
      }
    }
  }
  &__exceptions {
    &-list {
      margin-bottom: 8px;
      border-radius: 12px;
      overflow: hidden;
    }
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      gap: 8px;
      background: #14131b;
      padding: 0 16px;
      transition: 0.2s;
      position: relative;
      &:hover {
        background: #2b2741;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &::after {
        content: '';
        width: calc(100% - 16px);
        height: 0;
        border-bottom: 1px solid #2b2741;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    &-label {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-action {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #8780cf;
    }
  }
}
</style>
