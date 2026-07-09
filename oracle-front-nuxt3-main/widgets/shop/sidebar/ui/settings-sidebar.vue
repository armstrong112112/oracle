<template>
  <div v-if="!shouldHideSidebar" class="settings-sidebar__container">
    <div class="sidebar__header">
      <h1>Settings</h1>
    </div>
    <nuxt-link to="/shops/shop-settings/profile">
      <div class="sidebar-profile">
        <div class="profile-icon">
          <img src="/svg/shop/icons/User.svg" alt="User" />
        </div>
        <div class="profile-bio">
          <h5>Shop Name</h5>
          <p>Avatar, Name, Bio</p>
        </div>
        <button>
          <img src="/svg/arrow-left.svg" alt="arrow" />
        </button>
      </div>
    </nuxt-link>
    <div class="sidebar-navigations">
      <nuxt-link
        v-for="(item, index) in navigation"
        :key="index"
        :to="`/shops/shop-settings/${item.link}`"
      >
        <div class="sidebar-navigation__item">
          <div class="item-content">
            <img :src="item.icons" alt="Orders" />
            <h5>{{ item.name }}</h5>
          </div>
          <div class="item-nav">
            <span>9</span>
            <button>
              <img src="/svg/arrow-left.svg" alt="arrow" />
            </button>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="sidebar-footer">
      <nuxt-link to="/shops/shop-settings/your-orders">
        <div class="your-order__item">
          <img src="/svg/shop/icons/Orders.svg" alt="Orders" />
          <h5>Your Orders</h5>
        </div>
      </nuxt-link>
      <div class="footer-contacts">
        <div class="contact__label">Contacts</div>
        <nuxt-link
          v-for="(item, index) in contact"
          :key="index"
          :to="item.link"
        >
          <div class="contact__items">
            <img :src="item.icons" alt="telegram" />
            <h5>{{ item.name }}</h5>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ContactNavigation,
  SettingsNavigation,
} from '~/shared/constants/shops'
import type { SideBarNavigationType } from '~/shared/types/shops'

const route = useRoute()

const navigation: SideBarNavigationType[] = SettingsNavigation
const contact: SideBarNavigationType[] = ContactNavigation
const screenWidth = ref<number>(import.meta.client ? window.innerWidth : 1920)

const updateWidth = () => {
  if (import.meta.client) {
    screenWidth.value = window.innerWidth
  }
}

const shouldHideSidebar = computed((): boolean => {
  const path = route.path
  const isChildShopSettings = path.startsWith('/shops/shop-settings/') && path !== '/shops/shop-settings'
  const isMobile = screenWidth.value < 1000
  return isChildShopSettings && isMobile
})

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', updateWidth)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateWidth)
  }
})
</script>
<style lang="scss" scoped>
.settings-sidebar__container {
  min-width: 260px;
  height: 100%;
  border-right: 1px solid #2b2741;
  padding-right: 16px;
  color: white;

  .sidebar__header {
    width: 100%;
    text-align: center;
    padding: 6.5px 0;
    display: none;

    h1 {
      padding: 0 20px;
      color: white;
      font: 500 18px Roboto, sans-serif
    }
  }

  .sidebar-profile {
    width: 100%;
    padding: 12px 8px;
    background-color: #14131b;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 8px;

    .profile-icon {
      padding: 12px;
      border-radius: 40px;
      background-color: #2c2a3d;
    }

    .profile-bio {
      width: 100%;

      h5 {
        color: white;
        font: 500 14px Roboto,
        sans-serif;
      }

      p {
        margin-top: 4px;
        color: #bfb7ff;
        font: 400 14px Roboto,
        sans-serif;
      }
    }
  }

  .sidebar-navigations {
    padding: 16px 0;
    border-bottom: 1px solid #2b2741;

    .sidebar-navigation__item {
      padding: 10px 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      gap: 8px;

      .item-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .item-nav {
        display: none;
        align-items: center;
        gap: 4px;

        span {
          color: #8780CF;
          font: 500 12px Roboto, sans-serif;
        }

        button {
          width: 24px;
          height: 24px;
        }
      }

      &:hover {
        border-radius: 12px;
        background-color: #1b1a24;
        transition: all 0.2s ease;
      }

      h5 {
        color: white;
        font: 400 14px Roboto,
        sans-serif;
      }
    }

    > a:nth-child(3) .sidebar-navigation__item span {
      display: none;
    }
  }

  .sidebar-footer {
    margin-top: 16px;

    .your-order__item {
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;

      &:hover {
        border-radius: 12px;
        background-color: #1b1a24;
        transition: all 0.3s ease-in-out;
      }

      h5 {
        color: white;
        font: 400 14px Roboto,
        sans-serif;
      }
    }

    .footer-contacts {
      margin-top: 24px;

      .contact__label {
        margin-left: 16px;
        margin-bottom: 8px;
        color: white;
        font: 500 18px Roboto,
        sans-serif;
      }

      .contact__items {
        height: 44px;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        gap: 12px;

        h5 {
          color: white;
          font: 400 14px Roboto,
          sans-serif;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .settings-sidebar__container {
    max-width: 100vw;
    width: 100vw;
    border: none;
    padding: 0 12px;

    .sidebar__header {
      display: block;
      margin-bottom: 20px;
    }

    .sidebar-profile {
      width: 100%;
    }

    .sidebar-navigations {
      margin-top: 16px;
      background: #14131B;
      border-bottom: none;
      border-radius: 12px;
      padding-left: 12px;
      padding-top: 0;
      padding-bottom: 0;

      .sidebar-navigation__item {
        border-bottom: 1px solid #2b2741;

        .item-nav {
          display: flex;
        }
      }

      > a:last-child .sidebar-navigation__item {
        border-bottom: none;
      }
    }

    .sidebar-footer {
      .your-order__item {
        background: #14131B;
        border-radius: 12px;
      }

      .footer-contacts {
        display: none;
      }
    }
  }
}

</style>
