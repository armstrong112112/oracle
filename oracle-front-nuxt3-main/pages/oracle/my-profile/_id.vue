<template>
  <div>
    <div class="profile">
      <div class="profile-nav">
        <div class="profile-nav-back">
          <ArrowBackIcon
            class="profile-nav-back-arrow"
            @click="router.back()" />
          ORACLE VERIFIED Profile
        </div>
        <div class="profile-nav-burger">
          <BurgerIcon />
        </div>
      </div>
      <div class="profile-card">
        <div class="profile-card-photo">
          <img src="/assets/svg/user-image.png" alt="" />
          <div class="profile-card-rating">
            <div class="green">{{ getProfile.rating }}</div>
            /5
          </div>
          <div class="profile-card-reviews">
            <div class="positive">(489+</div>
            /
            <div class="negative">11-)</div>
          </div>
        </div>

        <div class="profile-card-info">
          <div class="profile-card-username">@{{ getProfile.username }}</div>
          <div class="profile-card-userid">ID: {{ getProfile.id }}</div>
          <div class="profile-card-since">
            Oracle Member Since
            <div class="date">
              {{ formatDate(getProfile.oracleMemberSince) }}
            </div>
          </div>
          <div class="profile-card-verifed">
            Oracle Verified Since
            <div class="date">{{ formatDate(getProfile.verifiedSince) }}</div>
          </div>
          <div class="profile-card-until">
            Oracle Verified Until
            <div class="date">{{ formatDate(getProfile.verifiedUntil) }}</div>
          </div>
        </div>
      </div>
      <OrangeBlockModule
        :title="`$ ${getProfile.deposit} deposit`"
        link-text="Check Oracle’s Verification Verdict" />
      <ButtonOracle text="Check oracle profile" />
      <div class="profile-verified-for">
        <BlockTitleOracle text="Verified for:" />
        <div class="profile-verified-for-items">
          <div
            v-for="category of getProfile.categories"
            :key="category.name"
            class="profile-verified-for-item">
            {{ category.name }}
          </div>
        </div>
      </div>
      <div class="profile-reviews">
        <div class="profile-reviews-title">
          <div class="profile-reviews-title-left">
            <BlockTitleOracle text="Reviews" />
            <span class="profile-reviews-title-left-point"></span>
            <span class="profile-reviews-title-left-count">Total (105)</span>
          </div>
          <div class="profile-reviews-title-right">
            General score:
            <span class="profile-reviews-title-right-score"
              >{{ getProfile.rating }}/5</span
            >
          </div>
        </div>
        <ProfileReviewsItems :items="reviewItems" />
      </div>
      <ButtonOracle text="Contact seller" />
      <ButtonOracle text="offer escrow deal" />
      <div class="profile-currencies">
        <BlockTitleOracle text="p2p Market Listings of this Seller" />
        <ProfileCurrenciesScroll :items="currencyItems" />
      </div>
      <div class="profile-contacts">
        <BlockTitleOracle text="Contacts" />
        <div class="profile-contacts-items">
          <div
            v-for="contact of getProfile.links"
            :key="contact.title"
            class="profile-contacts-item">
            <InputOracle
              :label="contact.name"
              :v="contact.link"
              :readonly="true" />
          </div>
        </div>
      </div>
      <div class="profile-description">
        <BlockTitleOracle text="description" />
        <OrangeBlockModule :text="getProfile.description" />
      </div>
      <ButtonOracle text="Oracle’s market" color="orange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import ArrowBackIcon from "~/assets/svg/arrow-back.svg?component";
import BurgerIcon from "~/assets/svg/burger-menu.svg?component";
import BlockTitleOracle from "~/components/block-title-oracle.vue";
import ButtonOracle from "~/components/button-oracle.vue";
import InputOracle from "~/components/input-oracle.vue";
import OrangeBlockModule from "~/components/orange-block-module.vue";
import {
  currencyItems,
  reviewItems,
} from "~/entities/oracle-profile/data/profile.seed";
import ProfileCurrenciesScroll from "~/entities/oracle-profile/ui/ProfileCurrenciesScroll.vue";
import ProfileReviewsItems from "~/entities/oracle-profile/ui/ProfileReviewsItems.vue";
import { formattedDate } from "~/helpers";
import { useProfileStore } from "~/store/profile";

definePageMeta({
  layout: "mobile",
});

interface Profile {
  id: number;
  username: string;
  rating: number;
  deposit: number;
  oracleMemberSince: Date;
  verifiedSince: Date;
  verifiedUntil: Date;
  categories: Array<{ name: string }>;
  links: Array<{ name: string; link: string; title?: string }>;
  description: string;
}

const route = useRoute();
const router = useRouter();
const profileStore = useProfileStore();
const { locale } = useI18n();

const fallbackProfile: Profile = {
  id: 0,
  username: "",
  rating: 0,
  deposit: 0,
  oracleMemberSince: new Date(0),
  verifiedSince: new Date(0),
  verifiedUntil: new Date(0),
  categories: [],
  links: [],
  description: "",
};

const getProfile = computed(() => (profileStore.getProfile as unknown as Profile | null) ?? fallbackProfile);

const formatDate = (d: Date) => {
  return formattedDate(d, locale.value);
};

const contacts = [
  { title: "Telegram", pl: "Your TG contact" },
  { title: "Matrix", pl: "Your Matrix contact" },
  { title: "Signal", pl: "Your TG contact" },
  { title: "WhatsApp", pl: "Your TG contact" },
];

onMounted(() => {
  const id = Number(route.params.id);
  profileStore.fetchProfile(id);
});
</script>

<style lang="scss">
@use "@/assets/styles/pages/_my-profile-id.scss" as *;
</style>
