<template>
  <div class="chat-language">
    <div class="main-container">
      <div class="chat-language__header">
        <nuxt-link
          :to="localePath(ChatRoute.Settings)"
          class="chat-language__back"
          :aria-label="$t('chat.card.back')"
        >
          <img src="/svg/figma-icons/arrow.svg" width="24" height="24" alt="" />
        </nuxt-link>
        <h1>{{ $t('chat.language.title') }}</h1>
      </div>

      <div class="chat-language__filter-info">
        <label class="chat-language__search">
          <img src="/svg/figma-icons/search.svg" width="24" height="24" alt="" />
          <input
            v-model="search"
            type="text"
            :placeholder="$t('chat.search')"
          />
        </label>
      </div>

      <div class="chat-language__chats">
        <ul v-if="filteredLangs.length >= 1" class="chat-language__chats-list">
          <li
            v-for="lang of filteredLangs"
            :key="lang.code"
            class="chat-language__chats-item"
          >
            <label :for="lang.code" class="chat-language__chats-item--label">
              <div class="left-block">
                <span class="chat-language__chats-label">{{ lang.name }}</span>
                <span class="chat-language__chats-nativename">{{
                  lang.nativeName
                }}</span>
              </div>
              <input
                :id="lang.code"
                type="radio"
                name="language"
                style="display: none"
                class="form-check"
                :checked="lang.code === locale"
                @change="choose(lang.code)"
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
import { ChatRoute } from "~/entities/chat/config";
import CheckIcon from '@/assets/svg/check-icon.svg?component'

const localePath = useLocalePath()
const { locale, locales, setLocale, t } = useI18n()

const search = ref('')

const LANGUAGE_NAME: Record<string, string> = {
  en: 'chat.language.english',
  ru: 'chat.language.russian',
}

type LocaleEntry = { code: string; name?: string }

const filteredLangs = computed(() => {
  const needle = search.value.trim().toLowerCase()
  return (locales.value as LocaleEntry[])
    .filter((item) => Boolean(item.code))
    .map((item) => ({
      code: item.code,
      name: LANGUAGE_NAME[item.code] ? t(LANGUAGE_NAME[item.code]) : item.name || item.code,
      nativeName: item.name || item.code,
    }))
    .filter((item) => !needle || item.name.toLowerCase().includes(needle) || item.nativeName.toLowerCase().includes(needle))
})

const choose = (code: string): void => {
  if (code === locale.value || (code !== 'en' && code !== 'ru')) {
    return
  }
  void setLocale(code)
}
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
    height: 44px;
    position: relative;
    padding: 0 12px;
    background: var(--secondary-1);
    width: calc(100% + 24px);
    margin-left: -12px;

    h1 {
      position: absolute;
      left: 50%;
      top: 50%;
      width: calc(100% - 80px);
      transform: translate(-50%, -50%);
      margin: 0;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.4;
      text-align: center;
      color: var(--primary-3);
      pointer-events: none;
    }
  }
  &__back {
    display: flex;
    transform: rotate(180deg);
  }
  &__filter-info {
    background: var(--secondary-1);
    width: calc(100% + 24px);
    margin-left: -12px;
    padding: 0 12px 16px;
  }
  &__search {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 36px;
    padding: 0 12px;
    background: var(--primary-1);
    border-radius: 10px;

    input {
      flex: 1;
      min-width: 0;
      height: 100%;
      border: 0;
      background: transparent;
      color: var(--primary-3);
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.3;
      text-align: left;
      outline: none;

      &::placeholder {
        color: rgba(255, 255, 255, 0.65);
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
      width: 100%;
      background: var(--primary-1);
      position: relative;
      padding: 0;
    }
    &-item--label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      max-width: none;
      margin: 0;
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
