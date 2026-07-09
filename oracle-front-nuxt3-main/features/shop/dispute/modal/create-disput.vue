<template>
  <div class="dispute__container">
    <div class="dispute-content">
      <div class="modal-body">
        <div class="warn-image">
          <img src="/svg/shop/images/dispute.png" alt="Warn" />
        </div>
        <h4>Open Dispute?</h4>
        <h5>Are you sure you want to open a dispute?</h5>
      </div>
      <div class="modal-action">
        <button @click="RouteToDispute">Yes, Open Dispute</button>
        <button @click="CloseDispute">No, Continue</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits<{
  close: [];
}>();

function RouteToDispute(): void {
  router.push("/shops/dispute");
}

function CloseDispute(): void {
  emit("close");
}
</script>

<style lang="scss" scoped>
.dispute__container {
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

  .dispute-content {
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

      .warn-image {
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
        background-color: #1b1a24;
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
  .dispute__container {
    background: #000;

    .dispute-content {
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
