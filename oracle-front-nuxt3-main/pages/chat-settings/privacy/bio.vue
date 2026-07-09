<template>
  <div class="bio">
    <div class="main-container">
      <!-- Header -->
      <div class="bio__header">
        <nuxt-link
          :to="localePath('/chat-settings/privacy/')"
          class="bio__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="bio__header-title">{{ $t('chat.privacy.bio') }}</h1>
      </div>

      <!-- Visibility options block -->
      <div class="bio__visibility">
        <h2 class="bio__title">{{ $t('chat.privacy.whoCanSeeBio') }}</h2>
        <ul class="bio__options">
          <li
            v-for="option in options"
            :key="option"
            class="bio__option"
            :class="{ 'bio__option--active': selectedOption === option }"
            @click="selectedOption = option"
          >
            {{ option }}
            <span class="bio__checkmark"><CheckmarkIcon /></span>
          </li>
        </ul>

        <p class="bio__description">
          {{ $t('chat.privacy.bioDescription') }}
        </p>
      </div>

      <!-- Exceptions block -->
      <div class="bio__exceptions">
        <h3 class="bio__title">{{ $t('chat.privacy.exceptions') }}</h3>

        <div class="bio__exceptions-list">
          <nuxt-link
            to="/chat-settings/privacy/add-users"
            class="bio__exceptions-item active"
          >
            <span class="bio__exceptions-label">{{
              $t('chat.privacy.neverShareWith')
            }}</span>
            <button class="bio__exceptions-action">
              <span class="bio__exceptions-action--status">{{
                $t('chat.privacy.addUsers')
              }}</span>
              <span class="bio__exceptions-arrow">
                <ArrowIcon />
              </span>
            </button>
          </nuxt-link>
          <!-- Exception List -->
          <ul class="bio__exeptions-list">
            <li
              v-for="(user, index) in blockedUsers"
              :key="index"
              class="bio__exeptions-item"
            >
              <!-- Avatar + Name -->
              <div class="bio__exeptions-user">
                <img
                  :src="'/svg/avatar.svg'"
                  :alt="user.name"
                  class="bio__exeptions-avatar"
                />
                <span class="bio__exeptions-name">{{ user.name }}</span>
              </div>
              <!-- Remove button -->
              <button
                class="bio__exeptions-remove"
                @click="deleteExeption(index)"
              >
                <MinusCircleIcon />
              </button>
            </li>
          </ul>
          <nuxt-link
            to="/chat-settings/privacy/add-users"
            class="bio__exceptions-item no-active"
          >
            <span class="bio__exceptions-label">{{
              $t('chat.privacy.alwaysShareWith')
            }}</span>
            <button class="bio__exceptions-action">
              {{ $t('chat.privacy.addUsers') }}
              <span class="bio__exceptions-arrow">
                <ArrowIcon />
              </span>
            </button>
          </nuxt-link>
        </div>

        <p class="bio__description">
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
import MinusCircleIcon from '@/assets/svg/close.svg?component'

// Use localePath if needed
const localePath = useLocalePath()

// Reactive state
const selectedOption = ref<string>('Everybody')

const options = ['Everybody', 'My contacts', 'Nobody']

const blockedUsers = ref([
  { name: 'Bill', deletable: true },
  { name: 'Julia Work', deletable: true },
  { name: 'Bill', deletable: true },
])

// Methods
const deleteExeption = (index: number) => {
  if (!blockedUsers.value[index].deletable) return
  blockedUsers.value.splice(index, 1)
}
</script>

<style lang="scss">
.bio {
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
    border-radius: 8px;
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
    .bio__checkmark {
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
      &.active {
        .bio__exceptions-label {
          color: #f64e2a;
        }
        .bio__exceptions-action--status {
          display: none;
        }
      }
      &.no-active {
        border-radius: 12px;
      }
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
  &__exeptions-list {
    margin-bottom: 8px;
    background: #14131b;
    border-radius: 0 0 12px 12px;
  }
  &__exeptions-item {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 16px;
    position: relative;
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
  &__exeptions-user {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__exeptions-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }
  &__exeptions-name {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__exeptions-clear {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 18px;
  }
  &__exeptions-clear-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: var(--primary-2);
  }
  &__exeptions-remove {
    svg {
      width: 22px;
      height: 22px;
      path {
        stroke: #f64e2a;
      }
    }
  }
}
</style>
