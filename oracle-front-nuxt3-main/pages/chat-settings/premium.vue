<template>
  <div class="premium-chat">
    <div class="main-container">
      <!-- Header -->
      <div class="premium-chat__header">
        <nuxt-link to="#" class="premium-chat__cancel-btn">{{
          $t('chat.cancel')
        }}</nuxt-link>
        <nuxt-link to="#" class="premium-chat__done-btn">{{
          $t('chat.done')
        }}</nuxt-link>
      </div>

      <div class="premium-chat__profile">
        <div class="premium-chat__avatar">
          <img
            class="premium-chat__photo"
            src="/png/zaglushka.png"
            alt="User avatar"
            width="120"
            height="120"
          />
        </div>
        <label
          for="avatar"
          class="premium-chat__action premium-chat__action--primary"
        >
          <input id="avatar" type="file" style="display: none" />
          {{ $t('chat.setNewPhoto') }}
        </label>
      </div>

      <form
        action="#"
        class="premium-chat__form"
        @submit.prevent="premiumUpdate"
      >
        <div class="premium-chat__form-head">
          <div class="form-control">
            <input-oracle
              :label="$t('chat.nameAndSurname')"
              :placeholder="$t('chat.name')"
              v="Julia"
            />
            <input-oracle :placeholder="$t('chat.surname')" />
          </div>
          <div class="form-control">
            <input-oracle
              type="string"
              :label="$t('chat.privacy.bio')"
              :placeholder="$t('chat.privacy.bio')"
              @changed="updateBio"
            />
            <span class="max-length">{{ bio.length }} / 100</span>
          </div>

          <nuxt-link
            :to="localePath('/chat-settings/date-of-birth')"
            class="premium-chat__item premium-chat__item--premium"
          >
            <div class="premium-chat__label">{{ $t('chat.dateOfBirth') }}</div>
            <div class="premium-chat__value">March 12 2006</div>
            <div class="premium-chat__arrow"></div>
          </nuxt-link>
          <nuxt-link
            :to="localePath('/chat-settings/oracle-account')"
            class="premium-chat__item premium-chat__item--premium"
          >
            <div class="settings-menu__icon settings-menu__icon--premium">
              <PremiumIcon />
            </div>
            <div class="premium-chat__label">
              {{ $t('chat.oracleAccount') }}
            </div>
            <div class="premium-chat__arrow"></div>
          </nuxt-link>
        </div>
        <div class="premium-chat__form-button">
          <new-oracle-button :text="$t('chat.logOut')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import PremiumIcon from '@/assets/svg/premium-icon.svg?component'

// Use localePath if needed
const localePath = useLocalePath()

// Reactive state
const bio = ref<string>('')

// Methods
const updateBio = (val: string) => {
  bio.value = val
}

const premiumUpdate = (event: Event) => {
  event.preventDefault()
}
</script>

<style lang="scss">
.premium-chat {
  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  &__cancel-btn,
  &__done-btn {
    width: 81px;
    padding: 9px 0;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    line-height: 130%;
    color: #f64e2a;
  }
  &__profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }
  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }
  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__action {
    border-radius: 12px;
    padding: 12px 14px;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #f64e2a;
  }
  &__form {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
  }
  &__form-head {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .form-control {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }
  &__item {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #14131b;
    border-radius: 12px;
    padding: 0 16px;
    transition: 0.2s;
    &:hover {
      background: var(--secondary-7);
    }
    svg {
      path {
        fill: #fff;
      }
    }
  }
  &__label {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__value {
    white-space: nowrap;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #8780cf;
  }
  &__arrow {
    width: 7px;
    height: 12px;
    min-width: 7px;
    background: url('/svg/shape-icon.svg') no-repeat center/contain;
  }
  .new-oracle-button {
    background: #08051b;
    border-radius: 14px;
    padding: 11px 16px;
    color: #f64e2a;
    &:hover {
      background: #08051b;
      box-shadow: none;
    }
  }
  .max-length {
    display: block;
    padding: 8px 8px 0 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
  }
}
</style>
