<template>
  <div class="chat-add-users">
    <div class="main-container">
      <div class="chat-add-users__header">
        <nuxt-link
          :to="localePath(ChatRoute.Settings)"
          class="chat-add-users__header-cancel"
          >{{ $t('chat.cancel') }}</nuxt-link
        >
        <h2 class="chat-add-users__header-title">
          {{ $t('chat.privacy.addUsers') }}
        </h2>
      </div>

      <div class="chat-add-users__filter-info">
        <input-oracle :search="true" :placeholder="$t('chat.search')" @changed="onSearch" />
      </div>

      <div class="chat-add-users__chats">
        <h2 class="chat-add-users__chats-title">
          {{ $t('chat.privacy.users') }}
        </h2>
        <ul v-if="filteredChats.length >= 1" class="chat-add-users__chats-list">
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
                :id="chat.id"
                v-model="selected"
                type="checkbox"
                name="chats"
                style="display: none"
                :value="chat.id"
                class="form-check"
              />
              <span class="chat-add-users__chats-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>

      <div class="chat-add-users__button">
        <new-oracle-button
          :text="$t('chat.done')"
          :color="selected.length ? 'yellow' : 'black'"
          :disabled="!selected.length"
          @click="finish"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatRoute } from "~/entities/chat/config";
import { DEFAULT_AVATAR } from "~/entities/chat/model";
import InputOracle from '@/components/input-oracle.vue'
import { useChatUiStore } from "~/store/chat";

const localePath = useLocalePath()
const router = useRouter()
const store = useChatUiStore()
const search = ref('')
const selected = ref<string[]>([])

const filteredChats = computed(() => {
  const needle = search.value.trim().toLowerCase()
  return store.contacts
    .filter((user) => !needle || user.username.toLowerCase().includes(needle))
    .map((user) => ({
      id: user._id,
      name: user.username,
      avatar: user.avatar || DEFAULT_AVATAR,
    }))
})

const onSearch = (value: string): void => {
  search.value = value
}

const finish = (): void => {
  if (!selected.value.length) {
    return
  }
  router.back()
}
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

