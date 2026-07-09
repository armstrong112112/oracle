<template>
  <div class="blocked-users">
    <div class="main-container">
      <!-- Header -->
      <div class="blocked-users__header">
        <nuxt-link
          :to="localePath('/chat-settings/privacy')"
          class="blocked-users__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="blocked-users__header-title">
          {{ $t('chat.privacy.blockedUsers') }}
        </h1>
      </div>

      <div class="blocked-users__add">
        <nuxt-link
          :to="localePath('/chat-settings/privacy/add-blocked-user')"
          class="blocked-users__link"
        >
          <CreateIcon class="blocked-users__link-icon" />
          <span class="blocked-users__link-label">{{
            $t('chat.privacy.blockUser')
          }}</span>
        </nuxt-link>
      </div>

      <!-- exeptions Body -->
      <div class="blocked-users__exeptions">
        <!-- Exception List -->
        <ul class="blocked-users__exeptions-list">
          <li
            v-for="(user, index) in blockedUsers"
            :key="index"
            class="blocked-users__exeptions-item"
          >
            <!-- Avatar + Name -->
            <div class="blocked-users__exeptions-user">
              <img
                :src="'/svg/avatar.svg'"
                :alt="user.name"
                class="blocked-users__exeptions-avatar"
              />
              <span class="blocked-users__exeptions-name">{{ user.name }}</span>
            </div>
            <!-- Remove button -->
            <button
              class="blocked-users__exeptions-remove"
              @click="deleteExeption(index)"
            >
              <MinusCircleIcon />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackIcon from '@/assets/svg/arrow-back.svg?component'
import MinusCircleIcon from '@/assets/svg/close.svg?component'
import CreateIcon from '@/assets/svg/plus.svg?component'

// Use localePath if needed
const localePath = useLocalePath()

// Reactive state
const blockedUsers = ref([
  { name: 'Bill', deletable: true },
  { name: 'Julia Work', deletable: true },
  { name: 'Bill', deletable: true },
  { name: 'Julia Work', deletable: true },
  { name: 'Bill', deletable: true },
  { name: 'Julia Work', deletable: true },
  { name: 'Bill', deletable: true },
  { name: 'Julia Work', deletable: true },
  { name: 'Bill', deletable: true },
  { name: 'Julia Work', deletable: true },
])

// Methods
const deleteExeption = (index: number) => {
  if (!blockedUsers.value[index].deletable) return
  blockedUsers.value.splice(index, 1)
}
</script>

<style lang="scss">
.blocked-users {
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
  &__link {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    position: relative;
    background: #14131b;
    padding: 0 18px;
    border-radius: 12px;
    margin-bottom: 24px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: #2b2741;
    }
    &-label {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #f64e2a;
    }
    &-icon {
      rect {
        fill: var(--primary-2);
      }
    }
  }
  &__exeptions-item {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
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
