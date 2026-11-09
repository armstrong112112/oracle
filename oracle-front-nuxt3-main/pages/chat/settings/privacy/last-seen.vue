<template>
  <div class="last-seen">
    <div class="main-container">
      <div class="last-seen__header">
        <nuxt-link
          :to="localePath(ChatRoute.Privacy)"
          class="last-seen__header-back"
          :aria-label="$t('chat.card.back')"
        >
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </nuxt-link>
        <h1 class="last-seen__header-title">{{ $t('chat.privacy.title') }}</h1>
      </div>

      <div class="last-seen__visibility">
        <h2 class="last-seen__title">
          {{ $t('chat.privacy.whoCanSeeLastSeen') }}
        </h2>

        <ul class="last-seen__options">
          <li
            v-for="option in options"
            :key="option"
            class="last-seen__option"
            :class="{ 'last-seen__option--active': selectedOption === option }"
            @click="selectedOption = option"
          >
            {{ $t(option) }}
            <span class="last-seen__checkmark"><CheckmarkIcon /></span>
          </li>
        </ul>

        <p class="last-seen__description">
          {{ $t('chat.privacy.lastSeenDescription') }}
        </p>
      </div>

      <div class="last-seen__exceptions">
        <h3 class="last-seen__title">{{ $t('chat.privacy.exceptions') }}</h3>

        <nuxt-link
          :to="localePath(ChatRoute.PrivacyAddUsers)"
          class="last-seen__exceptions-item"
        >
          <span class="last-seen__exceptions-label">{{
            $t('chat.privacy.neverShareWith')
          }}</span>
          <span class="last-seen__exceptions-action">
            {{ $t('chat.privacy.addUsers') }}
            <span class="last-seen__exceptions-arrow">
              <ArrowIcon />
            </span>
          </span>
        </nuxt-link>

        <p class="last-seen__description">
          {{ $t('chat.privacy.exceptionsDescription') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatRoute } from "~/entities/chat/config";
import CheckmarkIcon from '@/assets/svg/check-icon.svg?component'
import ArrowIcon from '@/assets/svg/shape-icon.svg?component'

const localePath = useLocalePath()

const options = ['chat.privacy.everybody', 'chat.privacy.myContacts', 'chat.privacy.nobody'] as const

const selectedOption = ref<(typeof options)[number]>(options[0])
</script>

<style lang="scss">
.last-seen {
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
      display: flex;
      transform: rotate(180deg);
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
    background: #14131b;
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
    .last-seen__checkmark {
      background: #f64e2a;
      border-color: #f64e2a;
      svg {
        opacity: 1;
      }
    }
  }
  &__exceptions {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      gap: 8px;
      margin-bottom: 8px;
      background: #14131b;
      border-radius: 12px;
      padding: 0 16px;
      transition: 0.2s;
      &:hover {
        background: #2b2741;
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
