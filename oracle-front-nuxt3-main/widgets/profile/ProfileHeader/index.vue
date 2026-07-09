<template>
  <div class="profile_header">
    <!-- Top Section -->
    <div
      :class="[
        'profile_top',
        status === 'verified' ? 'bg-verified' : null,
        status === 'trial' ? 'bg-trial' : null,
        status === 'blocked' ? 'bg-blocked' : null,
      ]">
      <div class="profile_top_center">
        <img
          v-if="status === 'verified'"
          src="/icons/profile/oracle_logo.svg"
          alt="oracle logo"
          class="oracle_logo" />
        <div v-if="status === 'trial'" class="trial_badge">
          {{ $t("whitelist.profile.trial") }}
        </div>
        <div v-if="status !== 'blocked'" class="text_block">
          <div class="profile_top_center_title">
            Oracle
            <span v-if="!noText">{{ $t("whitelist.profile.verified") }}</span>
          </div>
          <div v-if="!noText" class="profile_top_center_description">
            {{ $t("whitelist.profile.since", { date: "May 2026" }) }}
          </div>
        </div>
        <!--        <div v-if="status === 'blocked'" class="text_block">-->
        <!--          <div class="profile_top_center_title">Blocked user</div>-->
        <!--        </div>-->
      </div>
    </div>

    <!-- Bottom Info Section -->
    <div v-if="status !== 'blocked'" class="profile_info">
      <div class="profile_info_header">
        <img
          src="/avatars/user.svg"
          alt="User"
          class="user_avatar cursor-pointer"
          :style="{ borderColor: hasStories ? '#f64e2a' : '#000' }"
          @click="openStoryView" />
        <div class="user_info">
          <div class="username">{{ profile.username }}</div>
          <div v-if="!isId" class="rating">
            4.5/5
            <img src="/icons/profile/star.svg" alt="star" class="star_icon" />
          </div>
          <div v-if="isId" class="id">
            {{ $t("whitelist.profile.userId", { id: 321321321 }) }}
          </div>
        </div>
        <div class="actions cursor-pointer">
          <nuxt-link :to="localePath('/oracle/update-profile')">
            <img v-if="!isUser" src="/icons/profile/edit.svg" alt="edit" />
          </nuxt-link>
          <img
            :src="
              status === 'verified'
                ? '/icons/profile/share.svg'
                : '/icons/profile/right_replay.svg'
            "
            alt="action" />
        </div>
      </div>
      <div class="profile_info_body">
        <div class="profile_info_body_text">
          {{ truncatedBio }}
          <span class="invisible_text" :class="{ visible: showMore }">
            {{ remainingBio }}
          </span>
          <span
            v-if="profile.bio.length > 100"
            class="primary-color cursor-pointer"
            @click="toggleMore">
            {{
              showMore
                ? $t("whitelist.profile.less")
                : $t("whitelist.profile.more")
            }}
          </span>
        </div>
      </div>
      <div v-if="isP2p" class="flex w-full">
        <ProfileP2pCard />
      </div>
      <div v-if="!isUser" class="profile_info_footer">
        <div class="profile_skills">
          <div class="profile_skill">
            {{ $t("whitelist.profile.skills.graphic") }}
          </div>
          <div class="profile_skill">
            {{ $t("whitelist.profile.skills.uiux") }}
          </div>
        </div>
      </div>
      <profile-buttons v-if="isUser" :is-p2p="isP2p" />
      <div class="flex flex-col gap-4 w-full">
        <CustomButton
          v-if="isMe"
          class="w-full"
          :value="$t('whitelist.profile.completeProfile')"
          type="primary"
          size="sm"
          @click="$emit('toggle-no-data')" />
        <CustomButton
          v-if="isMe"
          class="w-full"
          :value="$t('whitelist.profile.openSettings')"
          type="secondary"
          size="sm"
          is-image="settings" />
      </div>
    </div>
    <div v-if="status !== 'blocked' && !isP2p">
      <ProfileStories
        :is-upload="true"
        :is-no-data="isNoData"
        :is-own-profile="isMe"
        @toggle-no-data="$emit('toggle-no-data')"
        @story-highlighted="$emit('story-highlighted', $event)" />
    </div>

    <div v-if="storiesStore.getIsStoryViewOpen" class="story-view-modal">
      <div class="story-view-content">
        <div class="story-view-header">
          <button class="close-btn" @click="closeStoryView">
            <img src="/icons/story/close.svg" alt="close" />
          </button>
        </div>
        <div
          v-if="storiesStore.getCurrentStory"
          class="story-view-body"
          :style="{ background: storyBackgroundColor }">
          <img
            :src="storiesStore.getCurrentStory.image"
            class="story-image"
            draggable="false"
            alt="story" />
          <!-- Multiple Text Overlays -->
          <div
            v-for="(textItem, textIndex) in getTextItems(
              storiesStore.getCurrentStory
            )"
            :key="textIndex"
            class="story-text-overlay"
            :style="getTextItemStyle(textItem)">
            {{ textItem.text }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="status === 'blocked'" class="">
      <BlockedProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImageColorExtractor } from "@/composables/useImageColorExtractor";
import { useStoryText } from "~/composables/useStoryText";
import type { Story } from "~/entities/oracle-pay/model/stories.types";
import CustomButton from "~/components/ui/Button.vue";
import BlockedProfile from "~/widgets/oracle/profile/BlockedProfile/index.vue";
import ProfileButtons from "~/widgets/oracle/profile/profileButtons/index.vue";
import ProfileP2pCard from "~/widgets/profile/ProfileP2pCard/index.vue";
import ProfileStories from "~/widgets/profile/ProfileStories/index.vue";
import { useOracleProfileStore } from "@/store/oracle-profile";
import { useStoriesStore } from "@/store/stories";
import { writeLocalStorageJson } from "~/utils/clientStorage";

