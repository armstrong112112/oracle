<template>
  <div class="more-settings-sidebar">
    <input-oracle
      :search="true"
      :placeholder="$t('moreSettings.search')"
      @changed="filterSettings" />
    <nuxt-link
      :to="localePath('/moresettings/personal-account')"
      class="app-profile-tile"
      :class="{
        'app-profile-tile--active':
          route.path === localePath('/moresettings/personal-account'),
      }">
      <div class="app-profile-tile__avatar">
        <UserIcon />
      </div>
      <div class="app-profile-tile__info">
        <div class="app-profile-tile__name">
          {{ $t("moreSettings.nameSurname") }}
        </div>
        <div class="app-profile-tile__nickname">
          {{ $t("moreSettings.nickname") }}
        </div>
      </div>
      <div class="app-profile-tile__arrow">
        <ArrowRightIcon />
      </div>
    </nuxt-link>

    <div class="more-settings-sidebar__content">
      <ul class="more-settings__list d-flex flex-column">
        <li
          v-for="setting in filteredmoreSettins"
          :key="setting.id"
          class="list-item">
          <app-feature-link
            :to="setting.to"
            :src="setting.img"
            :text="setting.title"
            :arrow="false"
            :showLine="false" />
        </li>
      </ul>
      <div class="more-contact">
        <h1 class="contact-title">{{ $t("moreSettings.contacts") }}</h1>
        <ul class="contact-list">
          <li v-for="contact of contacts" :key="contact.id" class="list-item">
            <app-feature-link
              :to="contact.to"
              :src="contact.src"
              :text="contact.name"
              :arrow="false"
              :showLine="false" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from "@/assets/svg/arrow-left.svg?component";
import UserIcon from "@/assets/svg/user-icon.svg?component";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

interface Setting {
  id: number;
  to: string;
  img: string;
  title: string;
}

interface Contact {
  id: number;
  to: string;
  src: string;
  name: string;
}

// Reactive state
const searchQuery = ref<string>("");

// Computed properties
const moreSettins = computed<Setting[]>(() => [
  {
    id: 1,
    to: localePath("/moresettings/privacy-security"),
    img: "/svg/moresettings/privacy-icon.svg",
    title: t("moreSettings.privacyAndSecurity"),
  },
  {
    id: 2,
    to: localePath("/moresettings/oracle-pay"),
    img: "/svg/moresettings/oracle-pay-icon.svg",
    title: t("moreSettings.oraclePay"),
  },
  {
    id: 3,
    to: localePath("/moresettings/language"),
    img: "/svg/moresettings/lang-icon.svg",
    title: t("moreSettings.language"),
  },
  {
    id: 4,
    to: localePath("/moresettings/payment-methods"),
    img: "/svg/moresettings/payment-icon.svg",
    title: t("moreSettings.paymentMethods"),
  },
  {
    id: 5,
    to: localePath("/moresettings/tickets"),
    img: "/svg/moresettings/ticket-icon.svg",
    title: t("moreSettings.tickets"),
  },
  {
    id: 6,
    to: localePath("/moresettings/fees"),
    img: "/svg/moresettings/fees-icon.svg",
    title: t("moreSettings.fees"),
  },
  {
    id: 7,
    to: localePath("/moresettings/terms-of-service"),
    img: "/svg/moresettings/terms-icon.svg",
    title: t("moreSettings.termsOfService"),
  },
]);

const contacts = ref<Contact[]>([
  {
    id: 1,
    to: "#",
    src: "/svg/telegram-icon.svg",
    name: "Telegram",
  },
  {
    id: 2,
    to: "#",
    src: "/svg/signal.svg",
    name: "Signal",
  },
  {
    id: 3,
    to: "#",
    src: "/svg/whatsapp.svg",
    name: "WhatsApp",
  },
  {
    id: 4,
    to: "#",
    src: "/svg/simplex.svg",
    name: "SimpleX",
  },
]);

const filteredmoreSettins = computed<Setting[]>(() => {
  if (!searchQuery.value) {
    return moreSettins.value;
  }
  return moreSettins.value.filter((setting) =>
    setting.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const filterSettings = (value: string): void => {
  searchQuery.value = value;
};
</script>

<style lang="scss" scoped>
.more-settings-sidebar {
  width: 100%;
  height: 100%;

  .input {
    margin-bottom: 18px;
  }

  .app-profile-tile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #13121b;
    border-radius: 12px;
    padding: 12px 8px 12px 12px;
    margin-bottom: 16px;
    transition: 0.2s;
    text-decoration: none;

    &:hover {
      background: #2b2741;
    }

    &--active {
      background: #2b2741;

      .app-profile-tile__name {
        color: #7a74ba;
        font-weight: 500;
      }

      .app-profile-tile__avatar {
        opacity: 0.8;
      }
    }

    &__avatar {
      border-radius: 50%;
      width: 42px;
      height: 42px;
      min-width: 42px;
      background: #1e1d28;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__info {
      width: 100%;
    }

    &__name {
      margin-bottom: 4px;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }

    &__nickname {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #7a74ba;
    }

    &__arrow {
      width: 32px;
      height: 32px;
      min-width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        path {
          stroke: #7a74ba;
        }
      }
    }
  }

  &__content {
    .more-settings__list {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      .list-item {
        @media (min-width: 1024px) {
          margin: 2px 0;
        }
      }
    }

    .more-contact {
      .contact-title {
        margin-bottom: 18px;
        font-family: "Inter", sans-serif;
        font-weight: 500;
        font-size: 18px;
        line-height: 140%;
        color: #fff;
      }

      .feature-link__item {
        min-height: 52px;
      }
    }
  }
}
</style>
