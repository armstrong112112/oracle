<template>
  <div class="profile-reviews-items">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="profile-reviews-item">
      <div class="profile-reviews-item-img">
        <img :src="item.icon" :alt="item.title" />
      </div>
      <span class="profile-reviews-item-title">{{ item.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ReviewItem {
  title: string;
  icon: string;
}

interface Props {
  items: ReviewItem[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.profile-reviews-items {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.profile-reviews-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  &-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 109px;
    height: 60px;
    background: #1d1d29;
    border-radius: 10px;
  }

  &-title {
    font-family: "Kenyan Coffee";
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
