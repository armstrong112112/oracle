<template>
  <div class="contact__wrapper">
    <div class="profile">
      <div class="image-container">
        <img src="/svg/shop/images/settings-profile.png" alt="profile" />
      </div>
      <div class="profile-info">
        <h4>{{ name }}</h4>
        <h6>ID: {{ userId }}</h6>
      </div>
      <div class="nickname">
        <h6>{{ nickname }}</h6>
      </div>
    </div>
    <div class="action" v-if="action">
      <button @click="Action">Add <span>+</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  nickname: string;
  userId: number;
  action: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  onClick: [];
}>();

const Action = (): void => {
  emit("onClick");
};
</script>

<style lang="scss" scoped>
.contact__wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 20px;

  &:hover {
    transition: all 0.3s ease-in;
    background-color: #1b1a24;
  }

  .profile {
    flex: 3;
    display: flex;
    align-items: flex-start;

    .image-container {
      width: 40px;
      height: 40px;

      img {
        width: 100%;
      }
    }

    .profile-info {
      margin-left: 12px;

      h4 {
        color: #fff;
        font: 400 14px Roboto, sans-serif;
      }

      h6 {
        margin-top: 4px;
        color: #8780cf;
        font: 400 12px Roboto, sans-serif;
      }
    }

    .nickname {
      margin-left: 4px;

      h6 {
        margin-top: 2px;
        color: #7873b4;
        font: 400 12px Roboto, sans-serif;
      }
    }
  }

  .action {
    button {
      padding: 8px 10px;
      border-radius: 12px;
      background: #1b1a24;
      color: #fff;
      font: 500 12px Roboto, sans-serif;

      span {
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }
    }
  }
}
</style>
