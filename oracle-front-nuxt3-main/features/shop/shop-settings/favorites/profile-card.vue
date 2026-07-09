<template>
  <div class="profile-card" @click="showModal">
    <div class="profile__image">
      <img :src="image" alt="profile" />
    </div>
    <div class="profile__title">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modal: boolean
  name: string
  image: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  modal: [value: boolean]
}>()

const showModal = (): void => {
  emit('modal', props.modal)
}
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
    white-space: nowrap;
    color: white;
    font: 400 12px Roboto, sans-serif;
  }
}
</style>
