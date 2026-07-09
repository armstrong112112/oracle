<template>
  <div :class="navStyle">
    <div class="whitelist-catalogue-nav">
      <div class="whitelist-catalogue-nav-back">
        <ArrowBackIcon />
        <InputOracle
          placeholder="Search..."
          class="whitelist-catalogue-nav-back-input"
          :search="true"
          @changed="searchChanged" />
      </div>
      <div class="whitelist-catalogue-nav-burger">
        <BurgerIcon @click="openCategories" />
      </div>
    </div>
    <div v-if="pending" class="whitelist-catalogue-loading">
      <SkeletonLoader height="104px" border-radius="12px" />
      <SkeletonLoader height="104px" border-radius="12px" />
      <SkeletonLoader height="104px" border-radius="12px" />
    </div>
    <ErrorState
      v-else-if="profilesError"
      title="Failed to load catalogue"
      :message="profilesError.message || 'Please try again.'"
      @retry="refreshProfiles" />
    <EmptyState
      v-else-if="!hasProfiles"
      title="No profiles found"
      message="Try changing search or filters." />
    <template v-else-if="profiles">
      <div class="whitelist-catalogue-categories" :style="categoriesStyle">
        <div
          v-for="(category, id) of profiles.categories"
          :key="category"
          class="whitelist-catalogue-categories-item">
          <BlockTitleOracle
            :text="category"
            class="whitelist-catalogue-category-name" />
          <CheckboxOracle
            :id="id"
            :ref="category"
            round="true"
            @click="toggleCategory(category)" />
        </div>
      </div>
      <div
        v-for="(users, title) of profiles.users"
        :key="title"
        class="whitelist-catalogue-category">
        <BlockTitleOracle
          :text="title"
          class="whitelist-catalogue-category-name" />
        <div class="whitelist-catalogue-category-list">
          <div
            v-for="user of users"
            :key="user.id"
            class="whitelist-catalogue-category-item"
            @click="router.push(localePath('/whitelist/profile/' + user.id))">
            <div class="whitelist-catalogue-category-item-left">
              <img src="/png/zaglushka.png" alt="" />
            </div>
            <div class="whitelist-catalogue-category-item-right">
              <div class="whitelist-catalogue-category-item-username">
                @{{ user.username }} (ID: {{ user.id }})
              </div>
              <div class="whitelist-catalogue-category-item-verified-for">
                {{ user.category.map((e) => e.name).join(", ") }}
              </div>
              <div class="whitelist-catalogue-category-item-verified-period">
                Verified sinсe {{ formatDate(user.verifiedSince) }} to
                {{ formatDate(user.verifiedUntil) }}
              </div>
              <div class="whitelist-catalogue-category-item-desc">
                {{ user.rating }}/5 - (702) Reviews -
                <span class="green">${{ user.deposit }}</span> Deposit
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="whitelist-catalogue-footer">
      <ButtonOracle text="Become @OracleVerified" color="gray" />
      <ButtonOracle text="Oracle's Market" color="gray" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { shortFormattedDate } from "~/helpers";
// @ts-ignore
import BurgerIcon from "@/assets/svg/burger-menu.svg?component";
// @ts-ignore
import ArrowBackIcon from "@/assets/svg/arrow-back.svg?component";
import { useRouter } from "vue-router";
import BlockTitleOracle from "~/components/block-title-oracle.vue";
import ErrorState from "~/components/ui/ErrorState.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";

interface Category {
  name: string;
}

interface User {
  id: number;
  username: string;
  category: Category[];
  verifiedSince: Date;
  verifiedUntil: Date;
  rating: number;
  deposit: number;
}

interface Profiles {
  users?: Record<string, User[]>;
  categories: string[];
  selectedCategories: string[];
}

definePageMeta({
  layout: "mobile",
});

const router = useRouter();
const localePath = useLocalePath();
const searchInput = ref("");
const show = ref(false);
const selectedCategories = ref<string[]>([]);
const { locale } = useI18n();

const queryParams = computed(() => ({
  cat: selectedCategories.value.join(";"),
  name: searchInput.value,
}));

