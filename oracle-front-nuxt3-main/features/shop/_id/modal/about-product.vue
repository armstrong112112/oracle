<template>
  <div class="about-product__modal">
    <div class="about-product__container">
      <div class="about-product__header">
        <h2>About The Product</h2>
        <button @click="closeModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="about-product__information">
        <h2>Information</h2>
        <div class="information-category">
          <div class="information-category__item">
            <h2>Category</h2>
            <h3>{{ product.category }}</h3>
          </div>
        </div>
      </div>
      <div class="about-product__description">
        <h2>Description</h2>
        <h4>
          {{ product.description }}
        </h4>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ProductDataType } from "~/shared/types/shops";

interface Props {
  product: ProductDataType;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

function closeModal(): void {
  emit("close");
}
</script>
<style lang="scss" scoped>
.about-product__modal {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9999;
  background-color: rgba($color: #000000, $alpha: 0.8);
  padding-top: 32px;
  user-select: none;

  .about-product__container {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .about-product__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: white;
        font: 500 20px Roboto, sans-serif;
      }
    }

    .about-product__information {
      margin-top: 20px;

      h2 {
        color: #bfb7ff;
        font: 700 18px Roboto, sans-serif;
      }

      .information-category {
        margin-top: 8px;

        .information-category__item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 8px 0;

          h2 {
            flex: 1;
            color: #bfb7ff;
            font: 500 14px Roboto, sans-serif;
          }

          h3 {
            flex: 1;
            color: #fff;
            font: 500 14px Roboto, sans-serif;
          }
        }
      }
    }

    .about-product__description {
      margin-top: 16px;

      h2 {
        color: #bfb7ff;
        font: 700 18px Roboto, sans-serif;
      }

      h4 {
        margin-top: 8px;
        color: white;
        font: 400 14px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .about-product__modal {
    padding-top: 0;
    background-color: transparent;

    .about-product__container {
      width: 100%;
      height: 100%;
      border-radius: 0;
      background-color: rgba($color: #000000, $alpha: 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  }
}
</style>
