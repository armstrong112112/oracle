<template>
  <div class="wheel">
    <div class="modal__container">
      <div class="modal-header__container">
        <h2>The wheel of fortune</h2>
        <button @click="closeModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="result-of-twist">
        <div class="result-image">
          <img src="/svg/shop/images/percent.png" alt="percent" />
        </div>
        <h4>You get 20% off!</h4>
        <div class="result__container">
          <h6>K654GFNM</h6>
          <button>
            <img src="/svg/shop/icons/copy.svg" alt="copy" />
          </button>
        </div>
      </div>
      <div class="modal__action">
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();

function closeModal(): void {
  emit("close");
}
</script>
<style lang="scss" scoped>
.wheel {
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

  .modal__container {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .modal-header__container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #fff;
        font: 500 20px Roboto, sans-serif;
      }
    }

    .wheel-of-fortune {
      margin-top: 16px;

      .fortune__header {
        h6 {
          color: #fff;
          font: 500 16px Roboto, sans-serif;
        }

        .days {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;

          button {
            padding: 10px 12px;
            display: flex;
            align-items: center;
            gap: 4px;
            background: #14131b;
            border-radius: 12px;
            border: 1px solid rgba($color: #e6e6e6, $alpha: 0.24);
            color: #fff;
            font: 400 14px Roboto, sans-serif;

            img {
              display: none;
            }

            &.lost {
              img {
                display: block;
              }
            }

            &.present {
              border: 1px solid #f64e2a;
            }
          }
        }

        .wheel-content {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 32px;

          .fortune {
            width: 375px;
            height: 369.71px;
            position: relative;

            .fortune-arrow {
              position: absolute;
              top: 144.66px;
              left: 144.69px;
              cursor: pointer;
              user-select: none;
            }

            .fortune-item {
              color: #000;
              font: 600 12px Inter, sans-serif;
              text-transform: uppercase;
              position: absolute;

              &:nth-of-type(1) {
                transform: rotate(-90deg);
                top: 80px;
                left: 155px;
              }

              &:nth-of-type(2) {
                transform: rotate(-30deg);
                top: 125px;
                left: 240px;
              }

              &:nth-of-type(3) {
                transform: rotate(35deg);
                top: 230px;
                left: 240px;
              }

              &:nth-of-type(4) {
                transform: rotate(90deg);
                top: 280px;
                left: 150px;
              }

              &:nth-of-type(5) {
                transform: rotate(150deg);
                top: 225px;
                left: 70px;
              }

              &:nth-of-type(6) {
                transform: rotate(210deg);
                top: 130px;
                left: 65px;
              }
            }
          }
        }
      }
    }

    .result-of-twist {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;

      h4 {
        color: #fff;
        font: 600 18px Roboto, sans-serif;
      }

      .result__container {
        width: 100%;
        margin-top: 12px;
        background-color: #2c2a3d;
        border-radius: 8px;
        padding: 15px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h6 {
          color: #fff;
          font: 500 14px Roboto, sans-serif;
        }
      }
    }

    .modal__action {
      margin-top: 32px;

      button {
        width: 100%;
        padding: 16.5px 0;
        background-color: #f64e2a;
        border-radius: 14px;
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .wheel {
    align-items: flex-end;

    .modal__container {
      width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
