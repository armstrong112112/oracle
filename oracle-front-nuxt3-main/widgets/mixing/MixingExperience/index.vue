<template>
  <div class="mixing_experience flex flex-col gap-12 py-16">
    <div class="mixing_experience_title">
      {{ t("mixing.experienceTitle") }}
    </div>
    <div class="mixing_info_widget">
      <img src="/icons/mixing/info.svg" alt="down" class="cursor-pointer" />
      <div class="mixing_info_widget_title">
        {{ t("mixing.experienceInfo") }}
      </div>
    </div>
    <div class="mixing_ratings">
      <div
        v-for="(icon, index) in icons"
        :key="index"
        :class="['mixing_rating', { active: selectedRating === index }]"
        @click="selectRating(index)">
        <component :is="icon" />
      </div>
    </div>
    <textarea
      :placeholder="t('mixing.experiencePlaceholder')"
      class="verification-textarea"
      maxlength="500" />
  </div>
</template>

<script setup lang="ts">
import DislikeIcon from "~/public/icons/mixing/dislikeIcon.vue";
import LikeIcon from "~/public/icons/mixing/likeIcon.vue";
import NoIcon from "~/public/icons/mixing/noIcon.vue";
// Composables
const { t } = useI18n();

// Reactive state
const selectedRating = ref<number | null>(null);

// Data
const icons = [DislikeIcon, NoIcon, LikeIcon];

// Methods
const selectRating = (index: number) => {
  selectedRating.value = index === selectedRating.value ? null : index;
  emit("experience-input", selectedRating.value !== null ? "valid" : "");
};

// Emits
const emit = defineEmits<{
  "experience-input": [value: string];
}>();
</script>

<style lang="scss" scoped>
.mixing_experience_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.mixing_info_widget {
  padding: 8px 12px;
  gap: 12px;
  border-radius: 8px;
  background: #15141e;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.mixing_info_widget_title {
  font-family: Inter;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
.mixing_ratings {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}
.mixing_rating {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #13121b;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  transition: all 0.3s linear;
}
.mixing_rating.active {
  background: #f64e2a;
  color: white;
}
</style>
