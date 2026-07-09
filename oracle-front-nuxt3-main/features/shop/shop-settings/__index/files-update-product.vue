<template>
  <div class="files-update-product__container">
    <div class="download-icon">
      <img src="/svg/shop/icons/Files.svg" alt="Files" />
    </div>
    <div class="product__content">
      <div class="product__info">
        <h6 v-if="type === 'download'">Download</h6>
        <h6 v-else>
          {{ date }}
        </h6>
        <h4>{{ filename }}</h4>
      </div>
      <div v-if="type === 'download'" class="product__download">
        <img src="/svg/shop/icons/Download.svg" alt="Download" />
      </div>
      <div v-if="type === 'edit'" class="product__download">
        <img src="/svg/shop/icons/edit.svg" alt="Download" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: string;
  filename: string;
  date: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.files-update-product__container {
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 15px;

  .download-icon {
    width: 30px;
    height: 30px;
  }

  .product__content {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px 8px 4px;
    border-bottom: 1px solid #2b2741;

    .product__info {
      h6 {
        color: #bfb7ff;
        font: 400 12px Roboto, sans-serif;
      }

      h4 {
        color: #fff;
        font: 400 14px Roboto, sans-serif;
      }
    }

    .product__download {
      width: 24px;
      height: 24px;
      margin-left: 5px;
    }
  }
}
</style>
