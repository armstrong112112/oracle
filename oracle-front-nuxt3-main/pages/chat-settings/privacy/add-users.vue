<template>
  <div class="chat-add-users">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-add-users__header">
        <nuxt-link
          :to="localePath('/chat-settings')"
          class="chat-add-users__header-cancel"
          >{{ $t('chat.cancel') }}</nuxt-link
        >
        <h2 class="chat-add-users__header-title">
          {{ $t('chat.privacy.addUsers') }}
        </h2>
      </div>

      <!-- Filter / Selected Info -->
      <div class="chat-add-users__filter-info">
        <input-oracle :search="true" :placeholder="$t('chat.search')" />
      </div>

      <div class="chat-add-users__chats">
        <h2 class="chat-add-users__chats-title">
          {{ $t('chat.privacy.users') }}
        </h2>
        <!-- Types List -->
        <ul v-if="filteredChats.length >= 1" class="chat-add-users__chats-list">
          <!-- Item -->
          <li
            v-for="chat of filteredChats"
            :key="chat.id"
            class="chat-add-users__chats-item"
          >
            <label
              :for="`${chat.id}`"
              class="chat-add-users__chats-item--label"
            >
              <div class="chat-add-users__chats-avatar">
                <img :src="chat.avatar" :alt="chat.avatar" />
              </div>
              <span class="chat-add-users__chats-label">{{ chat.name }}</span>
              <input
                :id="`${chat.id}`"
                type="checkbox"
                name="chats"
                style="display: none"
                class="form-check"
              />
              <span class="chat-add-users__chats-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>

      <!-- Done Button -->
      <div class="chat-add-users__button">
        <new-oracle-button
          :to="selectedCheck ? localePath('/chat-settings/folders/new') : ''"
          :text="$t('chat.done')"
          :color="selectedCheck ? 'yellow' : 'black'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import InputOracle from '@/components/input-oracle.vue'
import { useRoute } from 'vue-router'
import { useI18n } from '#imports'

interface Chat {
  id: number
  name: string
}

interface WindowWithAddUsersInterval extends Window {
  __addUsersInterval?: ReturnType<typeof setInterval>
}

const route = useRoute()
const { t } = useI18n()
const chats = ref<Chat[]>([])
const search = ref('')
const selectedCheck = ref(false)
const initialCheckedChats = ref<number[]>([])

const filteredChats = computed(() => {
  if (!search.value) return chats.value
  return chats.value.filter((chat) =>
    chat.name.toLowerCase().includes(search.value!.toLowerCase()),
  )
})

// Methods
const getCheckedChats = (): number[] => {
  if (import.meta.client) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="chats"]:checked',
    )
    return Array.from(checkboxes).map((el) => Number(el.id))
  }
  return []
}

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    initialCheckedChats.value = getCheckedChats()

    const intervalId = setInterval(() => {
      const nowChats = getCheckedChats()

      const chatsChanged =
        JSON.stringify(nowChats.sort()) !==
        JSON.stringify(initialCheckedChats.value.sort())

      selectedCheck.value = chatsChanged
    }, 200)

    // Store interval ID for cleanup
    const windowWithInterval = window as WindowWithAddUsersInterval
    windowWithInterval.__addUsersInterval = intervalId
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    const windowWithInterval = window as WindowWithAddUsersInterval
    if (windowWithInterval.__addUsersInterval) {
      clearInterval(windowWithInterval.__addUsersInterval)
      windowWithInterval.__addUsersInterval = undefined
    }
  }
})
</script>

<style lang="scss">
.chat-add-users {
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 24px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    position: relative;
    margin-bottom: 12px;

    &-cancel {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
      color: #f64e2a;
    }
    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      color: #fff;
    }
    &-done {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-2);
    }
  }
  &__filter-info {
    margin-bottom: 24px;
  }
  &__types,
  &__chats {
    &-title {
      padding: 0 8px 8px 8px;
      user-select: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-list {
      background: #14131b;
      border-radius: 12px;
    }
    &-avatar {
      width: 28px;
      min-width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-item {
      &:last-child {
        .chat-add-users__chats-item--label,
        .chat-add-users__types-item--label {
          border: 0;
        }
      }
    }
    &-item--label {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 16px;
      cursor: pointer;
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
    }
    &-label {
      width: 100%;
      text-align: left;
      user-select: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-check {
      width: 21px;
      min-width: 21px;
      height: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.65);
      border-radius: 100%;
      line-height: 0;
      transition: 0.2s;
      svg {
        opacity: 0;
        path {
          stroke: var(--primary-1);
        }
      }
    }
    .form-check {
      &:checked + .chat-add-users__types-check,
      &:checked + .chat-add-users__chats-check {
        background: var(--primary-2);
        border-color: var(--primary-2);
        svg {
          opacity: 1;
        }
      }
    }
  }
  &__button {
    width: 100%;
    background: #14131b;
    border-top: 1px solid #2b2741;
    padding: 12px 16px 24px 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    .new-oracle-button {
      max-width: 345px;
      margin: 0 auto;
      min-height: 36px;
      padding: 0;
      border-radius: 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
      &.black {
        border: 2px solid #2b2741;
        background: #13121b;
        cursor: no-drop;
        &:hover {
          box-shadow: none;
        }
      }
      &.yellow {
        color: #fff;
      }
    }
  }
}
</style>


