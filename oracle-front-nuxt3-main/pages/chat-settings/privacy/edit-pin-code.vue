<template>
  <div class="chat-pin__code">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-pin__code-header">
        <nuxt-link
          :to="localePath('/chat-settings/privacy')"
          class="chat-pin__code-header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="chat-pin__code-header-title">
          {{ $t('chat.privacy.pinCode') }}
        </h1>
      </div>

      <div class="pin-step--enter">
        <div v-if="step === 1" class="pin-step">
          <div v-if="alphaNumeric" class="chat-pin__code-enter--dots">
            <p class="chat-pin__code-enter--title">
              {{ $t('chat.privacy.enterNewPinCode') }}
            </p>
            <input-oracle :ispin="true" />
          </div>
          <div v-if="!alphaNumeric" class="form-control">
            <input-oracle type="password" placeholder="Pin Code" />
          </div>
        </div>
        <div v-else class="pin-step">
          <div v-if="alphaNumeric" class="chat-pin__code-enter--dots">
            <p class="chat-pin__code-enter--title">
              {{ $t('chat.privacy.reEnterNewPinCode') }}
            </p>
            <input-oracle :ispin="true" />
          </div>
          <div v-if="!alphaNumeric" class="form-control">
            <input-oracle type="password" placeholder="Pin Code" />
          </div>
        </div>
        <!-- Options button -->
        <button class="chat-pin__code-enter--options" @click="isModal = true">
          {{ $t('chat.privacy.pinCodeOptions') }}
        </button>
      </div>
      <div class="chat-pin__modal" :class="{ show: isModal }">
        <div class="chat-pin__modal-backdrop"></div>

        <div class="chat-pin__modal-content">
          <!-- 4-digit button -->
          <new-oracle-button
            :text="$t('chat.privacy.fourDigitNumericCode')"
            color="yellow"
            @click=";(alphaNumeric = false), (isModal = false)"
          />

          <!-- Alphanumeric button -->
          <new-oracle-button
            :text="$t('chat.privacy.customAlphanumericCode')"
            color="black"
            @click=";(alphaNumeric = true), (isModal = false)"
          />

          <!-- Cancel button -->
          <button
            class="chat-pin__modal-button chat-pin__modal-button--cancel"
            @click="isModal = false"
          >
            {{ $t('chat.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from '@/assets/svg/arrow-back.svg?component'

// Use localePath if needed
const localePath = useLocalePath()

// Reactive state
const alphaNumeric = ref(true)
const isModal = ref(false)
const pin = ref<string>('')
const confirmPin = ref<string>('')
const step = ref<number>(2)
</script>

<style lang="scss">
.chat-pin__code {
  padding-bottom: 24px;
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 38px);
  }
  &-header {
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
  &-body {
    flex: 1 1 calc(100% - 22px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .body-top {
      flex: 1 1 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &--image {
      margin-bottom: 32px;
    }
    &--title {
      margin-bottom: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      text-align: center;
      color: #fff;
    }
    &--description {
      margin-bottom: 40px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
      color: #8780cf;
    }
    .new-oracle-button {
      margin-bottom: 8px;
      padding: 13px;
      box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.25);
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-3);
    }
    &--hint {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      text-align: center;
      color: #8780cf;
    }
  }
  &-enter--title {
    margin-bottom: 40px;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: #fff;
  }
  .pin-step--enter {
    flex: 1 1 calc(100% - 22px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .form-input {
      height: 0;
      border: 0;
      opacity: 0;
    }
  }
  .pin-step {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 100%;
  }
  &-enter--dot {
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    transition: 0.2s;
    &.active {
      border-color: var(--primary-2);
    }
  }
  &-enter--options {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #f64e2a;
  }
  .form-control {
    width: 100%;
  }
  &-actions {
    border-radius: 12px;
    background: #14131b;
    overflow: hidden;
    margin-bottom: 10px;
  }
  &-btn {
    width: 100%;
    display: block;
    min-height: 44px;
    padding: 0 16px;
    position: relative;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    text-align: left;
    color: #f64e2a;
    &:last-child {
      &::after {
        display: none;
      }
    }
    &::after {
      content: '';
      width: calc(100% - 16px);
      height: 0;
      border-bottom: 1px solid #8780cf;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7873b4;
  }
  .chat-pin__modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    visibility: hidden;
    &.show {
      visibility: visible;
      .chat-pin__modal-backdrop {
        opacity: 1;
      }
    }
    &-backdrop {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      filter: blur(6.400000095367432px);
      background: rgba(0, 0, 0, 1);
      opacity: 0;
    }
    &-content {
      max-width: 375px;
      margin: 0 auto;
      padding: 0 12px 16px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 10px;
      position: relative;
      z-index: 2;
    }
    .new-oracle-button {
      min-height: 44px;
      border-radius: 14px;
      &.black {
        background: #08051b;
        &:hover {
          box-shadow: none;
        }
      }
    }
    &-button {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: #fff;
      transition: 0.2s;
      &:hover {
        color: #f64e2a;
      }
    }
  }
}
</style>
