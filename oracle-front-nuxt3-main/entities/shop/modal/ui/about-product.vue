<template>
  <div v-if="ProductModal" class="about-product__modal">
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
          <div
            v-for="(item, index) in 10"
            :key="index"
            class="information-category__item">
            <h2>Category</h2>
            <h3>Programming</h3>
          </div>
        </div>
      </div>
      <div class="about-product__description">
        <h2>Description</h2>
        <h4>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </h4>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  ProductModal: boolean;
}>();

const emit = defineEmits<{
  modal: [value: boolean];
}>();

const closeModal = (): void => {
  emit("modal", false);
};
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
</style>
