<template>
  <div class="chat-messages">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-messages__header">
        <nuxt-link
          :to="localePath('/chat-settings/privacy/')"
          class="chat-messages__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="chat-messages__header-title">
          {{ $t('chat.privacy.messages') }}
        </h1>
      </div>

      <!-- Visibility options block -->
      <div class="chat-messages__visibility">
        <h2 class="chat-messages__title">
          {{ $t('chat.privacy.whoCanSendMessages') }}
        </h2>

        <ul class="chat-messages__options">
          <li
            v-for="option in options"
            :key="option"
            class="chat-messages__option"
            :class="{
              'chat-messages__option--active': selectedOption === option,
            }"
            @click="selectedOption = option"
          >
            {{ option }}
            <span class="chat-messages__checkmark"><CheckmarkIcon /></span>
          </li>
        </ul>

        <p class="chat-messages__description">
          {{ $t('chat.privacy.messagesDescription') }}
        </p>
      </div>
      <div class="premium-wrapper">
        <nuxt-link
          :to="localePath('/chat-settings/premium-info')"
          class="link--highlighted"
        >
          {{ $t('chat.privacy.whatIsPremium') }}
        </nuxt-link>
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

const options = ['Everybody', 'My contacts and Premium Users']
</script>

<style lang="scss">
.chat-messages {
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
    .chat-messages__checkmark {
      background: #f64e2a;
      border-color: #f64e2a;
      svg {
        opacity: 1;
      }
    }
  }
  .premium-wrapper {
    .link--highlighted {
      height: 44px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      background: #14131b;
      border-radius: 12px;
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #f64e2a;
      transition: 0.2s;
      &:hover {
        background: #2b2741;
      }
    }
  }
}
</style>
