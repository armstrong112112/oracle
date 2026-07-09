<template>
  <div class="profile-card" @click="showModal">
    <div class="profile__image">
      <img src="/svg/shop/images/settings-profile.png" alt="profile" />
    </div>
    <div class="profile__title">Patricia Martin</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modal: boolean;
}>();

const emit = defineEmits<{
  modal: [value: boolean];
}>();

const showModal = (): void => {
  emit("modal", props.modal);
};
</script>

<style lang="scss" scoped>
.profile-card {
  cursor: pointer;
  width: 80px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  .profile__image {
    width: 48px;
    height: 48px;
    border-radius: 40px;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  .profile__title {
    color: white;
    font: 400 12px Roboto, sans-serif;
  }
}
</style>
