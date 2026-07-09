<template>
  <div>
    <div v-if="pending" class="profile-state">
      <SkeletonLoader width="100%" height="140px" border-radius="16px" />
      <SkeletonLoader width="100%" height="120px" border-radius="16px" />
      <SkeletonLoader width="100%" height="100px" border-radius="16px" />
    </div>

    <ErrorState
      v-else-if="error"
      title="Unable to load profile"
      :message="errorMessage"
      @retry="refresh"
    />

    <EmptyState
      v-else-if="!hasProfileData"
      title="Profile is empty"
      message="There is no profile data available yet."
    />

    <div v-else class="profile">
      <div class="profile-nav">
        <div class="profile-nav-back">
          <ArrowBackIcon /> MY ORACLE VERIFIED Profile
        </div>
        <div class="profile-nav-burger">
          <BurgerIcon />
        </div>
      </div>
      <div class="profile-card">
        <div class="profile-card-photo">
          <img src="/svg/user-image.png" alt="" />
          <div class="profile-card-rating">
            <div class="green">4.9</div>
            /5
          </div>
          <div class="profile-card-reviews">
            <div class="positive">489+</div>
            /
            <div class="negative">11-</div>
          </div>
        </div>

        <div class="profile-card-info">
          <div class="profile-card-username">@{{ getMyProfile.username || "UserUser" }}</div>
          <div class="profile-card-userid">ID: {{ getMyProfile.id || "—" }}</div>
          <div class="profile-card-since">
            Oracle Member Since
            <div class="date">
              {{ formatDate(getMyProfile.oracleMemberSince) }}
            </div>
          </div>
          <div class="profile-card-verifed">
            Oracle Verified Since
            <div class="date">{{ formatDate(getMyProfile.verifiedSince) }}</div>
          </div>
          <div class="profile-card-until">
            Oracle Verified Until
            <div class="date">{{ formatDate(getMyProfile.verifiedUntil) }}</div>
          </div>
        </div>
      </div>
      <OrangeBlockModule
        :title="`$ ${getMyProfile.deposit ?? 0} deposit`"
        btn-text="ADD more deposit"
        link-text="Check Oracle’s Verification Verdict" />
      <div class="profile-reviews">
        <div class="profile-reviews-title">
          <div class="profile-reviews-title-left">
            <BlockTitleOracle text="Reviews" />
            <span class="profile-reviews-title-left-point"></span>
            <span class="profile-reviews-title-left-count">Total 105</span>
          </div>
          <div class="profile-reviews-title-right">
            General score:
            <span class="profile-reviews-title-right-score">4.8/5</span>
          </div>
        </div>
        <profile-reviews-items :items="reviewItems" />
      </div>
      <div class="profile-contacts">
        <BlockTitleOracle text="Contacts" />
        <div
          v-for="contact of getMyProfile.links"
          :key="contact.name"
          class="profile-contacts-item">
          <InputOracle
            :label="contact.name"
            :placeholder="contact.pl"
            :v="contact.link"
            :trash-action="() => undefined" />
        </div>
        <ButtonOracle text="Add" color="orange" class="profile-contacts-add" />
      </div>
      <div class="profile-currencies">
        <BlockTitleOracle
          text="Pick what Shops Listings you want to be displayed:" />
        <profile-currencies-scroll :items="currencyItems" />
      </div>
      <OrangeBlockModule
        title="Add more verification categories"
        btn-text="Contact support service" />
      <div class="profile-description">
        <BlockTitleOracle text="description" />
        <OrangeBlockModule
          text="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien." />
      </div>
      <ButtonOracle text="Oracle’s market" color="orange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowBackIcon from "@/assets/svg/arrow-back.svg?component";
import BurgerIcon from "@/assets/svg/burger-menu.svg?component";
import { computed } from "vue";
import BlockTitleOracle from "~/components/block-title-oracle.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import ErrorState from "~/components/ui/ErrorState.vue";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";
import {
  currencyItems,
  reviewItems,
} from "~/entities/oracle-profile/data/profile.seed";
import ProfileCurrenciesScroll from "~/entities/oracle-profile/ui/ProfileCurrenciesScroll.vue";
import ProfileReviewsItems from "~/entities/oracle-profile/ui/ProfileReviewsItems.vue";
import { formattedDate } from "~/helpers";

definePageMeta({
  layout: "mobile",
});

interface MyProfileResponse {
  id?: string | number;
  username?: string;
  oracleMemberSince?: string | Date | null;
  verifiedSince?: string | Date | null;
  verifiedUntil?: string | Date | null;
  deposit?: number | string;
  links?: Array<{ name: string; pl: string; link: string }>;
}

const { data, pending, error, refresh } = useApiFetch<MyProfileResponse>("/my-profile", {
  server: false,
  lazy: true,
  immediate: true,
});
const { locale } = useI18n();

const fallbackProfile: MyProfileResponse = {
  id: undefined,
  username: "",
  oracleMemberSince: null,
  verifiedSince: null,
  verifiedUntil: null,
  deposit: 0,
  links: [],
};

const profileData = computed<MyProfileResponse | null>(() => data.value ?? null);
const getMyProfile = computed<MyProfileResponse>(() => profileData.value ?? fallbackProfile);
const hasProfileData = computed(() => Boolean(
  getMyProfile.value.id ||
    getMyProfile.value.username ||
    getMyProfile.value.deposit ||
    (getMyProfile.value.links?.length ?? 0),
));
const errorMessage = computed(() => error.value?.message || "Unable to load profile data.");

const formatDate = (d: Date | string | null | undefined) => {
  return formattedDate(d || "", locale.value);
};

// ВЫЗЫВАЕТ ОШИБКУ, ПОЭТОМУ БЫЛО ЗАКОММЕНТИРОВАННО
// onMounted(async () => {
//   await profileStore.fetchMyProfile()
// })
</script>

<style lang="scss">
@use "@/assets/styles/pages/_my-profile-id.scss" as *;

.profile-state {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}
</style>
