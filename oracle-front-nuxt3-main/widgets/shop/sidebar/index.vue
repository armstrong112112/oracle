<template>
  <div class="shop-sidebar">
    <nuxt-link to="/shops">
      <div class="logo">
        <img src="/svg/shop/icons/logo.svg" alt="logo" />
      </div>
    </nuxt-link>
    <div class="navigation">
      <div v-for="nav in navigation" :key="nav.id" class="navigation-block">
        <div
          class="navigation-link"
          :class="{ active: isActiveLink(nav) }"
          @click="handleClick(nav)">
          <div class="navigation-icon">
            <img :src="nav.icons" alt="icon" />
          </div>
          <div class="navigation-name-container">
            <div class="navigation-name">{{ nav.name }}</div>
            <div v-if="nav.dropdown">
              <img
                src="/svg/shop/icons/arrow-down.svg"
                alt="arrow"
                :class="{ open: openDropdownId === nav.id }" />
            </div>
          </div>
        </div>
        <transition name="accordion">
          <div
            v-if="nav.dropdown && openDropdownId === nav.id"
            class="navigation-dropdown">
            <nuxt-link
              v-for="child in nav.children"
              :key="child.id"
              :to="child.link"
              class="navigation-dropdown-item">
              {{ child.name }}
            </nuxt-link>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NavigationDto } from "~/shared/constants/shops";
import type { ChildrenType, NavigationType } from "~/shared/types/shops";

const router = useRouter();
const route = useRoute();

const navigation: NavigationType[] = NavigationDto;
const openDropdownId = ref<number | null>(null);

const handleClick = (nav: NavigationType): void => {
  if (nav.dropdown) {
    openDropdownId.value = openDropdownId.value === nav.id ? null : nav.id;
  } else {
    router.push(nav.link);
  }
};

const isActiveLink = (nav: NavigationType): boolean => {
  const currentPath = route.path;

  if (nav.dropdown) {
    return nav.children.some(
      (child: ChildrenType) =>
        currentPath === child.link || currentPath.startsWith(child.link + "/")
    );
  }

  return currentPath === nav.link || currentPath.startsWith(nav.link + "/");
};
</script>

<style lang="scss" scoped>
.shop-sidebar {
  width: 220px;
  padding: 12px 12px 0 16px;
  border-right: 1px solid #2b2741;

  .logo {
    margin-top: 2px;
  }

  .navigation {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .navigation-block {
      display: flex;
      flex-direction: column;
    }

    .navigation-link {
      padding: 8px 8px 8px 12px;
      display: flex;
      align-items: center;
      border: 1px solid transparent;
      border-radius: 12px;
      gap: 9px;
      cursor: pointer;
      transition: background-color 0.2s;

      &.active {
        background-color: #f64e2a;
      }

      &:hover {
        background-color: #f64e2a;
      }

      .navigation-icon {
        width: 20px;
        height: 20px;
      }

      .navigation-name-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .navigation-name {
          margin-top: 3px;
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #fff;
        }
      }

      img.open {
        transform: rotate(180deg);
        transition: transform 0.1s ease-in;
      }
    }

    .navigation-dropdown {
      display: flex;
      flex-direction: column;
      padding-left: 32px;
      margin-top: 4px;
      overflow: hidden;

      .navigation-dropdown-item {
        padding: 4px 0;
        font-size: 12px;
        color: #ddd;
        transition: color 0.1s ease-in;
        font-family: Roboto, sans-serif;
        &:hover {
          color: #f64e2a;
        }
      }
    }
  }
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.01s ease-in;
}

.accordion-enter,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 1000px) {
  .shop-sidebar {
    display: none;
  }
}
</style>
