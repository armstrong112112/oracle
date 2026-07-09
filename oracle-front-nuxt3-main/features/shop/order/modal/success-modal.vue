<template>
  <div class="success-modal__container">
    <div class="success-modal-content">
      <div class="modal-body">
        <div class="success-image">
          <img src="/svg/shop/images/Question.png" alt="Success" />
        </div>
        <h4>Vendor will need 30 minuter to complete your order</h4>
        <h5>
          This order will be automatically cancelled if they fail to deliver
          this order You will be able to find your items in your orders You’re
          protected with Oracle Secured Deals. open dispute if anything is wrong
        </h5>
      </div>
      <div class="modal-action">
        <button @click="CloseModal">To Lobby</button>
        <button @click="CloseModal">To Order Page</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();

const CloseModal = (): void => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.success-modal__container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;

  .success-modal-content {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .modal-body {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;

      .success-image {
        width: 64px;
        height: 64px;

        img {
          width: 100%;
        }
      }

      h4 {
        margin-top: 12px;
        color: #fff;
        font: 400 20px Hector, sans-serif;
      }

      h5 {
        margin-top: 12px;
        color: #fff;
        font: 400 14px Roboto, sans-serif;
      }
    }

    .modal-action {
      margin-top: 32px;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;

      button {
        width: 100%;
        padding: 12px 0;
        border-radius: 12px;
        background-color: #3f3d54;
        color: #fff;
        font: 400 14px Roboto, sans-serif;

        &:nth-child(2) {
          background-color: #f64e2a;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .success-modal__container {
    background: #000;

    .success-modal-content {
      width: 100%;
      align-items: flex-end;
      border-radius: 0;
      background: #000;
    }

    .modal-action {
      width: 100%;
      flex-direction: column;
      padding: 12px 16px 24px 16px;
      position: absolute;
      bottom: 0;
      left: 0;

      button {
        width: 100%;
      }
    }
  }
}
</style>
