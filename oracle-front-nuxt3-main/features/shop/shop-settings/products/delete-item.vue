<template>
  <div>
    <div class="delete-listing__wrapper">
      <div class="delete-listing">
        <div class="delete-listing__info">
          <img src="/svg/shop/images/Question-Delete.png" alt="question" />
          <h2>Delete {{ target }}</h2>
          <p>Are you sure you want to delete this {{ target }}?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div class="delete-listing__action">
          <button class="leave" @click="close">Cancel</button>
          <button class="restock" @click="close">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  target: string;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const close = (): void => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.delete-listing__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  color: white;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  .delete-listing {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .delete-listing__info {
      text-align: center;
      padding: 48.5px 0;

      h2 {
        margin: 12px 0;
        font-family: Hector, sans-serif;
        font-size: 32px;
        font-weight: 400;
      }

      p {
        line-height: 24px;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .delete-listing__action {
      width: 375px;
      height: 255px;
      margin-bottom: 38px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      gap: 10px;

      button {
        width: 100%;
        padding: 12px 0;
        border-radius: 14px;
        color: white;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        text-decoration: none;

        &.leave {
          background-color: #3f3d54;
        }

        &.restock {
          background-color: #f64e2a;
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .delete-listing__wrapper {
    .delete-listing {
      .delete-listing__info {
        h2 {
          font-size: 20px;
        }
      }

      .delete-listing__action {
        padding: 0 16px;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