interface Props {
  status?: string;
  noText?: boolean;
  isUser?: boolean;
  isId?: boolean;
  isMe?: boolean;
  isNoData?: boolean;
  isP2p?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  status: "",
  noText: false,
  isUser: false,
  isId: false,
  isMe: false,
  isNoData: false,
  isP2p: false,
});

const emit = defineEmits<{
  (e: "toggle-no-data"): void;
  (e: "story-highlighted", value: any): void;
}>();

const { t } = useI18n();
const localePath = useLocalePath();

// Use Pinia stores
const oracleProfileStore = useOracleProfileStore();
const storiesStore = useStoriesStore();

// State
const showMore = ref(false);
const storyBackgroundColor = ref("rgba(0, 0, 0, 0.8)");

// Computed
const profile = computed(() => oracleProfileStore.profile);
const hasStories = computed(() => storiesStore.getStories.length > 0);
const truncatedBio = computed(() => {
  return showMore.value || profile.value.bio.length <= 100
    ? profile.value.bio
    : profile.value.bio.slice(0, 100);
});
const remainingBio = computed(() => {
  return profile.value.bio.length > 100 ? profile.value.bio.slice(100) : "";
});

// Methods
const getTextItems = (story: Story) => {
  const { getTextItems } = useStoryText();
  return getTextItems(story);
};

const getTextItemStyle = (textItem: any) => {
  const { getTextItemStyle } = useStoryText();
  return getTextItemStyle(textItem);
};

const openStoryView = async () => {
  if (!import.meta.client) {
    return;
  }

  const stories = storiesStore.getStories;
  if (stories.length > 0) {
    storiesStore.openStoryView(stories[0]);

    // Extract color from story image
    const { extractDominantColor } = useImageColorExtractor();
    const color = await extractDominantColor(stories[0].image);
    const rgb = color.match(/\d+/g);
    if (rgb) {
      const [r, g, b] = rgb.map(Number);
      storyBackgroundColor.value = `rgba(${r}, ${g}, ${b}, 0.3)`;
    }

    // Save to localStorage to remember this action
    writeLocalStorageJson("lastViewedStory", {
      storyId: stories[0].id,
      timestamp: Date.now(),
    });
  }
};

const closeStoryView = () => {
  storiesStore.closeStoryView();
};

const toggleMore = () => {
  showMore.value = !showMore.value;
};

// Watch for current story changes
watch(
  () => storiesStore.getCurrentStory,
  async (newStory) => {
    if (newStory && import.meta.client) {
      const { extractDominantColor } = useImageColorExtractor();
      const color = await extractDominantColor(newStory.image);
      const rgb = color.match(/\d+/g);
      if (rgb) {
        const [r, g, b] = rgb.map(Number);
        // Check if the color is very dark (black overlay case)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        if (brightness < 50) {
          // Use dynamic gradient background for dark images
          storyBackgroundColor.value =
            "linear-gradient(135deg, rgba(255, 0, 150, 0.3), rgba(0, 255, 255, 0.3))";
        } else {
          storyBackgroundColor.value = `rgba(${r}, ${g}, ${b}, 0.3)`;
        }
      }
    }
  }
);
</script>
<style scoped>
.profile_top {
  height: 133px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.bg-verified {
  background-image: url("/icons/profile/verified.svg");
}
.bg-trial {
  background-image: url("/icons/profile/trial.svg");
}
.bg-blocked {
  background-image: url("/icons/profile/blocked.svg");
}
.bg-trial .profile_top_center {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
}
.profile_top_center {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.oracle_logo {
  width: 48px;
  height: 48px;
}

.text_block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile_top_center_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: white;
}

.profile_top_center_description {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: white;
  opacity: 0.6;
  text-align: center;
}

.trial_badge {
  background: #5b4913;
  gap: 10px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #f6c32a;
}

.profile_info {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 16px 0 16px;
  gap: 16px;
  transform: translateY(-24px);
}
.profile_info_header {
  display: flex;
  align-items: flex-end;
  gap: 16px;

  width: 100%;
}

.user_avatar {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  object-fit: contain;
  border: 3px solid;
}

.user_info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.username {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}

.rating {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
  gap: 4px;
}

.star_icon {
  width: 16px;
  height: 16px;
}

.actions {
  margin-left: auto;
  display: flex;
  gap: 16px;
  margin-bottom: auto;
  margin-top: 46px;
}

.profile_info_body_text {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
}
.profile_info_footer {
  width: 100%;
}
.profile_skills {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
.profile_skill {
  gap: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1d28;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
}

.invisible_text {
  display: none;
}

.invisible_text.visible {
  display: inline;
}
.id {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
}

.story-view-modal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.story-view-content {
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.story-view-header {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.close-btn {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.close-btn img {
  width: 20px;
  height: 20px;
}

.story-view-body {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  transition: background 0.3s ease;
}

.story-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.story-text-overlay {
  position: absolute;
  font-weight: 600;
  font-size: 24px;
  max-width: 80%;
  text-align: center;
  word-wrap: break-word;
  z-index: 10;
}

.story-text-overlay.top {
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.story-text-overlay.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.story-text-overlay.bottom {
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
