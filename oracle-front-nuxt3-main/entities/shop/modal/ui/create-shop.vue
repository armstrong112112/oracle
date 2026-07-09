<template>
  <div>
    <div v-if="variant === 'Blur'" class="create-shop__container blur">
      <div class="create-shop-blur">
        <div class="create-shop__info">
          <img src="/svg/shop/images/create-shop.svg" alt="create-shop" />
          <h2>First, you need to create a store.</h2>
          <p>After you create your store, you can add a new listing.</p>
        </div>
        <div class="create-shop__buttons">
          <button>Cancel</button>
          <button>Go Back</button>
          <button>Create Store</button>
        </div>
      </div>
    </div>
    <div v-if="variant === 'Modal'" class="create-shop__container modal">
      <div class="create-shop-modal">
        <div class="modal__header">
          <h4>Create Store</h4>
          <nuxt-link to="/shops">
            <button>
              <img src="/svg/arrow-back.svg" alt="close" />
              <img src="/svg/shop/icons/close.svg" alt="close" />
            </button>
          </nuxt-link>
        </div>
        <div class="modal__form">
          <div class="file__uploader" @click="triggerFileSelect">
            <label for="modal__form-file" class="file-uploader__label">
              Upload Shop Picture
            </label>
            <div class="file-uploader__container">
              <div class="file-uploader__content">
                <img
                  src="/svg/shop/icons/image-rectangle.svg"
                  alt="image-rectangle" />
                <h5>Select from Gallery</h5>
              </div>
              <input
                id="two-file"
                ref="fileInput"
                type="file"
                name="two-file"
                style="display: none"
                accept="image/*"
                @change="onFileChange" />
            </div>
          </div>
          <Input
            v-model="desctiption"
            label="Shop name"
            title="Shop name"
            type="text"
            placeholder="Enter"
            for-who="shop-name" />
          <Input
            v-model="desctiption"
            label="Bio"
            title="Bio"
            type="text"
            placeholder="Bio"
            for-who="bio" />
          <div class="bio-counter">0 / 100</div>
        </div>
        <div class="modal__action">
          <nuxt-link to="/shops">
            <button>Create Shop</button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/shops/utils/input.vue";

defineProps<{
  variant: string;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const uploaded_image = ref("");
const desctiption = ref("");

const triggerFileSelect = (): void => {
  fileInput.value?.click();
};

const onFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;
    uploaded_image.value = base64;
  };
  reader.readAsDataURL(file);
};
</script>
<style lang="scss">
.create-shop__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;

  &.blur {
    align-items: flex-end;
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
  }

  &.modal {
    align-items: center;
  }

  .create-shop-blur {
    width: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .create-shop__info {
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
    .create-shop__buttons {
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
        background-color: #14131b;
        font-size: 16px;
        font-weight: 500;
        &:nth-child(1) {
          background-color: transparent;
          display: none;
        }

        &:last-child {
          background-color: #f64e2a;
        }
      }
    }
  }

  .create-shop-modal {
    width: 450px;
    padding: 20px 24px;
    background: #14131b;
    border-radius: 30px;
    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h4 {
        font-family: Roboto, sans-serif;
        font-size: 20px;
        font-weight: 500;
        color: white;
      }
      img {
        &:nth-child(1) {
          display: none;
        }
      }
    }
    .modal__form {
      .file__uploader {
        margin-top: 24px;
        width: 100%;
        cursor: pointer;
        input {
          display: none;
        }

        .file-uploader__label {
          color: white;
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 14px;
          margin-left: 8px;
        }

        .file-uploader__container {
          width: 100%;
          height: 135px;
          margin-top: 8px;
          border-radius: 12px;
          background-color: #1b1a24;
          display: flex;
          align-items: center;
          justify-content: center;

          .file-uploader__content {
            width: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            h5 {
              color: #bfb7ff;
              font-family: Roboto, sans-serif;
              font-weight: 600;
              font-size: 14px;
            }
          }
        }
      }
      .input__container {
        margin-top: 12px;
        .input__label {
          margin-left: 8px !important;
        }
        input {
          background-color: #1b1a24;
        }
      }
      .bio-counter {
        margin: 8px;
        color: white;
        font-size: 12px;
        font-family: Roboto, sans-serif;
        font-weight: 400;
      }
    }
    .modal__action {
      width: 100%;
      margin-top: 24px;
      button {
        width: 100%;
        padding: 10px 0;
        border-radius: 12px;
        background: #f64e2a;
        color: white;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .create-shop__container .create-shop-blur {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .create-shop__container {
    .create-shop-blur {
      .create-shop__buttons {
        button {
          &:nth-child(1) {
            display: block;
          }
          &:nth-child(2) {
            display: none;
          }
        }
      }
    }
    .create-shop-modal {
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 0;
      background-color: #000000;
      .modal__header {
        flex-direction: row-reverse;
        justify-content: flex-end;
        h4 {
          flex: 1;
        }
        a {
          display: flex;
          align-items: center;
          flex: 0.5;
          img {
            &:nth-child(1) {
              display: block;
            }
            &:nth-child(2) {
              display: none;
            }
          }
        }
      }
      .modal__action {
        padding: 12px 16px;
        position: absolute;
        bottom: 0px;
        right: 0;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .create-shop__container {
    .create-shop-blur {
      .create-shop__info {
        h2 {
          font-size: 20px;
        }
        p {
          margin-top: 12px;
        }
      }
    }

    .create-shop-modal {
      padding: 20px 16px;
    }
  }
}
</style>
