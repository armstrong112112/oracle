<template>
  <div class="deliver-product__container">
    <div class="deliver-content">
      <div class="modal-header">
        <h2>Deliver Work</h2>
        <button @click="close_modal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="modal-body">
        <div class="tab">
          <button>Upload File</button>
          <button>With Writing</button>
        </div>
        <div class="form">
          <div class="file-upload__container">
            <img
              src="/svg/shop/icons/download-minimalistic.svg"
              alt="download" />
            <h5>Upload File</h5>
            <input type="file" name="file-upload" id="file-upload" />
          </div>
          <textarea placeholder="Instruction" />
          <p>0 / 500</p>
        </div>
      </div>
      <div class="modal-action">
        <button @click="close_modal">Cancel</button>
        <button @click="GoToDeal">Deliver Work</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();

const close_modal = (): void => {
  emit("close");
};

const GoToDeal = (): void => {
  emit("close");
  router.push("/shops/order?order=deal");
};
</script>

<style lang="scss" scoped>
.deliver-product__container {
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

  .deliver-content {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .modal-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #fff;
        font: 500 20px Hector, sans-serif;
      }
    }

    .modal-body {
      margin-top: 24px;

      .tab {
        display: flex;
        align-items: center;
        gap: 10px;

        button {
          flex: 2;
          padding: 12px 0;
          border-radius: 12px;
          background-color: #1b1a24;
          color: #fff;
          font: 400 14px Roboto, sans-serif;

          &:nth-child(1) {
            background-color: #f64e2a;
          }
        }
      }

      .form {
        margin-top: 16px;

        .file-upload__container {
          padding: 12px 16px;
          background-color: #1b1a24;
          border-radius: 12px;

          h5 {
            margin-top: 10px;
            color: #fff;
            font: 600 14px Roboto, sans-serif;
          }

          input {
            display: none;
          }
        }

        textarea {
          width: 100%;
          min-height: 100px;
          margin-top: 8px;
          padding: 13px 14px;
          background-color: #1b1a24;
          border-radius: 12px;
          border: transparent;
          color: #fff;
          font: 400 14px Roboto, sans-serif;
          resize: none;

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: #67639a;
          }
        }

        p {
          margin-top: 8px;
          color: #fff;
          font: 400 12px Roboto, sans-serif;
        }
      }
    }

    .modal-action {
      margin-top: 24px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;

      button {
        flex: 2;
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
  .deliver-product__container {
    .deliver-content {
      width: 100%;
      height: 100%;
      border-radius: 0;
      background: #000;
      position: fixed;
      top: 0;
      left: 0;

      .modal-action {
        border-top: 1px solid #2b2741;
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
}
</style>
