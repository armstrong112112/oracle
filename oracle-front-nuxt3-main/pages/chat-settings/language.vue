<template>
  <div class="chat-language">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-language__header">
        <nuxt-link
          :to="localePath('/chat-settings')"
          class="chat-language__header-edit"
          >{{ $t('chat.edit') }}</nuxt-link
        >
        <h2 class="chat-language__header-title">
          {{ $t('chat.language.title') }}
        </h2>
        <nuxt-link
          :to="localePath('/chat-settings')"
          class="chat-language__header-done"
        >
          <EditIcon />
        </nuxt-link>
      </div>

      <!-- Filter / Selected Info -->
      <div class="chat-language__filter-info">
        <div class="form-control">
          <input
            v-model="search"
            type="search"
            :placeholder="$t('chat.search')"
            class="form-input"
          />
          <button class="search-btn" :class="{ noactive: search !== '' }">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div class="chat-language__chats">
        <!-- Types List -->
        <ul v-if="filteredLangs.length >= 1" class="chat-language__chats-list">
          <!-- Item -->
          <li
            v-for="lang of filteredLangs"
            :key="lang.id"
            class="chat-language__chats-item"
          >
            <label :for="`${lang.id}`" class="chat-language__chats-item--label">
              <div class="left-block">
                <span class="chat-language__chats-label">{{ lang.name }}</span>
                <span class="chat-language__chats-nativename">{{
                  lang.nativeName
                }}</span>
              </div>
              <input
                :id="`${lang.id}`"
                type="radio"
                name="chats"
                style="display: none"
                class="form-check"
                :checked="lang.id == 1"
              />
              <span class="chat-language__chats-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/svg/new-search.svg?component'
import CheckIcon from '@/assets/svg/check-icon.svg?component'
import EditIcon from '@/assets/svg/edit-icon.svg?component'

// Use localePath if needed
const localePath = useLocalePath()

// Reactive state
const search = ref<string>('')

const langs = [
  {
    id: 1,
    name: 'English',
    nativeName: 'English',
  },
  {
    id: 2,
    name: 'Arabic',
    nativeName: 'العربية',
  },
  {
    id: 3,
    name: 'Catalan',
    nativeName: 'Català',
  },
  {
    id: 4,
    name: 'Dutch',
    nativeName: 'Nederlands',
  },
  {
    id: 5,
    name: 'French',
    nativeName: 'Français',
  },
  {
    id: 6,
    name: 'German',
    nativeName: 'Deutsch',
  },
  {
    id: 7,
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
  },
  {
    id: 8,
    name: 'Italian',
    nativeName: 'Italiano',
  },
  {
    id: 9,
    name: 'Korean',
    nativeName: '한국어',
  },
  {
    id: 10,
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
  },
  {
    id: 11,
    name: 'Persian',
    nativeName: 'فارسی',
  },
]

// Computed properties
const filteredLangs = computed(() => {
  if (!search.value) return langs
  return langs.filter((chat) =>
    chat.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})
</script>

<style lang="scss">
.chat-language {
  background: var(--primary-1);
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 24px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 12px;
    background: var(--secondary-1);
    width: calc(100% + 24px);
    margin-left: -12px;
    border-radius: 8px 8px 0 0;

    &-edit {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-2);
    }
    &-title {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 0.02em;
      color: var(--primary-3);
    }
  }
  &__filter-info {
    background: var(--secondary-1);
    width: calc(100% + 24px);
    margin-left: -12px;
    padding: 0 12px 16px;
    .form-control {
      position: relative;
      background: var(--primary-1);
      border-radius: 10px;
      &:focus-within {
        .search-btn {
          left: 15px;
          transform: translate(0, -50%);
        }
      }
      .form-input {
        width: 100%;
        height: 36px;
        background: transparent;
        border: 0;
        padding: 0 15px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 120%;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        &::placeholder {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 120%;
          text-align: center;
          color: rgba(255, 255, 255, 0.65);
        }
        &:focus {
          outline: none;
        }
      }
      .search-btn {
        position: absolute;
        top: 50%;
        left: calc(50% - 122px);
        transform: translate(0, -50%);
        transition: 0.2s;
        &.noactive {
          left: 15px;
          transform: translate(0, -50%);
        }
      }
    }
  }
  &__types,
  &__chats {
    &-title {
      background: var(--secondary-1);
      width: calc(100% + 24px);
      margin-left: -12px;
      padding: 5px 12px;
      user-select: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      letter-spacing: 0.02em;
      color: var(--primary-3);
    }
    &-list {
      width: 100vw;
      background: var(--primary-1);
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      padding: 0;
    }
    &-item--label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      max-width: 375px;
      margin: 0 auto;
      padding: 9px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      cursor: pointer;
    }
    &-label {
      display: block;
      width: 100%;
      margin-bottom: 5px;
      text-align: left;
      user-select: none;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      color: var(--primary-3);
    }
    &-nativename {
      font-family: 'SF Pro Text', sans-serif;
      font-weight: 400;
      font-size: 13px;
      line-height: 138%;
      letter-spacing: -0.01em;
      color: var(--primary-3);
    }
    &-check {
      svg {
        width: 12px;
        height: 10px;
        opacity: 0;
        path {
          stroke: var(--primary-2);
        }
      }
    }
    .form-check {
      &:checked + .chat-language__types-check,
      &:checked + .chat-language__chats-check {
        svg {
          opacity: 1;
        }
      }
    }
  }
}
</style>
