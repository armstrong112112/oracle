<template>
  <div class="out-of-stock__wrapper">
    <div class="out-of-stock">
      <div class="out-of-stock__info">
        <img src="/svg/shop/images/Question.png" alt="question" />
        <h2>You’re out of stock for this Ad</h2>
        <p>You can restock the inventory or leave this ad archived</p>
      </div>
      <div class="out-of-stock__action">
        <button @click="close" class="leave">Leave as is</button>
        <button @click="close" class="restock">Restock</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void;
}>();

const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.out-of-stock__wrapper {
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
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  .out-of-stock {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .out-of-stock__info {
      text-align: center;
      padding: 48.5px 0;

      h2 {
        margin-top: 12px;
        font-family: Hector, sans-serif;
        font-size: 32px;
        font-weight: 400;
      }

      p {
        margin-top: 24px;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .out-of-stock__action {
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
  .out-of-stock__wrapper {
    .out-of-stock {
      .out-of-stock__info {
        h2 {
          font-size: 20px;
        }
      }

      .out-of-stock__action {
        padding: 0 16px;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