const {
  data: profilesResponse,
  pending,
  error: profilesError,
  refresh: refreshProfiles,
} = await useApiFetch<unknown>("/user/list", {
  method: "GET",
  query: queryParams,
  watch: [queryParams],
});

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const normalizeProfiles = (raw: unknown): Profiles | undefined => {
  if (!isRecord(raw)) return undefined;

  const users = isRecord(raw.users)
    ? Object.entries(raw.users).reduce<Record<string, User[]>>((acc, [title, items]) => {
        if (!Array.isArray(items)) return acc;

        acc[title] = items.filter(isRecord).map((item) => ({
          id: Number(item.id ?? 0),
          username: String(item.username ?? ""),
          category: Array.isArray(item.category)
            ? item.category.filter(isRecord).map((cat) => ({
                name: String(cat.name ?? ""),
              }))
            : [],
          verifiedSince: item.verifiedSince ? new Date(String(item.verifiedSince)) : new Date(0),
          verifiedUntil: item.verifiedUntil ? new Date(String(item.verifiedUntil)) : new Date(0),
          rating: Number(item.rating ?? 0),
          deposit: Number(item.deposit ?? 0),
        }));

        return acc;
      }, {})
    : {};

  return {
    users,
    categories: Array.isArray(raw.categories) ? raw.categories.map((x) => String(x)) : [],
    selectedCategories: Array.isArray(raw.selectedCategories)
      ? raw.selectedCategories.map((x) => String(x))
      : [],
  };
};

const profiles = computed(() => normalizeProfiles(profilesResponse.value));
const hasProfiles = computed(() => {
  if (!profiles.value?.users) return false;
  return Object.values(profiles.value.users).some((items) => items.length > 0);
});

const searchChanged = (v: string) => {
  searchInput.value = v;
};

watch(profiles, () => {
  if (profiles.value) {
    const { selectedCategories: selected = [] } = profiles.value;
    selectedCategories.value = selected ? [...selected] : [];
  }
});

const openCategories = () => {
  show.value = !show.value;
  const body = document.querySelector("body") as HTMLBodyElement;
  if (body) {
    body.style.overflow = show.value ? "hidden" : "auto";
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const toggleCategory = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(
      (item) => item !== category
    );
  } else {
    selectedCategories.value.push(category);
  }
  openCategories();
};

const formatDate = (d: Date) => {
  return shortFormattedDate(d, locale.value);
};

const navStyle = computed(() => ["whitelist-catalogue", { open: show.value }]);

const categoriesStyle = computed(() => ({
  display: show.value ? "block" : "none",
}));

</script>

<style lang="scss">
.whitelist-catalogue {
  min-height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding: 0 10px;
  &.open {
    background: #121119;
  }
  &-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 0 0;
    &-back {
      display: flex;
      width: 100%;
      gap: 10px;
      align-items: center;
      font-family: "Hanson";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 11px;
      text-transform: uppercase;
      &-input {
        width: 92%;
      }
    }
    &-burger {
      cursor: pointer;
    }
  }
  &:last-child {
    margin-bottom: 165px;
  }
  &-categories {
    position: absolute;
    width: 375px;
    height: 604px;
    left: 0px;
    top: 64px;
    background: #121119;
    &-item {
      /* Frame 72 */
      box-sizing: border-box;
      /* Auto layout */
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 14px 4px 14px 12px;
      gap: 8px;
      width: 353px;
      height: 49px;
      border-bottom: 1px solid #252334;
      /* Inside auto layout */
      flex: none;
      order: 8;
      align-self: stretch;
      flex-grow: 0;
    }
  }
  &-category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    &-name {
      margin: 20px 0;
      text-align: center;
    }
    &-item {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      gap: 12px;
      align-items: center;
      padding: 12px;
      min-width: 351px;
      min-height: 104px;
      background: #121119;
      border-radius: 12px;
      cursor: pointer;
      &-left {
        img {
          width: 80px;
          height: 80px;
          background: #121119;
          border-radius: 8px;
        }
      }
      &-username {
        font-family: "Reza Zulmi Alfaizi Sans";
        font-size: 16px;
        line-height: 20px;
      }
      &-verified-for {
        font-family: "Reza Zulmi Alfaizi Sans";
        font-size: 14px;
        line-height: 17px;
      }
      &-verified-period {
        font-family: "Reza Zulmi Alfaizi Sans";
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.4);
      }
      &-desc {
        font-family: "Reza Zulmi Alfaizi Sans";
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.4);
        .green {
          color: green;
        }
      }
    }
  }
  &-footer {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 124px;
    left: 0;
    bottom: 0px;
    background: #1f1e27;
    border-top: 1px solid #2e2d3b;
  }
}
</style>
